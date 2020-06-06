<template>
    <div class="loginBox">
        <h1>Logga In</h1>
        <!-- Prevents submission of the forms and then sends it to the parent for processing -->
        <form  @submit.prevent="onLogin">
            <input placeholder="Användarnamn" type="text" v-model="userName" required>
            <br>
            <input placeholder="Lösenord" type="password" v-model="password" required>
            
            <br>
            <input type="submit" value="Logga In">
        </form>
        <br>
        <h3>Inget konto?</h3>
        <form @submit.prevent="onRegister">
            <input placeholder="Användarnamn" type="text" v-model="newUser.userName" required>
            <br>
            <input placeholder="Mejladdress" type="email" v-model="newUser.email" required>
            <br>
            <input placeholder="Lösenord" type="password" v-model="newUser.password" required>
            <br>
            <input type="checkbox" id="isSubscribed" v-model="newUser.isSubscribed">
            <label for="isSubscribed">Prenumerera på vårt nyhetsbrev?</label>
            <br>
            <br>
            <input type="submit" value="Registrera dig">

        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                password: '',
                newUser: {
                    userName: "",
                    email: "",
                    password: "",
                    isSubscribed: true
                }
            }
        }, 
        props: {
            login: Function,
            registerUser: Function
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
            },
            onRegister() {
                let userToRegister = {
                    userName: this.newUser.userName,
                    email: this.newUser.email,
                    password: this.newUser.password,
                    isSubscribed: this.newUser.isSubscribed
                };

                this.newUser.userName = '';
                this.newUser.email = '';
                this.newUser.password = '';
                this.newUser.isSubscribed = true;

                this.registerUser(userToRegister);
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

    input[type="text"], input[type="password"], input[type="email"] {
        padding: 8px;
        margin-bottom: 10px;
    }
</style>