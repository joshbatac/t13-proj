<!-- CustomerOrderView.vue -->

<template>
  <div class="customer-order-view">

    <div v-if="!customerName">
      <h1>
        Not a Member? Sign up Here!

        <div class="h1-sub">
          <label for="phoneNumber">Already a member? Enter your phone number:</label>
          <br>
          <br>
          <input 
          class="input-num" 
          type="text" id="phoneNumber" 
          v-model="phoneNumber" 
          @input="onInputChange"
          @keyup.enter="checkMember"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          maxlength="10"
          placeholder="1234567890" required
          >
        </div>
      </h1>
    </div>
    <div v-else>
      <h1>
        Welcome Back... {{ customerName }}!
        <br>
        <div class="belowWelcome" @click="customerInfoModBoolChange()">EDIT PROFILE</div> &nbsp; &nbsp;
        <div class="belowWelcome" @click="signOut"> SIGN OUT</div>

      </h1>
    </div>

    <div class="content-container">
      <!-- Order buttons component on the left -->
      <div class="order-buttons">
        <OrderButtons @addToBasket="addToBasket" />
      </div>

      <!-- Basket component on the right -->
      <div class="basket">
        <Basket 
        :items="basketItems" 
        :customerID = "this.customerID"
        @removeItem="removeItemFromBasket" 
        @fullRemove="fullRemove" />
      </div>
    </div>


    <customerInfoMod
      v-if="customerInfoModBool"
      @boolChange = "customerInfoModBoolChange"
      :customerName = "this.customerName"
    />

  </div>
</template>
  
<script>
import OrderButtons from './OrderButtons.vue';
import Basket from './Basket.vue';
import CustomerInfoMod from './CustomerInfoMod.vue';
import axios from 'axios';

export default {
  components: {
    OrderButtons,
    Basket,
    CustomerInfoMod,
  },
  data() {
    return {
      basketItems: [], // Now an array of pairs [item, quantity]
      customerName: null,
      customerID: 0,
      phoneNumber: null,
      customerInfoModBool: false,
    };
  },
  methods: {
    onInputChange() {
      // Filter out non-numeric and non-hyphen characters
      this.phoneNumber = this.phoneNumber.replace(/[^0-9-]/g, '');
    },
    addToBasket(item) {
      // Check if the item is already in the basket
      const existingItem = this.basketItems.find((basketItem) => basketItem[0] === item);

      if (existingItem) {
        // If the item already exists, increment the quantity
        existingItem[1]++;
      } else {
        // If the item doesn't exist, add it with a quantity of 1
        this.basketItems.unshift([item, 1]);
      }
    },

    removeItemFromBasket(index, item) {
      // Remove the specified item from the basket
      this.basketItems.splice(index, 1);
    },

    fullRemove() {
      this.basketItems.length = 0;
    },

    async checkMember() {
      if (this.phoneNumber) { // Check if phoneNumber is not empty
        try { // Send a POST request to check the phone number
          const response = await axios.post('http://localhost:3000/check-phone-num', {
            phoneNumber: this.phoneNumber,
          });

          const { ID, fName, lName } = response.data;
          this.customerName = `${fName} ${lName}`;
          console.log('Customer ID:', ID);
          this,this.customerID = ID;
        } catch (error) {
          console.error('Error checking phone number:', error);

        }
      }
    },

    signOut() {
      this.phoneNumber = null;
      this.customerName = null;
      this.customerID = 0;

    },
    customerInfoModBoolChange() {
      this.customerInfoModBool = !(this.customerInfoModBool)
    }
  },
};
</script>
  
<style scoped>
.customer-order-view {
  text-align: center;
  /* Center the content horizontally */
}

h1 {
  margin-bottom: 20px;
  /* Add margin below h1 for separation */
}

.h1-sub {
  font-size: 14px;
  font-style: italic;
  padding-top: 10px;
  padding-bottom: 0px;
}

.input-num {
  text-align: center;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #28745283;
  /* Background color for h1 */
  color: #ddd;
  font-style: oblique;
  appearance: none;
  /* Remove default arrow in Firefox */
  cursor: pointer;
  transition: border-color .15s;


}

.input-num:hover {
  border-color: #42b983;

}

.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.order-buttons {
  width: 100%;
}

.basket {
  width: 50%;
  margin-right: 3%;
}


.belowWelcome {
  display: inline-block;
  text-align: center;
  font-size: 16px;
  border-radius: 8px;
  color: gray;
  font-style: oblique;
  appearance: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 0;
}

.belowWelcome:hover {
  color: white;
}
</style>
  