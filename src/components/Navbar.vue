<script setup>

</script>

<template>
  <v-app-bar>
    <v-toolbar-title>Users Control</v-toolbar-title>
    
    <v-toolbar-items>
      <v-btn to="/">
        <v-icon small left>fa-home</v-icon>
        Home
      </v-btn>
      
      <v-btn to="/users">
        <v-icon small left>account-group</v-icon>
        Users
      </v-btn>
      
      <v-btn to="/about">
        <v-icon small left>information</v-icon>
        About
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>

</template>