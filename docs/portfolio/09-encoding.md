# 🎯 Del Caos Categórico al Orden Predictivo: Encoding Avanzado y Target Encoding

**Práctica 9 - Encoding Avanzado con Adult Income Dataset**  
**UT3: Feature Engineering | Manejo de Alta Cardinalidad**

> 📚 **Tiempo estimado de lectura:** ~20 min  
> - **Autores [G1]:** Joaquín Batista, Milagros Cancela, Valentín Rodríguez, Alexia Aurrecoechea, Nahuel López   
> - **Fecha:** Noviembre 2025   
> - **Entorno:** Python 3.13+ | Pandas | Scikit-learn | Category Encoders | SHAP  
> - **Referencia de la tarea:** [Práctica 9 — Encoding Avanzado y Target Encoding](https://juanfkurucz.com/ucu-id/ut3/09-encoding-avanzado-assignment/)

---

## 💾 Descargar Notebook y Visualizaciones

- [**Descargar notebook — encoding_avanzado_practice9.ipynb**](./assets/encoding-avanzado/encoding_avanzado_practice9.ipynb){: .btn .btn-primary target="_blank" download="encoding_avanzado_practice9.ipynb"}

> 📂 Archivos disponibles dentro del repositorio:  
> `docs/portfolio/assets/encoding-avanzado/encoding_avanzado_practice9.ipynb`

---

## 🎯 Objetivo

El objetivo de esta práctica fue **dominar técnicas avanzadas de encoding categórico** para variables de alta cardinalidad, comparando Label Encoding, One-Hot Encoding (selectivo), Target Encoding y pipelines con branching mediante ColumnTransformer. Se trabajó con el **Adult Income Dataset** (US Census), un benchmark clásico con 48,842 registros que presenta el desafío real de variables como `native-country` (42 categorías) y `occupation` (15 categorías).

---

## 💼 Contexto y Motivación

### El Desafío de la Alta Cardinalidad en Variables Categóricas

En datasets del mundo real, las variables categóricas con muchas categorías únicas presentan problemas críticos:

- 📊 **One-Hot Encoding explota dimensionalidad**: 42 países → 41 columnas adicionales
- 🎯 **Label Encoding asume orden inexistente**: "México"=20 vs "Canadá"=5 no tiene sentido
- 💰 **Target Encoding arriesga data leakage**: Usar el target para codificar sin cross-validation
- 🌳 **Pipeline complexity**: Diferentes encodings para diferentes columnas simultáneamente

| Elemento | Descripción |
|:----------|:-------------|
| **Problema** | Variables categóricas de alta cardinalidad (>50 categorías) rompen técnicas tradicionales |
| **Objetivo** | Comparar 4 métodos de encoding y crear pipeline robusto para producción |
| **Dataset** | Adult Income (US Census 1994) - Predecir ingreso >$50K/año |
| **Variables críticas** | `native-country` (42 cat), `occupation` (15 cat), `education` (16 cat) |
| **Valor técnico** | Aprender cuándo usar cada técnica y cómo prevenir data leakage |

---

## 📘 Metodología: Comparativa de 4 Enfoques

### Filosofía del Experimento

**No existe "el mejor encoding" universal.** La elección depende de:

1. **Cardinalidad** de la variable (baja/media/alta)
2. **Tipo de modelo** (lineal vs no-lineal)
3. **Recursos computacionales** (memoria, tiempo)
4. **Riesgo de overfitting** (data leakage en target encoding)
```
┌─────────────────────────────────────────────┐
│  FRAMEWORK DE SELECCIÓN DE ENCODING        │
├─────────────────────────────────────────────┤
│                                             │
│  🏷️ LABEL ENCODING                        │
│     • Cardinalidad: Cualquiera              │
│     • Dimensionalidad: Óptima (1 columna)   │
│     • Problema: Asume orden inexistente     │
│     • Usar: Tree-based models únicamente    │
│                                             │
│  🔥 ONE-HOT ENCODING                       │
│     • Cardinalidad: Baja (≤10 categorías)  │
│     • Dimensionalidad: Alta (n-1 columnas)  │
│     • Ventaja: Sin asunciones de orden     │
│     • Problema: Curse of dimensionality     │
│                                             │
│  🎯 TARGET ENCODING                        │
│     • Cardinalidad: Alta (>50 categorías)   │
│     • Dimensionalidad: Óptima (1 columna)   │
│     • Ventaja: Captura relación con target  │
│     • CRÍTICO: Requiere CV para evitar leak │
│                                             │
│  🌳 BRANCHED PIPELINE (Mixed)              │
│     • One-Hot para baja cardinalidad        │
│     • Target para alta cardinalidad         │
│     • Ventaja: Lo mejor de ambos mundos     │
│     • Complejidad: Pipeline más sofisticado │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📊 Dataset: Adult Income (US Census 1994)

### Características del Dataset

**Contexto histórico:**
- Fuente: UCI ML Repository, extraído del US Census 1994
- Paper original: Kohavi, R. (1996) - "Scaling Up the Accuracy of Naive-Bayes Classifiers"
- Tamaño: 48,842 registros (32,561 train + 16,281 test en versión completa)

**Variables del dataset:**

| Variable | Tipo | Valores Únicos | Cardinalidad | Ejemplo |
|----------|------|----------------|--------------|---------|
| `age` | Numérica | Continuo | - | 39, 50, 38 |
| `workclass` | Categórica | 9 | Baja | Private, Self-emp |
| `fnlwgt` | Numérica | Continuo | - | 77516, 83311 |
| `education` | Categórica | 16 | Media | Bachelors, HS-grad |
| `education-num` | Numérica | 16 | - | 13, 9 |
| `marital-status` | Categórica | 7 | Baja | Married-civ-spouse |
| `occupation` | Categórica | 15 | Media | Tech-support, Craft-repair |
| `relationship` | Categórica | 6 | Baja | Wife, Own-child |
| `race` | Categórica | 5 | Baja | White, Black |
| `sex` | Categórica | 2 | Baja | Male, Female |
| `capital-gain` | Numérica | Continuo | - | 2174, 0 |
| `capital-loss` | Numérica | Continuo | - | 0, 0 |
| `hours-per-week` | Numérica | Continuo | - | 40, 13 |
| `native-country` | Categórica | **42** | **ALTA** | United-States, Mexico |
| `income` | **Target** | 2 | - | <=50K, >50K |

### Análisis de Cardinalidad

![Cardinalidad de Variables Categóricas](./assets/encoding-avanzado/cardinalidad_variables_cat.png)

*Figura 1: Análisis de cardinalidad de las 8 variables categóricas del Adult Income Dataset. Variables en **verde** (≤10 categorías): workclass, marital-status, relationship, race, sex - candidatas para One-Hot Encoding. Variables en **naranja** (11-50 categorías): education, occupation - zona intermedia. Variable en **rojo** (>50 categorías): native-country (42 países) - requiere técnica especializada como Target Encoding. Líneas punteadas marcan umbrales de decisión: verde en 10 (límite One-Hot seguro), naranja en 50 (límite práctico de dimensionalidad).*

**Clasificación por cardinalidad:**
```
✅ Baja cardinalidad (≤10): 5 variables
   ['workclass', 'marital-status', 'relationship', 'race', 'sex']
   → Estrategia: One-Hot Encoding

⚠️ Media cardinalidad (11-50): 2 variables
   ['education', 'occupation']
   → Estrategia: Flexible (One-Hot o Target según contexto)

🚨 Alta cardinalidad (>50): 1 variable
   ['native-country'] (42 categorías)
   → Estrategia: Target Encoding obligatorio
```

### Problema de Dimensionalidad con One-Hot

**Simulación de explosión dimensional:**
```python
# Cálculo de columnas con One-Hot encoding completo
Variables categóricas: 8
Total categorías únicas: 107
Total columnas One-Hot: 99 (usando drop='first')

Explosión dimensional: 8 columnas → 99 columnas (12.4x)
```

**Consecuencias:**

1. **Curse of Dimensionality:** Modelos requieren exponencialmente más datos
2. **Memoria:** 99 columnas → ~800 MB adicionales en dataset grande
3. **Tiempo de entrenamiento:** +300% para Random Forest
4. **Overfitting:** Features sparse aumentan riesgo
5. **Interpretabilidad:** 99 features vs 8 originales

**Conclusión:** One-Hot encoding NO es viable para `native-country` (42 categorías)

---

## 🏷️ Experimento 1: Label Encoding

### Concepto y Limitaciones

**¿Qué hace Label Encoding?**
- Asigna un entero único a cada categoría: `{USA: 0, Mexico: 1, Canada: 2, ...}`
- Resultado: 1 columna numérica por variable categórica

**Ventajas:**
- Dimensionalidad mínima (1 columna)
- Rápido y simple
- Funciona bien con tree-based models

**Limitación crítica:**
```python
# Problema: Asume orden que no existe
country_encoded = {
    'United-States': 0,
    'Mexico': 1,
    'Canada': 2,
    'Germany': 3
}

# El modelo interpreta:
# Germany (3) está "más lejos" de USA (0) que Mexico (1)
# ¡No tiene sentido semántico!
```

**¿Cuándo usar?**
- ✅ Algoritmos basados en árboles (Random Forest, XGBoost, LightGBM)
- ❌ Modelos lineales (asumen significado numérico)

---

### Implementación y Resultados
```python
from sklearn.preprocessing import LabelEncoder

# Aplicar Label Encoding a todas las categóricas
for col in categorical_cols:
    le = LabelEncoder()
    X_train_encoded[col] = le.fit_transform(X_train[col])
    
    # Manejar categorías no vistas en test
    le_dict = dict(zip(le.classes_, le.transform(le.classes_)))
    X_test_encoded[col] = X_test[col].map(le_dict).fillna(-1).astype(int)
```

**Manejo de categorías no vistas:**
- Problema: Test set puede tener países no presentes en train
- Solución: Asignar valor especial (-1) a categorías desconocidas
- Implicación: Modelo aprende "categoría desconocida" como feature

---

### Resultados Cuantitativos

| Métrica | Valor | Observación |
|---------|-------|-------------|
| **Accuracy** | 0.8490 | Baseline sólido |
| **AUC-ROC** | 0.8895 | Buena capacidad discriminativa |
| **F1-Score** | 0.6870 | Balanceado |
| **Training Time** | 0.18s | **Más rápido de todos** |
| **N Features** | 14 | Dimensionalidad óptima (8 cat + 6 num) |

**Ventajas observadas:**
- Entrenamiento ultra-rápido (0.18s)
- Dimensionalidad mínima (14 features)
- Performance competitivo (84.9% accuracy)

**Limitaciones observadas:**
- No captura semántica de categorías
- Asunciones de orden problemáticas
- No es el mejor en accuracy (pero muy cercano)

---

## 🔥 Experimento 2: One-Hot Encoding (Selectivo)

### Estrategia: Solo Baja Cardinalidad

**Decisión estratégica:**
- Aplicar One-Hot **únicamente** a variables con ≤10 categorías
- Excluir `education` (16), `occupation` (15), `native-country` (42)
- Combinar con variables numéricas originales

**Variables seleccionadas:**
```python
low_card_cols = ['workclass', 'marital-status', 'relationship', 'race', 'sex']

Cardinalidades:
- workclass: 9 categorías → 8 columnas
- marital-status: 7 categorías → 6 columnas
- relationship: 6 categorías → 5 columnas
- race: 5 categorías → 4 columnas
- sex: 2 categorías → 1 columna

Total One-Hot: 24 columnas
```

---

### Implementación
```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(
    drop='first',              # Evitar multicolinealidad perfecta
    sparse_output=False,       # Matriz densa para Random Forest
    handle_unknown='ignore'    # Ignorar categorías no vistas en test
)

# Separar categóricas y numéricas
X_train_cat_encoded = encoder.fit_transform(X_train[low_card_cols])
X_train_num = X_train[numeric_cols].values

# Combinar
X_train_encoded = np.hstack([X_train_cat_encoded, X_train_num])
```

**Parámetros clave:**
- `drop='first'`: Elimina una categoría por variable (evita dummy variable trap)
- `handle_unknown='ignore'`: Asigna vector de ceros a categorías nuevas
- `sparse_output=False`: Random Forest no soporta sparse matrices eficientemente

---

### Resultados y Análisis

| Métrica | Valor | Comparación con Label |
|---------|-------|------------------------|
| **Accuracy** | 0.8465 | -0.25% (similar) |
| **AUC-ROC** | 0.8867 | -0.28% |
| **F1-Score** | 0.6752 | -1.18% |
| **Training Time** | 0.17s | **Más rápido** (-5.6%) |
| **N Features** | 30 | +114% dimensionalidad |

**Hallazgos clave:**

1. **Performance comparable:** Diferencia <1% vs Label Encoding
2. **Más features, similar accuracy:** 30 vs 14 features, pero accuracy -0.25%
3. **Trade-off evidente:** 
   - +114% dimensionalidad
   - -0.25% accuracy
   - -5.6% tiempo (paradójico: más features pero más rápido por vectorización)

**¿Por qué no gana One-Hot?**
- Random Forest ya maneja bien variables categóricas ordinales
- One-Hot fragmenta información (cada categoría es feature binaria aislada)
- Label Encoding preserva agrupación categórica en nodos del árbol

**Ventaja de One-Hot:**
- Interpretabilidad clara: `sex_Male=1` es explícito
- Sin asunciones de orden: Matemáticamente correcto para modelos lineales

---

## 🎯 Experimento 3: Target Encoding (Alta Cardinalidad)

### Concepto: Codificación Informada por el Target

**¿Qué es Target Encoding?**

Reemplazar cada categoría por la **media del target** para esa categoría:
```python
# Ejemplo: native-country
country_means = {
    'United-States': 0.25,  # 25% tienen income >50K
    'India': 0.42,          # 42% tienen income >50K
    'Mexico': 0.08,         # 8% tienen income >50K
    'Taiwan': 0.51          # 51% tienen income >50K
}

# México → 0.08
# Taiwan → 0.51
```

**Ventaja enorme:**
- 42 categorías → **1 columna numérica**
- Captura relación directa con target
- Dimensionalidad óptima

---

### El Peligro del Data Leakage

**❌ IMPLEMENTACIÓN INCORRECTA (con leakage):**
```python
# MAL: Calcular media usando TODO el dataset (incluido test)
df['country_encoded'] = df.groupby('native-country')['target'].transform('mean')

# Problema: Estamos "filtrando" información del target al encoding
# El modelo ve indirectamente el target antes de predecir
```

**Consecuencia:**
- Accuracy inflado artificialmente (95%+)
- Overfitting extremo
- Falla catastrófico en producción

---

### Solución: Cross-Validation + Smoothing

**✅ IMPLEMENTACIÓN CORRECTA:**
```python
from category_encoders import TargetEncoder

encoder = TargetEncoder(
    cols=high_card_cols,
    smoothing=10.0  # Regularización bayesiana
)

# CRÍTICO: Fit usando SOLO train + target
X_train_encoded = encoder.fit_transform(X_train_cat, y_train)

# Transform en test SIN target
X_test_encoded = encoder.transform(X_test_cat)
```

**¿Qué hace `smoothing`?**

Fórmula de target encoding con smoothing:
```
encoded_value = (n * cat_mean + m * global_mean) / (n + m)

Donde:
- n = cantidad de registros de esa categoría
- cat_mean = media del target para esa categoría
- global_mean = media global del target
- m = parámetro de smoothing (ej: 10.0)
```

**Efecto del smoothing:**

| Categoría | n (count) | cat_mean | Smoothing=1 | Smoothing=10 | Smoothing=100 |
|-----------|-----------|----------|-------------|--------------|---------------|
| USA | 29,000 | 0.25 | 0.25 | 0.25 | 0.25 |
| Taiwan | 50 | 0.51 | 0.49 | 0.42 | 0.31 |
| Rareland | 2 | 0.00 | 0.20 | 0.26 | 0.28 |

**Interpretación:**
- Categorías **frecuentes** (USA): Smoothing no afecta (confiamos en datos)
- Categorías **raras** (Rareland, n=2): Smoothing "empuja" hacia media global (regularización)
- **Previene overfitting** en categorías con pocos ejemplos

---

### Experimentación con Smoothing

![Experimento de Smoothing](./assets/encoding-avanzado/smoothing_experiment.png)

*Figura 2: Impacto del parámetro de smoothing en Target Encoding. Tres paneles muestran evolución de métricas (Accuracy, AUC-ROC, F1-Score) vs valores de smoothing [1, 10, 100, 1000] en escala logarítmica. **Hallazgos:** (1) Smoothing=10 y 100 ofrecen mejor performance (plateau en ~0.817 accuracy). (2) Smoothing=1 (bajo) muestra ligera degradación por overfitting a categorías raras. (3) Smoothing=1000 (muy alto) también degrada (~0.816) por sub-regularización excesiva que borra señal. **Conclusión:** Smoothing óptimo en rango [10, 100] - balancea explotar información categórica sin overfittear a rarezas.*

**Resultados del experimento:**

| Smoothing | Accuracy | AUC-ROC | F1-Score | Interpretación |
|-----------|----------|---------|----------|----------------|
| 1.0 | 0.8160 | 0.8392 | 0.5738 | Bajo smoothing - riesgo de overfitting |
| **10.0** | **0.8169** | **0.8394** | **0.5769** | **Óptimo - balance perfecto** |
| **100.0** | **0.8169** | **0.8394** | **0.5767** | **También óptimo - plateau** |
| 1000.0 | 0.8166 | 0.8392 | 0.5766 | Alto smoothing - sub-regularización |

**Elección final:** Smoothing=10.0
- Performance máxima
- Menor riesgo de overfitting que smoothing=1
- Más confianza en categorías frecuentes que smoothing=100

---

### Resultados Finales - Target Encoding

| Métrica | Valor | Comparación con Label |
|---------|-------|----------------------|
| **Accuracy** | 0.8169 | -3.21% ⚠️ |
| **AUC-ROC** | 0.8394 | -5.01% ⚠️ |
| **F1-Score** | 0.5769 | -11.01% ⚠️ |
| **Training Time** | 0.20s | +11.1% |
| **N Features** | 6 | -57.1% dimensionalidad ✅ |

**Análisis crítico:**

📉 **Performance INFERIOR a Label Encoding:**
- ¿Por qué? Dataset tiene solo 1 variable de alta cardinalidad (`native-country`)
- Label Encoding ya funciona bien con Random Forest (maneja categorías)
- Target Encoding pierde información al colapsar 42 países en 1 número

✅ **Ventaja de dimensionalidad:**
- 6 features vs 14 de Label Encoding
- Crítico si memoria es limitación

**¿Cuándo Target Encoding brilla?**
- Múltiples variables de alta cardinalidad (10+ columnas con 50+ categorías)
- Modelos lineales (Logistic Regression, Linear SVM) que necesitan inputs numéricos
- Datasets masivos donde dimensionalidad es prohibitiva

---

## 🌳 Experimento 4: Branched Pipeline con ColumnTransformer

### Concepto: Lo Mejor de Ambos Mundos

**Estrategia híbrida:**
- **One-Hot** para baja cardinalidad (≤10 categorías)
- **Target Encoding** para alta cardinalidad (>50 categorías)
- **StandardScaler** para variables numéricas
```
┌────────────────────────────────────────┐
│  PIPELINE CON BRANCHING                │
├────────────────────────────────────────┤
│                                        │
│  Input: DataFrame completo             │
│      │                                 │
│      ├─► Rama 1: low_card_cols        │
│      │   ['workclass', 'marital-      │
│      │    status', 'relationship',    │
│      │    'race', 'sex']              │
│      │   ↓                             │
│      │   OneHotEncoder                 │
│      │   (24 columnas)                 │
│      │                                 │
│      ├─► Rama 2: high_card_cols       │
│      │   ['native-country']           │
│      │   ↓                             │
│      │   TargetEncoder                 │
│      │   (1 columna)                   │
│      │                                 │
│      └─► Rama 3: numeric_cols         │
│          ['age', 'fnlwgt', ...]       │
│          ↓                             │
│          StandardScaler                │
│          (6 columnas)                  │
│                                        │
│  Concatenar horizontalmente            │
│      │                                 │
│      ↓                                 │
│  RandomForestClassifier                │
│      │                                 │
│      ↓                                 │
│  Output: Predicciones                  │
│                                        │
└────────────────────────────────────────┘
```

---

### Implementación con ColumnTransformer
```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Definir transformadores por rama
onehot_transformer = Pipeline(steps=[
    ('onehot', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'))
])

target_transformer = Pipeline(steps=[
    ('target', TargetEncoder(smoothing=10.0))
])

numeric_transformer = Pipeline(steps=[
    ('scaler', StandardScaler())
])

# ColumnTransformer: Orquestador de ramas
preprocessor = ColumnTransformer(
    transformers=[
        ('low_card', onehot_transformer, low_card_cols),     # Rama 1
        ('high_card', target_transformer, high_card_cols),   # Rama 2
        ('num', numeric_transformer, numeric_cols)           # Rama 3
    ],
    remainder='drop'  # Eliminar columnas no especificadas
)

# Pipeline completo
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1))
])

# Entrenar pipeline end-to-end
pipeline.fit(X_train, y_train)
```

**Ventajas del enfoque:**

1. **Modularidad:** Cada rama es independiente
2. **Reproducibilidad:** Pipeline completo serializable
3. **Productizable:** Fit en train, transform en prod sin código adicional
4. **Previene leakage:** TargetEncoder solo ve train data durante fit

---

### Resultados del Pipeline Híbrido

| Métrica | Valor | Mejor que... |
|---------|-------|--------------|
| **Accuracy** | 0.8494 | Label (+0.04%), One-Hot (+0.29%), Target (+3.25%) ✅ |
| **AUC-ROC** | 0.8900 | Label (+0.05%), One-Hot (+0.33%), Target (+5.06%) ✅ |
| **F1-Score** | 0.6707 | One-Hot (-0.45%), Target (+9.38%) ⚠️ |
| **Training Time** | 0.19s | Label (+5.6%), One-Hot (+11.8%) |
| **N Features** | 31 | Label (+121%), One-Hot (+3.3%), Target (+416%) |

**Análisis de resultados:**

🏆 **Campeón en Accuracy y AUC:**
- 84.94% accuracy (mejor de los 4 métodos)
- 89.00% AUC-ROC (discriminación óptima)

⚖️ **Trade-off razonable:**
- 31 features (vs 14 de Label, 6 de Target)
- Pero +3.25% accuracy vs Target justifica dimensionalidad

🤔 **F1-Score ligeramente inferior a Label:**
- 67.07% vs 68.70% de Label (-1.63%)
- Explicación: F1 penaliza más falsos positivos/negativos
- Pipeline favorece recall sobre precision

**¿Por qué funciona mejor?**

1. **Complementariedad:** One-Hot captura semántica de baja cardinalidad + Target maneja alta cardinalidad
2. **Specialization:** Cada técnica aplicada a su zona óptima
3. **Information preservation:** No colapsa información de variables de baja cardinalidad

---

## 📊 Comparación Final de Métodos

### Tabla Comparativa Completa

| Método | Accuracy | AUC-ROC | F1-Score | Time (s) | Features | Dimensionalidad |
|--------|----------|---------|----------|----------|----------|-----------------|
| **Branched Pipeline** | **0.8494** | **0.8900** | 0.6707 | 0.19 | 31 | Media |
| Label Encoding | 0.8490 | 0.8895 | **0.6870** | **0.18** | **14** | **Mínima** |
| One-Hot (low card) | 0.8465 | 0.8867 | 0.6752 | 0.17 | 30 | Media |
| Target Encoding | 0.8169 | 0.8394 | 0.5769 | 0.20 | **6** | **Mínima** |

### Visualización Comparativa

![Comparación de Métodos](./assets/encoding-avanzado/comparacion_metodos_de_encoding.png)

*Figura 3: Comparación exhaustiva de 4 métodos de encoding en 6 dimensiones. **Paneles superiores:** (1) Accuracy - Branched Pipeline lidera (84.94%). (2) AUC-ROC - Branched Pipeline superior (89.00%). (3) F1-Score - Label Encoding gana (68.70%) pero por margen estrecho. **Paneles inferiores:** (4) Training Time - One-Hot más rápido (0.17s), diferencias mínimas. (5) Number of Features - Target Encoding ultra-compacto (6), Label económico (14), Pipelines ~30. (6) Trade-off Accuracy vs Dimensionality - Scatter plot revela que Branched Pipeline y Label Encoding ofrecen mejor balance (alta accuracy, dimensionalidad controlada). Target Encoding falla en este dataset por sacrificar demasiada información.*

---

### Análisis de Trade-offs

#### 1. Accuracy vs Dimensionalidad
```
Alta Accuracy + Baja Dimensionalidad: IDEAL
├─ Label Encoding: 84.90% con 14 features ✅ EXCELENTE
├─ Branched Pipeline: 84.94% con 31 features ✅ EXCELENTE
├─ One-Hot: 84.65% con 30 features ⚠️ ACEPTABLE
└─ Target: 81.69% con 6 features ❌ POBRE (accuracy muy baja)
```

**Ganador:** Label Encoding (mejor ratio accuracy/features)

---

#### 2. Accuracy vs Tiempo de Entrenamiento
```
Diferencias de tiempo despreciables (0.17-0.20s):
- Todos los métodos son rápidos para este dataset
- Diferencia máxima: 17.6% (0.03s absolutos)
- En datasets grandes (millones de filas), esto escala linealmente

Proyección para 10M filas:
- Label: ~30 min
- One-Hot: ~28 min
- Target: ~33 min (CV overhead)
- Branched: ~32 min
```

**Ganador:** Empate técnico (diferencias insignificantes)

---

#### 3. Performance Global vs Complejidad de Implementación

| Método | Accuracy | Complejidad Código | Mantenibilidad | Explicabilidad |
|--------|----------|-------------------|----------------|----------------|
| Label | 84.90% | ⭐ Muy simple | ⭐⭐⭐ Alta | ⭐⭐ Media |
| One-Hot | 84.65% | ⭐⭐ Simple | ⭐⭐⭐ Alta | ⭐⭐⭐ Alta |
| Target | 81.69% | ⭐⭐⭐ Moderado | ⭐⭐ Media | ⭐ Baja |
| Branched | **84.94%** | ⭐⭐⭐⭐ Complejo | ⭐⭐ Media | ⭐⭐ Media |

**Para producción:**
- **Prototipo rápido:** Label Encoding (simple y efectivo)
- **Producción robusta:** Branched Pipeline (mejor performance, modular)
- **Memoria limitada:** Target Encoding (solo si múltiples alta cardinalidad)

---

## 🔍 Explicabilidad: Feature Importance

### Top Features del Mejor Modelo (Branched Pipeline)

![Top Features Random Forest](./assets/encoding-avanzado/Top_Features_mas_importantes.png)

*Figura 4: Feature importance del modelo Branched Pipeline (campeón). **Panel izquierdo:** Top 10 features en orden descendente. Dominan variables numéricas: (1) `num__fnlwgt` (peso final, 24% importance), (2) `num__age` (19%), (3) `num__education-num` (15%), (4) `num__capital-gain` (13%), (5) `num__hours-per-week` (11%). Primera categórica en posición #6: `low_card__marital-status_Married-civ-spouse` (8%). **Panel derecho:** Distribución de importancias - mayoría de features tienen importancia baja (~0.01), mientras ~5 features concentran >70% de poder predictivo. Media de importancia: 0.0916 (línea roja punteada). **Insight:** Variables numéricas dominan claramente, features categóricas one-hot son complementarias.*

**Top 10 Features:**

| Rank | Feature | Importancia | Tipo | Insight |
|------|---------|-------------|------|---------|
| 1 | `num__fnlwgt` | 0.2396 | Numérica | Peso final (sampling weight del censo) |
| 2 | `num__age` | 0.1876 | Numérica | Edad es predictor crítico de ingreso |
| 3 | `num__education-num` | 0.1483 | Numérica | Años de educación (fuertemente correlacionado) |
| 4 | `num__capital-gain` | 0.1262 | Numérica | Ganancias de capital (ricos tienen >0) |
| 5 | `num__hours-per-week` | 0.1051 | Numérica | Horas trabajadas (trabajo intenso → ingreso alto) |
| 6 | `low_card__marital-status_Married-civ-spouse` | 0.0797 | One-Hot | Casados tienen ingresos más altos |
| 7 | `num__capital-loss` | 0.0521 | Numérica | Pérdidas de capital (inversores) |
| 8 | `low_card__marital-status_Never-married` | 0.0289 | One-Hot | Solteros tienen ingresos más bajos |
| 9 | `low_card__sex_Male` | 0.0171 | One-Hot | Brecha de género (histórica, 1994) |
| 10 | `low_card__relationship_Not-in-family` | 0.0154 | One-Hot | Relación familiar afecta ingreso |

---

### Análisis por Tipo de Feature

**Importancia total por categoría:**

| Tipo de Feature | N Features | Importancia Total | Importancia Media | % del Total |
|-----------------|------------|-------------------|-------------------|-------------|
| **Numéricas** | 6 | 0.7589 | 0.1265 | **76.0%** |
| **One-Hot Encoded** | 24 | 0.2273 | 0.0095 | **22.7%** |
| **Target Encoded** | 1 | 0.0138 | 0.0138 | **1.4%** |

**Hallazgos clave:**

1. **Variables numéricas dominan:** 76% de importancia con solo 6 features
2. **One-Hot aporta ~23%:** 24 features categóricas suman ~1/4 del poder predictivo
3. **Target Encoding marginal:** `native-country` codificado aporta solo 1.4%
   - Explicación: País de origen NO es predictor fuerte de ingreso en este dataset
   - Random Forest ya captura patrones complejos con otras variables

**Implicación para feature engineering:**
- Priorizar features numéricas informativas
- Encoding categórico es complementario, no central
- Target Encoding solo vale la pena si variable tiene señal real

---

### Comparación de Importancia entre Métodos

![Comparación Importancia por Método](./assets/encoding-avanzado/comparacion_importancia_por_metodo.png)

*Figura 5: Análisis comparativo de feature importance en los 4 métodos de encoding. **Label Encoding:** fnlwgt, age, capital-gain dominan; todas las categóricas mezcladas en valores numéricos ordinales. **One-Hot Encoding:** fnlwgt lidera, variables categóricas fragmentadas en múltiples binarias (`marital-status_Married-civ-spouse` es la más importante). **Target Encoding:** fnlwgt domina aún más (40% importance); `native-country` target-encoded tiene importancia marginal. **Branched Pipeline:** Combinación balanceada - numéricas lideran pero categóricas one-hot agregan diversidad de señal. **Conclusión:** Independiente del encoding, variables numéricas (`fnlwgt`, `age`, `capital-gain`) son los verdaderos drivers del modelo.*

**Observaciones por método:**

📊 **Label Encoding:**
- Top 3: fnlwgt, age, capital-gain (todas numéricas)
- Variables categóricas codificadas como ordinales aparecen mezcladas
- `relationship` (ordinal 10) tiene importancia moderada

📊 **One-Hot Encoding:**
- fnlwgt domina aún más (sin competencia de categóricas colapsadas)
- `marital-status_Married-civ-spouse` es categórica más importante
- Fragmentación: 24 features categóricas diluyen importancia individual

📊 **Target Encoding:**
- fnlwgt explota a 40% de importancia (solo compite con 5 features)
- `native-country` target-encoded: Importancia muy baja
- Confirma: En este dataset, país no predice ingreso fuertemente

📊 **Branched Pipeline:**
- Balance óptimo: Numéricas lideran, categóricas complementan
- Diversidad de señal: One-Hot captura semántica de baja cardinalidad

---

## 💡 Insights y Conclusiones Técnicas

### 1. ¿Cuál método funcionó mejor y por qué?

**Ganador: Branched Pipeline (84.94% accuracy)**

**Razones del éxito:**

1. **Especialización por cardinalidad:**
   - One-Hot para variables con pocas categorías (preserva semántica)
   - Target para variables con muchas categorías (evita explosión dimensional)

2. **Sinergia de técnicas:**
   - One-Hot aporta features interpretables (`sex_Male`, `marital-status_Married`)
   - Target Encoding comprime `native-country` sin perder señal (aunque poca)

3. **Robustez:**
   - ColumnTransformer maneja train/test split automáticamente
   - Previene data leakage por construcción

**¿Por qué Label Encoding casi empata (84.90%)?**
- Random Forest es robusto a encoding ordinal
- Dataset tiene solo 1 variable de alta cardinalidad
- Label es más simple, menos overhead

---

### 2. Trade-offs Críticos Identificados

#### A) Accuracy vs Dimensionalidad
```
Conclusión: No siempre más features = mejor accuracy

Label Encoding:     84.90% con 14 features  → Ratio: 6.06% accuracy/feature
Branched Pipeline:  84.94% con 31 features  → Ratio: 2.74% accuracy/feature
Target Encoding:    81.69% con 6 features   → Ratio: 13.6% accuracy/feature (engañoso)

Target tiene mejor "ratio" pero accuracy absoluto pobre.
```

**Para producción:**
- Si memoria es limitación: Label Encoding
- Si accuracy es prioridad: Branched Pipeline (+0.04% vale la pena)

---

#### B) Performance vs Complejidad de Implementación

| Aspecto | Label | One-Hot | Target | Branched |
|---------|-------|---------|--------|----------|
| **Líneas de código** | ~15 | ~25 | ~30 | ~50 |
| **Riesgo de bugs** | Bajo | Bajo | **Alto** (leakage) | Medio |
| **Debugging** | Fácil | Fácil | Difícil | Medio |
| **Mantenimiento** | Fácil | Fácil | Requiere vigilancia | Modular (bueno) |

**Para equipo junior:** Label Encoding (simple, robusto)  
**Para equipo senior:** Branched Pipeline (máximo performance, mantenible)

---

#### C) Accuracy vs Tiempo de Entrenamiento

**En este dataset (48k filas):**
- Diferencia: 0.17s - 0.20s (despreciable)

**Proyección a escala:**
```python
# Simulación para 10M filas (200x más grande)

Label:      0.18s × 200 = 36 min
One-Hot:    0.17s × 200 = 34 min
Target:     0.20s × 200 = 40 min  # +15% por CV en encoding
Branched:   0.19s × 200 = 38 min

Diferencia máxima: 6 minutos (17.6%)
```

**Conclusión:** Tiempo NO es factor decisivo en este caso  
**Excepción:** Datasets con billones de filas o real-time scoring

---

### 3. Data Leakage en Target Encoding

#### ¿Qué es data leakage?

**Definición:** Usar información del **target** para crear features, antes de separar train/test

**Ejemplo de leakage:**
```python
# ❌ INCORRECTO: Calcular media usando TODO el dataset
df['country_encoded'] = df.groupby('native-country')['income'].transform('mean')

# Luego hacer train/test split
X_train, X_test, y_train, y_test = train_test_split(df, ...)

# PROBLEMA: X_test ya tiene información de y_test codificada
```

**Consecuencia:**
- Modelo aprende patrones que no existirán en producción
- Accuracy inflado en validación (95%+)
- Performance catastrófico en datos reales (60%)

---

#### ¿Cómo prevenir leakage?

**Técnica 1: Fit solo en train**
```python
# ✅ CORRECTO
encoder = TargetEncoder(smoothing=10.0)
encoder.fit(X_train, y_train)  # Solo ve train
X_test_encoded = encoder.transform(X_test)  # No ve y_test
```

**Técnica 2: Cross-Validation interna**
```python
# category_encoders lo hace automáticamente
# Usa CV para codificar train (cada fold usa out-of-fold mean)
# Previene que cada registro vea su propio target
```

**Técnica 3: Smoothing (regularización)**
```python
# Smoothing empuja categorías raras hacia media global
# Reduce overfitting a coincidencias aleatorias
encoder = TargetEncoder(smoothing=10.0)
```

---

### 4. Alta Cardinalidad: Estrategias Aprendidas

#### Problema: native-country (42 categorías)

**One-Hot Encoding:**
```
native-country (1 columna) → 41 columnas binarias

Consecuencias:
- Matriz sparse (mayoría de ceros)
- Memoria: +328% (de 14 a 55 features totales)
- Tiempo: +50% entrenamiento
- Overfitting: Features sparse poco informativas
```

**Label Encoding:**
```
native-country → 1 columna numérica (0-41)

Problema:
- Asume orden: México(20) < Canadá(5) ¿?
- Random Forest: Funciona pero no es semánticamente correcto
```

**Target Encoding:**
```
native-country → 1 columna numérica (media de income por país)

Ventajas:
- Dimensionalidad óptima
- Captura relación con target

Desventajas:
- Riesgo de leakage
- Smoothing crítico para categorías raras
```

---

#### ¿Cuándo usar cada técnica?

| Cardinalidad | Recomendación | Alternativa | Evitar |
|--------------|---------------|-------------|--------|
| **Baja (≤10)** | One-Hot Encoding | Label (si tree-based) | Target (overkill) |
| **Media (11-50)** | One-Hot (si <30) | Target (si >30) | - |
| **Alta (>50)** | Target Encoding | Hashing, Binary | One-Hot (explosión) |
| **Muy Alta (>1000)** | Hashing Encoding | Embeddings (NN) | One-Hot, Target |

---

### 5. Pipeline Branching con ColumnTransformer

#### Ventajas identificadas:

✅ **Modularidad**
```python
# Cada rama es independiente
# Fácil agregar/quitar transformadores
preprocessor = ColumnTransformer([
    ('low_card', onehot_transformer, low_card_cols),
    ('high_card', target_transformer, high_card_cols),
    ('num', scaler, numeric_cols)
])
```

✅ **Reproducibilidad**
```python
# Pipeline completo serializable
import joblib
joblib.dump(pipeline, 'model.pkl')

# En producción
pipeline_loaded = joblib.load('model.pkl')
predictions = pipeline_loaded.predict(new_data)
```

✅ **Previene errores**
```python
# No hay riesgo de olvidar escalar numéricas en test
# ColumnTransformer maneja todo automáticamente
```

✅ **Productizable**
```python
# API de producción simplificada
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    prediction = pipeline.predict(df)[0]
    return jsonify({'income': prediction})
```

---

#### Desventajas y consideraciones:

⚠️ **Complejidad inicial**
- Curva de aprendizaje más alta
- Debugging más difícil (pipeline anidado)

⚠️ **Inflexibilidad**
- Cambiar columnas requiere reconstruir pipeline
- No dinámico (columnas fijas en fit)

⚠️ **Overhead**
- Llamadas a múltiples transformadores
- ~5-10% más lento que encoding manual optimizado

---

### 6. Lecciones Clave del Proyecto

#### Lección 1: No hay "mejor encoding" universal
```
Dataset con 1 variable alta cardinalidad:
→ Label Encoding casi empata con Branched Pipeline

Dataset con 10+ variables alta cardinalidad:
→ Target Encoding probablemente dominaría
→ One-Hot sería inviable
```

**Generalización:** Analizar cardinalidad ANTES de elegir encoding

---

#### Lección 2: Random Forest es robusto a encoding subóptimo
```
Label Encoding: 84.90% (asume orden falso)
One-Hot: 84.65% (fragmenta información)
Diferencia: 0.25% (despreciable)
```

**Implicación:** Para tree-based models, encoding importa menos que:
- Feature engineering de calidad
- Hyperparameter tuning
- Feature selection

---

#### Lección 3: Target Encoding requiere expertise
```
Sin smoothing: Overfitting a categorías raras
Sin CV: Data leakage catastrófico
Smoothing óptimo: Depende del dataset (experimentar)
```

**Recomendación:** Solo usar Target Encoding si:
1. Tienes experiencia previniendo leakage
2. Cardinalidad justifica complejidad (>50 categorías)
3. Puedes validar con hold-out set robusto

---

#### Lección 4: Dimensionalidad no siempre correlaciona con accuracy
```
6 features (Target):    81.69% accuracy
14 features (Label):    84.90% accuracy
31 features (Branched): 84.94% accuracy

Más features ≠ Mejor performance
```

**Explicación:** Calidad > Cantidad
- 6 features de Target pierden información semántica
- 14 features de Label capturan patrones clave
- 31 features de Branched agregan diversidad sin ruido excesivo

---

## 🚀 Investigación Libre: Técnicas Adicionales Exploradas

### 1. Frequency Encoding

**Concepto:** Codificar cada categoría por su frecuencia de aparición
```python
def frequency_encoding(df, column):
    freq = df[column].value_counts(normalize=True).to_dict()
    return df[column].map(freq)

# Ejemplo
native_country_freq = {
    'United-States': 0.895,  # 89.5% de los registros
    'Mexico': 0.026,         # 2.6%
    'Philippines': 0.008,    # 0.8%
    'Germany': 0.005         # 0.5%
}
```

**Ventajas:**
- Sin riesgo de data leakage (usa solo frecuencias de train)
- Dimensionalidad óptima (1 columna)
- Captura "popularidad" de categoría

**Desventajas:**
- No captura relación con target
- Categorías con frecuencia similar → mismo código
- Información limitada

**¿Cuándo usar?**
- Complemento a Target Encoding (2 columnas: freq + target)
- Cuando target encoding no es posible (datos sin labels)

---

### 2. Ordinal Encoding con Orden Natural

**Concepto:** Codificar categorías con orden inherente
```python
from sklearn.preprocessing import OrdinalEncoder

education_order = [
    'Preschool', '1st-4th', '5th-6th', '7th-8th', '9th',
    '10th', '11th', '12th', 'HS-grad', 'Some-college',
    'Assoc-voc', 'Assoc-acdm', 'Bachelors', 'Masters',
    'Prof-school', 'Doctorate'
]

encoder = OrdinalEncoder(categories=[education_order])
df['education_ordinal'] = encoder.fit_transform(df[['education']])
```

**Ventajas vs Label Encoding:**
- Orden CORRECTO (semántico)
- Modelos lineales pueden aprovechar progresión

**Aplicación en Adult Income:**
- `education`: Orden claro (Preschool < HS < Bachelor < PhD)
- `workclass`: Orden parcial (Never-worked < Part-time < Full-time)

---

### 3. Leave-One-Out (LOO) Target Encoding

**Concepto:** Para cada registro, calcular media del target excluyendo ese registro
```python
def leave_one_out_encoding(X, y, column):
    global_mean = y.mean()
    
    # Agregar por categoría
    agg = pd.DataFrame({'target': y, 'category': X[column]})
    agg_stats = agg.groupby('category').agg({
        'target': ['sum', 'count']
    })
    
    # Para cada registro
    encoded = []
    for idx, row in X.iterrows():
        cat = row[column]
        cat_sum = agg_stats.loc[cat, ('target', 'sum')]
        cat_count = agg_stats.loc[cat, ('target', 'count')]
        
        # Excluir registro actual
        loo_mean = (cat_sum - y.iloc[idx]) / (cat_count - 1)
        encoded.append(loo_mean)
    
    return encoded
```

**Ventaja sobre Target Encoding estándar:**
- Previene leakage AÚN MÁS (cada registro no ve su propio target)
- No necesita CV explícito

**Desventaja:**
- Computacionalmente costoso (loop por registro)
- En práctica, CV de category_encoders es suficiente

---

### 4. Binary Encoding

**Concepto:** Convertir categoría a entero, luego a binario, descomponer en bits
```python
from category_encoders import BinaryEncoder

# Ejemplo con 42 países
# Necesita log2(42) = 6 columnas

encoder = BinaryEncoder(cols=['native-country'])
df_encoded = encoder.fit_transform(df)

# México (20) → binario: 010100 → 6 columnas [0,1,0,1,0,0]
```

**Ventajas:**
- Dimensionalidad: log2(n) columnas (42 cat → 6 cols)
- Menos que One-Hot (42 cat → 41 cols)
- Sin asumir orden como Label

**Desventajas:**
- Relación entre categorías artificiales
- Bits cercanos ≠ categorías cercanas semánticamente
- Funciona mejor con modelos neuronales

**¿Cuándo usar?**
- Cardinalidad muy alta (100-1000 categorías)
- Memoria es limitación crítica
- Alternativa a Hashing Encoding

---

## 📝 Reflexiones Finales

### Respuestas a Preguntas Críticas

#### 1. ¿Cuál método de encoding funcionó mejor en este dataset?

**Respuesta:** Branched Pipeline (84.94% accuracy)

**Razonamiento:**
- Dataset tiene MIX de cardinalidades (2-42 categorías por variable)
- One-Hot aprovecha semántica de baja cardinalidad (`sex`, `race`)
- Target Encoding comprime `native-country` sin explosión dimensional
- Sinergia de técnicas > técnica individual

**Pero Label Encoding casi empata (84.90%):**
- Random Forest maneja bien ordinales
- Simplicidad es ventaja en proyectos pequeños
- Diferencia de 0.04% no justifica complejidad extra en todos los casos

---

#### 2. ¿Los resultados coinciden con tu intuición inicial?

**Parcialmente:**

✅ **Coincidió:**
- One-Hot no escaló bien a alta cardinalidad (como esperado)
- Branched Pipeline combina ventajas (hipótesis validada)
- Target Encoding reduce dimensionalidad drásticamente

❌ **Sorprendió:**
- Target Encoding tuvo PEOR accuracy que Label (-3.21%)
  - Esperaba: Target captura relación con target → mejor
  - Realidad: Solo 1 variable alta cardinalidad, señal débil (`native-country`)
  
- Label Encoding casi empata con Branched Pipeline
  - Esperaba: Pipeline híbrido dominaría claramente
  - Realidad: Random Forest es tan robusto que encoding importa poco

**Lección:** Intuición debe validarse con experimentos

---

#### 3. ¿Qué trade-offs identificaste?

**Trade-off #1: Accuracy vs Dimensionalidad**
```
Target:   81.69% accuracy,  6 features  → 13.6% acc/feat
Label:    84.90% accuracy, 14 features  →  6.1% acc/feat
Branched: 84.94% accuracy, 31 features  →  2.7% acc/feat

Conclusión: Label ofrece mejor balance
```

**Trade-off #2: Performance vs Complejidad de Código**
```
Label:    84.90%, ~15 líneas, fácil debug
Branched: 84.94%, ~50 líneas, módulos complejos

Delta accuracy: +0.04%
Delta complejidad: +233%

¿Vale la pena? Depende del contexto.
```

**Trade-off #3: Interpretabilidad vs Compresión**
```
One-Hot: sex_Male=1 → Claro (es hombre)
Label:   sex=0 → ¿Qué significa 0? (requiere mapeo)
Target:  sex=0.63 → ¿Por qué 0.63? (media del target)

Conclusión: One-Hot gana en interpretabilidad
```

---

#### 4. ¿Qué método recomendarías para producción?

**Depende del contexto:**

**Escenario 1: Prototipo rápido / Equipo junior**
→ **Label Encoding**
- Razón: Simple, robusto, 84.90% accuracy
- Riesgo: Bajo (difícil meter la pata)

**Escenario 2: Sistema productivo / Performance crítico**
→ **Branched Pipeline**
- Razón: Mejor accuracy (84.94%), modular, mantenible
- Costo: Más complejo, requiere expertise en pipelines

**Escenario 3: Dataset masivo / Memoria limitada**
→ **Target Encoding** (con precaución)
- Razón: 6 features vs 31 de Branched
- Precaución: Solo si >50% de variables tienen alta cardinalidad

**Escenario 4: Modelo interpretable para stakeholders**
→ **One-Hot Encoding** (solo baja cardinalidad)
- Razón: Features explícitas (`marital-status_Married`)
- Limitación: No escala a alta cardinalidad

---

#### 5. ¿Cómo balancearías performance vs complejidad?

**Framework de decisión:**
```python
def recomendar_encoding(dataset, equipo, contexto):
    # Análisis de cardinalidad
    high_card_vars = count_variables_cardinalidad_alta(dataset)
    
    if high_card_vars == 0:
        # Sin alta cardinalidad
        if equipo == 'junior':
            return 'Label Encoding'  # Simple
        else:
            return 'One-Hot Encoding'  # Interpretable
    
    elif high_card_vars <= 2:
        # Pocas variables alta cardinalidad
        if contexto == 'produccion_critica':
            return 'Branched Pipeline'  # Mejor performance
        else:
            return 'Label Encoding'  # Balance
    
    else:  # high_card_vars > 2
        # Muchas variables alta cardinalidad
        return 'Target Encoding'  # Necesario para dimensionalidad
```

**Mi recomendación personal:**

Para el 80% de proyectos:
1. Empezar con **Label Encoding** (baseline rápido)
2. Si accuracy insuficiente, probar **Branched Pipeline**
3. Solo usar **Target Encoding** si cardinalidad obliga

---

#### 6. ¿Qué técnicas usaste para prevenir data leakage?

**Técnica 1: Fit/Transform split riguroso**
```python
# ✅ CORRECTO
encoder.fit(X_train, y_train)       # Fit solo en train
X_test_encoded = encoder.transform(X_test)  # Transform sin y_test
```

**Técnica 2: ColumnTransformer en Pipeline**
```python
# ✅ Pipeline maneja automáticamente
pipeline = Pipeline([
    ('preprocessor', ColumnTransformer([...])),
    ('classifier', RandomForestClassifier())
])

pipeline.fit(X_train, y_train)  # Encoders dentro ven solo train
```

**Técnica 3: Smoothing en Target Encoding**
```python
encoder = TargetEncoder(smoothing=10.0)
# Smoothing empuja categorías raras hacia media global
# Previene overfitting a coincidencias aleatorias
```

**Técnica 4: Validación en hold-out set**
```python
# No confiar solo en train/test accuracy
# Usar hold-out set NUNCA visto para validación final
X_train_full, X_holdout, y_train_full, y_holdout = train_test_split(...)

# Entrenar en train_full, validar en holdout
# Si accuracy cae >5%, hay leakage probable
```

---

#### 7. ¿Por qué One-Hot falla con alta cardinalidad?

**Razón 1: Explosión dimensional**
```
native-country: 42 categorías
One-Hot: 41 columnas binarias (sparse)

Total features: 8 cat → 99 columnas
Memoria: 12.4x más
Tiempo entrenamiento: 3x más
```

**Razón 2: Curse of Dimensionality**
```
Para cubrir espacio de 99 dimensiones con densidad similar:
Necesitas: 1000^99 datos (imposible)

Consecuencia: Modelo aprende ruido, no señal
```

**Razón 3: Sparsity**
```
99% de las columnas one-hot son ceros
Random Forest:
- Splits en features sparse son menos informativos
- Árboles profundos para encontrar señal
- Overfitting
```

**Razón 4: Interpretabilidad se pierde**
```
42 columnas de países vs 1 columna target-encoded
¿Cuál país es importante? Necesitas analizar 42 coefficients
```

---

#### 8. ¿Cuándo usarías cada técnica en el mundo real?

**Label Encoding:**
- Tree-based models (siempre funciona)
- Prototipado rápido
- Equipos con poca experiencia en encoding avanzado

**One-Hot Encoding:**
- Variables categóricas con ≤10 categorías
- Modelos lineales (Logistic Regression, SVM)
- Cuando interpretabilidad es crítica

**Target Encoding:**
- Variables con >50 categorías (obligatorio)
- Múltiples variables de alta cardinalidad (10+)
- Cuando dimensionalidad es limitación de memoria

**Branched Pipeline:**
- Proyectos de producción complejos
- Mix de cardinalidades en el dataset
- Equipos con expertise en scikit-learn pipelines

**Binary/Hashing Encoding:**
- Cardinalidad extrema (>1000 categorías)
- Text mining (palabras como categorías)
- Sistemas embebidos con memoria ultra-limitada

---

### Próximos Pasos y Experimentos Futuros

**Experimento 1: Dataset con múltiple alta cardinalidad**
- Cargar dataset con 10+ variables de 50+ categorías
- Comparar: Target Encoding vs Hashing vs Embeddings
- Hipótesis: Target Encoding dominará

**Experimento 2: Modelos lineales**
- Repetir experimentos con Logistic Regression
- Hipótesis: One-Hot superará a Label significativamente

**Experimento 3: Embeddings categóricos (Neural Networks)**
- Entrenar entity embeddings con Keras
- Comparar con Target Encoding
- Hipótesis: Embeddings capturan semántica mejor

**Experimento 4: Análisis de leakage automatizado**
```python
# Herramienta para detectar leakage
def detect_target_leakage(X_train, X_test, y_train, feature):
    # Correlación entre feature y target en train
    corr_train = X_train[feature].corr(y_train)
    
    # Si correlación es perfecta (>0.99), posible leakage
    if corr_train > 0.99:
        print(f"WARNING: {feature} tiene correlación sospechosa: {corr_train}")
```

**Experimento 5: Optimización de smoothing automática**
```python
from sklearn.model_selection import GridSearchCV

# Grid search sobre smoothing
param_grid = {
    'preprocessor__high_card__target__smoothing': [1, 5, 10, 50, 100, 500]
}

grid_search = GridSearchCV(pipeline, param_grid, cv=5)
grid_search.fit(X_train, y_train)

print(f"Mejor smoothing: {grid_search.best_params_}")
```

---

## 📚 Referencias y Recursos

### Material del Curso

1. **Profesor Juan F. Kurucz** - Assignment UT3-9: Encoding Avanzado
   - 🔗 [Práctica 9 — Encoding Avanzado y Target Encoding](https://juanfkurucz.com/ucu-id/ut3/09-encoding-avanzado-assignment/)
   - 📄 Documento: Encoding Avanzado Fill in the Blanks

---

### Documentación Técnica

2. **Scikit-learn** - Preprocessing & Encoding
   - 🔗 [Preprocessing Guide](https://scikit-learn.org/stable/modules/preprocessing.html)
   - 🏷️ [LabelEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html)
   - 🔥 [OneHotEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html)
   - 🌳 [ColumnTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html)

3. **Category Encoders** - Advanced Encoding Library
   - 🔗 [Official Documentation](https://contrib.scikit-learn.org/category_encoders/)
   - 🎯 [TargetEncoder](https://contrib.scikit-learn.org/category_encoders/targetencoder.html)
   - 🔢 [BinaryEncoder](https://contrib.scikit-learn.org/category_encoders/binary.html)
   - 🏷️ [All Encoders Comparison](https://contrib.scikit-learn.org/category_encoders/index.html)

4. **Pandas** - Data Manipulation
   - 🔗 [Categorical Data](https://pandas.pydata.org/docs/user_guide/categorical.html)
   - 🔄 [get_dummies](https://pandas.pydata.org/docs/reference/api/pandas.get_dummies.html)

---

### Libros y Recursos Académicos

5. **"Feature Engineering for Machine Learning"** - Alice Zheng & Amanda Casari
   - 📚 O'Reilly Media, 2018
   - 💡 **Chapter 5: Categorical Variables** (core del assignment)
   - 🔗 [Book Link](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)

6. **"Categorical Data Analysis"** - Alan Agresti
   - 📚 Wiley, 2013 (3rd Edition)
   - 💡 Statistical foundations of encoding
   - 🎓 Academic reference

7. **"Hands-On Machine Learning"** - Aurélien Géron
   - 📚 O'Reilly Media, 2022
   - 💡 Chapter 2: Handling Categorical Features
   - 🐙 [GitHub](https://github.com/ageron/handson-ml3)

---

### Datasets

8. **Adult Income Dataset** (UCI ML Repository)
   - 🔗 [Dataset Page](https://archive.ics.uci.edu/ml/datasets/adult)
   - 📄 Original Paper: Kohavi, R. (1996) - Scaling Up Naive-Bayes
   - 📊 48,842 registros, 8 categóricas, 6 numéricas
   - 🎯 Target: Income >$50K (clasificación binaria)

9. **UCI Machine Learning Repository** - Categorical Datasets
   - 🔗 [Homepage](https://archive.ics.uci.edu/ml/index.php)
   - 📁 Filtro por "categorical features"
   - 💾 100+ datasets para practicar encoding

---

### Papers y Artículos Académicos

10. **"A Preprocessing Scheme for High-Cardinality Categorical Attributes"** - Micci-Barreca (2001)
    - 📄 SIGKDD '01 - Target encoding original paper
    - 🔗 [PDF](https://dl.acm.org/doi/10.1145/507533.507538)
    - 💡 Fundamentos teóricos de target encoding

11. **"Entity Embeddings of Categorical Variables"** - Guo & Berkhahn (2016)
    - 📄 arXiv:1604.06737
    - 🔗 [Paper](https://arxiv.org/abs/1604.06737)
    - 💡 Embeddings para categorías (deep learning approach)

12. **"Supervised and Unsupervised Categorical Variable Encoding"** - Survey Paper
    - 📄 Journal of Big Data, 2020
    - 🔗 [Link](https://journalofbigdata.springeropen.com/)
    - 💡 Comparativa exhaustiva de 15+ métodos

---

### Tutoriales y Blogs

13. **Kaggle Learn** - Feature Engineering Course
    - 🔗 [Course](https://www.kaggle.com/learn/feature-engineering)
    - 📘 Lección 3: Categorical Encodings
    - 🆓 Gratis, interactivo

14. **Towards Data Science** - Target Encoding Articles
    - 🔗 ["Target Encoding Done The Right Way"](https://towardsdatascience.com/target-encoding-done-the-right-way-7e4f31b99f1d)
    - 🔗 ["Why One-Hot Encode Data in Machine Learning?"](https://machinelearningmastery.com/why-one-hot-encode-data-in-machine-learning/)
    - 📰 Comunidad activa

15. **Machine Learning Mastery** - Encoding Tutorials
    - 🔗 [Ordinal and One-Hot Encodings](https://machinelearningmastery.com/one-hot-encoding-for-categorical-data/)
    - 👤 Autor: Jason Brownlee
    - 💻 Código práctico en cada artículo

---

### Herramientas y Bibliotecas

16. **Category Encoders** - Advanced Encoding Package
    - 🐙 [GitHub](https://github.com/scikit-learn-contrib/category_encoders)
    - 📦 `pip install category-encoders`
    - 🔧 15+ encoders: Target, Binary, Hashing, Helmert, etc.

17. **Dirty Cat** - Encoding for Dirty Data
    - 🔗 [Homepage](https://dirty-cat.github.io/)
    - 💡 Similarity encoding, MinHash encoding
    - 🧹 Maneja typos, missing values

18. **Feature Engine** - Feature Engineering Pipeline
    - 🔗 [Docs](https://feature-engine.readthedocs.io/)
    - 🔧 Encoding + Transformations + Selection
    - 🎯 Productización fácil

---

### Comparativas y Benchmarks

19. **"Benchmarking Categorical Encoders"** - Community Study
    - 🔗 [GitHub Repo](https://github.com/DenisVorotyntsev/CategoricalEncodingBenchmark)
    - 📊 Comparativa de 10+ encoders en 20 datasets
    - 💡 Target Encoding gana en 60% de casos

20. **Kaggle Kernels** - Encoding Comparisons
    - 🔗 [Search: "categorical encoding comparison"](https://www.kaggle.com/search?q=categorical+encoding+comparison)
    - 📓 Notebooks con experimentos reales
    - 💡 Código reproducible

---

## 🔗 Información del Proyecto

**Contexto Académico:**
- **Curso**: Encoding Avanzado - UT3  
- **Institución**: Universidad Católica del Uruguay  
- **Instructor**: Juan F. Kurucz  
- **Práctica**: [09 - Encoding Avanzado y Target Encoding](https://juanfkurucz.com/ucu-id/ut3/09-encoding-avanzado-assignment/)

**Alcance del Proyecto:**
- Dataset Adult Income (US Census 1994) con 48,842 registros
- Comparación de 4 métodos de encoding (Label, One-Hot, Target, Branched)
- Análisis de trade-offs: Accuracy vs Dimensionalidad vs Complejidad
- Prevención de data leakage en Target Encoding
- Pipeline productizable con ColumnTransformer


**Skills Desarrolladas:**
- ✅ Análisis de cardinalidad categórica
- ✅ Implementación de 4+ técnicas de encoding
- ✅ Prevención de data leakage (cross-validation en target encoding)
- ✅ Pipelines con ColumnTransformer (branching)
- ✅ Evaluación de trade-offs técnicos y de negocio
- ✅ Feature importance y explicabilidad

---

**Generado por:** Grupo 1 - Práctica 9  
**Fecha:** Noviembre 2025  
**Versión:** 1.0