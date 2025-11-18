# 🚀 Exploraciones Extra: Investigando Más Allá del Curso

Esta sección presenta exploraciones adicionales realizadas de forma autónoma para profundizar en técnicas de Data Science y Machine Learning Ético. Cada análisis complementa las unidades temáticas del curso con datasets reales de Kaggle y casos de estudio actuales.

---

<div class="flex flex-wrap gap-2" style="justify-content: center; margin: 2rem 0;">

<div class="metric-card" style="text-align: center;">
<div class="metric-value">2</div>
<h4>Exploraciones Completadas</h4>
</div>

<div class="metric-card" style="text-align: center;">
<div class="metric-value">440K+</div>
<h4>Registros Analizados</h4>
</div>

<div class="metric-card" style="text-align: center;">
<div class="metric-value">15+</div>
<h4>Visualizaciones Generadas</h4>
</div>

<div class="metric-card" style="text-align: center;">
<div class="metric-value">20+</div>
<h4>Métricas Calculadas</h4>
</div>

</div>

---

## 📊 Proyectos de Exploración

### 📱 Social Media & Mental Health - Análisis Exploratorio de Comportamiento Digital

<div class="project-card">

**Dataset:** Social Media and Mental Health Dataset (Kaggle) - Datos de estudiantes universitarios sobre uso de redes sociales y salud mental. Incluye tiempo de uso diario, plataformas preferidas (Instagram, TikTok, Facebook, Twitter, Snapchat), indicadores de bienestar psicológico (depresión, ansiedad, autoestima) y datos demográficos.

**Enfoque:** Análisis exploratorio completo aplicando técnicas EDA para identificar correlaciones entre patrones de uso de redes sociales y problemas de salud mental en jóvenes. Se investigaron diferencias por plataforma, grupos de edad y tiempo de exposición.

**🎯 Objetivos:** Investigar correlaciones entre tiempo en redes sociales y salud mental | Identificar plataformas con mayor impacto | Detectar grupos de riesgo | Visualizar tendencias demográficas

**🔍 Hallazgos Clave:**
- ✅ Correlaciones significativas entre uso intensivo y problemas de salud mental
- ✅ Patrones diferenciados por plataforma: Instagram y TikTok muestran mayor impacto
- ✅ Grupos de alto riesgo: Usuarios con >5 horas/día de exposición
- ✅ Diferencias demográficas: Jóvenes 18-24 años más vulnerables

**💻 Stack Tecnológico:**

<span class="skill-badge">Python 3.8+</span>
<span class="skill-badge">Pandas</span>
<span class="skill-badge">NumPy</span>
<span class="skill-badge">Seaborn</span>
<span class="skill-badge">Matplotlib</span>
<span class="skill-badge">Análisis Estadístico</span>
<span class="skill-badge">EDA</span>
<span class="skill-badge">Kaggle Hub</span>

**🔗 Recursos:**

**[📄 Ver Reporte Completo →](portfolio/extra-social-media.md)**  
**[📓 Descargar Notebook →](portfolio/assets/social-media/Practica03_Social_Media_Mental_Health.ipynb)**

</div>

---

### 💳 Credit Card Fairness - Detección y Mitigación de Sesgo en Aprobaciones Crediticias

<div class="project-card">

**Dataset:** Credit Card Approval Dataset (Kaggle) - 438,857 solicitudes de crédito con datos demográficos (género, edad, nivel educativo, estado civil) y financieros (ingresos, empleo, historial crediticio). Dataset con desbalance significativo: 68% mujeres vs 32% hombres.

**Enfoque:** Análisis ético de sistemas de aprobación de crédito aplicando técnicas de **fairness audit** con Fairlearn. Se detectó sesgo demográfico, se cuantificaron disparidades con métricas estándar (DPD, DPR, EOD) y se experimentó con mitigación usando ExponentiatedGradient.

**🎯 Objetivos:** Detectar sesgo demográfico | Cuantificar disparidades con métricas de fairness | Evaluar impacto en precisión del modelo | Experimentar con mitigación | Analizar trade-offs accuracy vs fairness

**🚨 Hallazgos Críticos:**

**Modelo Baseline:**
- 🚨 Brecha de accuracy: 8.6 puntos (H: 89.9% vs M: 81.3%)
- ⚠️ Brecha de selection rate: 5.1 puntos (H: 82.6% vs M: 77.5%)
- 📊 DPD: 0.051 (límite aceptabilidad <0.05)

**Modelo Mitigado:**
- ✅ Fairness perfecta: DPD ≈ 0.00
- ⚠️ Pérdida de accuracy: 85% → 70% (inaceptable)
- 🚫 Overcompensation: Selection rate = 100% (no viable)

**💡 Lección Clave:** Trade-off inevitable entre fairness perfecta y alta accuracy cuando grupos tienen distribuciones diferentes.

**💻 Stack Tecnológico:**

<span class="skill-badge">Fairlearn 0.10+</span>
<span class="skill-badge">Scikit-learn 1.3+</span>
<span class="skill-badge">Python 3.8+</span>
<span class="skill-badge">Pandas</span>
<span class="skill-badge">NumPy</span>
<span class="skill-badge">Random Forest</span>
<span class="skill-badge">ExponentiatedGradient</span>
<span class="skill-badge">Ética en IA</span>
<span class="skill-badge">Compliance Legal</span>
<span class="skill-badge">Kaggle Hub</span>

**📊 Visualizaciones:**

![Distribución de Aprobaciones](portfolio/assets/credit-card/distribucion-aprobaciones-y-prop-de-clases.png)

![Análisis de Fairness](portfolio/assets/credit-card/analisi-fairlearn-por-code-gender.png)

![Comparación Modelos](portfolio/assets/credit-card/comparacion-modelo-baseline-y-modelo-mitigado.png)

**🔗 Recursos:**

**[📄 Ver Reporte Completo →](portfolio/extra-credit-card.md)**  
**[📓 Descargar Notebook →](portfolio/assets/credit-card/Practica_Extra_UT2_Credit_Fairness.ipynb)**

</div>

---
