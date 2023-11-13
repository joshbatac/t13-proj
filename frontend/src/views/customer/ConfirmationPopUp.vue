<!-- ConfirmationPopUp.vue -->
<template>
    <div class="confirmation-popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1 class = "h1">Confirm Checkout</h1>
        <h2 class = "h2"> "Embrace the joy of shopping, confirm your choices, and let the adventure begin!" </h2>
        <ul>
            <li v-for="(item, index) in items" :key="item[0].ID">
                ( x{{ item[1] }} ){{ item[0].name }}  - ${{ (item[1] * item[0].price).toFixed(2) }}
            </li>
        </ul>
        <p class = "p"> TOTAL: ${{ this.total }}</p>
        <button @click="confirm" class = "confirm-button">Yes</button>
        <button @click="cancel"  class = "cancel-button">Cancel</button>

    
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        total: String,
        items: Array
    },
    methods: {
      confirm() {
        this.$emit('confirmed');
      },
      cancel() {
        this.$emit('canceled');
      },
    },
  };
  </script>
  
  <style scoped>
  .confirmation-popup {
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
    background-color: rgba(0, 0, 0, 0.5); /* Dark background with transparency */
  }
  
  .popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    z-index: 1; /* Ensure the pop-up is on top of the overlay */
  }
  .confirm-button {
  width: 100%;
  height: 30%;
  line-height: 150%;
  font-size: 18px;
  background-color: #42b983;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  margin: 0.5%;
}

.confirm-button:hover {
  background-color: #357e68;
}

.cancel-button {
  width: 100%;
  height: 30%;
  line-height: 150%;
  font-size: 18px;
  background-color: #b94242;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  margin: 0.5%;
}

.cancel-button:hover {
  background-color: #7e3535;
}

.h1 {
    border-radius: 8px;
}
.h2 {
    font-size: 14px; /* Adjust the font size as needed */
    font-style: italic;
}

.p {
    font-size: 36px; /* Adjust the font size as needed */
    font-style: italic;
}
  </style>
  