<template>
    <footer class="c-footer bg-white d-flex justify-content-between">
        <div>&copy; {{ year }} <span>Extraordinary-CBT v3.0.0 - ristretto</span></div>
      <div><span>renjana.org</span></div>
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
