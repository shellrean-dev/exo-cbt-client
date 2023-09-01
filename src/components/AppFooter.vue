<template>
    <footer class="c-footer bg-white d-flex justify-content-between">
        <div>&copy; 2019 - {{ year }} <span>Extraordinary-CBT {{ app_version }}</span></div>
     </footer>
</template>
<script>
import {mapGetters, mapState} from "vuex";

export default {
         computed: {
             ...mapState('setting', {
                 app_version: state => state.app_version
             }),
         },
        data() {
            return {
                year: ''
            }
        },
        created() {
            let d = new Date()
            this.year = d.getFullYear()
        }
    }
</script>
