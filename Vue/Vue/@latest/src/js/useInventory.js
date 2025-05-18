import { reactive } from 'vue';

const API_URL = 'http://localhost:5000/graphql'; // ajusta si cambia puerto o ruta

export function useInventory() {
    const products = reactive([]);

    // Query para obtener productos
    async function fetchProducts() {
        const query = `
            query {
                productos {
                    id
                    nombre
                    precio
                    stock
                    disponible
                }
            }
        `;

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const { data } = await res.json();
        products.splice(0, products.length, ...data.productos); // reemplaza el contenido reactivo
    }

    // Mutation para crear producto
    async function addProduct(product) {
        const mutation = `
            mutation CrearProducto($nombre: String!, $precio: Float!, $stock: Int!) {
                crearProducto(nombre: $nombre, precio: $precio, stock: $stock) {
                    id
                    nombre
                    precio
                    stock
                    disponible
                }
            }
        `;

        const variables = {
            nombre: product.nombre,
            precio: parseFloat(product.precio),
            stock: parseInt(product.stock, 10),
        };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation, variables }),
        });

        const { data, errors } = await res.json();
        if (errors) {
            throw new Error(errors[0].message);
        }
        products.push(data.crearProducto);
    }

    // Mutation para actualizar stock (incrementar o decrementar)
    async function updateStock(id, cantidad) {
        const mutation = `
            mutation ActualizarStock($id: Int!, $cantidad: Int!) {
                actualizarStock(id: $id, cantidad: $cantidad) {
                    id
                    stock
                    disponible
                }
            }
        `;

        const variables = { id, cantidad };

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation, variables }),
        });

        const { data, errors } = await res.json();
        if (errors) {
            throw new Error(errors[0].message);
        }

        // Actualiza el producto localmente
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index].stock = data.actualizarStock.stock;
            products[index].disponible = data.actualizarStock.disponible;
        }
    }

    return {
        products,
        fetchProducts,
        addProduct,
        updateStock,
    };
}
