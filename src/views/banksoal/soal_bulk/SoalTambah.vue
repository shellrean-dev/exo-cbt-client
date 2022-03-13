<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <div>
              <router-link class="btn btn-light btn-sm" :to="{ name: 'banksoal.soal', params: { 'banksoal_id' : $route.params.banksoal_id } }">Kembali</router-link>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div class="card-body" style="background-color: #fffef2" v-if="show_soal">
          <b-overlay
            id="overlay-background"
            :show="show_overlay"
            :variant="'light'"
            :opacity="0.5"
            :blur="'1rem'"
            rounded="sm"
          >
            <table class="table table-sm table-bordered bg-white"
            v-for="(soal, index) in questions"
            :key="'soal_index_'+index"
            >
              <!-- <tr>
                <td colspan="3">
                  <select class="form-control border-success-dashed-2" v-model="tipe_soals[index]">
                    <option
                    v-for="ops in opsTipeSoals"
                    :key="'option_tipe_soal_index_'+ops.k"
                    :value="ops.k">{{ ops.v }}</option>
                  </select>
                </td>
              </tr> -->
              <tr>
                <td width="50px" rowspan="5">
                  <h4 class="bg-info text-center">{{ index }}</h4>
                  <button class="btn btn-light btn-sm rounded-0 btn-block" @click="_removeSoal(index)">-</button>
                </td>
                <td colspan="2">
                  <ckeditor
                    type="inline"
                    v-model="questions[index]"
                    :key="'soal_text_index_'+index"
                    v-if="show_editor"
                    :config="editor_config"></ckeditor>
                </td>
              </tr>
              <tr v-for="opsi, i in pilihans[index]">
                <td width="60px">
                  <b-form-radio
                  :name="'correct_'+index"
                  :value="i"
                  v-model="corrects[index]"
                  size="md">
                    <span class="text-uppercase">{{ _charIndex(i) }}</span>
                  </b-form-radio>
                </td>
                <td>
                  <ckeditor type="inline"
                    v-model="pilihans[index][i]"
                    v-if="show_editor"
                    :key="'soal_text_options_index_'+index+'_'+i"
                    :config="editor_config"></ckeditor>
                </td>
              </tr>
            </table>
            <div class="bg-white">
              <b-button block variant="outline-primary" size="sm" @click="_tambahSoal">Tambah</b-button>
              <b-button block variant="primary" size="sm" @click="_sendSoal">Kirim & simpan</b-button>
            </div>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BOverlay } from 'bootstrap-vue';
import { mapState, mapActions } from 'vuex';
import { Notif } from '@/entities/notif';
export default {
  components: {
    BOverlay
  },
  data() {
    return {
      show_overlay: false,
      show_editor: true,
      show_soal: true,
      current_number: 1,
      questions: {
        "1": "<p></p>"
      },
      tipe_soals: {
        "1": 1
      },
      pilihans: {
        "1": ["<p></p>", "<p></p>", "<p></p>", "<p></p>"]
      },
      corrects: {
        "1": null
      },
      editor_config: {
        autoGrow_maxHeight: 600,
        extraPlugins: 'sourcedialog',
        allowedContent: true,
        filebrowserUploadUrl: this.$store.state.baseURL+'/api/v1/file/upload?',
        fileTools_requestHeaders: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer '+this.$store.state.token
        }
      },
      opsTipeSoals: [
        { k: 1, v: 'Pilihan ganda' },
        { k: 2, v: 'Essai' },
        { k: 4, v: 'Pilihan ganda kompleks' },
        { k: 5, v: 'Menjodohkan' },
        { k: 6, v: 'Isian singkat' },
        { k: 7, v: 'Mengurutkan' },
        { k: 8, v: 'Benar/salah' },
        { k: 9, v: 'Setuju/tidak' }
      ]
    }
  },
  methods: {
    ...mapActions('soal', ['sendSoalBulk']),
    _charIndex(i) {
      return String.fromCharCode(97 + i)
    },
    _tambahSoal() {
      this.show_soal = false
      const curr = this.current_number+1
      this.questions[curr.toString()] = "<p></p>"
      this.tipe_soals[curr.toString()] = 1
      this.pilihans[curr.toString()] = ["<p></p>", "<p></p>", "<p></p>", "<p></p>"]
      this.corrects[curr.toString()] = null
      this.current_number = curr
      this.show_soal = true
    },
    _removeSoal(index) {
      this.show_editor = false

      delete this.questions[index]
      delete this.tipe_soals[index]
      delete this.pilihans[index]
      delete this.corrects[index]

      this.show_editor = true
    },
    async _sendSoal() {
      let result = []
      for (const [key, value] of Object.entries(this.questions)) {
        let data = {}
        data.pertanyaan = value
        data.pilihan = []

        let correct = this.corrects[key]
        this.pilihans[key].forEach((pilihan, idx) => {
          let pil = {}
          pil.text = pilihan
          pil.is_correct = idx === correct
          data.pilihan.push(pil)
        })
        result.push(data)
      }
      
      try {
        this.show_overlay = true
        let network = await this.sendSoalBulk({
          soals: result,
          banksoal_id: this.$route.params.banksoal_id
        })
        this.$bvToast.toast('soal berhasil ditambah', Notif.success)
        this._initialDataSoal()
        this.$router.replace({ name: 'banksoal.soal', params: { 'banksoal_id' : this.$route.params.banksoal_id } })
      } catch (e) {
        this.$bvToast.toast(e.message, Notif.error)
      } finally {
        this.show_overlay = false
      }
    },
    _initialDataSoal() {
      this.current_number = 1,
      this.questions = {
        "1": "<p></p>"
      }
      this.tipe_soals = {
        "1": 1
      }
      this.pilihans = {
        "1": ["<p></p>", "<p></p>", "<p></p>", "<p></p>"]
      }
      this.corrects = {
        "1": null
      }
      
    }
  }
}
</script>

<style>
  .border-purple {
    border: 1px solid #00f;
  }
  div[contenteditable] {
    outline:2px dashed #348feb;
  }
  .border-success-dashed-2 {
    border: 2px dashed #07eb74
  }
</style>
