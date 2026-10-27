from django.urls import path

from . import views

urlpatterns = [
    # URL que consume React: http://localhost:8000/api/producto/
    path("api/producto/", views.listar_productos, name="listar_productos"),
]
