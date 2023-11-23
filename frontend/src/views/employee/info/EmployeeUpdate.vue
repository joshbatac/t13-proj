<template>
    <div class="popup">
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <h1> EDIT PROFILE: </h1>
            <div v-if="!showSuccess">

                <hr>
                Current Name: {{ employeeInfo.FirstName }} {{ employeeInfo.LastName }}
                <br>
                Current Phone #: {{ employeeInfo.Phone }}
                <br>
                Current Email: {{ employeeInfo.Email }}
                <hr>
                <div class="form-row">
                    <label for="changeFName" class="label">New First Name:</label>
                    <input type="text" id="changeFName" :placeholder="this.employeeInfo.FirstName" class="input"
                        v-model="newFName">
                </div>

                <div class="form-row">
                    <label for="changeLName" class="label">New Last Name: </label>
                    <input type="text" id="changeLName" :placeholder="this.employeeInfo.LastName" class="input"
                        v-model="newLName">

                </div>

                <div class="form-row">
                    <label for="changePhoneNumber" class="label">New Phone #:</label>
                    <input type="text" id="changePhoneNumber" :placeholder="this.employeeInfo.Phone" class="input"
                        v-model="newPhone" @input="limitInputTo10Digits">

                </div>

                <div class="form-row">
                    <label for="changeEmail" class="label">New Phone #:</label>
                    <input type="text" id="changeEmail" :placeholder="this.employeeInfo.Email" class="input"
                        v-model="newEmail">

                </div>


                <button class="confirm-button"
                    :disabled="!(this.newFName || this.newLName ||this.newPhone || this.newEmail)"
                    @click="confirm">Confirm</button>
                <button @click="this.$emit('cancel')" class="cancel-button">Go Back</button>

            </div>


            <div v-if="showSuccess">
                <hr>
                <h2>SUCCESS! Please Log Out and Log In to see changes</h2>
                <hr>
                <button @click="this.$emit('cancel')" class="cancel-button">Go Back</button>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';


    export default {
        props: {
            employeeInfo: Object
        },
        data() {
            return {
                newFName: null,
                newLName: null,
                newPhone: null,
                newEmail: null,
                showConfirm: false,
                showSuccess: false
            }
        },
        methods: {
            limitInputTo10Digits() {
                // Remove non-numeric characters and limit to 10 digits
                this.newPhone = this.newPhone.replace(/\D/g, '').slice(0, 10);
            },
            async confirm() {
                // Prepare data for the API request
                const requestData = {
                    ID: this.employeeInfo.ID,
                    newFName: this.newFName || this.employeeInfo.FirstName,
                    newLName: this.newLName || this.employeeInfo.LastName,
                    newPhone: this.newPhone || this.employeeInfo.Phone,
                    newEmail: this.newEmail || this.employeeInfo.Email
                };
                console.log(this.newFName)


                // Make a POST request to the "customer-update" API endpoint
                axios.post('http://localhost:3000/employee-update', requestData)
                    .then(response => {
                        // Handle the API response as needed
                        console.log('API Response:', response.data);
                        this.showSuccess = true;
                    })
                    .catch(error => {
                        // Handle errors
                        console.error('API Error:', error);
                    });

            },

        }
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
        padding: 20px;
    }

    .form-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .label {
        /* Adjust label styles as needed */
        width: 150px;
        text-align: left;
    }

    .input {
        /* Adjust input styles as needed */
        flex: 1;
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


    .confirm-button {
        width: 50%;
        height: 30%;
        line-height: 150%;
        font-size: 18px;
        background-color: #42b983;
        color: #ffffff;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s;
        margin: 0.5%;
    }

    .confirm-button:hover,
    .confirm-button:disabled {
        background-color: #357e68;
    }

    .cancel-button {
        width: 50%;
        height: 30%;
        line-height: 150%;
        font-size: 18px;
        background-color: #b94242;
        color: #ffffff;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s;
        margin: 0.5%;
    }

    .cancel-button:hover,
    .cancel-button:disabled {
        background-color: #7e3535;
    }
</style>