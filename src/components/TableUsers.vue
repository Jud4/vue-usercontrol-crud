<template>
<v-data-table :items="items" :headers="headers">
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
      </tr>
    </template>
</v-data-table>
</template>

<script setup>
    defineProps(['items'])
    const headers = [
        { title: 'Nro', value: 'id', key: 'id' },
        { title: 'Username', value: 'username', key: item => `${item.id}${item.username}`},
        { title: 'Password', value: 'password', key: item => `${item.id}${item.password}`},
        { title: 'Email', value: 'email', key: item => `${item.id}${item.email}` },
        { title: 'First Name', value: 'details?.firstName', key: item => `${item.id}${item.details?.firstName}fn` },
        { title: 'Last Name', value: 'details?.lastName', key: item => `${item.id}${details?.lastName}ln` },
        { title: 'Age', value: 'details?.age',key: item => `${item.id}${details?.age}Ag` },
        { title: 'BirthDay', value: 'details?.birthDay',key: item => `${item.id}${details?.birthDay}Bd` },
    ];
</script>