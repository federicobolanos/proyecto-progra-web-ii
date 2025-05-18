# Ventajas y Características de GraphQL en el Proyecto

## ¿Qué ventajas ofrece GraphQL sobre REST en este contexto?

1. **Flexibilidad en las consultas**: GraphQL permite a los clientes solicitar exactamente los datos que necesitan, evitando el over-fetching y under-fetching de datos que es común en REST.

2. **Tipado fuerte**: El esquema GraphQL proporciona un contrato claro entre el cliente y el servidor, definiendo exactamente qué datos están disponibles y sus tipos.

3. **Operaciones en una sola petición**: A diferencia de REST, donde podrías necesitar múltiples endpoints para obtener datos relacionados, GraphQL permite obtener todos los datos necesarios en una sola petición.

4. **Mantenimiento simplificado**: Los cambios en el esquema son más manejables ya que los clientes pueden adaptarse gradualmente a los cambios sin romper la compatibilidad.

## ¿Cómo se definen los tipos y resolvers en una API con GraphQL?

En este proyecto, los tipos y resolvers se definen de la siguiente manera:

1. **Definición de Tipos**:
```graphql
type Producto {
    id: Int!
    nombre: String!
    precio: Float!
    stock: Int!
    disponible: Boolean!
}

type Query {
    productos: [Producto!]!
}

type Mutation {
    actualizarStock(id: Int!, cantidad: Int!): Producto!
    crearProducto(nombre: String!, precio: Float!, stock: Int!): Producto!
    eliminarProducto(id: Int!): Boolean!
    actualizarProducto(id: Int!, nombre: String, precio: Float, stock: Int): Producto!
}
```

2. **Implementación de Resolvers**:
- Los resolvers son funciones Python que implementan la lógica para cada operación
- Se definen usando decoradores o asignación directa
- Manejan la lógica de negocio y el acceso a datos

## ¿Por qué es importante que el backend también actualice disponible y no depender solo del frontend?

1. **Consistencia de datos**: El backend es la fuente única de verdad para el estado de los datos. Si solo el frontend manejara la disponibilidad, podría haber inconsistencias.

2. **Validación centralizada**: El backend puede implementar reglas de negocio consistentes para determinar la disponibilidad, como se ve en el código:
```python
producto["disponible"] = producto["stock"] > 0
```

3. **Seguridad**: El backend puede implementar validaciones y reglas de negocio que no pueden ser eludidas por el frontend.

4. **Mantenibilidad**: Centralizar esta lógica en el backend hace que sea más fácil de mantener y modificar en el futuro.

## ¿Cómo garantizas que la lógica de actualización de stock y disponibilidad sea coherente?

1. **Actualización atómica**: Las operaciones de actualización de stock y disponibilidad se realizan en la misma transacción:
```python
def resolve_actualizar_stock(_, info, id, cantidad):
    for producto in productos:
        if producto["id"] == id:
            producto["stock"] += cantidad
            producto["disponible"] = producto["stock"] > 0
            return producto
```

2. **Validaciones automáticas**: La disponibilidad se actualiza automáticamente basada en el stock, eliminando la posibilidad de inconsistencias.

3. **Tipado fuerte**: El esquema GraphQL garantiza que los datos tengan el formato correcto antes de llegar a la lógica de negocio.

4. **Manejo de errores**: Se implementan validaciones y manejo de errores para casos como productos no encontrados o operaciones inválidas. 