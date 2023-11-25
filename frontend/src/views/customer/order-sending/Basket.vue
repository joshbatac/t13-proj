<template>
  <div class="basket-container">

    <div v-if="!customerID">
      <h3>Basket</h3>
    </div>
    <div v-else>
      <h3>{{ customerFName }}'s Basket <div style="color: red; display:inline;">(-10%)</div>
      </h3>
    </div>

    <!-- Display items and quantities in the basket -->
    <ul>
      <div v-if="!customerID">
        <li v-for="(item, index) in items" :key="item[0].ID" @click="removeItem(index, item[0])">
          ( x{{ item[1] }} ) {{ item[0].name }} - ${{ (item[1] * item[0].price).toFixed(2) }}
        </li>
      </div>
      <div v-else>
        <li v-for="(item, index) in items" :key="item[0].ID" @click="removeItem(index, item[0])">
          ( x{{ item[1] }} ) {{ item[0].name }} -
          <del style="color: red;">${{ (item[1] * item[0].price).toFixed(2) }}</del>
          ${{ (item[1] * item[0].price * 0.9).toFixed(2) }}
        </li>
      </div>
    </ul>

    <!--CheckOut Button-->
    <button v-if="items.length > 0" @click="showConfirmation" class="checkout-button">
      <div v-if="!customerID">
        Check Out - Total: ${{ calculateRunningTotal() }}
      </div>
      <div v-else>
        Check Out - Total: <s style="text-decoration: line-through; color: red;">${{ calculateOriginalRunningTotal()
        }}</s> ${{ (calculateRunningTotal()) }}
      </div>
    </button>

    <!--Confirmation Pop-up -->
    <ConfirmationPopUp v-if="showPopup" :total="calculateRunningTotal()" :originaltotal="calculateOriginalRunningTotal()"
      :items="this.items" :customerID="customerID" @confirmed="checkout" @canceled="hideConfirmation" />

    <Receipt v-if="confirmationCompleted" :total="calculateRunningTotal()"
      :originaltotal="calculateOriginalRunningTotal()" :items="this.items" :orderData="this.orderData"
      :customerID="this.customerID" @leave="finished()" />

  </div>
</template>

<script>

import axios from 'axios';
import ConfirmationPopUp from './ConfirmationPopUp.vue';
import Receipt from './Receipt.vue';
export default {

  components: {
    ConfirmationPopUp,
    Receipt
  },

  props: {
    items: Array, // item, quantity
    customerID: Number,
    customerFName: String,
  },

  data() {
    return {
      showPopup: false, //for popup
      confirmationCompleted: false,
      orderData: null
    };
  },


  methods: {
    removeItem(index, item) {
      if (this.items[index][1] > 1) { // Decrement the quantity if it's greater than 1
        this.items[index][1]--;
        this.$emit('increaseCurrStorage', item);
      } else { // If the quantity is 1, remove the entire item
        this.$emit('removeItem', index, item);
        this.$emit('increaseCurrStorage', item);
      }
    },

    showConfirmation() {
      this.showPopup = true;
    },

    hideConfirmation() {
      this.showPopup = false;
    },

    async checkout(pt) {
      try {
        const orderResponse = await axios.post('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/orders-insert', {// Isnsert the order into the Orders table
          customerID: this.customerID,
          orderDate: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
          totalOwed: this.calculateOriginalRunningTotal(),
          paymentType: pt, // default value for testing
        });

        const _orderID = orderResponse.data.order.orderID //get orderID from backend 
        this.orderData = orderResponse.data.order
        console.log('Order inserted successfully:', orderResponse.data);

        // loop through and insert into OrderItems

        this.items.forEach(async ([item, quantity]) => {
          try {
            const orderItemResponse = await axios.post('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/orderitems-insert', {
              orderID: _orderID,
              inventoryID: item.ID, //
              quantity: quantity,
            });
            console.log('Item inserted successfully:', orderItemResponse.data);
          } catch (itemError) {
            console.error('Error inserting item:', itemError);
          }
        });

        // Updated inventory to remove the correct quantity from the current storage
        this.items.forEach(async ([item, quantity]) => {
          try {
            const inventoryUpdateResponse = await axios.post('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/inventory-update', {
              inventoryID: item.ID,
              quantity: -quantity, // Subtract the sold quantity from the inventory
            });
            console.log('Inventory updated successfully:', inventoryUpdateResponse.data);
          } catch (inventoryError) {
            console.error('Error updating inventory:', inventoryError);
          }
        });



        this.hideConfirmation(); //Hide the confirmation pop-up after checkout
        this.confirmationCompleted = true

      } catch (error) {
        console.error('Error processing checkout:', error);
      }
    },

    calculateOriginalRunningTotal() { // Calculate the running total
      const rawTotal = this.items.reduce((total, [item, quantity]) => total + quantity * item.price, 0);
      return rawTotal.toFixed(2);
    },
    calculateRunningTotal() {
      if (!this.customerID) {
        return this.calculateOriginalRunningTotal();
      }
      return (this.calculateOriginalRunningTotal() * .9).toFixed(2);
    },

    finished() {
      this.showPopup = false, //for popup
        this.confirmationCompleted = false,
        this.orderData = null
      this.$emit('fullRemove');
      this.$emit('updateInventory');
    }

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
  transition: background-color 0.15s;
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
  transition: background-color 0.15s;
  margin: 0.5%;
}

.checkout-button:hover {
  background-color: #357e68;
}
</style>
