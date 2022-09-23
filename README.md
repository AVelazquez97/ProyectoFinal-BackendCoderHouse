# Proyecto backend e-commerce en NodeJS

# Tecnologías utilizadas

- NodeJS 18.7.xx
- NPM 8.19.xx
- Express 4.18.xx
- Mongoose: 6.6.xx
- Morgan: 1.10.xx
- Firebase-admin: 11.0.xx

# Para la correcta ejecución y testeo del proyecto:

## Instalación de dependencias:
```
npm install 
```
or
```
npm i
```
## Configuración de persistencia:

En el fichero .env se encuentra la variable PERSISTENCY la cual se puede configurar con tres valores diferentes.
Estos son: 
- 'fileSystem'
- 'mongoDB'
- 'firebase'

**\*Una aclaración importante es que el fichero .env está visible solo porque es necesario para el correcto monitoreo del proyecto**


## Ejecución del server:

```
npm start:dev
```
or
```
node server.js
```

- - -

# ENDPOINTS:

## Productos:
### **Get de todos los productos:**
- localhost:8080/api/productos/

### **Get de producto por id**:
- localhost:8080/api/productos/id

### **Post de producto (solo para administradores)**:
- localhost:8080/api/productos/

### **Put de producto (solo para administradores)**:
- localhost:8080/api/productos/id

### **Delete de producto (solo para administradores)**:
- localhost:8080/api/productos/id

**\*Para indicar el modo admin es necesario enviar en el req.body el siguiente objeto: *"isAdmin": true*** 

## Carritos:
### **Post de carrito vacío:** 
- localhost:8080/api/carrito/

### **Delete de carrito por id:** 
- localhost:8080/api/carrito/id

### **Get de todos los productos en carrito por id:** 
- localhost:8080/api/carrito/id/productos

### **Post de producto con id en carrito por id:** 
- localhost:8080/api/carrito/id/productos/id_prod

### **Delete de producto con id en carrito por id:** 
- localhost:8080/api/carrito/id/productos/id_prod

## Importante:
**\*Tanto los id de productos como los de carrito deben ser un número entero o generado por mongoDB o firebase**

- - -

## Todos los endpoints fueron testeados con rest client y hay ejemplos en la carpeta "restClientExamples"
