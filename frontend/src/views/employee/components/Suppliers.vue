<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1>Supplier Management</h1>
  
        <!-- Table for displaying suppliers -->
        <div class="table-container">
          <h3>REMOVE SUPPLIER</h3>
          <table class="supplier-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th class="action-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supplier in suppliers" :key="supplier.ID">
                <td>{{ supplier.ID }}</td>
                <td>{{ supplier.name }}</td>
                <td>
                  <button @click="removeSupplier(supplier.ID)" class="remove-button">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <hr>
  
        <!-- Form for adding suppliers -->
        <div>
          <h3>ADD SUPPLIER</h3>
  
          <label for="supplierName">Name:</label>
          <input type="text" v-model="newSupplier.name" id="supplierName" />
  
          <hr>
  
          <button @click="addSupplier" :disabled="newSupplier.name === ''" class="confirm-button">Add Supplier</button>
          <button @click="$emit('cancel')" class="cancel-button">Exit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        suppliers: [], // Store fetched suppliers here
        newSupplier: {
          name: '',
        },
      };
    },
    mounted() {
      // Fetch data when the component is mounted
      this.fetchSuppliers();
    },
    methods: {
      async fetchSuppliers() {
        try {
          const response = await axios.get('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/suppliers');
          this.suppliers = response.data.suppliers;
        } catch (error) {
          console.error('Error fetching suppliers:', error);
        }
      },
  
      async addSupplier() {
        try {
          const response = await axios.post('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/suppliers-add', this.newSupplier);
          if (response.data.success) {
            // Supplier added successfully
            this.resetNewItem(); // Clear the input fields
            this.fetchSuppliers(); // Refresh supplier data after adding
          } else {
            console.error('Error adding supplier:', response.data.message);
          }
        } catch (error) {
          console.error('Error adding supplier:', error);
        }
      },
  
      async removeSupplier(supplierId) {
        try {
          const response = await axios.delete(`https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/suppliers-delete/${supplierId}`);
          if (response.data.success) {
            // Supplier removed successfully
            this.fetchSuppliers(); // Refresh supplier data after removing
          } else {
            console.error('Error removing supplier:', response.data.message);
          }
        } catch (error) {
          console.error('Error removing supplier:', error);
        }
      },
  
      resetNewItem() {
        this.newSupplier = {
          name: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
/* Add your styling for the supplier component here */
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
  overflow-y: auto;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
}

.supplier-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.supplier-table td, .supplier-table th {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  white-space: nowrap;
}

.supplier-table th {
  background-color: #f2f2f2;
  position: sticky;
  top: 0;
  z-index: 1;
}

.confirm-button, .cancel-button {
  width: 25%;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  margin-inline: 10px;
}

.confirm-button {
  background-color: #42b983;
  color: #ffffff;
}

.cancel-button {
  background-color: #b94242;
  color: #ffffff;
}

.confirm-button:hover, .confirm-button:disabled {
  background-color: #0f362b;
}

.cancel-button:hover, .cancel-button:disabled {
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

.remove-button:hover {
  background-color: #7e3535;
}

  </style>
  