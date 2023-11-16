<template>
  <div>
    <nav>
      <div class="nav-center">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/customer-order">Shop Here!</router-link>
      </div>
      <div class="employee-buttons-container" v-if="roleID === 3">
        <div class="employee-buttons">Manager Portal</div>
        <div class="employee-buttons">Restocker Portal</div>
        <div class="employee-buttons">Cashier Portal</div>
        <div class= "employee-buttons"> Info & Sign Out </div>

      </div>
      <div class="employee-buttons-container" v-else-if="roleID === 2">
        <div class="employee-buttons">Restocker Portal</div>
        <div class="employee-buttons">Cashier Portal</div>
        <div class= "employee-buttons"> Info & Sign Out </div>

      </div>

      <div class="employee-buttons-container" v-else-if="roleID === 1">
        <div class="employee-buttons">Cashier Portal</div>
        <div class= "employee-buttons"> Info & Sign Out </div>

      </div>
      <div v-if="!employeeInfo" class ="employee-buttons-container">
        <div class="employee-buttons" @click="toggleELP()">
        Employee Login   
        </div>
      </div>

      <EmployeeLoginPopUp
        v-if="showELP"
        @cancel="toggleELP"
      />


    </nav>
    <router-view />
  </div>
</template>

<script>

import EmployeeLoginPopUp from './views/employee/login/EmployeeLoginPopUp.vue';
export default {
  components: {
    EmployeeLoginPopUp
  },
  data() {
    return {
      showELP: false,
      roleID: 3,
      employeeInfo: true
    }
  },
  methods: {
    toggleELP() {
      this.showELP = !(this.showELP)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  background-color: #42b983;
  /* Background color for h1 */
  color: #ffffff;
  /* Text color for h1 */
  padding: 30px;
  /* Add padding to provide space around the text */
  margin: 0;
}

nav {
  background-color: #2c3e50;
  /* Background color for nav */
  padding: 15px;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  /* Text color for nav links */
  margin-right: 10px;
  /* Adjust the margin as needed for spacing between links */
  transition: color .15s;
}

nav a:hover {
  color: gray;

}

nav a.router-link-exact-active {
  color: #42b983;
}

.employee-buttons-container {
  display: flex;
  /* Use flex container to make the child divs inline */
}


.employee-buttons {
  margin-left: auto;
  /* Push the "Employee Login" div to the right */
  color: white;
  border-radius: 8px;
  background-color: #42b983;
  padding: 8px;
  font-size: 14px;
  transition: background-color 0.15s;
}

.employee-buttons:not(:first-child) {
  margin-left: 10px;
}


.employee-buttons:hover {
  background-color: #357e68;
}
</style>
