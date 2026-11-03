import { test, expect } from "@playwright/test";
import { resetAndSeed } from "./helpers";

test.beforeEach(async ({ baseURL }) => {
  await resetAndSeed(baseURL!);
});

test("crear, leer, modificar y eliminar una nota", async ({ request }) => {
  const inicial = await request.get("/notes");
  expect(inicial.status()).toBe(200);
  expect(await inicial.json()).toHaveLength(2);

  // crear
  const creada = await request.post("/notes", {
    data: { title: "Comprar pan", content: "Antes de las 20hs" },
  });
  expect(creada.status()).toBe(201);
  const nota = await creada.json();
  expect(nota.pinned).toBe(false);

  // leer
  const leida = await request.get(`/notes/${nota.id}`);
  expect(leida.status()).toBe(200);
  expect((await leida.json()).title).toBe("Comprar pan");

  // modificar
  const modificada = await request.patch(`/notes/${nota.id}`, {
    data: { content: "Antes de las 21hs" },
  });
  expect(modificada.status()).toBe(200);
  const cuerpo = await modificada.json();
  expect(cuerpo.content).toBe("Antes de las 21hs");
  expect(cuerpo.title).toBe("Comprar pan");

  // eliminar
  const eliminada = await request.delete(`/notes/${nota.id}`);
  expect(eliminada.ok()).toBeTruthy();

  // ya no existe
  const despues = await request.get(`/notes/${nota.id}`);
  expect(despues.status()).toBe(404);
});

test("caso de error: pedir una nota inexistente devuelve 404", async ({
  request,
}) => {
  const res = await request.get("/notes/9999");
  expect(res.status()).toBe(404);
});
