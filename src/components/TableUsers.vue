<template>
<v-data-table 
:items="items" 
:headers="headers"
:sort-by="[{ key: 'id', order: 'asc' }]"
>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Users table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        
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
                            <v-text-field
                                v-model="editedItem.details.birthDay" 
                                label="Birthday"
                            ></v-text-field>
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

      </v-toolbar>
    </template>
    <template #item="{ item }">
      <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.password }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.details?.firstName }}</td>
        <td>{{ item.details?.lastName }}</td>
        <td>{{ item.details?.age }}</td>
        <td>{{ item.details?.birthDay }}</td>
        <td>
          <v-icon size="small" class="me-2" @click="selectUser(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteUserById(item.id)">
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <h6 class="text-subtitle-1">No user registered</h6>
    </template>
</v-data-table>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {
            items: Array,
            delAction: null,
            refreshTable: null
        },
        data: () => ({
            dialog: false,
            headers: [
                { title: 'Nro', value: 'id', key: 'id' },
                { title: 'Username', value: 'username', key: item => `${item.id}${item.username}`},
                { title: 'Password', value: 'password', key: item => `${item.id}${item.password}`},
                { title: 'Email', value: 'email', key: item => `${item.id}${item.email}` },
                { title: 'First Name', value: 'details?.firstName', key: item => `${item.id}${item.details?.firstName}fn` },
                { title: 'Last Name', value: 'details?.lastName', key: item => `${item.id}${details?.lastName}ln` },
                { title: 'Age', value: 'details?.age',key: item => `${item.id}${details?.age}Ag` },
                { title: 'BirthDay', value: 'details?.birthDay',key: item => `${item.id}${details?.birthDay}Bd` },
                { title: 'Actions', key: 'actions', sortable: false }
            ],
            isEdited: false,
            editedItem: {
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
            refreshKey: 0,
        }),
        computed: {
            formTitle () {
                return this.isEdited ? "Edit User" : "Create User"
            },
        },
        methods:{
            refreshComponent() {
                this.refreshKey += 1;
            },
            close () {
                this.dialog = false
                this.isEdited = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                })
            },
            deleteUserById(userId) {
            if (confirm('Are you sure, you want to delete this data?')) {
                axios.delete(`http://localhost:8082/v1/users/${userId}`).then(res => {
                    alert('Deleted was successful');
                    refreshComponent()
                }).catch(function (error) {
                // handle error on UI site
                })
            }
            },
            edituser() {
                axios.put(`http://localhost:8082/v1/users/${this.editedItem.id}`, this.editedItem)
                    .then(res => {
                        alert('User was Edited successfully');
                        
                    }).catch(function (error) {
                        // handle error on UI site
                })
            },
            saveStudent() {
                axios.post('http://localhost:8082/v1/users/detailed', this.editedItem)
                    .then(res => {
                        alert('User was saved successful');
                    }).catch(function (error) {
                        // handle error on UI site
                        console.log(this.editedItem)
                })
            },
            save() {
                this.isEdited ? this.edituser() : this.saveStudent()
                this.close();
                this.editedItem = Object.assign({}, this.defaultItem);
                refreshComponent()
            },
            selectUser(user){
                this.isEdited = true;
                this.userMapping(user);
                this.dialog = true;
            },
            userMapping(user){
                this.editedItem.id = user.id;
                this.editedItem.username = user.username;
                this.editedItem.password = user.password;
                this.editedItem.email = user.email;
                this.editedItem.details.firstName = user.details?.firstName;
                this.editedItem.details.lastName = user.details?.lastName;
                this.editedItem.details.age = user.details?.age;
                this.editedItem.details.birthDay = user.details?.birthDay;
                this.editedItem.details.id = user.details?.id;

            }
        }
    }
</script>