# 🌸 Resultados - Análisis del Dataset Iris

Esta página contiene todos los resultados generados durante el análisis exploratorio del dataset Iris, organizados en tres categorías principales: perfiles estadísticos, reportes detallados y visualizaciones.

## 📊 Perfiles Estadísticos

### Archivos de Perfiles
- **[cov.csv](./results/perfiles/cov.csv)** - Matriz de covarianza entre variables numéricas
- **[describe.csv](./results/perfiles/describe.csv)** - Estadísticas descriptivas (media, desviación estándar, etc.)
- **[missing_prop.csv](./results/perfiles/missing_prop.csv)** - Proporción de valores faltantes por columna
- **[missing.csv](./results/perfiles/missing.csv)** - Cantidad de valores faltantes por columna
- **[nulos.csv](./results/perfiles/nulos.csv)** - Resumen de valores nulos
- **[skew_kurt.csv](./results/perfiles/skew_kurt.csv)** - Medidas de asimetría y curtosis
- **[species_dist.csv](./results/perfiles/species_dist.csv)** - Distribución de especies en el dataset

## 📋 Reportes Detallados

### Documentación y Diccionarios
- **[data_dictionary.md](./results/reportes/data_dictionary.md)** - Diccionario de datos en formato Markdown
- **[data_dictionary.csv](./results/reportes/data_dictionary.csv)** - Diccionario de datos en formato CSV
- **[profile_iris.html](./results/reportes/profile_iris.html)** - Reporte automático generado con ydata_profiling
- **[range_check.csv](./results/reportes/range_check.csv)** - Verificación de rangos y validación de datos
- **[respuestas_negocio.md](./results/reportes/respuestas_negocio.md)** - Respuestas a las preguntas de negocio planteadas

## 🎨 Visualizaciones

### Gráficos Generados
- **[histogramas_kde_por_especie.png](./results/visualizaciones/histogramas_kde_por_especie.png)** - Distribución de variables por especie con curvas de densidad
- **[matriz_correlaciones.png](./results/visualizaciones/matriz_correlaciones.png)** - Matriz de correlaciones entre variables numéricas
- **[missing.png](./results/visualizaciones/missing.png)** - Visualización de datos faltantes por columna
- **[pairplot_por_especie.png](./results/visualizaciones/pairplot_por_especie.png)** - Gráfico de pares de variables coloreado por especie

## 🔍 Cómo Usar Estos Resultados

### Para Análisis Estadístico
1. Consulta `describe.csv` para estadísticas básicas
2. Revisa `cov.csv` y `skew_kurt.csv` para entender la distribución de los datos
3. Usa `species_dist.csv` para verificar el balance del dataset

### Para Validación de Datos
1. Verifica `missing.csv` y `missing_prop.csv` para calidad de datos
2. Consulta `range_check.csv` para validar rangos esperados
3. Revisa `nulos.csv` para identificar problemas de completitud

### Para Visualización
1. Las imágenes están optimizadas para presentaciones (300 DPI)
2. Cada visualización responde a preguntas específicas del análisis
3. Los gráficos están organizados por tipo de análisis (distribución, correlación, etc.)

### Para Documentación
1. `data_dictionary.md` proporciona contexto sobre cada variable
2. `respuestas_negocio.md` contiene insights y conclusiones del análisis
3. `profile_iris.html` es un reporte interactivo completo

## 📈 Principales Hallazgos

Basado en el análisis realizado, los principales hallazgos incluyen:

- **Correlación fuerte en pétalos**: 0.86 entre longitud y ancho
- **Correlación débil en sépalos**: -0.12 entre longitud y ancho  
- **Virginica tiene sépalos más largos** en promedio
- **Virginica muestra mayor variabilidad** en longitud de pétalos
- **Dataset perfectamente balanceado** con 33.3% de cada especie

Para más detalles, consulta el archivo `respuestas_negocio.md` en la sección de reportes.

---

*Estos resultados fueron generados como parte de la Actividad 1 del curso de Ingeniería de Datos.*

