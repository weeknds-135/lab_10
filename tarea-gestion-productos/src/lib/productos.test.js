import test from "node:test"
import assert from "node:assert/strict"

import {
  CATEGORIAS,
  generarCodigo,
  parsearPrecio,
  validarProducto,
} from "./productos.js"
import { PRODUCTOS_INICIALES } from "../data/productosIniciales.js"

const valido = { descripcion: "Webcam HD", precio: "89.90", categoria: "Periféricos" }

test("1. Hay al menos cinco productos iniciales con todos los campos", () => {
  assert.ok(PRODUCTOS_INICIALES.length >= 5)
  for (const p of PRODUCTOS_INICIALES) {
    assert.ok(p.codigo && p.descripcion && p.precio > 0 && p.categoria)
    assert.ok(CATEGORIAS.includes(p.categoria))
  }
  const codigos = PRODUCTOS_INICIALES.map((p) => p.codigo)
  assert.equal(new Set(codigos).size, codigos.length, "códigos iniciales únicos")
})

test("2. Datos válidos no generan errores", () => {
  assert.deepEqual(validarProducto(valido), {})
})

test("4. Descripción vacía o con menos de 3 caracteres se rechaza", () => {
  assert.ok(validarProducto({ ...valido, descripcion: "" }).descripcion)
  assert.ok(validarProducto({ ...valido, descripcion: "   " }).descripcion)
  assert.ok(validarProducto({ ...valido, descripcion: "ab" }).descripcion)
  assert.ok(validarProducto({ ...valido, descripcion: " a " }).descripcion)
  assert.equal(validarProducto({ ...valido, descripcion: "abc" }).descripcion, undefined)
})

test("5. Precio vacío, cero, negativo o no numérico se rechaza", () => {
  for (const precio of ["", "  ", "0", "0.00", "-5", "-0.01", "abc", "12abc", "1.2.3"]) {
    assert.ok(validarProducto({ ...valido, precio }).precio, `debe rechazar "${precio}"`)
  }
  for (const precio of ["0.01", "1", "89,90", "100.5"]) {
    assert.equal(validarProducto({ ...valido, precio }).precio, undefined, `debe aceptar "${precio}"`)
  }
})

test("6. Sin categoría (o categoría desconocida) se rechaza", () => {
  assert.ok(validarProducto({ ...valido, categoria: "" }).categoria)
  assert.ok(validarProducto({ ...valido, categoria: "Inventada" }).categoria)
})

test("parsearPrecio acepta coma decimal", () => {
  assert.equal(parsearPrecio("12,50"), 12.5)
  assert.equal(parsearPrecio(""), null)
  assert.ok(Number.isNaN(parsearPrecio("x")))
})

test("3. generarCodigo produce códigos únicos y consecutivos", () => {
  let lista = [...PRODUCTOS_INICIALES]
  const codigos = new Set(lista.map((p) => p.codigo))
  for (let i = 0; i < 50; i++) {
    const codigo = generarCodigo(lista)
    assert.ok(!codigos.has(codigo), `duplicado: ${codigo}`)
    codigos.add(codigo)
    lista = [...lista, { codigo }]
  }
})

test("generarCodigo evita colisiones aunque falten números en la secuencia", () => {
  const lista = [{ codigo: "PRD-001" }, { codigo: "PRD-007" }]
  assert.equal(generarCodigo(lista), "PRD-008")
  assert.equal(generarCodigo([]), "PRD-001")
})
