<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1>Supplier Report</h1>
  
        <br>
        <label for="datepicker">Select Date Range:</label>
        <br>
        <flat-pickr v-model="dateRange" :config="datePickerConfig" @change="fetchSupplierReport"></flat-pickr>
  
        <!-- Display total quantity sold and total profit here -->
        <div v-if="supplierReport.length > 0" class="totals">
          <p>Total Quantity Sold: {{ calculateTotalQuantity() }}</p>
          <p>Total Profit: {{ calculateTotalProfit() }}</p>
        </div>
  
        <!-- Display supplier report here -->
        <div v-if="supplierReport.length > 0" class="table-container">
          <table class="supplier-report-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Supplied Inventory</th>
                <th>Total Profit</th>
                <th>Total Sold</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="supplier in supplierReport" :key="supplier.SupplierID">
                <td>{{ supplier.SupplierName }}</td>
                <td>{{ supplier.SuppliedInventory }}</td>
                <td>{{ supplier.TotalProfit.toFixed(2) }}</td>
                <td>{{ supplier.TotalQuantitySold }}</td>

              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>No supplier data to display.</p>
        </div>
        <br>
        <button @click="this.$emit('cancel')" class="cancel-button">Exit</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  
  export default {
    components: {
      flatPickr,
    },
    data() {
      return {
        dateRange: [],
        supplierReport: [],
      };
    },
    computed: {
      datePickerConfig() {
        return {
          mode: 'range',
          dateFormat: 'Y-m-d',
        };
      },
    },
    methods: {
      async fetchSupplierReport() {
        if (this.dateRange.length !== 0) {
          try {
            const response = await axios.get('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/supplier-report', {
              params: {
                startDate: this.dateRange.slice(0, 10),
                endDate: this.dateRange.slice(-10),
              },
            });
            this.supplierReport = response.data;
          } catch (error) {
            console.error('Error fetching supplier report:', error);
          }
        }
      },
  
      calculateTotalQuantity() {
        return this.supplierReport ? this.supplierReport.reduce((total, supplier) => total + supplier.TotalQuantitySold, 0) : 0;
      },
  
      calculateTotalProfit() {
        return this.supplierReport ? this.supplierReport.reduce((total, supplier) => total + supplier.TotalProfit, 0).toFixed(2) : 0;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add or modify styles as needed */
  
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
  
  /* Add or modify styles for the date range input and fetch button */
  label {
    margin-right: 10px;
  }
  
  .fetch-button {
    margin-top: 10px;
    cursor: pointer;
  }
  
  /* Add or modify styles for the table-container and supplier-report-table */
  .supplier-report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .supplier-report-table th,
  .supplier-report-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .supplier-report-table th {
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  
  /* Add or modify styles for the cancel-button */
  .cancel-button {
    width: 25%;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    margin-inline: 10px;
    transition: background-color 0.15s;
  }
  
  .cancel-button {
    background-color: #b94242;
    color: #ffffff;
  }
  
  .cancel-button:hover,
  .cancel-button:disabled {
    background-color: #7e3535;
  }
  
  /* Add or modify styles for the totals */
  .totals {
    margin-top: 20px;
  }
  
  .totals p {
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  