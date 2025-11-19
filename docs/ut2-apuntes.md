#  Apuntes de Estudio: UT2 - Calidad de Datos y Ética en ML

**Unidad Temática 2: Calidad de Datos, Feature Engineering y Ética**  
**Curso:** Ingeniería de Datos - UCU 2025  
**Evaluación:** 3 de Septiembre

>  **Objetivo:** Dominar técnicas de limpieza de datos, feature engineering y evaluación de fairness, implementando pipelines reproducibles y éticamente responsables.

---

##  Competencias a Desarrollar

-  Distinguir entre MCAR, MAR y MNAR en datasets reales
-  Detectar patrones de missing data y outliers
-  Aplicar estrategias de imputación apropiadas según el contexto
-  Implementar pipelines de limpieza reproducibles
-  Prevenir data leakage usando validación cruzada apropiada
-  Identificar y mitigar sesgo en datasets históricos
-  Evaluar fairness usando métricas estándar
-  Documentar decisiones éticas en el tratamiento de datos

---

##  PARTE 1: Feature Engineering for Machine Learning (Zheng & Casari)

**Autoras:** Alice Zheng (Amazon), Amanda Casari (Google)  
**Editorial:** O'Reilly Media, 2018

> Feature engineering is a crucial step in the machine-learning pipeline, yet this topic is rarely examined on its own. Practitioners agree that the vast majority of time in building a machine learning pipeline is spent on feature engineering and data cleaning

###  Principio Fundamental

It is a crucial step in the machine learning pipeline, because the right features can ease the difficulty of modeling, and therefore enable the pipeline to output results of higher quality

**Estadística clave:**
>  **80% del tiempo** en proyectos de ML se dedica a:
> - Feature engineering
> - Data cleaning
> 
> ️ **20% del tiempo** restante:
> - Model building
> - Training

---

##  CAPÍTULO 1: The Machine Learning Pipeline

### 1.1. Componentes del Pipeline

For instance, stock market data might involve observations of daily stock prices, announcements of earnings by individual companies, and even opinion articles from pundits. The collection of all of these observations gives us a picture of the whole. But the picture is messy because it is composed of a thousand little pieces, and there's always measurement noise and missing pieces

```
┌───────────────────────────────────────────────────────┐
│  EL PIPELINE COMPLETO DE MACHINE LEARNING             │
├───────────────────────────────────────────────────────┤
│                                                       │
│  1. RAW DATA (Datos Crudos)                           │
│     ├── Estructurados (CSV, SQL)                      │
│     ├── Semi-estructurados (JSON, XML)                │
│     └── No estructurados (Texto, Imágenes)            │
│                    ↓                                  │
│  2. DATA CLEANING (Limpieza)                          │
│     ├── Missing values                                │
│     ├── Outliers                                      │
│     ├── Duplicados                                    │
│     └── Inconsistencias                               │
│                    ↓                                  │
│  3. FEATURE ENGINEERING                               │
│     ├── Transformaciones numéricas                    │
│     ├── Encoding categórico                           │
│     ├── Feature extraction                            │
│     └── Feature creation                              │
│                    ↓                                  │
│  4. FEATURE SELECTION                                 │
│     ├── Filter methods                                │
│     ├── Wrapper methods                               │
│     └── Embedded methods                              │
│                    ↓                                  │
│  5. MODEL TRAINING                                    │
│     ├── Algoritmo selection                           │
│     ├── Hyperparameter tuning                         │
│     └── Cross-validation                              │
│                    ↓                                  │
│  6. MODEL EVALUATION                                  │
│     ├── Performance metrics                           │
│     ├── Fairness metrics                              │
│     └── Business impact                               │
│                    ↓                                  │
│  7. DEPLOYMENT                                        │
│     └── Monitoring & Maintenance                      │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### 1.2. Datos: La Materia Prima

**Características de los datos reales:**

| Característica | Descripción | Ejemplo |
|----------------|-------------|---------|
| **Messy** | Miles de piezas pequeñas | Datos de sensores IoT |
| **Noise** | Error de medición | GPS con ±10m error |
| **Missing** | Información no recolectada | Encuestas incompletas |
| **Multimodal** | Múltiples fuentes | Text + Images + Metadata |
| **Temporal** | Secuencias en el tiempo | Histórico de compras |

### 1.3. Tasks (Tareas de ML)

**Tipos de tareas:**

1. **Classification** (Clasificación)
   - Binary: Spam o No Spam
   - Multi-class: Tipo de producto (A, B, C, D)
   - Multi-label: Tags de artículo (varios simultáneos)

2. **Regression** (Regresión)
   - Predecir valores continuos
   - Ejemplo: Precio de casa, temperatura

3. **Clustering** (Agrupamiento)
   - Descubrir grupos naturales
   - Ejemplo: Segmentación de clientes

4. **Ranking** (Ordenamiento)
   - Ordenar items por relevancia
   - Ejemplo: Resultados de búsqueda

### 1.4. Models (Modelos)

**Concepto clave:**
> Un modelo es una aproximación matemática de la realidad que mapea features → prediction

**Trade-offs principales:**

```python
# Trade-off 1: Complejidad vs Interpretabilidad
Simples (interpretables)    Complejos (black box)
├── Linear Regression       ├── Neural Networks
├── Decision Trees          ├── Ensemble Methods
└── Logistic Regression     └── Deep Learning

# Trade-off 2: Bias vs Variance
High Bias (underfitting)     High Variance (overfitting)
├── Too simple              ├── Too complex
├── Ignores patterns        ├── Memorizes noise
└── Poor train & test       └── Great train, poor test
```

### 1.5. Features: El Puente Crítico

The right features can only be defined in the context of both the model and the data; since data and models are so diverse, it's difficult to generalize the practice of feature engineering across projects

**¿Qué es un feature?**
> Representación numérica de un aspecto de los datos raw

**Ejemplo: Representar "Color"**

```python
#  Raw data (no numérico)
color = "red"

#  One-Hot Encoding
color_red = 1
color_blue = 0
color_green = 0

#  RGB Values
red = 255
green = 0
blue = 0

#  HSV Values
hue = 0
saturation = 100
value = 100
```

**Características de buenos features:**

1. **Informative** - Correlacionados con el target
2. **Independent** - No redundantes entre sí
3. **Simple** - Fáciles de computar
4. **Flexible** - Funcionan con múltiples algoritmos

---

##  CAPÍTULO 2: Fancy Tricks with Simple Numbers

> In Chapter 2, we explore basic feature engineering for numeric data: filtering, binning, scaling, log transforms and power transforms, and interaction features

### 2.1. Scalars, Vectors, and Spaces

**Conceptos fundamentales:**

```python
# Scalar (1D)
price = 299.99

# Vector (nD)
customer = [age, income, zip_code, purchases]

# Feature Space
# Cada observación es un punto en espacio multidimensional
X = np.array([
    [25, 50000, 10001, 5],   # Customer 1
    [35, 75000, 10002, 12],  # Customer 2
    [45, 100000, 10003, 8]   # Customer 3
])
```

### 2.2. Dealing with Counts (Manejando Conteos)

**Problema:** Los counts tienen distribución muy sesgada (heavy-tailed)

**Características de count data:**
- Siempre ≥ 0
- Valores enteros
- Distribución Poisson o Negative Binomial
- Muchos zeros (zero-inflated)

**Visualización de problema:**

```python
import pandas as pd
import matplotlib.pyplot as plt

# Ejemplo: Número de reviews por usuario
reviews_per_user = [0]*1000 + [1]*500 + [2]*200 + [5]*50 + [100, 200, 500]

plt.hist(reviews_per_user, bins=50)
plt.xlabel('Number of Reviews')
plt.ylabel('Frequency')
plt.title('Heavy-Tailed Distribution')
plt.show()

# Problema: Pocos usuarios con MUCHOS reviews dominan estadísticas
print(f"Mean: {np.mean(reviews_per_user):.2f}")
print(f"Median: {np.median(reviews_per_user):.2f}")
print(f"Max: {np.max(reviews_per_user)}")
```

### 2.3. Binarization (Binarización)

**Concepto:** Convertir features numéricos a binary (0/1)

**Cuándo usar:**
- Cuando solo importa presencia/ausencia
- Para reducir impacto de outliers extremos
- Para crear flags condicionales

```python
from sklearn.preprocessing import Binarizer

# Ejemplo: "¿El usuario es activo?"
# Activo = más de 5 compras
binarizer = Binarizer(threshold=5.0)
X = [[10], [3], [15], [0], [7]]
X_binary = binarizer.transform(X)

print(X_binary)
# [[1], [0], [1], [0], [1]]
```

**Ventajas:**
-  Robusto a outliers
-  Fácil de interpretar
-  Reduce dimensionalidad

**Desventajas:**
-  Pierde información de magnitud
-  Threshold arbitrario

### 2.4. Quantization or Binning (Cuantización)

**Concepto:** Dividir valores continuos en bins discretos

**Tipos de binning:**

1. **Fixed-width binning** (Ancho fijo)

```python
import numpy as np

age = [5, 12, 18, 25, 35, 45, 55, 65, 75]

# Bins de 10 años
bins = np.arange(0, 81, 10)  # [0, 10, 20, 30, ..., 80]
binned_age = np.digitize(age, bins)

print(binned_age)
# [1, 2, 2, 3, 4, 5, 6, 7, 8]
```

2. **Quantile binning** (Bins por cuantiles)

```python
# Cada bin tiene aproximadamente el mismo número de observaciones
quartiles = np.percentile(data, [25, 50, 75])
binned = np.digitize(data, quartiles)

# O con pandas
pd.qcut(data, q=4)  # 4 quartiles
```

**Cuándo usar binning:**

| Situación | Razón |
|-----------|-------|
| Datos con outliers extremos | Reduce su impacto |
| Relación no lineal con target | Captura no linealidades |
| Categorical feature oculto | Ejemplo: edad → generación |
| Reducir overfitting | Menos granularidad = más generalización |

**Visualización de impacto:**

```python
import seaborn as sns

# Original vs Binned
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Original
sns.scatterplot(x=age, y=salary, ax=axes[0])
axes[0].set_title('Original Age vs Salary')

# Binned
age_binned = pd.cut(age, bins=5, labels=['0-20', '20-40', '40-60', '60-80', '80-100'])
sns.boxplot(x=age_binned, y=salary, ax=axes[1])
axes[1].set_title('Binned Age vs Salary')

plt.tight_layout()
```

### 2.5. Log Transformation (Transformación Logarítmica)

**Concepto clave:**
> El logaritmo comprime el rango de valores grandes y expande el rango de valores pequeños

**Cuándo aplicar:**

1. **Distribuciones heavy-tailed** (asimétricas a la derecha)
2. **Valores que varían en órdenes de magnitud** (1, 10, 100, 1000)
3. **Multiplicative relationships** (relaciones multiplicativas)

**Matemática:**

```
log(xy) = log(x) + log(y)
log(x/y) = log(x) - log(y)
log(x^n) = n * log(x)
```

**Implementación:**

```python
import numpy as np

# Problema: Income con outliers extremos
income = [30000, 35000, 40000, 45000, 50000, 1000000]

# Solución: Log transform
log_income = np.log(income)

# Manejo de zeros: log(0) = -inf
# Usar: log(x + 1) o log(x + c)
counts_with_zeros = [0, 1, 2, 5, 10, 100]
log_counts = np.log1p(counts_with_zeros)  # log(x + 1)
```

**Antes y Después:**

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Antes
axes[0].hist(income, bins=20)
axes[0].set_title('Original Income (Heavy-tailed)')
axes[0].set_xlabel('Income ($)')

# Después
axes[1].hist(log_income, bins=20)
axes[1].set_title('Log(Income) (More Normal)')
axes[1].set_xlabel('Log(Income)')

plt.tight_layout()
```

**️ Cuidados:**

1. **Solo para valores positivos:** log(x) requiere x > 0
2. **Interpretación diferente:** Un cambio de 1 en log(x) = cambio multiplicativo en x
3. **No siempre ayuda:** Verificar que realmente mejora el modelo

### 2.6. Power Transforms: Generalización del Log

**Concepto:** Familia de transformaciones paramétricas

**Box-Cox Transform:**

```
         ⎧ (x^λ - 1) / λ,  si λ ≠ 0
y(λ) =   ⎨
         ⎩ log(x),         si λ = 0
```

**Casos especiales:**

| λ | Transformación | Uso |
|---|----------------|-----|
| -1 | Reciprocal (1/x) | Invertir relación |
| -0.5 | Inverse square root | Comprimir extremos |
| 0 | Log | Heavy-tailed distributions |
| 0.5 | Square root | Counts moderados |
| 1 | Identity (x) | No transformación |
| 2 | Square | Expandir diferencias |

**Implementación con scikit-learn:**

```python
from sklearn.preprocessing import PowerTransformer

# Encontrar λ óptimo automáticamente
pt = PowerTransformer(method='box-cox', standardize=True)

# Requiere x > 0
data = [[10], [100], [1000], [10000]]
transformed = pt.fit_transform(data)

print(f"Lambda encontrado: {pt.lambdas_}")
```

**Yeo-Johnson Transform:** Extensión que funciona con valores negativos

```python
# Funciona con cualquier valor real
pt_yj = PowerTransformer(method='yeo-johnson')
data_with_negatives = [[-10], [0], [10], [100]]
transformed = pt_yj.fit_transform(data_with_negatives)
```

---

##  CAPÍTULO 4: Effects of Feature Scaling

> Chapter 4 examines tf-idf (term frequency–inverse document frequency) as an example of feature scaling and discusses why it works

### 4.1. ¿Por Qué Escalar Features?

**Problema:** Features en diferentes escalas dominan el modelo

```python
# Ejemplo: Predecir precio de casa
X = pd.DataFrame({
    'sqft': [1000, 1500, 2000],      # Escala: 1000s
    'bedrooms': [2, 3, 4],            # Escala: 1s
    'distance_km': [5.2, 10.8, 15.3]  # Escala: 10s
})

# En regresión lineal: price = w1*sqft + w2*bedrooms + w3*distance
# w1 tendrá valores muy pequeños (~0.001)
# w2 tendrá valores más grandes (~1000)
# Pero eso NO significa que bedrooms sea más importante!
```

**Algoritmos sensibles a escala:**

| Algoritmo | ¿Requiere scaling? | Razón |
|-----------|-------------------|-------|
| **Linear Regression** | ️ Recomendado | Interpretación de coeficientes |
| **Logistic Regression** |  Sí | Convergencia más rápida |
| **SVM** |  Sí | Kernel sensible a distancias |
| **KNN** |  Sí | Basado en distancias euclidianas |
| **Neural Networks** |  Sí | Convergencia y estabilidad |
| **Decision Trees** |  No | Invariante a transformaciones monotónicas |
| **Random Forest** |  No | Basado en splits, no distancias |

### 4.2. Min-Max Scaling (Normalización)

**Fórmula:**

```
         x - min(x)
x' = ──────────────────
      max(x) - min(x)
```

**Resultado:** x' ∈ [0, 1]

**Implementación:**

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
X = [[1000], [1500], [2000], [2500]]
X_scaled = scaler.fit_transform(X)

print(X_scaled)
# [[0.0], [0.333], [0.667], [1.0]]
```

**Pros:**
-  Interpretación intuitiva (0 = mínimo, 1 = máximo)
-  Preserva relaciones de distancia relativa
-  Útil cuando conoces bounds naturales

**Cons:**
-  Sensible a outliers extremos
-  Min/Max pueden cambiar con nuevos datos

### 4.3. Standardization (Z-score Normalization)

**Fórmula:**

```
         x - μ
x' = ───────────
          σ
```

Donde μ = media, σ = desviación estándar

**Resultado:** x' ~ N(0, 1) (media 0, std 1)

**Implementación:**

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X = [[1000], [1500], [2000], [2500]]
X_scaled = scaler.fit_transform(X)

print(X_scaled)
print(f"Mean: {X_scaled.mean():.2f}")  # ~0.0
print(f"Std: {X_scaled.std():.2f}")     # ~1.0
```

**Pros:**
-  Menos sensible a outliers que Min-Max
-  No bounded (puede tener valores < 0 o > 1)
-  Interpretación en términos de desviaciones estándar

**Cons:**
-  Pierde interpretación absoluta
-  Asume distribución aproximadamente normal

### 4.4. ℓ² Normalization (L2 Norm)

**Concepto:** Escalar cada observación a longitud unitaria

**Fórmula:**

```
          x
x' = ──────────
      ||x||₂

donde ||x||₂ = √(x₁² + x₂² + ... + xₙ²)
```

**Implementación:**

```python
from sklearn.preprocessing import Normalizer

normalizer = Normalizer(norm='l2')
X = [[3, 4], [1, 1], [5, 12]]
X_normalized = normalizer.transform(X)

# Verificar que ||x'||₂ = 1
for row in X_normalized:
    print(f"L2 norm: {np.linalg.norm(row):.2f}")  # 1.0
```

**Cuándo usar:**
-  Text data (TF-IDF vectors)
- ️ Image embeddings
-  Audio features
- Cualquier caso donde la **dirección** importa más que la magnitud

**Ejemplo: Text Similarity**

```python
# Documentos como vectores
doc1 = [1, 2, 0]  # "machine learning"
doc2 = [2, 4, 0]  # "machine machine learning learning"

# Sin normalización: Cosine similarity afectada por longitud
# Con L2 normalization: Solo importa composición, no longitud
```

### 4.5. Comparación de Métodos de Scaling

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler, StandardScaler, Normalizer

# Data original con outlier
data = np.array([[1], [2], [3], [4], [5], [50]])  # 50 es outlier

# Aplicar diferentes scalers
min_max = MinMaxScaler().fit_transform(data)
standard = StandardScaler().fit_transform(data)
l2_norm = Normalizer().transform(data)

# Visualizar
fig, axes = plt.subplots(1, 4, figsize=(16, 4))

axes[0].scatter(data, [0]*len(data), s=100)
axes[0].set_title('Original')
axes[0].set_xlim(-2, 52)

axes[1].scatter(min_max, [0]*len(min_max), s=100, color='red')
axes[1].set_title('Min-Max [0,1]')
axes[1].set_xlim(-0.1, 1.1)

axes[2].scatter(standard, [0]*len(standard), s=100, color='green')
axes[2].set_title('Standardized (μ=0, σ=1)')
axes[2].set_xlim(-1, 4)

axes[3].scatter(l2_norm, [0]*len(l2_norm), s=100, color='purple')
axes[3].set_title('L2 Normalized')
axes[3].set_xlim(-0.1, 1.1)

plt.tight_layout()
```

**Guía de decisión:**

```
┌─────────────────────────────────────────────┐
│  ¿QUÉ MÉTODO DE SCALING USAR?               │
├─────────────────────────────────────────────┤
│                                             │
│  ¿Hay outliers extremos?                    │
│  ├── Sí → StandardScaler o RobustScaler     │
│  └── No → ¿Bounds conocidos?                │
│           ├── Sí → MinMaxScaler             │
│           └── No → StandardScaler           │
│                                             │
│  ¿Features son counts o frecuencias?        │
│  └── Sí → Log + StandardScaler              │
│                                             │
│  ¿Importa dirección, no magnitud?           │
│  └── Sí → L2 Normalizer                     │
│                                             │
│  ¿Algoritmo basado en árboles?              │
│  └── No scaling needed                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

##  PARTE 2: Data Cleaning (Kaggle + Pandas)

### 2.1. Missing Data Mechanisms (Mecanismos de Datos Faltantes)

Filling in missing values – As we also saw in Part II, it is quite common for some values to be missing from datasets. This typically means that a piece of information was simply not collected

**Los 3 tipos de Missing Data:**

#### MCAR (Missing Completely At Random)

**Definición:** La probabilidad de que un valor esté missing es independiente de cualquier dato (observado o no observado)

**Características:**
- Missingness es puramente aleatoria
- No hay patrón sistemático
- No introduce sesgo
- Es el caso más simple (y menos común)

**Ejemplo:**

```python
# Sensor de temperatura falla aleatoriamente
# La probabilidad de fallo es la misma a cualquier temperatura

# Simulación
import numpy as np
import pandas as pd

np.random.seed(42)
temperature = np.random.normal(20, 5, 1000)
df = pd.DataFrame({'temp': temperature})

# MCAR: 10% aleatorio falta
missing_mask = np.random.rand(1000) < 0.1
df.loc[missing_mask, 'temp'] = np.nan

# Verificar: No hay correlación entre missingness y valores
print(f"Missing: {df['temp'].isna().sum()}")
print(f"Mean (completos): {df['temp'].mean():.2f}")
```

**¿Cómo detectar MCAR?**

```python
# Test estadístico: Little's MCAR test
# Si p-value > 0.05 → No se puede rechazar MCAR

# Alternativa visual: Comparar distribuciones
import matplotlib.pyplot as plt

# Crear indicador de missingness en OTRA variable
df['age_missing'] = df['age'].isna()

# Comparar distribución de income para ambos grupos
df[df['age_missing']==False]['income'].hist(alpha=0.5, label='Age present')
df[df['age_missing']==True]['income'].hist(alpha=0.5, label='Age missing')
plt.legend()
# Si distribuciones son similares → Sugiere MCAR
```

---

#### MAR (Missing At Random)

**Definición:** La probabilidad de missingness depende de datos **observados**, pero NO de los datos missing mismos

**Características:**
- Hay patrón sistemático
- Patrón está en variables observadas
- Puede ser mitigado con esas variables
- Más común que MCAR

**Ejemplo 1: Encuesta de salario**

```python
# Mujeres tienen más probabilidad de no reportar salario
# Pero la probabilidad NO depende del salario mismo

df = pd.DataFrame({
    'gender': ['F', 'F', 'M', 'M', 'F', 'M'],
    'salary': [50000, np.nan, 60000, 70000, np.nan, 80000]
})

# MAR porque missingness depende de gender (observado)
# NO depende del valor de salary (missing)
```

**Ejemplo 2: Medical data**

```python
# Pacientes mayores tienen más tests missing
# Porque se hacen menos pruebas preventivas

# Simulación
age = np.random.randint(20, 80, 1000)
cholesterol = np.random.normal(200, 30, 1000)

# Probabilidad de missing aumenta con edad
prob_missing = (age - 20) / 60  # 0 at age 20, 1 at age 80
missing_mask = np.random.rand(1000) < prob_missing

df = pd.DataFrame({
    'age': age,
    'cholesterol': cholesterol
})
df.loc[missing_mask, 'cholesterol'] = np.nan

# MAR: Missingness correlaciona con age (observado)
```

**¿Cómo detectar MAR?**

```python
# 1. Crear indicador de missingness
df['var_missing'] = df['variable_of_interest'].isna()

# 2. Analizar relación con OTRAS variables
import seaborn as sns

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Comparar variables observadas entre grupos
sns.boxplot(x='var_missing', y='age', data=df, ax=axes[0])
sns.boxplot(x='var_missing', y='income', data=df, ax=axes[1])
sns.countplot(x='var_missing', hue='gender', data=df, ax=axes[2])

# Si HAY diferencias → Sugiere MAR (o MNAR)
```

---

#### MNAR (Missing Not At Random)

**Definición:** La probabilidad de missingness depende del **valor missing mismo**

**Características:**
- Patrón sistemático en valores missing
- NO puede ser explicado por variables observadas
- Introduce sesgo difícil de corregir
- Requiere assumptions o datos externos
- El más problemático

**Ejemplo 1: Income survey**

```python
# Personas con ingresos ALTOS no reportan salario
# Missingness depende del salario mismo (no observado)

# Simulación
income = np.random.lognormal(10, 1, 1000)
# Ingresos >$100k tienen 80% prob de no reportar
prob_missing = np.where(income > 100000, 0.8, 0.1)
missing_mask = np.random.rand(1000) < prob_missing

df = pd.DataFrame({'income': income})
df.loc[missing_mask, 'income'] = np.nan

# MNAR: Los valores missing son sistemáticamente altos
print(f"Mean reported income: ${df['income'].mean():.2f}")
# Subestima ingreso real por factor de ~2
```

**Ejemplo 2: Depression scale**

```python
# Personas MÁS deprimidas no completan cuestionario
# Missingness está relacionada con severidad (no observada)

# Resultado: Muestra sesgada hacia casos leves
# No hay forma de corregir sin assumptions
```

**¿Cómo detectar MNAR?**

️ **Problema:** Es casi imposible probar MNAR definitivamente con los datos

**Señales indirectas:**

1. **Test de sensibilidad:**

```python
# Imputar con diferentes assumptions y ver impacto

# Scenario 1: Missing values son bajos
df_low = df.copy()
df_low['var'].fillna(df['var'].quantile(0.25), inplace=True)

# Scenario 2: Missing values son altos
df_high = df.copy()
df_high['var'].fillna(df['var'].quantile(0.75), inplace=True)

# Si resultados cambian dramáticamente → Posible MNAR
```

2. **Domain knowledge:** Pregunta "¿Por qué faltarían estos datos?"

---

### 2.2. Estrategias de Tratamiento según Mecanismo

```
┌──────────────────────────────────────────────────────┐
│  ESTRATEGIA DE IMPUTACIÓN SEGÚN MECANISMO            │
├──────────────────────────────────────────────────────┤
│                                                      │
│  MCAR (Random)                                       │
│  ├── Listwise deletion (OK si <5% missing)           │
│  ├── Mean/Median imputation (simple)                 │
│  └── KNN imputation (mejor)                          │
│                                                      │
│  MAR (Conditional random)                            │
│  ├── Multiple imputation (MICE)                      │
│  ├── Regression imputation                           │
│  └── KNN with conditional vars                       │
│                                                      │
│  MNAR (Non-random)                                   │
│  ├── Sensitivity analysis (múltiples scenarios)      │
│  ├── Pattern-mixture models                          │
│  ├── Selection models                                │
│  └── Domain knowledge + external data                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 2.3. Métodos de Imputación Detallados

#### Método 1: Listwise Deletion (Eliminación Completa)

```python
# Eliminar filas con ANY missing value
df_complete = df.dropna()

# Eliminar filas con missing en ESPECÍFICAS columnas
df_clean = df.dropna(subset=['critical_column_1', 'critical_column_2'])
```

**Cuándo usar:**
-  MCAR y < 5% missing
-  Dataset grande
-  Variables no críticas

**Cuándo NO usar:**
-  MAR o MNAR
-  > 10% missing
-  Dataset pequeño
-  Pérdida de información valiosa

---

#### Método 2: Simple Imputation

**A. Mean/Median/Mode:**

```python
from sklearn.impute import SimpleImputer

# Para variables numéricas
imputer_mean = SimpleImputer(strategy='mean')
imputer_median = SimpleImputer(strategy='median')

# Para variables categóricas
imputer_mode = SimpleImputer(strategy='most_frequent')

# Aplicar
df['age_imputed'] = imputer_median.fit_transform(df[['age']])
```

**B. Forward Fill / Backward Fill (Time Series):**

```python
# Forward fill: Propagar último valor válido
df['temperature'].fillna(method='ffill', inplace=True)

# Backward fill: Usar siguiente valor válido
df['temperature'].fillna(method='bfill', inplace=True)
```

**Pros:**
-  Rápido y simple
-  Mantiene tamaño de dataset

**Cons:**
-  Ignora relaciones entre variables
-  Reduce varianza
-  Puede introducir sesgo

---

#### Método 3: KNN Imputation

**Concepto:** Imputar basándose en K vecinos más cercanos

```python
from sklearn.impute import KNNImputer

# n_neighbors: cuántos vecinos considerar
imputer = KNNImputer(n_neighbors=5, weights='distance')

# weights='distance' da más peso a vecinos cercanos
df_imputed = imputer.fit_transform(df)
```

**Ventajas:**
-  Considera relaciones multivariadas
-  No asume distribución
-  Mejor que mean/median para MAR

**Desventajas:**
-  Computacionalmente costoso
-  Sensible a escala (requiere normalización)
-  No funciona bien con alta dimensionalidad

**Ejemplo completo:**

```python
import pandas as pd
from sklearn.impute import KNNImputer
from sklearn.preprocessing import StandardScaler

# Data con missing
df = pd.DataFrame({
    'age': [25, np.nan, 35, 40, np.nan],
    'income': [30000, 35000, np.nan, 45000, 50000],
    'credit_score': [650, 700, 720, np.nan, 800]
})

# 1. Escalar (KNN es sensible a escala)
scaler = StandardScaler()
df_scaled = pd.DataFrame(
    scaler.fit_transform(df),
    columns=df.columns
)

# 2. Imputar
imputer = KNNImputer(n_neighbors=2)
df_imputed_scaled = imputer.fit_transform(df_scaled)

# 3. Inverse transform
df_imputed = pd.DataFrame(
    scaler.inverse_transform(df_imputed_scaled),
    columns=df.columns
)

print(df_imputed)
```

---

#### Método 4: Multiple Imputation (MICE)

**Concepto:** Crear múltiples datasets imputados, analizar cada uno, combinar resultados

**Algoritmo MICE (Multivariate Imputation by Chained Equations):**

```
1. Inicializar missing con mean/median
2. Para cada variable con missing:
   a. Usar otras variables como predictores
   b. Entrenar modelo de regresión
   c. Predecir valores missing
   d. Agregar noise aleatorio
3. Repetir paso 2 múltiples veces (e.g., 10 iterations)
4. Crear M datasets completos (e.g., M=5)
5. Analizar cada dataset independientemente
6. Combinar resultados usando reglas de Rubin
```

**Implementación:**

```python
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

# max_iter: cuántas rondas de imputación
# random_state: para reproducibilidad
imputer = IterativeImputer(max_iter=10, random_state=42)
df_imputed = pd.DataFrame(
    imputer.fit_transform(df),
    columns=df.columns
)
```

**Ventajas:**
-  Captura incertidumbre de imputación
-  Funciona bien con MAR
-  Estadísticamente robusto

**Desventajas:**
-  Computacionalmente costoso
-  Complejo de implementar correctamente
-  Requiere múltiples análisis

---

#### Método 5: Indicador de Missing

**Concepto:** Crear feature adicional indicando si valor estaba missing

```python
# Original data
df = pd.DataFrame({
    'income': [50000, np.nan, 60000, np.nan, 70000]
})

# Crear indicador
df['income_was_missing'] = df['income'].isna().astype(int)

# Imputar con median
df['income'].fillna(df['income'].median(), inplace=True)

print(df)
#    income  income_was_missing
# 0   50000                   0
# 1   60000                   1  <- Imputed
# 2   60000                   0
# 3   60000                   1  <- Imputed
# 4   70000                   0
```

**Cuándo usar:**
-  Cuando missingness tiene valor predictivo
-  MNAR sospechado
-  No queremos perder información de patrón de missingness

---

### 2.4. Detección de Outliers

**Definición:** Observaciones que se desvían significativamente del resto de los datos

**Tipos de outliers:**

1. **Univariate outliers** - Extremos en una sola variable
2. **Multivariate outliers** - Combinación inusual de variables
3. **Errors** - Datos incorrectamente registrados
4. **Novel observations** - Casos legítimos pero raros

#### Método 1: IQR (Interquartile Range)

**Concepto:** Usar cuartiles para definir bounds

```python
def detect_outliers_iqr(data):
    Q1 = data.quantile(0.25)
    Q3 = data.quantile(0.75)
    IQR = Q3 - Q1
    
    # Outliers: fuera de [Q1 - 1.5*IQR, Q3 + 1.5*IQR]
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = (data < lower_bound) | (data > upper_bound)
    return outliers

# Aplicar
df['is_outlier'] = detect_outliers_iqr(df['price'])
print(f"Outliers detected: {df['is_outlier'].sum()}")
```

**Visualización:**

```python
import seaborn as sns
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Box plot (automático muestra outliers)
sns.boxplot(y=df['price'], ax=axes[0])
axes[0].set_title('Box Plot with Outliers')

# Scatter plot coloreado
colors = ['red' if x else 'blue' for x in df['is_outlier']]
axes[1].scatter(range(len(df)), df['price'], c=colors)
axes[1].axhline(y=lower_bound, color='green', linestyle='--', label='Lower bound')
axes[1].axhline(y=upper_bound, color='green', linestyle='--', label='Upper bound')
axes[1].set_title('Outliers highlighted')
axes[1].legend()

plt.tight_layout()
```

---

#### Método 2: Z-Score

**Concepto:** Medir desviaciones estándar desde la media

```python
from scipy import stats

def detect_outliers_zscore(data, threshold=3):
    """
    Outliers: |z-score| > threshold
    threshold=3: ~99.7% de datos normales
    threshold=2: ~95% de datos normales
    """
    z_scores = np.abs(stats.zscore(data))
    return z_scores > threshold

# Aplicar
df['is_outlier_zscore'] = detect_outliers_zscore(df['price'], threshold=3)
```

**️ Limitación:** Asume distribución aproximadamente normal

---

#### Método 3: Isolation Forest (Outliers Multivariados)

**Concepto:** Algoritmo de ML que aísla anomalías

```python
from sklearn.ensemble import IsolationForest

# contamination: proporción esperada de outliers (e.g., 0.1 = 10%)
clf = IsolationForest(contamination=0.1, random_state=42)

# Fit and predict
# -1: outlier, 1: inlier
df['is_outlier_iforest'] = clf.fit_predict(df[['feature1', 'feature2', 'feature3']])

# Convert to boolean
df['is_outlier_iforest'] = df['is_outlier_iforest'] == -1
```

**Ventajas:**
-  No asume distribución
-  Detecta outliers multivariados
-  Escalable a alta dimensionalidad

---

#### Método 4: DBSCAN (Density-Based)

**Concepto:** Outliers son puntos en regiones de baja densidad

```python
from sklearn.cluster import DBSCAN

# eps: radio de vecindad
# min_samples: mínimo de vecinos para ser core point
dbscan = DBSCAN(eps=0.5, min_samples=5)

# Fit
labels = dbscan.fit_predict(df[['feature1', 'feature2']])

# -1 indica noise/outlier
df['is_outlier_dbscan'] = labels == -1
```

---

### 2.5. Tratamiento de Outliers

**Opciones:**

#### 1. Eliminar (Drop)

```python
# Eliminar outliers
df_clean = df[~df['is_outlier']]

# ️ Solo si:
# - Claramente errores
# - < 5% de datos
# - No pierde información crítica
```

#### 2. Transformar (Transform)

```python
# Log transform comprime outliers
df['price_log'] = np.log1p(df['price'])

# Winsorization: Cap extremos
from scipy.stats.mstats import winsorize
df['price_winsorized'] = winsorize(df['price'], limits=[0.05, 0.05])
# Reemplaza bottom 5% y top 5% con percentiles
```

#### 3. Imputar (Impute)

```python
# Reemplazar con percentiles
Q1 = df['price'].quantile(0.25)
Q3 = df['price'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

df['price_capped'] = df['price'].clip(lower_bound, upper_bound)
```

#### 4. Separar (Segment)

```python
# Modelar outliers por separado
df_normal = df[~df['is_outlier']]
df_outliers = df[df['is_outlier']]

# Entrenar modelo específico para cada grupo
model_normal = train_model(df_normal)
model_outliers = train_model(df_outliers)
```

#### 5. Usar Modelos Robustos

```python
# Modelos menos sensibles a outliers:
# - Tree-based (Random Forest, XGBoost)
# - Huber Regression
# - RANSACRegressor

from sklearn.linear_model import HuberRegressor
model = HuberRegressor(epsilon=1.35)  # epsilon controla robustness
```

---

### 2.6. Pipeline de Limpieza Reproducible

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer, KNNImputer

# Definir columnas
numeric_features = ['age', 'income', 'credit_score']
categorical_features = ['gender', 'city', 'occupation']

# Pipeline para features numéricos
numeric_transformer = Pipeline(steps=[
    ('imputer', KNNImputer(n_neighbors=5)),
    ('scaler', StandardScaler())
])

# Pipeline para features categóricos
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Combinar
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Pipeline completo
full_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression())
])

# Fit en train, transform en test
full_pipeline.fit(X_train, y_train)
predictions = full_pipeline.predict(X_test)
```

**Ventajas del Pipeline:**
-  Reproducible
-  Previene data leakage
-  Fácil de serializar (joblib.dump)
-  Código limpio y mantenible

---

##  PARTE 3: Data Leakage

> Data leakage is one of the most important issues for a data scientist to understand

### 3.1. ¿Qué es Data Leakage?

**Definición:** Cuando información del conjunto de validación/test "se filtra" al conjunto de entrenamiento

**Resultado:** 
-  Performance irr realmente alta en validación
-  Performance terrible en producción
-  Falsa sensación de confianza

### 3.2. Tipos de Data Leakage

#### Tipo 1: Target Leakage

**Definición:** Features que incluyen información del target que NO estaría disponible en predicción

**Ejemplo 1: Predecir abandono de clientes**

```python
#  MAL: 'days_since_cancellation' es consecuencia del churn
df = pd.DataFrame({
    'customer_id': [1, 2, 3],
    'days_since_cancellation': [30, 0, 15],  # Solo existe DESPUÉS de churn
    'churned': [1, 0, 1]  # Target
})

# El modelo aprenderá: days_since_cancellation > 0 → churned = 1
# Perfecto en train/val, inútil en producción
```

**Ejemplo 2: Predecir default de loan**

```python
#  MAL: 'took_debt_consolidation_loan' es RESULTADO del default
features = ['income', 'credit_score', 'took_debt_consolidation_loan']

#  BIEN: Solo features disponibles ANTES de aprobar el loan
features = ['income', 'credit_score', 'employment_history']
```

**¿Cómo detectar?**

```python
# Feature importance sospechosamente alta
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(X_train, y_train)

# Si un feature tiene importance > 0.9 → SOSPECHOSO
importances = pd.DataFrame({
    'feature': X_train.columns,
    'importance': model.feature_importances_
}).sort_values('importance', descending=True)

print(importances)
```

---

#### Tipo 2: Train-Test Contamination

**Definición:** Información del test set influye en el procesamiento del train set

**Ejemplo 1: Scaling con todos los datos**

```python
#  MAL: Scaler ve estadísticas del test set
scaler = StandardScaler()
scaler.fit(pd.concat([X_train, X_test]))  # ¡LEAKAGE!

X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

```python
#  BIEN: Scaler solo ve train set
scaler = StandardScaler()
scaler.fit(X_train)  # Solo train

X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

**Ejemplo 2: Feature selection con todos los datos**

```python
from sklearn.feature_selection import SelectKBest

#  MAL
selector = SelectKBest(k=10)
selector.fit(pd.concat([X_train, X_test]), pd.concat([y_train, y_test]))

#  BIEN
selector = SelectKBest(k=10)
selector.fit(X_train, y_train)  # Solo train
```

**Ejemplo 3: Imputación con estadísticas globales**

```python
#  MAL: Mean incluye test set
overall_mean = df['age'].mean()  # Todo el dataset
df['age'].fillna(overall_mean, inplace=True)

#  BIEN: Mean solo del train set
train_mean = X_train['age'].mean()
X_train['age'].fillna(train_mean, inplace=True)
X_test['age'].fillna(train_mean, inplace=True)  # Usar mean del train
```

---

#### Tipo 3: Temporal Leakage

**Definición:** Usar información del futuro para predecir el pasado

**Ejemplo: Predecir ventas de hoy con datos de mañana**

```python
#  MAL: Features creados con datos futuros
df = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=100),
    'sales': np.random.randint(100, 200, 100)
})

# Crear rolling mean (incluyendo futuro)
df['sales_7day_avg'] = df['sales'].rolling(window=7, center=True).mean()
# center=True usa 3 días pasados + hoy + 3 días futuros

#  BIEN: Solo usar pasado
df['sales_7day_avg'] = df['sales'].rolling(window=7, center=False).mean()
# Solo usa últimos 7 días (incluyendo hoy)
```

---

### 3.3. Prevención de Data Leakage

#### Regla de Oro: Temporal Separation

```python
# Split ANTES de cualquier procesamiento
from sklearn.model_selection import train_test_split

# 1. Split primero
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 2. Cualquier transformación usa solo train
scaler = StandardScaler()
imputer = SimpleImputer()
encoder = OneHotEncoder()

scaler.fit(X_train)
imputer.fit(X_train)
encoder.fit(X_train)

# 3. Transform ambos sets
X_train_transformed = scaler.transform(X_train)
X_test_transformed = scaler.transform(X_test)
```

#### Usar Pipelines (Fuerza separación correcta)

```python
from sklearn.pipeline import Pipeline

# Pipeline garantiza fit solo en train
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])

# Fit en train
pipeline.fit(X_train, y_train)

# Score en test (sin leakage)
score = pipeline.score(X_test, y_test)
```

#### Cross-Validation Correcta

```python
from sklearn.model_selection import cross_val_score

#  BIEN: Pipeline dentro de CV
scores = cross_val_score(
    pipeline,  # Todo el pipeline
    X_train, y_train,
    cv=5
)

#  MAL: Transformar antes de CV
X_scaled = scaler.fit_transform(X)  # Leakage!
scores = cross_val_score(model, X_scaled, y, cv=5)
```

---

### 3.4. Checklist Anti-Leakage

```
 Split train/test ANTES de cualquier procesamiento
 Scaling/Normalization fit solo en train
 Imputation statistics solo de train
 Feature selection solo en train
 Feature engineering sin información futura
 Cross-validation con Pipeline completo
 Validar que features existen en tiempo de predicción
 Verificar feature importances sospechosamente altas
 Test temporal: entrenar en t1-t2, validar en t3
 Documentar suposiciones temporales
```

---

## ️ PARTE 4: Bias & Fairness en Machine Learning

### 4.1. Conceptos Fundamentales

**¿Por qué importa?**

Los modelos de ML pueden perpetuar y amplificar sesgos existentes en datos históricos, llevando a:
- Discriminación algorítmica
- Exclusión sistemática de grupos
- Daño reputacional y legal
- Pérdida de confianza pública

### 4.2. Fuentes de Sesgo

```
┌────────────────────────────────────────────────┐
│  PIPELINE DE SESGO EN ML                       │
├────────────────────────────────────────────────┤
│                                                │
│  1. SESGO HISTÓRICO                            │
│     └─ Datos reflejan discriminación pasada    │
│        Ej: Menos mujeres en tech por barreras  │
│                                                │
│  2. SESGO DE REPRESENTACIÓN                    │
│     └─ Grupos sub-representados en training    │
│        Ej: Dataset 90% hombres, 10% mujeres    │
│                                                │
│  3. SESGO DE MEDICIÓN                          │
│     └─ Features medidos diferente por grupo    │
│        Ej: Credit score menos confiable para   │
│            comunidades sin acceso bancario     │
│                                                │
│  4. SESGO DE AGREGACIÓN                        │
│     └─ Un modelo para todos ignora diferencias │
│        Ej: Modelo facial entrenado en blancos  │
│            falla en otras etnias               │
│                                                │
│  5. SESGO DE EVALUACIÓN                        │
│     └─ Métricas no capturan harm diferencial   │
│        Ej: Alta accuracy overall pero baja     │
│            para grupo minoritario              │
│                                                │
│  6. SESGO DE DEPLOYMENT                        │
│     └─ Uso del modelo agrava desigualdades     │
│        Ej: Predictive policing en barrios ya   │
│            sobre-vigilados                     │
│                                                │
└────────────────────────────────────────────────┘
```

### 4.3. Grupos Protegidos (Protected Attributes)

**Definición:** Características que NO deberían influir en decisiones

| Atributo | Ejemplos | Consideración Legal |
|----------|----------|---------------------|
| **Raza/Etnia** | African American, Hispanic, Asian | Protected |
| **Género** | Male, Female, Non-binary | Protected |
| **Edad** | 18-25, 65+ | Protected (ADEA en USA) |
| **Religión** | Christian, Muslim, Jewish, Atheist | Protected |
| **Orientación sexual** | LGBTQ+ | Protected (varies by jurisdiction) |
| **Discapacidad** | Physical, Mental | Protected (ADA en USA) |
| **Estado civil** | Married, Single | Protected en algunos contextos |

**️ Problema:** Eliminar directamente no es suficiente

```python
#  Insuficiente
X_train = X_train.drop(columns=['gender', 'race'])

# ️ Problema: Proxy variables
# 'zip_code' puede ser proxy de race
# 'first_name' puede ser proxy de gender
# 'hobbies' pueden correlacionar con orientación sexual
```

### 4.4. Métricas de Fairness

#### Métrica 1: Demographic Parity (Paridad Demográfica)

**Definición:** Tasa de predicción positiva debe ser igual entre grupos

```
P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1)
```

Donde A es el atributo protegido (ej: género)

**Implementación:**

```python
def demographic_parity(y_pred, sensitive_attr):
    """
    Calcula diferencia en tasa de predicción positiva entre grupos
    
    Ideal: 0 (perfecta paridad)
    """
    groups = sensitive_attr.unique()
    rates = []
    
    for group in groups:
        mask = sensitive_attr == group
        rate = y_pred[mask].mean()
        rates.append(rate)
    
    return max(rates) - min(rates)

# Ejemplo
gender = np.array(['M', 'F', 'M', 'F', 'M', 'F'])
predictions = np.array([1, 0, 1, 0, 1, 1])

dp = demographic_parity(predictions, gender)
print(f"Demographic Parity Difference: {dp:.3f}")
# 0.0 = perfecta paridad
# >0.1 = potencial problema
```

**Interpretación:**

| Diferencia | Evaluación |
|------------|-----------|
| 0.00 - 0.05 |  Excelente |
| 0.05 - 0.10 | ️ Aceptable |
| 0.10 - 0.20 | ️ Preocupante |
| > 0.20 |  Discriminatorio |

---

#### Métrica 2: Equal Opportunity (Igualdad de Oportunidad)

**Definición:** True Positive Rate debe ser igual entre grupos

```
P(Ŷ=1 | Y=1, A=0) = P(Ŷ=1 | Y=1, A=1)
```

**Implementación:**

```python
from sklearn.metrics import confusion_matrix

def equal_opportunity_difference(y_true, y_pred, sensitive_attr):
    """
    Calcula diferencia en TPR entre grupos
    
    TPR (True Positive Rate) = TP / (TP + FN)
    """
    groups = sensitive_attr.unique()
    tprs = []
    
    for group in groups:
        mask = sensitive_attr == group
        cm = confusion_matrix(y_true[mask], y_pred[mask])
        
        # TPR = TP / (TP + FN)
        if cm.sum() > 0:
            tpr = cm[1, 1] / (cm[1, 1] + cm[1, 0])
            tprs.append(tpr)
    
    return max(tprs) - min(tprs)

# Ejemplo
y_true = np.array([1, 1, 0, 0, 1, 1])
y_pred = np.array([1, 0, 0, 0, 1, 1])
gender = np.array(['M', 'M', 'M', 'F', 'F', 'F'])

eod = equal_opportunity_difference(y_true, y_pred, gender)
print(f"Equal Opportunity Difference: {eod:.3f}")
```

**Cuándo importa:**
- Contextos donde False Negatives son críticos
- Ejemplo: Detección de enfermedades (miss diagnosis peor para cierto grupo)
- Ejemplo: Aprobación de loans (negar a calificados)

---

#### Métrica 3: Equalized Odds (Odds Equalizadas)

**Definición:** Tanto TPR como FPR deben ser iguales entre grupos

```
P(Ŷ=1 | Y=1, A=0) = P(Ŷ=1 | Y=1, A=1)  AND
P(Ŷ=1 | Y=0, A=0) = P(Ŷ=1 | Y=0, A=1)
```

**Implementación:**

```python
def equalized_odds_difference(y_true, y_pred, sensitive_attr):
    """
    Calcula diferencia máxima en TPR y FPR entre grupos
    """
    groups = sensitive_attr.unique()
    tprs, fprs = [], []
    
    for group in groups:
        mask = sensitive_attr == group
        cm = confusion_matrix(y_true[mask], y_pred[mask])
        
        # TPR y FPR
        tpr = cm[1, 1] / (cm[1, 1] + cm[1, 0]) if (cm[1, 1] + cm[1, 0]) > 0 else 0
        fpr = cm[0, 1] / (cm[0, 1] + cm[0, 0]) if (cm[0, 1] + cm[0, 0]) > 0 else 0
        
        tprs.append(tpr)
        fprs.append(fpr)
    
    tpr_diff = max(tprs) - min(tprs)
    fpr_diff = max(fprs) - min(fprs)
    
    return max(tpr_diff, fpr_diff)
```

---

#### Métrica 4: Disparate Impact

**Definición:** Ratio de tasas de predicción positiva entre grupos

```
            P(Ŷ=1 | A=unprivileged)
DI Ratio = ─────────────────────────
            P(Ŷ=1 | A=privileged)
```

**Regla legal (80% rule):**
> DI Ratio < 0.8 puede ser evidencia de discriminación

**Implementación:**

```python
def disparate_impact_ratio(y_pred, sensitive_attr, unprivileged_group):
    """
    Calcula DI ratio
    
    Ideal: 1.0 (perfecta paridad)
    Legal: >= 0.8
    """
    # Tasa para unprivileged group
    mask_unpriv = sensitive_attr == unprivileged_group
    rate_unpriv = y_pred[mask_unpriv].mean()
    
    # Tasa para privileged group (resto)
    mask_priv = sensitive_attr != unprivileged_group
    rate_priv = y_pred[mask_priv].mean()
    
    return rate_unpriv / rate_priv if rate_priv > 0 else 0

# Ejemplo: Hiring decisions
hired = np.array([1, 1, 1, 0, 0, 1, 1, 0])
gender = np.array(['M', 'M', 'M', 'M', 'F', 'F', 'F', 'F'])

di_ratio = disparate_impact_ratio(hired, gender, unprivileged_group='F')
print(f"Disparate Impact Ratio: {di_ratio:.3f}")

if di_ratio < 0.8:
    print("️ Possible discrimination (< 80% rule)")
```

---

### 4.5. Trade-offs de Fairness

**Impossibility Theorem (Kleinberg et al., 2016):**
> No es posible satisfacer simultáneamente: Calibration, Balance for positive class, y Balance for negative class (excepto en casos triviales)

**Ejemplo de conflicto:**

```python
# Escenario: Modelo de aprobación de loans
# Base rate es diferente entre grupos (histórico de discriminación)

# Grupo A: 50% historically defaulted
# Grupo B: 30% historically defaulted

# Si optimizamos para:
# 1. Demographic Parity → Aprobar igual % en ambos grupos
#    Resultado: Más defaults en Grupo A (sacrifica accuracy)

# 2. Equal Opportunity → Aprobar mismo % de "good borrowers"
#    Resultado: Diferente tasa de aprobación general (viola DP)

# 3. Calibration → P(default | score=x) igual entre grupos
#    Resultado: Diferentes umbrales de decisión (viola EO)
```

**Decisión depende de contexto:**

| Contexto | Métrica Preferida | Razón |
|----------|-------------------|-------|
| **Healthcare screening** | Equal Opportunity | Detectar enfermos es crítico |
| **Hiring** | Demographic Parity | Representación importa |
| **Credit scoring** | Calibration | Predicción precisa de risk |
| **Criminal justice** | Equalized Odds | Balance FP y FN |

---

### 4.6. Estrategias de Mitigación

#### Estrategia 1: Pre-processing (Antes del modelo)

**A. Reweighting**

```python
from fairlearn.reductions import ExponentiatedGradient
from fairlearn.reductions import DemographicParity

# Asignar pesos a training samples para balancear grupos
constraint = DemographicParity()
mitigator = ExponentiatedGradient(
    estimator=LogisticRegression(),
    constraints=constraint
)

mitigator.fit(X_train, y_train, sensitive_features=sensitive_train)
```

**B. Resampling**

```python
from imblearn.over_sampling import SMOTE

# Oversample minority group en positives
# Undersample majority group en negatives
```

---

#### Estrategia 2: In-processing (Durante entrenamiento)

**A. Fairness Constraints**

```python
from fairlearn.reductions import EqualizedOdds

constraint = EqualizedOdds()
mitigator = ExponentiatedGradient(
    estimator=RandomForestClassifier(),
    constraints=constraint
)

mitigator.fit(X_train, y_train, sensitive_features=sensitive_train)
```

**B. Adversarial Debiasing**

```python
# Entrenar dos modelos simultáneamente:
# 1. Predictor principal (task)
# 2. Adversary (predice atributo protegido)

# Objetivo: Maximizar accuracy del predictor
#           Minimizar accuracy del adversary
# Resultado: Representaciones que no codifican sensitive attribute
```

---

#### Estrategia 3: Post-processing (Después del modelo)

**A. Threshold Optimization**

```python
from fairlearn.postprocessing import ThresholdOptimizer

# Encontrar umbrales óptimos por grupo
postprocessor = ThresholdOptimizer(
    estimator=trained_model,
    constraints='equalized_odds',
    objective='balanced_accuracy_score'
)

postprocessor.fit(X_val, y_val, sensitive_features=sensitive_val)

# Predecir con umbrales ajustados
y_pred_fair = postprocessor.predict(X_test, sensitive_features=sensitive_test)
```

**Ejemplo visual:**

```python
# Original: Un threshold para todos
threshold = 0.5

# Post-processing: Thresholds por grupo
thresholds = {
    'GroupA': 0.45,  # Más permisivo
    'GroupB': 0.55   # Más estricto
}

# Ajustar predicciones
y_pred_adjusted = np.where(
    sensitive_attr == 'GroupA',
    (y_pred_proba > thresholds['GroupA']).astype(int),
    (y_pred_proba > thresholds['GroupB']).astype(int)
)
```

---

### 4.7. Fairness Audit Workflow

```python
import pandas as pd
from fairlearn.metrics import (
    demographic_parity_difference,
    equalized_odds_difference,
    MetricFrame
)

def fairness_audit(y_true, y_pred, sensitive_features, model_name="Model"):
    """
    Comprehensive fairness audit
    """
    print(f"\n{'='*60}")
    print(f"FAIRNESS AUDIT: {model_name}")
    print(f"{'='*60}\n")
    
    # 1. Overall Performance
    from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
    
    print(" Overall Performance:")
    print(f"  Accuracy: {accuracy_score(y_true, y_pred):.3f}")
    print(f"  F1 Score: {f1_score(y_true, y_pred):.3f}")
    
    # 2. Performance by Group
    print("\n Performance by Group:")
    metric_frame = MetricFrame(
        metrics={
            'accuracy': accuracy_score,
            'f1': f1_score,
            'selection_rate': lambda y_t, y_p: y_p.mean()
        },
        y_true=y_true,
        y_pred=y_pred,
        sensitive_features=sensitive_features
    )
    print(metric_frame.by_group)
    
    # 3. Fairness Metrics
    print("\n️ Fairness Metrics:")
    dp_diff = demographic_parity_difference(
        y_true, y_pred, sensitive_features=sensitive_features
    )
    print(f"  Demographic Parity Diff: {dp_diff:.3f}")
    
    eo_diff = equalized_odds_difference(
        y_true, y_pred, sensitive_features=sensitive_features
    )
    print(f"  Equalized Odds Diff: {eo_diff:.3f}")
    
    # 4. Interpretación
    print("\n Assessment:")
    if dp_diff < 0.05:
        print("   Demographic Parity: PASS")
    elif dp_diff < 0.10:
        print("  ️ Demographic Parity: WARNING")
    else:
        print("   Demographic Parity: FAIL")
    
    if eo_diff < 0.05:
        print("   Equalized Odds: PASS")
    elif eo_diff < 0.10:
        print("  ️ Equalized Odds: WARNING")
    else:
        print("   Equalized Odds: FAIL")
    
    return {
        'demographic_parity': dp_diff,
        'equalized_odds': eo_diff,
        'metric_frame': metric_frame
    }

# Usar
audit_results = fairness_audit(
    y_true=y_test,
    y_pred=model.predict(X_test),
    sensitive_features=sensitive_test['gender'],
    model_name="Loan Approval Model"
)
```

---

##  Recursos Adicionales

### Lecturas Complementarias

- **Pandas Missing Data** → https://pandas.pydata.org/docs/user_guide/missing_data.html
- **Fairlearn Documentation** → https://fairlearn.org/
- **Google ML Fairness** → https://developers.google.com/machine-learning/crash-course/fairness

### Tools & Libraries

```python
# Feature Engineering
from sklearn.preprocessing import (
    StandardScaler, MinMaxScaler, RobustScaler,
    PowerTransformer, QuantileTransformer
)
from sklearn.impute import SimpleImputer, KNNImputer, IterativeImputer

# Pipelines
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Fairness
from fairlearn.metrics import MetricFrame, demographic_parity_difference
from fairlearn.reductions import ExponentiatedGradient
from fairlearn.postprocessing import ThresholdOptimizer

# Outliers
from sklearn.ensemble import IsolationForest
from sklearn.cluster import DBSCAN
from scipy import stats
```


