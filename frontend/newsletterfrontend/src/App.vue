<template>
  <div id="app">
    <nav>
      <Header :navItems="navItems"/>
    </nav>
    <div class="wrapper">
      <UserPage :user="user" :openAdminInterface="openAdminInterface" :changeSubscription="changeSubscription"/>
      <Login :login="login" :registerUser="registerUser" v-if="showLogin"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Login from './components/LoginBox'
import UserPage from './components/UserPage'

export default {
  name: 'App',
  mounted() {
    this.user = null;
  },
  components: {
    Header,
    Login,
    UserPage
  },
  data() {
    return {
      // Defines the local variables of this vue instance. 
      user: '',
      showLogin: false,
      // Defines the array for the navItems. Login is empty so that the 
      // watch-function can set it depending on the state of the user.
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
    // Hides the login-box
    home: function() {
      this.showLogin = false;
    },
    // Logs the current user in. Sent as a prop to the child
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
    // Adds the user via an API call. Sent as a prop to the child.
    registerUser: function(user) {
      fetch('http://localhost:3000/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => { return response.json(); })
      .then((jsonData) => console.log(jsonData));
    },
    // Calls the API to update the current user's subscription status.
    changeSubscription: function() {
      this.user.isSubscribed = !this.user.isSubscribed;
      console.log('Changing subscription...');

      fetch('http://localhost:3000/users/changeSubscription/' + this.user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      })
      .then((response) => { return response.json(); })
      .then((jsonData) => {
        this.user.isSubscribed = jsonData.isSubscribed;
        console.log('Subscription updated!');
      });
    },
    // Fetches the admin-interface and then displays it on the page.
    // This is in order to provide the functionality of it being hidden 
    // behind another login
    openAdminInterface: function() {
      // fetch('http://localhost:3000/admin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(this.user)
      // })
      // .then((response) => { return response.text(); })
      // .then((text) => {
      //   this.adminData = text;
      // })
      // this.user.password = null;

      window.open('http://localhost:3000/admin', '_blank');
    }
  },
  watch: {
    // Checks the conditions to set the info for the login/logout button when the user is updated.
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
