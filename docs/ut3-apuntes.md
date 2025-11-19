# ️ UT3: Feature Engineering

!!! info "Información del Curso"
    **Docente:** Prof. Juan F. Kurucz  
    **Institución:** Universidad Católica del Uruguay  

## Objetivos de Aprendizaje


- Crear features derivadas relevantes según el dominio
- Aplicar técnicas avanzadas de encoding categórico
- Manejar variables de alta cardinalidad efectivamente
- Implementar PCA para reducción dimensional
- Interpretar componentes principales y varianza explicada
- Construir pipelines de feature engineering escalables

---

## Libro Principal: Feature Engineering for Machine Learning

!!! quote "Referencia Completa"
    **Zheng, A., & Casari, A. (2018).** *Feature Engineering for Machine Learning: Principles and Techniques for Data Scientists*. **O'Reilly Media, Inc.**
    
    - **ISBN-13:** 978-1491953242
    - **Páginas:** 218
    - **Nivel:** Intermedio-Avanzado

### Sobre las Autoras

**Alice Zheng** - Data Scientist con experiencia en Microsoft, Amazon y varios startups de ML. Especializada en sistemas de recomendación y feature engineering a escala.

**Amanda Casari** - Software Engineer en Google, enfocada en infraestructura de ML y herramientas para científicos de datos.

---

## Capítulo 2: Fancy Tricks with Simple Numbers

!!! warning "Lectura Obligatoria - Evaluación: 01/10"

### Objetivos del Capítulo
Dominar las transformaciones numéricas fundamentales que preparan los datos para algoritmos de machine learning, entendiendo cuándo y por qué aplicar cada técnica.

### Contenido Detallado

#### 2.1 Escalado y Normalización

**Min-Max Scaling (Normalization)**
```python
# Transforma features al rango [0, 1]
scaled_feature = (x - min(x)) / (max(x) - min(x))
```

**¿Cuándo usar?**
- Cuando necesitas features en un rango específico
- Para algoritmos sensibles a magnitud (KNN, Neural Networks)
- Cuando los outliers no son extremos

**Limitaciones:**
- Sensible a outliers
- El rango cambia si entran nuevos datos

---

**Standardization (Z-score normalization)**
```python
# Transforma features a media=0, desviación=1
standardized_feature = (x - mean(x)) / std(x)
```

**¿Cuándo usar?**
- Con algoritmos que asumen distribución gaussiana (Regresión Logística, LDA)
- Cuando hay outliers moderados
- Para PCA (¡crítico!)
- Para regularización (L1/L2)

**Ventajas clave:**
- Más robusto a outliers que Min-Max
- Mantiene información sobre outliers
- No acota valores a un rango fijo

---

#### 2.2 Transformaciones No Lineales

**Logaritmo Natural (log transformation)**
```python
# Comprime valores grandes, expande valores pequeños
log_feature = np.log(x + 1)  # +1 evita log(0)
```

**Casos de uso según el libro:**
- Variables con distribución exponencial (ingresos, precios)
- Cuando hay varios órdenes de magnitud
- Para estabilizar varianza
- Datos sesgados positivamente (skewed right)

**Ejemplo real del libro:** Transformar precios de casas ($50K a $5M) a escala logarítmica hace que el modelo trate diferencias porcentuales en lugar de absolutas.

---

**Box-Cox Transformation**
```python
from scipy import stats
transformed, lambda_param = stats.boxcox(x)
```

**Qué hace:** Encuentra la mejor transformación de potencia para normalizar datos.

**Casos especiales:**
- λ = 1: sin transformación
- λ = 0.5: raíz cuadrada
- λ = 0: logaritmo
- λ = -1: recíproco

**El libro enfatiza:** Esta es la transformación "automática" óptima, pero requiere que todos los valores sean positivos.

---

#### 2.3 Binarización

**Concepto clave del libro:** Convertir features numéricas en indicadores binarios cuando la relación no es lineal.
```python
# Ejemplo: Edad → Es_Mayor_de_Edad
is_adult = (age >= 18).astype(int)
```

**Cuándo binarizar según Zheng & Casari:**
1. **Umbrales naturales del dominio:** Edad legal, temperatura de congelación
2. **Relaciones no monotónicas:** Efecto diferente arriba/abajo del umbral
3. **Simplificación interpretativa:** Facilitar explicación del modelo

**Advertencia del libro:** La binarización destruye información. Solo usar cuando la relación es genuinamente categórica.

---

#### 2.4 Binning (Discretización)

**Técnicas principales:**

**Fixed-width binning**
```python
# Intervalos de igual tamaño
pd.cut(x, bins=5)  # 5 intervalos iguales
```

**Quantile binning**
```python
# Cada bin tiene igual cantidad de observaciones
pd.qcut(x, q=5)  # 5 quintiles
```

**Ventajas según el libro:**
- Captura relaciones no lineales sin asumir forma funcional
- Robusto a outliers
- Facilita interpretación

**Desventajas:**
- Pérdida de granularidad
- Sensible a elección de bins
- Puede crear discontinuidades artificiales

**Consejo de las autoras:** Usar visualización (histogramas) para determinar número óptimo de bins.

---

#### 2.5 Interacciones entre Features

**Concepto central:** Muchas relaciones reales son multiplicativas, no aditivas.
```python
# Interacción simple
df['precio_por_m2'] = df['precio'] / df['metros']

# Interacción polinómica
df['area_x_habitaciones'] = df['area'] * df['habitaciones']
```

**Tipos de interacciones:**

1. **Multiplicación directa:** Captura efectos conjuntos
2. **División (ratios):** Normaliza una variable por otra
3. **Polinomios:** Relaciones cuadráticas, cúbicas

**Ejemplo icónico del libro: Datos de Ames Housing**
- `GrLivArea * OverallQual` captura que calidad y tamaño interactúan
- Una casa grande de baja calidad ≠ una casa pequeña de alta calidad

**Sklearn para interacciones:**
```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2, interaction_only=True)
# Crea todas las combinaciones de pares
```

**Advertencia crítica:** Las interacciones aumentan exponencialmente:
- 10 features → 55 pares
- 100 features → 5,050 pares
- Riesgo de overfitting y curse of dimensionality

---

#### 2.6 Transformaciones de Potencia Generales

**Power Transforms del libro:**
```python
# Raíz cuadrada (λ=0.5)
sqrt_feature = np.sqrt(x)

# Raíz cúbica
cbrt_feature = np.cbrt(x)

# Cuadrado (para relaciones cuadráticas)
squared_feature = x ** 2
```

**Guía de selección:**
- **Datos muy sesgados:** log o box-cox
- **Heterocedasticidad moderada:** raíz cuadrada
- **Relaciones cuadráticas evidentes:** x²

---

### Conceptos Clave del Capítulo 2

!!! tip "Insights Principales"
    
    **1. Escala importa**
    > "Features en diferentes escalas pueden dominar el aprendizaje del modelo, ignorando features valiosas en escalas menores."
    
    **2. Distribuciones importan**
    > "Muchos algoritmos asumen distribuciones razonablemente normales. Transformaciones pueden hacer que datos reales cumplan estos supuestos."
    
    **3. El dominio guía las transformaciones**
    > "Las mejores features engineering decisions vienen de entender profundamente el problema, no solo de aplicar técnicas mecánicamente."
    
    **4. Balance entre complejidad y valor**
    > "Cada transformación adicional incrementa complejidad. Debe justificarse con mejora medible en performance."

---

### Casos de Uso por Algoritmo

| Algoritmo | Transformaciones Críticas | Razón |
|-----------|---------------------------|-------|
| **Linear Regression** | Standardization, log transforms | Asume linealidad y normalidad |
| **K-Nearest Neighbors** | Min-Max scaling | Distancia euclidiana sensible a escala |
| **Neural Networks** | Standardization | Convergencia más rápida |
| **Decision Trees** | Ninguna (invariante a monotónicas) | Trabajan con rankings |
| **PCA** | Standardization (¡obligatorio!) | Compara varianzas |
| **SVM** | Standardization | Kernel tricks sensibles a escala |

---

### Flujo de Decisión para Transformaciones Numéricas
```
¿Outliers extremos?
├─ SÍ → Log transform o Robust Scaler
└─ NO → ¿Distribución muy sesgada?
    ├─ SÍ → Box-Cox o Log
    └─ NO → ¿Algoritmo sensible a escala?
        ├─ SÍ → Standardization (ML general) o Min-Max (NN)
        └─ NO → Sin transformación (árboles)
```

---

### Ejercicio Práctico del Libro

**Dataset:** Bike Sharing (usado en el cap. 2)
```python
# Ejemplo de pipeline del libro
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('log_transform', FunctionTransformer(np.log1p)),
    ('scaler', StandardScaler()),
    ('poly', PolynomialFeatures(degree=2, interaction_only=True))
])
```

---

## Capítulo 5: Categorical Variables

!!! warning "Lectura Obligatoria - Evaluación: 01/10"

### Objetivos del Capítulo
Dominar las técnicas de encoding categórico, entendiendo las trade-offs entre interpretabilidad, dimensionalidad y información preservada.

### Contenido Detallado

#### 5.1 El Problema con Variables Categóricas

**Por qué necesitamos encoding:**

> "Los algoritmos de ML trabajan con números. Las categorías son símbolos. El encoding es el puente." - Zheng & Casari

**Ejemplo del libro:**
```python
colors = ['red', 'blue', 'green', 'red', 'green']
# Los modelos NO pueden procesar esto directamente
```

**Desafíos según el libro:**
1. **Ordinalidad:** ¿Hay orden natural? (pequeño < mediano < grande)
2. **Cardinalidad:** ¿Cuántas categorías únicas?
3. **Frecuencia:** ¿Distribución balanceada o sesgada?
4. **Dominancia:** ¿El encoding afectará importancia relativa?

---

#### 5.2 One-Hot Encoding (Dummy Variables)

**Concepto:** Crear una columna binaria por cada categoría.
```python
# Antes
color: ['red', 'blue', 'green']

# Después
color_red:   [1, 0, 0]
color_blue:  [0, 1, 0]
color_green: [0, 0, 1]
```

**Implementación:**
```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
encoded = encoder.fit_transform(df[['color']])
```

**Ventajas según el libro:**
- No asume orden entre categorías
- Interpretable: cada columna = presencia de categoría
- Funciona bien con regresión lineal
- Compatible con regularización

**Desventajas críticas:**
- **Explosión dimensional con alta cardinalidad**
- Matrices sparse (muchos ceros)
- Colinealidad perfecta (dummy variable trap)
- No captura similitud entre categorías

**Regla del libro:** One-Hot funciona bien hasta ~50 categorías. Más allá, considerar alternativas.

---

#### 5.3 Label Encoding (Integer Encoding)

**Concepto:** Asignar un entero único a cada categoría.
```python
# Antes
size: ['small', 'medium', 'large', 'small']

# Después (NO ORDINAL)
size: [0, 1, 2, 0]
```

**Implementación:**
```python
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
df['size_encoded'] = le.fit_transform(df['size'])
```

**️ ADVERTENCIA CRÍTICA DEL LIBRO:**

> "Label Encoding NO es apropiado para categorías sin orden natural. El modelo interpretará que 'large' (2) es 'el doble' que 'small' (1), lo cual es matemáticamente absurdo."

**Cuándo usar:**
- Variables target en clasificación
- Como paso intermedio para otros encodings
- Con árboles de decisión (que pueden manejar el ordinalismo artificial)

**Cuándo NO usar:**
- Features categóricas nominales en regresión lineal
- Cuando las categorías no tienen orden natural
- Con algoritmos basados en distancia (KNN, SVM)

---

#### 5.4 Ordinal Encoding

**Concepto:** Label encoding pero con orden semánticamente correcto.
```python
from sklearn.preprocessing import OrdinalEncoder

# Especificar orden explícito
size_order = [['small', 'medium', 'large', 'xlarge']]

encoder = OrdinalEncoder(categories=size_order)
df['size_ordinal'] = encoder.fit_transform(df[['size']])

# Resultado: small=0, medium=1, large=2, xlarge=3
```

**Casos de uso del libro:**
- Tallas de ropa: XS < S < M < L < XL
- Nivel educativo: High School < Bachelor < Master < PhD
- Ratings: Bad < Fair < Good < Excellent

**Insight del libro:**
> "Ordinal encoding preserva información de orden pero asume intervalos iguales. Si 'large' no es exactamente +1 de 'medium', considera mapeos customizados."

**Mapeo custom:**
```python
size_map = {'small': 1, 'medium': 3, 'large': 7, 'xlarge': 15}
df['size_custom'] = df['size'].map(size_map)
```

---

#### 5.5 Target Encoding (Mean Encoding)

**Concepto revolucionario:** Reemplazar categoría con la media del target para esa categoría.
```python
# Ejemplo del libro: Predecir precio por ciudad
city_means = train.groupby('city')['price'].mean()

# New York → $450,000 (media)
# Austin → $280,000 (media)
```

**Implementación correcta:**
```python
from category_encoders import TargetEncoder

# ¡CON CROSS-VALIDATION!
encoder = TargetEncoder(smoothing=1.0)
df['city_encoded'] = encoder.fit_transform(df['city'], df['price'])
```

**Ventajas poderosas:**
- Alta cardinalidad → 1 columna
- Captura relación con target
- Funciona excepcionalmente bien en práctica
- Usado en muchas soluciones ganadoras de Kaggle

**PELIGRO: Overfitting según el libro**

> "Target encoding es fantástico pero peligroso. Sin validación cruzada apropiada, causes data leakage severo."

**Técnicas para prevenir overfitting:**

1. **Smoothing (suavizado):**
```python
# Combinar media de categoría con media global
smoothed = (count * cat_mean + m * global_mean) / (count + m)
# m = parámetro de smoothing (típicamente 1-100)
```

2. **Cross-validation:**
```python
# Encodear con folds separados
from sklearn.model_selection import KFold

kf = KFold(n_splits=5)
for train_idx, val_idx in kf.split(X):
    # Calcular target means SOLO con train_idx
    # Aplicar a val_idx
```

3. **Añadir ruido:**
```python
# Ruido gaussiano para regularizar
encoded += np.random.normal(0, 0.01, size=encoded.shape)
```

**Variante: Target encoding con probabilidades (clasificación)**
```python
# Para clasificación binaria
city_probability = train.groupby('city')['target'].mean()
# San Francisco → 0.73 (73% de clase positiva)
```

---

#### 5.6 Frequency Encoding

**Concepto:** Reemplazar categoría con su frecuencia de aparición.
```python
freq = df['city'].value_counts() / len(df)

df['city_freq'] = df['city'].map(freq)

# New York aparece en 40% → 0.40
# Boulder aparece en 0.1% → 0.001
```

**Cuándo usar según el libro:**
- Cuando la frecuencia de categoría es predictiva per se
- Ejemplo: Marcas raras de coches pueden indicar lujo
- Ejemplo: Palabras raras en texto pueden ser spam

**Ventajas:**
- Reduce alta cardinalidad a 1 columna
- No requiere validación cruzada
- Captura información estadística valiosa

**Limitaciones:**
- Categorías diferentes con misma frecuencia → mismo encoding
- No captura relación con target

---

#### 5.7 Binary Encoding

**Concepto:** Convertir label encoding a representación binaria.
```python
# 5 categorías necesitan 3 bits (2^3 = 8 > 5)
Red    → 000 → [0, 0, 0]
Blue   → 001 → [0, 0, 1]
Green  → 010 → [0, 1, 0]
Yellow → 011 → [0, 1, 1]
Purple → 100 → [1, 0, 0]
```

**Comparación con One-Hot:**
- 100 categorías
- One-Hot: 100 columnas
- Binary: 7 columnas (2^7 = 128 > 100)

**Ventajas del libro:**
- Más compacto que One-Hot
- Menos sparse
- Útil para cardinalidad media-alta (50-1000)

**Desventajas:**
- Introduce ordinalismo artificial
- Menos interpretable
- En práctica, no siempre supera One-Hot

---

#### 5.8 Hash Encoding (Feature Hashing)

**Concepto avanzado:** Usar función hash para mapear categorías a espacio fijo.
```python
from sklearn.feature_extraction import FeatureHasher

hasher = FeatureHasher(n_features=10, input_type='string')
hashed = hasher.transform(df['high_cardinality_col'])
```

**Ejemplo del libro:**
```python
# 10,000 categorías → hash a 100 features
hash('New York') % 100    → 42
hash('Los Angeles') % 100 → 7
hash('Austin') % 100      → 42  # ¡Colisión!
```

**Cuándo usar:**
- Cardinalidad extremadamente alta (>1000)
- Nuevas categorías en producción (online learning)
- Memoria limitada
- Procesamiento de texto

**Trade-offs críticos:**
- Espacio fijo garantizado
- **Colisiones** (múltiples categorías → mismo hash)
- No reversible (no puedes recuperar categoría original)
- Pérdida de interpretabilidad

**Consejo del libro:** Usar hash space grande (~10x número de categorías) para minimizar colisiones.

---

#### 5.9 Leave-One-Out Encoding

**Concepto:** Variante de target encoding sin data leakage.
```python
# Para cada fila, calcular target mean EXCLUYENDO esa fila
def leave_one_out(df, cat_col, target_col):
    global_mean = df[target_col].mean()
    cat_sum = df.groupby(cat_col)[target_col].sum()
    cat_count = df.groupby(cat_col)[target_col].count()
    
    df['loo'] = df.apply(lambda row: 
        (cat_sum[row[cat_col]] - row[target_col]) / 
        (cat_count[row[cat_col]] - 1)
        if cat_count[row[cat_col]] > 1 
        else global_mean,
        axis=1
    )
```

**Ventaja sobre target encoding estándar:**
- Elimina leakage en training set
- Mejores garantías de generalización

---

### ️ Guía de Decisión: ¿Qué Encoding Usar?

**El libro proporciona este framework:**
```
¿Cuántas categorías?
│
├─ < 10 categorías
│   └─ ¿Hay orden natural?
│       ├─ SÍ → Ordinal Encoding
│       └─ NO → One-Hot Encoding
│
├─ 10-50 categorías
│   └─ ¿Hay orden natural?
│       ├─ SÍ → Ordinal Encoding
│       └─ NO → One-Hot o Target Encoding (con CV)
│
├─ 50-1000 categorías
│   └─ Target Encoding (preferido) o Binary Encoding
│
└─ > 1000 categorías
    └─ Hash Encoding o Target Encoding con smoothing agresivo
```

**Consideraciones adicionales:**

| Pregunta | Encoding Sugerido |
|----------|-------------------|
| ¿Interpretabilidad crítica? | One-Hot o Ordinal |
| ¿Nuevas categorías en producción? | Hash Encoding |
| ¿Target es numérico y correlacionado? | Target Encoding |
| ¿Categorías raras importan? | Target Encoding + Smoothing |
| ¿Memoria limitada? | Hash o Binary |
| ¿Algoritmo = árboles? | Label Encoding puede funcionar |

---

### Casos de Estudio del Libro

#### Caso 1: Predicción de Precios de Casas (Ames Housing)

**Variable:** `Neighborhood` (25 categorías)

**Experimento del libro:**
- One-Hot: 25 features, RMSE = $25,000
- Target Encoding (con CV): 1 feature, RMSE = $23,500
- Frequency Encoding: 1 feature, RMSE = $26,800

**Conclusión:** Target encoding ganó por capturar relación directa con precio.

---

#### Caso 2: Detección de Fraude (alta cardinalidad)

**Variable:** `merchant_id` (50,000 comercios)

**Experimento:**
- One-Hot: Imposible (memoria)
- Hash (n=1000): AUC = 0.87
- Target Encoding: AUC = 0.91

**Conclusión:** Target encoding superior, pero hash viable si memory constrained.

---

### Insights Clave del Capítulo 5

!!! tip "Lecciones Principales"
    
    **1. No existe encoding universal**
    > "La elección de encoding depende de: cardinalidad, semántica, algoritmo, y relación con target."
    
    **2. Target encoding es poderoso pero peligroso**
    > "Target encoding consistentemente gana competiciones, pero require disciplina férrea contra data leakage."
    
    **3. Alta cardinalidad no es enemiga**
    > "Con las técnicas correctas, alta cardinalidad es oportunidad, no problema."
    
    **4. Piensa en el modelo downstream**
    > "Un encoding óptimo para Random Forest puede ser terrible para Logistic Regression."
    
    **5. Combinar encodings**
    > "No te limites a un encoding. Combina One-Hot para categorías importantes + Target para el resto."

---

### ️ Errores Comunes (Capítulo 5)

**1. Dummy Variable Trap**
```python
# MALO: n categorías → n columnas (colinealidad perfecta)
pd.get_dummies(df, drop_first=False)

# BUENO: n categorías → n-1 columnas
pd.get_dummies(df, drop_first=True)
```

**2. Data Leakage en Target Encoding**
```python
# MALO: Calcular target means con todo el dataset
means = df.groupby('category')['target'].mean()

# BUENO: Solo con training set, aplicar a test
train_means = train.groupby('category')['target'].mean()
test['encoded'] = test['category'].map(train_means)
```

**3. No manejar categorías desconocidas**
```python
# MALO: Producción ve categoría nueva → crash
encoder.fit(train['city'])

# BUENO: Estrategia para unknowns
encoder = OneHotEncoder(handle_unknown='ignore')
# O mapear a mean global en target encoding
```

**4. Ignorar distribución de categorías**
```python
# Si 1 categoría tiene 99% de datos
# One-Hot crea feature casi constante (inútil)
# Mejor: Agrupar categorías raras
```

---

## Capítulo 6: Dimensionality Reduction

!!! warning "Lectura Obligatoria - Evaluación: 01/10"

### Objetivos del Capítulo
Entender profundamente la maldición de la dimensionalidad y dominar técnicas de reducción, especialmente PCA, con énfasis en interpretación y aplicación correcta.

### Contenido Detallado

#### 6.1 The Curse of Dimensionality

**Concepto fundamental del libro:**

> "A medida que el número de features crece, el volumen del espacio crece exponencialmente, y los datos disponibles se vuelven sparse."

**Implicaciones matemáticas:**
```python
# Ejemplo del libro: Densidad de datos
import numpy as np

# 100 puntos en 1D: Cubrimos bien el espacio [0,1]
points_1d = np.random.rand(100, 1)
# Densidad: 100 puntos/unidad

# 100 puntos en 10D: Espacio es 10^10 veces mayor
points_10d = np.random.rand(100, 10)
# Densidad: 10^-8 puntos/unidad → prácticamente vacío
```

**Efectos adversos documentados:**

1. **Distancias pierden significado:**
```python
# En alta dimensión, casi todos los puntos están igualmente lejos
from scipy.spatial.distance import pdist

dims = [2, 10, 50, 100]
for d in dims:
    X = np.random.randn(1000, d)
    distances = pdist(X)
    ratio = distances.max() / distances.min()
    # d=2:  ratio ~ 10
    # d=100: ratio ~ 1.5  ← distancias colapsan
```

2. **Sample size requirements explotan:**
- Para cubrir espacio razonablemente:
  - 1D: 10 samples
  - 2D: 100 samples  
  - 10D: 10 billones de samples

**Señales de curse of dimensionality:**
- Modelos sobreajustan fácilmente
- KNN performance colapsa
- Visualización imposible
- Tiempo de entrenamiento explota

---

#### 6.2 Principal Component Analysis (PCA)

**Definición del libro:**

> "PCA encuentra direcciones ortogonales de máxima varianza en los datos. La primera componente captura más varianza, la segunda captura más varianza residual, etc."

**Matemática intuitive:**

**Paso 1: Centrar datos**
```python
X_centered = X - X.mean(axis=0)
# PCA trabaja con desviaciones de la media
```

**Paso 2: Calcular matriz de covarianza**
```python
cov_matrix = np.cov(X_centered.T)
# Mide cómo features co-varían
```

**Paso 3: Eigendecomposition**
```python
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
# Eigenvectors = direcciones principales
# Eigenvalues = varianza en cada dirección
```

**Paso 4: Proyectar datos**
```python
# Tomar top k eigenvectors
top_k_eigenvectors = eigenvectors[:, :k]
X_pca = X_centered @ top_k_eigenvectors
```

---

**Implementación en Scikit-learn:**
```python
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# ¡CRÍTICO! Estandarizar primero
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# PCA
pca = PCA(n_components=10)
X_pca = pca.fit_transform(X_scaled)

print("Varianza explicada por componente:")
print(pca.explained_variance_ratio_)

print("Varianza acumulada:")
print(np.cumsum(pca.explained_variance_ratio_))
```

---

**Interpretación de Componentes:**
```python
# Loadings = contribución de cada feature original
loadings = pca.components_.T * np.sqrt(pca.explained_variance_)

# Ejemplo: PC1 en dataset de iris
feature_names = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
pc1_loadings = dict(zip(feature_names, loadings[:, 0]))

# Output típico:
# petal_length:  0.89 ← domina PC1
# petal_width:   0.82
# sepal_length:  0.45
# sepal_width:  -0.12 ← contribución negativa
```

**Insight del libro:**
> "Componentes principales son combinaciones lineales de features originales. Un loading alto significa que esa feature contribuye fuertemente a esa componente."

---

#### 6.3 Selección de Número de Componentes

**Método 1: Varianza explicada acumulada**
```python
# Regla común: 95% varianza
cum_variance = np.cumsum(pca.explained_variance_ratio_)
n_components_95 = np.argmax(cum_variance >= 0.95) + 1

# Visualización (Scree Plot)
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.plot(range(1, len(pca.explained_variance_ratio_) + 1),
         pca.explained_variance_ratio_, 'bo-')
plt.xlabel('Componente Principal')
plt.ylabel('Varianza Explicada')
plt.title('Scree Plot')

plt.subplot(1, 2, 2)
plt.plot(range(1, len(cum_variance) + 1), cum_variance, 'ro-')
plt.axhline(y=0.95, color='k', linestyle='--')
plt.xlabel('Número de Componentes')
plt.ylabel('Varianza Acumulada')
plt.title('Varianza Acumulada')
```

**Método 2: Kaiser criterion (eigenvalue > 1)**
```python
# Retener solo componentes con eigenvalue > 1
n_components = sum(pca.explained_variance_ > 1)
```

**Razonamiento:** Componente con eigenvalue < 1 explica menos que una feature original estandarizada.

**Método 3: Cross-validation con performance de modelo**
```python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

scores = []
for n in range(1, min(50, X.shape[1])):
    pca = PCA(n_components=n)
    X_pca = pca.fit_transform(X_scaled)
    score = cross_val_score(LogisticRegression(), X_pca, y, cv=5).mean()
    scores.append(score)

optimal_n = np.argmax(scores) + 1
```

**Consejo del libro:** No hay respuesta única. Depende de tu objetivo:
- Visualización: 2-3 componentes
- Reducir dimensionalidad: 90-95% varianza
- Pre-procesamiento: validación cruzada

---

#### 6.4 PCA: Ventajas y Limitaciones

**Ventajas según Zheng & Casari:**

 **Reducción dimensional automática**
- De 1000 features a 50 sin selección manual

 **Decorrelación de features**
- Componentes principales son ortogonales
- Útil para algoritmos que asumen independencia

 **Mejora computational**
- Modelos entrenan más rápido con menos features
- Reduce overfitting

 **Visualización de alta dimensión**
- Proyectar a 2D/3D para exploración

 **Ruido reduction**
- Componentes menores suelen ser ruido

---

**Limitaciones críticas:**

 **Pérdida de interpretabilidad**
> "PC1 es 0.3*edad + 0.5*ingreso - 0.2*deuda... ¿Qué significa esto en términos de negocio?"

 **Asume relaciones lineales**
- PCA no captura manifolds no lineales
- Para eso existen kernel PCA, t-SNE, UMAP

 **Sensible a escala (¡CRÍTICO!)**
```python
# Sin standardization: features en diferentes unidades
# Edad (0-100) vs Ingreso (0-1,000,000)
# PCA dominated por ingreso

# Con standardization
from sklearn.pipeline import Pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA())
])
```

 **Sensible a outliers**
- Outliers distorsionan dirección de máxima varianza
- Solución: Robust PCA o eliminar outliers primero

 **No usa información del target**
- Componentes maximizan varianza, no predictive power
- Posible que elimine features valiosas con baja varianza

---

#### 6.5 Variantes de PCA en el Libro

**Incremental PCA**
```python
from sklearn.decomposition import IncrementalPCA

# Para datasets muy grandes (no caben en memoria)
ipca = IncrementalPCA(n_components=10, batch_size=100)

for batch in data_batches:
    ipca.partial_fit(batch)

X_pca = ipca.transform(X)
```

**Kernel PCA**
```python
from sklearn.decomposition import KernelPCA

# Para manifolds no lineales
kpca = KernelPCA(n_components=10, kernel='rbf', gamma=0.1)
X_kpca = kpca.fit_transform(X_scaled)
```

**Ejemplo del libro:** Swiss Roll dataset
- PCA lineal: No desenrolla el roll
- Kernel PCA (RBF): Desenrolla correctamente

**Sparse PCA**
```python
from sklearn.decomposition import SparsePCA

# Componentes con solo algunas features non-zero
spca = SparsePCA(n_components=10, alpha=0.1)
X_spca = spca.fit_transform(X_scaled)

# Ventaja: Interpretabilidad mejorada
# Desventaja: Menos varianza explicada
```

---

#### 6.6 Feature Selection (alternativa a PCA)

**Filosofía diferente:**
- PCA: Combina features
- Feature Selection: Elige subset de features originales

**Ventajas de feature selection:**
- Interpretabilidad preservada
- Puede usar información del target
- Dominio knowledge aplicable

---

**Métodos en el libro:**

**1. Filter Methods (independientes del modelo)**

**Variance Threshold:**
```python
from sklearn.feature_selection import VarianceThreshold

# Eliminar features con varianza < umbral
selector = VarianceThreshold(threshold=0.1)
X_filtered = selector.fit_transform(X)
```

**Correlación con target:**
```python
# Para regresión
correlations = X.corrwith(y).abs()
top_features = correlations.nlargest(10).index

# Para clasificación
from sklearn.feature_selection import f_classif, SelectKBest

selector = SelectKBest(f_classif, k=10)
X_selected = selector.fit_transform(X, y)
```

---

**2. Wrapper Methods (usan modelo)**

**Recursive Feature Elimination (RFE):**
```python
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression

estimator = LogisticRegression()
rfe = RFE(estimator, n_features_to_select=10, step=1)
X_rfe = rfe.fit_transform(X, y)

print("Features seleccionadas:", X.columns[rfe.support_])
print("Ranking de features:", rfe.ranking_)
```

**Cómo funciona:**
1. Entrenar modelo con todas las features
2. Eliminar feature menos importante
3. Repetir hasta k features

**Forward Selection:**
```python
# Agregar features incrementalmente
selected = []
remaining = list(X.columns)

while len(selected) < k:
    best_score = 0
    best_feature = None
    
    for feature in remaining:
        trial = selected + [feature]
        score = cross_val_score(model, X[trial], y).mean()
        if score > best_score:
            best_score = score
            best_feature = feature
    
    selected.append(best_feature)
    remaining.remove(best_feature)
```

---

**3. Embedded Methods (parte del entrenamiento)**

**Regularización L1 (Lasso):**
```python
from sklearn.linear_model import LassoCV

lasso = LassoCV(cv=5)
lasso.fit(X, y)

# Features con coef != 0 son seleccionadas
selected_features = X.columns[lasso.coef_ != 0]
```

**Feature Importances de árboles:**
```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100)
rf.fit(X, y)

importances = pd.Series(rf.feature_importances_, index=X.columns)
top_features = importances.nlargest(10)
```

---

#### 6.7 PCA vs Feature Selection: Guía de Decisión

**Según el libro:**

| Criterio | PCA | Feature Selection |
|----------|-----|-------------------|
| **Interpretabilidad** | Baja | Alta  |
| **Reducción dimensional** | Excelente  | Buena |
| **Preserva features originales** | No | Sí  |
| **Usa información de target** | No | Sí (algunos métodos)  |
| **Speed** | Muy rápido  | Variable |
| **Multicolinealidad** | Elimina completamente  | Puede retener correlaciones |
| **Dominio knowledge** | Difícil aplicar | Fácil aplicar  |

**Recomendación del libro:**

> "Usa PCA cuando necesitas reducción dimensional radical y no te importa interpretabilidad. Usa feature selection cuando stakeholders necesitan entender qué features impulsan predicciones."

**Enfoque híbrido:**
```python
# 1. Feature selection para eliminar ruido obvio
selector = VarianceThreshold()
X_filtered = selector.fit_transform(X)

# 2. PCA en features restantes
pca = PCA(n_components=0.95)
X_final = pca.fit_transform(X_filtered)
```

---

#### 6.8 Caso de Estudio: MNIST (del libro)

**Dataset:** 784 features (28x28 pixels)

**Experimento 1: PCA pura**
```python
pca = PCA(n_components=0.95)  # 95% varianza
X_pca = pca.fit_transform(X_scaled)

print(f"Features originales: 784")
print(f"Features después de PCA: {X_pca.shape[1]}")  # ~150
print(f"Reducción: {(1 - X_pca.shape[1]/784)*100:.1f}%")  # ~80%

# Accuracy de clasificación
# Original: 97.2%
# PCA (150 componentes): 96.8%  ← mínima pérdida
```

**Insight:** 80% reducción dimensional con solo 0.4% pérdida en accuracy.

---

**Experimento 2: Visualización con 2 componentes**
```python
pca_2d = PCA(n_components=2)
X_2d = pca_2d.fit_transform(X_scaled)

plt.scatter(X_2d[:, 0], X_2d[:, 1], c=y, cmap='tab10', alpha=0.5)
plt.xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]:.1%} varianza)')
plt.ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]:.1%} varianza)')
plt.title('MNIST proyectado a 2D con PCA')
```

**Observación del libro:** Incluso con solo 2 componentes (~10% varianza), clusters de dígitos son visibles.

---

#### 6.9 Otras Técnicas de Reducción Dimensional

**El libro menciona brevemente:**

**t-SNE (t-Distributed Stochastic Neighbor Embedding)**
- Mejor que PCA para visualización
- No lineal
- Preserva estructura local (clusters)
- Costoso computacionalmente
- No determinista
```python
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, perplexity=30, random_state=42)
X_tsne = tsne.fit_transform(X_scaled)  # Solo para visualización
```

**ADVERTENCIA:** t-SNE solo para visualización, NO para pre-procesamiento.

---

**Autoencoders (mencionado)**
- Red neuronal que comprime y reconstruye datos
- PCA no lineal
- Requiere mucho más setup que PCA

---

### Insights Clave del Capítulo 6

!!! tip "Lecciones Principales"
    
    **1. Alta dimensionalidad es enemigo silencioso**
    > "Modelos parecen funcionar, pero están sufriendo. Reducción dimensional debe ser reflexiva, no automática."
    
    **2. PCA es herramienta, no solución mágica**
    > "PCA es increíblemente útil para ciertos problemas y completamente inapropiado para otros."
    
    **3. Siempre estandarizar antes de PCA**
    > "Olvidar standardization antes de PCA es uno de los errores más comunes y devastadores."
    
    **4. Varianza ≠ importancia predictiva**
    > "PCA maximiza varianza, que no necesariamente correlaciona con predictive power para tu target."
    
    **5. Interpretabilidad vs performance**
    > "Reducción dimensional casi siempre implica trade-off. Cuantifica y comunica claramente."

---

### Receta Completa: Pipeline de Reducción Dimensional
```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.ensemble import RandomForestClassifier

# Pipeline completo del libro
pipeline = Pipeline([
    # 1. Limpieza básica
    ('imputer', SimpleImputer(strategy='median')),
    
    # 2. Encoding categórico
    ('encoder', OneHotEncoder(handle_unknown='ignore')),
    
    # 3. Standardization (¡CRÍTICO para PCA!)
    ('scaler', StandardScaler()),
    
    # 4. Feature selection (opcional)
    ('selector', SelectKBest(f_classif, k=50)),
    
    # 5. PCA
    ('pca', PCA(n_components=0.95)),
    
    # 6. Modelo
    ('classifier', RandomForestClassifier())
])

# Entrenar
pipeline.fit(X_train, y_train)

# Evaluar
score = pipeline.score(X_test, y_test)

# Analizar
pca_step = pipeline.named_steps['pca']
print(f"Componentes finales: {pca_step.n_components_}")
print(f"Varianza explicada: {pca_step.explained_variance_ratio_.sum():.2%}")
```

---

### ️ Errores Comunes del Capítulo 6

**1. Olvidar standardization**
```python
# DESASTROSO
pca = PCA(n_components=10)
X_pca = pca.fit_transform(X)  # Features en diferentes escalas

# CORRECTO
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
pca = PCA(n_components=10)
X_pca = pca.fit_transform(X_scaled)
```

**2. Aplicar PCA a train y test separadamente**
```python
# MALO: PCA aprende diferentes transformaciones
pca_train = PCA().fit_transform(X_train)
pca_test = PCA().fit_transform(X_test)

# BUENO: Fit en train, transform en test
pca = PCA()
pca.fit(X_train)
X_train_pca = pca.transform(X_train)
X_test_pca = pca.transform(X_test)
```

**3. Usar PCA antes de train/test split**
```python
# DATA LEAKAGE
X_pca = PCA().fit_transform(X)
X_train, X_test = train_test_split(X_pca)

# CORRECTO
X_train, X_test = train_test_split(X)
pca = PCA().fit(X_train)
X_train_pca = pca.transform(X_train)
X_test_pca = pca.transform(X_test)
```

**4. Esperar interpretabilidad después de PCA**
- PCA combina features
- Comunicar a stakeholders que features originales se pierden
- Si interpretabilidad es crítica, usar feature selection

---

## Curso Kaggle: Feature Engineering

!!! info "Recurso Complementario Obligatorio"
    **[Kaggle Feature Engineering - Curso Completo](https://www.kaggle.com/learn/feature-engineering)**

### Estructura del Curso

#### Lección 1: Baseline Model
- Establecer performance inicial
- Validación cruzada correcta
- Métricas apropiadas

#### Lección 2: Categorical Encodings
- Implementación práctica de encodings
- Count encoding
- Target encoding con validation
- CatBoost encoding

#### Lección 3: Feature Generation
- Interacciones
- Agregaciones por grupos
- Features de dominio

#### Lección 4: Feature Selection
- Mutual information
- Permutation importance
- Recursive feature elimination

#### Lección 5: Principal Component Analysis
- PCA en práctica
- Interpretación de componentes
- Integración con modelos

### Ventajas del Curso Kaggle

 **Hands-on:** Notebooks ejecutables
 **Datasets reales:** Competiciones de Kaggle
 **Iterativo:** Build conocimiento progresivamente
 **Certificado:** Validación oficial de Kaggle

---

## Recursos Complementarios

### Documentación Scikit-learn (lectura complementaria)

#### Preprocessing & Encoders
[Encoding Categorical Features](https://scikit-learn.org/stable/modules/preprocessing.html#encoding-categorical-features)

**Contenido clave:**
- API completa de encoders
- Comparación de métodos
- Ejemplos reproducibles
- Best practices

#### PCA Documentation
[Principal Component Analysis](https://scikit-learn.org/stable/modules/decomposition.html#pca)

**Contenido clave:**
- Parámetros detallados
- Variantes de PCA (Incremental, Kernel, Sparse)
- Interpretación de atributos
- Ejemplos avanzados

#### Pipelines & ColumnTransformer
[Compose: ColumnTransformer & Pipeline](https://scikit-learn.org/stable/modules/compose.html)

**Contenido clave:**
- Construcción de pipelines
- ColumnTransformer para diferentes tipos de features
- Integración con GridSearchCV
- Serialización de pipelines

---

## Código de Referencia Completo
```python
"""
Pipeline completo de Feature Engineering
Basado en conceptos de Zheng & Casari (2018)
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.decomposition import PCA
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from category_encoders import TargetEncoder

# ============================================
# 1. TRANSFORMACIONES NUMÉRICAS (Cap. 2)
# ============================================

def numeric_transformations(df, numeric_cols):
    """Aplicar transformaciones numéricas del Cap. 2"""
    
    # Log transform para features con distribución exponencial
    for col in ['price', 'income']:
        if col in numeric_cols:
            df[f'{col}_log'] = np.log1p(df[col])
    
    # Interacciones
    if 'area' in df.columns and 'rooms' in df.columns:
        df['area_per_room'] = df['area'] / df['rooms']
    
    # Binning
    if 'age' in df.columns:
        df['age_binned'] = pd.cut(df['age'], 
                                   bins=[0, 18, 35, 50, 65, 100],
                                   labels=['child', 'young', 'adult', 'senior', 'elder'])
    
    return df

# ============================================
# 2. CATEGORICAL ENCODING (Cap. 5)
# ============================================

def get_encoding_strategy(cardinality, has_order=False):
    """Guía de decisión para encoding según el libro"""
    
    if has_order:
        return 'ordinal'
    elif cardinality < 10:
        return 'onehot'
    elif cardinality < 50:
        return 'target'  # con cross-validation
    else:
        return 'hash'  # o target con smoothing

# Pipeline de encoding
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', drop='first'))
])

target_encoder = TargetEncoder(smoothing=1.0)

# ============================================
# 3. PCA Y REDUCCIÓN DIMENSIONAL (Cap. 6)
# ============================================

def apply_pca_with_analysis(X_train, X_test, variance_threshold=0.95):
    """Aplicar PCA con análisis completo"""
    
    # Standardization (¡CRÍTICO!)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # PCA inicial (todas las componentes)
    pca_full = PCA()
    pca_full.fit(X_train_scaled)
    
    # Análisis
    cum_variance = np.cumsum(pca_full.explained_variance_ratio_)
    n_components = np.argmax(cum_variance >= variance_threshold) + 1
    
    print(f"Componentes para {variance_threshold:.0%} varianza: {n_components}")
    print(f"Reducción: {(1 - n_components/X_train.shape[1])*100:.1f}%")
    
    # PCA final
    pca = PCA(n_components=n_components)
    X_train_pca = pca.fit_transform(X_train_scaled)
    X_test_pca = pca.transform(X_test_scaled)
    
    return X_train_pca, X_test_pca, pca

# ============================================
# 4. PIPELINE COMPLETO INTEGRADO
# ============================================

def create_complete_pipeline(numeric_features, categorical_features, 
                             high_cardinality_features):
    """
    Pipeline completo integrando todos los conceptos del libro
    """
    
    # Transformador numérico (Cap. 2)
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())  # Para PCA
    ])
    
    # Transformador categórico bajo cardinalidad (Cap. 5)
    low_card_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', drop='first'))
    ])
    
    # Transformador categórico alta cardinalidad (Cap. 5)
    high_card_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('target', TargetEncoder(smoothing=1.0))
    ])
    
    # ColumnTransformer
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat_low', low_card_transformer, categorical_features),
            ('cat_high', high_card_transformer, high_cardinality_features)
        ])
    
    # Pipeline completo
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('pca', PCA(n_components=0.95)),  # Cap. 6
        ('classifier', RandomForestClassifier())  # Modelo final
    ])
    
    return pipeline

# ============================================
# 5. USO COMPLETO
# ============================================

# Cargar datos
df = pd.read_csv('data.csv')

# Separar features
numeric_features = ['age', 'income', 'area']
categorical_features = ['color', 'size']
high_cardinality_features = ['city', 'postal_code']
target = 'price'

# Split
X = df.drop(target, axis=1)
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Aplicar transformaciones numéricas
X_train = numeric_transformations(X_train, numeric_features)
X_test = numeric_transformations(X_test, numeric_features)

# Crear y entrenar pipeline
pipeline = create_complete_pipeline(numeric_features, 
                                   categorical_features,
                                   high_cardinality_features)

pipeline.fit(X_train, y_train)

# Evaluar
score = pipeline.score(X_test, y_test)
print(f"Score en test set: {score:.4f}")

# Análisis de PCA
pca_step = pipeline.named_steps['pca']
print(f"\nComponentes PCA: {pca_step.n_components_}")
print(f"Varianza explicada total: {pca_step.explained_variance_ratio_.sum():.2%}")

# Cross-validation
cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5)
print(f"\nCV Score: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
```

---

## Puntos Clave para la Evaluación

!!! danger "CRÍTICOS - No olvidar"
    
    **Del Capítulo 2:**
    - Standardization vs Min-Max: cuándo usar cada uno
    - Log transforms para distribuciones exponenciales
    - Interacciones capturan relaciones multiplicativas
    
    **Del Capítulo 5:**
    - Target encoding require cross-validation (¡DATA LEAKAGE!)
    - Alta cardinalidad: Target > Hash > Binary > One-Hot
    - Handle_unknown strategy en producción
    
    **Del Capítulo 6:**
    - **SIEMPRE standardize antes de PCA**
    - Varianza explicada ≠ importancia predictiva
    - PCA = unsupervised, Feature Selection = supervised

---

## Resumen Visual
```
FEATURE ENGINEERING WORKFLOW
═══════════════════════════════════════

Raw Data
    │
    ├─► NUMERIC (Cap. 2)
    │   ├─ Scaling (StandardScaler)
    │   ├─ Transforms (log, Box-Cox)
    │   ├─ Binning
    │   └─ Interactions
    │
    ├─► CATEGORICAL (Cap. 5)
    │   ├─ Low cardinality → One-Hot
    │   ├─ Ordinal → Ordinal Encoding
    │   └─ High cardinality → Target Encoding
    │
    └─► DIMENSIONALITY (Cap. 6)
        ├─ PCA (combinar features)
        └─ Feature Selection (elegir features)
            │
            ▼
        MODELO ML
```

---

## Referencias Completas

1. **Zheng, A., & Casari, A. (2018).** *Feature Engineering for Machine Learning: Principles and Techniques for Data Scientists*. O'Reilly Media, Inc. ISBN: 978-1491953242.

2. **Kaggle.** (2024). *Feature Engineering Course*. Recuperado de https://www.kaggle.com/learn/feature-engineering

3. **Scikit-learn Development Team.** (2024). *Preprocessing and Feature Engineering*. Recuperado de https://scikit-learn.org/stable/modules/preprocessing.html

4. **Scikit-learn Development Team.** (2024). *Decomposition: PCA and Related Algorithms*. Recuperado de https://scikit-learn.org/stable/modules/decomposition.html

5. **Scikit-learn Development Team.** (2024). *Pipelines and Composite Estimators*. Recuperado de https://scikit-learn.org/stable/modules/compose.html
