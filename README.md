# Delilah Resto

##### Este proyecto consiste en una API para un restaurante.

###### Funcionalidades/características:
- Resgistro e inicio de sesión.
- Contraseñas encriptadas.
- Estado de sesión con JWT.
- Usuarios con roles. (admin/cliente)
- CRUD de productos. (admin)
- Listar productos.
- Creación de pedidos.

###### Tecnologias utilizadas:
- NodeJS - Sequelize ORM
- MySQL

### Instrucciones

Se requiere [NodeJS] 12.18.3 o superior y MySQL instalado (yo usé XAMPP).

Clona el repositorio. Se puede hacer mediante la terminal, con el siguiente comando:
```sh
$ git clone https://github.com/ariisan123/delilah-san.git
```
Inicia el servidor de MySQL (mediante XAMPP en mi caso)
Una vez hecho esto, ingresa a la carpeta 'delilah-san'.
Renombra el archivo '.env.example' a '.env' y abrilo con un editor de texto.
Este archivo contiene las configuraciones del servidor/base de datos. Debe verse asi:
> DB_HOST = DIRECCION DE HOST \
> DB_NAME = NOMBRE DE LA BASE DE DATOS, Ejemplo: delilahresto \
> DB_USER = USUARIO DE LA BASE DE DATOS \
> DB_PASSWORD = CONTRASEÑA DE LA BASE DE DATOS \
> DB_PORT = PUERTO DE LA BASE DE DATOS \
> PORT = PUERTO DONDE INICIA EL SERVIDOR, Ejemplo: 3000 \
> SECRET = CLAVE PARA VERIFICACIONES, Ejemplo: superseguro 

Edita cada campo con su valor correspondiente. 
##### Si usas la configuración predeterminada de XAMPP, deberás colocar estos valores:

> DB_HOST = localhost \
> DB_USER = root \
> DB_PASSWORD = \
> DB_PORT = 3306 
###### NOTA: DB_NAME solo admite valores alfanumericos. NO utilizar símbolos!
Una vez hecho esto, abre la terminal en la carpeta del proyecto y ejecuta lo siguiente para encender el servidor:
```sh
$ npm i
$ npm run new_database
$ npm run db_start
```
Listo! Tendrás todo en funcionamiento!
#### Utiliza la [documentación](/spec.yaml) para guiarte.




[NodeJS]:<https://nodejs.org/en/>
