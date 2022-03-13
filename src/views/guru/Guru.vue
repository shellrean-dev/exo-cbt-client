<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <router-link :to="{ name: 'guru.add' }" class="btn btn-primary btn-sm">Tambah user</router-link>
                        <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_user_tabel')"><i class="flaticon-info"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage User</h4>
                            <div class="small text-muted">Buat edit dan hapus user</div>
                        </div>
                         <div class="d-md-block col-sm-7">
                            <router-link :to="{ name: 'guru.upload' }" class="btn float-right btn-success btn-sm">
                                <i class="flaticon-upload-1"></i>
                                Import user
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
                                  placeholder="Cari user"
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
                    <div class="table-responsive-md" v-if="typeof users.data != 'undefined'">
                        <b-table
                        id="table-transition-example"
                        :tbody-transition-props="transProps"
                        striped hover bordered small show-empty
                        :fields="fields"
                        :items="users.data"
                        selectable
                        @row-selected="onRowSelected"
                        ref="selectableTable"
                        selected-variant="danger"
                        >
                          <template v-slot:cell(no)="row">
                            {{(perPage*(page-1)) + row.index + 1}}
                          </template>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'guru.edit', params: { id: row.item.id } }" class="btn btn-warning btn-sm mr-1">
                                    <i class="flaticon-edit"></i> Edit
                                </router-link>
                                <b-button variant="danger" size="sm" @click="deleteUser(row.item.id)" :disabled="isLoading">
                                    <i class="flaticon2-trash"></i> Hapus
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
                                    <b-button variant="outline-danger" size="sm" @click="bulkRemove">
                                        <i class="flaticon2-trash"></i> Bulk remove
                                    </b-button>
                                </div>
                                <p><i class="fa fa-bars"></i> {{ users.data.length }} user dari {{ users.total }} total data user</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="users.total"
                                        :per-page="users.per_page"
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
                <div class="card-footer"></div>
            </div>
        </div>
        <b-modal id="modal-feature-info" size="lg">
		    <template v-slot:modal-header="{ close }">
		      <h5>Informasi Fitur</h5>
		    </template>
            <template v-if="_is_feature_info">
			<div v-html="feature_info.content"></div></template>
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
    name: 'DataGuru',
    data() {
        return {
            transProps: {
              name: 'flip-list'
            },
            fields: [
              { key: 'no', label: '#', sortable: false },
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'Nama', sortable: true},
                { key: 'email', label: 'Email', sortable: true},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
            selected: []
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('feature',['feature_info']),
        ...mapState('user', {
            users: state => state.users_data
        }),
        page: {
            get() {
                return this.$store.state.user.page
            },
            set(val) {
                this.$store.commit('user/SET_PAGE', val)
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
        ...mapActions('user',['getUsers', 'removeUser', 'removeUserMultiple']),
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
                text: "User yang dipilih akan dihapus berserta data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    let ids = this.selected.map(item => item.id)
                    this.removeUserMultiple({ user_id: ids })
                    .then(() => {
                        this.getUsers({ search: this.search, perPage : this.perPage });
                        this.$bvToast.toast('Data user berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
        },
        deleteUser(id) {
            this.$swal({
                title: 'Informasi',
                text: "User yang dipilih akan dihapus berserta data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeUser(id)
                    .then(() => {
                        this.getUsers({ search: this.search, perPage : this.perPage });
                        this.$bvToast.toast('Data user berhasil dihapus.', successToas())
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
    async created() {
        try {
            await this.getUsers({ perPage: this.perPage })
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    },
  watch: {
    page() {
      this.getUsers({ search: this.search, perPage: this.perPage })
    },
    search:  _.debounce(function (value) {
      this.getUsers({ search: this.search, perPage: this.perPage })
    }, 500),
    perPage() {
      this.getUsers({ search: this.search, perPage: this.perPage })
    }
  }
}
</script>
