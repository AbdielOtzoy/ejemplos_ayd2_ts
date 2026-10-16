# Cloud, clase 2: módulos de Terraform y roles de Ansible

La misma web de `cloud-clase-1`, ahora sin PaaS: Terraform crea las VMs en Azure con **un módulo reutilizado en dos ambientes** y Ansible las configura con **roles**.

```
terraform/main.tf ── module "staging" (northcentralus, 1 VM) ─┐
                 └── module "prod"    (chilecentral,  2 VMs) ─┤ outputs: IPs
                                                              ▼
                                         ansible/inventory.ini (generado)
                                                              ▼
                              site.yml → roles common + webserver → nginx + web v1/v2
```

## Estructura

| Ruta | Para qué |
|---|---|
| `terraform/00-sin-modulos/main.tf` | Solo para mostrar: staging y prod copiados, con un error de SSH en prod. No se aplica. |
| `terraform/modules/web_server/` | El módulo: `variables.tf` (inputs), `main.tf` (RG, red, NSG, IPs, NICs, VMs), `outputs.tf` (IPs). |
| `terraform/main.tf` | Llama dos veces al módulo y genera el inventario de Ansible. |
| `ansible/playbook-plano.yml` | Versión "antes": todo en un playbook. |
| `ansible/site.yml` + `roles/` | Versión "después": el playbook solo compone roles. |
| `ansible/group_vars/` | Valores por ambiente: staging en v2, prod en v1. |

## Límites de Azure for Students (comprobados)

- Regiones permitidas: `northcentralus`, `chilecentral`, `spaincentral`, `belgiumcentral`, `norwayeast`.
- **Máximo 3 IPs públicas por región**, y ya hay una ocupada en `northcentralus` (`quetzalmart`). Por eso prod va en `chilecentral`, lo que de paso demuestra que el módulo se reutiliza cambiando solo `location`.
- `Standard_B1s` no tiene capacidad en `northcentralus`; se usa `Standard_B2ats_v2` (2 vCPU). Prod usa 4 de los 6 vCPU de la región.
- Costo aproximado: unos centavos por hora con las 3 VMs. **Siempre termina con `terraform destroy`.**

## Antes de la clase (día anterior)

```bash
az login                       # cuenta Azure for Students
az account show -o table
cd ejemplos/cloud-clase-2/terraform
terraform init
```

Ensayo completo: haz todo el recorrido de abajo una vez y destruye al final. Crear las VMs tarda de 3 a 5 minutos. Para grabar, puedes hacer el `apply` justo antes de empezar y en cámara mostrar solo el `plan` y el `apply` sin cambios.

## Recorrido en clase

**1. El problema (sin ejecutar nada).** Abre `terraform/00-sin-modulos/main.tf`: el mismo bloque dos veces y, en prod, SSH abierto a `*`. Pregunta: *¿quién se habría dado cuenta?*

**2. El módulo.** Muestra `modules/web_server/variables.tf` → `main.tf` → `outputs.tf` con la analogía de parámetros, cuerpo y `return`. Luego `terraform/main.tf`: dos llamadas de unas 10 líneas. Señala `count = var.instance_count` y que la regla de SSH existe una sola vez.

**3. Plan y apply.**

```bash
cd terraform
export TF_VAR_admin_cidr="$(curl -4 -s ifconfig.me)/32"   # solo tu IP podrá entrar por SSH
terraform plan          # observar module.staging.* y module.prod.*
terraform apply
terraform output
cat ../ansible/inventory.ini                               # el puente hacia Ansible
```

Pregunta: *¿las dos llamadas comparten la red?* Respuesta: no; cada instancia del módulo tiene sus propios recursos (ver `terraform state list`).

**4. Playbook plano.**

```bash
cd ../ansible
ansible web -m ping
ansible-playbook playbook-plano.yml
```

Funciona, pero pregunta: *¿cómo lo reutilizo en otro proyecto que también necesita nginx?*

**5. Roles.** Recorre `roles/webserver/`: `defaults` (inputs), `tasks`, `handlers` y `templates`. Muestra que `site.yml` queda en 5 líneas.

```bash
ansible-playbook site.yml                      # changed > 0
ansible-playbook site.yml                      # changed=0  ← idempotencia
curl -sI http://<ip-staging> | grep X-         # X-Ambiente: staging, X-Version: v2
curl -sI http://<ip-prod>    | grep X-         # X-Ambiente: prod,    X-Version: v1
```

Abre las IPs en el navegador: staging muestra v2 y prod muestra v1.

**6. Promover v2 a prod con un cambio de variable.** Edita `group_vars/prod.yml` (`web_version: v2`) o ejecuta:

```bash
ansible-playbook site.yml --limit prod -e web_version=v2
```

Observa que el handler `Recargar nginx` se ejecuta solo en prod y solo porque cambió la configuración.

**7. Cierre.**

```bash
cd ../terraform && terraform destroy
```

Pregunta de cierre: *¿por qué no hacer todo con Terraform, o todo con Ansible?*

## Si algo falla

- `SkuNotAvailable`: cambia `vm_size` en `modules/web_server/variables.tf` (revisa con `az vm list-skus -l <región> --size Standard_B`).
- `PublicIPCountLimitReached`: baja `instance_count` o mueve un ambiente a otra región permitida.
- `already exists - to be managed via Terraform this resource needs to be imported`: un `apply` se cortó a la mitad. Importa el recurso con `terraform import '<dirección>' <id de Azure>` y vuelve a aplicar.
- Ansible `UNREACHABLE`: tu IP cambió. Vuelve a exportar `TF_VAR_admin_cidr` y ejecuta `terraform apply`.
