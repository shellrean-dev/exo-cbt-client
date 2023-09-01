<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <b-button :to="{ name: 'system.setting' }" size="sm" variant="light">
                        Kembali
                    </b-button>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submit">
                        <div class="alert alert-info">
                            <strong>Informasi</strong>
                            <p>Data yang diinput adalah data user agent <br />
                                Gunakan (*) jika ingin mengizinkan semua browser
                            </p>
                        </div>
                        <div class="form-group">
                            <label>Browser yang diizinkan</label>
                            <textarea name="" id="" class="form-control" v-model="set_ua_whitelist.value"></textarea>
                        </div>
                        <div class="form-group">
                            <b-button variant="primary" type="submit" :disabled="isLoading">
                                {{ isLoading ? 'Processing...' : 'Simpan' }}
                            </b-button>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {errorToas, successToas} from "@/entities/notif";

export default {
    name: "SettingUAWhitelist",
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('setting', {
            set_ua_whitelist: state => state.set_ua_whitelist
        })
    },
    methods: {
        ...mapActions('setting',['getUAWhitelistToken', 'setSettingUAWhitelist']),
        async submit() {
            try {
                await this.setSettingUAWhitelist()
                await this.getUAWhitelistToken()
                this.$bvToast.toast('Setting berhasil disimpan', successToas())
            } catch(error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            await this.getUAWhitelistToken()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>
