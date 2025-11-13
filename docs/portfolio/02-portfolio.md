# 🚀 Publicar mi Portafolio con GitHub Pages con MkDocs

 
> **📚Tiempo estimado de lectura:** ~7 min  
> **Autora:** Milagros Cancela  
> **Fecha:** 16/08/2025  
> **Entorno:** MkDocs Material + GitHub Actions  
> **Referencia de la tarea:** [Tarea 2 — Publicar tu Portafolio con GitHub Pages](https://juanfkurucz.com/ucu-id/ut1/02-portafolio-github-pages/)

---

## 🎯 Objetivo

El propósito de esta práctica fue **publicar mi portafolio profesional de Ingeniería de Datos** en línea, configurando correctamente la estructura, el flujo de despliegue con GitHub Actions y la documentación con MkDocs Material.  
El resultado final debía ser un sitio accesible públicamente, con las primeras prácticas integradas, incluyendo el análisis exploratorio del dataset *Iris*.

---

## 🧭 Contexto y proceso de trabajo

Esta práctica fue un verdadero recorrido técnico.  
Inicialmente, comencé a construir mi portafolio con **MkDocs**, aprovechando su simplicidad para generar sitios estáticos a partir de Markdown.  
Sin embargo, en un intento de lograr más dinamismo y componentes interactivos, **migré temporalmente a Vercel**, usando un enfoque más orientado a front-end con Node.js y Next.js.

La experiencia en Vercel fue útil para entender cómo funcionan los despliegues continuos, pero terminé volviendo a **MkDocs** porque lo que necesitaba no era tanto un sitio complejo, sino una documentación clara, organizada y profesional.  
MkDocs, además, es más compatible con el formato académico y con los flujos automatizados de GitHub Pages.  

Este cambio de enfoque me permitió entender la diferencia entre **presentar proyectos visualmente** y **documentar el proceso técnico de forma reproducible**, que es lo que realmente se evalúa en el curso.

---

## ⚙️ Desarrollo paso a paso

### 1. Creación del repositorio

Comencé a partir del template oficial [`ucudal/ia-portfolio-template`](https://github.com/ucudal/ia-portfolio-template) utilizando la opción **Use this template**.  
Evité hacer *fork* y configuré lo siguiente:

- **Owner:** `milagroscancela`  
- **Repository name:** `portfolio-ia`  
- **Visibilidad:** Pública  
- **Descripción:** Portafolio personal de Ingeniería de Datos — UCU  

Una vez creado, cloné el repo en mi MacBook y lo abrí con Visual Studio Code / Cursor.

---

### 2. Configuración de MkDocs

El template ya incluye el archivo `mkdocs.yml`, donde definí la estructura de navegación, tema visual y rutas:

```yaml
site_name: "Portafolio de Ingeniería de Datos — Milagros Cancela"
theme:
  name: material
  palette:
    primary: pink
    accent: purple
nav:
  - Inicio: index.md
  - Prácticas:
      - "01 — Exploración del Dataset Iris": portfolio/01-iris.md
      - "02 — Publicación del Portafolio": portfolio/02-portfolio.md
  - Acerca de mí: about.md
```

## ⚙️ 3. Activación de GitHub Pages con Actions

Una vez verificado el contenido local, pasé al **despliegue automático con GitHub Actions**.  
El proceso fue el siguiente:

1. En **Settings → Pages → Build and deployment**, seleccioné:
2. GitHub creó automáticamente un flujo de trabajo en  
`.github/workflows/ci.yml`, encargado de **construir el sitio** y **subirlo a la rama `gh-pages`**.  
3. Publiqué los cambios con los siguientes comandos:

```bash
git add .
git commit -m "feat: publicar portafolio con MkDocs"
git push origin main
```
4. Esperé entre 1 y 3 minutos a que el workflow finalizara correctamente en la pestaña Actions.

✅ Resultado:
Mi sitio quedó disponible públicamente en la URL:
👉 https://milagroscancela.github.io/portfolio-ia/

### 🧩 4. Troubleshooting y aprendizajes del despliegue

Durante el despliegue encontré algunos errores que me ayudaron a comprender mejor cómo funciona el flujo entre el build local, la rama gh-pages y los workflows de GitHub Actions:
- ❌ DNS check unsuccessful:
Al intentar usar un dominio personalizado (portafolio.milagroscancela.com), GitHub no encontraba los registros CNAME.
Lo solucioné eliminando temporalmente el dominio y volviendo a usar la URL por defecto de GitHub Pages.
- ❌ 404 tras el deploy:
El sitio tardó unos minutos en procesar el workflow. El truco fue limpiar la caché y esperar la confirmación verde en Actions antes de recargar la página.
- 💡 Tip técnico:
Si MkDocs no refleja los últimos cambios, ejecutar:
```bash
mkdocs build --clean
```
Esto fuerza la reconstrucción completa del sitio y limpia artefactos antiguos.
Estos pasos me sirvieron para consolidar la relación entre el entorno local y el entorno remoto, entendiendo mejor el ciclo CI/CD (Integración y Despliegue Continuo).

### ⚙️ Estructura de proyecto: 
``` bash 
docs/ 
├── index.md 
├── about.md 
├── portfolio/ 
│ └── actividades/ 
│ ├── act_uno_iris/ 
│ └── act_tres_portafolio/ 
└── assets/
```

## 💭 Reflexión Personal

Esta práctica me enseñó que **publicar un proyecto no es el final del proceso técnico**, sino una etapa más dentro de su ciclo de vida.  
Antes veía *MkDocs* solo como una herramienta de documentación, pero hoy lo entiendo como un **lenguaje para comunicar ingeniería**: una forma de estructurar resultados, visualizaciones y reflexiones con rigor técnico y claridad visual.

Mi breve paso por *Vercel* me sirvió para experimentar con frameworks más complejos, pero también me mostró que la **simplicidad de MkDocs es su mayor fortaleza**.  
Volver a MkDocs fue, en cierto modo, **volver al propósito original del curso**: documentar el pensamiento analítico detrás de cada práctica, no solo mostrar gráficos o métricas.

Además, configurar **GitHub Pages con Actions** me permitió comprender los fundamentos del **despliegue continuo (CI/CD)** y del **control de versiones** como prácticas reales de la ingeniería de datos moderna.

## 📚 Referencias

- [GitHub Docs — Getting Started with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages)  
- [GitHub Docs — Actions Quickstart](https://docs.github.com/en/actions/quickstart)  
- [Template oficial — ucudal/ia-portfolio-template](https://github.com/ucudal/ia-portfolio-template)  
- [MkDocs Material — Documentación oficial](https://squidfunk.github.io/mkdocs-material/)  
- Kurucz, J. (2025). *Publicar tu Portafolio con GitHub Pages.* Universidad Católica del Uruguay.

---

> 📁 **Ubicación:** `docs/portfolio/actividades/act_tres_portafolio/README.md`  
> 🌐 **Sitio activo:** [https://milagroscancela.github.io/portfolio-ia/](https://milagroscancela.github.io/portfolio-ia/)  
> 💬 **Último commit:** `feat: publicar portafolio con MkDocs`  
> 🧠 **Estado:** Deploy estable y verificado
