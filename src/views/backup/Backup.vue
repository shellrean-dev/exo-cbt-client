<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <div>
              <button class="btn btn-primary btn-sm mr-1" @click="_generateBackup">Generate backup</button>
              <button class="btn btn-outline-primary btn-sm" @click="$bvModal.show('modal-restore')">Restore data</button>
            </div>
            <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('backup_system')"><i class="flaticon-info"></i></button>
          </div>
        </div>
        <div class="card-body">
          <div class="alert alert-warning">
            <strong>Secret key: {{ secret }}</strong><br>
            Jaga kerahasiaan secret key, gunakan ini sebagai APP_KEY pada aplikasi restore
          </div>
          <div class="alert alert-info">
            <strong>Data yang akan di-backup</strong><br>
            <ul>
              <li>Jurusan</li>
              <li>Matpel</li>
              <li>Banksoal, Soal & Jawaban soal</li>
              <li>Filemedia</li>
              <li>Peserta</li>
            </ul>
          </div>
          <div class="alert alert-warning">
            Pastikan <u>upload_max_filesize</u> & <u>post_max_size</u> pada php.ini sudah di set sebesar file backup
          </div>
          <table class="table table-sm table-hovered table-bordered table-strip">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipe</th>
                <th>Status</th>
                <th>Tanggal generate</th>
                <th>Versi</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(backup, index) in backups">
                <td width="50px">{{ index +1 }}</td>
                <td>
                  {{ backup.bak_type }} <br>
                  <a href="#" @click="downloadFileBackup(backup.id)" v-if="backup.status == 'SUCCESS' && backup.bak_type == 'BACKUP'">Download</a>
                </td>
                <td>{{ backup.status }}</td>
                <td>{{ backup.generated_date }}</td>
                <td>{{ backup.version }}</td>
                <td>
                  <div class="">
                    <pre><code>{{ JSON.stringify(JSON.parse(backup.detail), null, 4) }}</code></pre></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
    <b-modal id="modal-restore" size="lg">
      <template v-slot:modal-header="{ close }">
        <h5>Restore Exo-CBT data</h5>
      </template>
      <div>
        <div class="input-group">
          <div class="custom-file">
            <input ref="fileupload" type="file" class="custom-file-input" @change="onFileChange">
            <label class="custom-file-label">{{ label ? label : 'Pilih file backup...' }}</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" :disabled="isLoading" @click="uploadFile">{{ isLoading ? 'Processing...' : 'Upload' }}</button>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Notif } from '../../entities/notif'
export default {
  data() {
    return {
      secret: "",
      label: "",
      file: {},
      allow: ["exo"]
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('backup', ['backups']),
  },
  methods: {
    ...mapActions('backup', ['getBackups', 'generateBackup', 'uploadBackup', 'getProxyDownload']),
    async _getBackups() {
      try {
        let secret_key = await this.getBackups()
        this.secret = secret_key
      } catch (e) {}
    },
    async _generateBackup() {
      try {
        this.$store.commit("LOADING_PAGE", true)
        await this.generateBackup()
        this._getBackups()
      } catch (e) {

      }finally {
        this.$store.commit("LOADING_PAGE", false)
      }
    },
    featureInfo() {

    },
    onFileChange(e) {
      this.label = e.target.files[0].name
      this.file = e.target.files[0]
    },
    uploadFile(e) {
      let exten = this.label.substring(this.label.lastIndexOf('.') + 1); 
      if(!this.allow.includes(exten)) {
        this.$bvToast.toast('Hanya format exo yang diizinkan', Notif.error)
        return
      }

      let formData = new FormData()
      formData.append('file',this.file)
      this.uploadBackup(formData)
      .then((res) => {
        this.file = ''
        this.label = ''
        this.$bvModal.hide('modal-restore')
        this.$bvToast.toast('Peserta berhasil diimport.', Notif.success)
      })
      .catch((error) => {
        this.$refs.fileupload.value = null;
        this.file = ''
        this.label = ''
        this.$bvToast.toast(error.message, Notif.error)
      })
      .finally(() => {
        this._getBackups()
      })
    },
    async downloadFileBackup(backupId) {
      try {
        this.$store.commit("LOADING_PAGE", true)
        let provider = await this.getProxyDownload(backupId)
        window.open(provider.data, '_self')
      } catch (error) {
        this.$bvToast.toast(error.message, Notif.error)
      } finally {
        this.$store.commit("LOADING_PAGE", false)
      }
    }
  },
  created() {
    this._getBackups()
  }
}
</script>