<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'guru.data' }" class="btn btn-light btn-sm">kembali</router-link>
                </div>
                <div class="card-body">
                    <guru-form></guru-form>
                    <div class="form-group">
                        <b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
                        <b-spinner small type="grow" v-show="isLoading"></b-spinner>Simpan</b-button>
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
import FormGuru from './Form.vue'

export default {
    name: 'EditGuru',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['isLoading'])
    },
    methods: {
        ...mapActions('user',['getUserById','updateUser']),
        submit() {
            this.updateUser(this.$route.params.id)
            .then((res) => {
                this.$bvToast.toast('Data user berhasil disimpan.', successToas())
                this.$router.push({ name: 'guru.data' })
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        }
    },
    async created() {
        try {
            await this.getUserById(this.$route.params.id)
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    },
    components: {
        'guru-form' : FormGuru
    }
}
</script>