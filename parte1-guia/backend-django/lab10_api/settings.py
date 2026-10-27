"""
Configuración del servicio web del Laboratorio 10.
Proyecto mínimo: solo expone un listado de productos en JSON.
"""
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-solo-para-laboratorio-no-usar-en-produccion"
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "corsheaders",   # Paso 4: aplicación django-cors-headers
    "productos",     # aplicación con el servicio web de productos
]

MIDDLEWARE = [
    # Paso 5: debe ir lo más arriba posible, antes de CommonMiddleware
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

# Paso 6: habilitar CORS para todos los dominios
# (en la guía aparece como CORS_ORIGIN_ALLOW_ALL; en versiones actuales se llama así:)
CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = "lab10_api.urls"
WSGI_APPLICATION = "lab10_api.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LANGUAGE_CODE = "es-pe"
TIME_ZONE = "America/Lima"
USE_I18N = True
USE_TZ = True
