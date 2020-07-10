<template>
    <footer class="c-footer">
        <div><a href="">Extraordinary-CBT</a> {{ version }} &copy; 2020 shellrean.</div>
     </footer>
</template>
<script>
    export default {
        data() {
            return {
                version: process.env.VUE_APP_VERSION
            }
        }
    }
</script>