<template>
    <div>
      <h1>Inventory View</h1>
      <ul>
        <li v-for="item in inventory" :key="item.ID">
                {{ item.name }}: {{ item.currentStorage}} / {{ item.maxStorage }}

        </li>
      </ul>
      <button v-if ="changed"> Save Changes? </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        inventory: [],
        changed: false
      }
    },  


    mounted() {
      axios.get('http://localhost:3000/inventory')
        .then(response => {
          this.inventory = response.data.inventory; // Assuming the response contains an array of inventory items
          this.originalInv = this.inventory;
        })
        .catch(error => {
          console.error('Error fetching inventory:', error);
        });
    },

    
    methods: {
    }
  };
  </script>
  

<style>
/* Reset default styles */
ul {
  list-style: none;
  padding: 0;
}

/* Styling the list items */
li {
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0; /* Adding a bottom border for separation */
}

/* Hover effect */
li:hover {
  background-color: #f5f5f5; /* Change background on hover */
  transition: background-color 0.3s ease; /* Adding a smooth transition */
}
</style>