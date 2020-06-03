<template>
    <div class="loginBox">
        <h1>Logga In</h1>
        <!-- <p>{{ userName }} | {{ password }} </p> -->
        <form  @submit.prevent="onLogin">
            <input placeholder="Användarnamn" type="text" v-model="userName" required>
            <br>
            <input placeholder="Lösenord" type="password" v-model="password" required>
            
            <br>
            <input type="submit" value="Logga In">
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                password: ''
            }
        }, 
        props: {
            login: Function
        },
        methods: {
            onLogin() {
                let user = {
                    userName: this.userName,
                    password: this.password
                };

                this.userName = '';
                this.password = '';
                this.login(user);
            }
        }
    }
</script>

<style>
    .loginBox {
        width: 100%;
        background-color: aqua;
        max-height:100%;
        margin-top: 0;
        padding: 20px 0;
    }

    input[type="text"], input[type="password"] {
        padding: 8px;
        margin-bottom: 10px;
    }
</style>