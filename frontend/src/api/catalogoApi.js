import { produtos } from "../mocks/produtos";

const USAR_MOCK = true; // quando o serviço de Catálogo estiver pronto, vira false

export const catalogoApi = {
  async listar() {
    if (USAR_MOCK) {
      await new Promise((r) => setTimeout(r, 400)); // simula a demora da rede
      return produtos;
    }
    // Depois: const { data } = await api.get("/produtos"); return data;
  },
};