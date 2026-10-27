// Lógica de negocio del catálogo. Son funciones puras (sin React),
// por lo que se pueden probar fácilmente con `npm test`.

export const CATEGORIAS = [
  "Computación",
  "Periféricos",
  "Audio",
  "Oficina",
  "Accesorios",
]

export const DESCRIPCION_MINIMA = 3
export const PREFIJO_CODIGO = "PRD"

/**
 * Convierte el texto del campo precio a número.
 * - Devuelve null si el campo está vacío.
 * - Devuelve NaN si no es un número válido.
 * Acepta coma o punto como separador decimal ("12,50" o "12.50").
 */
export function parsearPrecio(valor) {
  const texto = String(valor ?? "").trim().replace(",", ".")
  if (texto === "") return null
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(texto)) return NaN
  return Number(texto)
}

/**
 * Valida los datos del formulario.
 * Devuelve un objeto con un mensaje por cada campo inválido;
 * si el objeto está vacío, los datos son válidos.
 */
export function validarProducto({ descripcion, precio, categoria }) {
  const errores = {}

  const desc = String(descripcion ?? "").trim()
  if (desc === "") {
    errores.descripcion = "La descripción es obligatoria."
  } else if (desc.length < DESCRIPCION_MINIMA) {
    errores.descripcion = `La descripción debe tener al menos ${DESCRIPCION_MINIMA} caracteres.`
  }

  const numero = parsearPrecio(precio)
  if (numero === null) {
    errores.precio = "El precio es obligatorio."
  } else if (Number.isNaN(numero)) {
    errores.precio = "El precio debe ser un número válido."
  } else if (numero <= 0) {
    errores.precio = "El precio debe ser mayor que cero."
  }

  if (!CATEGORIAS.includes(categoria)) {
    errores.categoria = "Debes seleccionar una categoría."
  }

  return errores
}

/**
 * Genera un código único con el formato PRD-001, PRD-002, ...
 * Parte del mayor correlativo existente + 1 y, como garantía adicional,
 * avanza mientras el código ya exista en la lista (nunca hay duplicados).
 */
export function generarCodigo(productos) {
  const usados = new Set(productos.map((p) => p.codigo))

  let siguiente =
    productos.reduce((max, p) => {
      const n = Number.parseInt(String(p.codigo).replace(/\D/g, ""), 10)
      return Number.isNaN(n) ? max : Math.max(max, n)
    }, 0) + 1

  let codigo = formatearCodigo(siguiente)
  while (usados.has(codigo)) {
    siguiente += 1
    codigo = formatearCodigo(siguiente)
  }
  return codigo
}

function formatearCodigo(numero) {
  return `${PREFIJO_CODIGO}-${String(numero).padStart(3, "0")}`
}

/** Da formato monetario al precio (soles). */
export function formatearPrecio(precio) {
  return `S/ ${Number(precio).toFixed(2)}`
}
