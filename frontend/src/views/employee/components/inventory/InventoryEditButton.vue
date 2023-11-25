<template>
  <div class="popup">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <h1>Inventory</h1>

      <!-- Input fields for adding a new inventory item -->

      <div class="table-container">
        <h3>REMOVE INV. ITEM</h3>
        <table class="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Current Storage</th>
              <th>Max Storage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventory" :key="item.ID">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.currentStorage }}</td>
              <td>{{ item.maxStorage }}</td>
              <td><button @click="removeItem(item.ID)" class="remove-button">Remove</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div>
        <h3>ADD INV. ITEM</h3>

        <label for="itemName">Name:</label>
        <input type="text" v-model="newItem.name" id="itemName" />
        <br>
        <label for="itemPrice">Price:</label>
        <input type="number" v-model="newItem.price" id="itemPrice" />
        <br>
        <label for="buyPrice">Buy Price:</label>
        <input type="number" v-model="newItem.buyPrice" id="buyPrice" />
        <br>
        <label for="currentStorage">Current Storage:</label>
        <input type="number" v-model="newItem.currentStorage" id="currentStorage" />
        <br>
        <label for="maxStorage">Max Storage:</label>
        <input type="number" v-model="newItem.maxStorage" id="maxStorage" />
        <br>
        <label for="supplier">Supplier:</label>
        <select v-model="newItem.supplierID" id="supplier" >
          <option v-for="supplier in suppliers" :key="supplier.ID" :value="supplier.ID">{{ supplier.name }}</option>
        </select>

        <hr>
        <button @click="addItem"
          :disabled="newItem.currentStorage > newItem.maxStorage || newItem.maxStorage == 0 || newItem.price == 0 || name == ''"
          class="confirm-button">Add to Inventory</button> <button @click="$emit('cancel')"
          class="cancel-button">Exit</button>

      </div>
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
        newItem: {
          name: '',
          price: 0,
          buyPrice: 0,
          currentStorage: 0,
          maxStorage: 0,
          supplierID: null,
        },
        suppliers: [], // Store fetched suppliers here

      };
    },
    mounted() {
      // Fetch data when the component is mounted
      this.fetchInventory();
      this.fetchSuppliers(); // Fetch suppliers when the component is mounted

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
      async fetchSuppliers() {
    try {
      const response = await axios.get('http://localhost:3000/suppliers');
      this.suppliers = response.data.suppliers;
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  },
      async addItem() {
        try {
          const response = await axios.post('http://localhost:3000/inventory-add', this.newItem);
          if (response.data.success) {
            // Item added successfully
            this.fetchInventory(); // Refresh inventory data after adding
            this.resetNewItem(); // Clear the input fields
          } else {
            console.log('Error adding item:', response.data.message);
          }
        } catch (error) {
          console.error('Error adding item:', error);
        }
        this.fetchInventory(); // Refresh inventory data after adding

      },

      async removeItem(itemId) {
        try {
          const response = await axios.delete(`http://localhost:3000/inventory-delete/${itemId}`);
          if (response.data.success) {
            // Item removed successfully
            this.fetchInventory(); // Refresh inventory data after removing
          } else {
            console.error('Error removing item:', response.data.message);
          }
        } catch (error) {
          console.error('Error removing item:', error);
        }

        this.fetchInventory(); // Refresh inventory data after removing


      },
      resetNewItem() {
        this.newItem = {
          name: '',
          price: 0,
          buyPrice: 0,
          currentStorage: 0,
          maxStorage: 0,
          SupplierID: 0,
        };
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

  .confirm-button,
  .cancel-button {
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

  label {
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }

  input {
    width: 75%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  /* Style for the hr element between input fields and the "Add to Inventory" button */
  hr {
    margin: 20px 0;
  }

  .remove-button {
    width: 80px;
    height: 30px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #b94242;
    color: #ffffff;
    transition: background-color 0.3s, color 0.3s;
  }

  #supplier {
        width: 75%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        appearance: none;
        /* Remove default arrow */
        background-color: #fff;
    }

    #supplier:hover {
        border-color: #42b983;
    }

    #supplier:focus {
        outline: none;
        /* Remove focus outline */
        border-color: #42b983;
        box-shadow: 0 0 5px rgba(66, 185, 131, 0.7);
    }

</style>