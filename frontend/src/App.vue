<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/customer-order">Shop Here!</router-link> 
    </nav>
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  background-color: #42b983; /* Background color for h1 */
  color: #ffffff; /* Text color for h1 */
  padding: 30px; /* Add padding to provide space around the text */
  margin: 0;
}

nav {
  background-color: #2c3e50; /* Background color for nav */
  padding: 15px;
  margin: 0;
}

nav a {
  font-weight: bold;
  color: #ffffff; /* Text color for nav links */
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>




