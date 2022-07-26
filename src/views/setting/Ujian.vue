<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <b-button :to="{ name: 'system.setting' }" size="sm" variant="light">
                        Kembali
                    </b-button>
                </div>
                <div class="card-body" v-if="typeof ujian.value != 'undefined'">
                    <form @submit.prevent="submit">
                        <b-form-checkbox v-model="ujian.value.reset" switch :value="true" :disabled="isLoading">
                            Aktifkan reset login peserta
                        </b-form-checkbox>
                        <b-form-checkbox v-model="ujian.value.autoblock" switch :value="true" :disabled="isLoading">
                            Aktifkan auto block peserta tab in tab
                        </b-form-checkbox>
                        <div class="form-group mt-4">
                            <label>Text Welcome / Peraturan Ujian</label>
                            <ckeditor v-model="ujian.value.text_welcome"  type="inline" :disabled="isLoading"></ckeditor>
                        </div>
                        <div class="form-group mt-4">
                            <label>Text Finish Ujian</label>
                            <ckeditor v-model="ujian.value.text_finish"  type="inline" :disabled="isLoading"></ckeditor>
                        </div>
                        <div class="form-group">
                            <b-button variant="primary" type="submit" :disabled="isLoading">
                                {{ isLoading ? 'Processing...' : 'Save configuration' }}
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
    name: "SettingUjian",
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('setting', {
            ujian: state => state.set_ujian
        })
    },
    methods: {
        ...mapActions('setting',['getSettingUjian', 'setSettingUjian']),
        async submit() {
            try {
                await this.setSettingUjian()
                this.getSettingUjian()
                this.$bvToast.toast('Setting berhasil disimpan', successToas())
            } catch(error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            await this.getSettingUjian()
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