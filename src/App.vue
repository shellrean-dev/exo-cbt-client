<template>
    <div>
        <loading :active.sync="loadPage"
        :is-full-page="true"
        :loader="'dots'"
        :height="45"
        :width="45"
        :color="'#1f1498'"></loading>

        <app-sidebar v-show="isAuth"/>
        <div :class="{ 'c-wrapper' : isAuth }">
            <app-header v-if="isAuth" />
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
            <app-footer v-if="isAuth" />
        </div >
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        AppHeader,
        AppSidebar,
        AppFooter,
        Loading
    },
    computed: {
        ...mapState(['token', 'loadPage']),
        ...mapGetters(['isAuth']),
    },
    methods: {
        ...mapActions('setting',['getConfig'])
    },
    async created() {
        await this.getConfig()
    }
}
</script>
<style lang="scss">
    @import "~@coreui/coreui/scss/coreui";
    @import 'node_modules/bootstrap-vue/src/index.scss';
    @import "assets/plugins/flaticon2/flaticon.css";
	@import "assets/plugins/flaticon/flaticon.css";
    .swal2-popup {
        font-size: 0.7rem !important;
    }
</style>
