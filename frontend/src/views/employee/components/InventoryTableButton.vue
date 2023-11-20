<template>
  <div class="popup">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <h1>Inventory</h1>
      <div>
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
            <tr v-for="item in inventory" :key="item.ID">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.currentStorage }}</td>
              <td>{{ item.maxStorage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
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
    };
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
  