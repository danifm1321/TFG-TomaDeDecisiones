# TFG-TomaDeDecisiones
Trabajo de Fin de Grado basado en una aplicación web que ayude al estudio de la toma de decisiones a nivel implícito

## Dependencias
Use el comando 
```
npm install
```
para instalar las dependencias necesarias.

## Conexión con la API
Para utilizar la aplicación se ha de descargar e instalar el launcher de EMOTIV que se puede encontrar en el siguiente [enlace](https://www.emotiv.com/emotiv-launcher/).

Una vez descargado e instalado, se ha de crear una cuenta en EMOTIV e iniciar sesión en ella. Adicionalmente, en nuestro perfil debemos crear una aplicación y guardar el secreto proporcionado como archivo de texto en secrets/client-secret-tfg y el id proporcionado como archivo de texto en secrets/client-id-tfg.

![alt text](https://github.com/danifm1321/TFG-TomaDeDecisiones/blob/main/readme_images/registrar-aplicacion.png?raw=true)

La primera vez que se lance la aplicación, no se captará nada. Primero se ha de autorizar el acceso a la aplicación desde nuestro Launcher.

## Lanzar la aplicación
Use el comando 
```
npm start
```
para lanzar la aplicación.

La podrá encontrar en http://localhost:3000/

