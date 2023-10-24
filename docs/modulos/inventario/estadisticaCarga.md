# Estadistica de Carga

## Ruta
Inicio > Inventarios > Consultas > Estadistica de Carga

## Desarrollo 
###### Filtros
- Almacén (Obligatorio)
- Modelo de negocio
- Fechas

Modulo para consultar la información de carga en bodega y comparar con otros días de carga. Los datos que se muestran son posiciones recorridas, cantidad solicitada y cantidad surtida

Para consultar la información es obligatorio seleccionar la clave de almacén, el filtro de Modelos de negocios se puede dejar vacío o se puede seleccionar más de un modelo, al hacer clic en el botón **Consultar** se muestra la gráfica con los totales por rango de día seleccionado. Al pasar el mouse por cada nodo de la gráfica se muestra el total de las Posiciones, Cantidad Surtida o Cantidad Solicitada y en el sidebar se habilita la opción **Comparar Días** (A)
Para ver el detalle por hora se debe hacer clic sobre un nodo de la gráfica (B) y se mostrara una nueva grafica por horas

![carga](/estadisticaCarga/carga.png){data-zoomable}

Al seleccionar **Comparar Días**, se habilitan las opciones Posiciones, Cantidad Surtida y Cantidad Solicitada, y estas serán las opciones que se van a tomar para comparar los días. Por ejemplo, al seleccionar **Posiciones** (C) y al hacer clic en el nodo de un día (D), se mostrará el detalle con las opciones seleccionadas en el filtro. En el módulo se encuentra un icono de tabla (E), al hacer clic se mostrará la información en formato de tabla y al hacer clic nuevamente en el icono regresará a la vista de gráfica

![detallehora](/estadisticaCarga/detallehora.png){data-zoomable}

En el grid se encuentra la información agrupada por día (F), para ver el detalle por hora se encuentra un icono de fecha (G) en la columna Fecha y al hacer clic se desplegará la información por hora

![grid](/estadisticaCarga/grid.png){data-zoomable}

