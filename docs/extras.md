# 🚀 Exploraciones Extra: Investigando Más Allá del Curso

Esta sección presenta exploraciones adicionales realizadas de forma autónoma para profundizar en técnicas de Data Science y Machine Learning Ético. Cada análisis complementa las unidades temáticas del curso con datasets reales de Kaggle y casos de estudio actuales.

---

## 📊 Resumen de Exploraciones

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #9B6BB4 0%, #7B4B94 100%); padding: 1.5rem; border-radius: 12px; text-align: center; color: white; box-shadow: 0 4px 12px rgba(123, 75, 148, 0.3);">
<div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.3rem;">3</div>
<div style="font-size: 1rem; opacity: 0.95;">Exploraciones<br/>Completadas</div>
</div>

<div style="background: linear-gradient(135deg, #B08BC8 0%, #9B6BB4 100%); padding: 1.5rem; border-radius: 12px; text-align: center; color: white; box-shadow: 0 4px 12px rgba(155, 107, 180, 0.3);">
<div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.3rem;">3</div>
<div style="font-size: 1rem; opacity: 0.95;">Datasets<br/>Analizados</div>
</div>

<div style="background: linear-gradient(135deg, #7B4B94 0%, #5B2B74 100%); padding: 1.5rem; border-radius: 12px; text-align: center; color: white; box-shadow: 0 4px 12px rgba(91, 43, 116, 0.3);">
<div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.3rem;">15+</div>
<div style="font-size: 1rem; opacity: 0.95;">Técnicas<br/>Aplicadas</div>
</div>

<div style="background: linear-gradient(135deg, #9C27B0 0%, #7B4B94 100%); padding: 1.5rem; border-radius: 12px; text-align: center; color: white; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3);">
<div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.3rem;">20+</div>
<div style="font-size: 1rem; opacity: 0.95;">Gráficos<br/>Creados</div>
</div>

</div>

---

## 📊 Proyectos de Exploración

### 📱 Social Media & Mental Health - Análisis Exploratorio de Comportamiento Digital

**Dataset:** Social Media and Mental Health Dataset (Kaggle) - Datos de estudiantes universitarios sobre uso de redes sociales y salud mental. Incluye tiempo de uso diario, plataformas preferidas (Instagram, TikTok, Facebook, Twitter, Snapchat), indicadores de bienestar psicológico (depresión, ansiedad, autoestima) y datos demográficos.

#### 🎯 Objetivos del Análisis

- **Investigar** correlaciones entre tiempo en redes sociales y salud mental
- **Identificar** plataformas con mayor impacto en bienestar psicológico
- **Detectar** grupos de riesgo según patrones de uso
- **Visualizar** tendencias y distribuciones demográficas
- **Extraer** insights accionables sobre comportamiento digital

#### 💻 Stack Tecnológico

<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0;">
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Python 3.8+</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Pandas</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">NumPy</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Seaborn</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Matplotlib</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Análisis Estadístico</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">EDA</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Kaggle Hub</span>
</div>

#### 🔗 Recursos

**[📄 Ver Reporte Completo →](./portfolio/extra-social-media.md)**  
**[📓 Descargar Notebook →](./portfolio/assets/social-media/Practica03_Social_Media_Mental_Health.ipynb)**


---

### 💳 Credit Card Fairness - Detección y Mitigación de Sesgo en Aprobaciones Crediticias


**Dataset:** Credit Card Approval Dataset (Kaggle) - 438,857 solicitudes de crédito con datos demográficos (género, edad, nivel educativo, estado civil) y financieros (ingresos, empleo, historial crediticio). Dataset con desbalance significativo: 68% mujeres vs 32% hombres.

#### 🎯 Objetivos del Análisis

- **Detectar** sesgo demográfico en decisiones de aprobación de crédito
- **Cuantificar** disparidades entre grupos protegidos con métricas de fairness
- **Evaluar** impacto del sesgo en precisión del modelo (accuracy, precision, recall)
- **Experimentar** con técnicas de mitigación (ExponentiatedGradient + DemographicParity)
- **Analizar** trade-offs entre accuracy y fairness en contexto regulatorio

#### 💻 Stack Tecnológico

<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0;">
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Fairlearn 0.10+</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Scikit-learn 1.3+</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Python 3.8+</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Pandas</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">NumPy</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Random Forest</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">ExponentiatedGradient</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Ética en IA</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Compliance Legal</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Kaggle Hub</span>
</div>

#### 🔗 Recursos

**[📄 Ver Reporte Completo →](./portfolio/extra-credit-card.md)**  
**[📓 Descargar Notebook →](./portfolio/assets/credit-card/Practica_Extra_UT2_Credit_Fairness.ipynb)**

---

### 🛒 Retail Rocket - PCA y Feature Selection en E-Commerce

**Dataset:** Retail Rocket E-commerce Dataset (Kaggle) - 2.7M+ eventos de comportamiento de usuarios en una plataforma de e-commerce durante 4.5 meses. Incluye views, add-to-cart y transactions de 1.4M usuarios únicos sobre 235K productos.

#### 🎯 Objetivos del Análisis

- **Transformar** eventos granulares en features agregadas por usuario
- **Aplicar** PCA para reducción dimensional y análisis de varianza
- **Comparar** Filter Methods (F-test, Mutual Information) vs Wrapper Methods (RFE)
- **Evaluar** trade-off entre complejidad del modelo y performance predictiva
- **Identificar** features más predictivas para conversión en e-commerce

#### 💻 Stack Tecnológico

<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0;">
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Python 3.8+</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Scikit-learn</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">PCA</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">RFE</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Random Forest</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Pandas</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Feature Engineering</span>
  <span style="background: #f3e5f5; color: #7B4B94; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">Kaggle Hub</span>
</div>

#### 🔗 Recursos

**[📄 Ver Reporte Completo →](./portfolio/extra-retail-rocket.md)**  
**[📓 Descargar Notebook →](./portfolio/assets/retail-rocket/retail_rocket_pca_feature_selection.ipynb)**

---

## 🎓 Relación con el Curso

Estas exploraciones se alinean directamente con las unidades temáticas del curso de **Ingeniería de Datos** de la Universidad Católica del Uruguay:

| Exploración | Unidad Relacionada | Temas Aplicados | Habilidades Demostradas |
|-------------|-------------------|-----------------|------------------------|
| **Social Media & Mental Health** | UT1 - Análisis Exploratorio | EDA, Visualización, Estadística Descriptiva, Correlaciones | Análisis de datos, storytelling con visualizaciones |
| **Credit Card Fairness** | UT2 - Calidad & Ética | Fairness Audit, Bias Detection, Ethical AI, Compliance | Machine Learning ético, métricas de fairness, regulación |
| **Retail Rocket PCA** | UT3 - Feature Engineering | PCA, Feature Selection, RFE, Filter Methods | Reducción dimensional, selección de variables, modelado predictivo |

---

## 🔗 Navegación Rápida

[← Volver a Inicio](./index.md) | [Ver UT1 →](./ut1-apuntes.md) | [Ver UT2 →](./ut2-apuntes.md) | [Ver Proyectos →](./portfolio/index.md)
