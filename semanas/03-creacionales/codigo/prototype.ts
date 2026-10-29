/**
 * Prototype
 *
 * Una configuración base ya validada puede clonarse para crear variantes.
 * La lista de permisos se copia para evitar que una variante modifique la base.
 */

export class ConfiguracionReporte {
  constructor(
    public titulo: string,
    public permisos: string[],
  ) {}

  clone(): ConfiguracionReporte {
    return new ConfiguracionReporte(this.titulo, [...this.permisos]);
  }
}

export function demoPrototype(): void {
  console.log("\n=== Prototype ===");

  const plantillaBase = new ConfiguracionReporte("reporte mensual", ["admin"]);
  const configuracionSucursal = plantillaBase.clone();

  configuracionSucursal.titulo = "reporte mensual - sucursal norte";
  configuracionSucursal.permisos.push("supervisor");

  console.log("Base:", plantillaBase);
  console.log("Copia:", configuracionSucursal);
}

