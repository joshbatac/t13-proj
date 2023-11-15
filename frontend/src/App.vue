<template>
  <div>
    <nav>
      <div class="nav-center">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/customer-order">Shop Here!</router-link>
      </div>
      <div class="employee-login">Employee Login</div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  export default {
    data () {
    return {
    }
  },
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

.employee-login {
  margin-left: auto;
  /* Push the "Employee Login" div to the right */
  color: white;
  border-radius: 8px;
  background-color: #42b983;
  padding: 8px;
  font-size: 14px;
  transition: background-color 0.15s;

}

.employee-login:hover {
  background-color: #357e68;

}


</style>
