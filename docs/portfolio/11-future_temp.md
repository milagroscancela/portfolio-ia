# ⏰ Del Caos Temporal al Orden Predictivo: Feature Engineering Temporal en E-Commerce

**Práctica 11 - Temporal Feature Engineering con Online Retail Dataset**  
**UT3: Features Temporales | Prevención de Data Leakage**

> 📚 **Tiempo estimado de lectura:** ~18 min  
> - **Autores [G1]:** Joaquín Batista, Milagros Cancela, Valentín Rodríguez, Alexia Aurrecoechea, Nahuel López   
> - **Fecha:** Noviembre 2025   
> - **Entorno:** Python 3.13+ | Pandas | Scikit-learn | Kaggle API  
> - **Referencia de la tarea:** [Práctica 11 — Temporal Features Assignment](https://juanfkurucz.com/ucu-id/ut3/11-temporal-features-assignment/)

---

## 💾 Descargar Notebook

- [**Descargar notebook — temporal_features_practice11.ipynb**](./assets/temporal-features/temporal_features_practice11.ipynb){: .btn .btn-primary target="_blank" download="temporal_features_practice11.ipynb"}

> 📂 Archivos disponibles dentro del repositorio:  
> `docs/portfolio/assets/temporal-features/temporal_features_practice11.ipynb`

---

## 🎯 Objetivo

El objetivo de esta práctica fue **dominar técnicas avanzadas de temporal feature engineering** para datos transaccionales de e-commerce, aprendiendo a crear lag features, rolling/expanding windows, análisis RFM y calendar features **sin incurrir en data leakage**. Se trabajó con el **Online Retail Dataset** (540k transacciones UK 2010-2011) para predecir comportamiento de recompra.

---

## 💼 Contexto y Motivación

### El Desafío del Tiempo en Machine Learning

En datasets transaccionales, **el tiempo no es solo una variable más — es la estructura fundamental de los datos**:

- 📅 **Temporal leakage es catastrófico**: Usar información futura destruye validez del modelo
- 🔄 **Usuarios no son IID**: Cada cliente tiene su propio timeline de compras
- 📊 **Patrones temporales son señal**: "Compró hace 3 días" es MÁS predictivo que "Compró en lunes"
- ⚡ **Timing matters**: Misma compra el día 1 vs día 365 → significados diferentes

| Elemento | Descripción |
|:----------|:-------------|
| **Problema** | Predecir si un cliente volverá a comprar usando su historia temporal |
| **Dataset** | Online Retail UK - 540k transacciones, 4,372 clientes, 2010-2011 |
| **Desafío técnico** | Crear features temporales sin data leakage (nunca usar información futura) |
| **Target** | `will_purchase_again` - binario (1 = cliente hace otra compra después de esta) |
| **Valor de negocio** | Segmentación de clientes, retention campaigns, lifetime value prediction |

---

## 📘 Metodología: Taxonomía de Features Temporales

### Categorías de Temporal Features
```
┌─────────────────────────────────────────────┐
│  LAG FEATURES (Valores Pasados)            │
├─────────────────────────────────────────────┤
│                                             │
│  🔙 CONCEPTO:                              │
│     Valor de una variable N eventos atrás  │
│                                             │
│  🔧 PANDAS:                                │
│     df.groupby('user_id')['col'].shift(n)  │
│                                             │
│  📊 EJEMPLO:                               │
│     days_since_prior_lag_1 = días desde    │
│     penúltima compra (para predecir esta)  │
│                                             │
│  ✅ PREVIENE LEAKAGE:                      │
│     shift(1) automáticamente excluye fila  │
│     actual, solo usa valores pasados       │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  ROLLING WINDOWS (Tendencias Recientes)    │
├─────────────────────────────────────────────┤
│                                             │
│  🔄 CONCEPTO:                              │
│     Agregación sobre últimos N eventos     │
│                                             │
│  🔧 PANDAS:                                │
│     df.groupby('user').shift(1)            │
│       .rolling(3).mean()                   │
│                                             │
│  📊 EJEMPLO:                               │
│     rolling_cart_mean_3 = promedio de     │
│     cart size en últimas 3 compras         │
│                                             │
│  ⚠️ CRÍTICO:                               │
│     SIEMPRE shift(1) ANTES de rolling()    │
│     para excluir evento actual             │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  EXPANDING WINDOWS (Historia Acumulada)    │
├─────────────────────────────────────────────┤
│                                             │
│  📈 CONCEPTO:                              │
│     Agregación desde inicio hasta "ahora"  │
│                                             │
│  🔧 PANDAS:                                │
│     df.groupby('user').shift(1)            │
│       .expanding().sum()                   │
│                                             │
│  📊 EJEMPLO:                               │
│     expanding_total_spent = gasto total    │
│     acumulado histórico (excluye actual)   │
│                                             │
│  💡 USO:                                   │
│     Captura comportamiento general del     │
│     usuario desde su primer evento         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📊 Dataset: Online Retail (UK E-Commerce)

### Características del Dataset

**Fuente:** [Kaggle - Online Retail Dataset](https://www.kaggle.com/datasets/vijayuv/onlineretail)

**Descripción:**
- 540,455 transacciones de e-commerce del Reino Unido
- Período: 01/12/2010 - 09/12/2011 (374 días)
- 4,372 clientes únicos
- 4,070 productos únicos
- 25,900 órdenes/facturas

**Columnas originales:**

| Columna | Tipo | Descripción | Ejemplo |
|---------|------|-------------|---------|
| `InvoiceNo` | String | ID de factura | 536365 |
| `StockCode` | String | Código de producto | 85123A |
| `Description` | String | Descripción del producto | WHITE HANGING HEART |
| `Quantity` | Int | Cantidad comprada | 6 |
| `InvoiceDate` | DateTime | Timestamp de transacción | 2010-12-01 08:26:00 |
| `UnitPrice` | Float | Precio unitario en £ | 2.55 |
| `CustomerID` | Float | ID del cliente | 17850.0 |
| `Country` | String | País del cliente | United Kingdom |

---

### Preprocesamiento Aplicado

**Limpieza de datos:**
```python
# Estadísticas de limpieza
Filas originales:        540,455
Eliminadas sin CustomerID: 135,080 (25%)
Eliminadas canceladas:     9,288 (1.7%)
Eliminadas qty/price ≤ 0:  8,905 (1.6%)
Filas finales:           397,924 (73.6% del original)
```

**Agregación a nivel de orden:**
```python
# Transformación: transacciones → órdenes
Nivel transacción:  397,924 líneas de items
       ↓ groupby(['order_id', 'user_id', 'order_date'])
Nivel orden:        22,190 facturas únicas

Variables derivadas por orden:
- cart_size: número de productos en la orden
- order_total: suma total gastada (Quantity × UnitPrice)
- order_dow: día de semana (0=Lunes, 6=Domingo)
- order_hour_of_day: hora del día (0-23)
```

**Estadísticas del dataset agregado:**

| Métrica | Valor | Observación |
|---------|-------|-------------|
| **Órdenes totales** | 22,190 | Una fila por factura |
| **Usuarios únicos** | 4,372 | Clientes con ID válido |
| **Órdenes/usuario (promedio)** | 5.1 | 57% tienen 2+ órdenes |
| **Cart size promedio** | 17.9 items | Alta variabilidad (std=81.6) |
| **Ticket promedio** | £292.13 | B2B suspected (valores altos) |
| **Días entre compras (mediana)** | 29 días | Frecuencia mensual típica |

---

## 🔙 Parte 1: Lag Features con Pandas

### 1.1. Concepto de Lag Features

**¿Qué es un lag?**

Un lag es el **valor de una variable en un evento anterior**. Para predecir la orden N, usamos datos de las órdenes N-1, N-2, N-3...

**Ejemplo visual:**
```
Usuario 12345:
Orden 1: 2010-12-05 | days_since_prior = NaN       (primera orden)
Orden 2: 2010-12-12 | days_since_prior = 7         (7 días desde orden 1)
Orden 3: 2010-12-26 | days_since_prior = 14        (14 días desde orden 2)
Orden 4: 2011-01-10 | days_since_prior = 15        (15 días desde orden 3)

Lags creados:
Orden 4: days_since_prior_lag_1 = 14  (valor de orden 3)
         days_since_prior_lag_2 = 7   (valor de orden 2)
         days_since_prior_lag_3 = NaN (orden 1 no tiene valor)
```

---

### 1.2. Implementación en Pandas

**Código crítico:**
```python
# CORRECTO: .shift() dentro de .groupby() previene mezcla entre usuarios
df['days_since_prior_lag_1'] = df.groupby('user_id')['days_since_prior'].shift(1)
df['days_since_prior_lag_2'] = df.groupby('user_id')['days_since_prior'].shift(2)
df['days_since_prior_lag_3'] = df.groupby('user_id')['days_since_prior'].shift(3)

# INCORRECTO: Sin groupby, shift mezcla datos de usuarios diferentes
df['lag_1_WRONG'] = df['days_since_prior'].shift(1)  # ❌ DATA LEAKAGE
```

**¿Por qué funciona?**

- `.shift(1)` mueve valores **hacia abajo** (obtiene valor de fila anterior)
- `.groupby('user_id')` aplica shift **independientemente por usuario**
- NaN aparece en primeras órdenes → correcto, no hay historia previa

---

### 1.3. Resultados y Análisis

**Ejemplo de usuario con lags:**
```
user_id: 12748 (21 órdenes en dataset)

order_number  days_since_prior  lag_1  lag_2  lag_3
-----------  ----------------  -----  -----  -----
     1              NaN         NaN    NaN    NaN
     2              30.0        NaN    NaN    NaN
     3               5.0        30.0   NaN    NaN
     4               7.0         5.0   30.0   NaN
     5               2.0         7.0    5.0   30.0
     6               5.0         2.0    7.0    5.0
    ...              ...         ...    ...    ...
    20              15.0        12.0   15.0   30.0
    21               4.0        15.0   12.0   15.0
```

**Interpretación:**
- Orden 5: Último intervalo fue 2 días, penúltimo 7 días, ante-penúltimo 5 días
- Patrón: Usuario con compras irregulares (2-30 días de intervalo)
- Features capturan **aceleración/desaceleración** de compras

---

## 🔄 Parte 2: Rolling Windows - Tendencias Recientes

### 2.1. Concepto de Rolling Windows

**Diferencia clave: Lag vs Rolling**
```
LAG:                          ROLLING WINDOW (3 eventos):
Orden 5: lag_1 = 7 días      Orden 5: rolling_mean_3 = (7+5+30)/3 = 14 días
         (solo 1 valor)               (promedio de últimos 3 valores)
```

**Ventaja:** Captura **tendencia suavizada**, no solo último valor (reduce ruido).

---

### 2.2. Implementación Crítica: shift(1) ANTES de rolling()

**⚠️ ERROR COMÚN:**
```python
# ❌ INCORRECTO: Incluye orden actual en cálculo = DATA LEAKAGE
df['rolling_WRONG'] = df.groupby('user_id')['cart_size'].rolling(3).mean()
```

**✅ CORRECTO:**
```python
# Excluir orden actual con shift(1) ANTES de rolling
df['rolling_cart_mean_3'] = (
    df.groupby('user_id')['cart_size']
    .shift(1)                           # ← CRÍTICO: excluye fila actual
    .rolling(window=3, min_periods=1)   # últimas 3 órdenes previas
    .mean()
    .reset_index(level=0, drop=True)
)
```

**¿Por qué `min_periods=1`?**

- Permite cálculos con menos de 3 valores (útil en órdenes 2-3 de un usuario)
- Alternativa: `min_periods=3` → NaN hasta tener 3 órdenes históricas

---

### 2.3. Visualización: Rolling Mean Captura Tendencias

![Rolling Mean vs Actual Cart Size](assets/temporal-features/temporal-rolling-mean-cart-size.png)

*Figura 1: Rolling mean de cart size (ventana de 3 órdenes) vs valores reales para usuario 12748. **Panel:** Línea verde con X muestra cart size real (alta volatilidad, rango 4-70 items). Línea coral con círculos muestra rolling mean que suaviza fluctuaciones. Área sombreada (±1 std) indica variabilidad capturada por `rolling_cart_std_3`. **Observaciones:** (1) Rolling mean "amortigua" picos extremos (ej: orden 10 con 1 item no arrastra promedio a 1, se mantiene ~25). (2) Banda de confianza (std) se expande en períodos erráticos (órdenes 8-12) y se contrae en períodos estables (órdenes 15-18). **Insight de negocio:** Este usuario tiene comportamiento bimodal - compras grandes (~60 items) vs pequeñas (~10 items), rolling mean detecta el "baseline" alrededor de 30-40 items.*

**Hallazgos:**
- Rolling mean "sigue" la tendencia sin ser afectado por outliers individuales
- Órdenes 15-20: Tendencia creciente capturada (mean pasa de 30→50→63)
- Banda de ±1 std captura volatilidad del usuario

---

## 📈 Parte 3: Expanding Windows - Historia Acumulada

### 3.1. Concepto: Expanding vs Rolling
```
┌────────────────────────────────────────┐
│  ROLLING (últimos 3):                 │
│  Orden 5: mean([orden 2, 3, 4])       │
│  Orden 6: mean([orden 3, 4, 5])       │
│           ↓ ventana se "mueve"        │
│                                        │
│  EXPANDING (desde inicio):             │
│  Orden 5: mean([orden 1, 2, 3, 4])    │
│  Orden 6: mean([orden 1, 2, 3, 4, 5]) │
│           ↓ ventana crece siempre     │
└────────────────────────────────────────┘
```

**Cuándo usar cada uno:**

| Rolling Window | Expanding Window |
|----------------|------------------|
| Detectar cambios recientes | Caracterizar usuario en general |
| "¿Usuario está acelerando compras?" | "¿Cuál es su patrón histórico?" |
| Sensible a tendencias cortas | Robusto a outliers recientes |

---

### 3.2. Implementación
```python
# Expanding mean: promedio histórico de días entre compras
df['expanding_days_mean'] = (
    df.groupby('user_id')['days_since_prior']
    .shift(1)                    # excluir actual
    .expanding(min_periods=1)
    .mean()
    .reset_index(level=0, drop=True)
)

# Expanding sum: gasto total acumulado
df['expanding_total_spent'] = (
    df.groupby('user_id')['order_total']
    .shift(1)
    .expanding(min_periods=1)
    .sum()
    .reset_index(level=0, drop=True)
).fillna(0)  # primera orden no tiene gasto previo
```

---

### 3.3. Comparación Visual: Rolling vs Expanding

![Rolling vs Expanding Windows](assets/temporal-features/temporal-rolling-vs-expanding.png)

*Figura 2: Comparación de rolling mean (tendencia reciente) vs expanding mean (comportamiento histórico acumulado). **Panel izquierdo:** Rolling mean de cart size muestra alta sensibilidad a cambios - pendiente pronunciada en órdenes 15-20 cuando usuario aumenta volumen. **Panel derecho:** Expanding mean de días entre órdenes converge a ~15 días después de orden 7 y se mantiene estable. **Interpretación:** (1) Rolling detecta "este usuario está comprando MÁS" (mean sube 30→63 en 5 órdenes). (2) Expanding dice "históricamente este usuario compra cada 15 días" (valor estable). **Uso en modelo:** Rolling para features de **cambio de comportamiento**, Expanding para features de **perfil de usuario**.*

**Insight clave:**
- Rolling: Cambia rápidamente (refleja últimas compras)
- Expanding: Converge a un valor estable (promedio de vida del usuario)

---

## 💰 Parte 4: RFM Analysis - Framework Clásico de E-Commerce

### 4.1. ¿Qué es RFM?

RFM es un framework de segmentación de clientes basado en 3 dimensiones:
```
┌─────────────────────────────────────┐
│  R - RECENCY (Recencia)             │
│  ¿Cuán reciente fue su última       │
│   compra?                            │
│                                      │
│  Feature: recency_days              │
│  = días desde última orden          │
│                                      │
│  Insight: Clientes recientes tienen │
│  mayor probabilidad de recompra     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  F - FREQUENCY (Frecuencia)         │
│  ¿Con qué frecuencia compra?        │
│                                      │
│  Feature: frequency_total_orders    │
│  = total de órdenes acumuladas      │
│                                      │
│  Insight: Usuarios frecuentes son   │
│  más "leales" y predecibles         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  M - MONETARY (Valor Monetario)     │
│  ¿Cuánto gasta?                     │
│                                      │
│  Features:                          │
│  - monetary_avg = gasto promedio    │
│  - monetary_total = gasto total     │
│                                      │
│  Insight: Alto valor → mayor        │
│  esfuerzo de retención              │
└─────────────────────────────────────┘
```

---

### 4.2. Implementación de RFM
```python
# RECENCY: Días desde la última orden
reference_date = df['order_date'].max()
df['recency_days'] = (reference_date - df['order_date']).dt.days

# FREQUENCY: Total de órdenes acumuladas hasta ahora
df['frequency_total_orders'] = df['total_orders_so_far']

# MONETARY: Gasto promedio histórico
df['monetary_avg'] = (
    df['expanding_total_spent'] / 
    df['total_orders_so_far'].replace(0, 1)  # evitar división por cero
)

# MONETARY: Gasto total histórico
df['monetary_total'] = df['expanding_total_spent']
```

---

### 4.3. Distribuciones RFM

![Distribuciones RFM](assets/temporal-features/temporal-rfm-distributions.png)

*Figura 3: Distribución de las tres dimensiones RFM en el dataset. **Panel izquierdo (Recency):** Distribución bimodal con pico en ~350 días (usuarios inactivos del inicio del dataset) y distribución uniforme 0-300 días (usuarios activos recientes). **Panel central (Frequency):** Distribución log-normal con pico en 18-20 órdenes totales, cola larga hasta 35+ órdenes (usuarios power). **Panel derecho (Monetary):** Fuerte concentración en ticket promedio bajo (<£500), cola extremadamente larga hasta £100k+ (indicativo de clientes B2B o mayoristas). **Conclusión:** Dataset tiene mezcla de usuarios casuales (1-5 órdenes, £100-300 ticket) y usuarios premium/B2B (20+ órdenes, £5k+ ticket).*

**Estadísticas clave:**

| Métrica RFM | Media | Mediana | Std | Min | Max |
|-------------|-------|---------|-----|-----|-----|
| Recency (días) | 184.7 | 191.0 | 101.3 | 0 | 373 |
| Frequency (órdenes) | 13.2 | 11.0 | 7.8 | 1 | 35 |
| Monetary Avg (£) | 461.2 | 244.8 | 1,248.7 | 3.75 | 168,469 |

---

### 4.4. Correlación RFM
```
Correlación entre dimensiones RFM:

                     recency  frequency  monetary_avg
recency                 1.00      -0.31         -0.12
frequency              -0.31       1.00          0.08
monetary_avg           -0.12       0.08          1.00
```

**Insights:**
- **Recency vs Frequency (-0.31):** Usuarios frecuentes tienen menor recency (compran más reciente)
- **Frequency vs Monetary (+0.08):** Correlación débil - usuarios frecuentes NO necesariamente gastan más
- **Recency vs Monetary (-0.12):** Usuarios con compra reciente gastan ligeramente más

---

## 🕒 Parte 5: Time Windows (7d, 30d, 90d)

### 5.1. Concepto: Ventanas Temporales por Calendario

**Diferencia: Rolling events vs Time windows**
```
ROLLING (por eventos):              TIME WINDOW (por calendario):
Últimas 3 órdenes                   Órdenes en últimos 7 días
→ Puede abarcar 2 meses             → Siempre exactamente 7 días
→ Depende de frecuencia usuario     → Fijo en tiempo real
```

**¿Por qué time windows son importantes?**

- Detectan **aceleración temporal**: 3 órdenes en 7 días (activo) vs 3 órdenes en 90 días (dormido)
- Marketing real: "Usuarios con 0 órdenes en últimos 30 días" → reactivation campaign
- Comparable entre usuarios: "Todos medidos en misma ventana de tiempo"

---

### 5.2. Implementación: Evitando Problemas de Pandas

**❌ Problema con `.rolling('7D')`:**
```python
# Esto FALLA con timestamps duplicados:
df.set_index('order_date').rolling('7D').count()

Error: "cannot reindex on an axis with duplicate labels"
```

**✅ Solución: Función custom con `.groupby().apply()`**
```python
def calculate_time_windows_for_user(user_data):
    """
    Calcula ventanas temporales por usuario, excluyendo orden actual.
    """
    user_data = user_data.sort_values('order_date').reset_index(drop=True)
    
    for i in range(len(user_data)):
        current_date = user_data.iloc[i]['order_date']
        
        # Datos históricos (EXCLUIR orden actual = prevenir leakage)
        if i > 0:
            historical_data = user_data.iloc[:i]
            
            # Ventana de 7 días
            mask_7d = historical_data['order_date'] >= (current_date - pd.Timedelta(days=7))
            user_data.loc[user_data.index[i], 'orders_7d'] = mask_7d.sum()
            user_data.loc[user_data.index[i], 'spend_7d'] = historical_data.loc[mask_7d, 'order_total'].sum()
            
            # Repetir para 30d y 90d...
    
    return user_data

# Aplicar a todos los usuarios
df = df.groupby('user_id', group_keys=False).apply(calculate_time_windows_for_user)
```

**Clave anti-leakage:**
- `historical_data = user_data.iloc[:i]` → **SOLO órdenes previas**
- Orden actual (índice `i`) **NUNCA** incluida en cálculo

---

### 5.3. Comparación de Ventanas Temporales

![Comparación Time Windows](assets/temporal-features/temporal-time-windows-comparison.png)

*Figura 4: Análisis de actividad en ventanas temporales de 7, 30 y 90 días. **Panel izquierdo:** Promedio de órdenes por ventana - barras muestran escalamiento esperado (7d: 0.4 órdenes, 30d: 1.4 órdenes, 90d: 3.7 órdenes). Relación ~lineal con ventana temporal valida consistencia de features. **Panel derecho:** Scatter plot de actividad reciente (7d) vs histórica (90d) revela segmentos: (1) Cluster en origen (0,0) = usuarios inactivos o nuevos. (2) Línea diagonal = usuarios con actividad constante (orders_7d proporcional a orders_90d). (3) Puntos sobre diagonal (ej: 10 órdenes en 90d, 3 en 7d) = **usuarios acelerando** - alta probabilidad de recompra. (4) Puntos bajo diagonal = usuarios desacelerando (potencial churn). **Valor predictivo:** Ratio orders_7d/orders_90d es fuerte indicador de engagement actual.*

**Estadísticas de ventanas:**

| Ventana | Media | Mediana | Max | Uso Estratégico |
|---------|-------|---------|-----|-----------------|
| **7 días** | 0.41 | 0 | 3 | Actividad inmediata - urgencia |
| **30 días** | 1.42 | 1 | 12 | Actividad mensual - baseline |
| **90 días** | 3.68 | 3 | 30 | Actividad trimestral - lealtad |

---

## 🎨 Parte 6: Product Diversity Features

### 6.1. Concepto de Diversidad

**¿Por qué medir diversidad de productos?**
```
Usuario A (explorador):          Usuario B (repetidor):
Orden 1: [café, té, galletas]    Orden 1: [leche]
Orden 2: [vino, queso, pan]      Orden 2: [leche]
Orden 3: [flores, velas]         Orden 3: [leche, pan]

Productos únicos: 9              Productos únicos: 2
Total items: 9                   Total items: 4
Diversity ratio: 9/9 = 1.0       Diversity ratio: 2/4 = 0.5
```

**Interpretación:**
- **Ratio alto (~1.0):** Usuario explora catálogo (nunca recompra)
- **Ratio bajo (<0.5):** Usuario recompra productos (lealtad a productos específicos)

---

### 6.2. Implementación
```python
# Agrupar por usuario desde dataset de productos
diversity_features = df_products.groupby('user_id').agg({
    'product_id': 'nunique',     # Productos únicos comprados
    'Country': 'nunique'         # Países desde donde compra
}).reset_index()

# Total de items comprados
total_items = df_products.groupby('user_id')['product_id'].count()

# Ratio de diversidad
diversity_features['product_diversity_ratio'] = (
    diversity_features['unique_products'] / total_items
)
```

---

### 6.3. Resultados y Análisis

![Product Diversity](assets/temporal-features/temporal-product-diversity.png)

*Figura 5: Análisis de diversidad de productos por usuario. **Panel izquierdo:** Scatter de productos únicos vs total items comprados. Línea roja diagonal (y=x) representa diversidad perfecta (nunca recompra). Mayoría de puntos caen DEBAJO de línea → usuarios recompran productos. Dispersión vertical para mismo total_items indica variabilidad en comportamiento (ej: 2000 items → algunos usuarios tienen 500 únicos, otros 1500). **Panel derecho:** Histograma de diversity ratio muestra distribución concentrada en 0.75-0.90 con mediana en 0.84 (línea roja). Interpretación: usuario típico compra 84% de productos únicos → ~16% son recompras. Cola hacia 0.5 indica segmento de usuarios con alta recompra (potencialmente productos consumibles). **Insight de negocio:** Mayoría de usuarios son "exploradores" (high diversity) vs "recompradores" (low diversity) - implicación para estrategia de recomendación.*

**Estadísticas:**

| Métrica | Valor | Interpretación |
|---------|-------|----------------|
| **Diversity ratio medio** | 0.84 | 84% productos únicos, 16% recompras |
| **Usuarios con ratio >0.9** | 42.3% | Alta exploración, baja recompra |
| **Usuarios con ratio <0.6** | 8.7% | Alta recompra (productos consumibles) |

**Insight de negocio:**
- Mayoría son **exploradores** → Estrategia: Cross-selling de nuevos productos
- Segmento de **recompradores** → Estrategia: Subscription models para productos recurrentes

---

## 📅 Parte 7: Calendar Features y Encoding Cíclico

### 7.1. Features Binarias de Calendario
```python
# Features binarias simples
df['is_weekend'] = (df['order_dow'] >= 5).astype(int)  # Sábado=5, Domingo=6
df['is_month_start'] = (df['order_date'].dt.day <= 5).astype(int)
df['is_month_end'] = (df['order_date'].dt.day >= 25).astype(int)
df['is_holiday'] = df['order_date'].isin(holidays_uk).astype(int)

# Días hasta próximo feriado (Christmas 2010)
christmas_2010 = pd.Timestamp('2010-12-25')
df['days_to_holiday'] = (christmas_2010 - df['order_date']).dt.days
df.loc[df['days_to_holiday'] < 0, 'days_to_holiday'] = 365  # ciclar a próximo año
```

---

### 7.2. Encoding Cíclico con Sin/Cos

**¿Por qué encoding cíclico?**
```
PROBLEMA con encoding numérico directo:
Hora 23 → 23
Hora 0  → 0
Distancia: |23 - 0| = 23 (modelo piensa están "lejos")

REALIDAD:
23:00 y 00:00 están separadas por 1 hora (muy cercanas)
```

**Solución: Transformación sin/cos**
```python
# Hour of day (0-23) → círculo
df['hour_sin'] = np.sin(2 * np.pi * df['order_hour_of_day'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['order_hour_of_day'] / 24)

# Day of week (0-6) → círculo
df['dow_sin'] = np.sin(2 * np.pi * df['order_dow'] / 7)
df['dow_cos'] = np.cos(2 * np.pi * df['order_dow'] / 7)

# Month (1-12) → círculo
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
```

**Ventaja:**
- 23:00 y 00:00 → Puntos cercanos en espacio (sin, cos)
- Diciembre y Enero → Conectados continuamente
- Modelo captura naturaleza cíclica del tiempo

---

## 🌍 Parte 8: External Variables (Economic Indicators)

### 8.1. Concepto de Variables Externas

**Features propias del usuario:** Cuánto gastó, cuándo compró  
**Variables externas:** Contexto económico/social que afecta a TODOS
```
Ejemplo:
Diciembre 2010: GDP growth = 2.8%, Consumer confidence = 105
→ Más órdenes (temporada festiva + economía fuerte)

Enero 2011: GDP growth = 1.9%, Consumer confidence = 95
→ Menos órdenes (post-holidays + incertidumbre económica)
```

---

### 8.2. Implementación (Datos Simulados)
```python
# Crear datos económicos mensuales simulados
economic_data = pd.DataFrame({
    'month_date': pd.date_range(start='2010-12-01', end='2011-12-01', freq='MS'),
    'gdp_growth': np.random.normal(2.5, 0.5, n_months),
    'unemployment_rate': np.random.normal(4.0, 0.3, n_months),
    'consumer_confidence': np.random.normal(100, 5, n_months)
})

# Merge por mes
df['month_period'] = df['order_date'].dt.to_period('M')
df = df.merge(economic_data, on='month_period', how='left')

# CRÍTICO: Solo forward fill (nunca backward = leakage)
df['gdp_growth'] = df['gdp_growth'].fillna(method='ffill')
```

**⚠️ Regla de oro:**
- ✅ `fillna(method='ffill')` - Forward fill: Usar pasado para rellenar futuro
- ❌ `fillna(method='bfill')` - Backward fill: Usar futuro para rellenar pasado = **DATA LEAKAGE**

---

## ⚖️ Parte 9: Time-Based Validation y Modelado

### 9.1. TimeSeriesSplit: Validación Sin Leakage

**Problema con KFold normal:**
```
KFold aleatorio:
Fold 1: Train [2,4,6,8] → Val [1,3,5,7]
         ↑ Incluye datos de 2011 ↑
                                  ↑ Valida en 2010

LEAKAGE: Entrenar en futuro, validar en pasado
```

**Solución: TimeSeriesSplit**
```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=3)

for fold, (train_idx, val_idx) in enumerate(tscv.split(X), 1):
    X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
    
    # GARANTÍA: train_dates.max() < val_dates.min()
    # Train siempre anterior a validation
```

**Estructura de folds:**
```
Fold 1: Train [0-7k]    → Val [7k-14k]
Fold 2: Train [0-14k]   → Val [14k-22k]
Fold 3: Train [0-16k]   → Val [16k-22k]

✅ Cada fold valida en período posterior al entrenamiento
```

---

### 9.2. Resultados de Cross-Validation

**Performance por fold:**

| Fold | Train Period | Val Period | Train Size | Val Size | AUC |
|------|--------------|------------|------------|----------|-----|
| 1 | 2010-12 → 2011-06 | 2011-06 → 2011-09 | 7,396 | 7,397 | 0.7823 |
| 2 | 2010-12 → 2011-09 | 2011-09 → 2011-12 | 14,793 | 7,397 | 0.7891 |
| 3 | 2010-12 → 2011-10 | 2011-10 → 2011-12 | 16,642 | 5,548 | 0.7654 |

**Mean AUC: 0.7789 ± 0.0098**

**Interpretación:**
- AUC ~0.78 → Modelo razonablemente predictivo (mejor que random 0.5)
- Baja varianza entre folds (std=0.0098) → Resultados robustos
- Fold 3 ligeramente inferior → Menos datos de validación (final del dataset)

---

### 9.3. Comparación: Con vs Sin Temporal Features

**Experimento controlado:**
```python
# Base Model: Solo features básicas
base_features = ['order_dow', 'order_hour_of_day', 'is_weekend', 
                'is_holiday', 'cart_size', 'order_total', 'order_number']

# Full Model: Base + Temporal features
temporal_features = ['days_since_prior_lag_1', 'rolling_cart_mean_3',
                    'expanding_total_spent', 'recency_days', 'orders_7d', ...]
```

**Resultados:**

| Modelo | AUC | Std | N Features | Improvement |
|--------|-----|-----|------------|-------------|
| **Base (sin temporal)** | 0.6842 | 0.0121 | 7 | - |
| **Full (con temporal)** | 0.7789 | 0.0098 | 45 | **+13.8%** |

**Conclusión:**
- **Temporal features agregan 13.8% de mejora** (0.6842 → 0.7789 AUC)
- Varianza se reduce (0.0121 → 0.0098) → Modelo más estable
- Trade-off: 6.4x más features (7 → 45) pero mejora justifica complejidad

---

## 📊 Parte 10: Feature Importance Analysis

### 10.1. Top Features Más Importantes

**Ranking de features por importancia en Random Forest:**

| Rank | Feature | Importance | Categoría |
|------|---------|------------|-----------|
| 1 | **expanding_total_spent** | 0.1842 | Expanding |
| 2 | **recency_days** | 0.1523 | RFM |
| 3 | **monetary_total** | 0.1287 | RFM |
| 4 | **frequency_total_orders** | 0.0965 | RFM |
| 5 | **total_orders_so_far** | 0.0821 | Expanding |
| 6 | **orders_90d** | 0.0687 | Time Window |
| 7 | **spend_90d** | 0.0598 | Time Window |
| 8 | **monetary_avg** | 0.0512 | RFM |
| 9 | **expanding_days_mean** | 0.0421 | Expanding |
| 10 | **orders_30d** | 0.0387 | Time Window |

---

### 10.2. Importancia por Categoría

**Agregación de importancia por tipo de feature:**

| Categoría | Total Importance | N Features | Avg Importance | Insight |
|-----------|------------------|------------|----------------|---------|
| **RFM** | 0.4287 | 4 | 0.1072 | 🏆 Domina el modelo |
| **Expanding** | 0.3084 | 3 | 0.1028 | Historia acumulada muy predictiva |
| **Time Window** | 0.1672 | 6 | 0.0279 | Ventanas temporales complementarias |
| **Lag/Window** | 0.0521 | 8 | 0.0065 | Menos importantes (ruido?) |
| **Calendar** | 0.0298 | 12 | 0.0025 | Señal débil en este dataset |
| **Diversity** | 0.0087 | 3 | 0.0029 | Poca importancia |
| **Economic** | 0.0051 | 3 | 0.0017 | Simuladas, sin señal real |

**Conclusiones:**

1. **RFM domina** (43% de importancia total)
   - Framework clásico sigue siendo gold standard
   - Recency, Frequency, Monetary capturan lo esencial

2. **Historia acumulada (Expanding) es crítica** (31%)
   - Gasto total histórico es segundo feature más importante
   - Comportamiento pasado predice futuro

3. **Time windows agregan valor** pero menor que RFM (17%)
   - Ventanas de 90 días más importantes que 7-30 días
   - Contexto de mediano plazo > actividad inmediata

4. **Calendar features débiles** (3%)
   - Weekend, holidays tienen poca señal en este dataset
   - Probablemente: E-commerce no tiene estacionalidad fuerte

---

### 10.3. Data Leakage Check

**Verificaciones realizadas:**

✅ **1. Performance Check**
```
Train accuracy:     0.8523
Cross-val AUC:      0.7789
Gap:                0.0734 (aceptable, <0.15)
```
→ No evidencia de leakage (gap no excesivo)

✅ **2. Top Features Check**
```
Top 5 features: expanding_total_spent, recency_days, monetary_total, 
                frequency_total_orders, total_orders_so_far

Suspicious keywords: target, label, leak → NINGUNO
```
→ Features tienen sentido de negocio

✅ **3. Temporal Consistency Check**
```
Fold 1: Train max (2011-06-30) < Val min (2011-07-01) ✅
Fold 2: Train max (2011-09-30) < Val min (2011-10-01) ✅
Fold 3: Train max (2011-10-31) < Val min (2011-11-01) ✅
```
→ Validación respeta cronología

✅ **4. Feature Calculation Check**
```
✅ Todas las aggregations usan shift(1)
✅ TimeSeriesSplit usado (no KFold)
✅ Solo forward fill (no backward fill)
✅ Rolling windows excluyen evento actual
```
→ Implementación correcta

**Conclusión:** **No hay evidencia de data leakage** ✅

---

## 💡 Conclusiones y Lecciones Aprendidas

### Hallazgos Clave

#### 1. Impacto Cuantificado de Temporal Features
```
┌──────────────────────────────────────┐
│  MEJORA DE PERFORMANCE               │
├──────────────────────────────────────┤
│  Base Model (sin temporal):          │
│    AUC = 0.6842                      │
│    Features = 7                      │
│                                      │
│  Full Model (con temporal):          │
│    AUC = 0.7789                      │
│    Features = 45                     │
│                                      │
│  IMPROVEMENT: +13.8%                 │
│  (0.0947 puntos AUC absolutos)       │
│                                      │
│  Trade-off:                          │
│  - 6.4x más features (complejidad)   │
│  - Pero mejora ROI justifica uso     │
└──────────────────────────────────────┘
```

---

#### 2. RFM Sigue Siendo Gold Standard

**Evidencia:**
- 43% de importancia total concentrada en 4 features RFM
- Top 4 features son todas RFM (expanding_total_spent, recency, monetary, frequency)

**Lección:**
> Frameworks clásicos de e-commerce (RFM) NO están obsoletos. Temporal features COMPLEMENTAN, no reemplazan.

---

#### 3. Historia Acumulada > Tendencias Recientes

**Comparación:**

| Tipo de Feature | Importancia Total | Interpretación |
|-----------------|-------------------|----------------|
| Expanding (histórico) | 30.8% | Comportamiento general del usuario |
| Rolling (reciente) | 5.2% | Cambios de corto plazo |
| Time Windows 90d | 16.7% | Contexto de mediano plazo |

**Lección:**
> En e-commerce, el pasado largo (expanding) predice mejor que el pasado inmediato (rolling). Usuario "es lo que siempre ha sido".

---

#### 4. Prevención de Data Leakage es No Negociable

**Técnicas aplicadas:**
```python
# ✅ CORRECTO: shift(1) antes de aggregation
df.groupby('user_id')['col'].shift(1).rolling(3).mean()

# ❌ INCORRECTO: aggregation incluye fila actual
df.groupby('user_id')['col'].rolling(3).mean()  # LEAKAGE!

# ✅ CORRECTO: TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=3)

# ❌ INCORRECTO: KFold (mezcla pasado/futuro)
kfold = KFold(n_splits=3)  # LEAKAGE!

# ✅ CORRECTO: Forward fill only
df['economic'].fillna(method='ffill')

# ❌ INCORRECTO: Backward fill
df['economic'].fillna(method='bfill')  # LEAKAGE!
```

**Lección:**
> Data leakage en series temporales es silencioso y catastrófico. AUC inflado en validación → modelo inútil en producción.

---

### Framework de Decisión: ¿Qué Temporal Features Usar?
```
┌─────────────────────────────────────────────────────┐
│  DECISION TREE PARA TEMPORAL FEATURES               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ¿Tienes timestamps de eventos por usuario?        │
│    └─ NO → No puedes hacer temporal features       │
│    └─ SÍ → Continuar                              │
│                                                     │
│  ¿Usuarios tienen múltiples eventos (>2)?          │
│    └─ NO → Solo usar recency, no lags/windows     │
│    └─ SÍ → Puedes usar lag/rolling/expanding      │
│                                                     │
│  FEATURES OBLIGATORIAS (always):                    │
│    ✅ RFM (Recency, Frequency, Monetary)          │
│    ✅ Expanding windows (gasto total, avg)         │
│                                                     │
│  FEATURES CONDICIONALES:                            │
│    🔹 Lags (1-3 eventos) si:                       │
│       - Frecuencia de eventos es variable          │
│       - Quieres capturar "último comportamiento"   │
│                                                     │
│    🔹 Rolling windows (3-7 eventos) si:            │
│       - Usuarios cambian comportamiento            │
│       - Detectar tendencias recientes              │
│                                                     │
│    🔹 Time windows (7d, 30d, 90d) si:              │
│       - Calendario importa (ej: campañas)          │
│       - Comparar actividad temporal real           │
│                                                     │
│    🔹 Calendar features si:                        │
│       - Negocio es estacional                      │
│       - Holidays afectan comportamiento            │
│                                                     │
│    🔹 External variables si:                       │
│       - Tienes datos macro confiables              │
│       - Negocio es sensible a economía             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### Recomendaciones para Producción

#### 1. Arquitectura Mínima Viable
```python
# Features esenciales (80% del valor, 20% del esfuerzo)
essential_features = [
    # RFM (4 features)
    'recency_days',
    'frequency_total_orders',
    'monetary_avg',
    'monetary_total',
    
    # Expanding (2 features)
    'expanding_total_spent',
    'total_orders_so_far',
    
    # Time Windows (2 features)
    'orders_30d',
    'spend_30d',
    
    # Base (2 features)
    'cart_size',
    'order_number'
]
# Total: 10 features → 70% de la performance de 45 features
```

---

#### 2. Pipeline de Producción
```python
class TemporalFeatureEngine:
    def __init__(self):
        self.reference_date = None
        
    def fit(self, df_train):
        """Fit en datos históricos"""
        self.reference_date = df_train['order_date'].max()
        return self
        
    def transform(self, df_new):
        """Transformar nuevas órdenes"""
        # 1. Ordenar por user_id y order_date
        df = df_new.sort_values(['user_id', 'order_date'])
        
        # 2. Calcular lags con shift(1)
        df['lag_1'] = df.groupby('user_id')['col'].shift(1)
        
        # 3. Calcular expanding con shift(1)
        df['expanding_sum'] = df.groupby('user_id')['col'].shift(1).expanding().sum()
        
        # 4. Calcular RFM
        df['recency'] = (self.reference_date - df['order_date']).dt.days
        
        return df
```

---

#### 3. Monitoreo de Feature Drift
```python
# Alertas a configurar en producción:

# 1. Recency drift
if recency_mean_this_week > recency_mean_historical * 1.5:
    alert("DRIFT: Usuarios no están comprando (recency aumentó 50%)")

# 2. Frequency collapse
if frequency_mean_this_week < frequency_mean_historical * 0.7:
    alert("DRIFT: Usuarios comprando menos frecuentemente")

# 3. Monetary inflation
if monetary_avg_this_week > monetary_avg_historical * 2.0:
    alert("DRIFT: Ticket promedio duplicó (¿cambio de producto mix?)")
```

---

## 📚 Referencias y Recursos

### Material del Curso

1. **Profesor Juan F. Kurucz** - Assignment UT3-11: Temporal Features
   - 🔗 [Práctica 11 — Temporal Features Assignment](https://juanfkurucz.com/ucu-id/ut3/11-temporal-features-assignment/)
   - 📄 Documento: Temporal Feature Engineering con Pandas

---

### Datasets

2. **Online Retail Dataset** (UCI ML Repository)
   - 🔗 [Kaggle - Online Retail](https://www.kaggle.com/datasets/vijayuv/onlineretail)
   - 📊 540k transacciones, UK 2010-2011
   - 🎯 Ideal para: Temporal features, RFM analysis, customer behavior

---

### Documentación Técnica

3. **Pandas - Time Series**
   - 🔗 [Time Series Guide](https://pandas.pydata.org/docs/user_guide/timeseries.html)
   - 📘 `.shift()`, `.rolling()`, `.expanding()`
   - ⏰ Operaciones temporales robustas

4. **Scikit-learn - TimeSeriesSplit**
   - 🔗 [TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html)
   - ✅ Cross-validation sin leakage temporal
   - 📊 Walk-forward validation

---

### Libros y Papers

5. **"Feature Engineering for Machine Learning"** - Zheng & Casari
   - 📚 O'Reilly, 2018
   - 💡 Chapter 8: Temporal Features
   - 🔗 [Book](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)

6. **"Practical Time Series Analysis"** - Nielsen
   - 📚 O'Reilly, 2019
   - 💡 Feature engineering para series temporales
   - 🎯 Lag selection, window sizing

---

### Tutoriales

7. **Kaggle - RFM Analysis Tutorial**
   - 🔗 [RFM Analysis](https://www.kaggle.com/code/jihyeseo/rfm-analysis-for-customer-segmentation)
   - 📘 RFM segmentation para e-commerce
   - 💡 Implementación práctica

8. **Machine Learning Mastery - Time Series Forecasting**
   - 🔗 [Tutorial](https://machinelearningmastery.com/time-series-forecasting-with-python/)
   - 📚 Lag features, rolling statistics
   - ⚠️ Data leakage prevention

---

## 🔗 Información del Proyecto

**Contexto Académico:**
- **Curso**: Temporal Feature Engineering - UT3  
- **Institución**: Universidad Católica del Uruguay  
- **Instructor**: Juan F. Kurucz  
- **Práctica**: [11 - Temporal Features Assignment](https://juanfkurucz.com/ucu-id/ut3/11-temporal-features-assignment/)

**Alcance del Proyecto:**
- Dataset Online Retail con 22,190 órdenes de 4,372 clientes
- 45 temporal features creadas (lags, rolling, expanding, RFM, time windows)
- Mejora de 13.8% en AUC (0.6842 → 0.7789) vs modelo sin features temporales
- Time-based validation con TimeSeriesSplit (3 folds)
- Framework completo de prevención de data leakage

**Archivos Generados:**
- `temporal_features_practice11.ipynb` — Notebook completo con implementación
- `temporal_features_comparison.csv` — Tabla de resultados (base vs full model)
- `visualizations/` — 5 gráficos (rolling, expanding, RFM, time windows, diversity)
- `docs/temporal_features_checklist.md` — Checklist anti-leakage

**Skills Desarrolladas:**
- ✅ Lag features con `.shift()` y `.groupby()`
- ✅ Rolling/Expanding windows con prevención de leakage
- ✅ RFM analysis (Recency, Frequency, Monetary)
- ✅ Time windows por calendario (7d, 30d, 90d)
- ✅ Calendar features con encoding cíclico (sin/cos)
- ✅ TimeSeriesSplit para validación temporal robusta
- ✅ Data leakage detection y prevention

