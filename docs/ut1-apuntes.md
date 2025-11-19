# Apuntes de Estudio: UT1 - EDA & Fuentes de Datos

**Unidad Temática 1: Análisis Exploratorio de Datos y Fuentes**  
**Curso:** Ingeniería de Datos - UCU 2025  
**Evaluación:** 20 de Agosto

> **Objetivo:** Dominar técnicas de carga, exploración y visualización de datos con Python, aplicando mejores prácticas de análisis exploratorio.

---

## Competencias a Desarrollar

- Cargar y explorar datasets de diferentes formatos (CSV, JSON, SQLite)
- Aplicar técnicas básicas de EDA con pandas
- Crear visualizaciones informativas con matplotlib/seaborn
- Documentar hallazgos usando MkDocs y mejores prácticas
- Interpretar resultados de análisis exploratorio
- Configurar entornos de desarrollo colaborativo con GitHub

---

## Parte 1: Ciencia de Datos para Gente Sociable (Cap. 1-4)

**Autor:** Antonio Vazquez Brust  
**Fuente:** https://bitsandbricks.github.io/ciencia_de_datos_gente_sociable/

### Conceptos Fundamentales

#### ¿Qué es la Ciencia de Datos?

> La ciencia de datos es el empleo de técnicas de programación para analizar datos y extraer conocimiento de ellos 

**No es solo programación**, requiere desarrollo de habilidades en **4 áreas clave:**
```
┌─────────────────────────────────────────────────────┐
│  LAS 4 HABILIDADES DEL CIENTÍFICO DE DATOS          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1️⃣ PROGRAMACIÓN                                    │
│     • Pensamiento computacional                     │
│     • Reducir tareas complejas a pasos ejecutables  │
│     • No todos los problemas son computacionales    │
│                                                     │
│  2️⃣ COMUNICACIÓN                                    │
│     • Explicar procesos complejos                   │
│     • Visualizaciones que permitan "leer" datos     │
│     • Adaptar mensaje a audiencias diversas         │
│                                                     │
│  3️⃣ CONOCIMIENTO DE DOMINIO                         │
│     • Experiencia en campo específico               │
│     • Contexto para interpretar resultados          │
│     • Identificar qué métricas importan             │
│                                                     │
│  4️⃣ ESTADÍSTICA & MATEMÁTICA                        │
│     • Validar que patrones no son coincidencia      │
│     • Modelado de incertidumbre                     │
│     • Comprensión de limitaciones                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Principios Clave para Ciencias Sociales

Este libro fue escrito con una audiencia en mente formada por urbanistas, sociólogos, politólogas y otros entusiastas que se acercan al tema desde las Ciencias Sociales 

**Características del enfoque:**
- No requiere conocimiento previo de programación
- Énfasis en exploración, análisis y visualización
- ️ Tono introductorio y explicaciones simplificadas
- Orientado a trabajo colaborativo e interdisciplinario

---

### Metodología: Del Problema al Insight
```
FLUJO DE TRABAJO EN CIENCIA DE DATOS:

1. PREGUNTA/PROBLEMA
   ↓
2. RECOLECCIÓN DE DATOS
   ↓
3. EXPLORACIÓN (EDA)
   ├── Limpieza
   ├── Transformación
   └── Visualización
   ↓
4. ANÁLISIS
   ├── Estadística descriptiva
   ├── Pruebas de hipótesis
   └── Modelado (si aplica)
   ↓
5. COMUNICACIÓN
   ├── Reportes
   ├── Visualizaciones
   └── Recomendaciones
   ↓
6. ACCIÓN/DECISIÓN
```

---

### Lecciones Clave del Libro

#### 1. El Análisis Siempre Empieza con Preguntas

 **Mal enfoque:** "Tengo estos datos, ¿qué puedo hacer con ellos?"  
 **Buen enfoque:** "¿Cómo puedo responder [pregunta específica] con datos?"

#### 2. La Comunicación es Tan Importante como el Código

Parte de hacer ciencia de datos es saber cómo discutir los datos usados y los resultados obtenidos con interlocutores muy diversos: audiencia general, funcionarios públicos, colegas, especialistas de otras disciplinas 

**Habilidades de comunicación necesarias:**
- Explicar procesos técnicos a audiencia no técnica
- Crear visualizaciones autoexplicativas
- Documentar decisiones y limitaciones
- Presentar incertidumbre de forma honesta

#### 3. El Contexto Importa

El conocimiento de dominio es la experiencia acumulada en un campo particular de actividad humana 

**Por qué el contexto es crítico:**
- Permite identificar anomalías vs. patrones normales
- Guía qué variables son relevantes
- Ayuda a interpretar resultados correctamente
- Evita conclusiones sin sentido práctico

---

## Parte 2: Google Good Data Analysis

**Fuente:** https://developers.google.com/machine-learning/guides/good-data-analysis  
**Autor:** Patrick Riley (Google)

### Visión General

Deriving truth and insight from a pile of data is a powerful but error-prone job. The best data analysts and data-minded engineers develop a reputation for making credible pronouncements from data 

**Desafío específico de Google (y Big Data en general):**
- Datasets extremadamente grandes
- Datasets muy ricos (muchos atributos por fila)
- Secuencias temporales complejas
- Innumerables formas de ver los datos

---

### ️ SECCIÓN 1: Technical (Técnicas de Manipulación)

#### 1.1. Examina Distribuciones Completas

 **Mal hábito:** Reportar solo media, mediana, desviación estándar  
 **Mejor práctica:** Generate histograms, cumulative distribution functions (CDFs), Quantile-Quantile (Q-Q) plots 

**Por qué:**
- Detectar comportamiento multimodal
- Identificar clases de outliers
- Ver la "forma" real de tus datos
```python
# Insuficiente
df['age'].describe()

# Completo
import seaborn as sns
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Histograma + KDE
sns.histplot(df['age'], kde=True, ax=axes[0])
axes[0].set_title('Distribución con KDE')

# CDF
axes[1].plot(sorted(df['age']), 
             np.linspace(0, 1, len(df['age'])))
axes[1].set_title('Función de Distribución Acumulada')

# Q-Q Plot
from scipy import stats
stats.probplot(df['age'], dist="norm", plot=axes[2])
axes[2].set_title('Q-Q Plot')

plt.tight_layout()
plt.show()
```

---

#### 1.2. Considera los Outliers Cuidadosamente

Examine outliers carefully because they can be canaries in the coal mine that indicate more fundamental problems with your analysis 

**Estrategia:**
1.  Está bien excluir outliers O agruparlos en categoría "unusual"
2. ️ **PERO:** Debes saber **POR QUÉ** terminaron ahí
3.  Investiga: ¿Error de medición? ¿Caso legítimo extremo? ¿Bug en código?

**Ejemplos de insights de outliers:**
- Queries con menos clicks → Elementos que no estás contando
- Queries con más clicks → Clicks que no deberías contar

---

#### 1.3. Considera el Ruido (Noise)

Randomness exists and will fool us. Some people think, "Google has so much data; the noise goes away." This simply isn't true 

**Regla de oro:**
> Cada número o resumen de datos que produzcas DEBE tener una noción de confianza (confidence intervals, p-values)
```python
# Sin contexto de confianza
mean_conversion_rate = 0.035  # 3.5%

# Con intervalo de confianza
from scipy import stats

mean = 0.035
n = 1000
confidence = 0.95

margin_error = stats.sem(data) * stats.t.ppf((1 + confidence) / 2, n-1)

print(f"Tasa de conversión: {mean:.2%} ± {margin_error:.2%}")
# Output: "Tasa de conversión: 3.50% ± 0.45%"
```

---

#### 1.4. Mira Ejemplos Individuales

Anytime you are producing new analysis code, you need to look at examples from the underlying data and how your code is interpreting those examples 

**Cómo samplear ejemplos:**
- Si clasificas datos → Mira ejemplos de CADA clase
- Si es clase grande → Mira MÁS muestras
- Si calculas número → Mira extremos (fastest/slowest 5%) y puntos a lo largo del espacio

**Por qué es crítico:**
- Casi imposible producir código complejo que funcione sin este paso
- Tu análisis abstrae detalles → Ver complejidad completa valida que tu resumen es razonable

---

#### 1.5. Segmenta tus Datos (Slicing)

Slicing means separating your data into subgroups and looking at metric values for each subgroup separately 

**Dimensiones comunes de segmentación:**
- Browser (Chrome, Firefox, Safari)
- Locale (país, idioma)
- Device type (desktop, mobile, tablet)
- Domain
- ⏰ Time (día de semana, hora del día)

**Cuándo segmentar:**
1. Si el fenómeno funciona diferente entre subgrupos → **DEBES** segmentar
2. Incluso si NO esperas diferencias → Segmentar da mayor confianza
3. A veces un slice específico tiene datos malos o es fundamentalmente diferente

️ **Cuidado con Mix Shifts:**
A mix shift is when the amount of data in the slices for each group is different 

Puede llevar a **Paradoja de Simpson** y otras confusiones.

---

#### 1.6. Considera Significancia Práctica

With a large volume of data, it can be tempting to focus solely on statistical significance. But you need to ask yourself, "Even if it is true that value X is 0.1% more than value Y, does it matter?" 

**Significancia Estadística ≠ Significancia Práctica**

| Escenario | Significancia Estadística | Significancia Práctica | Acción |
|-----------|---------------------------|------------------------|--------|
| Aumento de 0.01% en conversión con p<0.001 |  Sí |  No | No implementar cambio (costo > beneficio) |
| Aumento de 15% en conversión con p=0.06 |  No |  Sí | Investigar más (muestra pequeña) |
| Disminución de 5% en churn con p<0.001 |  Sí |  Sí |  Implementar inmediatamente |

---

#### 1.7. Verifica Consistencia Temporal

You should almost always try slicing data by units of time because many disturbances to underlying data happen as our systems evolve over time 

**Por qué es importante:**
- Muchas disrupciones ocurren cuando sistemas evolucionan
- Durante lanzamiento inicial → Revisión cuidadosa
- Pero muchos breakages aparecen **con el tiempo**
```python
# Visualización de consistencia temporal
df_daily = df.groupby('date').agg({
    'metric': 'mean',
    'users': 'count'
}).reset_index()

fig, axes = plt.subplots(2, 1, figsize=(12, 8), sharex=True)

# Métrica principal
axes[0].plot(df_daily['date'], df_daily['metric'])
axes[0].set_title('Métrica a lo largo del tiempo')
axes[0].axhline(y=df_daily['metric'].mean(), 
                color='r', linestyle='--', label='Media')
axes[0].legend()

# Volumen de datos
axes[1].bar(df_daily['date'], df_daily['users'], alpha=0.6)
axes[1].set_title('Volumen de datos por día')
axes[1].set_xlabel('Fecha')

plt.tight_layout()
plt.show()
```

---

#### 1.8. Reconoce y Cuenta tu Filtrado

Almost every large data analysis starts by filtering data in various stages. You must: acknowledge and clearly specify what filtering you are doing, and count the amount of data being filtered at each step 

**Mejores prácticas:**
```python
# Filtrado documentado y contabilizado
print(f"Total de registros: {len(df):,}")

# Filtro 1: Solo usuarios de USA
df_usa = df[df['country'] == 'USA']
print(f"Después de filtrar USA: {len(df_usa):,} "
      f"({len(df_usa)/len(df)*100:.1f}%)")

# Filtro 2: Solo búsquedas web
df_web = df_usa[df_usa['search_type'] == 'web']
print(f"Después de filtrar web: {len(df_web):,} "
      f"({len(df_web)/len(df)*100:.1f}%)")

# Filtro 3: Solo búsquedas con ads
df_final = df_web[df_web['has_ads'] == True]
print(f"Dataset final: {len(df_final):,} "
      f"({len(df_final)/len(df)*100:.1f}%)")

# Opcional: Analizar también población excluida
excluded = df[~df.index.isin(df_final.index)]
print(f"\nPoblación excluida: {len(excluded):,}")
print(f"Fracción de spam filtrado: "
      f"{excluded['is_spam'].sum()/len(excluded)*100:.1f}%")
```

---

#### 1.9. Ratios Deben Tener Numerador y Denominador Claros

Most interesting metrics are ratios of underlying measures. Oftentimes, interesting filtering or other data choices are hidden in the precise definitions of the numerator and denominator 

**Ejemplo: "Queries / User" puede significar:**

1. Queries / Users **with a Query**
2. Queries / Users who **visited Google today**
3. Queries / Users with an **active account**

**Cada definición responde preguntas diferentes:**
- Definición 1 → Engagement de usuarios activos
- Definición 2 → Tasa de conversión (visitante → búsqueda)
- Definición 3 → Actividad general de la base de usuarios

️ **Caso especial:** Métricas calculadas solo en subconjunto
- "Time to Click" = "Time to Click **given that there was a click**"
- Siempre reconocer el filtro implícito
- Buscar shifts en ese filtro entre grupos comparados

---

### SECCIÓN 2: Process (Proceso de Análisis)

#### 2.1. Separa: Validación, Descripción y Evaluación

I think of data analysis as having three interrelated stages: Validation, Description, and Evaluation 
```
┌────────────────────────────────────────────────────┐
│  LAS 3 ETAPAS DEL ANÁLISIS DE DATOS               │
├────────────────────────────────────────────────────┤
│                                                    │
│  1️⃣ VALIDACIÓN                                     │
│      ¿Creo que los datos son auto-consistentes?│
│      ¿Fueron recolectados correctamente?        │
│      ¿Representan lo que creo que representan?  │
│                                                    │
│  2️⃣ DESCRIPCIÓN                                    │
│      Interpretación objetiva de los datos       │
│     Ej: "Usuarios hacen menos queries tipo X"    │
│     Ej: "Tiempo entre X e Y es 1% mayor"         │
│     → Todo el mundo debería estar de acuerdo     │
│                                                    │
│  3️⃣ EVALUACIÓN                                     │
│     ️ ¿Los datos indican que algo bueno pasa?   │
│     → Para usuario / Para empresa / Para mundo   │
│     → Aquí habrá más debate                      │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Por qué separar:**
- By separating these stages, you can more easily reach agreement with others 
- Descripción → Consenso fácil
- Evaluación → Debate natural
- Si no separas → Solo verás la interpretación que esperas ver

️ **Nota:** Estas etapas NO son lineales. Saltarás entre ellas, pero siempre debes estar claro en qué etapa estás.

---

#### 2.2. Confirma Setup de Experimento y Recolección

Before looking at any data, make sure you understand the context in which the data was collected 

**Checklist antes de ver datos:**
```
 Entender configuración del experimento
 Entender cómo se recolectan los datos
 Revisar restricciones de población (ej: solo Chrome)
 Si el experimento está corriendo → PROBARLO TÚ MISMO
 Revisar fechas: ¿Hubo holidays, launches grandes, etc.?
 Determinar qué poblaciones de usuarios fueron afectadas
```

---

#### 2.3. Verifica lo que NO Debería Cambiar

As part of the "Validation" stage, before actually answering the question you are interested in, rule out any other variability in the data that might affect the experiment 

**Preguntas de sanity check:**
```python
# ¿Cambió el número de usuarios?
control_users = experiment_df[experiment_df['group'] == 'control']['user_id'].nunique()
treatment_users = experiment_df[experiment_df['group'] == 'treatment']['user_id'].nunique()

assert abs(control_users - treatment_users) / control_users < 0.05, \
    "️ Desbalance significativo en usuarios entre grupos"

# ¿Aparecieron las queries afectadas en todos los subgrupos?
affected_queries_by_group = experiment_df.groupby('group')['affected_query'].sum()
print(affected_queries_by_group)

# ¿Cambiaron los error rates?
error_rate_by_group = experiment_df.groupby('group')['has_error'].mean()
print(f"Control error rate: {error_rate_by_group['control']:.2%}")
print(f"Treatment error rate: {error_rate_by_group['treatment']:.2%}")
```

---

#### 2.4. Estándar Primero, Custom Segundo

When looking at new features and new data, it's particularly tempting to jump right into the metrics that are new or special for this new feature. However, you should always look at standard metrics first 

**Por qué:**
- Métricas estándar están mucho mejor validadas
- Más probable que sean correctas
- Si tus custom metrics no hacen sentido con standard metrics → **tus custom metrics están probablemente mal**

**Orden recomendado:**
```
1. Métricas estándar de plataforma
   ├── DAU (Daily Active Users)
   ├── Session duration
   ├── Clicks on web results
   └── Error rates

2. Métricas estándar del feature type
   ├── CTR (si es feature de UI)
   ├── Conversion rate (si es funnel)
   └── Latency (si es performance)

3. Métricas custom del nuevo feature
   ├── Interactions específicas
   ├── Success metrics únicos
   └── KPIs particulares
```

---

#### 2.5. Mide Dos Veces, o Más

Especially if you are trying to capture a new phenomenon, try to measure the same underlying thing in multiple ways. Then, determine whether these multiple measurements are consistent 

**Beneficios de medición múltiple:**
- Identificar bugs en código de medición/logging
- Detectar características inesperadas de los datos
- Descubrir pasos de filtrado importantes
- **Mejor aún:** Usar diferentes fuentes de datos

**Ejemplo:**
```python
# Medir "user engagement" de 3 formas diferentes

# Método 1: Tiempo en sitio
engagement_time = df.groupby('user_id')['session_duration'].sum()

# Método 2: Número de acciones
engagement_actions = df.groupby('user_id')['action_count'].sum()

# Método 3: Profundidad de navegación
engagement_depth = df.groupby('user_id')['pages_visited'].mean()

# Verificar consistencia
correlation_matrix = pd.DataFrame({
    'time': engagement_time,
    'actions': engagement_actions,
    'depth': engagement_depth
}).corr()

print("Correlaciones entre métricas de engagement:")
print(correlation_matrix)

# Si las correlaciones son bajas → Investigar por qué
```

---

#### 2.6. Verifica Reproducibilidad

If a phenomenon is important and meaningful, you should see it across different user populations and time 

**Formas de verificar reproducibilidad:**

1. **Slicing** (ya discutido)
2. **Consistencia temporal** (ya discutido)
3. **Estabilidad de modelos** ante pequeñas perturbaciones
4. **Diferentes rangos de tiempo**
5. **Sub-muestras aleatorias**
```python
# Verificar reproducibilidad con bootstrap
from sklearn.utils import resample

results = []
n_iterations = 1000

for i in range(n_iterations):
    # Resample con reemplazo
    sample = resample(df, n_samples=len(df), random_state=i)
    
    # Calcular métrica
    metric = sample['conversion_rate'].mean()
    results.append(metric)

# Verificar estabilidad
import numpy as np
print(f"Media: {np.mean(results):.4f}")
print(f"Std: {np.std(results):.4f}")
print(f"95% CI: [{np.percentile(results, 2.5):.4f}, "
      f"{np.percentile(results, 97.5):.4f}]")
```

If a model is not reproducible, you are probably not capturing something fundamental about the underlying process that produced the data 

---

#### 2.7. Verifica Consistencia con Mediciones Pasadas

Often you will be calculating a metric that is similar to things that have been counted in the past. You should compare your metrics to metrics reported in the past 

**Ejemplo del documento:**
- Si mides page load time = 5 segundos en población especial
- Pero análisis pasados en todos los usuarios = 2 segundos
- → **Debes investigar**

**Tu número puede estar correcto para esta población, pero ahora tienes que validarlo más**

️ **Regla de oro:**
> No necesitas acuerdo exacto, pero deberías estar en el mismo ballpark. Si no lo estás, **asume que estás mal** hasta que puedas convencerte completamente.

---

#### 2.8. Nuevas Métricas → Aplicar a Datos/Features Antiguos Primero

If you create new metrics and try to learn something new, you won't know if your new metric is right. With new metrics, you should first apply them to a known feature or data 

**Proceso de validación de nueva métrica:**
```
1. Crear nueva métrica
   ↓
2. Aplicar a feature/data CONOCIDO
   ↓
3. ¿La métrica confirma lo que ya sabemos?
   ├──  Sí → Métrica validada, usar para aprender algo nuevo
   └──  No → Métrica errónea, revisar definición/implementación
```

**Ejemplos:**
- Nueva métrica de satisfacción → Aplicar a tus mejores features (debería indicar alta satisfacción)
- Nueva métrica de atención → Comparar con eye-tracking studies o rater studies

---

#### 2.9. Haz Hipótesis y Busca Evidencia

Typically, data analysis for a complex problem is iterative. You will discover anomalies, trends, or other features of the data. Naturally, you will develop theories to explain this data. Don't just develop a theory and proclaim it to be true. Look for evidence (inside or outside the data) to confirm/deny this theory 

**Ejemplos de validación de teorías:**

| Teoría | Evidencia a Buscar |
|--------|-------------------|
| "Hay efecto de aprendizaje" | ¿Se manifiesta más fuerte en usuarios de alta frecuencia? |
| "Anomalía por launch de feature" | ¿Solo la población del launch está afectada? ¿Magnitud consistente con expectativas? |
| "Tasa de crecimiento cambió" | ¿Hay fuente externa que valide ese cambio poblacional? |

**Pregunta clave:**
> "¿Qué experimentos correría que validarían/invalidarían la historia que estoy contando?"

Incluso si no puedes/corres estos experimentos, puede darte ideas de cómo validar con los datos que tienes.

---

#### 2.10. Análisis Exploratorio: Iteración End-to-End

When doing exploratory analysis, perform as many iterations of the whole analysis as possible 

**Estrategia:**

 **Mal enfoque:** Pasar mucho tiempo perfeccionando la primera etapa

 **Buen enfoque:** 
- Get algo razonable end-to-end lo más rápido posible
- Hacer múltiples iteraciones completas
- Dejar notas para ti mismo sobre:
  - Pasos de filtrado
  - Requests no parseables
  - Casos inusuales
- **NO** intentar eliminarlos todos al inicio

**Por qué:**
- Cuando finalmente miras datos al final → Puedes descubrir cosas que cambien tu dirección
- Más iteraciones = más aprendizaje en mismo tiempo
- Enfoque inicial: Razonable, no perfecto

---

#### 2.11. Cuidado con Feedback Loops

We typically define various metrics around user success. If you then feed that data back to the system, you create lots of opportunities for evaluation confusion 

**Problema:**
- Defines métrica (ej: clicks)
- Alimentas esa métrica de vuelta al sistema (ranking por clicks)
- **NO puedes** usar esa misma métrica para evaluar tu cambio

**Ejemplo:**
- Si muestras más ads que obtienen más clicks
- NO puedes usar "more clicks" para decidir que usuarios son más felices
- Aunque "more clicks" típicamente significa "happier"

️ **Advertencia adicional:**
You should not even do slicing on the variables that you fed back and manipulated, as that will result in mix shifts that will be difficult or impossible to understand 

---

### SECCIÓN 3: Mindset (Mentalidad del Analista)

#### 3.1. El Análisis Empieza con Preguntas, No con Datos

There's always a motivation to analyze data. Formulating your needs as questions or hypotheses helps ensure that you are gathering the data you should be gathering and that you are thinking about the possible gaps in the data 

**Trampa a evitar:**
> Encontrar tu técnica favorita y solo buscar partes del problema donde esa técnica funciona

**Solución:**
- Crear preguntas claras ANTES de elegir técnica
- Las preguntas deben evolucionar al ver los datos
- Pero análisis sin pregunta → Análisis sin rumbo

---

#### 3.2. Sé Escéptico y Campeón Simultáneamente

As you work with data, you must become both the champion of the insights you are gaining and a skeptic of them 

**Al detectar fenómeno interesante, pregúntate:**

1.  **Como campeón:** "¿Qué otros datos podría reunir que muestren qué tan awesome es esto?"
2.  **Como escéptico:** "¿Qué podría encontrar que invalidaría esto?"

**Especialmente crítico cuando:**
- Analizas para alguien que realmente quiere cierta respuesta
- Ejemplo: "¡Mi feature es awesome!"
- → **Debes** jugar el rol de escéptico para evitar errores

---

#### 3.3. Correlación ≠ Causalidad

When making theories about data, we often want to assert that "X causes Y". You can not simply establish causation because of correlation 

**Estrategia:**
- Considerar cómo validarías una teoría de causalidad
- Usualmente desarrollarás buen sentido de qué tan creíble es la teoría causal

**Trampa adicional:**
> "Incluso si no hay relación causal entre A y B, debe haber algo subyacente que haga que una señal sea buen indicador de la otra"

️ **Peligro:** Multiple hypothesis testing
- Given enough experiments and enough dimensions, some of the signals will align for a specific experiment. This does not imply that the same signals will align in the future 

**Responsabilidad del analista:**
A data analyst must often navigate these causal questions for the people that want to consume the data. You should be clear with those consumers what you can and can not say about causality 

---

#### 3.4. Comparte con Peers Primero, Consumidores Externos Segundo

Sharing with a peer is one of the best ways to force yourself to do all these things. A skilled peer can provide qualitatively different feedback than the consumers of your data can 

**Por qué peers son valiosos:**
- Consumidores generalmente tienen agenda
- Peers pueden dar feedback cualitativamente diferente

**Cuándo compartir con peers:**

1. **Early on (al inicio):**
   - Aprender sobre gotchas que tu peer conoce
   - Sugerencias de cosas a medir
   - Investigación pasada en el área

2. **Near the end (casi al final):**
   - Señalar rarezas
   - Identificar inconsistencias
   - Detectar confusiones

**Ideal:**
- Peer que conozca algo del data que estás viendo
- **Pero:** Incluso peer con solo experiencia general en análisis de datos es extremadamente valioso

---

#### 3.5. Espera y Acepta Ignorancia y Errores

There are many limits to what we can learn from data. Only by admitting the limits of our certainty can we make advances in better prediction 

**Admitir ignorancia:**
- Es una fortaleza (no inmediatamente recompensada)
- Se siente mal en el momento
- Gran beneficio a largo plazo para ti y tu equipo

**Admitir errores:**
- Se siente peor cuando descubres error tarde
- Pero reconocer proactivamente tus errores → **Te gana respeto**
- Ese respeto se traduce en **credibilidad** e **impacto**



## Recursos Adicionales 

### Lecturas Complementarias

- **Pandas Documentation** → https://pandas.pydata.org/docs/
- **Matplotlib Documentation** → https://matplotlib.org/stable/contents.html
- **Seaborn Documentation** → https://seaborn.pydata.org/

### Cursos Prácticos

- **Kaggle Pandas** → https://www.kaggle.com/learn/pandas
  - Creating, Reading and Writing
  - Indexing, Selecting & Assigning
  - Summary Functions and Maps
  - Grouping and Sorting

- **Kaggle Data Visualization** → https://www.kaggle.com/learn/data-visualization

### Libros Mencionados

- **"The Signal and the Noise"** - Nate Silver
  - Sobre límites de certeza y mejor predicción



