<template>
    <div class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <h1>Store Information Update</h1>
  
        <div class="scroll-container">
          <!-- Store information viewer -->
          <div class="store-info-viewer" v-if="!editing">
            <h2>Current Store Information</h2>
            <p><strong>Store Name:</strong> {{ storeInfo.store_name }}</p>
            <p><strong>Description:</strong> {{ storeInfo.description }}</p>
            <p><strong>Contact Email:</strong> {{ storeInfo.contact_email }}</p>
            <p><strong>Contact Phone:</strong> {{ storeInfo.contact_phone }}</p>
            <hr>
            <button @click="startEditing" class="edit-button">Edit Information</button>
            <button @click="this.$emit('cancel')" class="cancel-button">Cancel</button>

          </div>
  
          <!-- Form for updating store information -->
          <div v-if="editing">

            <label for="storeName">Store Name:</label> {{ newStoreName }}
            <input type="text" v-model="newStoreName" id="storeName" />
  
            <label for="description">Description:</label>
            <textarea class="large-description" v-model="newStoreDesc" id="description"></textarea>
  
            <label for="contactEmail">Contact Email:</label>
            <input type="text" v-model="newStoreEmail" id="contactEmail" />
  
            <label for="contactPhone">Contact Phone:</label>
            <input type="text" v-model="newStorePhone" id="contactPhone" />
            <button @click="updateStoreInfo" class="confirm-button">Update Information</button>
            <button @click="cancelEditing" class="cancel-button">Cancel</button>
            <hr>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        storeInfo: {}, // Initialize as needed
        newStoreName: null,
        newStoreDesc: null,
        newStoreEmail: null,
        newStorePhone: null,

        editing: false,
      };
    },
    mounted() {
      // Fetch store information when the component is mounted
      this.fetchStoreInfo();
    },
    methods: {
      async fetchStoreInfo() {
        try {
          const response = await axios.get('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/storeinfo');
          this.storeInfo = response.data.storeInfo[0];
        } catch (error) {
          console.error('Error fetching store information:', error);
        }
      },
      startEditing() {
        // Switch to editing mode
        this.editing = true;
        // Copy the current store info to the update form
        this.newStoreName = this.storeInfo.store_name
        this.newStoreDesc = this.storeInfo.description
        this.newStoreEmail = this.storeInfo.contact_email
        this.newStorePhone= this.storeInfo.contact_phone
      },
      cancelEditing() {
        // Cancel editing and switch back to viewer mode
        this.editing = false;
      },
      async updateStoreInfo() {
        try {
    const response = await axios.put('https://arcane-headland-88481-37b7cd6b0bc8.herokuapp.com/storeinfo-update', {
      storeID: this.storeInfo.store_id,
    newStoreName: this.newStoreName,
    newDescription: this.newStoreDesc,
    newContactEmail: this.newStoreEmail,
    newContactPhone: this.newStorePhone,
    });

          if (response.data.success) {
            console.log(response.data.newStoreName)
            // Store information updated successfully
            this.editing = false; // Switch back to viewer mode
            this.fetchStoreInfo(); // Refresh store data after updating
          } else {
            console.error('Error updating store information:', response.data.message);
          }
        } catch (error) {
          console.error('Error updating store information:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling for the store information update component here */
  
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
  }
  
  .popup-content {
    width: 75%;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .scroll-container {
    max-height: 400px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  label {
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }
  
  hr {
    margin: 20px 0;
  }
  
  .confirm-button,
  .cancel-button,
  .edit-button {
    width: 25%;
    height: 40px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    margin-inline: 10px;
  }
  
  .confirm-button {
    background-color: #42b983;
    color: #ffffff;
  }
  
  .cancel-button {
    background-color: #b94242;
    color: #ffffff;
  }
  
  .edit-button {
    background-color: #f0ad4e;
    color: #ffffff;
  }
  
  .confirm-button:hover,
  .edit-button:hover,
  .cancel-button:hover {
    background-color: #0f362b;
  }
  
  .large-description {
    height: 80px; /* Adjust the height as needed for the description textarea */
  }
  </style>
  