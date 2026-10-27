import { useState } from "react"
import { Info } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProductForm } from "@/components/ProductForm"
import { ProductTable } from "@/components/ProductTable"
import { PRODUCTOS_INICIALES } from "@/data/productosIniciales"
import { generarCodigo } from "@/lib/productos"

export default function App() {
  // Estado principal: la lista de productos vive aquí y se comparte por props
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES)
  const [ultimoCodigo, setUltimoCodigo] = useState(null)

  // Recibe datos ya validados, les asigna un código único y actualiza el estado.
  // React vuelve a renderizar la tabla automáticamente (sin recargar la página).
  function registrarProducto(datos) {
    const nuevo = { codigo: generarCodigo(productos), ...datos }
    setProductos([...productos, nuevo])
    setUltimoCodigo(nuevo.codigo)
    return nuevo
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight">Gestión de productos</h1>
          <p className="text-sm text-muted-foreground">
            Catálogo comercial · Prototipo con datos simulados en memoria
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
        <Alert>
          <Info />
          <AlertDescription>
            Esta aplicación no está conectada a un servidor ni a una base de datos. Los
            productos nuevos solo existen durante esta sesión; al recargar la página se
            vuelven a cargar los productos iniciales.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <ProductForm onRegistrar={registrarProducto} />
          <ProductTable productos={productos} ultimoCodigo={ultimoCodigo} />
        </div>
      </main>
    </div>
  )
}
