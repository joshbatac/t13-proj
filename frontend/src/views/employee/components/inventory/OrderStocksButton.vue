<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1>Update Inventory Stocks</h1>
        <div>
          <hr> 
          LOW STOCK ITEMS!
          <table class="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Current Storage</th>
                <th>Max Storage</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredInventory" :key="item.ID">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.currentStorage }}</td>
                <td>{{ item.maxStorage }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr> 
        UPDATE STOCK
        <br>
        <label for="updateItem">Select Item to Update:</label>
        <select id="updateItem" v-model="selectedItem" class="custom-select">
          <option v-for="item in inventory" :key="item.ID" :value="item.ID"> {{ item.name }}</option>
        </select>
        <label for="orderQuantity">
        Quantity to Order: ( Current Storage: {{ selectedCurrentStock }}/{{ selectedMaxStock }}  Max Order: {{ selectedMaxStock-selectedCurrentStock}} )

        </label>
        <input type="number" id="orderQuantity" v-model="orderQuantity" min="0" :max="maxOrderQuantity" />
        <br>    
        <button v-if="orderQuantity > maxOrderQuantity" @click="updateStock" :disabled="orderQuantity > maxOrderQuantity" class="confirm-button">Exceeds Max</button>
        <button v-else @click="updateStock" :disabled="orderQuantity > maxOrderQuantity" class="confirm-button">Update Stock</button>
        <button @click="this.$emit('cancel')" class="cancel-button">Exit</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dateRange: [], // Store selected date range here
        inventory: [], // Store fetched inventory here
        selectedItem: null, // Store the selected item for updating stock
        orderQuantity: 0, // Store the quantity to order
      };
    },
    computed: {
      filteredInventory() {
        return this.inventory.filter(item => item.lowStorage === 1);
      },
      maxOrderQuantity() {
        if (this.selectedItem) {
          const selectedItem = this.inventory.find(item => item.ID === this.selectedItem);
          return selectedItem ? selectedItem.maxStorage - selectedItem.currentStorage : 0;
        }
        return 0;
      },
      selectedCurrentStock() {
        if (this.selectedItem) {
          const selectedItem = this.inventory.find(item => item.ID === this.selectedItem);
          return selectedItem ? selectedItem.currentStorage : 0;
        }
        return 0;
      },
      selectedMaxStock() {
        if (this.selectedItem) {
          const selectedItem = this.inventory.find(item => item.ID === this.selectedItem);
          return selectedItem ? selectedItem.maxStorage : 0;
        }
        return 0;
      },
    },
    mounted() {
      // Fetch data when the component is mounted
      this.fetchInventory();
    },
    methods: {
      async fetchInventory() {
        axios.get('http://localhost:3000/inventory')
          .then(response => {
            this.inventory = response.data.inventory;
          })
          .catch(error => {
            console.error('Error fetching inventory:', error);
          });
      },
      async updateStock() {
        try {
            const inventoryUpdateResponse = await axios.post('http://localhost:3000/inventory-update', {
              inventoryID: this.selectedItem,
              quantity: this.orderQuantity, // Subtract the sold quantity from the inventory
            });
            console.log('Inventory updated successfully:', inventoryUpdateResponse.data);
          } catch (inventoryError) {
            console.error('Error updating inventory:', inventoryError);
          }
        this.selectedItem = null;
        this.orderQuantity = 0;
        this.fetchInventory();
      },
    },
  };
  </script>
    
    <style scoped>
    h1 {
      border-radius: 8px;
    }
    
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .popup-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .popup-content {
      width: 50%;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      z-index: 1;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Style for the dropdown menu */
    .custom-select {
      align-items: center;
      width: 75%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
      color: #333;
      appearance: none;
      /* Remove default arrow in Firefox */
      cursor: pointer;
      transition: background-color 0.15s;
      margin-bottom: 10px;
    }
    
    .custom-select:hover {
      border-color: #42b983;
    }
    
    .table-container {
      max-height: 300px;
      /* Set a fixed height for the table container */
      overflow-y: auto;
      /* Enable vertical scrolling when content exceeds the container height */
    }
    
    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      table-layout: fixed;
      /* Fixed table layout */
    }
    
    .inventory-table th,
    .inventory-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    
    .inventory-table th {
      background-color: #f2f2f2;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  
    label {
      display: block;
      margin-top: 10px;
    }
  
    input[type="number"] {
      width: 75%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  
    p {
      color: red;
    }
.confirm-button,.cancel-button {
  width: 25%;
  height: 10%px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  margin-inline: 10px;
  transition: background-color 0.15s;

}

.confirm-button {
  background-color: #42b983;
  color: #ffffff;

}

.cancel-button {
  background-color: #b94242;
  color: #ffffff;

}

.confirm-button:hover,
.confirm-button:disabled {
  background-color: #0f362b;
}

.cancel-button:hover,
.cancel-button:disabled {
  background-color: #7e3535;
}

  </style>
  
    