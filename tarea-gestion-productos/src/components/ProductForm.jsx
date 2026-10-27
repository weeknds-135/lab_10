import { useState } from "react"
import { CheckCircle2, CircleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { CATEGORIAS, parsearPrecio, validarProducto } from "@/lib/productos"

const FORMULARIO_VACIO = { descripcion: "", precio: "", categoria: "" }

/**
 * Sección de registro. Mantiene el estado del formulario (valores, errores y
 * mensaje) y, cuando los datos son válidos, se los entrega al padre mediante
 * la función `onRegistrar`, que devuelve el producto ya creado con su código.
 */
export function ProductForm({ onRegistrar }) {
  const [valores, setValores] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null) // { tipo: "exito" | "error", texto }

  // Evento onChange: actualiza el campo modificado y quita su error
  function handleChange(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: undefined }))
  }

  // Evento onSubmit: valida y, si todo es correcto, registra el producto
  function handleSubmit(evento) {
    evento.preventDefault()

    const erroresEncontrados = validarProducto(valores)
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados)
      setMensaje({
        tipo: "error",
        texto: "No se pudo registrar el producto. Revisa los campos marcados.",
      })
      return
    }

    const nuevo = onRegistrar({
      descripcion: valores.descripcion.trim(),
      precio: Math.round(parsearPrecio(valores.precio) * 100) / 100,
      categoria: valores.categoria,
    })

    setValores(FORMULARIO_VACIO)
    setErrores({})
    setMensaje({
      tipo: "exito",
      texto: `"${nuevo.descripcion}" se registró con el código ${nuevo.codigo}.`,
    })
  }

  // Evento onClick del botón Limpiar: restablece campos, errores y mensaje
  function handleLimpiar() {
    setValores(FORMULARIO_VACIO)
    setErrores({})
    setMensaje(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar producto</CardTitle>
        <CardDescription>
          El código se genera automáticamente al registrar.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <CardContent className="flex flex-col gap-5">
          {mensaje && (
            <Alert variant={mensaje.tipo === "exito" ? "success" : "destructive"}>
              {mensaje.tipo === "exito" ? <CheckCircle2 /> : <CircleAlert />}
              <AlertTitle>
                {mensaje.tipo === "exito" ? "Producto registrado" : "Error de validación"}
              </AlertTitle>
              <AlertDescription>{mensaje.texto}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              name="descripcion"
              placeholder="Ej. Webcam Full HD"
              value={valores.descripcion}
              onChange={handleChange}
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={errores.descripcion ? "descripcion-error" : undefined}
              autoComplete="off"
            />
            {errores.descripcion && (
              <p id="descripcion-error" className="text-sm text-destructive">
                {errores.descripcion}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="precio">Precio de venta (S/)</Label>
            <Input
              id="precio"
              name="precio"
              type="text"
              inputMode="decimal"
              placeholder="Ej. 89.90"
              value={valores.precio}
              onChange={handleChange}
              aria-invalid={Boolean(errores.precio)}
              aria-describedby={errores.precio ? "precio-error" : undefined}
              autoComplete="off"
            />
            {errores.precio && (
              <p id="precio-error" className="text-sm text-destructive">
                {errores.precio}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="categoria">Categoría</Label>
            <Select
              id="categoria"
              name="categoria"
              value={valores.categoria}
              onChange={handleChange}
              aria-invalid={Boolean(errores.categoria)}
              aria-describedby={errores.categoria ? "categoria-error" : undefined}
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </Select>
            {errores.categoria && (
              <p id="categoria-error" className="text-sm text-destructive">
                {errores.categoria}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <Button type="submit">Registrar producto</Button>
          <Button type="button" variant="outline" onClick={handleLimpiar}>
            Limpiar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
