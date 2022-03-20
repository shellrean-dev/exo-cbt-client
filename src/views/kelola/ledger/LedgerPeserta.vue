<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
        </div>
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-sm-5">
              <h4 id="traffic" class="card-title mb-0">Ledger peserta</h4>
              <div class="small text-muted">Filter dengan event</div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6 col-md-3" v-if="_is_event_exist">
              <label><small>Event ujian</small></label>
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="flaticon-browser"></i></span>
                </div>
                <select class="custom-select" v-model="event_choice">
                  <option :value="ev.id" v-for="(ev, idx) in events_all" :key="ev.id">{{ ev.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row ">
            <div class="col-sm-6 col-md-3 ">
              <label><small>No. Ujian</small></label>
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"><i class="flaticon-search"></i></span>
                </div>
                <input type="text" class="form-control" v-model="search" placeholder="No. Peserta Ujian">
                <div class="input-group-append">
                  <button class="btn btn-secondary" :disabled="!search" @click="search = ''" type="button">Clear</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button class="btn btn-sm btn-success" :disabled="event_choice == null && search == ''" @click="_download">Cari dan Download</button>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { Notif } from '@/entities/notif'
export default {
  data() {
    return {
      event_choice: null,
      search: ""
    }
  },
  computed: {
    ...mapState('event', ['events_all']),
    _is_event_exist() {
      if(typeof this.events_all != 'undefined') {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions('event', ['getAllEvents']),
    ...mapActions('ujian', ['getLedgerPesertaHasilUjianLink']),
    async _getAllEvents() {
      try {
        await this.getAllEvents()
      } catch (e) {
      } finally {
      }
    },
    async _download() {
      try {
        let provider = await this.getLedgerPesertaHasilUjianLink({
          no_ujian: this.search,
          event_id: this.event_choice
        })
        window.open(provider.data, '_self')
      }  catch (error) {
        this.$bvToast.toast(error.message, Notif.error)
      }
    }
  },
  created() {
    this._getAllEvents()
  }
}
</script>