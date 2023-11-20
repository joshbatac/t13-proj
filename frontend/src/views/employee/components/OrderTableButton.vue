<template>
  <div class="popup">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <h1>Orders</h1>

      <br>
      <label for="datepicker">Select Date Range:</label>
      <br>
      <flat-pickr v-model="dateRange" :config="datePickerConfig" @change="fetchOrders"></flat-pickr>

      <!-- Display orders here -->
      <div v-if="orders.length > 0" class="table-container">
        <table class="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.ID">
              <td>{{ order.ID }}</td>
              <td>{{ formatDateString(order.orderDate) }}</td>
              <td>{{ order.totalOwed }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No orders to display.</p>
      </div>
      <br>
      <button @click="this.$emit('cancel')" class="cancel-button">Exit</button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css'; // Import the styles



export default {
  components: {
    flatPickr,
  },
  data() {
    return {
      dateRange: [], // Store selected date range here
      orders: [], // Store fetched orders here
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
  mounted() {
    // Fetch data when the component is mounted
    this.fetchOrders();
  },
  methods: {
    formatDateString(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    async fetchOrders() {
      console.log(this.dateRange)

      if (this.dateRange.length != 0) {
        try {
          const fetchOrdersResponse = await axios.get('http://localhost:3000/emp-orders', {
            params: {
              startDate: this.dateRange.slice(0, 10),
              endDate: this.dateRange.slice(-10)
            },
          });
          this.orders = fetchOrdersResponse.data;
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }

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

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
  /* Fixed table layout */
}

.orders-table th,
.orders-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.orders-table th {
  background-color: #f2f2f2;
  position: sticky;
  top: 0;
  z-index: 1;
}

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
</style>
  