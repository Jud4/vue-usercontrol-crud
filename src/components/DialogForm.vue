<script>
    export default {
        data: () => ({
            dialog: false,
        }),
        props: {
            formTitle: "Edit User" | "Create User",
            editedItem: {
                id: Number,
                username: String,
                password: String,
                email: String,
                details: {
                    id: Number,
                    firstName: String,
                    lastName: String,
                    age: Number,
                    birthDay: Date
                }
            },
            defaultItem: {
                id: 0,
                username: '',
                password: '',
                email: '',
                details: {
                    id: 0,
                    firstName: '',
                    lastName: '',
                    age: 0,
                    birthDay: null
                }
            },
        },
        methods:{
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                })
            },
            edituser() {
                axios.put(`http://localhost:8082/v1/users/${editedItem.id}`, this.editedItem)
                    .then(res => {
                        alert('User was Edited successfully');
                        this.editedItem = Object.assign({}, this.defaultItem);
                    }).catch(function (error) {
                        // handle error on UI site
                })
            },
            saveStudent() {
                axios.post('http://localhost:8082/v1/users/detailed', this.editedItem)
                    .then(res => {
                        alert('User was saved successful');
                        this.editedItem = Object.assign({}, this.defaultItem);
                    }).catch(function (error) {
                        // hangle error on UI site
                })
            },
            save() {
                this.formTitle === "Edit User" ? this.edituser() : this.saveStudent()
            }
        }

    }
</script>

<template>
<v-dialog
        v-model="dialog"
        max-width="500px"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
            >
                New User
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.username"
                            label="Username"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.password"
                            label="Password"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.email"
                            label="Email"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.details.firstName"
                            label="First Name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.details.lastName"
                            label="Last Name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.details.age"
                            label="Age"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-date-picker 
                            v-model="editedItem.details.birthDay" 
                            label="Birthday"
                        ></v-date-picker>
                    </v-col>
                </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
                >
                Cancel
                </v-btn>
                <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
                >
                Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>