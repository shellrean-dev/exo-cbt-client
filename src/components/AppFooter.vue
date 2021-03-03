<template>
    <footer class="c-footer">
        <div><a href="">Extraordinary-CBT</a> &copy; {{ year }} shellrean.</div>
     </footer>
</template>
<script>
    export default {
        data() {
            return {
                version: process.env.VUE_APP_VERSION,
                year: ''
            }
        },
        created() {
            let d = new Date()
            this.year = d.getFullYear()
        }
    }
</script>