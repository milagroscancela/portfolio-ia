


### 1. **¿Existen correlaciones fuertes entre largo y ancho dentro de pétalos o sépalos?**

**SÍ en pétalos, NO en sépalos**

- **Pétalos**: Correlación de **0.86** (muy fuerte)
  - Ver: `matriz_correlaciones.png` - celda superior derecha
  - Ver: `pairplot_por_especie.png` - panel petal_length vs petal_width
  - **Interpretación**: 96% de la varianza en pétalos se explica por la relación lineal

- **Sépalos**: Correlación de **-0.12** (muy débil)
  - Ver: `matriz_correlaciones.png` - celda superior izquierda
  - Ver: `pairplot_por_especie.png` - panel sepal_length vs sepal_width
  - **Interpretación**: Longitud y ancho de sépalos son independientes

### 2. **¿Qué especies tienen en promedio sépalos más largos?**

** Virginica > Versicolor > Setosa**

- **Virginica**: 6.59 cm (promedio)
- **Versicolor**: 5.94 cm (promedio)
- **Setosa**: 5.01 cm (promedio)

**Evidencia visual:**
- Ver: `boxplots_por_especie.png` - panel sepal_length
- Ver: `histogramas_kde_por_especie.png` - distribución sepal_length
- Ver: `pairplot_por_especie.png` - diagonal sepal_length

**Diferencia significativa**: Virginica tiene sépalos 0.8 cm más largos que setosa

### 3. **¿Hay alguna variable que muestre mayor variabilidad dentro de cada especie?**

**SÍ, longitud de pétalos en virginica**

- **Virginica**: 0.55 cm (mayor variabilidad)
- **Versicolor**: 0.47 cm (variabilidad media)
- **Setosa**: 0.17 cm (menor variabilidad)

**Evidencia visual:**
- Ver: `boxplots_por_especie.png` - panel petal_length (cajas más anchas en virginica)
- Ver: `histogramas_kde_por_especie.png` - distribución petal_length (más dispersa en virginica)
- Ver: `pairplot_por_especie.png` - diagonal petal_length (mayor rango en virginica)

**Implicación**: Virginica es más difícil de clasificar debido a su mayor variabilidad


##  Recomendaciones de Negocio

1. **Usar pétalos como variables principales** - alta correlación permite simplificar modelo
2. **Incluir sépalos para robustez** - información independiente valiosa
3. **Enfocar muestreo en virginica** - mayor variabilidad requiere más datos
4. **Considerar longitud de sépalos** - buena variable discriminante entre especies
