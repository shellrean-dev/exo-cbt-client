<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'peserta.data' }" class="btn btn-light btn-sm">Kembali </router-link>
                </div>
                <div class="card-body">
                    <peserta-form></peserta-form>
                    <div class="form-group">
                        <b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
                            <b-spinner small type="grow" v-show="isLoading"></b-spinner> Simpan
                        </b-button>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import FormPeserta from './Form.vue'

export default {
    name: 'EditPeserta',
    computed: {
        ...mapGetters(['isLoading'])
    },
    methods: {
        ...mapActions('peserta',['updatePeserta', 'getPesertaById']),
        async submit() {
            try {
                await this.updatePeserta(this.$route.params.id)
                this.$bvToast.toast('Data peserta berhasil disimpan', successToas())
                this.$router.push({ name: 'peserta.data' })
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    components: {
        'peserta-form' : FormPeserta
    },
    async created() {
        try {
            await this.getPesertaById(this.$route.params.id)
        } catch (error) {

        }
    }
}
</script>