<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1>Employee Info</h1>

        <hr>
        <p>ID: {{ employeeInfo.ID }}</p>
        <p>First Name: {{ employeeInfo.FirstName }}</p>
        <p>Last Name: {{ employeeInfo.LastName }}</p>
        <p>Email: {{ employeeInfo.Email }}</p>
        <p>Phone: {{ employeeInfo.Phone }}</p>
        <hr>

            <button class="edit-button">Edit Info</button>
            <button @click="this.$emit('cancel')" class="cancel-button">Cancel</button>
            <button @click="this.$emit('signOut')" class="signout-button">Sign Out</button>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      employeeInfo: Object,
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

.edit-button,
.cancel-button,
.signout-button
{
    width: 50%;
    height: 10%;
    line-height: 25px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    margin: 3px;
    transition: background-color 0.15s;

}

.edit-button {
    background-color: #42b983;
    color: #ffffff;

}

.cancel-button {
    background-color: #b94242;
    color: #ffffff;

}

.signout-button {
    background-color:  #AEDFF7;
}

.signout-button:hover {
background-color: #8AC6F0;

}

.edit-button:hover,
.edit-button:disabled {
    background-color: #0f362b;
}

.cancel-button:hover,
.cancel-button:disabled {
    background-color: #7e3535;
}
  
  </style>
  