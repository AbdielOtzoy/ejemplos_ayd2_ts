import { Cart, CartItem } from "./cart";

type Zona = "local" | "foranea";

type CartSummary = {
  zona: Zona;
  items: CartItem[];
  subtotal: number;
  envio: number;
  total: number;
};

type CartWithSummary = Cart & {
  getSummary(zona: Zona): CartSummary;
};

describe("calcular el subtotal según la zona", () => {
  it("calcula el subtotal y el envío para la zona local", () => {
    const cart = new Cart() as CartWithSummary;
    cart.addProduct("P001", 2);

    const summary = cart.getSummary("local");

    expect(summary.subtotal).toBe(50);
    expect(summary.envio).toBe(25);
    expect(summary.total).toBe(75);
  });

  it("calcula el mismo subtotal y el envío para la zona foránea", () => {
    const cart = new Cart() as CartWithSummary;
    cart.addProduct("P001", 2);

    const summary = cart.getSummary("foranea");

    expect(summary.subtotal).toBe(50);
    expect(summary.envio).toBe(45);
    expect(summary.total).toBe(95);
  });

  it("aplica envío gratis en zona local cuando el subtotal llega a Q200", () => {
    const cart = new Cart() as CartWithSummary;
    cart.addProduct("P003", 1);
    cart.addProduct("P002", 4);

    const summary = cart.getSummary("local");

    expect(summary.subtotal).toBe(200);
    expect(summary.envio).toBe(0);
    expect(summary.total).toBe(200);
  });

  it("aplica envío gratis en zona foránea cuando el subtotal supera Q200", () => {
    const cart = new Cart() as CartWithSummary;
    cart.addProduct("P003", 1);
    cart.addProduct("P001", 1);

    const summary = cart.getSummary("foranea");

    expect(summary.subtotal).toBe(205);
    expect(summary.envio).toBe(0);
    expect(summary.total).toBe(205);
  });
});
