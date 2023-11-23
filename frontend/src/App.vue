<template>
  <div>
    <nav>
      <div class="nav-center">
        <router-link to="/" class="a">Home</router-link> |
        <router-link to="/about" class="a">About</router-link> |
        <router-link to="/customer-order" class="a">Shop Here!</router-link>
      </div>

      <!-- Manager, Restocker, Cashier Portals for roleID 3 -->
      <div class="employee-buttons-container" v-if="roleID === 3">
        <router-link to="/manager-portal" class="employee-buttons">Manager Portal</router-link>
        <router-link to="/restocker-portal" class="employee-buttons">Restocker Portal</router-link>
        <router-link to="/cashier-portal" class="employee-buttons">Cashier Portal</router-link>
        <div @click="toggleEInfo()" class="employee-buttons">{{employeeInfo.FirstName}}'s Info & Sign Out</div>
      </div>

      <!-- Restocker, Cashier Portals for roleID 2 -->
      <div class="employee-buttons-container" v-else-if="roleID === 2">
        <router-link to="/restocker-portal" class="employee-buttons">Restocker Portal</router-link>
        <router-link to="/cashier-portal" class="employee-buttons">Cashier Portal</router-link>
        <div @click="toggleEInfo()" class="employee-buttons">{{employeeInfo.FirstName}}'s Info & Sign Out</div>
      </div>

      <!-- Cashier Portal for roleID 1 -->
      <div class="employee-buttons-container" v-else-if="roleID === 1">
        <router-link to="/cashier-portal" class="employee-buttons">Cashier Portal</router-link>
        <div @click="toggleEInfo()" class="employee-buttons">{{employeeInfo.FirstName}}'s Info & Sign Out</div>
      </div>

      <!-- Employee Login for roleID 0 -->
      <div v-if="roleID === 0" class="employee-buttons" @click="toggleELP()">
        Employee Login
      </div>

      <EmployeeLoginPopUp v-if="showELP" @cancel="toggleELP" @success="successEL" />

      <EmployeeInfoView v-if="showEInfo" @cancel="toggleEInfo" @signOut="signOut" :employeeInfo="this.employeeInfo" />

      <EmployeeUpdate v-if="showEUpdate" @cancel="toggleEUpdate" :employeeInfo="this.employeeInfo" />
    </nav>

    <router-view />
  </div>
</template>

<script>
  import EmployeeLoginPopUp from './views/employee/login/EmployeeLoginPopUp.vue';
  import EmployeeInfoView from './views/employee/info/EmployeeInfo.vue';
  import EmployeeUpdate from './views/employee/info/EmployeeUpdate.vue';


  export default {
    components: {
      EmployeeLoginPopUp,
      EmployeeInfoView,
      EmployeeUpdate
    },
    data() {
      return {
        showELP: false,
        showEInfo: false,
        showEUpdate: false,
        roleID: 0,
        employeeInfo: [],
      }
    },
    methods: {
      toggleELP() {
        this.showELP = !this.showELP;
      },
      successEL(info) {
        this.employeeInfo = info;
        this.roleID = this.employeeInfo.RoleID;
        this.toggleELP();
      },
      toggleEInfo() {
        this.showEInfo = !this.showEInfo;
      },
      toggleEUpdate() {
        this.showEUpdate = !this.showEUpdate;
      },
      signOut() {
        this.roleID = 0;
        this.employeeInfo.length = 0;
        this.toggleEInfo()

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
    color: #ffffff;
    padding: 30px;
    margin: 0;
  }

  nav {
    background-color: #2c3e50;
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

  .a,
  .router-link-exact-active,
  .employee-buttons {
    font-weight: bold;
    color: #ffffff;
    margin-right: 10px;
    transition: color .15s;
    text-decoration: none;
    /* Remove underline from all router links and buttons */
  }

  .a:hover,
  .employee-buttons:hover {
    color: gray;
  }

  .router-link-exact-active {
    color: #42b983;
  }

  .employee-buttons-container {
    display: flex;
  }

  .employee-buttons {
    font-style: normal;
    margin-left: auto;
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
