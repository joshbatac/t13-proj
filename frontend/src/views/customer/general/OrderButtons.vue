<template>
  <div class="order-buttons">
    <h3>Our Products</h3>
    <!-- Buttons to add items to the basket -->
    <button v-for="item in inventory" 
    :key="item.ID"       
    :class="{
        'low-storage': (item.lowStorage === 1 && item.zeroStorage === 0) || (item.currentStorage <= item.maxStorage * .2),
        'zero-storage': (item.lowStorage === 1 && item.zeroStorage === 1) || (item.currentStorage === 0),
        'grid-button': (item.lowStorage === 0 && item.zeroStorage === 0),
      }"
    @mouseenter="showDetails(item)"
    @mouseleave="hideDetails" 
    @click="addToBasket(item)">

      <div v-if="hoveredItem === item.ID" class="item-details">
        {{ item.currentStorage }} / {{ item.maxStorage }} left
      </div>
      <div v-else>
        {{ item.name }} - Price: ${{ item.price }}
      </div>
    </button>
  </div>
</template>
  
<script>
export default {
  props: {
    inventory: Array,
  },
  data() {
    return {
      hoveredItem: null,
    };
  },
  methods: {
    showDetails(item) {
      // Set the hoveredItem to the ID of the current item
      this.hoveredItem = item.ID;
    },
    hideDetails() {
      // Clear the hoveredItem when leaving the button
      this.hoveredItem = null;
    },
    addToBasket(item) {
      if (item.currentStorage > 0) { 
        this.$emit('addToBasket', item);
      }
    },
    colorClass() {
      if ((item.lowStorage === 1 && item.zeroStorage === 0) || (item.currentStorage <= item.maxStorage * .2 && item.currentStorage !== 0)) {
        return 'low-storage';
      }

      if (item.currentStorage === 0) {
        return 'zero-storage';
      }

      return 'grid-button'
    }
  },
};
</script>
  
<style scoped>
.order-buttons {
  text-align: center;
}

h3 {
  margin-bottom: 15px;
  font-size: 24px;
  color: #42b983;
  text-transform: uppercase;
}

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

.low-storage{
  width: 30%;
  height: 30%;
  line-height: 150px;
  font-size: 18px;
  background-color: yellow;  
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.15s;
  margin: 0.5%;
}

.low-storage:hover {
  background-color: rgba(168, 168, 0, 0.847)}

.zero-storage {
  width: 30%;
  height: 30%;
  line-height: 150px;
  font-size: 18px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.15s;
  margin: 0.5%;
}

.zero-storage:hover {
  background-color: darkred;
}
  
  
</style>
  