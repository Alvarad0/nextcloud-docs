# Existencias Costeadas

## Ruta
Inicio > Inventarios > Consultas > Existencias Costeadas

## Desarrollo 
###### Filtros
- Almacén
- Proveedor
- Período
- Con Acelador (Optimización para futuras consultas)
- Tipo de Consulta (Almacén o Artículo)

El modulo muestra información del costo de existencias, proporciona el costo Inicial, costo de entrada, costo de salida y costo final, desglosado por almacén o artículo dependiendo de la opción que se seleccione en el filtro. Excluyendo los artículos que pertenecen a la línea 89 (Servicios)

En los filtros se encuentra un checkbox llamado **Con Acelerador** al seleccionar la opción y consultar, el proceso para obtener la información será mas rápido ya que se almacena en cache de BD la información, se recomienda que al inicio de cada mes se realice la consulta sin la opción seleccionada para que se actualice la información y para futuras consultas sea mas rápido el consultar la información

## Menú Grid
Al consultar la información por almacén o artículo y al hacer clic derecho sobre el grid se puede consultar

- **Exist. Cost. por Artíc x Almacén:** Se muestra el detalle de artículos del almacén seleccionado con los costos y existencias de artículos, de este grid se puede consultar
- **Detalle Artíc. x Almacén:** Muestra información por perdido los costos y existencias del articulo seleccionado, de este grid se puede consultar
- **Detalle Artíc. x Periodo:** Muestra información de costos y la diferencia del costo de entrada menos el costo de salida, del articulo, almacén y periodo seleccionado

![Grid](/existCosteadas/ns.png){data-zoomable}

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
