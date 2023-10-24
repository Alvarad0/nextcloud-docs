# Formulas

## Ruta
Inicio > Inventarios > Catalogos > Formulas

## Funcionalidad
Modulo para administrar fórmulas de producción, desde este módulo se tendrá la posibilidad de crear, editar y desactivar/activar formulas

## Desarrollo 
Al cargar el modulo se muestra un grid donde se pueden ver todas las formulas creadas, y en la parte superior del grid se encuentra dos botones:
- [Agregar Formula](#agregarFormu)
- Consultar: Consulta todas las formulas creadas
En el grid, en la columna Cve. Formula se encuentra un icono con forma de flecha (A) y al dar clic sobre el icono se desplegará el detalle mostrando todos los artículos de la formula.

###### Columnas Formulas
| Columna | Descripción |
| :------ | :----       |
| Cve. Formula | ```ma_formu.cve_for``` |
| Nombre Formula | ```ma_formu.cve_for``` |
| Tip. Formula |Indica el tipo de fórmula: <br>**Salida** significa que los artículos que se muestran en el detalle crearán el artículo de la columna Nombre Formula <br>**Entrada** significa que los artículos que se muestran en el detalle serán los que se van a crear usando el artículo de la columna Nombre Formula - ```ma_formu.es_cve_sub``` |
| Cve. Art | Producto procesado o el producto creado dependiendo del tipo de formula - ```ma_formu.cve_for``` |
| Artículo |```ma_artic.descri, ma_artic.pza_caj, ma_artic.presen``` |
| Cant. Generada| Cantidad a producir o cantidad a utilizar dependiendo del tipo de formula - ```ma_formu.can_gen``` |
| Costo Pro| Se consulta el costo promedio de ```ma_exist.cos_pro``` y el almacén que se pasa como parámetro es el especificado en ```de_artic.num_dat='CO'``` |
| Costo Estándar | Es el costo ingresado manualmente al momento de crear la formula - ```de_cossstd.cos_std``` |
| Ensamble | Es el tipo de ensamble del producto, por default es P - ```ma_formu.tip_ens ``` |
| Estatus | Estatus de la formula, actualmente existen dos; si es 1 es Activo y si es 0 es Desactivado - ```ma_formu.status``` |

###### Columnas Detalle
| Columna | Descripción |
| :------ | :----       |
| Partida | ```ma_formu.partid``` |
| Cve. Art | Seran los productos procesados o los productos creados dependiendo del tipo de formula - ```ma_formu.cve_sub``` |
| Artículo | ```ma_artic.descri, ma_artic.pza_caj, ma_artic.presen``` |
| Cantidad | Cantidad a producir o cantidad a utilizar dependiendo del tipo de formula - ```ma_formu.cantid``` |
| Costo Pro | Se consulta el costo promedio de ```ma_exist.cos_pro``` y el almacén que se pasa como parámetro es el especificado en ```de_artic.num_dat='CO'``` |
| Costo Estándar | Es el costo ingresado manualmente al momento de crear la formula - ```de_cosstd.cos_std``` |
| Ensamble | Es el tipo de ensamble del producto, por default es **P** - ```de_cosstd.cos_std``` |

![grid Formulas](/formulas/grid.png){data-zoomable}

###### Agregar Formula {#agregarFormu}
Al cargar la ventana modal se encuentra seleccionado por default la opción Salida, dependiendo del tipo de formula a insertar cambiara el formulario

**Formula de Entrada:**
La formula de entrada es cuando se van a producir artículos semi-terminados, los cuales se van a utilizar para elaborar un producto terminado en otra fórmula.  El formulario para registrar este tipo de fórmula es el siguiente.
![Formula Entrada](/formulas/formula_entrada.png){data-zoomable}

**Formula de Salida:**
La fórmula de salida es cuando se seleccionan una cantidad de artículos con los cuales se va generar un producto terminado. El formulario para registrar este tipo de fórmula es el siguiente
![Formula Salida](/formulas/formula_salida.png){data-zoomable}

Se muestra una ventana donde se debe capturar la información de la formula, el campo Artículo debe ser una clave valida dentro del catálogo de artículo. Debajo del formulario se encuentran dos grid´s, el de la izquierda muestra las líneas o familias dependiendo de la opción seleccionada en los radios con el nombre Consultar por (A) y el grid de la derecha será donde se deben agregar las claves que formaran la formula. Existen dos maneras de agregar artículos:
La primera es escribir directamente la clave del artículo en el input Artículo y después haciendo clic en el botón Agregar Artículo (B)
![Formulario Formula](/formulas/formulario_formula.png){data-zoomable}

La segunda opción es seleccionar una o varias opciones del grid de la izquierda y hacer clic derecho sobre la opción **Consultar Artículos** se mostrarán todos los artículos de las líneas o familias seleccionadas y al hacer clic sin soltar sobre el icono de la izquierda de la clave (C) y arrastrando y soltando sobre el grid de la derecha se agregará a la lista de artículos que formarán la formula.

Para cuando la fórmula es de tipo **Salida** y después de agregar el artículo se debe asignar la cantidad que se debe utilizar en la columna Cantidad (D) y al final de la fila del artículo se encuentra un icono con forma de bote de basura (E) al hacer clic sobre el icono se elimina el articulo del grid. Si queremos regresar a las líneas o familias se debe hacer clic sobre el botón (F)
![Grids Articulos](/formulas/grids_articulos.png){data-zoomable}

Para cuando la fórmula es de tipo Entrada, en el grid se agregan dos columnas más, Porcentaje de Costo y Costo, a cada artículo agregado se le debe asignar un porcentaje de costo y la suma de todos debe ser igual a 100%, si es menor no se mostrará el botón de Guardar (A) y si el porcentaje que se ingresa es igual a 0 se mostrara un mensaje (B) y si el porcentaje es mayor se mostrara el siguiente mensaje (C). En la columna Costo se debe ingresar el costo estándar del artículo.

**Tabla de_cosstd**
Esta tabla es donde se guarda el costo estándar del articulo por periodo, se toma el año y mes en curso y si ya existe un costo se actualiza en caso contrario se inserta el costo
| Columna | Descripción |
| :------ | :----       |
| cos_std | Costo capturado en el grid |
| num_per | Periodo en curso cuando se realiza la captura |
| cve_art | Clave del articulo|

Cuando se intente agregar un artículo que ya exista en el grid de la derecha mostrara un mensaje de alerta (D)
![Captura Entrada](/formulas/captura_entrada.png){data-zoomable}

Al hacer clic sobre el botón Guardar, se realiza el proceso de guardado y si todo sale correcto se mostrará un mensaje indicando la clave de la fórmula que se asignó (A), en caso que exista un error en el proceso mostrara un mensaje (B)
![Mensajes](/formulas/mensajes.png){data-zoomable}

## Menú Grid
- **Editar Formula:** Al hacer clic sobre esta opción se mostrará un modal igual al de [Agregar Fórmula](#agregarFormu), con las validaciones correspondientes dependiendo si es formula de entrada o salida y se utilizara para modificar algún parámetro de la formula creada
- **Desactivar Formula:** Esta opción cambia el Estatus de la formula a Desactivado y en el grid cambia el color de la celda a fondo rojo y al estar en este estatus la formula no se podrá utilizar para crear orden de fabricación
- **Activar Formula:** Esta opción cambia el Estatus de la formula a Activo y en el grid cambia el color de la celda a fondo verde y al estar en este estatus la formula se puede utilizar para crear orden de fabricación
