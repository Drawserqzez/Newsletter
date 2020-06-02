<template>
    <div class="backdrop">
        <div class="content">
            <div v-if="showMain" v-on:home="showMainContent">Bananbåååt</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainContent',
    variables: {
        showMain: true
    },
    methods: {
        showMainContent() {
            this.variables.showMain = true;
        }
    }
}
</script>

<style scoped>
.backdrop {
    background-color: red;
    width: 100%;
    height: 80%;
}

</style>