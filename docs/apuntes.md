# 📚 Apuntes del Curso

!!! info "Información del Curso"
    **Docente:** Prof. Juan F. Kurucz  
    **Institución:** Universidad Católica del Uruguay  

---

Esta sección centraliza todos los apuntes teóricos, conceptos fundamentales y contenidos académicos del curso de **Ingeniería de Datos**. Los apuntes están organizados por unidades temáticas y proporcionan:

-  Fundamentos teóricos sólidos
-  Conceptos clave explicados en profundidad
-  Referencias a literatura académica y técnica
-  Síntesis de lecturas obligatorias
-  Material de estudio para evaluaciones
-  Conexiones entre conceptos de diferentes unidades

---

## 🗂️ Índice de Unidades Temáticas

### UT1: Tratamiento Avanzado de Datos Faltantes

**Período:** Agosto - Septiembre 2025
**Evaluación:** Septiembre 2025

**[🔗 Ver Apuntes Completos de UT1](ut1-apuntes.md)**

---

### UT2: Modelado Avanzado de Pipelines

**Período:** Septiembre - Octubre 20245 
**Evaluación:** Octubre 2025


**[🔗 Ver Apuntes Completos de UT2](ut2-apuntes.md)**

---

### UT3: Feature Engineering

**Período:** Octubre 2025 
**Evaluación:** Octubre 2025


**[🔗 Ver Apuntes Completos de UT3](ut3-apuntes.md)**

---

## UT4: Datos Especiales

**Período:** Noviembre 2025
**Evaluación:** Noviembre 2025

**[🔗 Ver Apuntes Completos de UT4](ut4-apuntes.md)**

---

## UT5: Pipelines ETL

**Período:** Noviembre 2025
**Evaluación:** Noviembre 2025

**[🔗 Ver Apuntes Completos de UT5](ut5-apuntes.md)**

## 📊 Mapa Conceptual del Curso
```
INGENIERÍA DE DATOS Y ML
════════════════════════════════════════════════

     ┌─────────────────────────────────────────┐
     │     OBJETIVO GENERAL DEL CURSO          │
     │  Construir sistemas de ML robustos,     │
     │  escalables y preparados para producción│
     └─────────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┬─────────────┬─────────────┐
         │             │             │             │             │
         ▼             ▼             ▼             ▼             ▼
  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
  │   UT1   │   │   UT2   │   │   UT3   │   │   UT4   │   │   UT5   │
  │ Missing │──▶│Pipelines│──▶│ Feature │──▶│  Datos  │──▶│   ETL   │
  │  Data   │   │         │   │   Eng.  │   │Especiales│   │Pipelines│
  └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
       │             │             │             │             │
       │             │             │             │             │
       ▼             ▼             ▼             ▼             ▼
  PREPARACIÓN   ORQUESTACIÓN   OPTIMIZACIÓN   EXTRACCIÓN    PRODUCCIÓN
   DE DATOS      DE FLUJOS      DE FEATURES   ESPECIALIZADA  Y ESCALADO
       │             │             │             │             │
       └─────────────┼─────────────┼─────────────┼─────────────┘
                     │             │             │
                     ▼             ▼             ▼
          SISTEMAS ML EN PRODUCCIÓN A ESCALA
```

---

## 🎯 Conexiones Entre Unidades

### UT1 → UT2
**Missing Data en Pipelines**

Los métodos de imputación aprendidos en UT1 se integran en los pipelines de UT2:
```python
# Ejemplo de integración
pipeline = Pipeline([
    ('imputer', IterativeImputer()),  # UT1
    ('scaler', StandardScaler()),      # UT3
    ('model', RandomForestClassifier())
])
```

---

### UT2 → UT3
**Feature Engineering en Pipelines**

Las técnicas de UT3 se orquestan mediante los pipelines de UT2:
```python
# Ejemplo de integración
preprocessor = ColumnTransformer([
    ('num', numeric_transformer, numeric_features),    # UT3
    ('cat', categorical_transformer, categorical_features)  # UT3
])

pipeline = Pipeline([
    ('preprocessor', preprocessor),  # UT2 + UT3
    ('pca', PCA(n_components=0.95)), # UT3
    ('classifier', model)
])
```

---

### UT1 → UT3
**Missing Data y Feature Engineering**

El manejo de missingness puede convertirse en features:
```python
# Indicadores de missingness como features (UT1 + UT3)
df['income_was_missing'] = df['income'].isna().astype(int)
df['income'] = df['income'].fillna(df['income'].median())
```

### UT3 → UT4
**Feature Engineering para Datos Especiales**

Las técnicas de UT3 se aplican a features extraídas de datos especiales:
```python
# Features geoespaciales (UT4) procesadas con técnicas de UT3
geo_features = gpd.GeoDataFrame(...)
geo_features['distance'] = geo_features.geometry.distance(point)  # UT4
geo_features['distance_scaled'] = StandardScaler().fit_transform(
    geo_features[['distance']]
)  # UT3
```

### UT2 → UT4
**Pipelines para Datos Especiales**

Los pipelines de UT2 orquestan el procesamiento de datos especiales:
```python
# Pipeline con extracción de features de imágenes
from sklearn.base import BaseEstimator, TransformerMixin

class ImageFeatureExtractor(BaseEstimator, TransformerMixin):  # UT4
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        # Extracción de features con OpenCV
        features = []
        for img in X:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            features.append(self._extract_features(gray))
        return np.array(features)

pipeline = Pipeline([
    ('image_features', ImageFeatureExtractor()),  # UT4
    ('scaler', StandardScaler()),                  # UT3
    ('model', RandomForestClassifier())
])  # UT2
```

### UT1 → UT4
**Missing Data en Datos Especiales**

Manejo de valores faltantes en datos geoespaciales, audio e imágenes:
```python
# Geometrías inválidas o faltantes (UT1 + UT4)
gdf['geometry'] = gdf['geometry'].apply(
    lambda x: x if x.is_valid else x.buffer(0)
)
gdf = gdf.dropna(subset=['geometry'])

# Audio con segmentos faltantes (UT1 + UT4)
audio_signal = np.where(np.isnan(audio_signal), 0, audio_signal)
```

### Integración Total
**Flujo Completo de Datos Especiales**
```python
# Pipeline completo integrando las 4 unidades
def create_complete_pipeline():
    return Pipeline([
        # UT1: Manejo de missingness
        ('imputer', SimpleImputer(strategy='median')),
        
        # UT4: Extracción de features especiales
        ('geo_features', GeoFeatureExtractor()),
        
        # UT3: Feature engineering
        ('feature_engineering', ColumnTransformer([
            ('numeric', Pipeline([
                ('scaler', StandardScaler()),
                ('pca', PCA(n_components=0.95))
            ]), numeric_cols)
        ])),
        
        # UT2: Modelo final
        ('model', GradientBoostingClassifier())
    ])  # Todo orquestado en UT2
```

### UT4 → UT5
**ETL para Datos Especiales**

Los pipelines ETL orquestan la extracción y procesamiento de datos especiales:
```python
from prefect import flow, task

@task
def extract_geospatial_data():
    """Extracción de datos geoespaciales (UT4)"""
    gdf = gpd.read_file('data.geojson')
    return gdf

@task
def extract_audio_features(audio_paths):
    """Extracción de features de audio (UT4)"""
    features = []
    for path in audio_paths:
        audio, sr = librosa.load(path)
        mfccs = librosa.feature.mfcc(y=audio, sr=sr)
        features.append(np.mean(mfccs, axis=1))
    return np.array(features)

@flow(name="special-data-etl")
def special_data_pipeline():
    """Pipeline ETL para datos especiales (UT5)"""
    geo_data = extract_geospatial_data()
    audio_features = extract_audio_features(audio_paths)
    
    # Transform y Load
    processed_data = transform_special_data(geo_data, audio_features)
    load_to_warehouse(processed_data)
```

### UT2 → UT5
**De Pipelines Locales a Producción**

Los pipelines sklearn de UT2 se integran en flujos ETL productivos:
```python
@task
def train_model(X_train, y_train):
    """Entrenamiento con pipeline sklearn (UT2)"""
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', RandomForestClassifier())
    ])
    pipeline.fit(X_train, y_train)
    return pipeline

@task
def save_model_artifact(pipeline, run_id):
    """Persistencia de modelo"""
    joblib.dump(pipeline, f'models/model_{run_id}.pkl')

@flow(name="ml-training-pipeline")
def training_etl():
    """Pipeline ETL para entrenamiento (UT5)"""
    # Extract
    X_train, y_train = extract_training_data()
    
    # Transform & Train (UT2)
    model = train_model(X_train, y_train)
    
    # Load
    save_model_artifact(model, get_run_id())
```

### UT3 → UT5
**Feature Engineering en Producción**

Las transformaciones de UT3 se ejecutan en pipelines ETL programados:
```python
@task
def engineer_features(df):
    """Feature engineering (UT3) en pipeline ETL"""
    # Transformaciones numéricas
    df['income_log'] = np.log1p(df['income'])
    
    # Encoding categórico
    encoder = TargetEncoder()
    df['category_encoded'] = encoder.fit_transform(
        df[['category']], df['target']
    )
    
    # PCA
    pca = PCA(n_components=0.95)
    pca_features = pca.fit_transform(df[numeric_cols])
    
    return df

@flow(name="feature-engineering-pipeline")
def feature_pipeline():
    """Pipeline ETL diario de features (UT5)"""
    raw_data = extract_from_database()
    features = engineer_features(raw_data)  # UT3
    load_to_feature_store(features)
```

### UT1 → UT5
**Missing Data en Flujos de Producción**

El manejo de missingness se automatiza en pipelines ETL:
```python
@task
def handle_missing_data(df):
    """Imputación en pipeline (UT1)"""
    # Estrategia por columna
    numeric_imputer = IterativeImputer()
    df[numeric_cols] = numeric_imputer.fit_transform(df[numeric_cols])
    
    # Categorical
    df[categorical_cols] = df[categorical_cols].fillna('MISSING')
    
    return df

@task
def log_data_quality(df):
    """Monitoreo de calidad de datos"""
    missing_report = {
        'total_rows': len(df),
        'missing_by_column': df.isnull().sum().to_dict(),
        'timestamp': datetime.now()
    }
    return missing_report

@flow(name="data-quality-pipeline")
def quality_etl():
    """Pipeline con validación de calidad (UT5)"""
    raw_data = extract_data()
    quality_report = log_data_quality(raw_data)
    
    if quality_report['missing_pct'] > 0.3:
        raise ValueError("Too much missing data")
    
    clean_data = handle_missing_data(raw_data)  # UT1
    load_data(clean_data)
```

### Integración Total UT1-UT5
**Pipeline ML End-to-End en Producción**
```python
from prefect import flow, task
from prefect.deployments import Deployment
from prefect.server.schemas.schedules import CronSchedule

@task(retries=3, retry_delay_seconds=60)
def extract_raw_data():
    """Extract: obtener datos desde fuentes"""
    return pd.read_sql(query, connection)

@task
def handle_missing_and_validate(df):
    """UT1: Missing data + validación"""
    # Imputación
    df = iterative_imputation(df)
    
    # Validación
    assert df.isnull().sum().sum() == 0
    return df

@task
def extract_special_features(df):
    """UT4: Features de datos especiales"""
    geo_features = extract_geo_features(df['geometry'])
    audio_features = extract_audio_features(df['audio_path'])
    return pd.concat([df, geo_features, audio_features], axis=1)

@task
def engineer_features(df):
    """UT3: Feature engineering"""
    # Transformaciones
    df = apply_transformations(df)
    
    # Encoding
    df = encode_categorical(df)
    
    # Selección
    df = select_features(df)
    return df

@task
def train_pipeline(X, y):
    """UT2: Entrenamiento con sklearn pipeline"""
    pipeline = Pipeline([
        ('preprocessor', create_preprocessor()),
        ('model', create_model())
    ])
    pipeline.fit(X, y)
    return pipeline

@task
def evaluate_and_register(pipeline, X_test, y_test):
    """Evaluación y registro de modelo"""
    score = pipeline.score(X_test, y_test)
    
    if score > THRESHOLD:
        register_model(pipeline, score)
        return True
    return False

@flow(name="end-to-end-ml-pipeline")
def complete_ml_pipeline():
    """
    Pipeline completo integrando UT1-UT5
    Ejecuta diariamente en producción
    """
    # Extract (UT5)
    raw_data = extract_raw_data()
    
    # Transform: UT1 → UT4 → UT3
    clean_data = handle_missing_and_validate(raw_data)  # UT1
    special_features = extract_special_features(clean_data)  # UT4
    final_features = engineer_features(special_features)  # UT3
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(
        final_features.drop('target', axis=1),
        final_features['target']
    )
    
    # Train (UT2)
    model = train_pipeline(X_train, y_train)
    
    # Load (UT5)
    success = evaluate_and_register(model, X_test, y_test)
    
    if success:
        deploy_to_production(model)

# Deployment con schedule (UT5)
deployment = Deployment.build_from_flow(
    flow=complete_ml_pipeline,
    name="daily-ml-training",
    schedule=CronSchedule(cron="0 2 * * *"),  # 2 AM diario
    work_pool_name="production-pool"
)
```

