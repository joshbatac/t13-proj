<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
  
        <h1>
          Employee Log In
        </h1>
  
        <form>
          <div class="form-row">
            <label for="username" class="label">Employee ID:</label>
            <input type="text" id="username" placeholder="1234567890" class="input" v-model="employeeID"
              @input="numbersOnly" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="10" required autocomplete="username">
          </div>
  
          <div class="form-row">
            <label for="password" class="label">Password:</label>
            <input type="password" id="password" class="input" v-model="password" placeholder="Password"
              autocomplete="new-password" required>
          </div>
        </form>
  
        <button @click="signIn()" class="confirm-button">Sign In</button>
        <button @click="cancel()" class="cancel-button">Cancel</button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            employeeID: null,
            password: null,
        };
    },
    methods: {
        numbersOnly() {
            // Remove non-numeric characters, except hyphens
            this.employeeID = this.employeeID.replace(/[^0-9]/g, '');
        },
        cancel() {
            this.$emit('cancel');
        },
        async signIn() {
            try {
                // Make an HTTP POST request to your backend endpoint
                const response = await axios.post('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/employee-login', {
                    ID: this.employeeID,
                    checkPassword: this.password,
                });

                if (response.data.success) {
                    console.log('Login successful');   
                    this.$emit('success', response.data);
                } else {
                    console.log('Login failed');
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            }
        },
    },
};
</script>


<style scoped>
h1 {
    border-radius: 8px;
    font-size: 24px;
    margin-bottom: 10px;
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

.confirm-button,
.cancel-button {
    width: 40%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    margin-inline: 10px;
    transition: background-color 0.15s;

}

.confirm-button {
    background-color: #42b983;
    color: #ffffff;

}

.cancel-button {
    background-color: #b94242;
    color: #ffffff;

}

.confirm-button:hover,
.confirm-button:disabled {
    background-color: #0f362b;
}

.cancel-button:hover,
.cancel-button:disabled {
    background-color: #7e3535;
}
</style>