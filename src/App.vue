<template>
    <div id="app">
        <img src="./assets/logo.png">
        <h1>Awesome user list</h1>
        <user-list :userList="store.userList"></user-list>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from './store';
    import UserList from './components/UserList.vue';

    export default {
        name: 'app',
        data() {
            return {
                store: store.state,
            };
        },
        mounted() {
            axios.get('https://randomuser.me/api/?results=5')
                .then(response => {
                    console.log(response);
                    store.setUserListAction(response.data.results);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        components: {
            UserList,
        },
    };
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
