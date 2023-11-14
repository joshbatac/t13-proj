<template>
  <div class="popup">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <h1> EDIT PROFILE: </h1>
      <p>
        
        Current Name: {{ customerName }}
      
      
      </p>


      <button @click="this.$emit('boolChange')" class="cancel-button">Go Back</button>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerName: String,
  },
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
</style>