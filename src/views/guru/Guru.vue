<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'guru.add' }" class="btn btn-primary btn-sm">Tambah user</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage User</h4>
                            <div class="small text-muted">Buat edit dan hapus user</div>
                        </div>
                         <div class="d-md-block col-sm-7">
                            <router-link :to="{ name: 'guru.upload' }" class="btn float-right btn-success btn-sm">
                                <i class="cil-cloud-upload"></i>
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
                        >
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'guru.edit', params: { id: row.item.id } }" class="btn btn-warning btn-sm mr-1">
                                    <i class="cil-pencil"></i> Edit
                                </router-link>
                                <b-button variant="danger" size="sm" @click="deleteUser(row.item.id)" :disabled="isLoading">
                                    <i class="cil-trash"></i> Hapus
                                </b-button>
                            </template>
                        </b-table>
                        <div class="row">
                            <div class="col-md-6">
                                <p><i class="fa fa-bars"></i> {{ users.data.length }} data dari {{ users.total }} total pengguna</p>
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
            </div>
        </div>
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
                { key: 'name', label: 'Nama', sortable: true},
                { key: 'email', label: 'Email', sortable: true},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
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
        }
    },
    methods: {
        ...mapActions('user',['getUsers', 'removeUser']),
        deleteUser(id) {
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus secara permanent!, serta menghapus seluruh data yang terkait dengan pengguna ini",
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
                        this.$bvToast.toast('Data pengguna berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
        }
    },
    async created() {
        try {
            await this.getUsers({ perPage: this.perPage })
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>