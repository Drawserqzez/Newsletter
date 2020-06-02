<template>
    <nav>
        <div class="middle">
            <ul>
                <Navitem header="Newsletter" onClick="home"/>
                <Navitem header="Logga in" onClick="login"/>
            </ul>
        </div>
    </nav>
</template>

<script>
    import Navitem from './Navitem';

    export default {
        name: 'Navbar',
        components: {
            Navitem
        },
        props: {
            home: String,
            login: String
        }
    }
</script>

<style scoped>

nav {
    background-color: lightgreen;
    color:black;

    padding: 40px;
}

ul {
    list-style: none;
    margin: 0;
    /* display: flexbox;
    flex-direction: row;
    justify-content: center; */
}

li {
    display: flex;
    justify-self: center;
    float: left;
    margin-top: -20px;
    margin-left: -50px;
    margin-right: 45px;
}

/* .middle {
    width: 10%;
    margin-left: auto;
    margin-right: auto;
} */

</style>