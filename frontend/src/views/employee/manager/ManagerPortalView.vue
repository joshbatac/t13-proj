<template>
  <div>
    <h1>Manager Portal</h1>
    <hr>  
    <button class ="grid-button" @click="showInventory=!(showInventory)">Add & Remove Inventory</button>
    <InventoryEditButton
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

      <button class ="grid-button" @click="showEmployees=!(showEmployees)">Add & Remove Employees</button>
    <EmployeesEditButton
      v-if="showEmployees"
      @cancel="showEmployees=!(showEmployees)"/>

      <button class ="grid-button" @click="showCustomers=!(showCustomers)">Add & Remove Customers</button>
    <CustomerEditButton
      v-if="showCustomers"
      @cancel="showCustomers=!(showCustomers)"/>
      <hr>

      <button class ="grid-button" @click="showOrders=!(showOrders)">Past Orders</button>
    <OrderTableButton
      v-if="showOrders"
      @cancel="showOrders=!(showOrders)"/>

      <button class ="grid-button" @click="showProductReport=!(showProductReport)">Product Frequency Reports</button>
    <ProductReportButton
      v-if="showProductReport"
      @cancel="showProductReport=!(showProductReport)"/>

  </div>
  </template>
  
  <script>

  import InventoryEditButton from '../components/inventory/InventoryEditButton.vue';
import OrderStocksButton from '../components/inventory/OrderStocksButton.vue';
import RemoveStocksButton from '../components/inventory/RemoveStocksButton.vue';

import EmployeesEditButton from '../components/employees/EmployeesEditButton.vue';

import CustomerEditButton from '../components/customers/CustomerEditButton.vue';

import OrderTableButton from '../components/OrderTableButton.vue';
import ProductReportButton from '../components/ProductReportButton.vue';


export default {
  components: {
    InventoryEditButton,
    OrderStocksButton,
    RemoveStocksButton,
    EmployeesEditButton,
    CustomerEditButton,
    OrderTableButton,
    ProductReportButton,
    
  },
    data() {
        return {
          showInventory: false,
          showOrderStock: false,
          showRemoveStock: false,
          showCustomers: false,

          showEmployees: false,

          showOrders: false,
          showProductReport: false,
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