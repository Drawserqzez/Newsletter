<template>
    <div v-if="user !== null">
        <h2>
          Välkommen {{ user.userName }} !
        </h2>
        <p>Du prenumererar {{ user.isSubscribed ? '' : 'inte' }} på vårt nyhetsbrev.</p>
        <button @click="changeSubscription">
          {{ user.isSubscribed ? 'Avprenumerera' : 'Prenumerera' }}
        </button>
        <div v-if="user.userLevel === 'admin'">
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
</template>

<script>
export default {
    props: {
        user: Object,
        adminData: String,
        openAdminInterface: Function,
        changeSubscription: Function
    }
}
</script>