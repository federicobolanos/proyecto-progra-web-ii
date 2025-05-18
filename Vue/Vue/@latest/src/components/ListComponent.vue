<template>
  <div class="product-list">
    <h2>Inventario Musical</h2>
    <div class="form-container">
      <form @submit.prevent="addNewProduct" class="sticky-form">
        <input v-model="newProduct.nombre" placeholder="Nombre" required />
        <input v-model="newProduct.precio" placeholder="Precio" type="number" required min="0" />
        <input v-model="newProduct.stock" placeholder="Stock" type="number" required min="0" />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>

    <div class="product-container">
      <div v-for="(group, index) in productGroups" :key="index" class="product-group">
        <ProductItem v-for="product in group" :key="product.id" :product="product" @increase-stock="increaseStock" @decrease-stock="decreaseStock"/>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import ProductItem from './ItemComponent.vue';
import { useInventory } from '../js/useInventory.js';

export default {
  components: {
    ProductItem,
  },
  setup() {
    const { products, fetchProducts, addProduct, updateStock } = useInventory();
    const newProduct = reactive({ nombre: '', precio: 0, stock: 0 });

    async function addNewProduct() {
      try {
        if (newProduct.nombre && newProduct.precio > 0 && newProduct.stock >= 0) {
          await addProduct({ ...newProduct });
          newProduct.nombre = '';
          newProduct.precio = 0;
          newProduct.stock = 0;
        } else {
          alert('Por favor complete todos los campos correctamente');
        }
      } catch (error) {
        alert(error.message);
      }
    }

    async function increaseStock(product) {
      await updateStock(product.id, 1);
    }

    async function decreaseStock(product) {
      if (product.stock > 0) {
        await updateStock(product.id, -1);
      }
    }

    const productGroups = computed(() => {
      const groups = [];
      for (let i = 0; i < products.length; i += 3) {
        groups.push(products.slice(i, i + 3));
      }
      return groups;
    });

    // Carga inicial
    fetchProducts();

    return {
      products,
      newProduct,
      addNewProduct,
      increaseStock,
      decreaseStock,
      productGroups,
    };
  },
};

</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #222;
  color: white;
  padding: 20px;
  margin: 30px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.form-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.sticky-form {
  position: relative;
  background-color: #222;
  padding: 15px;
  z-index: 10;
  width: 50%;
  text-align: center;
  border-bottom: 2px solid #ff66b2;
}

.product-container {
  flex: 1;
  overflow-y: auto;
  max-height: 70vh;
  width: 100%;
  padding: 10px;
}

.product-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.sticky-form input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ff66b2;
  border-radius: 5px;
  background-color: #333;
  color: white;
}

.sticky-form button {
  background-color: #ff66b2;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
}

.sticky-form button:hover {
  background-color: #ff3385;
}
</style>