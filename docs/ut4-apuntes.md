# UT4: Datos Especiales

## Introducción

Esta unidad se centra en el manejo y procesamiento de tipos de datos especiales que requieren técnicas específicas de extracción y transformación de features: datos geoespaciales, audio e imágenes.

---

## Datos Geoespaciales

### Conceptos Fundamentals

**Datos geoespaciales**: Información que tiene un componente de ubicación geográfica asociado.

**Tipos de geometrías**:

- **Point**: Ubicación específica (lat, lon)
- **LineString**: Secuencia de puntos conectados
- **Polygon**: Área cerrada definida por sus límites
- **MultiPoint, MultiLineString, MultiPolygon**: Colecciones de geometrías

### GeoPandas

GeoPandas extiende pandas para trabajar con datos geoespaciales.
```python
import geopandas as gpd
from shapely.geometry import Point, Polygon

# Crear GeoDataFrame
gdf = gpd.GeoDataFrame(
    data,
    geometry=gpd.points_from_xy(data.longitude, data.latitude),
    crs="EPSG:4326"  # Sistema de coordenadas WGS84
)

# Operaciones espaciales
gdf['area'] = gdf.geometry.area
gdf['centroid'] = gdf.geometry.centroid
```

### Shapely

Librería para operaciones geométricas.
```python
from shapely.geometry import Point, Polygon
from shapely.ops import unary_union

# Crear geometrías
point = Point(0, 0)
polygon = Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])

# Operaciones
distance = point.distance(polygon)
contains = polygon.contains(point)
intersection = polygon1.intersection(polygon2)
```

### Feature Engineering Geoespacial
```python
# Distancias a puntos de interés
gdf['dist_to_center'] = gdf.geometry.distance(city_center)

# Área y perímetro
gdf['area'] = gdf.geometry.area
gdf['perimeter'] = gdf.geometry.length

# Buffers
gdf['buffer_500m'] = gdf.geometry.buffer(500)

# Conteo de vecinos
gdf['neighbors_count'] = gdf.geometry.apply(
    lambda x: gdf[gdf.geometry.intersects(x.buffer(1000))].shape[0]
)

# Coordenadas
gdf['latitude'] = gdf.geometry.y
gdf['longitude'] = gdf.geometry.x
```

---

## Datos de Audio

### Conceptos Fundamentales

**Señal de audio**: Representación de ondas sonoras en el dominio del tiempo.

**Propiedades clave**:

- **Sample rate**: Frecuencia de muestreo (Hz)
- **Duration**: Duración en segundos
- **Amplitude**: Magnitud de la señal

### Librosa

Librería especializada en análisis de audio.
```python
import librosa
import numpy as np

# Cargar audio
audio, sr = librosa.load('audio.wav', sr=22050)

# Información básica
duration = librosa.get_duration(y=audio, sr=sr)
```

### Feature Extraction de Audio
```python
# Características temporales
zero_crossing_rate = librosa.feature.zero_crossing_rate(audio)[0]
energy = np.sum(audio ** 2) / len(audio)

# Características espectrales
spectral_centroids = librosa.feature.spectral_centroid(y=audio, sr=sr)[0]
spectral_rolloff = librosa.feature.spectral_rolloff(y=audio, sr=sr)[0]

# MFCCs (Mel-Frequency Cepstral Coefficients)
mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
mfcc_mean = np.mean(mfccs, axis=1)
mfcc_std = np.std(mfccs, axis=1)

# Chroma features
chroma = librosa.feature.chroma_stft(y=audio, sr=sr)

# Tempo
tempo, beats = librosa.beat.beat_track(y=audio, sr=sr)
```

### Espectrogramas
```python
# Espectrograma
D = librosa.stft(audio)
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)

# Mel-spectrogram
mel_spec = librosa.feature.melspectrogram(y=audio, sr=sr)
mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
```

---

## Datos de Imágenes

### OpenCV

Librería para procesamiento de imágenes.
```python
import cv2
import numpy as np

# Cargar imagen
img = cv2.imread('image.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Información básica
height, width = gray.shape
total_pixels = height * width
```

### Feature Extraction de Imágenes

**Características de bajo nivel**:
```python
# Estadísticas de color
mean_color = np.mean(img, axis=(0, 1))
std_color = np.std(img, axis=(0, 1))

# Histogramas
hist_r = cv2.calcHist([img], [0], None, [256], [0, 256])
hist_g = cv2.calcHist([img], [1], None, [256], [0, 256])
hist_b = cv2.calcHist([img], [2], None, [256], [0, 256])

# Bordes
edges = cv2.Canny(gray, 100, 200)
edge_density = np.sum(edges > 0) / total_pixels

# Texturas con GLCM
from skimage.feature import greycomatrix, greycoprops
glcm = greycomatrix(gray, [1], [0, np.pi/4, np.pi/2], levels=256)
contrast = greycoprops(glcm, 'contrast')[0, 0]
dissimilarity = greycoprops(glcm, 'dissimilarity')[0, 0]
homogeneity = greycoprops(glcm, 'homogeneity')[0, 0]
```

**Características de forma**:
```python
# Detección de contornos
contours, _ = cv2.findContours(
    edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
)

# Features de forma
if contours:
    cnt = contours[0]
    area = cv2.contourArea(cnt)
    perimeter = cv2.arcLength(cnt, True)
    x, y, w, h = cv2.boundingRect(cnt)
    aspect_ratio = float(w) / h
```

**Detectores de características**:
```python
# SIFT (Scale-Invariant Feature Transform)
sift = cv2.SIFT_create()
keypoints, descriptors = sift.detectAndCompute(gray, None)

# ORB (Oriented FAST and Rotated BRIEF)
orb = cv2.ORB_create()
keypoints, descriptors = orb.detectAndCompute(gray, None)

# Features: número de keypoints, estadísticas de descriptors
n_keypoints = len(keypoints)
descriptor_mean = np.mean(descriptors, axis=0) if descriptors is not None else 0
```

---

## Integración en Pipelines de ML

### Transformadores Personalizados
```python
from sklearn.base import BaseEstimator, TransformerMixin

class GeoFeatureExtractor(BaseEstimator, TransformerMixin):
    def __init__(self, reference_point):
        self.reference_point = reference_point
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        features = []
        for geom in X:
            features.append([
                geom.distance(self.reference_point),
                geom.area,
                geom.length,
                geom.centroid.x,
                geom.centroid.y
            ])
        return np.array(features)

class AudioFeatureExtractor(BaseEstimator, TransformerMixin):
    def __init__(self, sr=22050):
        self.sr = sr
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        features = []
        for audio_path in X:
            audio, sr = librosa.load(audio_path, sr=self.sr)
            mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
            features.append(np.concatenate([
                np.mean(mfccs, axis=1),
                np.std(mfccs, axis=1)
            ]))
        return np.array(features)

class ImageFeatureExtractor(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        features = []
        for img_path in X:
            img = cv2.imread(img_path)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Extraer múltiples features
            mean_color = np.mean(img, axis=(0, 1))
            std_color = np.std(img, axis=(0, 1))
            edges = cv2.Canny(gray, 100, 200)
            edge_density = np.sum(edges > 0) / edges.size
            
            features.append(np.concatenate([
                mean_color,
                std_color,
                [edge_density]
            ]))
        return np.array(features)
```

### Pipeline Completo
```python
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Combinar múltiples tipos de features
pipeline = Pipeline([
    ('features', FeatureUnion([
        ('geo', GeoFeatureExtractor(reference_point)),
        ('audio', AudioFeatureExtractor()),
        ('image', ImageFeatureExtractor())
    ])),
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier())
])

# Entrenar
pipeline.fit(X_train, y_train)

# Predecir
y_pred = pipeline.predict(X_test)
```

---

## Consideraciones Especiales

### Performance

**Datos geoespaciales**:

- Usar índices espaciales para consultas rápidas
- Simplificar geometrías complejas cuando sea apropiado
- Vectorizar operaciones cuando sea posible

**Audio e imágenes**:

- Pre-calcular features cuando sea posible
- Usar batch processing para grandes volúmenes
- Considerar compresión y downsampling

### Almacenamiento
```python
# Guardar features extraídas
import joblib

# Extraer y guardar
features = feature_extractor.transform(data)
joblib.dump(features, 'extracted_features.pkl')

# Cargar features pre-calculadas
features = joblib.load('extracted_features.pkl')
```

### Validación
```python
# Validación espacial: considerar autocorrelación espacial
from sklearn.model_selection import GroupKFold

# Agrupar por región para evitar data leakage
groups = gdf['region_id']
gkf = GroupKFold(n_splits=5)

for train_idx, test_idx in gkf.split(X, y, groups):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]
```

---

## Recursos Adicionales

**GeoPandas y Shapely**:

- Documentación oficial de GeoPandas
- Tutoriales de análisis geoespacial
- Proyecciones y sistemas de coordenadas

**Audio**:

- Documentación de librosa
- Teoría de procesamiento de señales
- Music Information Retrieval (MIR)

**Imágenes**:

- Documentación de OpenCV
- Computer Vision: Algorithms and Applications
- Deep Learning para imágenes

**Integración**:

- Scikit-learn custom transformers
- Pipeline best practices
- Feature Union y Column Transformer

---

## Conclusión

El manejo de datos especiales requiere:

1. Comprensión del dominio específico
2. Selección apropiada de features a extraer
3. Integración efectiva en pipelines de ML
4. Consideración de aspectos de performance y almacenamiento
5. Validación apropiada según el tipo de dato

La correcta extracción y transformación de features de datos geoespaciales, audio e imágenes permite incorporar información rica y valiosa en modelos de machine learning.