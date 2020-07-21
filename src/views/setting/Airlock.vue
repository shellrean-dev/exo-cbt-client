<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <b-button :to="{ name: 'system.setting' }" size="sm" variant="light">
                        Kembali
                    </b-button>
                </div>
                <div class="card-body" v-if="typeof airlock.name != 'undefined'">
                    <b-form-checkbox v-model="airlock.value.isactive" switch :value="true">
                        Activate airlock for login
                    </b-form-checkbox>

                    Create a new client and set the redirecto URI to:
                    <code>http://current-url/auth</code>
                    <div class="row">
                        <div class="col-md-6">
                            <form @submit.prevent="submit"> 
                                <div class="form-group">
                                    <label>Client ID</label>
                                    <input type="text" class="form-control" v-model="airlock.value.client_id" required="">
                                </div>
                                <div class="form-group">
                                    <label>Client Secret</label>
                                    <input type="text" class="form-control" v-model="airlock.value.client_secret" required="">
                                </div>
                                <div class="form-group">
                                    <label>OAuth Server URL</label>
                                    <input type="text" class="form-control" v-model="airlock.value.server_url" required="">
                                </div>
                                <div class="form-group">
                                    <label>Server Token Endpoint</label>
                                    <input type="text" class="form-control" v-model="airlock.value.token_url" required="">
                                </div>
                                <div class="form-group">
                                    <label>User Information Endpoint</label>
                                    <input type="text" class="form-control" v-model="airlock.value.user_url" required="">
                                </div>
                                <div class="form-group">
                                    <b-button variant="primary" type="submit" :disabled="isLoading">
                                        {{ isLoading ? 'Processing...' : 'Save configuration' }}
                                    </b-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'Airlock',
    data() {
        return {
            baseURL: process.env.VUE_APP_API_SERVER
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('setting', {
            airlock: state => state.set_airlock
        })
    },
    methods: {
        ...mapActions('setting', ['getSettingAirlock', 'setSettingAirlock']),
        async submit() {
            try {
                await this.setSettingAirlock()
                this.getSettingAirlock()
                this.$bvToast.toast('Authentication airlock setting berhasil disimpan', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            await this.getSettingAirlock()
        } catch(error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>