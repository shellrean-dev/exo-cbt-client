<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'kelola.hasil.ujian' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
          <button
            class="btn float-right btn-primary btn-sm mx-1"
            @click="print"
            :disabled="isLoading"><i class="flaticon2-print"></i> Cetak rincian jawaban</button>
        </div>
        <div class="card-body back" id="printDetailJawaban">
          <div class="hide" v-if="jawaban && jawaban.length > 0">
            <div class="text-center mb-5">
              <h3 class="text-center">RINCIAN JAWABAN PESERTA</h3>
              <p>PADA UJIAN YANG DISELENGGARAKAN</p>
            </div>
            <hr>
            <table class="table table-sm table-borderless h5">
              <tr>
                <td width="200px">No Ujian</td>
                <td>: {{ jawaban[0].peserta_no_ujian }}</td>
              </tr>
              <tr>
                <td>Nama Peserta</td>
                <td>: {{ jawaban[0].peserta_nama }}</td>
              </tr>
            </table>
            <hr>
          </div>
          <div class="paper">
            <div class="table-responsive-md">
              <template
                v-for="(jawab, index) in jawaban"
              >
                <table class="table table-sm table-mx table-borderless">
                  <tr>
                    <td width="20px">
                      <strong v-show="jawab.iscorrect == '1'">{{ index+1 }}.</strong>
                      <strong v-show="jawab.iscorrect == '0'" style="text-decoration: line-through; text-decoration-color: red">{{ index+1 }}.</strong>
                    </td>
                    <td v-html="jawab.soal.pertanyaan" class="img-non"></td>
                  </tr>
                  <tr v-for="(opsi, index) in jawab.soal.jawabans" :key="opsi.id">
                    <template v-if="[1,4].includes(jawab.soal.tipe_soal)">
                      <td>
                      </td>
                      <td>
                        <div class="py-1 px-2 border">
                          <div v-html="opsi.text_jawaban"></div>
                          <span
                            class="py-1 px-2 border border-warning rounded text-xs"
                            v-show="opsi.correct == '1'"><strong>Kunci jawaban</strong></span>
                          <span
                            class="py-1 px-2 border border-success rounded text-xs"
                            v-show="opsi.id == jawab.jawab || jawab.jawab_complex.includes(opsi.id)"><strong>Jawaban peserta</strong></span>
                        </div>
                      </td>
                    </template>
                    <template v-if="[7].includes(jawab.soal.tipe_soal)">
                      <td>
                      </td>
                      <td>
                        <div class="px-2 py-1 border">
                          <div v-html="opsi.text_jawaban"></div>
                        </div>
                        <div class="px-2 py-1 border" :style="opsi.id == jawab.mengurutkan[index] ? '' : 'text-decoration: line-through; text-decoration-color: red'">
                          <div v-html="findUrutan(jawab.soal.jawabans, jawab.mengurutkan[index]).text_jawaban"></div>
                        </div>
                      </td>
                    </template>
                    <template v-if="[5].includes(jawab.soal.tipe_soal)">
                      <td>
                      </td>
                      <td>
                        <div class="d-flex">
                          <div class="px-2 py-1 border"
                               v-html="parseJson(opsi.text_jawaban).a.text">
                          </div>
                          <div class="px-2 py-1 border"
                               v-html="parseJson(opsi.text_jawaban).b.text">
                          </div>
                        </div>
                      </td>
                    </template>
                  </tr>
                  <template v-if="jawab.soal.tipe_soal == '2'">
                    <tr>
                      <td width="20px">
                        <b-badge
                          variant="primary"
                          v-if="jawab.esay_result != '' && jawab.esay_result != null">{{ jawab.esay_result.point }}</b-badge>
                      </td>
                      <td v-html="jawab.esay"></td>
                    </tr>
                  </template>
                </table>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import StarFillineYellow from '@/components/icon/StarFillineYellow'
import TagIcon from '@/components/icon/TagIcon'

export default {
  name: 'DetailJawabanSiswa',
  components: {
    StarFillineYellow,
    TagIcon
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState('ujian', {
      jawaban: state => state.detailJawabanSiswa
    })
  },
  methods: {
    ...mapActions('ujian',['getDetailJawabanSiswa']),
    print() {
      this.$htmlToPaper('printDetailJawaban');
    },
    findUrutan(fromArr, id) {
      return fromArr.find((item) => item.id == id);
    },
    parseJson(text) {
      return JSON.parse(text)
    }
  },
  filters: {
    charIndex(i) {
      return String.fromCharCode(97 + i)
    }
  },
  async created() {
    try {
      this.$store.commit('LOADING_PAGE', true)
      await this.getDetailJawabanSiswa(this.$route.params.id)
      this.$store.commit('LOADING_PAGE', false)
    } catch (error) {
      this.$store.commit('LOADING_PAGE', false)
      this.$bvToast.toast(error.message, errorToas())
    }
  }
}
</script>
<style>
.hide {
  display: none;
}
</style>
