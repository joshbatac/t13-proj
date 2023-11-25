<template>
    <div class="popup">
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <h1>Employee Management</h1>

            <div class="table-container">
                <h3>REMOVE EMPLOYEE</h3>
                <table class="employee-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th class="action-cell">Action</th> <!-- Added class for action cell -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employees" :key="employee.ID">
                            <td>{{ employee.ID }}</td>
                            <td>{{ employee.FirstName }}</td>
                            <td>{{ employee.LastName }}</td>
                            <td class="email-cell">{{ employee.Email }}</td> <!-- Added class for email cell -->
                            <td>{{ employee.Phone }}</td>
                            <td><button @click="removeEmployee(employee.ID)" class="remove-button">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr>
            <div>
                <h3>ADD EMPLOYEE</h3>

                <label for="firstName">First Name:</label>
                <input type="text" v-model="newEmployee.FirstName" id="firstName" />
                <br>
                <label for="lastName">Last Name:</label>
                <input type="text" v-model="newEmployee.LastName" id="lastName" />
                <br>
                <label for="email">Email:</label>
                <input type="email" v-model="newEmployee.Email" id="email" />
                <br>
                <label for="phone">Phone:</label>
                <input type="tel" v-model="newEmployee.Phone" id="phone" @input="limitInputTo10Digits" />

                <label for="password">Password: </label> 
                <input :type="showPassword ? 'text' : 'password'" v-model="newEmployee.Password" id="password" />
                <br>
                <button @click="togglePasswordVisibility">{{ showPassword ? 'Hide' : 'Show' }}</button>

                <label for="role">Role:</label>
                <select v-model="newEmployee.RoleID" id="role">
                    <option v-for="role in fetched_roles" :key="role.ID" :value="role.ID">{{ role.name }}</option>
                </select>

                <hr>
                <button @click="addEmployee"
                    :disabled="newEmployee.FirstName === '' || newEmployee.LastName === '' 
                    || newEmployee.Email === '' || newEmployee.Phone === '' || newEmployee.Phone.length < 10"
                    class="confirm-button">Add Employee</button>
                <button @click="$emit('cancel')" class="cancel-button">Exit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                employees: [], // Store fetched employees here
                newEmployee: {
                    FirstName: '',
                    LastName: '',
                    RoleID: 1,
                    Email: '',
                    Phone: '',
                    Password: '',
                },
                fetched_roles: [],
                showPassword: false,
            };
        },
        mounted() {
            // Fetch data when the component is mounted
            this.fetchEmployees();
            this.fetchRoles();
        },
        methods: {
            limitInputTo10Digits() {
                // Remove non-numeric characters and limit to 10 digits
                this.newEmployee.Phone = this.newEmployee.Phone.replace(/\D/g, '').slice(0, 10);
            },
            async fetchEmployees() {
                try {
                    const response = await axios.get('http://localhost:3000/employees');
                    this.employees = response.data.employees;
                } catch (error) {
                    console.error('Error fetching employees:', error);
                }
            },

            async fetchRoles() {
                try {
                    const response = await axios.get('http://localhost:3000/roles');
                    this.fetched_roles = response.data.roles;
                    console.log(this.fetched_roles);
                } catch (error) {
                    console.error('Error fetching roles:', error);
                }
            },

            async addEmployee() {
                try {
                    const response = await axios.post('http://localhost:3000/employees-add', this.newEmployee);
                    console.log(this.newEmployee)
                    if (response.data.success) {
                        // Employee added successfully
                        this.resetNewItem(); // Clear the input fields
                        this.fetchEmployees(); // Refresh employee data after adding
                        console.log(response.data.message)
                    } else {
                        console.log('Error adding employee:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error adding employee:', error);
                }
            },

            async removeEmployee(employeeId) {
                try {
                    const response = await axios.delete(`http://localhost:3000/employees-delete/${employeeId}`);
                    if (response.data.success) {
                        // Employee removed successfully
                        this.fetchEmployees(); // Refresh employee data after removing
                    } else {
                        console.error('Error removing employee:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error removing employee:', error);
                }
            },

            togglePasswordVisibility() {
                this.showPassword = !this.showPassword;
            },

            resetNewItem() {
                this.newEmployee = {
                    FirstName: '',
                    LastName: '',
                    RoleID: 1,
                    Email: '',
                    Phone: '',
                    password: '',
                };
                this.showPassword = false;
            },
        },
    };
</script>


<style scoped>
    h1 {
        border-radius: 8px;
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
    }
    .popup-content {
        width: 50%;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        z-index: 1;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow-y: auto; /* Add overflow-y to enable scrolling */
    }

    /* ... your existing styles ... */

    /* Add a max-height and overflow-y to the add employee section */
    .popup-content > div {
        max-height: 400px; /* Adjust the max height as per your preference */
        overflow-y: auto; /* Add overflow-y to enable scrolling */
    }

    /* Style for the dropdown menu */
    .custom-select {
        align-items: center;
        width: 75%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fff;
        color: #333;
        appearance: none;
        /* Remove default arrow in Firefox */
        cursor: pointer;
        transition: background-color 0.15s;
    }

    .custom-select:hover {
        border-color: #42b983;
    }

    .table-container {
        max-height: 300px;
        overflow-y: auto;
    }

    .employee-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    table-layout: auto; /* Use auto to adjust cell width based on content */
}
.employee-table td {
    border: 1px solid #ddd;
    padding-top: 10px; /* Adjust top padding */
    padding-bottom: 10px; /* Adjust bottom padding */
    text-align: center;
    white-space: nowrap; /* Prevent content from wrapping */
}

    .employee-table th {
        background-color: #f2f2f2;
        position: sticky;
        top: 0;
        z-index: 1;
    }
    
    .confirm-button,
    .cancel-button {
        width: 25%;
        height: 10%px;
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


    .email-cell {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .action-cell {
        width: 80px;
    }

    label {
        display: block;
        margin-top: 10px;
        font-size: 16px;
    }

    input {
        width: 75%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    hr {
        margin: 20px 0;
    }

    .remove-button {
        width: 80px;
        height: 30px;
        font-size: 14px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background-color: #b94242;
        color: #ffffff;
        transition: background-color 0.3s, color 0.3s;
    }

    .remove-button:hover {
        background-color: #7e3535;
    }

    #role {
    width: 75%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    appearance: none; /* Remove default arrow */
    background-color: #fff;
}

#role:hover {
    border-color: #42b983;
}

#role:focus {
    outline: none; /* Remove focus outline */
    border-color: #42b983;
    box-shadow: 0 0 5px rgba(66, 185, 131, 0.7);
}
</style>
