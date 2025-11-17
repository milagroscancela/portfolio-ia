# 📚 Recursos y Referencias

Esta sección consolida todas las lecturas, tutoriales y recursos utilizados a lo largo del curso de Ingeniería de Datos, organizados por unidad temática.

> 📅 **Última actualización:** 16 de Noviembre de 2025  
> 🎓 **Curso:** Ingeniería de Datos - Universidad Católica del Uruguay  
> 👨‍🏫 **Instructor:** Prof. Juan F. Kurucz  
> 📖 **Programa completo:** [Syllabus 2025](https://webasignatura.ucu.edu.uy/pluginfile.php/999965/mod_resource/content/2/Syllabus%202025.pdf)

---

## 🔗 Enlaces Principales

| Recurso | Descripción | Enlace |
|---------|-------------|--------|
| **📂 Portfolio GitHub** | Repositorio con todos los proyectos y notebooks | [github.com/milagroscancela/portfolio-ia](https://github.com/milagroscancela/portfolio-ia) |
| **📘 MkDocs Material** | Documentación del framework usado para este sitio | [squidfunk.github.io/mkdocs-material](https://squidfunk.github.io/mkdocs-material/) |
| **🗃️ Kaggle Datasets** | Fuente de datasets abiertos utilizados | [kaggle.com/datasets](https://www.kaggle.com/datasets) |

---

## 📖 Unidad Temática 1: EDA & Fuentes de Datos

### 🎯 Competencias Desarrolladas

En esta unidad aprendí a:

- 📊 Cargar y explorar datasets de diferentes formatos (CSV, JSON, SQLite)
- 🔍 Aplicar técnicas básicas de EDA con pandas
- 📈 Crear visualizaciones informativas con matplotlib/seaborn
- 📝 Documentar hallazgos usando MkDocs para mi portafolio
- 💡 Interpretar resultados de análisis exploratorio
- 🔧 Configurar entornos de desarrollo colaborativo con GitHub

---

### 📕 Lecturas Mínimas

!!! warning "Evaluación: 20 de Agosto"
    Estas lecturas fueron obligatorias para la evaluación del 20/08

1. **Brust, A. V. (2023).** *Ciencia de Datos para Gente Sociable*  
   📘 Capítulos 1–4  
   🔗 [Leer online](https://bitsandbricks.github.io/ciencia_de_datos_gente_sociable/)

2. **Google.** *Good Data Analysis*  
   📘 Secciones: Introducción, Mindset, Technical  
   🔗 [Guía oficial](https://developers.google.com/machine-learning/guides/good-data-analysis)

---

### 📚 Lecturas Complementarias

#### Documentación Oficial

| Herramienta | Enlace | Descripción |
|-------------|--------|-------------|
| **Pandas** | [pandas.pydata.org/docs](https://pandas.pydata.org/docs/) | Documentación completa de pandas |
| **Matplotlib** | [matplotlib.org/stable](https://matplotlib.org/stable/contents.html) | Guía de visualización con matplotlib |
| **Seaborn** | [seaborn.pydata.org](https://seaborn.pydata.org/) | Statistical data visualization |
| **MkDocs** | [mkdocs.org](https://www.mkdocs.org/) | Documentación de sitios estáticos |

#### Cursos Interactivos de Kaggle

!!! tip "Recomendación"
    Estos cursos son prácticos y toman ~3-4 horas cada uno

- 🐼 **Pandas Mini-Course**  
  Temas: Creating, Reading and Writing; Indexing, Selecting & Assigning; Summary Functions; Grouping and Sorting  
  🔗 [kaggle.com/learn/pandas](https://www.kaggle.com/learn/pandas)

- 📊 **Data Visualization**  
  Temas: Line charts, bar charts, heatmaps, scatter plots, distributions  
  🔗 [kaggle.com/learn/data-visualization](https://www.kaggle.com/learn/data-visualization)

---

## 🧹 Unidad Temática 2: Calidad de Datos & Ética

### 🎯 Competencias Desarrolladas

En esta unidad desarrollé habilidades para:

- 🔬 Distinguir entre tipos de missing data (MCAR, MAR, MNAR) en datasets reales
- 🎯 Detectar patrones de datos faltantes y outliers
- 🛠️ Aplicar estrategias de imputación apropiadas según el contexto
- ⚙️ Implementar pipelines de limpieza reproducibles
- 🚫 Prevenir data leakage usando validación cruzada adecuada
- ⚖️ Identificar y mitigar sesgo en datasets históricos
- 📐 Evaluar fairness usando métricas estándar (Fairlearn)
- 📋 Documentar decisiones éticas en el tratamiento de datos

---

### 📕 Lecturas Mínimas

!!! warning "Evaluación: 3 de Septiembre"
    Estas lecturas fueron obligatorias para la evaluación del 03/09

1. **Zheng, A., & Casari, A. (2018).** *Feature Engineering for Machine Learning*  
   📚 Editorial: O'Reilly Media  
   📘 Capítulos estudiados:
   
   - **Cap. 1:** ML Pipeline  
   - **Cap. 2:** Fancy Tricks with Simple Numbers  
   - **Cap. 4:** Effects of Feature Scaling
   
   🔗 [Libro en O'Reilly](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)

2. **Kaggle - Data Cleaning**  
   📘 Curso completo: Handling missing values, scaling, parsing dates, character encodings  
   🔗 [kaggle.com/learn/data-cleaning](https://www.kaggle.com/learn/data-cleaning)

3. **Kaggle - Intermediate ML: Data Leakage**  
   📘 Módulo específico sobre prevención de leakage  
   🔗 [Lección: Data Leakage](https://www.kaggle.com/code/alexisbcook/data-leakage)

4. **Kaggle - Intro to AI Ethics**  
   📘 Módulos: Identifying Bias in AI; AI Fairness  
   🔗 [kaggle.com/learn/intro-to-ai-ethics](https://www.kaggle.com/learn/intro-to-ai-ethics)

---

### 📚 Lecturas Complementarias

#### Recursos de Google & Microsoft

| Tema | Fuente | Enlace |
|------|--------|--------|
| **ML Fairness** | Google ML Crash Course | [developers.google.com/machine-learning/crash-course/fairness](https://developers.google.com/machine-learning/crash-course/fairness) |
| **Fairlearn** | Microsoft - Bias mitigation | [fairlearn.org](https://fairlearn.org/) |

#### Documentación Técnica

- 📄 **Pandas - Missing Data**  
  Guía oficial de manejo de valores faltantes  
  🔗 [pandas.pydata.org/docs/user_guide/missing_data.html](https://pandas.pydata.org/docs/user_guide/missing_data.html)

---

## 🔧 Unidad Temática 3: Feature Engineering

### 🎯 Competencias Desarrolladas

En esta unidad trabajé en:

- 🏗️ Crear features derivadas relevantes según el dominio del problema
- 🔤 Aplicar técnicas avanzadas de encoding categórico (Label, One-Hot, Target)
- 📊 Manejar variables de alta cardinalidad efectivamente
- 🔍 Implementar PCA para reducción dimensional
- 📉 Interpretar componentes principales y varianza explicada
- 🔗 Construir pipelines de feature engineering escalables con ColumnTransformer

---

### 📕 Lecturas Mínimas

!!! warning "Evaluación: 1 de Octubre"
    Estas lecturas fueron obligatorias para la evaluación del 01/10

1. **Zheng, A., & Casari, A. (2018).** *Feature Engineering for Machine Learning*  
   📚 Editorial: O'Reilly Media  
   📘 Capítulos estudiados:
   
   - **Cap. 2:** Fancy Tricks with Simple Numbers  
     *Transformaciones numéricas, binarización, interacciones*
   
   - **Cap. 5:** Categorical Variables  
     *One-hot, label, ordinal y target encoding*
   
   - **Cap. 6:** Dimensionality Reduction  
     *PCA, feature selection, curse of dimensionality*
   
   🔗 [Libro en O'Reilly](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)

2. **Kaggle - Feature Engineering**  
   📘 Curso completo (7 lecciones)  
   🔗 [kaggle.com/learn/feature-engineering](https://www.kaggle.com/learn/feature-engineering)

---

### 📚 Lecturas Complementarias

#### Scikit-learn Documentation

!!! info "Documentación Oficial"
    Guías técnicas que utilicé para implementación

| Tema | Enlace | Contenido Clave |
|------|--------|-----------------|
| **Preprocessing & Encoders** | [sklearn - encoding](https://scikit-learn.org/stable/modules/preprocessing.html#encoding-categorical-features) | OneHotEncoder, OrdinalEncoder, TargetEncoder |
| **PCA & Decomposition** | [sklearn - PCA](https://scikit-learn.org/stable/modules/decomposition.html#pca) | Análisis de componentes principales |
| **ColumnTransformer & Pipeline** | [sklearn - compose](https://scikit-learn.org/stable/modules/compose.html) | Pipelines de transformación |

---

## 📊 Recursos Adicionales

### Plataformas de Aprendizaje
```markdown
┌─────────────────────────────────────────────┐
│  PLATAFORMAS QUE USÉ                        │
├─────────────────────────────────────────────┤
│                                             │
│  🎓 Kaggle Learn                            │
│     • Cursos interactivos gratuitos         │
│     • Notebooks ejecutables                 │
│     • Certificados al completar             │
│                                             │
│  📚 O'Reilly Learning                       │
│     • Libros técnicos completos             │
│     • Acceso universitario UCU              │
│     • Videos y tutoriales                   │
│                                             │
│  🔬 Google ML Crash Course                  │
│     • Teoría + práctica                     │
│     • Casos de uso reales                   │
│     • Énfasis en buenas prácticas           │
│                                             │
└─────────────────────────────────────────────┘
```

### Comunidad y Soporte

- 📺 **YouTube - Corey Schafer**  
  🔗 [Pandas Tutorials](https://www.youtube.com/watch?v=ZyhVh-qRZPA&list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS)

---

## 🗂️ Organización de Lecturas por Práctica

### Mapeo Rápido: Práctica → Recursos Clave

| Práctica | Recursos Principales |
|----------|---------------------|
| **P1-P3: EDA** | Pandas docs, Kaggle Pandas, Ciencia de Datos para Gente Sociable Cap 1-4 |
| **P4-P5: Missing Data** | Zheng Cap 1-2-4, Kaggle Data Cleaning, Pandas Missing Data Guide |
| **P6: Bias & Fairness** | Kaggle AI Ethics, Google ML Fairness, Fairlearn docs |
| **P7-P8: Feature Engineering** | Zheng Cap 2, Kaggle Feature Engineering |
| **P9: Encoding** | Zheng Cap 5, Sklearn Encoders, Category Encoders docs |
| **P10: PCA** | Zheng Cap 6, Sklearn PCA, StatQuest PCA videos |
| **P11: Temporal Features** | Pandas Time Series, Sklearn TimeSeriesSplit |

---

## 📝 Mi Flujo de Trabajo con los Recursos

!!! tip "Así trabajé con cada práctica"
    
    **Antes de cada práctica:**
    
    1. 📖 Leí el capítulo correspondiente del libro (30-45 min)
    2. 🎥 Vi video tutorial si había disponible (15-20 min)
    3. 💻 Completé módulo de Kaggle Learn (1-2 horas)
    
    **Durante la práctica:**
    
    - 🔍 Consulté documentación oficial ante dudas
    - 📋 Usé notebooks de ejemplo como referencia
    - 🤝 Colaboré con mi grupo cuando fue necesario
    
    **Después de la práctica:**
    
    - ✍️ Documenté aprendizajes en este portfolio
    - 🔗 Subí código al repositorio de GitHub
    - 💬 Participé en discusiones del foro del curso

---

## 🎓 Notas Personales

### Recursos que me resultaron más útiles

- ⭐ **Zheng & Casari** - Explicaciones claras con ejemplos prácticos
- ⭐ **Kaggle Learn** - Ejercicios hands-on que refuerzan conceptos
- ⭐ **Scikit-learn docs** - Ejemplos de código reproducibles

### Desafíos superados

- 🧠 Entender la diferencia entre MAR y MNAR (UT2)
- 🎯 Implementar target encoding sin data leakage (UT3)
- 📊 Interpretar loadings de PCA en contexto de negocio (UT3)

---

> 📅 **Última actualización:** 16 de Noviembre de 2025  
