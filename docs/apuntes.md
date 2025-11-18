# 📚 Apuntes del Curso

!!! info "Información del Curso"
    **Docente:** Prof. Juan F. Kurucz  
    **Institución:** Universidad Católica del Uruguay  

---

## 🎯 Propósito de esta Sección

Esta sección centraliza todos los apuntes teóricos, conceptos fundamentales y contenidos académicos del curso de **Ingeniería de Datos**. Los apuntes están organizados por unidades temáticas y proporcionan:

- 📖 Fundamentos teóricos sólidos
- 💡 Conceptos clave explicados en profundidad
- 🔍 Referencias a literatura académica y técnica
- 📝 Síntesis de lecturas obligatorias
- 🎓 Material de estudio para evaluaciones
- 🧠 Conexiones entre conceptos de diferentes unidades

---

## 🗂️ Índice de Unidades Temáticas

### 📘 UT1: Tratamiento Avanzado de Datos Faltantes

**Período:** Agosto - Septiembre 2024  
**Evaluación:** Septiembre 2024

**[🔗 Ver Apuntes Completos de UT1](./ut1-apuntes.md)**

---

### 📗 UT2: Modelado Avanzado de Pipelines

**Período:** Septiembre - Octubre 2024  
**Evaluación:** Octubre 2024


**[🔗 Ver Apuntes Completos de UT2](./ut2-apuntes.md)**

---

### 📙 UT3: Feature Engineering

**Período:** Octubre - Noviembre 2024  
**Evaluación:** 01/10/2024


**[🔗 Ver Apuntes Completos de UT3](./ut3-apuntes.md)**

---

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
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
    
┌─────────┐   ┌─────────┐   ┌─────────┐
│   UT1   │   │   UT2   │   │   UT3   │
│ Missing │──▶│Pipelines│──▶│ Feature │
│  Data   │   │         │   │   Eng.  │
└─────────┘   └─────────┘   └─────────┘
     │             │             │
     │             │             │
     ▼             ▼             ▼

PREPARACIÓN   ORQUESTACIÓN   OPTIMIZACIÓN
DE DATOS      DE FLUJOS      DE FEATURES

     │             │             │
     └─────────────┼─────────────┘
                   │
                   ▼
        
        MODELOS ML EN PRODUCCIÓN
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

---

## 📚 Recursos Transversales

### Libros de Referencia del Curso

1. **Thakur, A.** *Approaching (Almost) Any Machine Learning Problem*
   - Usado en: UT1, UT2
   - Enfoque práctico y pragmático

2. **Huyen, C.** *Designing Machine Learning Systems*
   - Usado en: UT2
   - Perspectiva de sistemas en producción

3. **Zheng, A., & Casari, A.** *Feature Engineering for Machine Learning*
   - Usado en: UT3
   - Guía definitiva de feature engineering

---

### Documentación Técnica Esencial

- **Scikit-learn Documentation** (todas las unidades)
  - [Preprocessing & Pipelines](https://scikit-learn.org/stable/modules/preprocessing.html)
  - [Pipeline API](https://scikit-learn.org/stable/modules/compose.html)
  - [User Guide](https://scikit-learn.org/stable/user_guide.html)

- **Prefect Documentation** (UT2)
  - [Core Concepts](https://docs.prefect.io/core/)
  - [Orchestration](https://docs.prefect.io/)

- **Pandas Documentation** (todas las unidades)
  - [Working with Missing Data](https://pandas.pydata.org/docs/user_guide/missing_data.html)

---

### Recursos de Kaggle

- **Cursos Interactivos:**
  - [Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning)
  - [Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning)
  - [Feature Engineering](https://www.kaggle.com/learn/feature-engineering) ⭐ UT3

- **Notebooks de la Comunidad:**
  - [Missing Data Handling](https://www.kaggle.com/search?q=missing+data)
  - [Pipeline Examples](https://www.kaggle.com/search?q=pipeline)


