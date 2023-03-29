<template>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    Informasi instansi
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Nama instansi</label>
                                <input type="text" v-model="data.nama_sekolah" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Tipe instansi</label>
                                <select name="tingkat" id="tingkat" v-model="data.tingkat" class="form-control">
                                    <option value="UMUM">Instansi UMUM</option>
                                    <option value="SD">Sekolah SD</option>
                                    <option value="SMP">Sekolah SMP</option>
                                    <option value="SMK-SMA">Sekolah SMK/SMA</option>
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
                                <label>Kepala instansi</label>
                                <input type="text" class="form-control" v-model="data.kepala_sekolah">
                            </div>
                            <div class="form-group">
                                <label>NIP Kepala instansi</label>
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
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    Logo instansi
                </div>
                <div class="card-body">
                    
                    <div class="d-flex mb-3">
                        <img v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-height: 66px">
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Logo instansi</label>
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
                        </div>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div>
            <div class="card">
                <div class="card-header">
                    Header instansi
                </div>
                <div class="card-body">
                    <div>
                        <div class="form-group" v-for="line,index in lines">
                            <label for="">Text Line (html tag allow)- {{ index+1 }}</label>
                            <input type="text" v-model="lines[index]" class="form-control form-control-sm">
                        </div>
                        <button class="btn btn-sm btn-secondary mr-1"  @click="() => lines.pop()">Hapus line</button>
                        <button class="btn btn-sm btn-primary" @click="() => lines.push('')">Tambah line</button>
                    </div>
                    <hr>
                    <div class="d-flex">
                        <div style="width: 100px">
                            <img v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-width: 100px" alt="Logo">
                        </div>
                        <div class="flex-fill text-center">
                            <div v-for="line in lines" v-html="line"></div>
                        </div>
                        <div style="width: 100px"></div>
                    </div>
                    <hr style="height:2px;border:none;color:#333;background-color:#333;margin-bottom: 1px;">
                    <hr style="height:1px;border:none;color:#333;background-color:#333;margin-top: 0;">
                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <b-button variant="primary" @click="storeKopHeader" :disabled="isLoading">
                            <i class="cil-save"></i> {{ isLoading ? 'Processing..' : 'Simpan' }}
                        </b-button>
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
            },
            lines: [
                "<small>YAYASAN EXTRAORDINARY CBT SHELLREAN</small>",
                "<small>(EXO-CBT) PROVINSI DKI JAKARTA</small>",
                "<strong>SMK NEGERI NUSANTARA</strong>",
                "<small>STATUS AKREDITASI: A</small>",
                "<em><small>Alamat: Jl. Nusantara A1, DKI Jakarta</small></em>"
            ]
        }
    },
    computed: {
        ...mapGetters(['isLoading', 'baseURL']),
        ...mapState('setting', { sekolah: state => state.set_sekolah })
    },
    methods: {
        ...mapActions('setting',['getSettingSekolah','storeSettingSekolah', 'changeLogoSekolah','getSettingHeaderKop', 'setSettingHeaderKop']),
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
                this.$bvToast.toast('Data instansi berhasil disimpan', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
        async storeKopHeader() {
            try {
                this.$store.commit('setting/ASSIGN_SETTING_HEADER_KOP', {
                    value: JSON.stringify(this.lines)
                })
                this.setSettingHeaderKop()
                this.$bvToast.toast('Kop instansi berhasil disimpan', successToas())
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
        },
        async parseHeaderKop(header) {
            let data = JSON.parse(header.value == null || header.value == '' ? '[]' : header.value)
            if(data.length > 1) {
                this.lines = data
            }
        }
    },
    async created() {
        try {
            let provider = await this.getSettingSekolah()
            if(provider) {
                this.changeData(provider)
            }
            let kopHeader = await this.getSettingHeaderKop()
            if(kopHeader) {
                this.parseHeaderKop(kopHeader.data)
            }
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>
