<template>
  <div>
    <h1>Manager Portal</h1>
    <hr>  
    <button class ="grid-button" @click="showInventory=!(showInventory)">View Inventory</button>
    <InventoryTableButton
      v-if="showInventory"
      @cancel="showInventory=!(showInventory)"/>

      <button class ="grid-button" @click="showOrderStock=!(showOrderStock)">Order Stocks</button>
    <OrderStocksButton
      v-if="showOrderStock"
      @cancel="showOrderStock=!(showOrderStock)"/>

      <button class ="grid-button" @click="showRemoveStock=!(showRemoveStock)">Remove Stocks</button>
    <RemoveStocksButton
      v-if="showRemoveStock"
      @cancel="showRemoveStock=!(showRemoveStock)"/>
      <hr>  

      <button class ="grid-button" @click="showInventory=!(showInventory)">View Inventory</button>
    <InventoryTableButton
      v-if="showInventory"
      @cancel="showInventory=!(showInventory)"/>

      <button class ="grid-button" @click="showOrderStock=!(showOrderStock)">Order Stocks</button>
    <OrderStocksButton
      v-if="showOrderStock"
      @cancel="showOrderStock=!(showOrderStock)"/>

      <button class ="grid-button" @click="showRemoveStock=!(showRemoveStock)">Remove Stocks</button>
    <RemoveStocksButton
      v-if="showRemoveStock"
      @cancel="showRemoveStock=!(showRemoveStock)"/>

      <hr>

  </div>
  </template>
  
  <script>
  import InventoryTableButton from '../components/inventory/InventoryTableButton.vue';
import OrderStocksButton from '../components/inventory/OrderStocksButton.vue';
import RemoveStocksButton from '../components/inventory/RemoveStocksButton.vue';


export default {
  components: {
    InventoryTableButton,
    OrderStocksButton,
    RemoveStocksButton
  },
    data() {
        return {
          showInventory: false,
          showOrderStock: false,
          showRemoveStock: false,
          showOrders: false
        }
    }
}
  </script>
  
  <style>

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
  transition: background-color 0.15s;
  margin: 0.5%;
}

.grid-button:hover {
  background-color: #357e68;
}
  </style>