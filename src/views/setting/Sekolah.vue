<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Informasi sekolah
                </div>
                <div class="card-body">
                    <div class="d-flex mb-3">
                        <img v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-height: 66px">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Logo sekolah</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                      <input type="file" class="custom-file-input" @change="onFileChange">
                                      <label class="custom-file-label">{{ label ? label : 'Pilih File...' }}</label>
                                    </div>
                                    <div class="input-group-append">
                                      <b-button variant="primary" @click="storeLogo">
                                        <i class="flaticon-upload-1"></i> 
                                        Upload</b-button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Nama sekolah</label>
                                <input type="text" v-model="data.nama_sekolah" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Tingkat</label>
                                <select name="tingkat" id="tingkat" v-model="data.tingkat" class="form-control">
                                    <option value="SMP">SMP</option>
                                    <option value="SMK-SMA">SMK/SMA</option>
                                </select>
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
                        <b-button variant="primary" @click="store" :disabled="isLoading">
                            <i class="cil-save"></i> {{ isLoading ? 'Processing..' : 'Simpan' }} 
                        </b-button>
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
            label: '',
            data: {
                logo: '',
                nama_sekolah: '',
                email: '',
                alamat: '',
                kepala_sekolah: '',
                nip_kepsek: '',
                tingkat: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isLoading', 'baseURL']),
        ...mapState('setting', { sekolah: state => state.set_sekolah })
    },
    methods: {
        ...mapActions('setting',['getSettingSekolah','storeSettingSekolah', 'changeLogoSekolah']),
        changeData(provider) {
            this.data = {
                logo: provider.value.logo,
                nama_sekolah : provider.value.nama_sekolah,
                email: provider.value.email,
                alamat: provider.value.alamat,
                kepala_sekolah: provider.value.kepala_sekolah,
                nip_kepsek: provider.value.nip_kepsek,
                tingkat: provider.value.tingkat
            }
        },
        async store() {
            try {
                await this.storeSettingSekolah(this.data)
                this.getSettingSekolah()
                this.$bvToast.toast('Data sekolah berhasil disimpan', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
        onFileChange(e) {
          this.label = e.target.files[0].name
          this.file = e.target.files[0]
        },
        async storeLogo() {
            try {
                let formData = new FormData()
                formData.append('image',this.file)
                
                await this.changeLogoSekolah(formData)
                let provider = await this.getSettingSekolah()
                if(provider) {
                    this.changeData(provider)
                }
                this.$bvToast.toast('Logo sekolah berhasil disimpan', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            let provider = await this.getSettingSekolah()
            if(provider) {
                this.changeData(provider)
            }
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }   
    }
}
</script>