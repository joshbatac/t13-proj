<!-- Basket.vue -->
<template>
    <div class="basket-container">
      <h3>Basket</h3>
      <!-- Display items and quantities in the basket -->
      <ul>
        <li v-for="(item, index) in items" :key="item[0].ingredientID" @click="removeItem(index, item[0])">
          {{ item[0].ingredientName }} - Quantity: {{ item[1] }}
        </li>
      </ul>
  
      <!-- Add Check Out button with v-if -->
      <button v-if="items.length > 0" @click="checkout" class="checkout-button">Check Out</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: Array,
    },
    methods: {
      removeItem(index, item) {
        // Decrement the quantity if it's greater than 1
        if (this.items[index][1] > 1) {
          this.items[index][1]--;
        } else {
          // If the quantity is 1, remove the entire item
          this.$emit('removeItem', index, item);
        }
      },
      checkout() {
        // Log items and quantities
        this.items.forEach(([item, quantity]) => {
            console.log(`Item: ${item.ingredientName}, Quantity: ${quantity}`);
        });

      },
    },
  };
  </script>
  
  <style scoped>
  .basket-container {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
  }
  
  h3 {
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  li:hover {
    background-color: #ddd;
  }
  
  .checkout-button {
    width: 100%;
    height: 30%;
    line-height: 150%;
    font-size: 18px;
    background-color: #42b983;
    color: #ffffff;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;
    margin: 0.5%;
  }
  
  .checkout-button:hover {
    background-color: #357e68;
  }
  </style>
  