<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1>Customer Management</h1>
  
        <!-- Table for displaying customers -->
        <div class="table-container">
          <h3>REMOVE CUSTOMER</h3>
          <table class="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th class="action-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.ID">
                <td>{{ customer.ID }}</td>
                <td>{{ customer.fName }}</td>
                <td>{{ customer.lName }}</td>
                <td>{{ customer.phone_num }}</td>
                <td>
                  <button @click="removeCustomer(customer.ID)" class="remove-button">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <hr>
  
        <!-- Form for adding customers -->
        <div>
          <h3>ADD CUSTOMER</h3>
  
          <label for="fName">First Name:</label>
          <input type="text" v-model="newCustomer.fName" id="fName" />
  
          <label for="lName">Last Name:</label>
          <input type="text" v-model="newCustomer.lName" id="lName" />
  
          <label for="phone_num">Phone Number:</label>
          <input type="tel" v-model="newCustomer.phone_num" id="phone_num" @input="limitInputTo10Digits"/>
  
          <hr>
  
          <button @click="addCustomer" :disabled="newCustomer.fName === '' || newCustomer.lName === '' || newCustomer.phone_num === ''" class="confirm-button">Add Customer</button>
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
        customers: [], // Store fetched customers here
        newCustomer: {
          fName: '',
          lName: '',
          phone_num: '',
        },
      };
    },
    mounted() {
      // Fetch data when the component is mounted
      this.fetchCustomers();
    },
    methods: {
        limitInputTo10Digits() {
                // Remove non-numeric characters and limit to 10 digits
                this.newCustomer.phone_num = this.newCustomer.phone_num.replace(/\D/g, '').slice(0, 10);
            },
      async fetchCustomers() {
        try {
          const response = await axios.get('http://localhost:3000/customers');
          this.customers = response.data.customers;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      },
  
      async addCustomer() {
        try {
          const response = await axios.post('http://localhost:3000/customers-add', this.newCustomer);
          if (response.data.success) {
            // Customer added successfully
            this.resetNewItem(); // Clear the input fields
            this.fetchCustomers(); // Refresh customer data after adding
          } else {
            console.error('Error adding customer:', response.data.message);
          }
        } catch (error) {
          console.error('Error adding customer:', error);
        }
      },
  
      async removeCustomer(customerId) {
        try {
          const response = await axios.delete(`http://localhost:3000/customers-delete/${customerId}`);
          if (response.data.success) {
            // Customer removed successfully
            this.fetchCustomers(); // Refresh customer data after removing
          } else {
            console.error('Error removing customer:', response.data.message);
          }
        } catch (error) {
          console.error('Error removing customer:', error);
        }
      },
  
      resetNewItem() {
        this.newCustomer = {
          fName: '',
          lName: '',
          phone_num: '',
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
      overflow-y: auto; /* Add overflow-y to enable scrolling */
  }

  /* ... your existing styles ... */

  /* Add a max-height and overflow-y to the add employee section */
  .popup-content > div {
      max-height: 400px; /* Adjust the max height as per your preference */
      overflow-y: auto; /* Add overflow-y to enable scrolling */
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
      overflow-y: auto;
  }

  .customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto; /* Use auto to adjust cell width based on content */
}
.customer-table td {
  border: 1px solid #ddd;
  padding-top: 10px; /* Adjust top padding */
  padding-bottom: 10px; /* Adjust bottom padding */
  text-align: center;
  white-space: nowrap; /* Prevent content from wrapping */
}

  .customer-table th {
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


  .email-cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  .action-cell {
      width: 80px;
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

  #role {
  width: 75%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  appearance: none; /* Remove default arrow */
  background-color: #fff;
}

#role:hover {
  border-color: #42b983;
}

#role:focus {
  outline: none; /* Remove focus outline */
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.7);
}
</style>