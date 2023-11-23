<template>
  <div class="customer-order-view">

    <div v-if="!customerName">
      <h1>
        Not a Member? 
        <div class = "member-login" @click="memberSignUpBoolChange()">
          Sign Up Here</div> 
       and get 10% off!

        <div class="h1-sub">
          <label for="phoneNumber">Already a member? Enter your phone number:</label>

          <br>
          <input 
            class="input-num" 
            type="text" 
            id="phoneNumber" 
            v-model="phoneNumber" 
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            maxlength="10" placeholder="1234567890"
            @input="onInputChange"
            @keyup.enter="checkMember" 
            required
          >
        </div>
      </h1>
    </div>
    <div v-else>
      <h1>
        Welcome Back... {{ customerName }}!
        <br>
        <div class="belowWelcome" @click="customerInfoModBoolChange()">EDIT PROFILE</div> &nbsp; &nbsp;
        <div class="belowWelcome" @click="this.viewOrders=!(this.viewOrders)">VIEW ORDERS</div> &nbsp; &nbsp;
        <div class="belowWelcome" @click="signOut"> SIGN OUT</div>

      </h1>
    </div>

    <div class="content-container">
      <!-- Order buttons component on the left -->
      <div class="order-buttons">
        <OrderButtons 
          @addToBasket="addToBasket" 
          :inventory ="this.inventory"
        />
      </div>

      <!-- Basket component on the right -->
      <div class="basket">
        <Basket 
          :items="basketItems" 
          :customerID="this.customerID" 
          :customerFName="this.customerFName"
          @removeItem="removeItemFromBasket"
          @fullRemove="fullRemove" 
          @increaseCurrStorage="increaseCurrStorage" 
          @updateInventory="updateInventory"
        />
      </div>
    </div>


    <customerInfoMod 
      v-if="customerInfoModBool" 
      :customerName="this.customerName"
      :customerFName="this.customerFName" 
      :customerLName="this.customerLName" 
      :customerID ="this.customerID"
      :phoneNumber="this.phoneNumber" 
      @boolChange="customerInfoModBoolChange" 
    />

    <MemberSignUp 
    v-if="memberSignUpBool"
    @boolChange = "memberSignUpBoolChange"
    @finishedMSU = "dataMSUtransfer"
    />

    <MemberSignUpConfirm
    v-if="showMSUC"
    :newCustomerFName = "this.newCustomerFName"
    :newCustomerLName = "this.newCustomerLName"
    :newCustomerPhoneNum="this.newCustomerPhoneNum"
    @cancel = "toggleMSUC"
    @signUp = "addCustomer"
    />

    <OrdersPopUp
    v-if="viewOrders"
    :customerID = "this.customerID"
    @cancel = "this.viewOrders = !this.viewOrders"/>

    



  </div>
</template>
  
<script>
import OrderButtons from './OrderButtons.vue';
import Basket from '../order-sending/Basket.vue';
import CustomerInfoMod from '../customer-info/CustomerInfoMod.vue';
import MemberSignUp from '../customer-info/MemberSignUp.vue';
import MemberSignUpConfirm from '../customer-info/MemberSignUpConfirm.vue';
import OrdersPopUp from './ordersPopUp.vue';
import axios from 'axios';

export default {
  components: {
    OrderButtons,
    Basket,
    CustomerInfoMod,
    MemberSignUp,
    MemberSignUpConfirm,
    OrdersPopUp
  },

  data() {
    return {
      basketItems: [], // Now an array of pairs [item, quantity]
      inventory: [],

      customerInfoModBool: false,
      memberSignUpBool: false,
      showMSUC: false,
      viewOrders: false,

      customerName: null,
      customerFName: null,
      customerLName: null,
      customerID: 0,
      phoneNumber: null,

      newCustomerFName: null,
      newCustomerLName: null,
      newCustomerPhoneNum: null
    };
  },


  mounted() {
    this.updateInventory()
  },


  methods: {
    updateInventory() {
      axios.get('http://localhost:3000/inventory')
      .then(response => {
        this.inventory = response.data.inventory; // Assuming the response contains an array of inventory items
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
    },
    onInputChange() {
      // Filter out non-numeric and non-hyphen characters
      this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
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

      item.currentStorage--;
    },

    removeItemFromBasket(index, item) {
      // Remove the specified item from the basket
      this.basketItems.splice(index, 1);
    },

    increaseCurrStorage(item) {
      item.currentStorage++;
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
          this.customerFName = fName;
          this.customerLName = lName;
          this.customerName = `${fName} ${lName}`;
          console.log('Customer ID:', ID);
          this.customerID = ID;
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
    },
    memberSignUpBoolChange() {
      this.memberSignUpBool = !(this.memberSignUpBool)
    },
    dataMSUtransfer(MSUFName, MSULname, MSUphoneNumber) {
      this.newCustomerFName = MSUFName
      this.newCustomerLName = MSULname
      this.newCustomerPhoneNum = MSUphoneNumber
      this.toggleMSUC()
      
    },
    toggleMSUC() {
      this.showMSUC = !(this.showMSUC)
      this.memberSignUpBool = !(this.memberSignUpBool)
    },
    async addCustomer() {
      try {
        // Make a POST request to the API endpoint using Axios
        const response = await axios.post('http://localhost:3000/customer-insert', {
          fName: this.newCustomerFName,
          lName: this.newCustomerLName,
          phone_num: this.newCustomerPhoneNum
        });

        // Check if the request was successful
        if (response.status === 200) {
          const { message, customer } = response.data;
          console.log(message);
          console.log('Inserted customer:', customer);
        } else {
          console.error('Error adding customer:', response.data.error);
        }
      } catch (error) {
        console.error('Error adding customer:', error.message);
      }

      this.showMSUC = false;
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

.member-login {
  color: white;
  transition: color 0.15s;
  background-color: #42b983;
  display: inline;
  font-size: 32px;
  text-decoration: underline;


}

.member-login:hover {
  color:  grey;

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
  