# Consulta de Carga

## Ruta
Inicio > Inventarios > Consultas > Consulta de Carga

## Configuración 
La configuración de turnos se realiza en la siguiente tabla:
```anom010.b2_cve_par='W2' and anom010.b2_cve_sec in ('TURNOA', 'TURNOB')```


## Desarrollo 
###### Filtros
La consulta de datos se realiza en base a los filtros seleccionados, los filtros son:
- Almacén (Obligatorio)
- Rango de fechas
- Consultar Por: (Cajas, Packs o Ambas)
- Turno

Modulo para mostrar información de carga de mercancía en bodega, dependiendo de la opción a consultar. Se muestran cinco opciones de consultas que se representan en pestañas, las opciones son: **Diablos**, **Checadores**, **Zonas**, **Tiempo** y **Proveedor**.(A) Para visualizar la información, después de seleccionar los filtros (B) se debe hacer clic sobre una las opciones a consultar y se desplegaran los datos en un grid. Cada grid contiene diferentes columnas dependiendo de la opción donde se hace clic

![consultar](/consultaCarga/consultar.png)

El grid tiene la funcionalidad de doble clic para consultar detalle, el detalle cambia dependiendo de la opción de consulta, cuando se consulta Checadores, el detalle es por clave de viaje, cuando se consulta por otra opción el detalle es por artículo. El detalle es posible consultarlo por el total de registros haciendo doble clic sobre la fila total

![detalle](/consultaCarga/detalle.png)

