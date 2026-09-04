import { Cart } from "./cart";

describe("agregar productos al carrito", () => {
  it("agrega un producto con su cantidad", () => {
    const cart = new Cart();

    const item = cart.addProduct("P001", 2);

    expect(item).toMatchObject({ productoId: "P001", cantidad: 2 });
    expect(cart.getItems()).toHaveLength(1);
  });

  it("acumula la cantidad cuando se agrega el mismo producto nuevamente", () => {
    const cart = new Cart();

    cart.addProduct("P001", 2);
    const item = cart.addProduct("P001", 3);

    expect(item.cantidad).toBe(5);
    expect(cart.getItems()).toEqual([
      expect.objectContaining({ productoId: "P001", cantidad: 5 })
    ]);
  });

  it.each([0, -1, 1.5])(
    "rechaza una cantidad inválida: %p",
    (cantidad) => {
      const cart = new Cart();

      expect(() => cart.addProduct("P001", cantidad)).toThrow(
        "La cantidad debe ser un entero positivo"
      );
      expect(cart.getItems()).toHaveLength(0);
    }
  );

  it("rechaza un producto inexistente sin modificar el carrito", () => {
    const cart = new Cart();

    expect(() => cart.addProduct("P999", 1)).toThrow(
      "Producto inexistente: P999"
    );
    expect(cart.getItems()).toHaveLength(0);
  });
});
