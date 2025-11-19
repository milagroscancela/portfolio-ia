# Portfolio de Ingeniería de Datos

[![MkDocs](https://img.shields.io/badge/MkDocs-Material-526CFE?style=flat-square)](https://squidfunk.github.io/mkdocs-material/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python)](https://www.python.org)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square&logo=github)](https://pages.github.com/)

> Portfolio técnico del curso de **Ingeniería de Datos** documentado con **MkDocs Material** y desplegado automáticamente en GitHub Pages.

🔗 **[Ver Portfolio en Vivo →](https://milagroscancela.github.io/portfolio-ing-datos/)**

---

## 🚀 Quick Start
```bash
# Clonar repositorio
git clone https://github.com/milagroscancela/portfolio-ing-datos.git
cd portfolio-ing-datos

# Instalar dependencias
pip install -r requirements.txt

# Servir localmente
mkdocs serve
# Abrir: http://127.0.0.1:8000
```

---

## 📁 Estructura de Archivos
```
portfolio-ing-datos/
│
├── mkdocs.yml                    # Configuración principal
├── requirements.txt              # Dependencias Python
├── README.md                     # Este archivo
│
├── docs/                         # Contenido del sitio
│   ├── index.md                  # Página de inicio
│   ├── acerca.md                 # Sobre mí
│   ├── recursos.md               # Recursos del curso
│   ├── exploraciones-extra.md    # Proyectos adicionales
│   ├── visualizaciones.md        # Galería de gráficos
│   ├── apuntes.md                # Notas del curso
│   │
│   ├── portfolio/                # Prácticas del curso
│   │   ├── index.md
│   │   ├── 01-intro.md
│   │   ├── 02-eda.md
│   │   ├── ...
│   │   ├── 11-future_temp.md
│   │   ├── extra-social-media.md
│   │   └── extra-credit-card.md
│   │
│   ├── assets/                   # Recursos multimedia
│   │   ├── images/
│   │   ├── profile/
│   │   ├── social-media/
│   │   ├── credit-card/
│   │   └── [otras-practicas]/
│   │
│   └── stylesheets/              # CSS personalizado
│       └── extra.css
│
└── site/                         # Build generado (ignorado por Git)
```

---

## 📝 Cómo Usar

### 1. Escribir contenido

Escribe únicamente en `docs/`. Todo el contenido del portfolio va aquí.

### 2. Crear nueva práctica

Crea archivos en `docs/portfolio/` siguiendo la convención de nombres:
```bash
docs/portfolio/12-nueva-practica.md
```

**Usa nombres con orden:** `01-titulo.md`, `02-otro.md`, etc.

### 3. Frontmatter (opcional)

Mantén el frontmatter en cada `.md` si lo necesitas:
```yaml
---
title: "Título de la página"
date: 2025-11-19
author: "Milagros Cancela"
---
```

### 4. Enlaces y recursos

Usa rutas relativas para imágenes y notebooks:
```markdown
<!-- Desde docs/portfolio/practica.md -->
![Gráfico](../assets/practica/grafico.png)

[Descargar Notebook](../assets/practica/notebook.ipynb)
```

### 5. Actualizar navegación

Edita `mkdocs.yml` para agregar la práctica al menú:
```yaml
nav:
  - 📁 Portfolio:
      - portfolio/index.md
      - portfolio/12-nueva-practica.md  # ← Agregar aquí
```

---

## 🛠️ Comandos
```bash
# Desarrollo local con hot-reload
mkdocs serve

# Build del sitio
mkdocs build

# Deploy manual a GitHub Pages
mkdocs gh-deploy

# Limpiar build anterior
rm -rf site/
```

---

## 🚀 Despliegue

### Despliegue Automático

Cada **push a `main`** ejecuta automáticamente:

1. ✅ Build con `mkdocs build --strict`
2. ✅ Deploy a GitHub Pages
3. ✅ Sitio disponible en 2-3 minutos

**Configurado en:** `.github/workflows/deploy.yml`

### Despliegue Manual

Si prefieres desplegar manualmente:
```bash
mkdocs gh-deploy
```

Esto hace:
- Build del sitio en `/site`
- Push a rama `gh-pages`
- GitHub Pages publica automáticamente

### Configurar GitHub Pages

1. Ve a **Settings** → **Pages** en tu repositorio
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (se crea automáticamente)
4. Listo ✅

---

## 📦 Dependencias

### `requirements.txt`
```txt
mkdocs>=1.5.0
mkdocs-material>=9.5.0
mkdocs-material-extensions>=1.3.0
pymdown-extensions>=10.0
```

### Instalar
```bash
pip install -r requirements.txt
```

---




