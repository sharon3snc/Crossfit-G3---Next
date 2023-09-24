Este es un proyecto realizado por Sharon Nuñez Cebrián y José Luis Brugnoni para la asignatura Módulo 7 del Máster en Desarrollo en Aplicaciónes Web de la Universidad Europea.

El proyecto consiste en una aplicación web enfocada en un centro de CrossFit genérico, la cual tiene dos funcionalidades, la de informar a los posibles clientes cuando accedan
a la página estática, la cual cuenta con información general del centro y formularios de contacto. También sirve como sistema de gestión de reserva para los clientes, sirviendose
de la página para realizar consulta de clases, reservaciones y consulta de perfil. Así mismo sirve para los monitores y administradores del centro a la hora de crear usuarios,
clases, monitores, comprobar asistencias, gestionar horarios, etc.

Para la ejecución de este proyecto en docker basta con ejecutar el siguiente comando:
docker-compose up --build

Esto desplegará 2 contenedores, uno para el frontend y otro para el backend. Estos ya estan configurados para comunicarse entre sí. El frontend lo podemos ver en el 
servidor local con el puerto 3000, mientras que el backend se comunicará usando el puerto 8000.



