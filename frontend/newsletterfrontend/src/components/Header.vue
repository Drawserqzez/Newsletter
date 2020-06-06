<template>    
    <ul>
        <!-- Uses v-for to generate a list of navitems -->
        <li v-for="item in navItems" :key="item.id" @click="item.click">
            {{ item.text }}
        </li>
    </ul>    
</template>

<script>
export default {
    props: {
        navItems: Object
    }
}
</script>

<style scoped>
    
    ul {
        list-style: none;
        flex-direction: row;
        justify-content: space-evenly;
        display: flex;
        width: 30%;
        margin-left: auto;
        margin-right: auto;
    }

    li {
        display: block;
        padding: 15px;
        border-radius: 5px;
    }

    li:hover {
        background-color: rgb(64, 179, 250);
        cursor: pointer;
    }
</style>