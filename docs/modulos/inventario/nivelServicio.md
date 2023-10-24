# Nivel de Servicio

## Ruta
Inicio > Inventarios > Consultas > Nivel de Servicio

## Desarrollo 
###### Filtros
- Almacén (Obligatorio)
- Modelo de Negocio
- Rango de fechas

El modulo permite medir el nivel de servicio del área de operaciones, con respecto a la cantidad de pedidos Entregados y Pendientes por días, en Zonas Logísticas, Zonas de Ventas, Municipios y Vendedores. La información es diferente dependiendo del tipo de consulta que se elige en el filtro, cuando se selecciona Por Entregado o Por Pendiente la información en el grid se representa de la siguiente manera

- Las dos primeras columnas (A) para todos los casos muestran la zona, municipio o vendedor dependiendo de lo que se selecciona en el filtro (B)
- El resto de las columnas son los totales de pedidos, importe, peso
- Las filas de la parte inferior del grid (C) muestran los totales de pedidos, su porcentaje y el porcentaje acumulado

Para cuando la opción es **Por Entregado**:
- Las columnas **Ped1** a la **Ped7mas** muestra la cantidad de pedidos que se surtieron
- La columna **Días** muestra el numero de días que se tardo en entregar los pedidos, esto se obtiene del promedio de  la fecha de surtimiento y de movimiento menos la fecha de venta

![GridEntregado](/nivelServicio/grid.png){data-zoomable}

Para cuando la opción es **Por Pendiente**:
- Las columnas **0-1, 2, >3** representan los días, y las cantidades son el total de pedidos que se deben surtir en esa cantidad de días

![GridPendientes](/nivelServicio/grid_2.png){data-zoomable}

## Menú Grid
Cuando en el filtro Modelo de negocio se selecciona **Autoservicio** o **Cash** se habilita el menú en el grid, las opciones que se muestran dependen de la opción seleccionada en el filtro

<font size="2">
</font>

| Zona Logistica | Zona de Ventas |
| :----   | :----   |
| ![zonaLogistica](/nivelServicio/menu1.png){data-zoomable} | ![zonaVentas](/nivelServicio/menu2.png){data-zoomable} |
| Al hacer clic derecho sobre una fila se puede consultar [Detalle por Vendedor](#detVnd) de la zona seleccionada | al hacer clic derecho sobre la fila de las columnas pedidos se  puede consultar dos opciones, [Detalle Por Zona](#detZona) y [Detalle por Vendedor](#detVnd) |

###### Detalle por Zona {#detZona}
Muestra los folios de los pedidos por vendedor de zona seleccionada, el grid que resulta tiene la funcionalidad de hacer doble clic sobre un vendedor (A) para poder analizar cuales son los artículos (B) que tiene el folio de pedido
![DetZona](/nivelServicio/detzona.png){data-zoomable}

###### Detalle por vendedor {#detVnd}
Al igual que el grid principal, muestra las mismas columnas con la  información de los pedidos por días de surtimiento detallado por clave de vendedor. El grid muestra en las columnas de días de pedidos (A) unas cantidades, eso quiere decir que son los pedidos que tiene para surtir a ese numero de días, en el ejemplo de la imagen se puede ver que la columna Ped2 (B) tiene el numero 4, esos son el total de pedidos y el grid tiene la funcionalidad de hacer doble clic sobre el numero para poder ver el detalle de los pedidos (C), en la columna Cant.Ped (D) se puede ver que tiene el numero 18, esa es la suma de todos los pedidos e igual tiene la funcionalidad de doble clic y  muestra los 18 pedidos
![DetVnd](/nivelServicio/detVnd.png){data-zoomable}

Al hacer doble clic se muestra el detalle con los folios de pedidos y demás información, para análisis de los pedidos el grid tiene la funcionalidad de hacer doble clic sobre la fila del pedido (E) y consulta todos los artículos del pedido (F), en el cual se pueden ver las claves, cantidad solicitada, existencias e importe
![DetPedidos](/nivelServicio/detPed.png){data-zoomable}

## BD
La información se consulta de la tabla `ma_movar` pasando los parámetros del filtro, la condición del periodo debe ser `ma_movar.num_per ≤ periodo`

Para cuando se selecciona consultar por almacén se relaciona con la tabla `ma_almac` donde `ma_almac.cve_alm=ma_movar.cve_alm`

Para cuando se selecciona consultar por artículo se relaciona con la tabla `ma_artic` donde `ma_artic.clave=ma_movar.cve_art`

<font size="2">
</font>

| Columna | Descripción |
| :----   | :----   |
| **Costo inicial** | Es la suma de `cos_ent - cos_sal` donde `num_per` es menor al periodo seleccionado |
| **Costo de entrada** | Es la suma de `cos_ent` donde `num_per` es igual al periodo seleccionado |
| **Costo de salida** | Es la suma de `cos_sal` donde `num_per` es igual al periodo seleccionado |
| **Costo final** | Es la suma de Costo Inicial, Costo de entrada y Costo de salida |
