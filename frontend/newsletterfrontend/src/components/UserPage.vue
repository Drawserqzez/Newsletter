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
          Klicka 
          <a 
            @click="openAdminInterface" 
            style="text-decoration: underline; color:blue; cursor: pointer"
          >här</a> för att komma åt admininterfacet.
        </div>
      </div>
</template>

<script>
export default {
    props: {
        user: Object,
        openAdminInterface: Function,
        changeSubscription: Function
    }
}
</script>