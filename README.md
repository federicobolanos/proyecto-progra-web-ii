# API GraphQL - Instrucciones de Prueba

## Requisitos Previos

- Python 3.x
- pip (gestor de paquetes de Python)

## Configuración del Entorno

1. Navega al directorio del backend:
```bash
cd backend-graphql
```

2. Crea un entorno virtual (opcional pero recomendado):
```bash
python -m venv venv
```

3. Activa el entorno virtual:
- En Windows:
```bash
venv\Scripts\activate
```
- En macOS/Linux:
```bash
source venv/bin/activate
```

4. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## Iniciar el Servidor

1. Ejecuta el servidor de desarrollo:
```bash
python main.py
```

El servidor se iniciará en `http://localhost:5000` con el modo debug activado.

## Probar la API

Puedes probar la API usando GraphQL Playground o cualquier cliente HTTP. Aquí hay algunos ejemplos de consultas:

### Consultar Productos

```graphql
query {
  productos {
    id
    nombre
    precio
    stock
    disponible
  }
}
```

### Crear un Producto

```graphql
mutation {
  crearProducto(
    nombre: "Nuevo Producto"
    precio: 99.99
    stock: 10
  ) {
    id
    nombre
    precio
    stock
    disponible
  }
}
```

### Actualizar Stock

```graphql
mutation {
  actualizarStock(
    id: 1
    cantidad: -2
  ) {
    id
    nombre
    stock
    disponible
  }
}
```

### Actualizar Producto

```graphql
mutation {
  actualizarProducto(
    id: 1
    nombre: "Producto Actualizado"
    precio: 149.99
    stock: 15
  ) {
    id
    nombre
    precio
    stock
    disponible
  }
}
```

### Eliminar Producto

```graphql
mutation {
  eliminarProducto(id: 1)
}
```

## Notas Importantes

1. El servidor se ejecuta en modo debug, lo que significa que:
   - Los cambios en el código se recargan automáticamente
   - Se muestran mensajes de error detallados
   - No es recomendado para producción

2. La disponibilidad de los productos se actualiza automáticamente basada en el stock:
   - Si stock > 0, disponible = true
   - Si stock = 0, disponible = false

3. Para detener el servidor, presiona `Ctrl+C` en la terminal.

## Solución de Problemas

Si encuentras el error "Port 5000 is in use":
1. En macOS, verifica si el servicio "AirPlay Receiver" está activo
2. Cambia el puerto en `main.py` o
3. Cierra la aplicación que está usando el puerto 5000 