<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <b-button size="sm" variant="primary"
            v-on:click="_showModalCreate"
            >Tambah banksoal</b-button>
            <button class="btn-sm btn btn-white" title="Informasi" 
            v-on:click="_featureInfo('page_banksoal_tabel')"
            ><i class="flaticon-info"></i></button>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-5">
              <h4 class="card-title mb-0">Manage Banksoal Adaptif</h4>
              <div class="small text-muted">Buat hapus dan edit banksoal adaptif</div>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-5">
              <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
              >
                <b-input-group size="sm">
                  <b-form-input type="search" id="filterInput" placeholder="Cari kode banksoal"
                  v-model="search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button 
                    :disabled="!search"
                    v-on:click="search = ''"
                    >Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label="Per page"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                label-for="perPageSelect"
              >
                <b-form-select id="perPageSelect" size="sm"
                  v-model="perPage"
                  :options="pageOptions"
                ></b-form-select>
              </b-form-group>
            </div>
          </div>
          <template 
          v-if="is_banksoal_set">
            <div class="table-responsive-md">
              <b-table striped primary-key="id" hover bordered small show-empty
                :fields="fields"
                :items="banksoals.data">
                <template v-slot:cell(show_details)="row">
                  <b-button size="sm"
                  v-on:click="row.toggleDetails"
                  :variant="row.detailsShowing ? 'danger' : 'info'">
                    <i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" />
                  </b-button>
                </template>
                <template v-slot:cell(actions)="row">
                  <b-button class="mr-1" size="sm" variant="warning"
                  v-on:click="_getSingleDataBanksoalAdaptif(row.item.id)"
                  ><i class="flaticon-edit"></i> Edit</b-button>
                </template>
              </b-table>
            </div>
          </template>
        </div>
        <div class="card-footer">
          <strong>Sematic kode banksoal : </strong> <u>kode-tahun-matpel(singkat)</u> <strong>Contoh : </strong> E3D-2021-MTK
        </div>
      </div>
    </div>
    <feature-info-modal></feature-info-modal>
    <modal-banksoal-tambah v-on:refresh="_getDataBanksoalAdaptif"></modal-banksoal-tambah>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import FeatureInfoModal from '@/components/modal/FeatureInfo'
import ModalBanksoalTambah from './ModalBanksoalTambah'
import _ from 'lodash'

export default {
  name: 'DataBanksoal',
  components: {
    FeatureInfoModal,
    ModalBanksoalTambah
  },
  data() {
    return {
      search: '',
      perPage: 20,
      pageOptions: [20, 50, 100],
      fields: [
        { key: 'show_details', label:'Detail' },
        { key: 'code', label: 'Kode banksoal' },
        { key: 'name', label: 'Nama banksoal' },
        { key: 'matpel.nama', label: 'Mata pelajaran' },
        { key: 'actions', label: 'Aksi' }
      ]
    }
  },
  computed: {
    ...mapState('banksoal_adaptif', [
      'banksoals']),
    is_banksoal_set() {
      if (this.banksoals && typeof this.banksoals.data != 'undefined') {
          return true
      }
      return false
    }
  },
  methods: {
    ...mapActions('feature', [
      'getFeatureInfo']),
    ...mapActions('banksoal_adaptif', [
      'getDataBanksoalAdaptif',
      'getSingleDataBanksoalAdaptif']),
    ...mapActions('matpel', [
      'getAllMatpels']),
    async _featureInfo(name) {
      try {
        this.$store.commit('_start_loading_page')
        await this.getFeatureInfo(name)

        this.$bvModal.show('modal-feature-info')
      } catch (e) {

      } finally {
        this.$store.commit('_stop_loading_page')
      }
    },
    async _getDataBanksoalAdaptif() {
      try {
        this.$store.commit('_start_loading_page')
        await this.getDataBanksoalAdaptif({
          search: this.search,
          perPage: this.perPage
        })
      } catch (e) {

      } finally {
        this.$store.commit('_stop_loading_page')
      }
    },
    _showModalCreate() {
      this.$bvModal.show('modal-banksoal-tambah')
    },
    async _getAllMatpel(){
      try {
        await this.getAllMatpels()
      } catch (e) {

      }
    },
    async _getSingleDataBanksoalAdaptif(banksoal_id) {
      try {
        this.$store.commit('_start_loading_page')
        await this.getSingleDataBanksoalAdaptif(banksoal_id)
        this.$bvModal.show('modal-banksoal-tambah')
      } catch (e) {

      } finally {
        this.$store.commit('_stop_loading_page')
      }
    }
  },
  created() {
    this._getDataBanksoalAdaptif()
    this._getAllMatpel()
  },
  watch: {
    page() {
      this._getDataBanksoalAdaptif()
    },
    search: _.debounce(function (v) {
      this._getDataBanksoalAdaptif()
    }, 500),
    perPage() {
      this._getDataBanksoalAdaptif()
    }
  }
}
</script>