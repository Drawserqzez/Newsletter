<template>
    <li>
        <a v-on:click="$emit(event)" href="#">{{ header }}</a>
    </li>
</template>

<script>
export default {
    name: 'Navitem', 
    props: {
        header: String,
        event: String
    }
}
</script>


<style scoped>
a {
    text-decoration: none;
    color: black;
    display: block;
    padding: 12px;
    
}

a:hover {
    background: limegreen;
}
</style>