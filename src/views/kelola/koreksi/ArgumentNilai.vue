<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'kelola.koreksi.argument' }" class="btn btn-light btn-sm  ">Kembali</router-link>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-5">
              <h4 id="traffic" class="card-title mb-0">Koreksi</h4>
              <div class="small text-muted">Objektif dalam menilai, perhatikan juga argument peserta</div>
            </div>
          </div>
          <br>
          <div class="table-responsive-md">
            <b-table striped hover bordered small :fields="fields" :items="argues.data" show-empty>
              <template v-slot:cell(no)="row">
                {{ ((page-1)*argues.per_page) + row.index+1}}
              </template>
              <template v-slot:cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'">
                  <i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" />
                </b-button>
              </template>
              <template v-slot:row-details="row">
                <b-card>
                  <div v-html="row.item.pertanyaan"></div>
                  <table class="table table-sm table-bordered">
                    <tr>
                      <th>Pernyataan</th>
                      <th>Setuju/tidak</th>
                      <th>Argumen</th>
                    </tr>
                    <tr
                      v-for="(v, k) in row.item.setuju_tidak"
                      :index="'list_argument_index_'+k"
                    >
                      <td v-html="v.detil.text_jawaban"></td>
                      <td>
                        <strong v-if="v.val == 1">Setuju</strong>
                        <strong v-if="v.val == 0">Tidak Setuju</strong>
                      </td>
                      <td>{{ v.argument }}</td>
                    </tr>
                  </table>
<!--                  <strong>Kebenaran tidak tetap</strong>-->
<!--                  <b-progress :value="30" variant="success" show-progress></b-progress>-->
<!--                  <hr>-->
                  <strong>Beri point</strong>
                  <div class="input-group mb-2" style="max-width: 240px">
                    <input
                      type="number"
                      v-model.number="argues.data[row.index]['point']"
                      class="form-control border-primary"
                      :class="{'is-invalid': row.item.val > 1 || row.item.val < 0 }"
                      placeholder="Point"
                      step="0.1"
                      max="1"
                      min="0">
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button" @click="_sendNilaiArgument(row.index)" :disabled="isLoading">Submit</button>
                    </div>
                  </div>
                  <small>* maksimal point adalah 1, minimal 0, boleh menggunakan decimal, 0, 0.1, 0.2, ...1</small>
                </b-card>
              </template>
            </b-table>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import { successToas, errorToas} from '@/entities/notif'

export default {
  name: "ArgumentNilai",
  data() {
    return {
      fields: [
        { key: 'no', label: '#' },
        { key: 'show_details', label: 'Detail' }
      ]
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState('ujian', ['argues']),
    page: {
      get() {
        return this.$store.state.ujian.koreksi_argument_page
      },
      set(val) {
        this.$store.commit('ujian/_set_page_koreksi_argument', val)
      }
    }
  },
  methods: {
    ...mapActions('ujian',['getKoreksiArgumentByBanksoal']),
    ...mapActions('penilaian', ['sendNilaiArgument']),
    async _getKoreksiArgumentByBanksoal() {
      try {
        await this.getKoreksiArgumentByBanksoal(this.$route.params.banksoal)
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    },
    async _sendNilaiArgument(index) {
      try {
        let data = this.argues.data[index]
        await this.sendNilaiArgument({
          val: data.point,
          id: data.id
        })
        this.$bvToast.toast('Nilai argment siswa berhasil disimpan', successToas())
        this._getKoreksiArgumentByBanksoal()
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    }
  },
  created() {
    this._getKoreksiArgumentByBanksoal()
  }
}
</script>

<style scoped>

</style>
