<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div>
                            <router-link :to="{ name: 'banksoal.soal', params: { banksoal_id: $route.params.banksoal_id } }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                            <a :href="baseURL+'/download/format-input-soal-doc.docx'" class="btn btn-primary btn-sm mr-1" download>
                                <i class="flaticon-download"></i> Download format 1
                            </a>
                            <a :href="baseURL+'/download/format-input-soal-doc-2.docx'" class="btn btn-primary btn-sm" download>
                                <i class="flaticon-download"></i> Download format 2
                            </a>
                        </div>
                        <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_soal_doc_tabel')"><i class="flaticon-info"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row ">
                        <div class="col-md-6">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="flaticon-browser"></i></span>
                                </div>
                                <select class="custom-select" v-model="format">
                                    <option value="1" selected>Format 1</option>
                                    <option value="2" >Format 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group">
                              <div class="custom-file">
                                <input type="file" class="custom-file-input" @change="onFileChange">
                                <label class="custom-file-label">{{ label ? label : 'Pilih file docx...' }}</label>
                              </div>
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="button" :disabled="isLoading" @click="uploadFile">{{ isLoading ? 'Processing...' : 'Upload' }}</button>
                              </div>
                            </div> <br>
                            <b-progress :value="percent" show-progress animated></b-progress>
                        </div>
                    </div>
                </div>
                <div class="card-footer">

                </div>
            </div>
        </div>
        <b-modal id="modal-feature-info" size="lg">
		    <template v-slot:modal-header="{ close }">
		      <h5>Informasi Fitur</h5>
		    </template>
			<div v-html="feature_info.content"></div>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'UploadGuru',
    data() {
        return {
            allow: ['docx'],
            label: '',
            file: '',
            format: '1'
        }
    },
    computed: {
        ...mapGetters(['isLoading','baseURL']),
        ...mapState('feature',['feature_info']),
        ...mapState('soal', {
            percent: state => state.uploadPercentage
        })
    },
    methods: {
        ...mapActions('soal', ['uploadSoal']),
        ...mapActions('feature', ['getFeatureInfo']),
        onFileChange(e) {
            this.label = e.target.files[0].name
            this.file = e.target.files[0]
        },
        uploadFile() {
            let exten = this.label.substring(this.label.lastIndexOf('.') + 1);
            if(!this.allow.includes(exten)) {
                this.$bvToast.toast('Hanya format docx yang diizinkan', errorToas())
                return
            }

            let formData = new FormData()
            formData.append('file',this.file)
            formData.append('fmt', this.format)
            this.uploadSoal({id: this.$route.params.banksoal_id, data: formData})
            .then((res) => {
                this.file = ''
                this.label = ''
                this.$bvToast.toast('Soal berhasil diimport.', successToas())
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        },
        featureInfo(name) {
			this.getFeatureInfo(name)
			.then(() => {
				this.$bvModal.show('modal-feature-info')
			})
		}
    }
}
</script>
