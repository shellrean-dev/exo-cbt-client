<template>
    <footer class="c-footer bg-white">
        <div>&copy; {{ year }} <a href="">Extraordinary-CBT</a></div>
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