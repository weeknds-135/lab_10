# Backend Django – Servicio web de productos

## Ejecutar
```bash
python -m venv .venv
.venv\Scripts\activate          # Windows  (Linux/macOS: source .venv/bin/activate)
pip install -r requirements.txt  # incluye: pip install django-cors-headers
python manage.py migrate         # opcional, evita el aviso de migraciones pendientes
python manage.py runserver
```
Abrir <http://127.0.0.1:8000/api/producto/> y se verá:
```json
[
  {"codigo": 1, "descripcion": "Coca cola", "precio": 2.33},
  {"codigo": 2, "descripcion": "Fanta", "precio": 1.7},
  ...
]
```

## Configuración de CORS (`lab10_api/settings.py`)
1. `pip install django-cors-headers`
2. Agregar `'corsheaders'` a `INSTALLED_APPS`.
3. Agregar `'corsheaders.middleware.CorsMiddleware'` al inicio de `MIDDLEWARE`.
4. `CORS_ALLOW_ALL_ORIGINS = True` (nombre actual de `CORS_ORIGIN_ALLOW_ALL`).
