# Primeros Pasos en Google Cloud Platform

**Práctica 15 - Introducción a la Consola y Servicios GCP**  
**UT5: Pipelines ETL en la Nube | Google Cloud Skills Boost**

> 📚 **Tiempo estimado de lectura:** ~15 min  
> - **Autora:** Milagros Cancela  
> - **Fecha:** Diciembre 2024  
> - **Código del Lab:** GSP282  
> - **Nivel:** Introductorio  
> - **Duración del Lab:** ~30 minutos

---

## 🎯 Objetivos del Lab

Este laboratorio introductorio proporciona experiencia práctica fundamental con Google Cloud Platform, estableciendo las bases necesarias para construir pipelines ETL escalables en la nube. Los objetivos específicos incluyen:

- Acceder y navegar la consola de Google Cloud con credenciales específicas
- Explorar la estructura y organización de proyectos en Google Cloud
- Comprender el sistema de gestión de identidad y acceso (Cloud IAM)
- Familiarizarse con roles, permisos y políticas de seguridad
- Explorar y habilitar APIs de Google Cloud para integración de servicios

---

## 🔍 Contexto y Relevancia para Data Engineering

Google Cloud Platform ofrece una suite completa de servicios en la nube que van desde computación y almacenamiento hasta análisis de datos, machine learning y networking. Para la construcción de pipelines ETL escalables, es fundamental comprender:

1. **Estructura de proyectos**: Organización de recursos y servicios cloud
2. **IAM (Identity and Access Management)**: Control de acceso y permisos
3. **APIs y servicios**: Integración programática con servicios GCP
4. **Interfaz de consola**: Navegación y gestión de recursos

Este conocimiento base es esencial para implementar soluciones de ingeniería de datos robustas y seguras en entornos cloud.

---

## 🛠️ Componentes y Conceptos Clave

### 1. Estructura de Labs en Google Cloud Skills Boost

Todos los labs comparten una interfaz común con componentes esenciales:

| Componente | Descripción |
|-----------|-------------|
| **Start Lab** | Inicia un ambiente temporal de GCP con credenciales y recursos configurados |
| **Timer** | Cuenta regresiva del tiempo disponible para completar el lab |
| **Lab Details Pane** | Contiene credenciales temporales, Project ID y botón para abrir la consola |
| **Activity Tracking** | Sistema de scoring que verifica la completitud de tareas específicas |

### 2. Google Cloud Projects

**Definición**: Un proyecto de Google Cloud es una entidad organizacional que contiene recursos y servicios cloud (VMs, bases de datos, redes, etc.), junto con configuraciones de permisos y seguridad.

**Características importantes**:

- **Project ID**: Identificador único global (e.g., `qwiklabs-gcp-xxx`)
- **Project Name**: Nombre descriptivo para usuarios
- **Project Number**: Identificador numérico interno

**Proyecto "Qwiklabs Resources"**:

- Proyecto compartido (read-only) con archivos, datasets e imágenes
- Accesible desde todos los labs pero no modificable
- Los proyectos temporales de lab se eliminan al finalizar

### 3. Cloud IAM (Identity and Access Management)

Sistema de gestión de permisos que controla quién puede hacer qué sobre qué recursos.

**Roles Básicos**:

| Role | Permisos | Use Case |
|------|----------|----------|
| `roles/viewer` | Acciones read-only, no modifica estado | Consulta de recursos y datos existentes |
| `roles/editor` | Todos los permisos de viewer + modificar recursos | Crear, modificar y eliminar recursos |
| `roles/owner` | Todos los permisos de editor + gestión de roles y billing | Administración completa del proyecto |

**Nota importante**: Como editor, puedes crear, modificar y eliminar recursos, pero NO puedes añadir o remover miembros del proyecto.

---

## 📝 Proceso Práctico Realizado

### Task 1: Acceso a Cloud Console

**1. Inicio del Lab**

- Click en "Start Lab" para generar ambiente temporal
- Esperar activación de recursos y credenciales (timer inicia)
- Verificar Lab Details pane con credenciales temporales

**2. Sign-in a Google Cloud**

```
Username: student-xx-xxxxxx@qwiklabs.net
Password: [proporcionado en Lab Details]
Project ID: qwiklabs-gcp-xxx
```

**Consideraciones**:

- NO usar cuenta personal o corporativa
- Usar ventana incógnito para evitar conflictos
- Las credenciales son temporales (se invalidan al terminar)

**3. Navegación inicial**

- Aceptar términos de servicio de Google Cloud
- Familiarización con interfaz de Cloud Console
- Identificación de menú de navegación y servicios disponibles

### Task 2: Exploración de Proyectos

**1. Visualización de Project Info**

- Ubicación: Card en esquina superior izquierda
- Contenido: Project Name, Project Number, Project ID

**2. Acceso a múltiples proyectos**

- Click en dropdown del proyecto (barra de título)
- Visualización de "Qwiklabs Resources" y proyecto temporal
- Comprensión de estructura multi-proyecto

**Aprendizaje clave**: Los proyectos son el método principal de organización en GCP. Organizaciones grandes pueden tener docenas o miles de proyectos organizados por equipo, producto o propósito.

### Task 3: Navegación de Servicios

**Acceso al Navigation Menu**:

- Icono de hamburguesa (☰) en barra de título
- Click en "View all Products"
- Exploración de categorías de servicios:
  - Compute (Compute Engine, Kubernetes, Cloud Functions)
  - Storage (Cloud Storage, Filestore)
  - Databases (Cloud SQL, BigQuery, Firestore)
  - Big Data (Dataflow, Dataproc, Pub/Sub)
  - AI/ML (Vertex AI, AutoML)
  - Networking, Security, Operations, etc.

**Implicación para Data Engineering**: La familiarización con estos servicios es crucial para diseñar arquitecturas de datos. Por ejemplo:

- BigQuery para data warehousing
- Dataflow para procesamiento de streams
- Cloud Storage para data lakes
- Pub/Sub para ingesta en tiempo real

### Task 4: Gestión de Roles y Permisos IAM

**1. Acceso a IAM Console**

```
Navigation menu → IAM & Admin → IAM
```

**2. Revisión de roles asignados**

- Identificación de usuario student en lista
- Verificación de role: Editor
- Comprensión de permisos asociados

**3. Concesión de rol IAM**

**Proceso**:

```
1. Click "Grant access"
2. Add principals: [identifier del segundo usuario]
3. Select role: Viewer
4. Click "Save"
5. Verificar en lista IAM
```

**Activity Tracking**: Este paso incluye verificación automática de completitud mediante "Check my progress".

**Principio de seguridad**: Implementar el principio de "least privilege" - otorgar solo los permisos mínimos necesarios para realizar tareas específicas.

### Task 5: Exploración de APIs

**Google Cloud APIs**:

- 200+ APIs disponibles para integración
- Diseño orientado a recursos (Resource-Oriented Design)
- Accesibles vía llamadas directas o bibliotecas cliente

**Proceso de habilitación de API**:

**1. Navegación a API Library**

```
Navigation menu → APIs & Services → Library
```

**2. Búsqueda y habilitación**

```
Search: "Dialogflow"
Select: Dialogflow API
Click: "Enable"
```

**3. Verificación de estado**

- Confirmación visual de "API enabled"
- Acceso a documentación de API
- Exploración de opciones "Try this API"

**Ejemplo práctico - Dialogflow API**:

- Permite construir aplicaciones conversacionales
- Uso de NLP sin necesidad de entender esquemas subyacentes
- Integración con Google Assistant y otras plataformas

**Implicación para pipelines ETL**:

- Acceso programático a servicios (BigQuery API, Cloud Storage API)
- Integración de servicios de ML en pipelines de datos
- Automatización de tareas de ingeniería de datos

---

## 💡 Insights y Aprendizajes Clave

### Conceptos Fundamentales

**1. Ambiente de desarrollo en la nube**

- Todo se gestiona vía interfaz web o APIs
- Recursos temporales vs. proyectos productivos
- Importancia de gestión adecuada de credenciales

**2. Organización jerárquica**

```
Organization
└── Folders (opcional)
    └── Projects
        └── Resources (VMs, databases, storage, etc.)
```

**3. Modelo de seguridad**

- Autenticación: ¿Quién eres? (Cloud Identity)
- Autorización: ¿Qué puedes hacer? (Cloud IAM)
- Auditoría: ¿Qué hiciste? (Cloud Audit Logs)

### Mejores Prácticas Observadas

- **Separación de ambientes**: Usar proyectos diferentes para dev, staging, producción
- **Gestión granular de permisos**: Asignar roles específicos en lugar de owner
- **Habilitación selectiva de APIs**: Solo habilitar APIs necesarias por seguridad
- **Uso de service accounts**: Para aplicaciones que necesitan acceso programático

### Relevancia para Pipelines ETL

Este lab establece conocimiento fundamental para:

1. **Infraestructura**: Configurar proyectos para alojar pipelines
2. **Seguridad**: Gestionar accesos a datos y recursos
3. **Integración**: Habilitar APIs necesarias (BigQuery, Dataflow, Storage)
4. **Automatización**: Comprender cómo se organizan recursos para scripting

---

## 🎓 Conclusiones

Este laboratorio introductorio proporciona la base esencial para trabajar con Google Cloud Platform. Los conceptos de proyectos, IAM, roles y APIs son fundamentales para cualquier trabajo de ingeniería de datos en la nube.

**Competencias adquiridas**:

- Navegación efectiva de la consola de Google Cloud
- Comprensión de estructura de proyectos y recursos
- Gestión básica de identidad y permisos (IAM)
- Habilitación y exploración de APIs de GCP
- Familiarización con categorías de servicios disponibles

**Preparación para próximos pasos**:

- Profundización en servicios específicos (BigQuery, Dataflow, Cloud Storage)
- Implementación de pipelines ETL usando servicios GCP
- Automatización mediante código (Python SDK, gcloud CLI)
- Integración de servicios para arquitecturas de datos completas

Este conocimiento base es el primer paso crítico para construir soluciones de datos escalables, seguras y eficientes en Google Cloud Platform.

---

## 📚 Referencias

- [Google Cloud Console Documentation](https://cloud.google.com/cloud-console/)
- [Google Cloud Projects Overview](https://cloud.google.com/docs/overview/#projects)
- [Cloud IAM Documentation](https://cloud.google.com/iam/)
- [Understanding IAM Roles](https://cloud.google.com/iam/docs/understanding-roles)
- [Google APIs Explorer](https://developers.google.com/apis-explorer/)
- [Google Cloud Products Overview](https://cloud.google.com/products)

---

**Fecha de realización:** Diciembre 2025  
**Programa:** Ingeniería en IA y Ciencia de Datos  
**Curso:** UT5 - Pipelines ETL en la Nube  
**Institución:** Universidad Católica del Uruguay

