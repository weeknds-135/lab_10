from django.http import JsonResponse

# Datos de ejemplo con la estructura solicitada en la guía:
# codigo, descripcion, precio
PRODUCTOS = [
    {"codigo": 1, "descripcion": "Coca cola", "precio": 2.33},
    {"codigo": 2, "descripcion": "Fanta", "precio": 1.7},
    {"codigo": 3, "descripcion": "Inca Kola", "precio": 2.5},
    {"codigo": 4, "descripcion": "Agua mineral", "precio": 1.2},
]


def listar_productos(request):
    """Devuelve el listado de productos en formato JSON."""
    # safe=False porque la respuesta es una lista y no un diccionario
    return JsonResponse(PRODUCTOS, safe=False, json_dumps_params={"ensure_ascii": False})
