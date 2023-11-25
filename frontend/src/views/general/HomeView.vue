<template>
  <div>

    <div v-if="storeInfo" class="store-info">
      <h1>WELCOME TO {{ storeInfo.store_name }}</h1>
      <h2>About Us</h2>
      <div class="description-box">
        <span v-html="storeInfo.description"></span>
      </div>

      <footer>
        <p class="contact-info"><strong>Contact us at:</strong> {{ storeInfo.contact_email }} | {{ storeInfo.contact_phone }}</p>
      </footer>
    </div>
    <div v-else>
      <p>Loading store information...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      storeInfo: null,
    };
  },
  mounted() {
    this.fetchStoreInfo();
  },
  methods: {
    async fetchStoreInfo() {
      try {
        const response = await axios.get('http://localhost:3000/storeinfo');
        this.storeInfo = response.data.storeInfo[0];
        console.log(response.data.storeInfo);
      } catch (error) {
        console.error('Error fetching store information:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles for this component */

.store-info {
  text-align: center;
}

.description-box {
  max-width: 75%;
  margin: 0 auto;
  padding: 20px;
  font-size: 18px;
}

footer {
  background-color: #f1f1f1;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%; /* Make the footer span the full width of the screen */
}


</style>
