<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <div>
              <router-link :to="{ name: 'banksoal.soal', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
              <a :href="baseURL+'/download/format-input-soal-pg.docx'" class="btn btn-primary btn-sm mr-1" download><i class="flaticon-download"></i> Download format PG</a>
              <a :href="baseURL+'/download/format-input-soal-esay.docx'" class="btn btn-primary btn-sm" download><i class="flaticon-download"></i> Download format Esay</a>
            </div>
            <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_soal_template_tabel')"><i class="flaticon-info"></i></button>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header bg-light">
                  <b>Soal</b>
                </div>
                <div class="card-body">
                  <ckeditor v-if="showEditor" v-model="editorData" :config="editorConfig" type="inline"></ckeditor>
                </div>
              </div>
                <div class="alert alert-info">Tekan <code>enter</code> pada akhir baris setelah gambar terload</div>
              </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-header bg-light">
                  <b>Setting soal</b>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label>Tipe soal</label>
                    <select class="form-control" v-model="tipe_soal">
                      <option value="1">Pilihan ganda</option>
                      <option value="2">Essai</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <b-button variant="primary" size="sm" :disabled="isLoading" @click.prevent="simpan">
            <b-spinner small type="grow" v-show="isLoading"></b-spinner>
            Simpan
          </b-button>
        </div>
      </div>
    </div>
    <b-modal id="modal-feature-info" size="lg">
      <template v-slot:modal-header="{ close }">
        <h5>Informasi Fitur</h5>
      </template>
      <template v-if="_is_feature_info">
        <div v-html="feature_info.content"></div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import store from '@/store'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
  created() {
    this.getBanksoalById(this.$route.params.banksoal_id)
  },
  data() {
    return {
      showEditor: false,
      editorData: '',
      editorConfig: {
        extraPlugins: 'sourcedialog',
        allowedContent: true,
        filebrowserUploadUrl: '/api/v1/file/upload?',
        fileTools_requestHeaders: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer '+store.state.token
        }
      },
      tipe_soal: 1
    }
  },
  computed: {
    ...mapGetters(['isLoading','baseURL']),
    ...mapState(['errors','token']),
    ...mapState('feature',['feature_info']),
    ...mapState('banksoal',{
      banksoal: state => state.banksoal
    }),
    _is_feature_info() {
      if(typeof this.feature_info != 'undefined') {
        return true
      }
      return false
    }
  },
  filters: {
    charIndex(i) {
      return String.fromCharCode(97 + i)
    }
  },
  methods: {
    ...mapActions('banksoal',['getBanksoalById','addPasteSoalBanksoal']),
    ...mapActions('feature', ['getFeatureInfo']),
    async simpan() {
      try {
        let provider = await this.addPasteSoalBanksoal({
          soal: this.editorData,
          banksoal_id: this.$route.params.banksoal_id,
          tipe_soal: this.tipe_soal
        })

        this.$bvToast.toast('Soal berhasil disimpan', successToas())
        this.editorData = ''
      } catch (error) {
        this.$bvToast.toast(error.message, errorToas())
      }
    },
    featureInfo(name) {
      this.getFeatureInfo(name)
      .then(() => {
        this.$bvModal.show('modal-feature-info')
      })
    }
  },
  watch: {
    banksoal(value) {
      this.editorConfig.filebrowserUploadUrl = this.baseURL+'/api/v1/file/upload?directory_id='+this.banksoal.directory_id
      this.showEditor = true
    }
  }
}
</script>
<style >
	div[contenteditable] {
    outline:1px solid #d8dbe0
}
</style>