<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'jurusan.data' }" class="btn btn-light btn-sm">kembali</router-link>
                </div>
                <div class="card-body">
                  <form @submit.prevent="submit">
                    <jurusan-form></jurusan-form>
                    <div class="form-group">
                      <b-button size="sm" variant="primary" type="submit" :disabled="isLoading">
                        <b-spinner small type="grow" v-show="isLoading"></b-spinner>Simpan</b-button>
                    </div>
                  </form>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import FormJurusan from './Form.vue'

export default {
    name: 'AddJurusan',
    computed: {
        ...mapGetters(['isLoading'])
    },
    methods: {
        ...mapActions('jurusan',['submitJurusan']),
        submit() {
            this.submitJurusan()
            .then(() => {
                this.$bvToast.toast('Data jurusan berhasil disimpan.', successToas())
                this.$router.push({ name: 'jurusan.data' })
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        }
    },
    components: {
        'jurusan-form' : FormJurusan
    }
}
</script>
