<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'banksoal.soal', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
          <a :href="baseURL+'/download/format-input-soal-pg.docx'" class="btn btn-primary btn-sm mr-1" download>Download format PG</a>
          <a :href="baseURL+'/download/format-input-soal-esay.docx'" class="btn btn-primary btn-sm" download>Download format Esay</a>        
        </div>
        <div class="card-body">
            <div class="card">
              <div class="card-header">
                <b>Setting soal</b>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
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
          <div class="card">
            <div class="card-header">
              <b>Soal</b>
            </div>
            <ckeditor v-if="showEditor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
            <div class="alert alert-info">Tekan <code>enter</code> pada akhir baris setelah gambar terload</div>
        </div>
        <div class="card-footer">
          <b-button variant="primary" size="sm" :disabled="isLoading" @click.prevent="simpan">
            <b-spinner small type="grow" v-show="isLoading"></b-spinner>
            Simpan
          </b-button>
        </div>
      </div>
    </div>
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
        filebrowserUploadUrl: process.env.VUE_APP_API_SERVER+'/api/v1/file/upload?',
        fileTools_requestHeaders: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer '+store.state.token
        }
      },
      tipe_soal: 1,
      baseURL: process.env.VUE_APP_API_SERVER,
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState(['errors','token']),
    ...mapState('banksoal',{
      banksoal: state => state.banksoal
    })
  },
  filters: {
    charIndex(i) {
      return String.fromCharCode(97 + i)
    }
  },
  methods: {
    ...mapActions('banksoal',['getBanksoalById','addPasteSoalBanksoal']),
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
    }
  },
  watch: {
    banksoal(value) {
      this.editorConfig.filebrowserUploadUrl = process.env.VUE_APP_API_SERVER+'/api/v1/file/upload?directory_id='+this.banksoal.directory_id
      this.showEditor = true
    }
  }
}
</script>