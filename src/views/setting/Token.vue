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
                        <div class="form-group">
                            <label>Waktu token ujian expired (dalam detik)</label>
                            <input type="number" min="60" name="" id="" class="form-control" v-model="token.value">
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: "SettingToken",
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('setting', {
            token: state => state.set_token
        })
    },
    methods: {
        ...mapActions('setting',['getSettingToken', 'setSettingUjian']),
        async submit() {
            try {
                await this.setSettingUjian()
                this.getSettingToken()
                this.$bvToast.toast('Setting berhasil disimpan', successToas())
            } catch(error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            await this.getSettingToken()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>
<style >
	div[contenteditable] {
    outline:1px solid #d8dbe0
}
</style>