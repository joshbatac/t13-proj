<!-- Receipt.vue -->
<template>
    <div class="confirmation-popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        
        <h1>THANK YOU FOR SHOPPING WITH US!</h1>
        <h2> "Embrace the joy of shopping, confirm your choices, and let the adventure begin!" </h2>
        <hr>
        <h3>Date: {{ orderData.orderDate}}</h3>
        <h3>ORDER #: {{ orderData.orderID }}</h3>

        <ul>
            <li v-for="(item, index) in items" :key="index">
                ( x{{ item[1] }} ){{ item[0].name }}  - ${{ (item[1] * item[0].price).toFixed(2) }}
            </li>
        </ul>
      <hr>
    
        <h3> Amount Paid: ${{ this.total }} </h3>
        <h3> Payment Type: {{ orderData.paymentType }} </h3>
        
        <button @click="printReceipt" class="print-button">Print Receipt?</button>
        <button @click="leave" class="leave-button">Exit</button>


      </div>

    </div>
  </template>


  <script>
  export default {
    props: {
        total: String,
        items: Array,
        orderData: Object,
    },

    methods: {
      printReceipt() {
        window.print();
      },

      leave() {
        this.$emit('leave');
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

    h1 {
        border-radius: 8px;
    }
    h2 {
        font-size: 14px; /* Adjust the font size as needed */
        font-style: italic;
    }

    p {
        font-size: 36px; /* Adjust the font size as needed */
        font-style: italic;
        margin: 0;
        text-align: left;
    }

    h3 {
        text-align: left;
        padding: 0;
        margin: 1px;
    }

    
    .print-button {
        width: 25%;
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

    .print-button:hover,.print-button:disabled {
        background-color: #357e68;
    }

    .leave-button {
        width: 25%;
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

    .leave-button:hover,.leave-button:disabled {
        background-color: #7e3535;
    }

    @media print {
  body {
    font-family: Arial, sans-serif;
  }

  .print-button,
  .leave-button {
    display: none; /* Hide buttons when printing */
  }

  @page {
    size: auto; /* Use the full page size */
    margin: 0; /* Set margins to 0 */
  }

  /* Hide default printer header and footer */
  @page :first {
    margin-top: 0;
  }

  @page :left {
    margin-left: 0;
  }

  @page :right {
    margin-right: 0;
  }

  @page :blank {
    margin: 0;
  }


  .hide-in-print {
    display: none;
  }
}

  </style>
  