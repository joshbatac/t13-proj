<template>
  <div>
    <h1> CASHIER PORTAL </h1>
    <button class ="grid-button" @click="showOrders=!(showOrders)">Order Table Button</button>
    <OrderTableButton
      v-if="showOrders"
      @cancel="showOrders=!(showOrders)"/>
  </div>
</template>

<script>
import OrderTableButton from '../components/OrderTableButton.vue';
export default {
  components: {
    OrderTableButton
  },
    data() {
        return {
            showOrders: false,
        }
    }
}
</script>

<style scoped>
.grid-button {
  width: 30%;
  height: 30%;  
  line-height: 150px;
  font-size: 18px;
  background-color: #42b983;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.15s;
  margin: 0.5%;
}
.grid-button:hover {
  background-color: #357e68;
}

</style>