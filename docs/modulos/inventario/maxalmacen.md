# Máximos x Almacén

## Ruta
Inicio > Inventarios > Movimientos > Máximos x Almacén

## Funcionalidad

Este modulo permite administrar los máximos y mínimos de los articulos por almacén

## Configuraciones

Para poder operar adecuadamente la funcionalidad de máximos en una tienda es importante configurar los diferentes factores que ayudan y facilitan la funcionalidad.

<font size="2">
</font>

| Concepto | Registro | Ejemplo |
| :----       | :----       | :----         |
| Días para Surtir de CEDIS Seco | ```de_almac.num_dat='DC'``` | Podemos tener 21 dias para que el CEDIS surta a la tienda el 100% de su máximo |
| Días para Surtir de CEDIS Frio | ```de_almac.num_dat='DF'``` | Aplica para los proveedores que tengan el adicional CF |
| Días para Surtir el producto Directo de Prv	 | ```de_almac.num_dat='DD'``` | Cuando un proveedor como Bimbo, Coca, etc nos estaría surtiendo. Depende de que el proveedor tenga el adicional de proveedor directo |
| Tamaño de Almacén | ```de_almac.num_dat='TA'``` | Los tamaños se clasifican de la siguiente manera: **C** = Chica, **M** = Mediana, **G** = Grande, **O** = Mostrador, **A** = Abasto, **V** = Conveniencia, **I** = Mini, **R** = Resurtido |
| Surte desde CEDIS Frio | ```de_almac.num_dat='CF'``` | Los proveedores que tengan una **S** son los únicos que manejarán productos del CEDIS de frío |
| Días para Surtir de CEDIS **Seco** x Clasificación | ```de_almac.num_dat in ('D1','D2','D3','D4')``` | Cuando se desea definir los máximos por clasificación de los artículos, hay un cron job que los almacena en ```ma_exist.clasif``` y en base a eso se calculan los A,B,C,D respectivamente |
| Días para Surtir de CEDIS **Frio** x Clasificación | ```de_almac.num_dat in ('D5','D6','D7','D8')``` | Cuando se desea definir los máximos por clasificación de los artículos, hay un cron job que los almacena en ```ma_exist.clasif``` y en base a eso se calculan los A,B,C,D respectivamente |

## Botones
<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_bitacora.png' /> Bitacora Máximos</div></summary>

  Esta función permite consultar una bitacora de cambios de máximos, cuando el cambio se realiza desde el modulo Orden de Compra, se puede filtrar por rango de fechas, por artículo y por clave de almacén, la siguiente imagen es un ejemplo de como se visualiza la información

  ![Grid Bitacora de maximos](/maxalmacen/bitacora_maximos.jpg){data-zoomable}
  :::details Query
  ```sql
    select f_movto, cve_alm, cve_art, max_ant, max_nue, cve_usu, obser from ma_bitmax 
    where f_movto between to_date('07/04/2023', '%d/%m/%Y') and to_date('07/04/2023', '%d/%m/%Y') and cve_alm='301'
  ```
  :::
</details>

<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_paqueteria.png' /> Artículos en Paqueria</div></summary>

  Esta función permite consultar un listado de todos los articulos que dependen de una clave maestra, por ejemplo todos los .01, .02, etc. La siguiente imagen es un ejemplo de como se visualiza la información

  ![Grid Paqueria](/maxalmacen/paqueteria.png){data-zoomable}
  :::details Query
  ```sql
    select a.cve_art,trim(b.descri)||' '||b.pza_caj||'/'||b.presen as articulo,a.dato,
    c.clave,trim(c.descri)||' '||c.pza_caj||'/'||c.presen as c_madre
    from de_artic a, ma_artic b, ma_artic c
    where num_dat='MN' and dato like '%A%'
    and b.clave=a.cve_art
    and c.clave=a.cve_art[1,6]
  ```
  :::
</details>

<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_tendencia.png' /> Tendencia de Artículos</div></summary>

  Esta función permite consultar la tendencia de los articulos en base a la venta de los ultimos 60 días, en la parte superior del grid se encuentra una barra para seleccionar el rango de tendencia que se desea ver, por ejemplo si selecciona de -40 a 40, se mostraran los articulos que tengan tendencia de -100 a -40 y de 40 a 100, es decir se muestran los extremos del rango seleccionado

  El grid cuenta con dos dos opciones en su menu, al hacer clic derecho sobre un artículo se podra consultar el [Desplazamiento Diario](#desplDiario) y [Cambiar Clasficacion](#changeClasif)

  ![Grid Paqueria](/maxalmacen/tendencia.png){data-zoomable}
  :::details Query
  ```sql
    select clave,articulo,imp_vta,round(( ((n*sum_xy)-(sum_x*sum_y))/(sqrt(((n*sum_x2)-(sum_x*sum_x))*((n*sum_y2)-(sum_y*sum_y)))) )*100,2) as tendencia
    from (
    select clave, articulo, sum(imp_vta) as imp_vta,count(x) as n,sum(x) as sum_x, sum(y) as sum_y, sum(x*y) as sum_xy, sum(x*x) as sum_x2, sum(y*y) as sum_y2 from (
    select cve_art as clave, trim(descri)||' '||pza_caj||'/'||presen as articulo, can_vta as y,imp_vta as imp_vta, (year(today)-year(f_movto)||lpad(month(f_movto),2,'00')||lpad(day(f_movto),2,'00'))*1 as x
    from cn_artvpd, ma_artic where clave=cve_art
    and f_movto between today-60 and today
    and cve_vnd in (select cve_vnd from de_vendd where num_dat='AV' and dato='594')) group by 1,2) where (((n*sum_x2)-(sum_x*sum_x))*((n*sum_y2)-(sum_y*sum_y)))>0
    order by 4 asc
  ```
  :::
</details>

<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_excepciones.png' /> Excepciones de Artículos <a id="excepcionesArt"></a></div></summary>

  Esta función permite agregar los artículos a un periodo para que no se tomen en cuenta para el cálculo del máximo sugerido, es utilizada para agregar los artículos de temporalidad.
  Primero se tiene que seleccionar un periodo y luego subir el archivo de Excel con las claves, el formato de las columnas es: Cve. Art y Nombre de Articulo. Cuando el archivo se procesa se muestra un grid con las claves y al final de las columnas se muestra un icono para eliminar el artículo (A). Y al hacer clic en el botón Guardar Artículos se insertarán los artículos en el periodo seleccionado. La función solo la pueden aplicar los usuarios que tienen asignado el permiso ```usrinsert```

  ![Grid Paqueria](/maxalmacen/excepciones.png){data-zoomable}
  | Columna | Descripción |
  | :----    | :----    |
  | cve_art | Almacena la clave del articulo |
  | num_per | Almacena el periodo |
</details>

<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_directos.png' /> Directos Cedis</div></summary>

  Esta función consulta todos los artículos que pertenecen a proveedores directos, clasificados como proveedor principal, mostrando la existencia en Cedis, en Tienda y el importe de venta por artículo. Para poder realizar la consulta se debe seleccionar el periodo

  ![Grid Paqueria](/maxalmacen/excepciones.png){data-zoomable}
  :::details Query
  ```sql
    select d.existe as exis_cedis, e.existe as exis_tda, trim(a.clave) as cve_prv, trim(a.descri) as proveedor, trim(c.cve_art) as cve_art, trim(h.descri)||' '||h.pza_caj||'/'||h.presen as articulo,
    d.cve_alm as alm_cedis,d.maximo as max_cedis, g.imp_vta
    from ma_provd a, de_provd b, ma_exist e,de_vendd f,cn_artvnd g,ma_artic h, ma_prvar c
    left join ma_exist d on (d.cve_alm='301' and d.cve_art=c.cve_art and d.maximo>0)
    where  b.cve_prv=a.clave and b.num_dat='74' and b.dato='S'
    and c.cve_prv=a.clave and c.tip_prv='P'
    and e.cve_alm='594' and e.cve_art=c.cve_art
    and f.num_dat='AV' and f.dato=e.cve_alm
    and g.cve_vnd=f.cve_vnd and g.cve_art=c.cve_art and g.num_per='202302'
    and h.clave=c.cve_art
  ```
  :::
</details>

<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_clasificacion.png' /> Cambiar Clasificación</div></summary>

  Esta función permite reclasificar los artículos que no pertenecen a proveedores directos y que estén configurados como inventariarles, la clasificación es en base a la venta que hubo en el periodo seleccionado, de esta menare si en el periodo aún no están clasificados los artículos se podrá asignar una clasificación de periodos pasados para la administración de máximos  

  :::details Query
  ```sql
    --Tabla: ma_exist.clasif
  ```
  :::
</details>

<details>
  <summary><div class="btns"><img src='/maxalmacen/btn_maxmin.png' /> Actualizar Máximo/Mínimo masivo</div></summary>

  Esta función permite actualizar de manera masiva el máximo y mínimo de los artículos, se debe agregar todas las claves en un archivo de Excel, la estructura de columnas es la siguiente: Cve. Alm, Cve_Art, Máximo y Mínimo, después de seleccionar el archivo se debe hacer clic en el botón **Subir archivo** para procesar la información que se mostrara en un grid, donde se podrá revisar que la información sea correcta y si se necesita eliminar un artículo, se podrá hacer haciendo clic en el icono de eliminar 

  :::details Query
  ```sql
    --Tabla: ma_exist.maximo, ma_exist.minimo
  ```
  :::
</details>

## Desarrollo

###### Filtros
La consulta de datos se realiza en base a los filtros seleccionados, los filtros son:
- Almacén (Obligatorio)
- Proveedor
  - Tipo de Proveedor (Principal o Secundario), por default Principal
- Lineas
- Porcentaje de minimo sugerido, por default 65%
- Opcion para administrar (Máximo o Mínimo)

###### Máximos General
Esta opción permite administrar los máximos usando para el cálculo del **Máximo Sugerido** los días de clasificación, si no se selecciona un proveedor por default se toman los días de **clasificación seco**, en el caso que si se seleccionó un proveedor se tomaran los días dependiendo de su configuración si es un proveedor de frio o seco
Al hacer clic en el botón **Consultar** se muestra la información:

- Se muestra el **Tipo de sucursal**, para que al momento de estar asignando máximos se pueda tener referencia el tamaño de la sucursal que se afectara
- Se muestra la **clasificación**, donde se puede ver la cantidad de días de inventario que tiene configurado cada clasificación, en esta parte es posible cambiar la cantidad de días, haciendo doble clic sobre el número de días (A) convirtiendo en editable la cantidad, se debe borrar e ingresar la nueva cantidad y después se tiene que hacer clic sobre el botón Guardar (B) y si se guardó correctamente se muestra un mensaje indicándolo y automáticamente consulta nuevamente con la nueva configuración, si se hace clic en el botón cancelar regresara a los días que tenía configurado originalmente
- Se muestra la opción de **<a id="excepciones">Aplicar Excepciones</a>**, esto se muestra si en el periodo en curso existen claves con excepciones, proceso realizado en [Excepciones de Artículos](#excepcionesArt), primero se valida si el usuario tiene el permiso para aplicar excepciones y si tiene permisos, en el grid las claves que tengan excepciones en las columnas de periodos se mostraran con un fondo color grid y estas no se tomaran en cuenta para el cálculo del máximo sugerido y se recalculara el máximo sugerido aplicando la regla de excluir los periodos, si no tiene permisos solo se mostrara un mensaje
- Se muestra el botón **Guardar Max Sugerido** (C), este botón tomara la cantidad de la columna máximo sugerido y actualiza el máximo de cada artículo con esa cantidad, ignorando todas las claves que tienen en la columna **Max** del grid el valor de **-1**. Cuando se modifica un valor de la columna **Max** del grid este botón cambia su nombre por **Guardar Cambios** esto significa que solo actualizara el máximo de los artículos que se modificaron manualmente
> Estas funciones solo se pueden ejecutar si el usuario tienen asignado el permiso ```usrinsert```

![Configuracion](/maxalmacen/header.png){data-zoomable}

**Grid Artículos**
En grid se muestran todos los artículos de acuerdo a los filtros seleccionados, cuando no se selecciona un proveedor muestra los artículos excluyendo los que tienen configurado un proveedor de fríos y que pertenecen a proveedores directos, en caso contrario muestra todos los artículos que tenga configurado el proveedor dependiendo de si se filtra por proveedor principal o secundario<br>

El orden de las columnas del grid es el siguiente: 
| Columna | Descripción |
| :----   | :----       |
| Clave, Descripcion | Clave del articulo y nombre del articulo |
| Clasif | Clasificación del artículo de seco o frio |
| Tipo | Tipo de almacén |
| Directo | Indica con la letra **D** si es un artículo de un proveedor directo |
| Columnas de periodos | Muestra la cantidad de artículos vendidos de los últimos 4 meses |
| Prom | Promedio de ventas de los últimos 4 meses |
| Mayor | La venta más alta de los últimos 4 meses |
| Exis | Existencia actual del artículo en el almacén seleccionado |
| Max | Máximo actual del articulo |
| Sugerido | [Formula Máximo Sugerido](#formula) |
| Días Max | Días de inventario, este valor se obtiene aplicando la siguiente formula: _(máximo/promedio)*30.4_|
| Min | Mínimo actual del artículo, en el almacén seleccionado | 
| Min. Sugerido | Mínimo sugerido por el sistema, aplicando la siguiente formula: _(máximo/100)*porcentaje especificado en el filtro, por default 65_ | 
| Exce | Diferencia entre la existencia y el máximo actual del articulo | 

En la columna **sugerido** se podrán encontrar dos colores; 
- Verde, significa que el sugerido por el sistema es mayor al máximo actual
- Rojo, significa que el sugerido es menor o igual al promedio
Esta columna tiene la opción de que al hacer doble clic sobre el valor sugerido en automático se copia el sugerido a la columna de máximo y cuando se coloca le mouse en el nombre de la columna se muestra un mensaje indicando el significado de los colores explicados anteriormente (A)

Esta columna tiene la opción de que al hacer doble clic sobre el valor sugerido en automático se copia el sugerido a la columna de máximo y cuando se coloca le mouse en el nombre de la columna se muestra un mensaje indicando el significado de los colores explicados anteriormente
El grid en la parte superior se encuentra una caja de texto para poder filtrar por clave o nombre de articu 
En la primera columna del grid se encuentran un checkbox (C) que permite seleccionar la clave del articulo y es utilizado para cuando se desea [Cambiar Clasificación](#changeClasif) a un rango de artículos

Las opciones del menú del grid son:
- [Consultar articulo por almacén](#consulArt)
- [Desplazamiento Diario](#desplDiario)
- [Cambiar Clasificación](#changeClasif)

###### Formula Máximo Sugerido {#formula}
_maxSugerido = (venta / 30.4) * dias_

Si la venta de los dos últimos dos meses es igual a 0, el máximo sugerido es 0 \
Para obtener el valor de **venta** se realiza de la siguiente manera:
1. Si la venta del último mes es mayor al promedio, **venta** es igual a la venta del último mes
2. Si el punto 1 no se cumple, se valida si el promedio es mayor a la venta del último mes multiplicado por 2, **venta** es igual a promedio dividido entre 2, en caso contrario **venta** es igual a promedio

Para obtener el valor de **dias** se realiza de la siguiente manera:
Si el proveedor es directo se toman el valor configurado en ```de_almac.num_dat='DD'``` en caso contrario se toma el valor de ```de_almac.num_dat='DC'``` del almacén seleccionado

Después de obtener el valor de **venta** y de **dias**, se deben aplicar las siguientes validaciones:
1. Máximo sugerido mayor a 0
2. Máximo sugerido menor a piezas por caja
3. Clave de artículo sea clave maestra
4. La división del total de piezas por caja entre la venta mayor sea menor o igual a 1.1

Si las 4 validaciones anteriores se cumplen, el valor de la columna **sugerido** será el resultado de la formula, en caso contrario será el total de piezas de la caja del artículo

###### Máximos o Mínimos
Para cuando se selecciona la opción Máximos o Mínimos, de las opciones Cambiar del filtro, tienen la funcionalidad de Máximos General, con la diferencia de que en estas opciones el sugerido se calcula en base a los **Días Cedis** o **Días Directos** y para la opción mínimo como su nombre lo indica, solo funcionan para administrar los mínimos por articulo y por almacén

## Menú Grid

## Consultar articulo por almacén {#consulArt}
Función que permite visualizar la información que se visualiza en el grid principal, pero por el artículo seleccionado por todos los almacenes. Para la columna sugerido en la [Formula Máximo Sugerido](#formula) se explica que se toma el día del almacén seleccionado, pero para este caso se toma el día que tenga configurado cada almacén que se muestra en el grid

En la parte superior se encuentran las siguientes funciones:
- **Días Cedis y Días Directos:** Estos son los días del almacén seleccionado en el filtro inicial, y es utilizado para cuando se desea recalcular el sugerido por el sistema con una misma cantidad de Días Cedis o Días Directos para todos los almacenes, esto no actualiza los días configurado para cada almacén. Para activar la opción de recalcular solo se debe hacer doble clic sobre la cantidad de días (A), escribir la nueva cantidad y clic en el botón Recalcular
- **[Aplicar Excepciones de Artículos](#excepciones)**
- **Copiar Máximos Desde:** Esta función permite copiar la configuración de máximos y mínimos de un artículo al artículo seleccionado, es utilizado en casos cuando un artículo cambia de presentación y se tiene que crear un artículo nuevo. En el grid se mostrarán los nuevos máximos y mínimos y al hacer clic en el botón **Guardar Max. General** (B) se guardarán los máximos y mínimos

![Articulos por almacen](/maxalmacen/artalmac.png){data-zoomable}

En el grid se muestran todos los almacenes y se heredan las mismas funciones del grid de artículos, solo se agregó una columna más que indica el tamaño de la sucursal y en la columna Max al escribir una cantidad en la parte inferior derecha se muestra un punto en color azul (A) y al hacer clic se cambiara el curso por un símbolo de más (B) y al arrastrar sobre las otras filas se copia el valor sobre las filas seleccionadas (C) 
![Articulos por almacen](/maxalmacen/artalmac2.png){data-zoomable}

## Desplazamiento Diario {#desplDiario}
Función que muestra la venta diaria del articulo seleccionado, por default se muestran 30 días atrás a partir del día en curso. La información se representa en una gráfica, mostrando cantidad, precio de venta y existencia por día. Esta función también tiene la posibilidad de mostrar los planes que haya tenido el artículo en las fechas que se muestran, y si el articulo tiene planes se representa en la gráfica con una línea, desde el día que inicia hasta donde termina el plan (A)
Si existe un plan se puede hacer clic sobre un punto de la línea y debajo de la gráfica se mostrará información del plan (B) y para quitar la información del plan se tiene que hacer clic sobre otro punto de la gráfica

###### Botones de la ventana Desplazamiento Diario

**30 días atrás:** Como su nombre lo indica, muestra 30 días atrás de venta \
**30 días adelante:** Como su nombre lo indica, muestra 30 días hacia adelante de venta \
**Ver Tabla:** Cambia de la vista de grafica a la vista con el grid mostrando las columnas, para regresar a la vista grafica se tiene que hacer clic en el botón Ver Gráfica \
**Existencia Por Almacén:**  Consulta el articulo por todos los almacenes, por todos los días del mes en curso indicando por día la existencia que había, al final del grid se puede ver la cantidad de días que estuvo en ceros y la cantidad de días que tuvo negados el almacén, para regresar a la vista de desplazamiento se debe hacer clic en el botón Regresar que se encuentra en la parte superior del grid

Si la clave del usuario no existe en ```ma_prvus``` no podrá consultar la información y se le mostrara un mensaje indicando que no tiene permisos para consultar
![Desplazamiento Diario](/maxalmacen/desplazamiento.png){data-zoomable}

:::details Query
  ```sql
    --Venta por dia
    select a.*, round((a.total + .000001)/(a.cantid + .000001), 2) as precio from 
    (select trim(a.cve_art) as cve_art, a.f_movto, day(a.f_movto) as dia, trim(b.descri)||' '||b.pza_caj||'/'||trim(b.presen) as articulo, sum(a.can_vta) as cantid, sum(a.imp_vta) as total
    from cn_artvpd a, ma_artic b, ma_prvus c 
    where a.cve_art='160468' 
    and a.f_movto between TO_DATE('03-01-2023', '%m-%d-%Y') and TO_DATE('03-31-2023','%m-%d-%Y') 
    and a.cve_prv='007818'     
    and b.clave=a.cve_art and c.cve_usu='90154' 
    and a.cve_vnd in (select cve_vnd from de_vendd where num_dat='AV' and dato='594')
    and trim(c.cve_prv)=case when (select cve_prv from ma_prvus where cve_usu='90154' and cve_prv='999999') == '999999' then '999999' else trim(a.cve_prv) end    
    and c.cns_sn='S' group by 1,2,3,4 order by 2 desc) a

    --Existencia por dia
    select * from cn_exdia where num_per='202303' and can_cer >= 0 and cve_alm='594' and cve_art='160468'
  ```
  :::

## Cambiar Clasificación {#changeClasif}

Función que permite cambiar la clasificación de los artículos, esta clasificación es la que tiene configurada el articulo dependiendo si es clasificación Seco o Frio.  Se puede realizar por un solo artículo o seleccionar varios artículos haciendo clic en el checkbox del grid, después se muestra una venta para seleccionar la nueva clasificación (A), después pregunta si el cambio será para todos los almacenes o solo para el almacén seleccionado (B) al confirmar en la parte superior del grid se mostrará una barra de progreso (C) y al terminar se mostrará un mensaje de confirmación en caso de error se mostrará el mensaje
![Clasificacion](/maxalmacen/clasificacion.png){data-zoomable}

:::details Query
  ```sql
    --Tabla: ma_exist.clasif
  ```
  :::