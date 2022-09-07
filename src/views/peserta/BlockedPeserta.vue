<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-5">
              <h4 id="traffic" class="card-title mb-0">Manage Blocked Peserta</h4>
              <div class="small text-muted">Manage data blocked peserta</div>
            </div>
          </div>
          <div class="table-responsive-md mt-5">
            <b-table 
            striped hover bordered small show-empty
            :fields="fields" 
            :items="blocked_pesertas"
            selectable
            @row-selected="onRowSelected"
            ref="selectableTable"
            selected-variant="danger"
            >
              <template v-slot:cell(no)="row">
                {{ row.index + 1}}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button variant="danger" :disabled="isLoading" class="mr-1" size="sm"
                @click="_unblockPeserta(row.item.id)"
                >
                  Unblock
                </b-button>
              </template>
            </b-table>
            <div class="row mt-2">
              <div class="col-md-6">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <b-button variant="outline-dark" size="sm" @click="selectAllRows">
                    <i class="flaticon-list-3"></i> Select all
                  </b-button>
                  <b-button variant="outline-dark" size="sm" @click="clearSelected">
                    <i class="flaticon2-reload"></i> Clear selected
                  </b-button>
                  <b-button variant="outline-danger" size="sm" @click="bulkUnblockPeserta">
                    <i class="flaticon2-trash"></i> Bulk unblock peserta
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    fields: [
      { key: 'no', label: '#' },
      { key: 'no_ujian', label: 'No ujian' },
      { key: 'nama_peserta', label: 'Nama peserta' },
      { key: 'actions', label: 'Aksi' }
    ],
    selected: []
  }),
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState('peserta', ['blocked_pesertas'])
  },
  methods: {
    ...mapActions('peserta', ['getPesertasBlocked', 'unblockPeserta']),
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    async bulkUnblockPeserta() {
      try {
        let pesertaId = this.selected.map((item) => item.id).join(',')
        await this.unblockPeserta(pesertaId)
        this.selected = []
        this.getPesertasBlocked()
      } catch (e) {
        console.log(e)
      } finally {
      }
    },
    async _unblockPeserta(peserta_id) {
      try {
        await this.unblockPeserta(peserta_id)
        this.getPesertasBlocked()
      } catch (e) {
      } finally {
      }
    }
  },
  created() {
    this.getPesertasBlocked()
  }
}
</script>