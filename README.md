# prueba_new_inntech
 
## Antes de ejecutar la API, debes de tener instalado lo siguiente:

#### Node.js
#### MySQL
#### Postman 

## primero clona este repositorio en tu pc

```
git clone (url)
```
## Instala las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto:

npm install

## El backup de la base de datos (el documento se llama Backup_base_datos) ejeculato en MySQL workbench prende Xampp y configura en el codigo los siguentes parametros:

```
host: '127.0.0.1',
user: 'root',
database: 'bd'
```


## Ya configurado todo puedes ejecutar el codigo en la terminal de visual Studio con el siguiente comando:

```
node index.js
```


## para usarlo ejecuta postman y importa el archivo que esta en (coleccion_postman)

```
buscar por id (get)
http://localhost:5000/user/1
```
```
buscar todos los usuarios (get)
http://localhost:5000/users
```
```
registrar usuario (post)
http://localhost:5000/register
```
```
login usuario (post)
http://localhost:5000/login
```
```
actualizar usuario (put)
http://localhost:5000/user/1
```
```
eliminar usuario (delete)
http://localhost:5000/user/1
```
# prueba_new_inntech_finalizada
