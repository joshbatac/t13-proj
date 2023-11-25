<template>
  <div class="popup">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <h1>Product Purchase Report</h1>

      <br>
      <label for="datepicker">Select Date Range:</label>
      <br>
      <flat-pickr v-model="dateRange" :config="datePickerConfig" @change="fetchProductReport"></flat-pickr>

      <!-- Display total quantity purchased here -->
      <div v-if="productReport.length > 0" class="total-quantity">
        <p>Total Quantity Purchased: {{ calculateTotalQuantity() }}</p>
      </div>

      <!-- Display product report here -->
      <div v-if=" productReport.length > 0" class="table-container">
        <table class="product-report-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Purchase Frequency</th>
              <th>Total Quantity Purchased</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productReport" :key="product.ProductID">
              <td>{{ product.ProductID }}</td>
              <td>{{ product.ProductName }}</td>
              <td>{{ product.PurchaseFrequency }}</td>
              <td>{{ product.TotalQuantityPurchased }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No product purchase data to display.</p>
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
      productReport: [],
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
    async fetchProductReport() {
      console.log(this.dateRange.slice(0, 10), this.dateRange.slice(-10))
      if (this.dateRange.length !== 0) {
        try {
          const response = await axios.get('http://localhost:3000/product-report', {
            params: {
              startDate: this.dateRange.slice(0, 10),
              endDate: this.dateRange.slice(-10),
            },
          });
          this.productReport = response.data
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching product report:', error);
        }
      }
    },

    calculateTotalQuantity() {
  return this.productReport ? this.productReport.reduce((total, product) => total + product.TotalQuantityPurchased, 0) : 0;
}

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


/* Add or modify styles for the popup-overlay and popup-content */

/* Style for the date range input and fetch button */
label {
  margin-right: 10px;
}

.fetch-button {
  margin-top: 10px;
  cursor: pointer;
}

/* Add or modify styles for the table-container and product-report-table */
.product-report-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
}

.product-report-table th,
.product-report-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-report-table th {
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

/* Add or modify styles for the total-quantity */
.total-quantity {
  margin-top: 20px;
}

.total-quantity p {
  font-size: 18px;
  font-weight: bold;
}
</style>
