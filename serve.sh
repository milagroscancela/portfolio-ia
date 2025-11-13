#!/bin/bash
# Script para iniciar el servidor de MkDocs

cd "$(dirname "$0")"
echo "🚀 Iniciando servidor MkDocs..."
echo "📖 Sitio disponible en: http://127.0.0.1:8000"
echo "⚠️  Presiona Ctrl+C para detener el servidor"
echo ""
mkdocs serve --dev-addr=127.0.0.1:8000





