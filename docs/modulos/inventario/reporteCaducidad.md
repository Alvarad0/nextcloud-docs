# Reporte de Caducidad

## Ruta
Inicio > Inventarios > WMS > Reporte Caducidades

## Desarrollo 
Al cargar el modulo realiza una consulta para mostrar la existencia, el total de capacidad de cedis y el porcentaje de capacidad de todos los cedis
En la parte superior derecha del grid se encuentra el icono Actualizar para volver a consultar la información
![Caducidad](/reporteCaducidad/rc_01.png){data-zoomable}

## Menú Grid

###### Consultar Reporte Cad
Se muestra el reporte de caducidad separado por Almacén y por zonas de los cedis, ala izquierda se encuentra el reporte por almacén, en la columna **Descripción** se indica el rango de días de caducidad, en la columna **Cant. Tar** se muestra el total de tarimas que se encuentran en ese rango de días y por último la columna **Porc** muestra el porcentaje de la existencia. En el grid Detalle por zonas, se indica la zona, el porcentaje de la existencia, el total de posiciones y los rangos de días de caducidad
![Caducidad](/reporteCaducidad/rc_02.png){data-zoomable}

Del grid del reporte por almacén se tiene la posibilidad de hacer doble clic sobre los conceptos para poder visualizar los artículos que están siendo afectados, mostrando la cantidad que se tiene, el número de días para caducar y la fecha de caducidad
![Caducidad](/reporteCaducidad/rc_03.png){data-zoomable}

###### Consultar por Proveedor
Se debe especificar la clave del proveedor a consultar, para que se muestre el reporte con el número de posición, días que faltan para caducar, fecha de caducidad y costos de los artículos del proveedor seleccionado. Solo muestra los artículos que su estatus sea igual a 2
![Proveedor](/reporteCaducidad/rc_04.png){data-zoomable}

###### Tarimas sin posición
Muestra todos los artículos con la fecha de alta, la fecha de caducidad, el número de tarimas y cajas que existe en el cedis seleccionado que su posición actual sea diferente de 00-00-00-00 y su fecha de alta sea mayor al día anterior al que se consulta y tengan como estatus A
El grid tiene la opción de master detail, al hacer doble clic sobre la columna **Cve. Art** se puede ver las claves de las tarimas con fecha de alta y de caducidad, así como el número de cajas de la tarima del articulo donde se consulta
![Tarimas](/reporteCaducidad/rc_05.png){data-zoomable}

En la parte superior de los grid se muestra un breadcrumb que indica el seguimiento de donde se va consultando la información, teniendo la posibilidad de hacer clic en una posición para regresar inmediatamente a ese punto de la información 

:::details Query
  ```sql
    -- La informacion se obtiene de las siguientes tablas
    de_exist
    wm_tarim
    wm_dtarm -> con el campo f_caducidad se realiza el calculo del rango de días
    wm_posic
  ```
:::

