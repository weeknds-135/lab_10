# Frontend React (lab10) – consumo del servicio web

Proyecto equivalente al generado con `npx create-react-app lab10` (Create React App
está descontinuado; aquí ya vienen los archivos listos).

```bash
npm install
npm start        # http://localhost:3000
```
Antes, levantar el backend Django (`python manage.py runserver`, puerto 8000).

- Mientras llega la respuesta se muestra **"recuperando datos..."** (`recuperado: false`).
- Al recibir el JSON se actualiza el estado (`recuperado: true`) y se muestra la tabla.
