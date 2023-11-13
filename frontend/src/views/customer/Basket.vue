<!-- Basket.vue -->
<template>
  <div class="basket-container">
    <h3>Basket</h3>

    <!-- Display items and quantities in the basket -->
    <ul>
      <li v-for="(item, index) in items" :key="item[0].ID" @click="removeItem(index, item[0])"> 
        ( x{{ item[1] }} ) {{ item[0].name }}  - ${{ (item[1] * item[0].price).toFixed(2) }}
      </li>
    </ul>

    <!--CheckOut Button-->
    <button v-if="items.length > 0" @click="showConfirmation" class="checkout-button">
      Check Out - Total: {{ calculateRunningTotal() }}
    </button>

    <!--Confirmation Pop-up -->
    <ConfirmationPopUp 
    v-if="showPopup" 
    :total="calculateRunningTotal()"
    :items="this.items"
    @confirmed="checkout" 
b   @canceled="hideConfirmation" />
  </div>
</template>

<script>

import axios from 'axios';
import ConfirmationPopUp from './ConfirmationPopUp.vue';

export default {

  components: {
    ConfirmationPopUp,
  },


  props: {
    items: Array, // item, quantity
  },

  data() {
    return {
      showPopup: false, //for popup
    };
  },


  methods: {
    removeItem(index, item) {
      if (this.items[index][1] > 1) { // Decrement the quantity if it's greater than 1
        this.items[index][1]--;
      } else { // If the quantity is 1, remove the entire item
        this.$emit('removeItem', index, item);
      }
    },
  
    showConfirmation() {  this.showPopup = true; }, hideConfirmation() { this.showPopup = false; },

    async checkout(pt) {
      try {
        const orderResponse = await axios.post('http://localhost:3000/orders-insert', {// Insert the order into the Orders table
          customerID: null, // default value for testing 
          orderDate: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
          totalOwed: this.calculateRunningTotal(),
          totalPaid: 0, // default value for testing
          paymentType: pt, // default value for testing
        });
        
        const orderID = orderResponse.data.order.orderID //get orderID from backend 
        console.log('Order inserted successfully:', orderResponse.data); 

        // loop through and insert into OrderItems

          this.items.forEach(async ([item, quantity]) => {
            try {
              const orderItemResponse = await axios.post('http://localhost:3000/orderitems-insert', {
                orderID: orderID,
                inventoryID: item.ID, //
                quantity: quantity,
              });
              console.log('Item inserted successfully:', orderItemResponse.data);
            } catch (itemError) {
              console.error('Error inserting item:', itemError);
            }
          });
        
        this.hideConfirmation(); //Hide the confirmation pop-up after checkout
        this.$emit('fullRemove'); //clear the basket

      } catch (error) {
        console.error('Error processing checkout:', error);
      }
    },

    calculateRunningTotal() { // Calculate the running total
      const rawTotal = this.items.reduce((total, [item, quantity]) => total + quantity * item.price, 0);
      return rawTotal.toFixed(2);    
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
