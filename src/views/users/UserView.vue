<script>
import axios from "axios";
import TableUsers from "@/components/TableUsers.vue";

export default {
  name: "UserView",
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:8082/v1/users?detailed=true').then(res=>{
        this.users = res.data;
        console.log(this.users);
      }).catch (() => {
        //TODO Handle error
      })
    }
  },
  mounted() {
    this.getUsers();
  },
  components: {
    TableUsers
  }
}
</script>

<template>
    <TableUsers :items="users"/>
</template>