<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Informasi sekolah
                </div>
                <div class="card-body">
                    <div class="d-flex mb-3">
                        <img src="/img/logo.ico" height="66">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Logo sekolah</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                      <input type="file" class="custom-file-input" @change="handleFileUpload">
                                      <label class="custom-file-label">{{ labelAudio ? labelAudio : 'Pilih File...' }}</label>
                                    </div>
                                    <div class="input-group-append">
                                      <b-button variant="primary"><i class="cil-cloud-upload"></i> Upload</b-button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Nama sekolah</label>
                                <input type="text" v-model="data.nama_sekolah" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" v-model="data.email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Alamat</label>
                                <textarea class="form-control" v-model="data.alamat"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Kepala sekolah</label>
                                <input type="text" class="form-control" v-model="data.kepala_sekolah">
                            </div>
                            <div class="form-group">
                                <label>NIP Kepala sekolah</label>
                                <input type="text" class="form-control" v-model="data.nip_kepsek">
                            </div>
                        </div>
                        <div class="col-md-6">
                        </div>
                    </div>
                    <div class="form-group">
                        <b-button variant="primary" @click="store" :disabled="isLoading"><i class="cil-save"></i> Simpan </b-button>
                    </div>
                </div>
                <div class="card-footer">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'SekolahSetting',
    data() {
        return {
            file: '',
            data: {
                nama_sekolah: '',
                email: '',
                alamat: '',
                kepala_sekolah: '',
                nip_kepsek: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('setting', { sekolah: state => state.set_sekolah })
    },
    methods: {
        ...mapActions('setting',['getSettingSekolah','storeSettingSekolah']),
        async store() {
            try {
                await this.storeSettingSekolah(this.data)
                this.getSettingSekolah()
                this.$bvToast.toast('Data sekolah berhasil disimpan', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            let provider = await this.getSettingSekolah()
            if(provider) {
                this.data = {
                    nama_sekolah : provider.value.nama_sekolah,
                    email: provider.value.email,
                    alamat: provider.value.alamat,
                    kepala_sekolah: provider.value.kepala_sekolah
                }
            }
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }   
    }
}
</script>