<!-- OrderButtons.vue -->

<template>
    <div class="order-buttons">
      <h3>Our Products</h3>
      <!-- Buttons to add items to the basket -->
      <button v-for="item in inventory" :key="item.ID" class="grid-button" @click="addToBasket(item)">
        {{ item.name }} - Price: ${{ item.price }}
      </button>
    </div>
  </template>
  
  <script>
import axios from 'axios';


  export default {

    data() {
      return {
        inventory: [],
      };
    },

    
    mounted() {
      axios.get('http://localhost:3000/inventory')
        .then(response => {
          this.inventory = response.data.inventory; // Assuming the response contains an array of inventory items
          this.originalInv = this.inventory;
        })
        .catch(error => {
          console.error('Error fetching inventory:', error);
        });
    },


    methods: {
      addToBasket(item) {
        this.$emit('addToBasket', item);
      },
    },
  };
  </script>
  
  <style scoped>
  .order-buttons {
    text-align: center;
  }
  
  h3 {
    margin-bottom: 15px;
    font-size: 24px;
    color: #42b983;
    text-transform: uppercase;
  }
  
  .grid-button {
    width: 30%;
    height: 30%;
    line-height: 150px;
    font-size: 18px;
    background-color: #42b983;
    color: #ffffff;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;
    margin: 0.5%;
  }
  
  .grid-button:hover {
    background-color: #357e68;
  }
  </style>
  