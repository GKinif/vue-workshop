<template>
    <ul>
        <li v-for="user in userList">{{ user.name.first }} {{ user.name.last }}</li>
    </ul>
</template>

<script>
    export default {
        name: 'UserList',
        props: {
            userList: {
                type: Array,
                required: true
            },
        },
    };
</script>