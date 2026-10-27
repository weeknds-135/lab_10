# Gestión de productos (Tarea – Laboratorio 10)

Aplicación web en **React + Vite** con **Tailwind CSS** y **shadcn/ui** para consultar y
registrar productos de un catálogo. Los datos son **simulados en memoria** (sin backend):
al recargar la página se vuelven a cargar los 5 productos iniciales.

## Requisitos
- Node.js 20.19 o superior (requerido por Vite 7)

## Ejecutar
```bash
npm install
npm run dev      # abre http://localhost:5173
```

Otros comandos:
```bash
npm test         # pruebas de la lógica de validación y generación de códigos
npm run build    # compilación de producción
```

## Estructura
```
src/
├── main.jsx                  # punto de entrada
├── App.jsx                   # estado principal (useState) y composición
├── index.css                 # Tailwind CSS + tema de shadcn/ui
├── data/productosIniciales.js# 5 productos de ejemplo
├── lib/
│   ├── productos.js          # validaciones, generación de código, formato de precio
│   ├── productos.test.js     # pruebas con node:test
│   └── utils.js              # cn() de shadcn/ui
└── components/
    ├── ProductForm.jsx       # formulario de registro (Input, Label, Select, Button, Alert)
    ├── ProductTable.jsx      # listado (Card, Table, Badge)
    └── ui/                   # componentes shadcn/ui
```

## Reglas de validación
| Campo | Regla |
|---|---|
| Descripción | obligatoria, mínimo 3 caracteres (sin contar espacios en los extremos) |
| Precio | obligatorio, número mayor que 0 |
| Categoría | obligatoria |
| Código | generado automáticamente (`PRD-001`, `PRD-002`, …), sin duplicados |
