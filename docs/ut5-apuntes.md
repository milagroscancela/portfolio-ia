# UT5: Pipelines ETL

## Introducción

Los pipelines ETL (Extract, Transform, Load) son fundamentales para sistemas de ML en producción. Permiten automatizar, orquestar y monitorear flujos de datos desde múltiples fuentes hasta modelos desplegados.

---

## Fundamentos de ETL

### ETL vs ELT

**ETL (Extract, Transform, Load)**:
- Transformación antes de cargar
- Ideal para datos estructurados
- Mayor control sobre calidad
- Menor carga en destino

**ELT (Extract, Load, Transform)**:
- Carga primero, transformación después
- Aprovecha poder de data warehouses modernos
- Más flexible para análisis exploratorio
- Ideal para big data
```python
# ETL Pattern
def etl_pipeline():
    # Extract
    raw_data = extract_from_source()
    
    # Transform (antes de cargar)
    clean_data = clean_and_validate(raw_data)
    features = engineer_features(clean_data)
    
    # Load (datos ya procesados)
    load_to_warehouse(features)

# ELT Pattern
def elt_pipeline():
    # Extract
    raw_data = extract_from_source()
    
    # Load (datos crudos)
    load_to_data_lake(raw_data)
    
    # Transform (en el warehouse)
    transform_in_warehouse(sql_query)
```

### Componentes de un Pipeline

**Extract**: Obtención de datos desde fuentes
- Bases de datos (SQL, NoSQL)
- APIs REST
- Archivos (CSV, JSON, Parquet)
- Streaming (Kafka, Pub/Sub)
- Data lakes (S3, GCS)

**Transform**: Procesamiento y transformación
- Limpieza y validación
- Feature engineering
- Agregaciones y joins
- Normalización y encoding

**Load**: Persistencia de resultados
- Data warehouses (BigQuery, Snowflake)
- Feature stores
- Bases de datos operacionales
- Archivos procesados

---

## Orquestación con Prefect

### Conceptos Básicos

Prefect es un framework de orquestación moderno que permite definir workflows con código Python.

**Conceptos clave**:
- **Task**: Unidad mínima de trabajo
- **Flow**: Contenedor de tasks
- **Deployment**: Flow programado para ejecución
- **Work Pool**: Recursos de ejecución

### Tasks
```python
from prefect import task
import pandas as pd

@task(name="extract-customers")
def extract_customers():
    """Task para extracción de datos"""
    query = "SELECT * FROM customers"
    df = pd.read_sql(query, connection)
    return df

@task(name="validate-data")
def validate_data(df):
    """Task para validación"""
    assert not df.empty, "DataFrame is empty"
    assert df.isnull().sum().sum() == 0, "Contains null values"
    return df

@task(
    name="transform-features",
    retries=3,
    retry_delay_seconds=60
)
def transform_features(df):
    """Task con retry automático"""
    df['income_log'] = np.log1p(df['income'])
    df['age_group'] = pd.cut(df['age'], bins=[0, 25, 50, 75, 100])
    return df
```

### Flows
```python
from prefect import flow

@flow(name="customer-etl-pipeline")
def customer_pipeline():
    """Flow que orquesta múltiples tasks"""
    # Extract
    raw_data = extract_customers()
    
    # Transform
    validated_data = validate_data(raw_data)
    features = transform_features(validated_data)
    
    # Load
    load_to_warehouse(features)
    
    return features

# Ejecutar el flow
if __name__ == "__main__":
    customer_pipeline()
```

### Subflows
```python
@flow(name="data-quality-check")
def quality_check_flow(df):
    """Subflow para validación de calidad"""
    check_nulls(df)
    check_duplicates(df)
    check_datatypes(df)
    return True

@flow(name="main-pipeline")
def main_pipeline():
    """Flow principal que usa subflows"""
    data = extract_data()
    
    # Llamar subflow
    is_valid = quality_check_flow(data)
    
    if is_valid:
        processed = transform_data(data)
        load_data(processed)
```

### Control de Flujo
```python
from prefect import flow, task

@task
def process_batch(batch_id):
    """Procesar un lote de datos"""
    data = fetch_batch(batch_id)
    processed = transform_batch(data)
    return processed

@flow(name="parallel-processing")
def parallel_pipeline():
    """Procesamiento en paralelo"""
    batch_ids = [1, 2, 3, 4, 5]
    
    # Ejecutar tasks en paralelo
    results = process_batch.map(batch_ids)
    
    # Combinar resultados
    combined = combine_results(results)
    return combined

@flow(name="conditional-pipeline")
def conditional_pipeline():
    """Pipeline con lógica condicional"""
    data = extract_data()
    
    if data['source'] == 'api':
        processed = process_api_data(data)
    elif data['source'] == 'database':
        processed = process_db_data(data)
    else:
        raise ValueError(f"Unknown source: {data['source']}")
    
    load_data(processed)
```

---

## Deployments y Scheduling

### Crear Deployment
```python
from prefect.deployments import Deployment
from prefect.server.schemas.schedules import CronSchedule, IntervalSchedule

# Deployment con cron schedule
deployment = Deployment.build_from_flow(
    flow=customer_pipeline,
    name="daily-customer-etl",
    schedule=CronSchedule(cron="0 2 * * *"),  # 2 AM diariamente
    work_pool_name="production-pool",
    tags=["etl", "customers", "production"]
)

deployment.apply()
```

### Tipos de Schedules
```python
from datetime import timedelta

# Intervalo fijo
interval_schedule = IntervalSchedule(
    interval=timedelta(hours=6)  # Cada 6 horas
)

# Cron expression
cron_schedule = CronSchedule(
    cron="0 */4 * * *",  # Cada 4 horas
    timezone="America/Montevideo"
)

# Ejemplos de cron
# "0 0 * * *"       - Diario a medianoche
# "0 2 * * 1"       - Lunes a las 2 AM
# "*/15 * * * *"    - Cada 15 minutos
# "0 9-17 * * 1-5"  - Cada hora 9-5 PM, lunes a viernes
```

### Parametrización
```python
@flow(name="parametrized-pipeline")
def pipeline_with_params(
    start_date: str,
    end_date: str,
    source: str = "database"
):
    """Pipeline parametrizado"""
    data = extract_data(start_date, end_date, source)
    processed = transform_data(data)
    load_data(processed)

# Deployment con parámetros default
deployment = Deployment.build_from_flow(
    flow=pipeline_with_params,
    name="flexible-pipeline",
    parameters={
        "start_date": "2024-01-01",
        "end_date": "2024-01-31",
        "source": "api"
    }
)
```

---

## Manejo de Errores

### Retries y Timeouts
```python
from prefect import task, flow
from datetime import timedelta

@task(
    retries=3,
    retry_delay_seconds=60,
    timeout_seconds=300
)
def unreliable_api_call():
    """Task con retry automático"""
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json()

@task(
    retries=2,
    retry_delay_seconds=[30, 60]  # Backoff incremental
)
def exponential_retry():
    """Retry con delays incrementales"""
    return fetch_external_data()
```

### Manejo de Excepciones
```python
from prefect import task, flow
from prefect.exceptions import PrefectException

@task
def risky_operation(data):
    """Task con manejo de errores explícito"""
    try:
        result = process_data(data)
        return result
    except ValueError as e:
        # Log error pero continua flow
        logger.error(f"ValueError: {e}")
        return None
    except Exception as e:
        # Re-raise para detener flow
        raise PrefectException(f"Critical error: {e}")

@flow(name="error-handling-flow")
def robust_pipeline():
    """Flow con manejo robusto de errores"""
    try:
        data = extract_data()
        
        if data is None:
            logger.warning("No data extracted, using fallback")
            data = load_fallback_data()
        
        result = risky_operation(data)
        
        if result is not None:
            load_data(result)
        else:
            send_alert("Pipeline completed with warnings")
            
    except PrefectException as e:
        send_alert(f"Pipeline failed: {e}")
        raise
```

### Circuit Breaker Pattern
```python
from prefect import task
from datetime import datetime, timedelta

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=300):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failures = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
    
    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if datetime.now() - self.last_failure_time > timedelta(seconds=self.timeout):
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise e
    
    def on_success(self):
        self.failures = 0
        self.state = "CLOSED"
    
    def on_failure(self):
        self.failures += 1
        self.last_failure_time = datetime.now()
        if self.failures >= self.failure_threshold:
            self.state = "OPEN"

breaker = CircuitBreaker()

@task
def protected_api_call():
    """API call protegida por circuit breaker"""
    return breaker.call(requests.get, API_URL)
```

---

## Monitoring y Observabilidad

### Logging
```python
from prefect import task, flow, get_run_logger

@task
def logged_task(data):
    """Task con logging"""
    logger = get_run_logger()
    
    logger.info(f"Processing {len(data)} records")
    
    try:
        result = process(data)
        logger.info(f"Successfully processed {len(result)} records")
        return result
    except Exception as e:
        logger.error(f"Error processing data: {e}")
        raise

@flow(name="logged-pipeline")
def pipeline_with_logging():
    """Flow con logging comprehensivo"""
    logger = get_run_logger()
    
    logger.info("Starting pipeline execution")
    start_time = datetime.now()
    
    try:
        data = extract_data()
        logger.info(f"Extracted {len(data)} records")
        
        processed = transform_data(data)
        logger.info(f"Transformed to {len(processed)} features")
        
        load_data(processed)
        
        duration = (datetime.now() - start_time).total_seconds()
        logger.info(f"Pipeline completed in {duration:.2f}s")
        
    except Exception as e:
        logger.error(f"Pipeline failed: {e}")
        raise
```

### Métricas y Alertas
```python
from prefect import task, flow
import time

@task
def track_metrics(metric_name, value):
    """Task para tracking de métricas"""
    # Enviar a sistema de métricas (Prometheus, CloudWatch, etc.)
    send_to_metrics_system(metric_name, value)

@flow(name="monitored-pipeline")
def pipeline_with_metrics():
    """Pipeline con tracking de métricas"""
    start_time = time.time()
    
    # Extract
    data = extract_data()
    track_metrics("records_extracted", len(data))
    
    # Transform
    processed = transform_data(data)
    track_metrics("records_processed", len(processed))
    
    # Load
    load_data(processed)
    
    # Métricas de performance
    duration = time.time() - start_time
    track_metrics("pipeline_duration_seconds", duration)
    
    # Alert si es muy lento
    if duration > 300:  # 5 minutos
        send_alert(f"Pipeline slow: {duration:.2f}s")
```

### Data Quality Checks
```python
from prefect import task, flow

@task
def validate_schema(df, expected_schema):
    """Validar schema de datos"""
    assert set(df.columns) == set(expected_schema.keys())
    
    for col, dtype in expected_schema.items():
        assert df[col].dtype == dtype
    
    return True

@task
def validate_ranges(df, ranges):
    """Validar rangos de valores"""
    for col, (min_val, max_val) in ranges.items():
        assert df[col].between(min_val, max_val).all()
    
    return True

@task
def validate_completeness(df, required_cols):
    """Validar completitud"""
    for col in required_cols:
        null_pct = df[col].isnull().mean()
        assert null_pct < 0.05, f"{col} has {null_pct:.2%} nulls"
    
    return True

@flow(name="data-quality-pipeline")
def quality_pipeline():
    """Pipeline con validaciones de calidad"""
    data = extract_data()
    
    # Validaciones
    validate_schema(data, EXPECTED_SCHEMA)
    validate_ranges(data, EXPECTED_RANGES)
    validate_completeness(data, REQUIRED_COLS)
    
    # Si pasa todas las validaciones
    processed = transform_data(data)
    load_data(processed)
```

---

## Batch vs Streaming

### Batch Processing

Procesamiento de datos en lotes a intervalos regulares.
```python
from prefect import flow, task
from datetime import datetime, timedelta

@task
def extract_batch(start_date, end_date):
    """Extraer lote de datos por rango de fechas"""
    query = f"""
        SELECT * FROM transactions
        WHERE date >= '{start_date}'
        AND date < '{end_date}'
    """
    return pd.read_sql(query, connection)

@flow(name="batch-processing")
def daily_batch_pipeline():
    """Pipeline batch diario"""
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    
    # Procesar datos de ayer
    batch = extract_batch(yesterday, today)
    
    # Transformaciones pesadas
    features = heavy_feature_engineering(batch)
    aggregations = compute_aggregations(features)
    
    # Cargar resultados
    load_to_warehouse(aggregations)
    update_reports(aggregations)
```

### Streaming Processing

Procesamiento de datos en tiempo real o near-real-time.
```python
from prefect import flow, task

@task
def process_stream_batch(messages):
    """Procesar micro-lote de mensajes"""
    df = pd.DataFrame(messages)
    
    # Transformaciones ligeras
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['value_normalized'] = (df['value'] - df['value'].mean()) / df['value'].std()
    
    return df

@flow(name="streaming-pipeline")
def streaming_pipeline():
    """
    Pipeline para procesamiento streaming
    Se ejecuta cada minuto procesando mensajes acumulados
    """
    # Consumir mensajes desde queue
    messages = consume_from_kafka(topic='events', timeout=50)
    
    if messages:
        # Procesar micro-lote
        processed = process_stream_batch(messages)
        
        # Escribir a destino
        write_to_sink(processed)
        
        # Commit offsets
        commit_kafka_offsets()
```

### Lambda Architecture

Combina batch y streaming para balance entre latencia y completitud.
```python
@flow(name="lambda-batch-layer")
def batch_layer():
    """Capa batch: procesamiento completo y preciso"""
    # Procesar datos históricos completos
    data = extract_all_historical_data()
    features = comprehensive_feature_engineering(data)
    load_to_batch_view(features)

@flow(name="lambda-speed-layer")
def speed_layer():
    """Capa speed: procesamiento rápido incremental"""
    # Procesar solo datos recientes
    recent_data = extract_recent_data()
    features = fast_feature_engineering(recent_data)
    load_to_realtime_view(features)

@flow(name="lambda-serving-layer")
def serving_layer(query):
    """Capa serving: combinar vistas batch y realtime"""
    batch_results = query_batch_view(query)
    realtime_results = query_realtime_view(query)
    
    # Merge y deduplicar
    combined = merge_views(batch_results, realtime_results)
    return combined
```

---

## Patrones Avanzados

### Idempotencia
```python
from prefect import task, flow
import hashlib

@task
def idempotent_load(data, table_name):
    """
    Carga idempotente: múltiples ejecuciones producen mismo resultado
    """
    # Generar ID determinístico
    data['record_id'] = data.apply(
        lambda row: hashlib.md5(
            str(row.to_dict()).encode()
        ).hexdigest(),
        axis=1
    )
    
    # Upsert en lugar de insert
    for _, row in data.iterrows():
        connection.execute(f"""
            INSERT INTO {table_name} (record_id, data)
            VALUES ('{row['record_id']}', '{row.to_json()}')
            ON CONFLICT (record_id) DO UPDATE
            SET data = EXCLUDED.data
        """)
```

### Checkpointing
```python
from prefect import task, flow
import pickle

@task
def save_checkpoint(data, checkpoint_id):
    """Guardar checkpoint para recuperación"""
    checkpoint_path = f"checkpoints/{checkpoint_id}.pkl"
    with open(checkpoint_path, 'wb') as f:
        pickle.dump(data, f)

@task
def load_checkpoint(checkpoint_id):
    """Cargar checkpoint anterior"""
    checkpoint_path = f"checkpoints/{checkpoint_id}.pkl"
    with open(checkpoint_path, 'rb') as f:
        return pickle.load(f)

@flow(name="checkpointed-pipeline")
def pipeline_with_checkpoints():
    """Pipeline con checkpoints para recuperación"""
    checkpoint_id = get_run_id()
    
    try:
        # Intentar cargar checkpoint
        data = load_checkpoint(checkpoint_id)
        logger.info("Resumed from checkpoint")
    except FileNotFoundError:
        # Empezar desde cero
        data = extract_data()
        save_checkpoint(data, checkpoint_id)
    
    # Procesar en etapas con checkpoints
    stage1 = process_stage1(data)
    save_checkpoint(stage1, f"{checkpoint_id}_stage1")
    
    stage2 = process_stage2(stage1)
    save_checkpoint(stage2, f"{checkpoint_id}_stage2")
    
    final = process_final(stage2)
    load_data(final)
```

### Backfilling
```python
from prefect import flow
from datetime import datetime, timedelta

@flow(name="backfill-pipeline")
def backfill_pipeline(start_date: str, end_date: str):
    """
    Pipeline para backfilling: procesar datos históricos
    """
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    
    current = start
    while current <= end:
        next_day = current + timedelta(days=1)
        
        logger.info(f"Backfilling {current.date()}")
        
        # Procesar día específico
        data = extract_batch(current, next_day)
        processed = transform_data(data)
        load_with_date(processed, current)
        
        current = next_day

# Ejecutar backfill
if __name__ == "__main__":
    backfill_pipeline("2024-01-01", "2024-01-31")
```

---

## Best Practices

### Diseño de Pipelines

**Principios SOLID para pipelines**:

1. **Single Responsibility**: Cada task hace una cosa
2. **Open/Closed**: Extendible sin modificar código existente
3. **Liskov Substitution**: Tasks intercambiables con mismo contrato
4. **Interface Segregation**: Tasks no dependen de lo que no usan
5. **Dependency Inversion**: Depender de abstracciones, no implementaciones
```python
# MAL: Task hace demasiado
@task
def do_everything():
    data = extract()
    cleaned = clean(data)
    features = engineer(cleaned)
    load(features)

# BIEN: Responsabilidades separadas
@task
def extract_data():
    return fetch_from_source()

@task
def clean_data(data):
    return remove_nulls_and_duplicates(data)

@task
def engineer_features(data):
    return create_features(data)

@task
def load_data(data):
    write_to_warehouse(data)

@flow
def well_designed_pipeline():
    data = extract_data()
    clean = clean_data(data)
    features = engineer_features(clean)
    load_data(features)
```

### Testing
```python
import pytest
from prefect import flow
from prefect.testing.utilities import prefect_test_harness

@pytest.fixture(autouse=True, scope="session")
def prefect_test_fixture():
    """Setup Prefect para testing"""
    with prefect_test_harness():
        yield

def test_extract_task():
    """Test de task individual"""
    result = extract_customers()
    
    assert isinstance(result, pd.DataFrame)
    assert not result.empty
    assert 'customer_id' in result.columns

def test_pipeline_flow():
    """Test de flow completo"""
    # Ejecutar flow
    result = customer_pipeline()
    
    # Verificar resultado
    assert result is not None
    assert len(result) > 0

def test_pipeline_with_mock_data():
    """Test con datos mock"""
    mock_data = pd.DataFrame({
        'customer_id': [1, 2, 3],
        'revenue': [100, 200, 300]
    })
    
    # Probar transformación
    result = transform_features(mock_data)
    
    assert 'revenue_log' in result.columns
```

### Versionado
```python
@flow(
    name="customer-pipeline",
    version="2.1.0"
)
def customer_pipeline_v2():
    """
    Pipeline versionado
    
    Version 2.1.0:
    - Added new feature: customer lifetime value
    - Fixed bug in date parsing
    - Improved performance by 30%
    """
    pass

# Tag deployments con versión
deployment = Deployment.build_from_flow(
    flow=customer_pipeline_v2,
    name="customer-etl-v2",
    version="2.1.0",
    tags=["v2", "production"]
)
```

### Documentación
```python
@task(
    name="calculate-customer-ltv",
    description="Calculates customer lifetime value using historical transactions",
    tags=["finance", "customer-metrics"]
)
def calculate_ltv(customer_id: int, transactions: pd.DataFrame) -> float:
    """
    Calculate Customer Lifetime Value.
    
    Args:
        customer_id: Unique customer identifier
        transactions: DataFrame with columns ['date', 'amount', 'customer_id']
    
    Returns:
        float: Predicted lifetime value in USD
    
    Raises:
        ValueError: If transactions DataFrame is empty
    
    Example:
        >>> transactions = pd.DataFrame(...)
        >>> ltv = calculate_ltv(12345, transactions)
        >>> print(f"LTV: ${ltv:.2f}")
    """
    if transactions.empty:
        raise ValueError("Transactions DataFrame is empty")
    
    customer_txns = transactions[transactions['customer_id'] == customer_id]
    ltv = customer_txns['amount'].sum() * MULTIPLIER
    
    return ltv
```

---

## Conclusión

Los pipelines ETL en producción requieren:

1. **Diseño robusto**: Separación de responsabilidades, idempotencia, manejo de errores
2. **Orquestación efectiva**: Uso de herramientas modernas como Prefect
3. **Observabilidad**: Logging, métricas, alertas
4. **Testing**: Validación de tasks y flows
5. **Escalabilidad**: Diseño para crecimiento de datos y complejidad

La correcta implementación de pipelines ETL permite llevar proyectos de ML desde experimentación hasta producción de manera confiable y mantenible.

---

## Recursos Adicionales

**Herramientas de Orquestación**:
- Prefect: Orquestación moderna en Python
- Apache Airflow: Orquestación batch tradicional
- Dagster: Data pipelines con tipos
- Temporal: Workflows distribuidos

**Patrones y Arquitecturas**:
- Lambda Architecture
- Kappa Architecture
- Medallion Architecture (Bronze/Silver/Gold)
- Data Mesh

**Monitoring y Observabilidad**:
- Prometheus + Grafana
- DataDog
- CloudWatch (AWS)
- Cloud Monitoring (GCP)

**Recursos de Aprendizaje**:
- [Google Cloud Blog – Building Data Engineering Organizations](https://cloud.google.com/blog)
- [Google Cloud Blog – Streaming Data Pipelines](https://cloud.google.com/blog)
- [Google Developers – ML Pipelines](https://developers.google.com)
- [Prefect Documentation](https://docs.prefect.io)