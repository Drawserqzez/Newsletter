<template>
  <div id="app">
    <nav>
      <Header :navItems="navItems"/>
    </nav>
    <div class="wrapper">
      <div v-if="user !== null">
        <h2>
          Välkommen {{ user.userName }} !
        </h2>
        <p>Du prenumererar {{ user.isSubscribed ? '' : 'inte' }} på vårt nyhetsbrev.</p>
        <button @click="changeSubscription">
          {{ user.isSubscribed ? 'Avprenumerera' : 'Prenumerera' }}
        </button>
        <div vi-if="user.userLevel === 'admin'">
          Du är en administratör.
          <div v-if="adminData !== null">
            <button @click="adminData=null">&times;</button>
            <div v-html="adminData"></div>
          </div>
          <form v-else @submit.prevent="openAdminInterface">
            <p>Skriv in ditt lösenord för att visa admininterfacet.</p>
            <input placeholder="Lösenord" v-model="user.password" type="password" required>
            <br>
            <input type="submit" value="Vidare">
          </form>
        </div>
      </div>
      <Login :login="login" v-if="showLogin"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Login from './components/LoginBox'

export default {
  name: 'App',
  mounted() {
    this.user = null;
  },
  components: {
	Header,
	Login
  },
  data() {
    return {
      user: '',
      showLogin: false,
      adminData: null,
      navItems: {
        nothing: {
          text: 'Place',
          click: () => console.log('Nothing here')
        },
        home: {
          text: 'Home',
          click: this.home
        },
        login: {
          
        }
      }
    }
  },
  methods: {
    home: function() {
      this.showLogin = false;
    },
    login: function(user) {
      fetch('http://localhost:3000/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        if (jsonData.loginSuccessful) {
          this.user = jsonData.loggedInUser;
          
          this.home();
        }
      })
    },
    changeSubscription: function() {
      this.user.isSubscribed = !this.user.isSubscribed;
    },
    openAdminInterface: function() {
      fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.user)
      })
      .then((response) => { return response.text(); })
      .then((text) => {
        this.adminData = text;
      })
      this.user.password = null;
    }
  },
  watch: {
    user: function(value) {
        if (value === null) {
          this.navItems.login = {
            text: 'Logga in',
            click: () => { this.showLogin = !this.showLogin; }
          }
        } 
        else {
          this.navItems.login = {
            text: 'Logga ut',
            click: () => { this.user = null; }
          }
        }
    }
  }
}

</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%; 
  height: 100%;
}

nav {
  width: 100%;
  background-color: lightskyblue;
  padding: 15px;
  overflow-x: hidden;
}

.wrapper {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%;
  height:100%;
}
</style>
