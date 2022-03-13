<template>
	<div class="row">
    	<div class="col-md-12">
    		<div class="card">
    			<div class="card-header">
                    <div class="d-flex justify-content-between">
                        <router-link :to="{ name: 'matpel.add' }" class="btn btn-primary btn-sm">Tambah matpel</router-link>
                        <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_matpel_tabel')"><i class="flaticon-info"></i></button>
                    </div>
    			</div>
    			<div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Matpel</h4>
                            <div class="small text-muted">Buat edit dan hapus matpel</div>
                        </div>
                         <div class="d-md-block col-sm-7">
                            <router-link :to="{ name: 'matpel.upload' }" class="btn float-right btn-success btn-sm">
                                <i class="flaticon-upload-1"></i>
                                Import matpel
                            </router-link>
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
                                <b-form-input
                                  v-model="search"
                                  type="search"
                                  id="filterInput"
                                  placeholder="Cari dengan nama matpel"
                                ></b-form-input>
                                <b-input-group-append>
                                  <b-button :disabled="!search" @click="search = ''">Clear</b-button>
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
                              <b-form-select
                                v-model="perPage"
                                id="perPageSelect"
                                size="sm"
                                :options="pageOptions"
                              ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="table-responsive-md" v-if="matpels && typeof matpels.data != 'undefined'">
                        <b-table
                        id="table-transition-example"
                        primary-key="kode_mapel" :tbody-transition-props="transProps"
                        striped hover bordered small show-empty
                        :fields="fields"
                        :items="matpels.data"
                        selectable
                        @row-selected="onRowSelected"
                        ref="selectableTable"
                        selected-variant="danger"
                        >
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" /></b-button>
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <div class="table-responsive-md">
                                        <table class="table table-bordered">
                                            <tr>
                                                <td width="230">Setting matpel</td>
                                                <td>
                                                  <ul>
                                                    <li v-show="row.item.jurusans == 0 && row.item.agama == 0">umum tanpa kecuali</li>
                                                    <li v-show="row.item.jurusans != 0">khusus jurusan</li>
                                                    <ul v-if="row.item.jurusans != 0">
                                                      <li
                                                        v-for="(jur, index) in row.item.jurusans"
                                                        v-text="jur.nama" :key="index"
                                                      ></li>
                                                    </ul>
                                                    <li v-show="row.item.agama != 0">agama tertentu</li>
                                                  </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tim pengoreksi</td>
                                                <td>
                                                  <ul
                                                    v-if="row.item.correctors_name != 0"
                                                  >
                                                    <li
                                                      v-for="(corector, index) in row.item.correctors_name"
                                                      v-text="corector.name" :key="index"
                                                    ></li>
                                                  </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </b-card>
                            </template>
                            <template v-slot:cell(nama)="row">
                                {{ row.item.nama }}
                            </template>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'matpel.edit', params: { id: row.item.id } }" class="btn btn-warning btn-sm mr-1">
                                    <i class="flaticon-edit"></i> Edit
                                </router-link>
                                <button class="btn btn-danger btn-sm" @click="deleteMatpel(row.item.id)" :disabled="isLoading">
                                    <i class="flaticon2-trash"></i> Hapus
                                </button>
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
                                    <b-button variant="outline-danger" size="sm" @click="bulkRemove">
                                        <i class="flaticon2-trash"></i> Bulk remove
                                    </b-button>
                                </div>
                                <p><i class="fa fa-bars"></i> <b>{{ matpels.data.length }}</b> matpel dari <b>{{ matpels.total }}</b> total data matpel</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="matpels.total"
                                        :per-page="matpels.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-else>
                        <div class="text-center my-2">
                            Loading...
                        </div>
                    </template>
    			</div>
                <div class="card-footer">
                    <strong>Sematic kode matpel : </strong> <u>kode-nomor-kategori</u> <strong>Contoh :</strong> BC-012-U (U: Umum, A: Agama, K: khusus)
                </div>
    		</div>
    	</div>
        <b-modal id="modal-feature-info" size="lg">
		    <template v-slot:modal-header="{ close }">
		      <h5>Informasi Fitur</h5>
		    </template>
            <template v-if="_is_feature_info">
			<div v-html="feature_info.content"></div>
            </template>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import _ from 'lodash'

export default {
    name: 'DataMatpel',
    created() {
        this.getMatpels({ perPage : this.perPage })
    },
    data() {
        return {
            transProps: {
              name: 'flip-list'
            },
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'kode_mapel', label: 'Kode matpel', sortable: true},
                { key: 'nama', label: 'Nama mata pelajaran', sortable: true},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
            data: {
                nama: '',
                kode_mapel: ''
            },
            isBusy: true,
            selected: []
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState(['errors']),
        ...mapState('feature',['feature_info']),
        ...mapState('matpel', {
            matpels: state => state.matpels,
            from: state => state.from
        }),
        page: {
            get() {
                return this.$store.state.matpel.page
            },
            set(val) {
                this.$store.commit('matpel/SET_PAGE', val)
            }
        },
        _is_feature_info() {
            if(typeof this.feature_info != 'undefined') {
                return true
            }
            return false
        }
    },
    methods: {
        ...mapActions('matpel', ['getMatpels','removeMatpel', 'removeMatpelMultiple']),
        ...mapActions('feature', ['getFeatureInfo']),
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
            if(this.selected == '') {
                return
            }
            this.$swal({
                title: 'Informasi',
                text: "Matpel yang dipilih akan dihapus beserta data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    let ids = this.selected.map(item => item.id)
                    this.removeMatpelMultiple({ matpel_id: ids })
                    .then(() => {
                        this.getMatpels({ search: this.search, perPage : this.perPage });
                        this.$bvToast.toast('Data matpel berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
        },
        deleteMatpel(id) {
            this.$swal({
                title: 'Informasi',
                text: "Matpel yang dipilih akan dihapus beserta data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeMatpel(id)
                    .then(() => {
                        this.getMatpels({ search: this.search, perPage : this.perPage });
                        this.$bvToast.toast('Data matpel berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
        },
        featureInfo(name) {
			this.getFeatureInfo(name)
			.then(() => {
				this.$bvModal.show('modal-feature-info')
			})
		}
    },
    watch: {
        page() {
            this.getMatpels({ search: this.search, perPage: this.perPage })
        },
        search:  _.debounce(function (value) {
            this.getMatpels({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getMatpels({ search: this.search, perPage: this.perPage })
        }
    },
}
</script>
