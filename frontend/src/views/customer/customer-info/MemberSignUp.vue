<template>
    <div class="popup">
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <h1>Member Sign Up</h1>
            <hr>

            <div class="form-row">
        <label for="customerFName" class="label">First Name:</label>
        <input 
          type="text"
          id="customerFName"
          placeholder="John"
          class="input"
          v-model = "customerFName"
          >
      </div>

      <div class="form-row">
        <label for="customerLName" class="label">Last Name: </label>
        <input 
          type="text"
          id="customerLName"
          placeholder="Doe"
          class="input"
          v-model = "customerLName"
          >

      </div>

      <div class="form-row">
        <label for="phoneNumber" class="label">Phone #:</label>
        <input 
            type="text"
            id="phoneNumber"
            placeholder="1234567890"
            class="input"
            v-model = "phoneNumber"
            @input="numbersOnly"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            maxlength="10" 
        required
          >

      </div>
      <button class="confirm-button" 
      :disabled="!(this.customerFName && this.customerLName  && this.phoneNumber)"
       @click="confirm">
       Sign Up</button>

        <button @click="this.$emit('boolChange')" class="cancel-button">Go Back</button>
        </div> 
    </div>
</template>
  
  
<script>
export default {
    props: {

    },
    data() {
        return {
            customerFName: null,
            customerLName: null,
            phoneNumber: null,

        }
    },
    methods: {
        numbersOnly() {
      // Filter out non-numeric and non-hyphen characters
      this.phoneNumber = this.phoneNumber.replace(/[^0-9-]/g, '')
    },
        confirm() {
            this.$emit('finishedMSU',this.customerFName,this.customerLName,this.phoneNumber);
        }
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
}

.popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.label {
    width: 150px;
    text-align: left;
}

.input {
    flex: 1;
}

h1 {
    background-color: #42b983;
    color: #ffffff;
    padding: 30px;
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