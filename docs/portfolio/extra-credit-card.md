# 💳 Detección de Sesgo en Aprobación de Créditos con Fairlearn

**Práctica Extra - Unidad Temática 2 (UT2)**  
**Calidad & Ética de Datos | Análisis de Fairness en Servicios Financieros**

---

## ℹ️ Información General

| **Característica** | **Detalles** |
|-------------------|-------------|
| ⏱️ **Tiempo estimado** | 3-4 horas |
| 📊 **Dataset** | [Credit Card Approval Prediction - Kaggle](https://www.kaggle.com/datasets/rikdifos/credit-card-approval-prediction) |
| 🎯 **Objetivo** | Detectar y mitigar sesgo demográfico en decisiones de crédito |
| 🛠️ **Herramientas** | Python, Scikit-learn, Fairlearn, Pandas, Matplotlib |
| 📁 **Tipo de análisis** | Fairness audit + bias mitigation con ML |
| 👤 **Autora** | Milagros Cancela |

---

## 📋 Descripción del Proyecto

Este proyecto aplica técnicas de **fairness** en Machine Learning para detectar y mitigar sesgos demográficos en un sistema de aprobación de créditos. Utilizando **Fairlearn**, se cuantifican disparidades entre grupos protegidos (género, nivel educativo) y se implementan estrategias de corrección para garantizar decisiones más equitativas.

### 🏦 Contexto de Negocio

Las instituciones financieras utilizan modelos de ML para automatizar decisiones crediticias. Sin embargo, estos modelos pueden perpetuar sesgos históricos que discriminan contra grupos protegidos, violando regulaciones como:

- **Equal Credit Opportunity Act (ECOA)**: Prohíbe discriminación por raza, color, religión, origen nacional, sexo, estado civil o edad
- **Fair Lending Laws**: Regulan prácticas justas en préstamos
- **EU AI Act**: Requiere auditorías de fairness en sistemas de IA de alto riesgo

### 🎯 Objetivos del Análisis

1. ✅ **Detectar sesgo demográfico** en aprobaciones de crédito por género
2. ✅ **Cuantificar disparidades** con métricas estándar de Fairlearn
3. ✅ **Entrenar modelo baseline** sin correcciones (Random Forest)
4. ✅ **Aplicar mitigación** con ExponentiatedGradient + DemographicParity
5. ✅ **Evaluar trade-offs** entre accuracy y fairness
6. ✅ **Generar recomendaciones** éticas para deployment

---

## 🛠️ Stack Tecnológico

```python
# Machine Learning & Fairness
scikit-learn==1.3+       # Modelos baseline
fairlearn==0.10+         # Métricas y mitigación de sesgo

# Manejo de datos
pandas==2.0+
numpy==1.24+

# Visualización
matplotlib==3.7+
seaborn==0.12+

# Descarga de datasets
kagglehub==0.2+
```

**Instalación de dependencias:**
```bash
pip install pandas numpy scikit-learn fairlearn matplotlib seaborn kagglehub jupyter
```

---

## 📊 Dataset: Credit Card Approval Prediction

### Características del Dataset Analizado

| **Atributo** | **Valor** |
|-------------|----------|
| **Fuente** | Kaggle - Credit Card Approval |
| **Registros totales** | ~438,857 solicitudes de crédito |
| **Variables** | 18 features (demográficas + financieras) |
| **Target** | Aprobación de crédito (binario: 0/1) |
| **Grupos protegidos** | Género (F/M), Nivel educativo |
| **Balance de clases** | Ver distribución abajo |

### 📈 Distribución de Aprobaciones y Clases

![Distribución de Aprobaciones](./assets/credit-card/distribucion-aprobaciones-y-prop-de-clases.png)

**Análisis de la distribución:**

| **Métrica** | **Valor** |
|------------|----------|
| **Total de aprobaciones (Married)** | ~300,000 (68.4%) |
| **Single/not married** | ~55,000 (12.6%) |
| **Civil marriage** | ~36,000 (8.3%) |
| **Separated** | ~27,000 (6.2%) |
| **Widow** | ~20,000 (4.5%) |

**Observaciones clave:**
- 📊 **Clase mayoritaria**: Personas casadas representan casi 70% del dataset
- ⚠️ **Desbalance significativo**: Grupos minoritarios (widow, separated) <10%
- 🎯 **Implicación**: Modelo puede tener sesgo hacia patrones de clase mayoritaria

---

## 👥 Análisis de Variables Demográficas (Grupos Protegidos)

### Distribución de Grupos Protegidos

![Variables Demográficas](./assets/credit-card/variables-demograficas-grupos-protegidos.png)

#### 📊 Género (CODE_GENDER)

| **Grupo** | **Frecuencia** | **Porcentaje** |
|-----------|---------------|----------------|
| Femenino (F) | ~297,000 | 67.7% |
| Masculino (M) | ~142,000 | 32.3% |

**Observación:**
- 🚺 **Sesgo de muestra**: Mujeres representan 2x más solicitudes que hombres
- 💡 **Implicación para fairness**: Modelo puede estar mejor entrenado para perfil femenino

#### 🎓 Nivel Educativo (NAME_EDUCATION_TYPE)

| **Nivel** | **Frecuencia aprox.** | **Porcentaje** |
|----------|---------------------|----------------|
| Secondary/secondary special | ~305,000 | 69.5% |
| Higher education | ~119,000 | 27.1% |
| Incomplete higher | ~15,000 | 3.4% |
| Lower secondary | <5,000 | <1% |
| Academic degree | <2,000 | <0.5% |

**Observación:**
- 📚 **Concentración educativa**: 96%+ tiene educación secundaria o superior
- ⚠️ **Grupos marginales**: Educación incompleta y grados académicos muy subrepresentados

---

## 🔍 Análisis de Fairness: Modelo Baseline

### Métricas de Fairness por Género (CODE_GENDER)

![Análisis de Fairness por Género](./assets/credit-card/analisi-fairlearn-por-code-gender.png)

#### 📊 Resultados del Modelo Baseline

**Métricas por Grupo:**

| **Métrica** | **Femenino (0)** | **Masculino (1)** | **Overall** | **Diferencia** |
|------------|-----------------|------------------|-------------|---------------|
| **Accuracy** | 0.813 | 0.899 | 0.845 | +0.086 (M) |
| **Precision** | 0.844 | 0.908 | 0.866 | +0.064 (M) |
| **Recall** | 0.813 | 0.899 | 0.845 | +0.086 (M) |
| **Selection Rate** | 0.775 | 0.826 | 0.794 | +0.051 (M) |

#### 🚨 Hallazgos Críticos de Sesgo

1. **Disparidad en Accuracy** 📈
   - Hombres: **89.9%** de accuracy
   - Mujeres: **81.3%** de accuracy
   - **Brecha: 8.6 puntos porcentuales** 🚨
   
   **Interpretación:** El modelo predice correctamente casos de hombres con 8.6% más de precisión que mujeres.

2. **Disparidad en Selection Rate (Tasa de Aprobación)** 💳
   - Hombres: **82.6%** de aprobación
   - Mujeres: **77.5%** de aprobación
   - **Brecha: 5.1 puntos porcentuales** ⚠️
   
   **Interpretación:** Los hombres tienen 5.1% más probabilidad de ser aprobados que las mujeres, controlando por otros factores.

3. **Disparidad en Precision** ✅
   - Hombres: **90.8%** de precision
   - Mujeres: **84.4%** de precision
   - **Brecha: 6.4 puntos porcentuales** ⚠️

#### ⚖️ Métricas de Fairness Calculadas

**Demographic Parity Difference (DPD):**
- **Valor no mostrado explícitamente** pero estimable desde Selection Rate
- Diferencia en tasa de aprobación: **~5.1%**
- **Umbral aceptable:** <5% según estándares de la industria
- **Status:** ⚠️ En el límite / Requiere atención

**Equalized Odds:**
- No se observan diferencias dramáticas en TPR/FPR pero la brecha en recall (8.6%) sugiere disparidad

---

## 🛠️ Mitigación de Sesgo con Fairlearn

### Comparación: Modelo Baseline vs Modelo Mitigado

![Comparación Baseline vs Mitigado](./assets/credit-card/comparacion-modelo-baseline-y-modelo-mitigado.png)

### 📊 Resultados de la Mitigación

#### 1. Accuracy por Grupo

| **Grupo** | **Baseline** | **Mitigated** | **Cambio** |
|-----------|-------------|--------------|-----------|
| Femenino (0) | 0.81 | 0.67 | -17.3% 🔻 |
| Masculino (1) | 0.90 | 0.74 | -17.8% 🔻 |
| **Brecha** | **0.09** | **0.07** | **-22.2%** ✅ |

**Análisis:**
- ✅ **Reducción de brecha**: De 9 a 7 puntos (mejora del 22%)
- ⚠️ **Trade-off severo**: Pérdida promedio de accuracy del 17%
- 🤔 **Evaluación crítica**: ¿Es aceptable perder 17% de accuracy?

#### 2. Tasa de Aprobación (Selection Rate)

| **Grupo** | **Baseline** | **Mitigated** | **Cambio** |
|-----------|-------------|--------------|-----------|
| Femenino (0) | 0.78 | 1.00 | +28.2% ⬆️ |
| Masculino (1) | 0.83 | 1.00 | +20.5% ⬆️ |
| **Brecha** | **0.05** | **0.00** | **-100%** ✅ |

**Análisis:**
- ✅ **Paridad perfecta alcanzada**: Ambos grupos con 100% de selection rate
- 🚨 **Efecto secundario**: Modelo aprueba a TODOS (overfitting a fairness constraint)
- ⚠️ **No viable en producción**: Aprobar a todos no es sostenible para negocio

#### 3. Métricas de Fairness

| **Métrica** | **Baseline** | **Mitigated** | **Cambio** |
|------------|-------------|--------------|-----------|
| **DPD** (estimado) | 0.051 | ~0.00 | -100% ✅ |
| **DPR** (estimado) | 0.94 | 1.00 | +6.4% ✅ |
| **EOD** (estimado) | 0.086 | ~0.04 | -53% ✅ |

**Análisis:**
- ✅ **Mejora dramática en fairness**: Todas las métricas mejoradas
- 🎯 **Demographic Parity alcanzada**: DPD prácticamente 0
- ⚠️ **Pero a costa de**: Accuracy catastrófica y selection rate = 100%

---

## 💡 Interpretación de Resultados

### 🔴 Problema Identificado: Overcompensation

El modelo mitigado exhibe **overcompensation** (sobrecompensación):

```
BASELINE:
✅ Alta accuracy (~85%)
⚠️ Sesgo moderado (DPD=0.05)
✅ Selection rate realista (78-83%)

MITIGATED (con DemographicParity):
❌ Baja accuracy (~70%)
✅ Sesgo eliminado (DPD=0.00)
❌ Selection rate irreal (100% aprueban)
```

### 🎯 ¿Qué salió mal?

**Causa raíz:**
- **Constraint muy estricta**: DemographicParity fuerza igualdad absoluta en selection rate
- **Dataset desbalanceado**: 68% mujeres vs 32% hombres
- **Solución del algoritmo**: Aprobar a todos para igualar tasas

**Problema fundamental:**
> "No se puede tener fairness perfecta Y alta accuracy cuando los grupos tienen distribuciones reales diferentes"

---

## 🔧 Recomendaciones de Mitigación Mejorada

### 1. Ajustar Parámetros de ExponentiatedGradient

```python
# Versión más flexible
mitigator = ExponentiatedGradient(
    estimator=LogisticRegression(),
    constraints=DemographicParity(difference_bound=0.05),  # Permitir 5% de diferencia
    max_iter=50,
    nu=1e-4,  # Aumentar para más flexibilidad
    eta0=1.0  # Reducir para steps más conservadores
)
```

### 2. Probar EqualizedOdds en lugar de DemographicParity

```python
from fairlearn.reductions import EqualizedOdds

# Más balanceado para clasificación
mitigator = ExponentiatedGradient(
    estimator=base_model,
    constraints=EqualizedOdds(),  # Iguala TPR y FPR, no solo selection rate
    max_iter=50
)
```

**Ventaja:** EqualizedOdds considera la calidad real (Y=1 vs Y=0), no solo decisiones del modelo.

### 3. Usar GridSearch con umbrales de fairness

```python
from fairlearn.postprocessing import ThresholdOptimizer

# Post-processing: ajustar thresholds por grupo
postprocessor = ThresholdOptimizer(
    estimator=baseline_model,
    constraints="demographic_parity",
    objective="balanced_accuracy_score",
    grid_size=100
)

postprocessor.fit(X_train, y_train, sensitive_features=gender_train)
```

**Ventaja:** Mantiene modelo base intacto, solo ajusta decisión final.

### 4. Balanceo de Datos Previo

```python
from imblearn.over_sampling import SMOTE

# Balancear clases antes de entrenar
smote = SMOTE(random_state=42)
X_balanced, y_balanced = smote.fit_resample(X_train, y_train)

# Luego entrenar con más balance
baseline_model.fit(X_balanced, y_balanced)
```

---

## 📊 Framework de Decisión para Deployment

### Matriz de Decisión

| **Accuracy** | **DPD** | **Selection Rate** | **Decisión** |
|-------------|---------|-------------------|-------------|
| >80% | <0.05 | 70-90% | ✅ **DEPLOY** |
| 70-80% | <0.08 | 60-90% | ⚠️ **REVISAR** con stakeholders |
| <70% | <0.10 | <60% o >95% | 🔴 **NO DEPLOY** - Reentrenar |
| >80% | >0.10 | - | 🔴 **NO DEPLOY** - Alto sesgo |

**Nuestro caso:**
- Baseline: Accuracy=85%, DPD=0.05, SR=78-83% → ✅ **BORDERLINE ACEPTABLE**
- Mitigated: Accuracy=70%, DPD=0.00, SR=100% → 🔴 **NO VIABLE**

### Recomendación Final

**Para este dataset:**

1. **Corto plazo**: Usar **modelo baseline** con monitoreo estricto
   - Implementar revisión humana para casos border
   - Documentar decisiones para compliance
   - Establecer proceso de apelación

2. **Mediano plazo**: Reentrenar con técnicas mejoradas
   - Aplicar SMOTE para balanceo
   - Probar EqualizedOdds
   - Usar ThresholdOptimizer post-processing

3. **Largo plazo**: Recolección de datos más balanceada
   - Incrementar muestras de hombres
   - Diversificar perfiles educativos
   - Auditorías trimestrales de fairness

---

## ⚖️ Consideraciones Legales y Éticas

### Marco Regulatorio Aplicable

| **Regulación** | **Requisito** | **Cumplimiento Actual** |
|---------------|--------------|------------------------|
| **ECOA (USA)** | No discriminar por sexo | ⚠️ Brecha de 5.1% en selection rate |
| **Fair Lending** | Justificar diferencias | ✅ Documentado en análisis |
| **EU AI Act** | Auditoría de sesgo | ✅ Fairlearn metrics implementadas |
| **GDPR** | Explicabilidad | ⚠️ Pendiente: Integrar SHAP/LIME |

### Principios Éticos Aplicados

1. **Transparencia** ✅
   - Métricas de fairness públicamente documentadas
   - Código y metodología reproducibles

2. **Accountability** ✅
   - Análisis cuantitativo de disparidades
   - Framework de decisión explícito

3. **Equidad** ⚠️
   - Sesgo detectado pero no eliminado completamente
   - Trade-off accuracy-fairness pendiente de resolver

4. **No maleficencia** ✅
   - Modelo mitigado rechazado por inapropiado
   - Prevención de deployment irresponsable

---

## 📚 Referencias

### Dataset y Herramientas

1. **Credit Card Approval Prediction - Kaggle**  
   🔗 [kaggle.com/datasets/rikdifos/credit-card-approval-prediction](https://www.kaggle.com/datasets/rikdifos/credit-card-approval-prediction)

2. **Fairlearn Documentation**  
   🔗 [fairlearn.org](https://fairlearn.org/)  
   📘 User Guide completa de métricas y mitigadores

3. **Scikit-learn Documentation**  
   🔗 [scikit-learn.org](https://scikit-learn.org/stable/)