<template>
  <div class="popup">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <h1> EDIT PROFILE: </h1>
      
      <hr>
      Current Name: {{ customerName }}
      <br>
      Current Phone #: {{ phoneNumber }}
      <hr>
      <div class="form-row">
        <label for="changeFName" class="label">New First Name:</label>
        <input 
          type="text"
          id="changeFName"
          :placeholder="customerFName"
          class="input"
          v-model = "newFName"
          @input="dataChanged"
          >
      </div>

      <div class="form-row">
        <label for="changeLName" class="label">New Last Name: </label>
        <input 
          type="text"
          id="changeLName"
          :placeholder="customerLName"
          class="input"
          v-model = "newLName"
          @input="dataChanged"
          >

      </div>

      <div class="form-row">
        <label for="changePhoneNumber" class="label">New Phone #:</label>
        <input 
          type="text"
          id="changePhoneNumber"
          :placeholder="phoneNumber"
          class="input"
          v-model = "newPhone"
          @input="dataChanged"
          >

      </div>
<button class="confirm-button" :disabled="!(this.newFName || this.newLName ||this.newPhone)" @click="confirm">Confirm</button>
      <button @click="this.$emit('boolChange')" class="cancel-button">Go Back</button>


    </div>
  </div>
</template>


<script>
export default {
  props: {
    customerName: String,
    customerFName: String,
    customerLName: String,
    phoneNumber: String,
  },
  data () {
    return {
      newFName: null,
      newLName: null,
      newPhone: null,
      showConfirm: false,
    }
  },
  methods: { 
  }
}

</script>

<style scoped>
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
  /* Dark background with transparency */
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  z-index: 1;
  /* Ensure the pop-up is on top of the overlay */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* Add a subtle box shadow */
  padding: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  /* Adjust label styles as needed */
  width: 150px;
  text-align: left;
}

.input {
  /* Adjust input styles as needed */
  flex: 1;
}

h1 {
  background-color: #42b983;
  /* Background color for h1 */
  color: #ffffff;
  /* Text color for h1 */
  padding: 30px;
  /* Add padding to provide space around the text */
  margin: 0;
  border-radius: 8px;
}


.confirm-button {
  width: 50%;
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
.confirm-button:hover,
.confirm-button:disabled {
  background-color: #357e68;
}

.cancel-button {
  width: 50%;
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

.cancel-button:hover,
.cancel-button:disabled {
  background-color: #7e3535;
}
</style>