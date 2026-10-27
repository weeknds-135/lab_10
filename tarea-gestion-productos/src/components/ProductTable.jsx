import { PackageOpen } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { formatearPrecio } from "@/lib/productos"

/**
 * Sección de listado: solo muestra los productos que recibe por props.
 * No guarda estado propio; la tabla se actualiza cuando cambia `productos`.
 */
export function ProductTable({ productos, ultimoCodigo }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos registrados</CardTitle>
        <CardDescription>
          {productos.length} {productos.length === 1 ? "producto" : "productos"} en el catálogo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Datos simulados en memoria: se perderán al recargar la página.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead>Categoría</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  <PackageOpen className="mx-auto mb-2 size-6" aria-hidden="true" />
                  Aún no hay productos registrados.
                </TableCell>
              </TableRow>
            ) : (
              productos.map((p) => (
                <TableRow
                  key={p.codigo}
                  className={cn(p.codigo === ultimoCodigo && "bg-green-50 hover:bg-green-50")}
                >
                  <TableCell className="font-mono text-xs">{p.codigo}</TableCell>
                  <TableCell className="whitespace-normal font-medium">{p.descripcion}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatearPrecio(p.precio)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.categoria}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
