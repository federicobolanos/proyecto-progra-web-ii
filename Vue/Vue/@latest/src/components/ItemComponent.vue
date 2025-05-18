<template>
    <div class="product-item">
      <img src="../assets/music-icon.png" alt="Icono de música" class="music-icon" />
      <h3>{{ product.nombre }}</h3>
      <p>Precio: ${{ product.precio.toFixed(2) }}</p>
      <p>Stock: {{ product.stock }}</p>
      
      <p :class="stockStatusClass">{{ stockStatusText }}</p>
      
      <div class="controls">
        <button @click="$emit('increase-stock', product)">+</button>
        <button @click="$emit('decrease-stock', product)" :disabled="product.stock <= 0">-</button>
      </div>
    </div>
</template>
  
<script>
  import { useInventory } from '../js/useInventory.js';
  import { computed } from 'vue';
  
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { increaseStock, decreaseStock } = useInventory();
      const stockStatusText = computed(() => {
        return props.product.stock > 0 ? 'Disponible' : 'Agotado';
      });
  
      const stockStatusClass = computed(() => {
        return props.product.stock > 0 ? 'in-stock' : 'out-of-stock';
      });
  
      return {
        increaseStock,
        decreaseStock,
        stockStatusText,
        stockStatusClass,
      };
    },
  };
</script>
  
<style scoped>
  .product-item {
    border: 2px solid #ff66b2;
    border-radius: 10px;
    padding: 20px;
    width: 250px;
    background-color: #333;
    text-align: center;
    transition: transform 0.3s ease;
    margin-bottom: 20px;
  }
  
  .product-item:hover {
    transform: scale(1.05);
  }
  
  .music-icon {
    width: 50px;
    margin-bottom: 10px;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .controls button {
    background-color: #ff66b2;
    color: white;
    border: none;
    padding: 8px 15px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .controls button:hover {
    background-color: #ff3385;
  }
  
  .controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .in-stock {
    color: #4CAF50;
  }
  
  .out-of-stock {
    color: #F44336;
  }
</style>