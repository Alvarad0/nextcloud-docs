# Ranking de Carga

## Ruta
Inicio > Inventarios > Consultas > Ranking de Carga

## Configuración 
Muestra un tablero con los primeros 11 lugares de diableros con mayor cantidad de cajas surtidas, el tablero se actualiza conforme se surten los tickets asignados. Cada tarjeta muestra la foto del empleado, la posición, el nombre del diablero, la cantidad de cajas surtidas, entre otros datos. Cuando hay un cambio en el primer lugar, el modulo emite un mensaje de audio diciendo el nombre del empleado que ocupa el lugar. Por default se consulta el almacén configurado en la tabla ```ma_parcl.almdef``` y todos los turnos


## Desarrollo 
En la parte superior se muestra la clave del almacén y el turno, así como la hora. 
En la parte superior izquierda se encuentra dos botones:
- Al hacer clic en el icono (A) se muestra el modulo en pantalla completa
- Al hacer clic en el icono (B) se muestra un modal para configurar turno y foto del empleado

![empleados](/rankcarga/empleados.png)

En la venta de configuración se muestran dos opciones:

**Turnos**: En esta opción se podrá seleccionar el turno y el almacén a consultar y al hacer clic en el botón asignar turno se actualizarán los datos
![turno](/rankcarga/turno.png)

**Fotos**: En esta opción se puede agregar la foto del empleado, primero se escribe la clave del empleado y la clave del almacén, luego se debe hacer clic en el botón **Consultar** para validar que el empleado esté relacionado al almacén seleccionado. Si el empleado existe se muestra la información y se activa el botón **Seleccionar Foto**, al hacer clic se podrá buscar la foto y se mostrara una vista previa de la foto que se va subir. Si la foto es correcta se debe hacer clic en el botón **Guardar Foto**. Si el proceso se realiza correctamente se mostrara un mensaje de confirmación en caso contrario se mostrara un mensaje de error
![foto](/rankcarga/foto.png)

:::details Query
  ```sql
    -- La foto se guarda en la BD next tabla empleados
  ```
  :::

