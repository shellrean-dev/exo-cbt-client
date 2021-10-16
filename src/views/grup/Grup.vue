<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary btn-sm"
            @click="$bvModal.show('modal-group')"
            >Tambah grup</button>
            <button class="btn-sm btn btn-white" title="Informasi"
            @click="featureInfo('page_grup_tabel')"
            ><i class="flaticon-info"></i></button>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-5">
              <h4 id="traffic" class="card-title mb-0">Manage Grup</h4>
              <div class="small text-muted">Buat edit dan hapus grup</div>
            </div>
          </div>
          <br>
          <div class="row">

          </div>
          <div class="table-responsive-md">
            <b-table
            striped hover bordered small show-empty
            :fields="fields"
            :items="groupping"
            >
              <template v-slot:cell(show_details)="row">
                <b-button size="sm"
                @click="row.toggleDetails"
                :variant="row.detailsShowing ? 'danger' : 'info'">
                  <i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" />
                </b-button>
              </template>
              <template v-slot:row-details="row">
                <b-card>
                  <div class="table-responsive-md">
                    <table class="table table-striped">
                      <tr>
                        <td>No</td>
                        <td>Nama</td>
                        <td>Aksi</td>
                      </tr>
                      <tr v-for="(child, cidx) in childs(row.item.id)" :key="cidx">
                        <td>{{ cidx+1 }}</td>
                        <td>{{ child.name }}</td>
                        <td>
                          <button class="btn btn-light btn-sm mr-1"
                          @click="getDataMembers(child.id)"
                          :disabled="isLoading"
                          >
                            <i class="flaticon-list-2"></i> Anggota
                          </button>
                          <b-button variant="light" size="sm" class="mr-1"
                          @click="showGroup(child.id)"
                          :disabled="isLoading">
                            <i class="flaticon-edit"></i> Edit
                          </b-button>
                          <button class="btn btn-light btn-sm"
                          @click="deleteDataGroup(child.id)"
                          :disabled="isLoading">
                            <i class="flaticon2-trash"></i> Hapus
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </b-card>
              </template>
              <template v-slot:cell(actions)="row">
                <button class="btn btn-success btn-sm mr-1"
                @click="getDataMembers(row.item.id)"
                :disabled="isLoading"
                >
                  <i class="flaticon-list-2"></i> Anggota
                </button>
                <b-button variant="warning" size="sm" class="mr-1"
                @click="showGroup(row.item.id)"
                :disabled="isLoading">
                  <i class="flaticon-edit"></i> Edit
                </b-button>
                <button class="btn btn-danger btn-sm"
                @click="deleteDataGroup(row.item.id)"
                :disabled="isLoading">
                  <i class="flaticon2-trash"></i> Hapus
                </button>
              </template>
            </b-table>
          </div>
        </div>
        <div class="card-footer">
        </div>
      </div>
    </div>
    <b-modal id="modal-group" noCloseOnBackdrop title="Tambah grup">
      <div class="form-group">
        <label>Nama grup</label>
        <input type="text" class="form-control" v-model="group.name" placeholder="Nama Grup" required>
      </div>
      <div class="form-group">
        <label>Parent grup</label>
        <select class="form-control" v-model="group.parent_id">
          <option :value="0">none</option>
          <option :value="grp.id" v-for="(grp, idx) in groupping" :key="idx">{{ grp.name }}</option>
        </select>
      </div>
      <template v-slot:modal-footer="{  }">
		    <b-button size="sm" variant="primary"
        @click="submit"
        :disabled="isLoading">
		      {{ isLoading ? 'Processing...' : 'Simpan' }}
		    </b-button>
		    <b-button size="sm" variant="secondary"
        @click="close()"
        :disabled="isLoading">
		      Cancel
		    </b-button>
		  </template>
    </b-modal>
    <b-modal id="modal-group-member" noCloseOnBackdrop title="Anggota grup" size="xl">
      <b-button @click="$bvModal.show('modal-import-group-member')" variant="success" size="sm"><i class="flaticon-upload-1"></i> Import anggota</b-button>
      <div class="input-group mb-3 mt-2">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="flaticon-avatar"></i>
          </span>
        </div>
        <input type="text" class="form-control" placeholder="No ujian: gunakan coma sebagai pemisah contoh: 001,002,003,004"
        v-model="str_no_ujian"
        >
        <div class="input-group-append">
          <button class="btn btn-primary" type="button"
          :disabled="isLoading"
          @click="addMultipleMember()">
            <i class="flaticon-app"></i> Tambahkan
          </button>
        </div>
      </div>
      <b-table
      ref="selectableTable"
      striped hover bordered small show-empty
      :fields="fields2"
      :items="filteredMembers"
      selectable
      @row-selected="onRowSelected"
      selected-variant="danger"
      >
        <template v-slot:cell(no)="row">
          {{ row.index + 1}}
        </template>
        <template v-slot:cell(actions)="row">
          <button class="btn btn-light btn-sm"
          @click="deleteDataGroupMember(row.item.id)"
          :disabled="isLoading">
            <i class="flaticon2-trash"></i> Hapus
          </button>
        </template>
      </b-table>
      <div class="row mt-2">
        <div class="col-md-6">
          <div class="btn-group" role="group" aria-label="Basic example">
            <b-button variant="outline-dark" size="sm"
            @click="selectAllRows">
              <i class="flaticon-list-3"></i> Select all
            </b-button>
            <b-button variant="outline-dark" size="sm"
            @click="clearSelected">
              <i class="flaticon2-reload"></i> Clear selected
            </b-button>
            <b-button variant="outline-danger" size="sm"
            @click="bulkRemove">
              <i class="flaticon2-trash"></i> Bulk remove
            </b-button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="float-right">
            <b-pagination
              size="sm"
              v-model="page"
              :total-rows="members.total"
              :per-page="members.per_page"
              :disabled="isLoading"
            ></b-pagination>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
          Tutup
        </b-button>
      </template>
    </b-modal>
    <b-modal id="modal-import-group-member" noCloseOnBackdrop title="Import Anggota grup">
      <div class="form-group">
        <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon04" @change="onFileChange">
            <label class="custom-file-label" for="inputGroupFile04">{{ label ? label : 'Pilih file excel...' }}</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-success" type="button" :disabled="isLoading" @click="submitImportGroupMember">{{ isLoading ? 'Processing...' : 'Upload' }}</button>
          </div>
        </div>
        <a :href="baseURL+`/download/format-group-member-import.xlsx`" download>Download format</a>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
          Tutup
        </b-button>
      </template>
    </b-modal>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
export default {
  name: 'DataGroup',
  data() {
    return {
      fields: [
        { key: 'show_details', label: 'Tree' },
        { key: 'name', label: 'Nama grup' },
        { key: 'actions', label: 'Aksi' }
      ],
      fields2: [
        { key: 'no', label: 'NO' },
        { key: 'no_ujian', label: 'Nomor ujian' },
        { key: 'nama', label: 'Nama peserta' },
        { key: 'actions', label: 'Aksi' }
      ],
      current_group_id: 0,
      str_no_ujian: '',
      selected: [],
      label: "",
      file: {},
    }
  },
  computed: {
    ...mapState(['baseURL']),
    ...mapGetters(['isLoading']),
    ...mapState('feature',['feature_info']),
    ...mapState('grup', ['group','groups','members']),
    groupping() {
      if (!this.groups) {
        return []
      }
      return this.groups.filter((item) => item.parent_id == 0 || item.parent_id == null)
    },
    filteredMembers() {
      if (!this.members) {
        return []
      }
      return this.members.data
    },
    page: {
      get() {
        return this.$store.state.grup.page
      },
      set(val) {
        this.$store.commit('grup/_set_page', val)
      }
    }
  },
  methods: {
    ...mapActions('grup', [
      'getAllGroup',
      'createGroup',
      'getGroupById',
      'updateGroup',
      'deleteGroupById',
      'getGroupMemberById',
      'createMultipleGroupMember',
      'importMultipleGroupMember',
      'deleteGroupMemberById',
      'deleteMultipleGroupMember'
    ]),
    ...mapActions('feature', [
      'getFeatureInfo'
    ]),
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    bulkRemove() {
      this.$swal({
        title: 'Informasi',
        text: "Peserta yang dipilih akan dihapus dari grup ini",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteMultipleGroupMember(this.selected.map((item) => item.id).join(','))
            this.selected = []
            this.$bvToast.toast('Peserta yang dipilih berhasil dihapus dari grup', successToas())
            this.getDataMembers(this.current_group_id)
          } catch (e) {
            this.$bvToast.toast(e.message, errorToas())
          }
        }
      })
    },
    async getDataAllGroup() {
      try {
        await this.getAllGroup()
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    },
    childs(parent_id) {
      if (!this.groups) {
        return []
      }
      return this.groups.filter((item) => item.parent_id == parent_id)
    },
    async showGroup(group_id) {
      try {
        await this.getGroupById(group_id)
        this.$bvModal.show('modal-group')
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    },
    async submit() {
      if (typeof this.$store.state.grup.group.id != 'undefined') {
        try {
          await this.updateGroup()
          this.$bvToast.toast('Grup berhasil diubah', successToas())
          this.$store.state.grup.group = {}
          this.$bvModal.hide('modal-group')
          this.getDataAllGroup()
        } catch (e) {
          this.$bvToast.toast(e.message, errorToas())
        }
      } else {
        try {
          await this.createGroup()
          this.$bvToast.toast('Grup berhasil ditambahkan', successToas())
          this.$store.state.grup.group = {}
          this.$bvModal.hide('modal-group')
          this.getDataAllGroup()
        } catch (e) {
          this.$bvToast.toast(e.message, errorToas())
        }
      }
    },
    deleteDataGroup(groupId) {
      this.$swal({
        title: 'Informasi',
        text: "Grup yang dipilih akan dihapus beserta data yang terkait dengan table jurusan",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteGroupById(groupId)
            this.$bvToast.toast('Grup berhasil dihapus', successToas())
            this.getDataAllGroup()
          } catch (e) {
            this.$bvToast.toast(e.message, errorToas())
          }
        }
      })
    },
    close() {
      this.$store.state.grup.group = {}
      this.$bvModal.hide('modal-group')
    },
    async getDataMembers(groupId) {
      try {
        await this.getGroupMemberById(groupId)
        this.current_group_id = groupId
        this.$bvModal.show('modal-group-member')
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    },
    async addMultipleMember() {
      try {
        await this.createMultipleGroupMember({
          group_id: this.current_group_id,
          no_ujians: this.str_no_ujian.split(',')
        })
        this.str_no_ujian = ""
        this.getDataMembers(this.current_group_id)
        this.$bvToast.toast('Peserta berhasil ditambahkan ke grup', successToas())
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    },
    deleteDataGroupMember(memberId) {
      this.$swal({
        title: 'Informasi',
        text: "Anggota yang dipilih akan dihapus dari grup ini",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if(result.value) {
          try {
            await this.deleteGroupMemberById(memberId)
            this.$bvToast.toast('Peserta berhasil dihapus dari grup', successToas())
            this.getDataMembers(this.current_group_id)
          } catch (e) {
            this.$bvToast.toast(e.message, errorToas())
          }
        }
      })
    },
    onFileChange(e) {
      this.label = e.target.files[0].name
      this.file = e.target.files[0]
    },
    async submitImportGroupMember() {
      try {
        let formData = new FormData()
        formData.append('file',this.file)
        formData.append('group_id', this.current_group_id)

        const network = await this.importMultipleGroupMember(formData)
        this.label = ''
        this.file = {}
        this.$bvToast.toast('Peserta berhasil diimport kedalam grup', successToas())
        this.$bvModal.hide('modal-import-group-member')
        this.getDataMembers(this.current_group_id)
      } catch (e) {
        this.$bvToast.toast(e.message, errorToas())
      }
    },
    featureInfo(name) {
      this.getFeatureInfo(name)
      .then(() => {
        this.$bvModal.show('modal-feature-info')
      })
    }
  },
  created() {
    this.getDataAllGroup()
  },
  watch: {
    page() {
      this.getDataMembers(this.current_group_id)
    }
  }
}
</script>
