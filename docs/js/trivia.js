/**
 * 🎮 Trivia Data Engineer: Elige tu Aventura
 * Aplicación interactiva de trivia educativa para portfolio de Data Engineering
 * Compatible con MkDocs - Sin dependencias externas
 */

// === Estado Global de la Trivia ===
const triviaState = {
  currentNode: 'start',
  score: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  visitedNodes: [],
  startTime: null
};

// === Definición de Nodos de la Trivia ===
const trivia = {
  // === INICIO ===
  start: {
    emoji: '🚀',
    stage: 'Inicio de la Aventura',
    text: `¡Bienvenid@ a la <strong>Trivia Data Engineer</strong>! 🎮

Estás a punto de embarcarte en una aventura donde tus conocimientos de <strong>SQL</strong>, <strong>ETL</strong>, <strong>Big Data</strong> y tus habilidades como ingeniero/a de datos serán puestos a prueba.

También descubrirás detalles sobre los proyectos de este portfolio. ¿Estás list@ para el desafío?`,
    options: [
      { text: '¡Empezar la aventura! 🎯', next: 'sql_basics', icon: '▶️' },
      { text: 'Ver información del portfolio primero 📚', next: 'portfolio_intro', icon: '📖' }
    ]
  },

  // === INTRODUCCIÓN AL PORTFOLIO ===
  portfolio_intro: {
    emoji: '📊',
    stage: 'Conociendo el Portfolio',
    badge: 'personal',
    text: `Este portfolio documenta el journey en <strong>Ingeniería de Datos</strong>, incluyendo:

• <strong>11+ prácticas</strong> completadas
• <strong>8+ datasets</strong> analizados  
• <strong>50+ features</strong> engineered
• Tecnologías: <code>Python</code>, <code>Pandas</code>, <code>Scikit-learn</code>, <code>BigQuery</code>, <code>GCP</code>

¿Qué proyecto te gustaría explorar primero?`,
    options: [
      { text: 'PCA y Feature Selection 🔍', next: 'pca_question', icon: '📉' },
      { text: 'Feature Engineering Temporal ⏰', next: 'temporal_question', icon: '📅' },
      { text: 'Ir directo a las preguntas técnicas 💪', next: 'sql_basics', icon: '🎯' }
    ]
  },

  // === PREGUNTA SQL BÁSICA ===
  sql_basics: {
    emoji: '🗄️',
    stage: 'Nivel 1: SQL Fundamentals',
    badge: 'sql',
    isQuestion: true,
    text: `Estás diseñando un pipeline de datos y necesitas extraer información de una base de datos relacional.

<strong>Pregunta:</strong> ¿Cuál es la diferencia principal entre <code>WHERE</code> y <code>HAVING</code> en SQL?`,
    options: [
      { 
        text: 'WHERE filtra filas antes del GROUP BY, HAVING después', 
        next: 'sql_correct_1', 
        icon: 'A',
        correct: true 
      },
      { 
        text: 'Son sinónimos y se pueden usar indistintamente', 
        next: 'sql_wrong_1', 
        icon: 'B' 
      },
      { 
        text: 'HAVING solo funciona con funciones de agregación', 
        next: 'sql_partial_1', 
        icon: 'C' 
      }
    ]
  },

  sql_correct_1: {
    emoji: '✅',
    stage: 'Nivel 1: ¡Correcto!',
    badge: 'sql',
    isCorrect: true,
    text: `<strong>¡Excelente!</strong> Has demostrado un sólido conocimiento de SQL.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Explicación Técnica</div>
  <div class="trivia-explanation-text">
    <code>WHERE</code> filtra las filas <em>antes</em> de que se aplique el <code>GROUP BY</code>, operando sobre datos individuales. 
    <code>HAVING</code> filtra <em>después</em> del agrupamiento, permitiendo condiciones sobre resultados agregados como <code>COUNT()</code>, <code>SUM()</code>, etc.
  </div>
</div>

En los pipelines ETL de este portfolio, esta distinción es crucial para optimizar queries.`,
    options: [
      { text: 'Continuar a ETL 🔄', next: 'etl_question', icon: '➡️' },
      { text: 'Ver un ejemplo de proyecto con SQL 📊', next: 'sql_project_example', icon: '💼' }
    ]
  },

  sql_wrong_1: {
    emoji: '❌',
    stage: 'Nivel 1: Respuesta Incorrecta',
    badge: 'sql',
    isWrong: true,
    text: `<strong>No exactamente...</strong> WHERE y HAVING tienen propósitos diferentes.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 La respuesta correcta</div>
  <div class="trivia-explanation-text">
    <code>WHERE</code> filtra filas <em>antes</em> del agrupamiento, mientras que <code>HAVING</code> filtra <em>después</em> del <code>GROUP BY</code>.
    
    Ejemplo: <code>SELECT dept, COUNT(*) FROM employees WHERE salary > 50000 GROUP BY dept HAVING COUNT(*) > 5</code>
  </div>
</div>

¡No te preocupes! Cada error es una oportunidad de aprender.`,
    options: [
      { text: 'Intentar otra pregunta de SQL 🔄', next: 'sql_basics_2', icon: '🔁' },
      { text: 'Pasar a ETL 🔄', next: 'etl_question', icon: '➡️' },
      { text: 'Reiniciar la trivia 🏠', next: 'start', icon: '🏠' }
    ]
  },

  sql_partial_1: {
    emoji: '🤔',
    stage: 'Nivel 1: Parcialmente Correcto',
    badge: 'sql',
    isPartial: true,
    text: `<strong>Casi...</strong> Es cierto que HAVING se usa típicamente con agregaciones, pero la diferencia principal es el momento de filtrado.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Profundizando</div>
  <div class="trivia-explanation-text">
    La clave está en el <em>orden de ejecución</em> de SQL:
    <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</code>
    
    Por eso WHERE no puede usar alias del SELECT, pero HAVING a veces sí (dependiendo del RDBMS).
  </div>
</div>`,
    options: [
      { text: 'Continuar a ETL 🔄', next: 'etl_question', icon: '➡️' },
      { text: 'Otra pregunta SQL 🗄️', next: 'sql_basics_2', icon: '🔁' }
    ]
  },

  // === PREGUNTA SQL AVANZADA ===
  sql_basics_2: {
    emoji: '🗄️',
    stage: 'Nivel 1.5: SQL Avanzado',
    badge: 'sql',
    isQuestion: true,
    text: `En un proceso de ETL necesitas combinar datos de dos tablas. Una tabla tiene clientes y otra tiene pedidos (no todos los clientes tienen pedidos).

<strong>Pregunta:</strong> ¿Qué tipo de JOIN usarías para obtener TODOS los clientes, incluyendo los que no tienen pedidos?`,
    options: [
      { text: 'INNER JOIN', next: 'sql_wrong_2', icon: 'A' },
      { text: 'LEFT JOIN', next: 'sql_correct_2', icon: 'B', correct: true },
      { text: 'CROSS JOIN', next: 'sql_wrong_2b', icon: 'C' }
    ]
  },

  sql_correct_2: {
    emoji: '✅',
    stage: 'Nivel 1.5: ¡Perfecto!',
    badge: 'sql',
    isCorrect: true,
    text: `<strong>¡Correcto!</strong> LEFT JOIN es la respuesta.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Explicación</div>
  <div class="trivia-explanation-text">
    <code>LEFT JOIN</code> (o <code>LEFT OUTER JOIN</code>) devuelve todos los registros de la tabla izquierda (clientes) y los registros coincidentes de la derecha (pedidos). Si no hay coincidencia, los campos de pedidos serán NULL.
  </div>
</div>

Este tipo de joins son fundamentales en pipelines de datos para no perder información.`,
    options: [
      { text: 'Siguiente: ETL 🔄', next: 'etl_question', icon: '➡️' }
    ]
  },

  sql_wrong_2: {
    emoji: '❌',
    stage: 'Nivel 1.5: Incorrecto',
    badge: 'sql',
    isWrong: true,
    text: `<strong>INNER JOIN</strong> solo devuelve las filas donde hay coincidencia en ambas tablas.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Diferencia clave</div>
  <div class="trivia-explanation-text">
    Con INNER JOIN perderías a los clientes sin pedidos. 
    <code>LEFT JOIN</code> mantiene todos los clientes y pone NULL donde no hay pedidos.
  </div>
</div>`,
    options: [
      { text: 'Continuar a ETL 🔄', next: 'etl_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  sql_wrong_2b: {
    emoji: '❌',
    stage: 'Nivel 1.5: Incorrecto',
    badge: 'sql',
    isWrong: true,
    text: `<strong>CROSS JOIN</strong> genera un producto cartesiano (todas las combinaciones posibles).

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Cuidado</div>
  <div class="trivia-explanation-text">
    Un CROSS JOIN entre 1000 clientes y 5000 pedidos generaría 5,000,000 de filas. 
    La respuesta correcta es <code>LEFT JOIN</code>.
  </div>
</div>`,
    options: [
      { text: 'Continuar a ETL 🔄', next: 'etl_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  // === EJEMPLO DE PROYECTO SQL ===
  sql_project_example: {
    emoji: '💼',
    stage: 'Proyecto: Análisis Multi-fuentes',
    badge: 'personal',
    text: `En el proyecto <strong>"04-Multifuentes"</strong> de este portfolio, se integran datos de múltiples orígenes:

• Archivos <code>CSV</code> con datos transaccionales
• APIs externas con datos en tiempo real
• Bases de datos relacionales

Se utilizaron técnicas de <strong>SQL avanzado</strong> incluyendo:
- Window functions para cálculos de ranking
- CTEs (Common Table Expressions) para queries complejas
- Optimización de índices

¿Quieres continuar con preguntas de ETL?`,
    options: [
      { text: 'Sí, vamos a ETL 🔄', next: 'etl_question', icon: '➡️' },
      { text: 'Explorar Big Data primero 📊', next: 'bigdata_question', icon: '🌐' }
    ]
  },

  // === PREGUNTA ETL ===
  etl_question: {
    emoji: '🔄',
    stage: 'Nivel 2: ETL Pipelines',
    badge: 'etl',
    isQuestion: true,
    text: `Estás construyendo un pipeline ETL para procesar datos de ventas diarias. Los datos crudos contienen valores nulos y duplicados.

<strong>Pregunta:</strong> ¿En qué fase del ETL deberías manejar la limpieza de datos (nulos y duplicados)?`,
    options: [
      { text: 'Extract (Extracción)', next: 'etl_wrong_1', icon: 'E' },
      { text: 'Transform (Transformación)', next: 'etl_correct', icon: 'T', correct: true },
      { text: 'Load (Carga)', next: 'etl_wrong_2', icon: 'L' }
    ]
  },

  etl_correct: {
    emoji: '✅',
    stage: 'Nivel 2: ¡Excelente!',
    badge: 'etl',
    isCorrect: true,
    text: `<strong>¡Perfecto!</strong> La fase de Transform es donde ocurre la magia de la limpieza de datos.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Anatomía de ETL</div>
  <div class="trivia-explanation-text">
    <strong>Extract:</strong> Obtener datos crudos sin modificar<br>
    <strong>Transform:</strong> Limpieza, validación, enriquecimiento, normalización<br>
    <strong>Load:</strong> Cargar datos ya transformados al destino
  </div>
</div>

En el portfolio, el proyecto <strong>"06-Pipeline"</strong> implementa exactamente este patrón.`,
    options: [
      { text: 'Ver pregunta de Big Data 🌐', next: 'bigdata_question', icon: '➡️' },
      { text: 'Conocer más del proyecto Pipeline 📋', next: 'pipeline_project', icon: '💼' }
    ]
  },

  etl_wrong_1: {
    emoji: '❌',
    stage: 'Nivel 2: No exactamente',
    badge: 'etl',
    isWrong: true,
    text: `<strong>Extract</strong> debe obtener los datos "tal cual" están en el origen.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Principio ETL</div>
  <div class="trivia-explanation-text">
    La extracción debe ser lo más "pura" posible. Si filtras datos en Extract, podrías perder información importante para análisis posteriores. La limpieza pertenece a <strong>Transform</strong>.
  </div>
</div>`,
    options: [
      { text: 'Continuar a Big Data 🌐', next: 'bigdata_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  etl_wrong_2: {
    emoji: '❌',
    stage: 'Nivel 2: Incorrecto',
    badge: 'etl',
    isWrong: true,
    text: `<strong>Load</strong> debería recibir datos ya limpios y listos.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Best Practice</div>
  <div class="trivia-explanation-text">
    Cargar datos sucios al destino puede causar problemas de calidad, duplicados en el data warehouse, y errores en reportes. Siempre limpia en <strong>Transform</strong> antes de cargar.
  </div>
</div>`,
    options: [
      { text: 'Continuar a Big Data 🌐', next: 'bigdata_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  // === PROYECTO PIPELINE ===
  pipeline_project: {
    emoji: '⚡',
    stage: 'Proyecto: Pipeline ETL',
    badge: 'personal',
    text: `El proyecto <strong>"06-Pipeline"</strong> demuestra un pipeline completo:

<strong>Tecnologías utilizadas:</strong>
• <code>Python</code> con <code>Pandas</code> para transformaciones
• <code>SQLAlchemy</code> para conexiones a BD
• Logging y manejo de errores robusto

<strong>Características:</strong>
• Validación de schemas de entrada
• Transformaciones encadenables
• Idempotencia en cargas

¿Listo para el siguiente nivel?`,
    options: [
      { text: 'Vamos a Big Data 🌐', next: 'bigdata_question', icon: '➡️' }
    ]
  },

  // === PREGUNTA BIG DATA ===
  bigdata_question: {
    emoji: '🌐',
    stage: 'Nivel 3: Big Data',
    badge: 'bigdata',
    isQuestion: true,
    text: `Trabajas con un dataset de 500GB que no cabe en memoria. Necesitas procesar los datos de manera distribuida.

<strong>Pregunta:</strong> ¿Cuál de estas herramientas está diseñada específicamente para procesamiento distribuido de Big Data?`,
    options: [
      { text: 'Microsoft Excel', next: 'bigdata_wrong_1', icon: 'A' },
      { text: 'Apache Spark', next: 'bigdata_correct', icon: 'B', correct: true },
      { text: 'SQLite', next: 'bigdata_wrong_2', icon: 'C' }
    ]
  },

  bigdata_correct: {
    emoji: '✅',
    stage: 'Nivel 3: ¡Brillante!',
    badge: 'bigdata',
    isCorrect: true,
    text: `<strong>¡Exacto!</strong> Apache Spark es el rey del procesamiento distribuido.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Apache Spark</div>
  <div class="trivia-explanation-text">
    Spark puede procesar datos en memoria de manera distribuida a través de un cluster. Soporta:
    <br>• <strong>Spark SQL</strong> para queries
    <br>• <strong>MLlib</strong> para Machine Learning
    <br>• <strong>Structured Streaming</strong> para datos en tiempo real
  </div>
</div>

En este portfolio se explora GCP con BigQuery, que usa conceptos similares de procesamiento distribuido.`,
    options: [
      { text: 'Pregunta sobre GCP 🌐', next: 'gcp_question', icon: '➡️' },
      { text: 'Ver proyectos de Feature Engineering 🔧', next: 'pca_question', icon: '💼' }
    ]
  },

  bigdata_wrong_1: {
    emoji: '😅',
    stage: 'Nivel 3: Hmm...',
    badge: 'bigdata',
    isWrong: true,
    text: `<strong>Excel</strong> es excelente para análisis pequeños, pero tiene un límite de ~1 millón de filas.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Límites de Excel</div>
  <div class="trivia-explanation-text">
    Excel 2019+: Máximo 1,048,576 filas y 16,384 columnas. Para 500GB de datos, necesitas herramientas como <strong>Apache Spark</strong>, <strong>BigQuery</strong>, o <strong>Dask</strong>.
  </div>
</div>`,
    options: [
      { text: 'Continuar 🌐', next: 'gcp_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  bigdata_wrong_2: {
    emoji: '❌',
    stage: 'Nivel 3: No del todo',
    badge: 'bigdata',
    isWrong: true,
    text: `<strong>SQLite</strong> es una base de datos embebida, ideal para aplicaciones locales, pero no para Big Data distribuido.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 SQLite vs Spark</div>
  <div class="trivia-explanation-text">
    SQLite corre en un solo archivo, en un solo servidor. Para 500GB necesitas procesamiento distribuido como <strong>Apache Spark</strong> que divide el trabajo entre múltiples nodos.
  </div>
</div>`,
    options: [
      { text: 'Continuar 🌐', next: 'gcp_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  // === PREGUNTA GCP ===
  gcp_question: {
    emoji: '☁️',
    stage: 'Nivel 4: Cloud (GCP)',
    badge: 'bigdata',
    isQuestion: true,
    text: `En Google Cloud Platform, estás configurando un pipeline de datos. Necesitas un servicio serverless para ejecutar queries SQL sobre grandes volúmenes de datos.

<strong>Pregunta:</strong> ¿Qué servicio de GCP usarías?`,
    options: [
      { text: 'Cloud Storage', next: 'gcp_wrong_1', icon: 'A' },
      { text: 'BigQuery', next: 'gcp_correct', icon: 'B', correct: true },
      { text: 'Compute Engine', next: 'gcp_wrong_2', icon: 'C' }
    ]
  },

  gcp_correct: {
    emoji: '✅',
    stage: 'Nivel 4: ¡Impresionante!',
    badge: 'bigdata',
    isCorrect: true,
    text: `<strong>¡Correcto!</strong> BigQuery es el data warehouse serverless de Google.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 BigQuery Highlights</div>
  <div class="trivia-explanation-text">
    • <strong>Serverless:</strong> No necesitas administrar infraestructura
    <br>• <strong>Petabyte-scale:</strong> Procesa enormes volúmenes
    <br>• <strong>SQL estándar:</strong> Usa ANSI SQL
    <br>• <strong>ML integrado:</strong> BigQuery ML para modelos
  </div>
</div>

En el proyecto <strong>"15-GCP-Intro"</strong> y <strong>"16-Dataprep"</strong> se exploran estas herramientas.`,
    options: [
      { text: 'Ir a Feature Engineering 🔧', next: 'pca_question', icon: '➡️' },
      { text: 'Explorar proyecto GCP 💼', next: 'gcp_project', icon: '☁️' }
    ]
  },

  gcp_wrong_1: {
    emoji: '❌',
    stage: 'Nivel 4: Incorrecto',
    badge: 'bigdata',
    isWrong: true,
    text: `<strong>Cloud Storage</strong> es para almacenamiento de archivos, no para ejecutar queries SQL.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Servicios GCP</div>
  <div class="trivia-explanation-text">
    • <strong>Cloud Storage:</strong> Almacén de objetos (archivos)
    <br>• <strong>BigQuery:</strong> Data warehouse para analytics
    <br>• Puedes usar ambos juntos: archivos en Storage, queries en BigQuery
  </div>
</div>`,
    options: [
      { text: 'Continuar 🔧', next: 'pca_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  gcp_wrong_2: {
    emoji: '❌',
    stage: 'Nivel 4: Incorrecto',
    badge: 'bigdata',
    isWrong: true,
    text: `<strong>Compute Engine</strong> son máquinas virtuales, no un servicio de analytics.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 Compute Engine</div>
  <div class="trivia-explanation-text">
    Compute Engine te da VMs donde TÚ instalas y configuras todo. <strong>BigQuery</strong> es serverless: solo escribes SQL y Google maneja la infraestructura.
  </div>
</div>`,
    options: [
      { text: 'Continuar 🔧', next: 'pca_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  // === PROYECTO GCP ===
  gcp_project: {
    emoji: '☁️',
    stage: 'Proyecto: GCP & Dataprep',
    badge: 'personal',
    text: `Los proyectos de <strong>GCP</strong> en el portfolio incluyen:

<strong>15-GCP-Intro:</strong>
• Configuración de proyectos en Google Cloud
• Uso de BigQuery para análisis de datos
• Integración con Cloud Storage

<strong>16-Dataprep:</strong>
• Limpieza de datos visual con Dataprep
• Transformaciones sin código
• Exportación a BigQuery

¡GCP es una habilidad muy demandada en Data Engineering!`,
    options: [
      { text: 'Vamos a Feature Engineering 🔧', next: 'pca_question', icon: '➡️' }
    ]
  },

  // === PREGUNTA PCA ===
  pca_question: {
    emoji: '📊',
    stage: 'Nivel 5: Feature Engineering',
    badge: 'personal',
    isQuestion: true,
    text: `En el proyecto de <strong>PCA y Feature Selection</strong>, se redujo un dataset de 79 features a 15, logrando una mejora del 13.8% en AUC.

<strong>Pregunta:</strong> ¿Qué significa PCA y cuál es su propósito principal?`,
    options: [
      { text: 'Principal Component Analysis - Reducir dimensionalidad', next: 'pca_correct', icon: 'A', correct: true },
      { text: 'Predictive Classification Algorithm - Clasificar datos', next: 'pca_wrong_1', icon: 'B' },
      { text: 'Pre-Computed Analytics - Acelerar queries', next: 'pca_wrong_2', icon: 'C' }
    ]
  },

  pca_correct: {
    emoji: '✅',
    stage: 'Nivel 5: ¡Fantástico!',
    badge: 'personal',
    isCorrect: true,
    text: `<strong>¡Exacto!</strong> PCA es una técnica fundamental de reducción de dimensionalidad.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 PCA en el Portfolio</div>
  <div class="trivia-explanation-text">
    En el proyecto <strong>10-PCA</strong>:
    <br>• Dataset original: 79 features
    <br>• Después de PCA: 15 componentes
    <br>• Mejora en AUC: +13.8%
    <br>• Reducción de ruido y multicolinealidad
  </div>
</div>

¡Una última pregunta sobre Feature Engineering Temporal!`,
    options: [
      { text: 'Pregunta final ⏰', next: 'temporal_question', icon: '➡️' }
    ]
  },

  pca_wrong_1: {
    emoji: '❌',
    stage: 'Nivel 5: Incorrecto',
    badge: 'personal',
    isWrong: true,
    text: `<strong>PCA</strong> = <strong>Principal Component Analysis</strong> (Análisis de Componentes Principales).

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 ¿Qué hace PCA?</div>
  <div class="trivia-explanation-text">
    PCA transforma features correlacionadas en un conjunto menor de componentes no correlacionados (ortogonales), preservando la mayor varianza posible. Es una técnica de <strong>reducción de dimensionalidad</strong>.
  </div>
</div>`,
    options: [
      { text: 'Pregunta final ⏰', next: 'temporal_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  pca_wrong_2: {
    emoji: '❌',
    stage: 'Nivel 5: Incorrecto',
    badge: 'personal',
    isWrong: true,
    text: `Eso suena a algo de bases de datos, pero no es PCA.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 PCA Real</div>
  <div class="trivia-explanation-text">
    <strong>Principal Component Analysis</strong> es una técnica estadística para reducir dimensionalidad encontrando las direcciones de máxima varianza en los datos.
  </div>
</div>`,
    options: [
      { text: 'Pregunta final ⏰', next: 'temporal_question', icon: '➡️' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  // === PREGUNTA TEMPORAL ===
  temporal_question: {
    emoji: '⏰',
    stage: 'Nivel Final: Feature Engineering Temporal',
    badge: 'personal',
    isQuestion: true,
    text: `En análisis de series temporales y e-commerce, es común crear features basadas en el comportamiento histórico del cliente.

<strong>Pregunta:</strong> ¿Qué significa "RFM" en el contexto de segmentación de clientes?`,
    options: [
      { text: 'Random Forest Model', next: 'temporal_wrong_1', icon: 'A' },
      { text: 'Recency, Frequency, Monetary', next: 'temporal_correct', icon: 'B', correct: true },
      { text: 'Real-time Feature Management', next: 'temporal_wrong_2', icon: 'C' }
    ]
  },

  temporal_correct: {
    emoji: '🏆',
    stage: '¡NIVEL COMPLETADO!',
    badge: 'personal',
    isCorrect: true,
    text: `<strong>¡EXCELENTE!</strong> Has demostrado un conocimiento sólido de Feature Engineering.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 RFM Analysis</div>
  <div class="trivia-explanation-text">
    • <strong>Recency:</strong> ¿Cuándo fue la última compra?
    <br>• <strong>Frequency:</strong> ¿Con qué frecuencia compra?
    <br>• <strong>Monetary:</strong> ¿Cuánto gasta en total?
    <br><br>
    En el proyecto <strong>11-Future_Temp</strong> se implementan estas técnicas junto con lag features y rolling windows.
  </div>
</div>

¡Has completado la trivia!`,
    options: [
      { text: 'Ver resultados finales 🏆', next: 'final', icon: '🎉' }
    ]
  },

  temporal_wrong_1: {
    emoji: '❌',
    stage: 'Nivel Final: Incorrecto',
    badge: 'personal',
    isWrong: true,
    text: `<strong>Random Forest</strong> es un modelo de ML, no una técnica de segmentación.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 RFM Real</div>
  <div class="trivia-explanation-text">
    <strong>RFM</strong> = Recency, Frequency, Monetary
    <br>Es una técnica de segmentación de clientes basada en su comportamiento de compra.
  </div>
</div>`,
    options: [
      { text: 'Ver resultados 🏆', next: 'final', icon: '🎉' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  temporal_wrong_2: {
    emoji: '❌',
    stage: 'Nivel Final: Incorrecto',
    badge: 'personal',
    isWrong: true,
    text: `Buen intento, pero RFM es más clásico que eso.

<div class="trivia-explanation">
  <div class="trivia-explanation-title">💡 RFM</div>
  <div class="trivia-explanation-text">
    <strong>Recency</strong> (días desde última compra), <strong>Frequency</strong> (número de compras), <strong>Monetary</strong> (valor total gastado). Segmentación de marketing desde los años 90.
  </div>
</div>`,
    options: [
      { text: 'Ver resultados 🏆', next: 'final', icon: '🎉' },
      { text: 'Reiniciar 🏠', next: 'start', icon: '🏠' }
    ]
  },

  // === FINAL ===
  final: {
    emoji: '🎉',
    stage: 'Fin de la Aventura',
    isFinal: true,
    text: `¡Has completado la <strong>Trivia Data Engineer</strong>!`
  }
};

// === Funciones de la Trivia ===

/**
 * Renderiza el nodo actual
 */
function showNode(nodeKey) {
  const container = document.getElementById('trivia-container');
  const node = trivia[nodeKey];
  
  if (!node) {
    console.error(`Nodo "${nodeKey}" no encontrado`);
    return;
  }

  // Actualizar estado
  triviaState.currentNode = nodeKey;
  if (!triviaState.visitedNodes.includes(nodeKey)) {
    triviaState.visitedNodes.push(nodeKey);
  }
  
  // Contar preguntas y respuestas
  if (node.isQuestion) {
    triviaState.totalQuestions++;
  }
  if (node.isCorrect) {
    triviaState.correctAnswers++;
    triviaState.score += 10;
  } else if (node.isPartial) {
    triviaState.score += 5;
  }

  // Construir HTML
  let html = '';
  
  // Barra de progreso (si no es el inicio ni el final)
  if (nodeKey !== 'start' && !node.isFinal) {
    const progress = Math.min((triviaState.visitedNodes.length / 12) * 100, 100);
    html += `
      <div class="trivia-progress-container">
        <div class="trivia-progress-label">
          <span>📍 Progreso</span>
          <span>${Math.round(progress)}%</span>
        </div>
        <div class="trivia-progress-bar">
          <div class="trivia-progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;
  }

  // Header con emoji y stage
  html += `
    <div class="trivia-header trivia-fade-in">
      <div class="trivia-emoji">${node.emoji || '🎮'}</div>
      <div class="trivia-stage">${node.stage || 'Trivia Data Engineer'}</div>
    </div>
  `;

  // Badge si existe
  if (node.badge) {
    const badgeLabels = {
      'sql': '🗄️ SQL',
      'etl': '🔄 ETL',
      'bigdata': '🌐 Big Data',
      'personal': '💼 Portfolio'
    };
    html += `<div style="text-align: center; margin-bottom: 1rem;">
      <span class="trivia-badge trivia-badge-${node.badge}">${badgeLabels[node.badge] || node.badge}</span>
    </div>`;
  }

  // Texto principal con clase según estado
  let textClass = 'trivia-text trivia-fade-in';
  if (node.isCorrect) textClass += ' trivia-success';
  else if (node.isWrong) textClass += ' trivia-error';
  else if (node.isPartial) textClass += ' trivia-info';
  
  html += `<div class="${textClass}">${node.text}</div>`;

  // Si es el nodo final, mostrar estadísticas
  if (node.isFinal) {
    const totalTime = triviaState.startTime 
      ? Math.round((Date.now() - triviaState.startTime) / 1000) 
      : 0;
    
    html += `
      <div class="trivia-final">
        <div class="trivia-final-emoji">🏆</div>
        <div class="trivia-final-title">¡Felicitaciones!</div>
        
        <div class="trivia-stats">
          <div class="trivia-stat">
            <div class="trivia-stat-value">${triviaState.score}</div>
            <div class="trivia-stat-label">Puntos</div>
          </div>
          <div class="trivia-stat">
            <div class="trivia-stat-value">${triviaState.correctAnswers}</div>
            <div class="trivia-stat-label">Correctas</div>
          </div>
          <div class="trivia-stat">
            <div class="trivia-stat-value">${triviaState.visitedNodes.length}</div>
            <div class="trivia-stat-label">Nodos visitados</div>
          </div>
          <div class="trivia-stat">
            <div class="trivia-stat-value">${totalTime}s</div>
            <div class="trivia-stat-label">Tiempo</div>
          </div>
        </div>
        
        <div class="trivia-final-message">
          Has explorado conceptos de <strong>SQL</strong>, <strong>ETL</strong>, <strong>Big Data</strong>, <strong>GCP</strong> 
          y <strong>Feature Engineering</strong>. ¡Sigue explorando el portfolio para más detalles!
        </div>
        
        <button class="trivia-restart" onclick="restartTrivia()">
          🔄 Jugar de nuevo
        </button>
        
        <div style="margin-top: 1.5rem;">
          <a href="./portfolio/index.html" style="color: var(--trivia-primary); text-decoration: none; font-weight: 500;">
            📁 Ver Portfolio Completo →
          </a>
        </div>
      </div>
    `;
  } else {
    // Opciones
    html += '<div class="trivia-options">';
    node.options.forEach((option, index) => {
      html += `
        <button class="trivia-option trivia-fade-in" onclick="showNode('${option.next}')" style="animation-delay: ${0.1 * (index + 1)}s">
          <div class="trivia-option-icon">${option.icon || (index + 1)}</div>
          <div class="trivia-option-text">${option.text}</div>
        </button>
      `;
    });
    html += '</div>';
  }

  // Actualizar contenedor con animación
  container.innerHTML = html;
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Reinicia la trivia
 */
function restartTrivia() {
  triviaState.currentNode = 'start';
  triviaState.score = 0;
  triviaState.totalQuestions = 0;
  triviaState.correctAnswers = 0;
  triviaState.visitedNodes = [];
  triviaState.startTime = Date.now();
  showNode('start');
}

/**
 * Inicializa la trivia cuando el DOM está listo
 */
function initTrivia() {
  const container = document.getElementById('trivia-container');
  if (container) {
    triviaState.startTime = Date.now();
    showNode('start');
  } else {
    console.error('Contenedor trivia-container no encontrado');
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTrivia);
} else {
  initTrivia();
}
