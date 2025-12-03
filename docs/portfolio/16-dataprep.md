# Cloud Dataprep: Transformación Visual de Datos

**Práctica 16 - Pipeline ETL con Alteryx Designer Cloud**  
**UT5: Pipelines ETL en la Nube | Google Cloud Skills Boost**

> 📚 **Tiempo estimado de lectura:** ~25 min  
> - **Autora:** Milagros Cancela  
> - **Fecha:** Diciembre 2024  
> - **Código del Lab:** GSP430  
> - **Nivel:** Intermedio  
> - **Duración del Lab:** ~60 minutos  
> - **Partner:** Alteryx Designer Cloud (Trifacta)

---

## 🎯 Objetivos del Lab

Este laboratorio proporciona experiencia práctica con Cloud Dataprep (Alteryx Designer Cloud), una herramienta de preparación visual de datos que permite limpiar, transformar y enriquecer datos sin programación como parte de pipelines ETL automatizados.

**Objetivos específicos**:

- Conectar datasets de BigQuery a Cloud Dataprep
- Explorar calidad y estructura de datos mediante interfaz visual
- Crear pipelines de transformación de datos estructurados
- Ejecutar jobs de transformación con salida a BigQuery
- Aplicar técnicas de limpieza, filtrado y enriquecimiento de datos

---

## 🔍 Contexto y Caso de Uso

### Dataset: Google Analytics Ecommerce

El laboratorio utiliza un dataset real de Google Analytics del [Google Merchandise Store](https://shop.googlemerchandisestore.com/), conteniendo millones de registros de sesiones de usuarios. Para este lab se trabaja con aproximadamente 56,000 registros correspondientes a un día de datos (1 de agosto de 2017).

**Objetivo de negocio**: Crear una tabla de reporting que contenga únicamente sesiones que generaron ingresos, con campos limpios, enriquecidos y listos para análisis.

### Arquitectura del Pipeline

```
┌─────────────────────┐
│   BigQuery Source   │
│ (all_sessions_raw)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Cloud Dataprep     │
│  Transformations    │
│  - Cleaning         │
│  - Filtering        │
│  - Enrichment       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ BigQuery Output     │
│ (revenue_reporting) │
└─────────────────────┘
```

**Relevancia para Data Engineering**: Cloud Dataprep permite a analistas de datos realizar transformaciones complejas sin código, democratizando la preparación de datos y reduciendo la dependencia de equipos de ingeniería para tareas exploratorias y de limpieza.

---

## 🛠️ Conceptos Técnicos Clave

### 1. Cloud Dataprep (Alteryx Designer Cloud)

**Características principales**:

- **Interfaz visual**: Transformaciones mediante UI drag-and-drop
- **Inferencia automática de tipos**: Detección inteligente de tipos de datos
- **Sugerencias contextuales**: Recomendaciones basadas en patrones detectados
- **Perfilado de datos**: Análisis estadístico y de calidad automático
- **Escalabilidad**: Ejecución en Dataflow (Apache Beam) para datasets grandes

### 2. Componentes de Dataprep

| Componente | Descripción |
|-----------|-------------|
| **Flow** | Contenedor organizacional de datasets y transformaciones |
| **Dataset** | Fuente de datos (BigQuery, Cloud Storage, etc.) |
| **Recipe** | Secuencia ordenada de pasos de transformación |
| **Job** | Ejecución del recipe sobre el dataset completo |
| **Sample** | Subconjunto de datos para diseño y preview de transformaciones |

### 3. Tipos de Transformaciones Aplicadas

En este lab se implementan las siguientes categorías de transformaciones:

- **Type conversion**: Cambio de tipos de datos (String, Integer, Decimal)
- **Column operations**: Delete, merge, calculate
- **Row filtering**: Keep/delete rows basado en condiciones
- **Deduplication**: Eliminación de registros duplicados
- **Calculated fields**: Creación de nuevas columnas mediante fórmulas
- **Conditional logic**: Case statements para enriquecimiento de datos

---

## 📝 Proceso de Implementación

### Task 1: Configuración Inicial de Dataprep

**1. Activación del servicio**

```bash
gcloud beta services identity create --service=dataprep.googleapis.com
```

Esta configuración crea una identidad de servicio necesaria para que Dataprep acceda a recursos de GCP.

**2. Acceso a Dataprep**

```
Navigation menu → View All Products → Analytics → Alteryx Designer Cloud
```

**3. Aceptación de términos**

- Google Dataprep Terms of Service
- Compartir información de cuenta con Alteryx
- Autorizar acceso de Alteryx al proyecto
- Alteryx Terms of Service

**Implicación de seguridad**: Dataprep requiere permisos amplios (acceso a BigQuery, Cloud Storage) por lo que es importante entender las políticas de datos de Alteryx en ambientes productivos.

### Task 2: Preparación de Dataset en BigQuery

**1. Creación de dataset**

```sql
-- Crear dataset para alojar datos
CREATE DATASET ecommerce;
```

**2. Importación de datos**

```sql
#standardSQL
CREATE OR REPLACE TABLE ecommerce.all_sessions_raw_dataprep
OPTIONS(
  description="Raw data from analyst team to ingest into Cloud Dataprep"
) AS
SELECT * FROM `data-to-insights.ecommerce.all_sessions_raw`
WHERE date = '20170801'; -- limitado a 1 día: ~56k rows
```

**Decisión de diseño**: Se limita a un día de datos para facilitar la exploración y reducir tiempos de procesamiento en el lab. En producción, se procesarían datasets completos con particionamiento por fecha.

### Task 3: Conexión BigQuery → Dataprep

**1. Creación de Flow**

```
Name: Ecommerce Analytics Pipeline
Description: Revenue reporting table
```

Un Flow actúa como contenedor organizacional, similar a un proyecto o workspace.

**2. Importación de dataset**

```
Add Dataset → Import Datasets → BigQuery
→ Select: ecommerce dataset
→ Select table: all_sessions_raw_dataprep
→ Import & Add to Flow
```

**3. Inicio de Recipe**

```
Click Recipe icon → Edit Recipe
```

Dataprep carga un **sample** del dataset (~12,000 rows de 56,000 totales) para diseñar transformaciones de forma interactiva.

---

## 🔬 Task 4: Exploración de Datos (Data Profiling)

### Análisis Estructural

**Dimensiones del dataset**:

- **Columnas**: 32 campos
- **Filas (sample)**: ~12,000 registros
- **Filas (total)**: ~56,000 registros

### Análisis de Campos Clave

#### 1. **channelGrouping**

- **Valor más común**: Referral
- **Interpretación**: La mayoría de tráfico proviene de sitios referentes (otros sitios que enlazan al ecommerce)
- **Tipos de canales**: Organic Search, Direct, Social, Paid Search, Referral, Display

#### 2. **country**

- **Top 3 países**: United States, India, United Kingdom
- **Implicación**: Audiencia principalmente angloparlante

#### 3. **totalTransactionRevenue**

- **Observación crítica**: Amplia barra gris en histograma
- **Significado**: Alta proporción de valores NULL/missing
- **Interpretación de negocio**: La mayoría de sesiones no generan revenue (usuarios navegando sin comprar)

#### 4. **timeOnSite**

- **Máximo**: 5,561 segundos (~92 minutos)
- **Distribución**: Sesgada hacia valores bajos
- **Nota**: Precaución al calcular promedios (posible doble conteo por sesión)

#### 5. **pageviews**

- **Máximo**: 155 páginas
- **Distribución**: Mayoría de sesiones con pocas páginas vistas

#### 6. **sessionQualityDim**

- **Rango**: 0-97
- **Máximo**: 97
- **Distribución**: Sesgada hacia valores bajos (sesiones de baja calidad)
- **Interpretación**: Métrica de Google Analytics sobre probabilidad de conversión

#### 7. **date**

- **Rango**: 8/1/2017 (un solo día)
- **Formato**: YYYYMMDD

#### 8. **productSKU**

- **Issue detectado**: Barra roja en histograma
- **Problema**: Type mismatch - Dataprep infirió Integer pero hay valores String
- **Realidad**: SKUs son identificadores que pueden contener letras (e.g., "GGOEGOCD078399")
- **Solución**: Convertir columna a String type

#### 9. **v2ProductName**

- **Productos populares**: Nest products (termostatos, cámaras)

#### 10. **v2ProductCategory**

- **Categoría más común**: "(not set)" - 80%+ de productos sin categoría definida
- **Implicación**: Problema de calidad de datos en tracking

#### 11. **type**

- **Valores**: PAGE, EVENT
- **Distribución**: Mayoría PAGE
- **Interpretación**: 
  - PAGE: Visualización de página
  - EVENT: Eventos específicos (click producto, add to cart)
- **Implicación para análisis**: Filtrar por tipo para evitar doble conteo

#### 12. **productQuantity**

- **Máximo**: 100 unidades
- **Significado**: Cantidad de producto añadido al carrito en una acción

#### 13. **currencyCode**

- **Valor dominante**: USD (United States Dollar)

#### 14. **itemQuantity & itemRevenue**

- **Observación**: Todos los valores son NULL
- **Decisión**: Columnas deprecadas, se eliminarán
- **Alternativas**: Usar `productQuantity` y `productRevenue`

#### 15. **transactionId**

- **Valores válidos**: ~4.6%
- **Interpretación de negocio**: **Tasa de conversión del sitio = 4.6%**
- **Insight clave**: Solo 4.6% de visitantes completan una transacción

#### 16. **eCommerceAction_type**

- **Valores**: 7 tipos encontrados (0-8)
- **Valor más común**: 0 (Unknown)
- **Mapeo** (según [schema de GA](https://support.google.com/analytics/answer/3437719)):

| Código | Acción |
|--------|--------|
| 0 | Unknown |
| 1 | Click through of product lists |
| 2 | Product detail views |
| 3 | Add product(s) to cart |
| 4 | Remove product(s) from cart |
| 5 | Check out |
| 6 | **Completed purchase** |
| 7 | Refund of purchase |
| 8 | Checkout options |

**Insight**: La mayoría de acciones son "Unknown" porque los usuarios solo navegan sin interacciones específicas.

---

## 🧹 Task 5: Limpieza de Datos (Data Cleaning)

### Transformación 1: Corrección de Tipo de `productSKU`

**Problema detectado**: Type mismatch - algunos SKUs contienen letras

**Solución implementada**:

```
Column menu (⋮) → Change type → String
```

**Verificación en Recipe**:

```
Change column type to String (productSKU)
```

### Transformación 2: Eliminación de Columnas Deprecadas

**Columnas a eliminar**: `itemQuantity`, `itemRevenue` (100% NULL values)

**Proceso**:

```
itemQuantity column menu → Delete
itemRevenue column menu → Delete
```

**Recipe steps**:

```
Delete column itemQuantity
Delete column itemRevenue
```

**Justificación**: Prevenir confusión para usuarios del reporte. Usar alternativas válidas (`productQuantity`, `productRevenue`).

### Transformación 3: Deduplicación de Registros

**Problema reportado**: Posibles duplicados en fuente

**Solución**:

```
Filter rows icon → Remove duplicate rows → Add
```

**Recipe step**:

```
Remove duplicate rows
```

**Nota técnica**: Esta operación identifica y elimina filas completamente idénticas basándose en todas las columnas.

### Transformación 4: Filtrado de Sesiones sin Revenue

**Objetivo de negocio**: Tabla final debe contener SOLO sesiones que generaron ingresos

**Proceso visual**:

1. Click en barra gris (missing values) de `totalTransactionRevenue`
2. Todas las filas sin revenue se destacan en rojo
3. En panel de Suggestions: "Delete rows" → Add

**Recipe step**:

```
Delete rows where totalTransactionRevenue is NULL
```

**Impacto**: Dataset se reduce drásticamente (~95.4% de filas eliminadas) quedando solo sesiones con transacciones.

### Transformación 5: Filtrado por Tipo de Hit

**Objetivo**: Mantener solo hits de tipo PAGE para evitar doble conteo

**Proceso visual**:

1. Click en barra "PAGE" del histograma de columna `type`
2. Filas de tipo PAGE se destacan en verde
3. En panel de Suggestions: "Keep rows" → Add

**Recipe step**:

```
Keep rows where type == 'PAGE'
```

**Justificación técnica**: Un usuario puede tener múltiples tipos de hits en la misma sesión (PAGE + múltiples EVENTs). Filtrar por PAGE evita contar la misma sesión múltiples veces.

---

## 📈 Task 6: Enriquecimiento de Datos (Data Enrichment)

### Enriquecimiento 1: Creación de ID Único de Sesión

**Problema identificado**: No existe campo único para identificar sesiones

**Análisis del schema**:

- `visitId`: Único POR usuario, NO globalmente único
- `fullVisitorId`: Identifica al usuario
- **Solución**: Combinar ambos para crear ID único global

**Implementación**:

```
Toolbar → Merge columns
Columns: fullVisitorId, visitId
Separator: -
New column name: unique_session_id
→ Add
```

**Recipe step**:

```
Merge columns fullVisitorId and visitId 
  with separator '-' 
  into unique_session_id
```

**Resultado**:

```
unique_session_id = "1234567890.9876543210-1501596000"
```

**Implicación**: En labs posteriores se verificará si cada fila representa una sesión única o granularidad mayor.

### Enriquecimiento 2: Case Statement para eCommerce Action Label

**Problema**: Códigos numéricos (0-8) no son interpretables por usuarios finales

**Solución**: Crear columna descriptiva con nombres de acciones

**Implementación**:

```
Toolbar → Conditions → Case on single column
Column to evaluate: eCommerceAction_type
Add 8 cases (total 9 including default)
```

**Mapeo completo**:

| Comparison (type) | New value (label) |
|-------------------|-------------------|
| 0 | 'Unknown' |
| 1 | 'Click through of product lists' |
| 2 | 'Product detail views' |
| 3 | 'Add product(s) to cart' |
| 4 | 'Remove product(s) from cart' |
| 5 | 'Check out' |
| 6 | 'Completed purchase' |
| 7 | 'Refund of purchase' |
| 8 | 'Checkout options' |

**Nueva columna**: `eCommerceAction_label`

**Recipe step**:

```
Create new column eCommerceAction_label:
  CASE
    WHEN eCommerceAction_type == 0 THEN 'Unknown'
    WHEN eCommerceAction_type == 1 THEN 'Click through of product lists'
    ...
  END
```

**Beneficio**: Usuarios del reporte pueden entender directamente qué acción realizó el usuario sin consultar documentación.

### Enriquecimiento 3: Ajuste de Escala en Revenue

**Problema detectado**: Según [schema de Google Analytics](https://support.google.com/analytics/answer/3437719), `totalTransactionRevenue` está multiplicado por 10^6

**Ejemplo**:

- Valor real: $2.40
- Valor en dataset: 2,400,000

**Solución**:

```
totalTransactionRevenue column menu (⋮) 
→ Calculate → Custom formula
Formula: DIVIDE(totalTransactionRevenue, 1000000)
New column name: totalTransactionRevenue1
→ Add
```

**Recipe steps**:

```
1. Create column totalTransactionRevenue1:
   DIVIDE(totalTransactionRevenue, 1000000)
2. Change type to Decimal (totalTransactionRevenue1)
```

**Resultado**:

- `totalTransactionRevenue` = 2400000 (valor original)
- `totalTransactionRevenue1` = 2.40 (valor ajustado)

**Nota**: Se mantiene columna original por trazabilidad, en producción se podría reemplazar.

---

## 🎯 Task 7: Ejecución del Pipeline

### Revisión Final del Recipe

El recipe completo incluye los siguientes pasos en orden:

```
1. Change type to String (productSKU)
2. Delete column (itemQuantity)
3. Delete column (itemRevenue)
4. Remove duplicate rows
5. Delete rows where totalTransactionRevenue is NULL
6. Keep rows where type == 'PAGE'
7. Merge columns (fullVisitorId + visitId → unique_session_id)
8. Create eCommerceAction_label (CASE statement)
9. Calculate totalTransactionRevenue1 (DIVIDE by 1000000)
10. Change type to Decimal (totalTransactionRevenue1)
```

### Configuración de Ejecución

**1. Inicio de Job**

```
Click: Run
```

**2. Configuración de Ambiente**

```
Running Environment: Dataflow + BigQuery
```

**Nota técnica**: Cloud Dataprep usa **Cloud Dataflow** (implementación de Apache Beam) como motor de ejecución para procesar datasets a escala.

**3. Configuración de Output**

```
Publishing Actions → Edit (Create-CSV)
→ Change to: BigQuery
→ Select dataset: ecommerce
→ Create new table: revenue_reporting
→ Drop the table every run (para idempotencia)
→ Update
```

**4. Ejecución**

```
Click: RUN
```

### Validación de Resultados

**En BigQuery**:

1. Refresh página de BigQuery
2. Verificar existencia de tabla `ecommerce.revenue_reporting`
3. Validar schema y primeras filas
4. Confirmar conteo de registros

**Datos esperados**:

- Registros: ~2,600 (4.6% de 56,000 original)
- Solo sesiones con transacciones completas
- Campos limpios y enriquecidos
- Revenue en escala correcta

---

## 💡 Insights y Mejores Prácticas

### Ventajas de Cloud Dataprep

**Pros**:

- **No-code/Low-code**: Accesible para analistas sin experiencia en programación
- **Exploración visual**: Histogramas y estadísticas automáticas
- **Sugerencias inteligentes**: Recomendaciones contextuales de transformaciones
- **Escalabilidad**: Dataflow maneja millones/billones de registros
- **Iterativo**: Diseño rápido con samples, ejecución sobre datos completos después
- **Auditable**: Recipe documenta todas las transformaciones aplicadas

**Consideraciones**:

- Dependencia de tercero (Alteryx) - implicaciones de seguridad/privacidad
- Menos flexible que código Python/SQL para lógica muy compleja
- Costo adicional por encima de BigQuery + Dataflow

### Principios de Data Quality Aplicados

1. **Consistency**: Corrección de tipos de datos (productSKU → String)
2. **Completeness**: Filtrado de registros con campos críticos NULL
3. **Uniqueness**: Deduplicación de registros y creación de unique ID
4. **Validity**: Filtrado de tipo de hit correcto (PAGE vs EVENT)
5. **Accuracy**: Ajuste de escala de revenue a valores reales
6. **Interpretability**: Enriquecimiento con labels descriptivos

### Patrón ETL Implementado

```
EXTRACT:
  - Source: BigQuery (data-to-insights.ecommerce.all_sessions_raw)
  - Scope: Single day (20170801) → 56k records

TRANSFORM (Cloud Dataprep):
  - Type corrections
  - Column deletions
  - Deduplication
  - Row filtering (NULL revenue, PAGE type)
  - Field enrichment (unique_session_id, action_label)
  - Calculated fields (revenue scaling)

LOAD:
  - Target: BigQuery (ecommerce.revenue_reporting)
  - Mode: Overwrite (drop and recreate)
  - Records: ~2,600 (transactional sessions only)
```

---

## 🎓 Conclusiones

### Competencias Desarrolladas

Este lab proporciona experiencia práctica en:

- **Integración BigQuery ↔ Dataprep**: Ingesta y output en data warehouse
- **Data profiling**: Análisis exploratorio de calidad y estructura
- **Data cleaning**: Limpieza sistemática de inconsistencias
- **Data transformation**: Filtrado, enriquecimiento y cálculos
- **Pipeline orchestration**: Diseño y ejecución de flujos ETL
- **Business logic**: Traducción de requerimientos a transformaciones

### Aplicabilidad en Proyectos Reales

**Casos de uso similares**:

- Preparación de datos de analytics para dashboards
- Limpieza de datasets de CRM para modelos ML
- Enriquecimiento de logs de aplicación para análisis
- Consolidación de múltiples fuentes para reporting

**Escalamiento a producción**:

- Automatización: Dataprep puede programar ejecuciones periódicas
- Parametrización: Filtros de fecha y condiciones configurables
- Monitoreo: Logs de Dataflow para troubleshooting
- Validación: Data quality checks post-transformación

### Lecciones Clave para Data Engineering

1. **Visual tools democratizan data prep**: Analistas pueden ser autoservicio sin depender de ingeniería para cada transformación
2. **Schema understanding is critical**: Conocer metadatos (como la multiplicación x10^6 del revenue) previene errores graves
3. **Sampling accelera iteración**: Diseñar con subsets permite probar rápido, ejecutar sobre datos completos después
4. **Documentation via recipes**: El recipe auto-documenta la lógica de transformación, facilitando revisión y reproducibilidad
5. **Trade-offs**: Simplicidad/velocidad vs. costo/dependencia de terceros

### Próximos Pasos

Para expandir este conocimiento:

- **Profundizar en Dataflow**: Entender Apache Beam para pipelines más complejos
- **Comparar con alternativas**: dbt, Dataform, Apache Spark para mismo caso de uso
- **Implementar en Python**: Replicar transformaciones con pandas/BigQuery SQL
- **Productionize**: Configurar scheduling, alerting, data quality tests
- **Explorar ML**: Usar `revenue_reporting` table para modelos de propensión a compra

---

## 📚 Referencias Técnicas

**Documentación**:

- [Cloud Dataprep Documentation](https://cloud.google.com/dataprep/docs)
- [Alteryx Designer Cloud](https://www.alteryx.com/products/designer-cloud)
- [Google Analytics Schema Reference](https://support.google.com/analytics/answer/3437719)
- [BigQuery Documentation](https://cloud.google.com/bigquery/docs)
- [Cloud Dataflow (Apache Beam)](https://cloud.google.com/dataflow/docs)

**Dataset**:

- [Google Analytics Sample Dataset for BigQuery](https://www.en.advertisercommunity.com/t5/Articles/Introducing-the-Google-Analytics-Sample-Dataset-for-BigQuery/ba-p/1676331)
- [Google Merchandise Store](https://shop.googlemerchandisestore.com/)

**Conceptos relacionados**:

- ETL vs ELT patterns
- Data quality frameworks
- Apache Beam programming model
- Schema-on-read vs schema-on-write

---

## 📊 Resumen de Transformaciones

| # | Tipo | Operación | Input | Output | Justificación |
|---|------|-----------|-------|--------|---------------|
| 1 | Type | String conversion | productSKU (mixed) | productSKU (String) | SKUs contienen letras |
| 2 | Clean | Delete column | itemQuantity | - | 100% NULL values |
| 3 | Clean | Delete column | itemRevenue | - | 100% NULL values |
| 4 | Clean | Deduplicate | All columns | Unique rows | Eliminar duplicados |
| 5 | Filter | Delete NULL rows | totalTransactionRevenue | Only valid revenue | Solo sesiones con venta |
| 6 | Filter | Keep rows | type == 'PAGE' | Only PAGE hits | Evitar doble conteo |
| 7 | Enrich | Merge columns | fullVisitorId + visitId | unique_session_id | Crear ID único global |
| 8 | Enrich | Case statement | eCommerceAction_type | eCommerceAction_label | Descriptive labels |
| 9 | Calculate | Division | totalTransactionRevenue / 1M | totalTransactionRevenue1 | Escala correcta |
| 10 | Type | Decimal conversion | totalTransactionRevenue1 | Decimal type | Precisión numérica |

---

**Fecha de realización:** Diciembre 2025  
**Programa:** Ingeniería en IA y Ciencia de Datos  
**Curso:** UT5 - Pipelines ETL en la Nube  
**Institución:** Universidad Católica del Uruguay

