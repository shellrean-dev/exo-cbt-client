<template>
    <footer class="c-footer">
        <div>&copy; {{ year }} <a href="">Extraordinary-CBT v2.0.1</a></div>
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
