# 🏗️ De Variables Básicas a Insights Poderosos: Feature Engineering en el Sector Inmobiliario

**Práctica 8 - Feature Engineering con Pandas**  
**UT3: Feature Engineering | Inteligencia de Datos**

> 📚 **Tiempo estimado de lectura:** ~18 min  
> - **Autores [G1]:** Joaquín Batista, Milagros Cancela, Valentín Rodríguez, Alexia Aurrecoechea, Nahuel López   
> - **Fecha:** Noviembre 2025   
> - **Entorno:** Python 3.13+ | Pandas | Scikit-learn | Matplotlib | Seaborn  
> - **Referencia de la tarea:** [Práctica 8 — Feature Engineering con Pandas](https://juanfkurucz.com/ucu-id/ut3/08-feature-engineering-assignment/)

---

## �� Descargar Notebook y Visualizaciones

- [**Descargar notebook — feature_engineering_practice8.ipynb**](./assets/feature-engineering/feature_engineering_practice8.ipynb){: .btn .btn-primary target="_blank" download="feature_engineering_practice8.ipynb"}

> 📂 Archivos disponibles dentro del repositorio:  
> `docs/portfolio/assets/feature-engineering/feature_engineering_practice8.ipynb`

---

## �� Objetivo

El objetivo de esta práctica fue **crear y evaluar features derivadas** a partir de un dataset sintético de propiedades inmobiliarias, aplicando técnicas de feature engineering para mejorar la capacidad predictiva de modelos de machine learning. Se desarrolló un **enfoque sistemático** para transformar 10 variables básicas en 18 features enriquecidas, evaluando su importancia mediante Mutual Information, Random Forest y análisis de correlación.

---

## 💼 Contexto y Motivación

### El Poder del Feature Engineering en Real Estate

En el mercado inmobiliario, la predicción precisa de precios requiere más que variables básicas:

- �� **Variables básicas son limitadas**: Superficie y habitaciones no cuentan toda la historia
- 📊 **Ratios revelan eficiencias**: Precio/m² es más informativo que precio absoluto
- 🔄 **Transformaciones capturan no-linealidades**: Log de precio normaliza distribuciones
- 🎯 **Conocimiento del dominio es clave**: Features compuestas reflejan decisiones reales

| Elemento | Descripción |
|:----------|:-------------|
| **Problema** | Modelos predictivos básicos dejan sin explotar patrones complejos en datos inmobiliarios |
| **Objetivo** | Crear features derivadas que capturen relaciones no-lineales e interacciones entre variables |
| **Dataset** | 1000 propiedades sintéticas con 10 variables base |
| **Técnicas** | Ratios, transformaciones matemáticas, variables temporales, features compuestas |
| **Valor técnico** | Mejorar precisión predictiva del 10-15% mediante ingeniería de features inteligente |

---

## 📘 Metodología: Del Dato Crudo al Insight

### Filosofía de Feature Engineering

**No todas las transformaciones mejoran los modelos.** El proceso requiere:

1. **Entender el dominio** del problema (sector inmobiliario)
2. **Crear hipótesis** sobre qué transformaciones pueden ayudar
3. **Validar objetivamente** con múltiples métricas
4. **Iterar** basándose en resultados

```
┌─────────────────────────────────────────────┐
│  PIPELINE DE FEATURE ENGINEERING            │
├─────────────────────────────────────────────┤
│                                             │
│  1️⃣ RATIOS Y PROPORCIONES                 │
│     • Normalizar variables absolutas        │
│     • Capturar eficiencias                  │
│                                             │
│  2️⃣ VARIABLES TEMPORALES                   │
│     • Antigüedad, categorías de edad        │
│     • Patrones de depreciación              │
│                                             │
│  3️⃣ TRANSFORMACIONES MATEMÁTICAS           │
│     • Log, sqrt, cuadrado                   │
│     • Normalizar distribuciones             │
│                                             │
│  4️⃣ FEATURES COMPUESTAS                    │
│     • Conocimiento del dominio              │
│     • Scores multi-dimensionales            │
│                                             │
│  5️⃣ EVALUACIÓN                             │
│     • Mutual Information                    │
│     • Random Forest Importance              │
│     • Correlación con target                │
│                                             │
└─────────────────────────────────────────────┘
```

---

*[Contenido completo del archivo - 1658 líneas]*

**Generado por:** Grupo 1 - Práctica 8  
**Fecha:** Noviembre 2025  
**Versión:** 1.0
