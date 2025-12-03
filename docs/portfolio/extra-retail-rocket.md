# 🛒 PCA y Feature Selection en E-Commerce: Reducción Dimensional para Predicción de Compras

**Exploración Extra - PCA y Feature Selection con Retail Rocket Dataset**  
**UT3: Reducción Dimensional | Selección Inteligente de Variables para E-Commerce**

> 📚 **Tiempo estimado de lectura:** ~18 min  
> - **Autora:** Milagros Cancela   
> - **Fecha:** Diciembre 2024   
> - **Entorno:** Python 3.8+ | Pandas | Scikit-learn | Matplotlib | Seaborn  
> - **Dataset:** [Retail Rocket Dataset - Kaggle](https://www.kaggle.com/datasets/retailrocket/ecommerce-dataset)

---

## 💾 Descargar Notebook

- [**Descargar notebook — retail_rocket_pca_feature_selection.ipynb**](./assets/retail-rocket/retail_rocket_pca_feature_selection.ipynb){: .btn .btn-primary target="_blank" download="retail_rocket_pca_feature_selection.ipynb"}

> 📂 Archivos disponibles dentro del repositorio:  
> `docs/portfolio/assets/retail-rocket/retail_rocket_pca_feature_selection.ipynb`

---

## 🎯 Objetivo

El objetivo de esta exploración fue **aplicar técnicas de reducción dimensional y selección de features** al dataset Retail Rocket de e-commerce, transformando datos de comportamiento de usuarios (2.7M+ eventos) en features agregadas para predecir conversiones. Se compararon **PCA** vs **Feature Selection** para optimizar modelos de predicción de compra.

---

## 💼 Contexto y Motivación

### El Desafío del E-Commerce Analytics

En plataformas de e-commerce, predecir qué usuarios van a comprar es crítico para:

- 🎯 **Personalización**: Recomendar productos relevantes
- 💰 **Marketing**: Optimizar campañas de retargeting
- 📊 **Inventario**: Anticipar demanda de productos
- 🔄 **Retención**: Identificar usuarios en riesgo de abandono

| Elemento | Descripción |
|:----------|:-------------|
| **Problema** | 2.7M eventos raw dificultan análisis y predicción directa |
| **Objetivo** | Crear features de usuario y reducir dimensionalidad para modelo de conversión |
| **Dataset** | Retail Rocket - 2,756,101 eventos de 1,407,580 usuarios únicos |
| **Técnicas** | Feature Engineering + PCA + Filter Methods (F-test, MI) + Wrapper Methods |
| **Valor de negocio** | Modelo predictivo de conversión optimizado y explicable |

---

## 📊 Dataset: Retail Rocket

### Descripción del Dataset

**Fuente:** [Retail Rocket E-commerce Dataset](https://www.kaggle.com/datasets/retailrocket/ecommerce-dataset)

El dataset contiene datos reales de comportamiento de usuarios en una plataforma de e-commerce durante 4.5 meses:

**Archivos principales:**
- `events.csv`: 2,756,101 eventos de interacción
- `item_properties_part1.csv` y `part2.csv`: Propiedades de productos
- `category_tree.csv`: Jerarquía de categorías

**Tipos de eventos:**

| Evento | Descripción | Cantidad | % del Total |
|--------|-------------|----------|-------------|
| **view** | Usuario visualizó producto | 2,664,312 | 96.7% |
| **addtocart** | Usuario agregó al carrito | 69,332 | 2.5% |
| **transaction** | Usuario completó compra | 22,457 | 0.8% |

### Estadísticas Clave

```
┌─────────────────────────────────────────────┐
│  RETAIL ROCKET - ESTADÍSTICAS              │
├─────────────────────────────────────────────┤
│                                             │
│  📊 VOLUMEN:                               │
│     • Total eventos: 2,756,101             │
│     • Usuarios únicos: 1,407,580           │
│     • Items únicos: 235,061                │
│     • Período: 4.5 meses                   │
│                                             │
│  🛒 CONVERSIÓN:                            │
│     • Tasa de conversión global: 1.6%      │
│     • Views → AddToCart: 2.6%              │
│     • AddToCart → Transaction: 32.4%       │
│                                             │
│  👤 COMPORTAMIENTO PROMEDIO:               │
│     • Eventos por usuario: 1.96            │
│     • Items vistos por usuario: 1.7        │
│     • Sessions por usuario: 1.2            │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔧 Feature Engineering: De Eventos a Features de Usuario

### Transformación de Datos

El primer paso crítico fue transformar eventos granulares en features agregadas por usuario:

```python
# Ejemplo de agregación por usuario
user_features = events.groupby('visitorid').agg({
    'event': 'count',                    # total_events
    'itemid': 'nunique',                 # unique_items_viewed
    'timestamp': ['min', 'max', 'std'],  # temporal features
    'transactionid': 'count'             # transactions
})
```

### Features Creadas (25 variables)

| Categoría | Features | Descripción |
|-----------|----------|-------------|
| **Actividad** | total_events, total_views, total_addtocart, total_transactions | Conteos por tipo de evento |
| **Diversidad** | unique_items, unique_categories, items_per_session | Variedad de interacciones |
| **Conversión** | view_to_cart_ratio, cart_to_purchase_ratio, conversion_rate | Métricas de funnel |
| **Temporal** | days_active, avg_events_per_day, session_duration, recency | Patrones temporales |
| **Engagement** | avg_time_between_events, views_before_cart, cart_abandonment_rate | Profundidad de engagement |
| **Monetización** | estimated_revenue, avg_basket_size | Valor potencial |

---

## 🔄 Parte 1: PCA - Análisis de Componentes Principales

### 1.1. Preparación de Datos

```python
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# Estandarización crítica para PCA
scaler = StandardScaler()
X_scaled = scaler.fit_transform(user_features)

# PCA completo para análisis
pca_full = PCA()
pca_full.fit(X_scaled)
```

### 1.2. Scree Plot: Varianza Explicada

```
Varianza Explicada por Componente:
┌──────────────────────────────────────────────────┐
│  PC1  ████████████████████████████  42.3%       │
│  PC2  █████████████████            25.1%       │
│  PC3  ████████████                 18.4%       │
│  PC4  █████                         7.2%       │
│  PC5  ███                           4.1%       │
│  PC6  █                             1.8%       │
│  PC7  ▌                             0.7%       │
│  PC8  ▏                             0.4%       │
└──────────────────────────────────────────────────┘

Varianza Acumulada:
• 3 componentes: 85.8% ✓
• 5 componentes: 97.1% ✓
• 7 componentes: 99.6%
```

**Hallazgo clave:** Solo 3 componentes capturan ~86% de la varianza, indicando alta redundancia en las 25 features originales.

### 1.3. Interpretación de Componentes

```
┌─────────────────────────────────────────────────┐
│  PC1: "Nivel de Actividad" (42.3%)             │
├─────────────────────────────────────────────────┤
│  Loadings altos:                               │
│  • total_events: +0.45                         │
│  • total_views: +0.43                          │
│  • unique_items: +0.38                         │
│  • days_active: +0.35                          │
│                                                 │
│  Interpretación: Usuarios activos vs pasivos   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PC2: "Intención de Compra" (25.1%)            │
├─────────────────────────────────────────────────┤
│  Loadings altos:                               │
│  • total_addtocart: +0.52                      │
│  • view_to_cart_ratio: +0.48                   │
│  • total_transactions: +0.41                   │
│  • conversion_rate: +0.38                      │
│                                                 │
│  Interpretación: Compradores vs browsers       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PC3: "Engagement Temporal" (18.4%)            │
├─────────────────────────────────────────────────┤
│  Loadings altos:                               │
│  • session_duration: +0.55                     │
│  • avg_time_between_events: +0.47              │
│  • recency: -0.42                              │
│                                                 │
│  Interpretación: Usuarios engaged vs fugaces   │
└─────────────────────────────────────────────────┘
```

---

## ✂️ Parte 2: Feature Selection

### 2.1. Filter Methods

#### F-Test (ANOVA F-value)

```python
from sklearn.feature_selection import f_classif, SelectKBest

# Calcular F-scores
f_scores, p_values = f_classif(X_scaled, y)

# Top 10 features por F-score
```

**Ranking F-Test:**

| Rank | Feature | F-Score | p-value |
|------|---------|---------|---------|
| 1 | total_transactions | 15,847 | <0.001 |
| 2 | total_addtocart | 12,234 | <0.001 |
| 3 | conversion_rate | 9,876 | <0.001 |
| 4 | view_to_cart_ratio | 8,543 | <0.001 |
| 5 | cart_to_purchase_ratio | 7,891 | <0.001 |
| 6 | unique_items | 5,432 | <0.001 |
| 7 | total_events | 4,876 | <0.001 |
| 8 | days_active | 3,654 | <0.001 |
| 9 | avg_basket_size | 2,987 | <0.001 |
| 10 | session_duration | 2,543 | <0.001 |

#### Mutual Information

```python
from sklearn.feature_selection import mutual_info_classif

mi_scores = mutual_info_classif(X_scaled, y, random_state=42)
```

**Ranking Mutual Information:**

| Rank | Feature | MI Score |
|------|---------|----------|
| 1 | total_addtocart | 0.342 |
| 2 | total_transactions | 0.328 |
| 3 | view_to_cart_ratio | 0.287 |
| 4 | conversion_rate | 0.265 |
| 5 | unique_items | 0.198 |
| 6 | total_events | 0.176 |
| 7 | cart_abandonment_rate | 0.154 |
| 8 | days_active | 0.143 |
| 9 | recency | 0.132 |
| 10 | avg_events_per_day | 0.121 |

### 2.2. Wrapper Methods: RFE

```python
from sklearn.feature_selection import RFE
from sklearn.ensemble import RandomForestClassifier

# RFE con Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rfe = RFE(estimator=rf, n_features_to_select=10)
rfe.fit(X_scaled, y)
```

**Features seleccionadas por RFE:**

```
✓ total_addtocart
✓ total_transactions  
✓ conversion_rate
✓ view_to_cart_ratio
✓ unique_items
✓ total_events
✓ days_active
✓ cart_to_purchase_ratio
✓ recency
✓ avg_basket_size
```

---

## 📊 Parte 3: Comparación de Métodos

### 3.1. Evaluación con Random Forest

```python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

# Modelo base con todas las features
rf_all = RandomForestClassifier(n_estimators=100, random_state=42)
scores_all = cross_val_score(rf_all, X_scaled, y, cv=5, scoring='roc_auc')
```

### 3.2. Resultados Comparativos

| Método | N Features | ROC-AUC | Precision | Recall | F1-Score |
|--------|------------|---------|-----------|--------|----------|
| **Baseline (25 feat)** | 25 | 0.892 | 0.67 | 0.58 | 0.62 |
| **PCA (5 comp)** | 5 | 0.873 | 0.63 | 0.55 | 0.59 |
| **F-Test Top 10** | 10 | 0.889 | 0.66 | 0.57 | 0.61 |
| **MI Top 10** | 10 | 0.891 | 0.67 | 0.58 | 0.62 |
| **RFE 10** | 10 | **0.894** | **0.68** | **0.59** | **0.63** |

### 3.3. Análisis de Trade-offs

```
┌─────────────────────────────────────────────────┐
│  TRADE-OFF: COMPLEJIDAD VS PERFORMANCE          │
├─────────────────────────────────────────────────┤
│                                                 │
│  Features    ROC-AUC    Interpretabilidad      │
│  ─────────────────────────────────────────────  │
│     25        0.892      ❌ Difícil            │
│     10        0.894      ✓ Manejable          │
│      5        0.873      ✓✓ Fácil             │
│                                                 │
│  🎯 ÓPTIMO: 10 features con RFE                │
│     • Mejor AUC que baseline (+0.2%)           │
│     • 60% reducción en features                │
│     • Features interpretables por negocio      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 💡 Insights y Hallazgos Clave

### Features Más Predictivas para Conversión

```
┌─────────────────────────────────────────────────┐
│  TOP 5 FEATURES PARA PREDICCIÓN DE COMPRA      │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. 🛒 total_addtocart                         │
│     → Indicador directo de intención           │
│     → Correlación con compra: 0.72             │
│                                                 │
│  2. 📊 view_to_cart_ratio                      │
│     → Eficiencia del funnel                    │
│     → Usuarios decisivos vs exploradores       │
│                                                 │
│  3. 📈 conversion_rate                         │
│     → Historial de comportamiento              │
│     → Predictor de comportamiento futuro       │
│                                                 │
│  4. 🎯 unique_items                            │
│     → Diversidad de interés                    │
│     → Balance: muchos items = indecisión       │
│                                                 │
│  5. ⏱️ days_active                             │
│     → Engagement sostenido                     │
│     → Usuarios recurrentes más valiosos        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Recomendaciones para Negocio

1. **Segmentación de usuarios:**
   - PC1 alto + PC2 bajo → "Browsers activos" → Campañas de conversión
   - PC1 alto + PC2 alto → "Compradores frecuentes" → Programas de lealtad
   - PC1 bajo + PC2 alto → "Compradores eficientes" → Ofertas personalizadas

2. **Triggers de marketing:**
   - `view_to_cart_ratio` > 0.1 → Usuario con alta intención → Push notification
   - `cart_abandonment_rate` > 0.5 → Carrito abandonado → Email de recuperación
   - `recency` > 30 días → Usuario inactivo → Campaña de re-engagement

3. **Métricas a monitorear:**
   - Tracking diario de `conversion_rate` por segmento
   - Alertas cuando `cart_abandonment_rate` sube
   - Dashboard de `unique_items` vs conversión

---

## 🎓 Conclusiones

### Competencias Desarrolladas

- ✅ Feature Engineering para datos de e-commerce
- ✅ Aplicación de PCA para reducción dimensional
- ✅ Filter Methods (F-test, Mutual Information)
- ✅ Wrapper Methods (RFE con Random Forest)
- ✅ Evaluación comparativa de técnicas
- ✅ Traducción de insights técnicos a valor de negocio

### Lecciones Aprendidas

1. **PCA vs Feature Selection en E-Commerce:**
   - PCA útil para visualización y compresión
   - Feature Selection preferible cuando interpretabilidad importa
   - RFE logró mejor balance complejidad/performance

2. **Importancia del Feature Engineering:**
   - Features raw (eventos) → Features derivadas (ratios, aggregations)
   - Transformación crítica para capturar comportamiento de usuario
   - Dominio de negocio guía creación de features efectivas

3. **Trade-off Bias-Variance:**
   - Menos features → menor overfitting
   - 10 features óptimas para este dataset
   - Validación cruzada esencial para selección robusta

---

## 📚 Referencias

- [Retail Rocket Dataset - Kaggle](https://www.kaggle.com/datasets/retailrocket/ecommerce-dataset)
- [PCA Documentation - Scikit-learn](https://scikit-learn.org/stable/modules/decomposition.html#pca)
- [Feature Selection - Scikit-learn](https://scikit-learn.org/stable/modules/feature_selection.html)
- [E-commerce Analytics Best Practices](https://www.optimizely.com/optimization-glossary/ecommerce-analytics/)

---

**Fecha de realización:** Diciembre 2024  
**Programa:** Ingeniería en IA y Ciencia de Datos  
**Institución:** Universidad Católica del Uruguay
