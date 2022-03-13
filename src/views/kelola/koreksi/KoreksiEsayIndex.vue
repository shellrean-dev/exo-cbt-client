<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <span>Koreksi jawaban peserta</span>
                        <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_koreksi_esay_tabel')"><i class="flaticon-info"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Koreksi</h4>
                            <div class="small text-muted">List banksoal yang belum terkoreksi</div>
                        </div>
                    </div>
                    <br>
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="banksoals" show-empty >
                            <template v-slot:cell(no)="row">
                                {{ row.index + 1 }}
                            </template>
                            <template v-slot:cell(kode_banksoal)="row">
                                {{ row.item.kode_banksoal }}
                            </template>
                            <template v-slot:cell(aksi)="row">
                                <router-link
                                  :to="{ name: 'kelola.koreksi.nilai.esay', params: { banksoal: row.item.id } }"
                                  class="btn btn-sm btn-primary mr-1">
                                  <i class="flaticon-list"></i> Koreksi banksoal ini
                                </router-link>
                              <button class="btn btn-sm btn-success"
                              @click="onClickKoreksiOffline(row.item.id)"
                              >
                                <i class="flaticon-download"></i> Koreksi offline
                              </button>
                            </template>
                        </b-table>
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
          <template v-if="_is_feature_info">
         

          <div v-html="feature_info.content"></div></template>
              <template v-slot:modal-footer="{ cancel }">
            <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
              Cancel
            </b-button>
          </template>
      </b-modal>

      <b-modal id="modal-koreksi-offline" hide-footer>
        <template v-slot:modal-header="{}">
          <h5>Koreksi Offline Esay</h5>
        </template>
        <div>
          <div class="input-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" @change="onFileChange">
              <label class="custom-file-label">{{ label ? label : 'Pilih file excel...' }}</label>
            </div>
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                :disabled="isLoading"
                @click="uploadFile">{{ isLoading ? 'Processing...' : 'Upload' }}
              </button>
            </div>
          </div>
          <a href="#" @click.prevent="downloadJawabanPeserta" download>Download format</a>
        </div>
      </b-modal>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'UjianKoreksi',
    data() {
        return {
          allow: ['xlsx','xls'],
          label: '',
          file: '',
            fields: [
                { key: 'no', label: 'No' },
                { key: 'kode_banksoal', label: 'Banksoal' },
                { key: 'nama_matpel', label: 'Matpel' },
                { key: 'aksi', label: 'Aksi' }
            ],
          onWillKoreksi: null
        }
    },
    computed: {
      ...mapState(['isLoading']),
        ...mapState('ujian',{ banksoals: state => state.ujiansExists }),
        ...mapState('feature',['feature_info']),
        _is_feature_info() {
            if(typeof this.feature_info != 'undefined') {
                return true
            }
            return false
        }
    },
    methods: {
        ...mapActions('ujian',['getExistsEsay']),
        ...mapActions('feature', ['getFeatureInfo']),
      ...mapActions('penilaian', ['getLinkExcelJawabanPeserta', 'uploadJawabanPesertaEsay']),
      onFileChange(e) {
        this.label = e.target.files[0].name
        this.file = e.target.files[0]
      },
      uploadFile() {
        let formData = new FormData()
        formData.append('file',this.file)
        this.uploadJawabanPesertaEsay(formData)
          .then((res) => {
            this.file = ''
            this.label = ''
            this.$bvToast.toast('Nilai peserta berhasil diimport.', successToas())
            this.$bvModal.hide('modal-koreksi-offline')
            this.getExistsEsay()
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
        },
      onClickKoreksiOffline(id) {
          this.onWillKoreksi = id
          this.$bvModal.show('modal-koreksi-offline')
      },
      async downloadJawabanPeserta() {
          try {
            let provider = await this.getLinkExcelJawabanPeserta({
              banksoal: this.onWillKoreksi
            })
            window.open(provider.data, '_self')
          } catch (e) {
            this.$bvToast.toast(e.message, errorToas())
          }
      }
    },
    async created() {
        try {
            await this.getExistsEsay()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    },
    watch: {

    }
}
</script>
