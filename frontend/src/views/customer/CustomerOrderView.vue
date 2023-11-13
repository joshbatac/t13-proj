<!-- CustomerOrderView.vue -->

<template>
    <div class="customer-order-view">

      <div v-if="!customerName">
        <h1>
        Not a Member? Sign up Here!

        <div class = "h1-sub">
          <label for="phoneNumber">Already a member? Enter your phone number: </label>
          <br>
          <input 
            class = "input-num" 
            type="text" 
            id="phoneNumber" 
            v-model="phoneNumber"
            @keyup.enter="enterKey">
        </div>
      </h1>
      </div>
      <div v-else>
        <h1>{{ customerName }}</h1>
      </div>

      <div class="content-container">
        <!-- Order buttons component on the left -->
        <div class="order-buttons">
          <OrderButtons @addToBasket="addToBasket" />
        </div>
  
        <!-- Basket component on the right -->
        <div class="basket">
          <Basket :items="basketItems" @removeItem="removeItemFromBasket" @fullRemove = "fullRemove"/>
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
        customerName: null,
        phoneNumber: null,
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
          this.basketItems.unshift([item, 1]);
        }
      },

      removeItemFromBasket(index, item) {
        // Remove the specified item from the basket
        this.basketItems.splice(index, 1);
      },

      fullRemove() {
        this.basketItems.length = 0;
      },

      enterKey() {
        console.log (this.phoneNumber)
        this.phoneNumber = null;
      }

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

  .h1-sub {
    font-size: 14px;
    font-style: italic;
    padding-top:10px;
    padding-bottom: 0px;
  }

  .input-num{ 
    text-align: center;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
background-color: #28745283; /* Background color for h1 */
    color: #ddd;
    font-style: oblique;
    appearance: none; /* Remove default arrow in Firefox */
    cursor: pointer;
  }

  .input-num:hover {
    border-color: #42b983;

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
    margin-right: 3%;
  }
  </style>
  