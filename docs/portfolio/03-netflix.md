# 🎬 Exploración del Dataset *Netflix* — Análisis Visual y Estrategia de Contenido

> 📚 **Tiempo estimado de lectura:** ~10 min  
> - **Autores [G1]:** Joaquín Batista, Milagros Cancela, Valentín Rodríguez, Alexia Aurrecoechea, Nahuel López  
> - **Fecha:** 20/08/2025  
> - **Entorno:** Python 3 + Seaborn + Matplotlib  
> - **Referencia de la tarea:** [Tarea 3 — EDA Netflix con Visualizaciones](https://juanfkurucz.com/ucu-id/ut1/03-eda-netflix/)

---

## 💾 Descargar Notebook y Reporte

- [**Descargar notebook — eda_netflix.ipynb**](./assets/netflix/eda_netflix.ipynb){: .btn .btn-primary target="_blank" download="eda_netflix.ipynb"}  
- [**Descargar reporte automático — netflix_eda_report.html**](./assets/netflix/netflix_eda_report.html){: .btn .btn-secondary target="_blank" download="netflix_eda_report.html"}

> 📂 Archivos disponibles dentro del repositorio:  
> `docs/portfolio/assets/netflix/eda_netflix.ipynb`  
> `docs/portfolio/assets/netflix/netflix_eda_report.html`

---

## 🎯 Objetivo

El objetivo de esta práctica fue realizar un **Análisis Exploratorio de Datos (EDA)** sobre el catálogo global de *Netflix*, aplicando **visualizaciones descriptivas y multivariadas** con `matplotlib` y `seaborn`.  
El propósito fue comprender **cómo se distribuyen los contenidos por tipo, país, año, rating y género**, detectando patrones útiles para la toma de decisiones estratégicas.

---

## 💼 Contexto de Negocio

Netflix busca entender mejor su catálogo y las dinámicas de su contenido global para optimizar la adquisición y producción.  
El dataset proviene de [Kaggle – Netflix Titles](https://www.kaggle.com/datasets/swapnilg4u/netflix-data-analysis) y representa su catálogo histórico de películas y series.

| Elemento | Descripción |
|:----------|:-------------|
| **Problema** | Netflix necesita información clara sobre su oferta de contenido: qué países dominan, qué géneros se repiten y cómo evolucionó el catálogo. |
| **Objetivo** | Analizar patrones en el tipo de contenido, país, géneros y fechas de lanzamiento para respaldar decisiones de contenido. |
| **Variables clave** | Tipo de contenido, país, año de lanzamiento, rating, géneros, duración. |
| **Valor para el negocio** | Mejorar la estrategia de adquisición de contenido, entender preferencias regionales y detectar brechas o concentraciones. |

> 💡 *El análisis se enmarca en la fase de “Business Understanding” del modelo CRISP-DM.*

---

## 📘 Descripción general del Dataset

El dataset contiene **8.807 registros** y **12 columnas**, representando títulos disponibles en Netflix hasta 2021.  
Incluye tanto *Movies* como *TV Shows*, con información sobre país, director, rating y género.

| Variable | Tipo | Descripción | Ejemplo |
|:----------|:------|:-------------|:-------------|
| `type` | Categórica | Tipo de contenido | *Movie* / *TV Show* |
| `title` | Texto | Título del contenido | *Stranger Things* |
| `country` | Categórica | País o países de producción | *United States* |
| `release_year` | Numérica | Año de lanzamiento | 2019 |
| `rating` | Categórica | Clasificación por audiencia | *TV-MA* |
| `listed_in` | Categórica | Géneros asociados | *Dramas, Documentaries* |

---

## 🔧 Metodología

1. **Carga y validación de datos** → `pd.read_csv(url)`  
   Se verificó estructura, tipos de datos y valores faltantes.  
2. **Análisis de calidad de datos** → detección de duplicados, outliers y nulos con `df.isna()` y `df.duplicated()`.  
3. **Exploración visual** → gráficos de barras, distribuciones, mapas de calor y comparaciones por tipo de contenido.  
4. **Dashboard integrador** → construcción de panel visual con `matplotlib.gridspec`.  
5. **Profiling automático** → validación con `ydata-profiling` para análisis estadístico completo.

---

## 🌎 Distribución global del contenido

![Netflix Dashboard](./assets/netflix/netflix_dashboard.png)

- **Películas (68%)** dominan el catálogo frente a las series (32%), confirmando el enfoque de Netflix en volumen y diversidad.  
- **Producción concentrada** en *Estados Unidos* e *India*, seguidas por Reino Unido, Canadá y Francia.  
- El auge de lanzamientos entre **2015 y 2019** coincide con la expansión global y los primeros *Netflix Originals*.  
- El rating más frecuente es **TV-MA (contenido maduro)**, evidenciando una estrategia orientada a público adulto joven.  
- La evolución por décadas muestra un crecimiento sostenido desde el año 2000, con un salto exponencial posterior a 2015.

---

## 📊 Análisis de Calidad de los Datos

| Criterio | Evaluación | Observación |
|:----------|:-----------|:-------------|
| **Valores faltantes** | ⚠️ Moderado | Altos porcentajes en `director` y `cast` (>60%) |
| **Duplicados** | ✅ Mínimos | <2% de títulos duplicados |
| **Outliers** | ⚠️ Escasos | Algunos registros con años extremos (<1950, >2025) |
| **Distribución temporal** | 📈 Clara | Incremento progresivo desde 2000 |
| **Consistencia general** | ✅ Alta | Dataset estable y representativo |

---

## 💼 Insights de Negocio

### 🎯 1. Estrategia de Contenido Global
El 70% del catálogo se origina en cinco países, lo que indica **una oportunidad de diversificación** hacia mercados emergentes.  
Reforzar la presencia de producciones latinoamericanas y europeas podría mejorar la retención en regiones clave.

### 🎞️ 2. Preferencias de Audiencia
Los géneros *Dramas*, *Comedias* y *Documentales* representan más del 50% del contenido.  
Netflix podría potenciar géneros menos explotados (Ciencia ficción, Animación) para captar audiencias específicas.

### 🕒 3. Tendencias Temporales
El pico de lanzamientos en 2018 coincide con el aumento de *Netflix Originals*.  
La caída posterior sugiere un ajuste post-pandemia y una fase de consolidación.

### 🔞 4. Clasificaciones por Rating
Predomina contenido adulto (*TV-MA*), lo cual indica una **estrategia centrada en el engagement adulto joven**, más que en programación infantil o familiar.

### 💡 5. Valor Estratégico
El EDA visual permitió **validar hipótesis de mercado** y entender cómo la estructura del catálogo refleja la estrategia comercial global de la empresa.

---

## 🚀 BONUS: Profiling Automático con *ydata-profiling*

El *profiling* complementó el EDA manual mediante un reporte estadístico automatizado.  
Se utilizó la librería `ydata-profiling` para validar correlaciones, detectar anomalías y evaluar calidad de datos.

```python
from ydata_profiling import ProfileReport

# Crear perfil completo del dataset
profile = ProfileReport(
    df, 
    title="Netflix Dataset - EDA Report",
    explorative=True,
    minimal=False
)

# Generar reporte HTML
profile.to_file("netflix_eda_report.html")
```
