<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-light btn-sm"
                       :to="{ name: 'banksoal.soal', params: { 'banksoal_id' : $route.params.banksoal_id } }">Kembali</router-link>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <div class="card border-purple">
                <div class="card-header bg-white">
                  <b><i class="flaticon2-sheet"></i> Pertanyaan</b>
                </div>
                <div class="card-body">
                  <ckeditor
                    type="inline"
                    v-model="question"
                    v-if="showEditor"
                    :config="editorConfig"></ckeditor>
                </div>
              </div>
              <div class="card border-purple"
                   v-if="[2].includes(parseInt(tipe_soal))">
                <div class="card-header bg-white">
                  <b><i class="flaticon2-paper"></i> Jawaban rujukan</b>
                </div>
                <div class="card-body">
                  <ckeditor
                    type="inline"
                    v-model="rujukan"
                    v-if="showEditor"
                    :config="editorConfig"></ckeditor>
                </div>
              </div>
              <div class="card border-purple"
                   v-if="[1, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(tipe_soal))">
                <div class="card-header bg-white">
                  <b v-if="[1,3,4,5].includes(parseInt(tipe_soal))"><i class="flaticon-signs-1"></i> Pilihan</b>
                  <b v-if="[6].includes(parseInt(tipe_soal))"><i class="flaticon-signs-1"></i> Jawaban</b>
                  <b v-if="[7].includes(parseInt(tipe_soal))"><i class="flaticon-signs-1"></i> Urutan</b>
                  <b v-if="[8].includes(parseInt(tipe_soal))"><i class="flaticon-signs-1"></i> Benar/Salah</b>
                  <b v-if="[9].includes(parseInt(tipe_soal))"><i class="flaticon-signs-1"></i> Argumen</b>
                </div>
                <div class="card-body">
                  <div class="table-responsive-md">
                    <table class="table table-borderless" v-if="show_opsi">
                      <template v-if="[1,2,3,4].includes(parseInt(tipe_soal))">
                        <tr v-for="(_, index) in pilihan"
                            :key="'opsi_dari_tipe_soal_index_'+index">
                          <td width="10px" v-if="[1,2,3,4].includes(parseInt(tipe_soal))">
                            <b-form-radio
                              name="correct"
                              size="md"
                              :value="index"
                              v-model="correct"
                              v-if="[1,3].includes(parseInt(tipe_soal))">
                              <span class="text-uppercase">{{ _charIndex(index) }}</span>
                            </b-form-radio>
                            <div class="form-check" v-if="4 == parseInt(tipe_soal)">
                              <input
                                :checked="selected.includes(index)"
                                :value="index"
                                type="checkbox"
                                class="form-check-input"
                                @change="_changeCheckbox($event, index)">
                              <label class="form-check-label">
                                <span class="text-uppercase">{{ _charIndex(index) }}</span>
                              </label>
                            </div>
                          </td>
                          <td>
                            <transition name="fade">
                              <ckeditor type="inline"
                                        v-model="pilihan[index]"
                                        v-if="showEditor"
                                        :config="editorConfig"></ckeditor>
                            </transition>
                          </td>
                          <td width="60px">
                            <button
                              v-if="pilihan.length > 2"
                              class="btn btn-sm btn-light rounded-0"
                              title="Hapus pilihan"
                              @click="_removeOpsi(index)">
                              <i class="flaticon-circle"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <template v-if="tipe_soal == 5">
                        <tr v-for="(pilih, index) in pairs"
                            :key="'soal_menjodohkan_ops_index_'+index">
                          <td>
                            <transition name="fade">
                              <ckeditor
                                v-model="pairs[index]['a']"
                                v-if="showEditor"
                                :config="editorConfig"
                                type="inline"></ckeditor>
                            </transition>
                          </td>
                          <td>
                            <transition name="fade">
                              <ckeditor
                                v-model="pairs[index]['b']"
                                v-if="showEditor"
                                :config="editorConfig"
                                type="inline"></ckeditor>
                            </transition>
                          </td>
                          <td width="60px">
                            <button
                              v-if="pairs.length > 2"
                              class="btn btn-sm btn-light rounded-0"
                              title="Hapus pilihan"
                              @click="_removeOpsi(index)">
                              <i class="flaticon-circle"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <template v-if="tipe_soal == 6">
                        <tr>
                          <td colspan="2">
                            <b-form-checkbox
                              v-model="case_sensitive"
                              value="1"
                              switch>{{ case_sensitive == '1' ? 'Case Sensitive' : 'Tidak Case-Sensitive' }}</b-form-checkbox>
                          </td>
                        </tr>
                        <tr v-for="(pilih, index) in options"
                            :key="'soal_isian_singkat_ops_index_'+index">
                          <td>
                            <transition name="fade">
                              <ckeditor
                                v-model="options[index]"
                                v-if="showEditor"
                                :config="editorConfig"
                                type="inline"></ckeditor>
                            </transition>
                          </td>
                          <td width="60px">
                            <button
                              v-if="options.length > 1"
                              class="btn btn-sm btn-light rounded-0"
                              title="Hapus pilihan"
                              @click="_removeOpsi(index)">
                              <i class="flaticon-circle"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <template v-if="tipe_soal == 7">
                        <tr v-for="(pilih, index) in options"
                            :key="'soal_isian_mengurutkan_ops_index_'+index">
                          <td width="20">
                            &#8595;
                          </td>
                          <td>
                            <transition name="fade">
                              <ckeditor
                                v-model="options[index]"
                                v-if="showEditor"
                                :config="editorConfig"
                                type="inline"></ckeditor>
                            </transition>
                          </td>
                          <td width="60px">
                            <button
                              v-if="options.length > 1"
                              class="btn btn-sm btn-light rounded-0"
                              title="Hapus pilihan"
                              @click="_removeOpsi(index)">
                              <i class="flaticon-circle"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <template v-if="tipe_soal == 8">
                        <tr v-for="(_, index) in pilihan"
                            :key="'opsi_dari_tipe_soal_index_'+index">
                          <td width="10px">
                            <div class="form-check">
                              <input
                                :checked="selected.includes(index)"
                                :value="index"
                                type="checkbox"
                                class="form-check-input"
                                @change="_changeCheckbox($event, index)">
                              <label class="form-check-label">
                                <span class="text-uppercase">Benar</span>
                              </label>
                            </div>
                          </td>
                          <td>
                            <transition name="fade">
                              <ckeditor type="inline"
                                        v-model="pilihan[index]"
                                        v-if="showEditor"
                                        :config="editorConfig"></ckeditor>
                            </transition>
                          </td>
                          <td width="60px">
                            <button
                              v-if="pilihan.length > 2"
                              class="btn btn-sm btn-light rounded-0"
                              title="Hapus pilihan"
                              @click="_removeOpsi(index)">
                              <i class="flaticon-circle"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <template v-if="tipe_soal == 9">
                        <tr v-for="(pilih, index) in options"
                            :key="'soal_isian_setuju_tidak_ops_index_'+index">
                          <td>
                            <transition name="fade">
                              <ckeditor
                                v-model="options[index]"
                                v-if="showEditor"
                                :config="editorConfig"
                                type="inline"></ckeditor>
                            </transition>
                          </td>
                          <td width="60px">
                            <button
                              v-if="options.length > 1"
                              class="btn btn-sm btn-light rounded-0"
                              title="Hapus pilihan"
                              @click="_removeOpsi(index)">
                              <i class="flaticon-circle"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <tr>
                        <td colspan="3">
                          <button
                            class="btn btn-sm btn-outline-primary rounded-0"
                            title="Tambah pilihan"
                            @click="_addOpsi">
                            <i class="flaticon-add"></i> tambah
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-purple">
                <div class="card-header bg-white">
                  <b><i class="flaticon-settings-1"></i> Setting soal</b>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label>Tipe soal</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <label class="input-group-text"><i class="flaticon2-layers"></i></label>
                      </div>
                      <select class="form-control" v-model="tipe_soal">
                        <option
                          v-for="ops in opsTipeSoals"
                          :key="'option_tipe_soal_index_'+ops.k"
                          :value="ops.k">{{ ops.v }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group" v-if="_isDirectionEmpty()">
                    <label>File direction</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="flaticon-sound"></i></span>
                      </div>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input"
                               @change="_handleFileUploadDirection">
                        <label class="custom-file-label">{{ labelDirection ? labelDirection : 'Pilih File...' }}</label>
                      </div>
                      <div class="input-group-append">
                        <button class="btn btn-primary" type="button"
                                :disabled="isLoading"
                                @click="_submitFileDirection">Upload</button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" v-if="audio == ''">
                    <label>File audio</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="flaticon-sound"></i></span>
                      </div>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input"
                               @change="_handleFileUpload">
                        <label class="custom-file-label">{{ labelAudio ? labelAudio : 'Pilih File...' }}</label>
                      </div>
                      <div class="input-group-append">
                        <button class="btn btn-primary" type="button"
                                :disabled="isLoading"
                                @click="_submitFile">Upload</button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" v-if="direction != ''">
                    <label>File direction</label>
                    <div class="input-group">
                      <audio-player :file="baseURL+'/storage/audio/'+direction"></audio-player>
                      <b-button size="sm" variant="danger" class="btn-icon"
                                @click="_removeDirection"><i class="flaticon-circle"></i></b-button>
                    </div>
                  </div>
                  <div class="form-group" v-if="audio != ''">
                    <label>File audio</label>
                    <div class="input-group">
                      <audio-player :file="baseURL+'/storage/audio/'+audio"></audio-player>
                      <b-button size="sm" variant="danger" class="btn-icon"
                                @click="_removeAudio"><i class="flaticon-circle"></i></b-button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Tipe layout</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <label class="input-group-text"><i class="flaticon2-layers"></i></label>
                      </div>
                      <select class="form-control" v-model="layout">
                        <option value="1">Jawaban kebawah</option>
                        <option value="2">Jawaban 2 kolom (3x2)</option>
                        <option value="3">Jawaban kebawah (tabel)</option>
                        <option value="4">Soal kiri jawaban kanan</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <img style="max-width:200px;" src="/img/layout/l-1.svg" v-show="layout == 1" />
                    <img style="max-width:200px;" src="/img/layout/l-2.svg" v-show="layout == 2" />
                    <img style="max-width:200px;" src="/img/layout/l-3.svg" v-show="layout == 3" />
                    <img style="max-width:200px;" src="/img/layout/l-4.svg" v-show="layout == 4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="alert alert-warning">
            <strong>Warning</strong><br>
            <span>Sangat tidak disarankan untuk mengubah soal pada banksoal ketika sudah/sedang digunakan pada ujian, bisa menyebabkan gagal pada analisa dan penilaian. gunakan fitur duplikat akan lebih disarankan.</span>
          </div>
          <b-button
            variant="primary"
            size="sm"
            :disabled="isLoading"
            @click.prevent="_postSoalBanksoal">
            <b-spinner small type="grow" v-show="isLoading"></b-spinner>
            Simpan
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import AudioPlayer from '@/components/AudioPlayer.vue'
import { successToas, errorToas} from '@/entities/notif'

export default {
  name: "SoalEdit",
  components: {
    AudioPlayer
  },
  data() {
    return {
      opsTipeSoals: [
        { k: 1, v: 'Pilihan ganda' },
        { k: 2, v: 'Essai' },
        { k: 3, v: 'Listening' },
        { k: 4, v: 'Pilihan ganda kompleks' },
        { k: 5, v: 'Menjodohkan' },
        { k: 6, v: 'Isian singkat' },
        { k: 7, v: 'Mengurutkan' },
        { k: 8, v: 'Benar/salah' },
        { k: 9, v: 'Setuju/tidak' },
      ],
      showEditor: false,
      correct: '',
      question : '',
      rujukan : '',
      selected: [],
      pilihan: [],
      options: [],
      pairs: [],
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
      labelDirection: '',
      direction: '',
      label: '',
      image: '',
      show_opsi: true,
      layout: 1,
      editorConfig: {
        extraPlugins: 'sourcedialog',
        allowedContent: true,
        filebrowserUploadUrl: this.$store.state.baseURL+'/api/v1/file/upload?',
        fileTools_requestHeaders: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer '+this.$store.state.token
        }
      },
      case_sensitive: '1'
    }
  },
  computed: {
    ...mapGetters(['isLoading','baseURL']),
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
    ...mapActions('filemedia', ['getContentFilemedia','getDirectories','uploadFileAudio','getDirectory','addFilemedia']),
    ...mapActions('banksoal',['updateSoalBanksoal','getBanksoalById']),
    ...mapActions('soal', ['editSoalBanksoal']),
    ...mapMutations(['CLEAR_ERRORS','SET_LOADING']),
    async _upload(file) {
      let formData = new FormData();
      formData.append('image', file);
      formData.append('directory_id', this.banksoal.directory_id)
      const response = await $axios.post('directory/filemedia', formData);
      return this.baseURL+'/storage/'+response.data.data.dirname+'/'+response.data.data.filename
    },
    _isDirectionEmpty() {
      return (this.direction == '' && this.tipe_soal == 3);
    },
    _handleFileUploadDirection(e) {
      this.labelDirection = e.target.files[0].name
      this.fileDirection = e.target.files[0];
    },
    _submitFileDirection() {
      let formData = new FormData();
      formData.append('file', this.fileDirection);
      this.uploadFileAudio(formData)
        .then((res) => {
          this.direction = res.data
          this.fileDirection = ''
          this.labelDirection = ''
        })
    },
    _handleFileUpload(e) {
      this.labelAudio = e.target.files[0].name
      this.fileAudio = e.target.files[0];
    },
    _submitFile(e) {
      let formData = new FormData();
      formData.append('file', this.fileAudio);
      this.uploadFileAudio(formData)
        .then((res) => {
          this.audio = res.data
          this.fileAudio = ''
          this.labelAudio = ''
        })
    },
    _removeDirection() {
      this.direction = ''
    },
    _removeAudio() {
      this.audio = ''
    },
    _charIndex(i) {
      return String.fromCharCode(97 + i)
    },
    _changeCheckbox(e, index) {
      if (e.target.checked === false) {
        if (index !== -1) {
          this.selected.splice(index, 1)
        }
      } else {
        this.selected.push(parseInt(e.target.value))
      }
    },
    _uploadFile() {
      let formData = new FormData()
      formData.append('directory_id', this.banksoal.directory_id)
      formData.append('image',this.image)
      this.addFilemedia(formData)
        .then((resp) => {
          this.getContentFilemedia(this.banksoal.directory_id)
          this.$bvToast.toast('Filemedia berhasil ditambahkan.', successToas())
        })
        .catch((err) => {
          this.$bvToast.toast('Terjadi kesalahan saat upload file', errorToas())
        })
    },
    _addOpsi() {
      if ([1,3,4].includes(parseInt(this.tipe_soal))) {
        this.pilihan.push("")
        this.show_opsi = false
        this.show_opsi = true
      } else if (this.tipe_soal == 5) {
        let pair = {"a": "", "b": ""}
        this.pairs.push(pair)
      } else if (this.tipe_soal == 6) {
        this.options.push("")
      } else if (this.tipe_soal == 7) {
        this.options.push("")
      } else if (this.tipe_soal == 8) {
        this.pilihan.push("")
      } else if (this.tipe_soal == 9) {
        this.options.push("")
      }
    },
    _clearForm() {
      this.question = ''
      this.rujukan = ''
      this.correct = ''
      this.audio = ''
      this.labelAudio = ''
      this.fileAudio = ''
      this.direction = ''
      this.labelDirection = ''
      this.fileAudio = ''
      this.selected = []
    },
    _initEditor() {
      this.pilihan = []
      this.pairs = []
      this.options = []

      this.data_soal.forEach((item,index) => {
        if ([1,3,4].includes(parseInt(this.tipe_soal))) {
          let pilihan = item.text_jawaban
          if(item.correct == "1") {
            this.correct = index
          }
          this.pilihan.push(pilihan)
        } else if(this.tipe_soal == 5) {
          let pair = JSON.parse(item.text_jawaban)
          this.pairs.push({"a": pair['a'].text, "b": pair['b'].text})
        } else if(this.tipe_soal == 6) {
          this.options.push(item.text_jawaban)
        } else if (this.tipe_soal == 7) {
          this.options.push(item.text_jawaban)
        } else if (this.tipe_soal == 8) {
          let pilihan = item.text_jawaban
          if(item.correct == "1") {
            this.correct = index
          }
          this.pilihan.push(pilihan)
        } else if (this.tipe_soal == 9) {
          this.options.push(item.text_jawaban)
        }
      })
    },
    async _removeOpsi(index){
      if ([1,3,4,8].includes(parseInt(this.tipe_soal))) {
        this.show_opsi = false
        const newdata = [...this.pilihan]
        await newdata.splice(index,1)
        this.pilihan = []
        await this.pilihan.push(...newdata)
        if(parseInt(this.tipe_soal) === 4) {
          let idx = this.selected.indexOf(index)
          if(idx > -1) {
            this.selected.splice(idx, 1)
          }
          this.selected = this.selected.map((item) => {
            if (item > index) {
              return item-1
            }
            return item
          })
        }
        this.show_opsi = true
      } else if(this.tipe_soal == 5) {
        this.show_opsi = false
        const newdata = [...this.pairs]
        await newdata.splice(index,1)
        this.pairs = []
        await this.pairs.push(...newdata)

        this.show_opsi = true
      } else if(this.tipe_soal == 6) {
        this.show_opsi = false
        const newdata = [...this.options]
        await newdata.splice(index,1)
        this.options = []
        await this.options.push(...newdata)

        this.show_opsi = true
      } else if(this.tipe_soal == 7) {
        this.show_opsi = false
        const newdata = [...this.options]
        await newdata.splice(index,1)
        this.options = []
        await this.options.push(...newdata)

        this.show_opsi = true
      } else if(this.tipe_soal == 9) {
        this.show_opsi = false
        const newdata = [...this.options]
        await newdata.splice(index,1)
        this.options = []
        await this.options.push(...newdata)

        this.show_opsi = true
      }
    },
    _postSoalBanksoal(e) {
      if (this.correct === '' && [1,3].includes(parseInt(this.tipe_soal))) {
        this.$swal({
          title: 'Kunci jawaban kosong',
          text: "Pilih jawaban yang benar",
          icon: 'error',
        })
        return false;
      } else if (this.selected.length === 0 && parseInt(this.tipe_soal) === 4) {
        this.$swal({
          title: 'Checkbox jawaban kosong',
          text: "Pilih checkbox setidaknya 1 yang benar",
          icon: 'error',
        })
        return false;
      } else {
        this.SET_LOADING(true)
        let sender = []
        if ([1, 3, 4, 8].includes(parseInt(this.tipe_soal))) {
          this.pilihan.forEach(function (item) {
            sender.push(item)
          })
        } else if (this.tipe_soal == 5) {
          this.pairs.forEach(function (item) {
            sender.push(item)
          })
        } else if (this.tipe_soal == 6) {
          this.options.forEach(function (item) {
            sender.push(item)
          })
        } else if (this.tipe_soal == 7) {
          this.options.forEach(function (item) {
            sender.push(item)
          })
        } else if (this.tipe_soal == 9) {
          this.options.forEach(function (item) {
            sender.push(item)
          })
        }
        this.updateSoalBanksoal({
          id: this.$route.params.soal_id,
          data: {
            pertanyaan: this.question,
            rujukan: this.rujukan,
            banksoal_id: this.$route.params.banksoal_id,
            pilihan: sender,
            correct: this.correct,
            selected: this.selected,
            tipe_soal: this.tipe_soal,
            soal_id: this.$route.params.soal_id,
            audio: this.audio,
            direction: this.direction,
            layout: this.layout,
            case_sensitive: this.case_sensitive
          }
        }).then((data) => {
          this.$bvToast.toast('Soal berhasil disimpan.', successToas())
          this.SET_LOADING(false)
          this.$router.push({ name: 'banksoal.soal', params: {banksoal_id: this.$route.params.banksoal_id} })
        }).catch((error) => {
          this.$bvToast.toast(error.message, errorToas())
        })
      }
    },
    _getDataSoal() {
      this.editSoalBanksoal(this.$route.params.soal_id)
        .then((response) => {
          this.question = response.data.pertanyaan
          this.rujukan = response.data.rujukan
          this.tipe_soal = response.data.tipe_soal
          this.data_soal = response.data.jawabans
          this.audio = (response.data.audio != null ? response.data.audio : '')
          this.direction = (response.data.direction != null ? response.data.direction : '')
          this.layout = response.data.layout
          this.case_sensitive = response.data.case_sensitive
          if([4,8].includes(this.tipe_soal)) {
            response.data.jawabans.map((item, index) => {
              if(item.correct == "1") {
                this.selected.push(index)
              }
            })
          }
        })
    }
  },
  created() {
    this.getBanksoalById(this.$route.params.banksoal_id)
    this._getDataSoal()
  },
  watch: {
    banksoal(val) {
      this.jmlh_pilihan = val.jumlah_pilihan
      this.jmlh_pilihan_listening = val.jumlah_pilihan_listening
      this.getContentFilemedia(val.directory_id)
      this.showEditor = true
    },
    data_soal() {
      this._initEditor()
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
      this._initEditor()
    }
  }
}
</script>

<style>
.border-purple {
  border: 1px solid #00f;
}
div[contenteditable] {
  outline:1px solid #d8dbe0;
}
</style>
