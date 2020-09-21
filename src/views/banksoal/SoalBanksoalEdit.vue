<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'banksoal.soal', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-light btn-sm">Kembali</router-link>
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
                                            <option value="3">Listening</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-if="direction == '' && tipe_soal == 3">
                                        <label>File direction</label>
                                        <div class="input-group">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" @change="handleFileUploadDirection">
                                                <label class="custom-file-label">{{ labelDirection ? labelDirection : 'Pilih File...' }}</label>
                                            </div>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button" @click="submitFileDirection">Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="direction != ''">
                                        <label>File direction</label>
                                        <div class="input-group">
                                            <audio-player :file="'/storage/audio/'+direction"></audio-player>
                                            <b-button size="sm" variant="danger" @click="removeDirection"><i class="cil-x"></i></b-button>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="audio == ''">
                                        <label>File audio</label>
                                        <div class="input-group">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" @change="handleFileUpload">
                                                <label class="custom-file-label">{{ labelAudio ? labelAudio : 'Pilih File...' }}</label>
                                            </div>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button" @click="submitFile">Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="audio != ''">
                                        <label>File audio</label>
                                        <div class="input-group">
                                            <audio-player :file="'/storage/audio/'+audio"></audio-player>
                                            <b-button size="sm" variant="danger" @click="removeAudio"><i class="cil-x"></i></b-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header bg-light">
                            <b>Pertanyaan</b>
                        </div>
                        <ckeditor v-model="question" v-if="showEditor" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="card" v-if="tipe_soal == 2">
                        <div class="card-header bg-light">
                            <b>Jawaban rujukan</b>
                        </div>
                        <ckeditor v-model="rujukan" v-if="showEditor" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="card" v-if="tipe_soal != 2">
                        <div class="card-header bg-light">
                            <b>Pilihan</b>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive-md">
                                <table class="table table-borderless">
                                    <tr v-for="(pilih, index) in pilihan">
                                        <td width="10px">
                                            <b-form-radio name="correct" size="lg" :value="index" v-model="correct"><span class="text-uppercase">{{ index | charIndex }}</span></b-form-radio>
                                        </td>
                                        <td>
                                            <ckeditor v-model="pilihan[index]" v-if="showEditor" :config="editorConfig"></ckeditor>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <b-button variant="primary" size="sm" :disabled="isLoading" @click.prevent="postSoalBanksoal">
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
import { successToas, errorToas} from '@/entities/notif'

import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import AudioPlayer from '@/components/AudioPlayer.vue'
export default {
  created() {
    this.getBanksoalById(this.$route.params.banksoal_id)
    this.getDataSoal()
  },
  components: {
    AudioPlayer
  },
  data() {
    return {
      showEditor: false,
      correct: '',
      question : '',
      rujukan : '',
      pilihan: [],
      jmlh_pilihan: '',
      jmlh_pilihan_listening: '',
      gambar_pilih: '',
      command: '',
      direktory: '',
      tipe_soal: 1,
      data_soal: '',
      audio: '',
      fileAudio: '',
      labelAudio: '',
      fileDirection: '',
      labelAudio: '',
      labelDirection: '',
      direction: '',
      label: '',
      image: '',
      editorConfig: {
        extraPlugins: 'sourcedialog',
        allowedContent: true,
        filebrowserUploadUrl: '/api/v1/file/upload?',
        fileTools_requestHeaders: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer '+store.state.token
        }
      },
    }
  },
  filters: {
        charIndex(i) {
            return String.fromCharCode(97 + i)
        }
    },
  computed: {
    ...mapGetters(['isLoading', 'baseURL']),
    ...mapState(['errors']),
    ...mapState('banksoal',{
      banksoal: state => state.banksoal
    }),
    ...mapState('filemedia', {
      contentDirectory: state => state.contentFilemedia,
      directories: state => state.directories.data
    }),
    page: {
      get() {
        return this.$store.state.filemedia.page
      },
      set(val) {
        this.$store.commit('filemedia/SET_PAGE', val)
      }
    }
  },
  methods: {
    ...mapActions('filemedia', ['getContentFilemedia','getDirectories','uploadFileAudio','addFilemedia']),
    ...mapActions('soal',['editSoalBanksoal']),
    ...mapActions('banksoal',['updateSoalBanksoal','getBanksoalById']),
    ...mapMutations(['CLEAR_ERRORS','SET_LOADING']),
    getDataSoal() {
      this.editSoalBanksoal(this.$route.params.soal_id)
      .then((response) => {
        this.question = response.data.pertanyaan
        this.rujukan = response.data.rujukan
        this.tipe_soal = response.data.tipe_soal
        this.data_soal = response.data.jawabans,
        this.audio = (response.data.audio != null ? response.data.audio : ''),
        this.direction = (response.data.direction != null ? response.data.direction : '')
      })
    },
    postSoalBanksoal() {
      if (this.correct == null) {
        this.$swal({
          title: 'Kunci jawaban kosong',
          text: "Pilih jawaban yang benar",
          type: 'warning',
        })
        return
      }
      else {
        this.SET_LOADING(true)
        let sender = []
        this.pilihan.forEach(function(item) {
          sender.push(item)
        })
        this.updateSoalBanksoal({
          id: this.$route.params.soal_id,
          data: {
            pertanyaan: this.question,
            banksoal_id: this.$route.params.banksoal_id,
            pilihan: sender,
            correct: this.correct,
            tipe_soal: this.tipe_soal,
            soal_id: this.$route.params.soal_id,
            audio: this.audio,
            rujukan: this.rujukan,
            direction: this.direction
          }
        })
        .then((data) => {
          this.$bvToast.toast('Soal berhasil disimpan.', successToas())
          this.SET_LOADING(false)
          this.$router.push({ name: 'banksoal.soal', params: {banksoal_id: this.$route.params.banksoal_id} })
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, errorToas())
        })
      }
    },
    onFileChange(e) {
      this.label = e.target.files[0].name
      this.image = e.target.files[0]
    },
    uploadFile() {
      let formData = new FormData()
      formData.append('directory_id', this.banksoal.directory_id)
      formData.append('image',this.image)
      this.addFilemedia(formData)
      .then(() => {
        this.getContentFilemedia(this.banksoal.directory_id),
        this.$bvToast.toast('File berhasil disimpan.', successToas())
      })
      .catch((error) => {
        this.$bvToast.toast(error.message, errorToas())
      })
    },
    clearForm() {
      this.question.setContent(''),
      this.rujukan.setContent(''),
      this.correct = '',
      this.pilihan.forEach(function(item, index) {
        this.pilihan[index] = ''
      })
    },
    initEditor() {
      this.pilihan = []
      this.data_soal.forEach((item,index) => {
        let pilihan = item.text_jawaban
        if(item.correct == "1") {
          this.correct = index
        }
        this.pilihan.push(pilihan)
      })
    },
    showImagePrompt(command) {
      this.$bvModal.show('modal-scoped')
      this.command = command
    },
    onSelectImage(e) {

    },
    pilihGambar(index) {
      const gambar = this.contentDirectory.data[index]
      this.gambar_pilih = this.baseURL+'/storage/'+gambar.dirname+'/'+gambar.filename
    },
    masukGambar() {
      const command = this.command
      const src = this.gambar_pilih
      command({ src })
    },
    getContentFile() {
      if(this.direktory != '') {
        this.getContentFilemedia(this.direktory)
      }
    },
    handleFileUpload(e) {
      this.labelAudio = e.target.files[0].name
      this.fileAudio = e.target.files[0];
    },
    handleFileUploadDirection(e) {
      this.labelDirection = e.target.files[0].name
      this.fileDirection = e.target.files[0];
    },
    submitFile(){
      let formData = new FormData();
      formData.append('file', this.fileAudio);
      this.uploadFileAudio(formData)
      .then((res) => {
        this.audio = res.data
        this.fileAudio = ''
        this.labelAudio = ''
      })
    },
    submitFileDirection(){
      let formData = new FormData();
      formData.append('file', this.fileDirection);
      this.uploadFileAudio(formData)
      .then((res) => {
        this.direction = res.data
        this.fileDirection = ''
        this.labelDirection = ''
      })
    },
    removeAudio() {
      this.audio = ''
    },
    removeDirection() {
      this.direction = ''
    }
  },
  watch: {
    banksoal(val) {
      this.jmlh_pilihan = val.jumlah_pilihan
      this.jmlh_pilihan_listening = val.jumlah_pilihan_listening
      this.getContentFilemedia(val.directory_id)
      this.showEditor = true
    },
    data_soal() {
      this.initEditor()
    },
    direktory(val) {
      if(val != '') {
        this.getContentFilemedia(val)
        this.getContentFilemedia(val.directory_id)
        this.editorConfig.filebrowserUploadUrl = this.baseURL+'/api/v1/file/upload?directory_id='+this.banksoal.directory_id
        this.showEditor = true
      }
    },
    page() {
      this.getContentFilemedia(this.banksoal.directory_id)
    },
    tipe_soal() {
      this.initEditor()
    }
  }
}
</script>