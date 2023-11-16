<template>
    <div class="popup">
        <div class="popup-overlay"></div>
        <div class="popup-content">

            <h1>
                Employee Log In
            </h1>

            <div class="form-row">
                <label for="phoneNumber" class="label">Phone Number:</label>
                <input type="text" id="phoneNumber" placeholder="1234567890" class="input" v-model="phoneNumber"
                    @input="numbersOnly" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="10" required>
            </div>

            <div class="form-row">
                <label for="password" class="label">Password:</label>
                <input type="password" id="password" class="input" v-model="password" placeholder="Password" required>
            </div>


            <button class="confirm-button">Sign In</button>
            <button @click="cancel" class="cancel-button">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: null,

        }
    },
    methods: {
        numbersOnly() {
            // Remove non-numeric characters, except hyphens
            this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
        },
        cancel() {
            this.$emit('cancel')
        }
    }

}
</script>

<style scoped>
h1 {
    border-radius: 8px;
    font-size: 24px;
    margin-bottom: 10px;
}

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

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.label {
    width: 150px;
    text-align: left;
}

.input {
    flex: 1;
}

.confirm-button,
.cancel-button {
    width: 40%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    margin-inline: 10px;
    transition: background-color 0.15s;

}

.confirm-button {
    background-color: #42b983;
    color: #ffffff;

}

.cancel-button {
    background-color: #b94242;
    color: #ffffff;

}

.confirm-button:hover,
.confirm-button:disabled {
    background-color: #0f362b;
}

.cancel-button:hover,
.cancel-button:disabled {
    background-color: #7e3535;
}
</style>