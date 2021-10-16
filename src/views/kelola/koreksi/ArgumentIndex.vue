<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <span>Koreksi argument peserta</span>
            <button
              class="btn-sm btn btn-white"
              title="Informasi"
              @click="featureInfo('page_koreksi_argument_tabel')">
              <i class="flaticon-info"></i></button>
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
            <b-table striped hover bordered small :fields="fields" :items="koreksi_argument_banksoal_datas" show-empty >
              <template v-slot:cell(no)="row">
                {{ row.index + 1 }}
              </template>
              <template v-slot:cell(kode_banksoal)="row">
                {{ row.item.kode_banksoal }}
              </template>
              <template v-slot:cell(aksi)="row">
                <router-link
                  :to="{ name: 'kelola.koreksi.nilai.argument', params: { banksoal: row.item.id } }"
                  class="btn btn-sm btn-primary">
                  <i class="flaticon-list"></i> Koreksi banksoal ini
                </router-link>
              </template>
            </b-table>
          </div>
        </div>
        <div class="card-footer"></div>
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
import {mapActions, mapState} from "vuex";
import {errorToas} from '@/entities/notif'

export default {
  name: "ArgumentIndex",
  data() {
    return {
      fields: [
        { key: 'no', label: 'No' },
        { key: 'kode_banksoal', label: 'Banksoal' },
        { key: 'nama_matpel', label: 'Matpel' },
        { key: 'aksi', label: 'Aksi' }
      ]
    }
  },
  computed: {
    ...mapState('ujian',[
      'koreksi_argument_banksoal_datas']),
    ...mapState('feature',[
      'feature_info']),
  },
  methods: {
    ...mapActions('feature', ['getFeatureInfo']),
    ...mapActions('ujian', [
      'getBanksoalKoreksiArgument']),
    featureInfo(name) {
      this.getFeatureInfo(name)
        .then(() => {
          this.$bvModal.show('modal-feature-info')
        })
    },
    async _getBanksoalKoreksiArgument() {
      try {
        await this.getBanksoalKoreksiArgument()
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    }
  },
  created() {
    this._getBanksoalKoreksiArgument()
  }
}
</script>

<style scoped>

</style>
