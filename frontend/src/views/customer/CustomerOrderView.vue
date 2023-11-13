<!-- CustomerOrderView.vue -->

<template>
    <div class="customer-order-view">
      <h1>Customer Order View</h1>
  
      <div class="content-container">
        <!-- Order buttons component on the left -->
        <div class="order-buttons">
          <OrderButtons @addToBasket="addToBasket" />
        </div>
  
        <!-- Basket component on the right -->
        <div class="basket">
          <Basket :items="basketItems" @removeItem="removeItemFromBasket" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import OrderButtons from './OrderButtons.vue';
  import Basket from './Basket.vue';
  
  export default {
    components: {
      OrderButtons,
      Basket,
    },
    data() {
      return {
        basketItems: [], // Now an array of pairs [item, quantity]
      };
    },
    methods: {
      addToBasket(item) {
        // Check if the item is already in the basket
        const existingItem = this.basketItems.find((basketItem) => basketItem[0] === item);
  
        if (existingItem) {
          // If the item already exists, increment the quantity
          existingItem[1]++;
        } else {
          // If the item doesn't exist, add it with a quantity of 1
          this.basketItems.push([item, 1]);
        }
      },
      removeItemFromBasket(index, item) {
        // Remove the specified item from the basket
        this.basketItems.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .customer-order-view {
    text-align: center; /* Center the content horizontally */
  }
  
  h1 {
    margin-bottom: 20px; /* Add margin below h1 for separation */
  }
  
  .content-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .order-buttons {
    width: 100%;
  }

  .basket {
    width: 50%;
  }
  </style>
  