export type Product = {
  productoId: string;
  nombre: string;
  precio: number;
};

export type CartItem = Product & {
  cantidad: number;
};

export type Zona = "local" | "foranea";

export type CartSummary = {
  zona: Zona;
  items: Array<CartItem & { importe: number }>;
  subtotal: number;
  envio: number;
  total: number;
};

export const catalogo: readonly Product[] = [
  { productoId: "P001", nombre: "Cuaderno", precio: 25 },
  { productoId: "P002", nombre: "Lapicero", precio: 5 },
  { productoId: "P003", nombre: "Mochila", precio: 180 }
];

export class Cart {
  private readonly items = new Map<string, CartItem>();

  addProduct(productoId: string, cantidad: number): CartItem {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("La cantidad debe ser un entero positivo");
    }

    const product = catalogo.find((item) => item.productoId === productoId);
    if (!product) {
      throw new Error(`Producto inexistente: ${productoId}`);
    }

    const current = this.items.get(productoId);
    const item: CartItem = {
      ...product,
      cantidad: (current?.cantidad ?? 0) + cantidad
    };

    this.items.set(productoId, item);
    return { ...item };
  }

  getItems(): CartItem[] {
    return [...this.items.values()].map((item) => ({ ...item }));
  }

  // Permite iniciar cada escenario con un carrito limpio.
  clear(): void {
    this.items.clear();
  }

  getSummary(zona: Zona): CartSummary {
    if (zona !== "local" && zona !== "foranea") {
      throw new Error("La zona debe ser local o foranea");
    }

    const items = this.getItems().map((item) => ({
      ...item,
      importe: item.precio * item.cantidad
    }));
    const subtotal = items.reduce((total, item) => total + item.importe, 0);
    const envio = subtotal === 0 || subtotal >= 200
      ? 0
      : zona === "local"
        ? 25
        : 45;

    return {
      zona,
      items,
      subtotal,
      envio,
      total: subtotal + envio
    };
  }
}
