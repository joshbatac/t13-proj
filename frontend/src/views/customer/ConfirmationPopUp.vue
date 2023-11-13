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

        <label class="custom-radio">
            <input type="radio" v-model="paymentType" value="cash" name="payment" />
            <span>Cash</span>
        </label>
        <label class="custom-radio">
            <input type="radio" v-model="paymentType" value="credit" name="payment" />
            <span>Credit</span>
        </label>
        <label class="custom-radio">
            <input type="radio" v-model="paymentType" value="Debit" name="payment" />
            <span>Debit</span>
        </label>

        <button @click="confirm(paymentType)" class="confirm-button" :disabled="!paymentType">Yes</button>
        <button @click="cancel" class="cancel-button">Cancel</button>

    
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        total: String,
        items: Array
    },
    data() {
        return {
        paymentType: null, // Default to null
        };
    },
    methods: {
      confirm() {
        this.$emit('confirmed', this.paymentType);
      },
      cancel() {
        this.paymentType = null; // Unselect the payment
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

    .confirm-button:hover,.confirm-button:disabled {
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

    .cancel-button:hover,.cancel-button:disabled {
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
        margin: 0;
    }

    .custom-radio {
        display: inline-block;
        margin: 20px;
        margin-inline: 10px;
        position: relative;
    }

    .custom-radio input {
        opacity: 0;
        position: absolute;
    }

    .custom-radio span {
        display: inline-block;
        padding: 10px;
        background-color: #427fb9;
        color: #ffffff;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s;
    }

    .custom-radio:hover span {
        background-color: #3a357e;
    }

    .custom-radio input:checked + span {
        background-color: #3a357e;
    }
</style>
  