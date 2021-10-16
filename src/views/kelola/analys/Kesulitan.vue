<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'kelola.analys.banksoal' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
          <button
            class="btn float-right btn-primary btn-sm mx-1"
            @click="print"
            :disabled="isLoading"><i class="flaticon2-print"></i> Cetak analisis banksoal</button>
        </div>
        <div class="card-body back" id="printSoal">
          <div v-if="banksoal" class="">
            <div class="text-center mb-4">
              <h3 class="text-center">ANALISIS BANKSOAL</h3>
              <p>PADA SEMUA HASIL UJIAN YANG DISELENGGARAKAN</p>
            </div>
            <hr>
            <table class="table table-sm table-borderless h6">
              <tr>
                <td width="200px">Kode Banksoal</td>
                <td>: {{ banksoal.kode_banksoal }}</td>
              </tr>
              <tr>
                <td>Mata Pelajaran</td>
                <td>: {{ banksoal.matpel.nama }}</td>
              </tr>
            </table>
            <hr>
          </div>
          <div class="paper">
            <div class="table-responsive-md">
              <template
                v-for="(soal, index) in analys"
              >
                <table class="table table-sm table-mx table-borderless">
                  <tr>
                    <td width="20px"><strong>{{ index+1 }}.</strong></td>
                    <td v-html="soal.soal" class="img-non"></td>
                  </tr>
                  <tr v-for="jawaban in soal.jawaban" :key="jawaban.id">
                    <template v-if="[1,4].includes(soal.tipe_soal)">
                      <td width="20px">
                        <span class="text-danger" v-show="jawaban.iscorrect == 0">&hearts;</span>
                        <span class="text-success" v-show="jawaban.iscorrect == 1">&hearts;</span>
                      </td>
                      <td>
                        <div class="py-1 px-2 border">
                          <div v-html="jawaban.text"></div>
                        </div>
                        <b-badge
                          v-if="soal.tipe_soal == 1"
                          variant="outline-primary"
                          class="border-dark border-top border-right border-bottom border-light"><strong>{{jawaban.penjawab}} peserta</strong></b-badge>
                      </td>
                    </template>
                    <template v-if="[6].includes(soal.tipe_soal)">
                      <td width="20px">
                        <span class="text-success">&hearts;</span>
                      </td>
                      <td>
                        <div class="py-1 px-2 border">
                          <div v-html="jawaban.text"></div>
                        </div>
                      </td>
                    </template>
                    <template v-if="[5].includes(soal.tipe_soal)">
                      <td width="20px">
                        <span class="text-success">&harr;</span>
                      </td>
                      <td>
                        <div class="d-flex w-100">
                          <div class="px-2 py-1 border w-50"
                            v-html="parseJson(jawaban.text).a.text">
                          </div>
                          <div class="px-2 py-1 border w-50"
                            v-html="parseJson(jawaban.text).b.text">
                          </div>
                        </div>
                      </td>
                    </template>
                    <template v-if="[7].includes(soal.tipe_soal)">
                      <td width="20px">
                        <span class="text-success">&darr;</span>
                      </td>
                      <td>
                        <div class="px-2 py-1 border">
                          <div v-html="jawaban.text"></div>
                        </div>
                      </td>
                    </template>
                    <template v-if="[9].includes(soal.tipe_soal)">
                      <td width="20px">
                        <span class="text-success">&#10077;</span>
                      </td>
                      <td>
                        <div class="px-2 py-1 border">
                          <div v-html="jawaban.text">
                          </div>
                          <div>
                            Setuju: {{jawaban.argument.setuju}}<br>
                            Tidak: {{jawaban.argument.tidak}}
                          </div>
                        </div>
                      </td>
                    </template>
                  </tr>
                </table>
                <table class="table table-sm table-borderless">
                  <tr>
                    <td width="20px"></td>
                    <td><strong>Tipe</strong></td>
                    <td>{{ tipeSoal(soal.tipe_soal) }}</td>
                  </tr>
                  <template v-if="[1,3,4,5,6,7,8].includes(soal.tipe_soal)">
                    <tr>
                      <td width="20px"></td>
                      <td><strong>Benar</strong></td>
                      <td>{{ soal.benar }} peserta</td>
                    </tr>
                    <tr>
                      <td width="20px"></td>
                      <td><strong>Salah</strong></td>
                      <td>{{ soal.salah }} peserta</td>
                    </tr>
                  </template>
                  <tr>
                    <td width="20px"></td>
                    <td><strong>Soal dijawab oleh</strong></td>
                    <td>{{ soal.penjawab }} peserta</td>
                  </tr>
                </table>
                <b-progress class="mt-2" :max="soal.penjawab" show-value>
                  <template v-if="[1,3,4,5,6,7,8].includes(soal.tipe_soal)">
                    <b-progress-bar :value="soal.benar" label="Mudah" variant="success"></b-progress-bar>
                    <b-progress-bar :value="soal.salah" label="Sulit" variant="danger"></b-progress-bar>
                  </template>
                  <template v-else>
                    <b-progress-bar :value="100" label="Tingkatan tidak bisa diukur" variant="warning"></b-progress-bar>
                  </template>
                </b-progress>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { errorToas} from '@/entities/notif'

export default {
  name: 'SoalBanksoal',
  components: {
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState('banksoal',{
      analys: state => state.analys,
      banksoal: state => state.banksoal,
    })
  },
  filters: {
    charIndex(i) {
      return String.fromCharCode(97 + i)
    }
  },
  methods: {
    ...mapActions('banksoal',['getAllSoalAnalys','getBanksoalById']),
    print() {
      this.$htmlToPaper('printSoal');
    },
    parseJson(text) {
      return JSON.parse(text)
    },
    tipeSoal(i) {
      let index = ['Pilihan ganda','Esay','Listening', 'Pilihan ganda kompleks', 'Menjodohkan', 'Isian singkat', 'Mengurutkan', 'Benar/Salah', 'Setuju/tidak']
      return index[i-1]
    }
  },
  async created() {
    try {
      this.$store.commit('LOADING_PAGE', true)
      await this.getAllSoalAnalys(this.$route.params.banksoal)
      await this.getBanksoalById(this.$route.params.banksoal)
      this.$store.commit('LOADING_PAGE', false)
    } catch (error) {
      this.$store.commit('LOADING_PAGE', false)
      this.$bvToast.toast(error.message, errorToas())
    }
  }
}
</script>

<style>
@media print {
  footer {page-break-after: always; }
  @page {
    size: A4;
    margin-bottom:60px;
    margin-top:40px;
    margin-left: 40px;
    margin-right: 40px;
  }
}
.table {
  page-break-after: always !important;
}

.hide {
  display: none;
}
p {
  margin: 0;
  padding: 0;
}
.img-non img {
  padding: 4px;
  border: 1px solid #b8b7b7;
  box-sizing: border-box;
  border-radius: 10px;
}
</style>
