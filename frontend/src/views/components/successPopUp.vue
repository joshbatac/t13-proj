<template>
    <div class="confirmation-popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
  
        <h1>Success!</h1>
        <button @click="cancel" class="cancel-button">Exit</button>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    props: {
        message:String
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
  
  h1 {
    border-radius: 8px;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 16px;
    font-style: italic;
    color: #666;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 24px;
    font-style: italic;
    margin: 0;
    padding: 10px;
  }
  
  label {
    font-size: 16px;
    color: #333;
    display: block;
    margin-bottom: 10px;
  }
  
  .custom-select {
    width: 75%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    appearance: none;
    /* Remove default arrow in Firefox */
    cursor: pointer;
    transition: background-color 0.15s;
  
  }
  
  .custom-select:hover {
    border-color: #42b983;
  }
  </style>
    