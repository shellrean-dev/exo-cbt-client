<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <b-button @click="showModalCreate" size="sm" variant="primary">Tambah banksoal</b-button>
                </div>
                <div class="card-body">
                     <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Banksoal</h4>
                            <div class="small text-muted">Buat hapus dan edit banksoal</div>
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
                                  placeholder="Cari kode banksoal"
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
                    <template v-if="banksoals && typeof banksoals.data != 'undefined'">
                        <div class="table-responsive-md">
                        <b-table striped id="table-transition-example" primary-key="kode_banksoal" :tbody-transition-props="transProps" hover bordered small :fields="fields" :items="banksoals.data" show-empty>
                             <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>

                            <template v-slot:row-details="row">
                                <b-card>
                                    <div class="table-responsive-md">
                                        <table class="table table-bordered">
                                            <tr>
                                                <td width="150px">Pembuat</td><td v-text="row.item.user.name"></td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah PG</td><td v-text="row.item.jumlah_soal+' ('+row.item.jumlah_pilihan+' opsi )'"></td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah Listening</td><td v-text="row.item.jumlah_soal_listening+' ('+row.item.jumlah_pilihan_listening+' opsi )'"></td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah esay</td><td v-text="row.item.jumlah_soal_esay"></td>
                                            </tr>
                                            <tr>
                                                <td>Soal terinput</td><td v-text="row.item.inputed"></td>
                                            </tr>
                                        </table>
                                    </div>
                                </b-card>
                            </template>
                           <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'banksoal.soal', params: {banksoal_id: row.item.id} }" class="btn btn-success btn-sm mr-1"><i class="cil-notes"></i> Soal</router-link>
                                <b-button class="mr-1" @click="getDataId(row.item.id)" size="sm" variant="warning" :disabled="isLoading"><i class="cil-pencil"></i> Edit</b-button>
                                <button :disabled="isLoading" class="btn btn-danger btn-sm" @click="deleteBanksoal(row.item.id)"><i class="cil-trash"></i> Hapus</button>
                            </template>
                        </b-table>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <p v-if="banksoals.data"><i class="fa fa-bars"></i> <b>{{ banksoals.data.length }}</b> banksoal dari <b>{{ banksoals.total }}</b> total data banksoal</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="banksoals.total"
                                        :per-page="banksoals.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="text-center my-2">
                            Loading...
                        </div>
                    </template>
                </div> 
                <div class="card-footer">
                    <strong>Sematic kode banksoal : </strong> <u>kode-tahun-matpel(singkat)</u> <strong>Contoh : </strong> E3D-MTK-2020
                </div>
            </div>
        </div>
        <b-modal id="modal-scoped" size="md">
            <template v-slot:modal-header="{ close }">
              <h5>Tambah banksoal</h5>
            </template>
            <div class="form-group">
                <label>Mata pelajaran</label>
                <v-select label="nama" :options="matpels" v-model="data.matpel_id"></v-select>
                <p class="text-danger" v-if="errors.matpel_id">{{ errors.matpel_id[0] }}</p>
            </div>
            <div class="form-group">
                <label>Kode banksoal</label>
                <input type="text" class="form-control" :class="{ 'is-invalid' : errors.kode_banksoal }"  placeholder="Kode banksoal" v-model="data.kode_banksoal">
                <p class="text-danger" v-if="errors.kode_banksoal">{{ errors.kode_banksoal[0] }}</p>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-md-6"> 
                        <div class="form-group">
                            <label>Jumlah soal pilihan ganda</label>
                            <div class="input-group">
                                <div class="input-group-prepend" v-show="data.jumlah_soal > 0">
                                    <button class="btn btn-outline-secondary" type="button" @click="data.jumlah_soal -= 1"><b>-</b></button>
                                </div>
                                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_soal }" v-model.number="data.jumlah_soal" placeholder="Jumlah soal pilihan ganda">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button" @click="data.jumlah_soal += 1"><b>+</b></button>
                                </div>
                            </div>
                            <p class="text-danger" v-if="errors.jumlah_soal">{{ errors.jumlah_soal[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-6"> 
                        <div class="form-group">
                            <label>Jumlah opsi pilihan ganda</label>
                            <div class="input-group">
                                <div class="input-group-prepend" v-show="data.jumlah_pilihan > 0">
                                    <button class="btn btn-outline-secondary" type="button" @click="data.jumlah_pilihan -= 1"><b>-</b></button>
                                </div>
                                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_pilihan }" v-model.number="data.jumlah_pilihan" placeholder="Jumlah opsi">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button" @click="data.jumlah_pilihan += 1"><b>+</b></button>
                                </div>
                            </div>
                            <p class="text-danger" v-if="errors.jumlah_pilihan">{{ errors.jumlah_pilihan[0] }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Jumlah soal listening</label>
                            <div class="input-group">
                                <div class="input-group-prepend" v-show="data.jumlah_soal_listening > 0">
                                    <button class="btn btn-outline-secondary" type="button" @click="data.jumlah_soal_listening -= 1"><b>-</b></button>
                                </div>
                                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_soal_listening }" v-model.number="data.jumlah_soal_listening" placeholder="Jumlah soal listening">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button" @click="data.jumlah_soal_listening += 1"><b>+</b></button>
                                </div>
                            </div>
                            <p class="text-danger" v-if="errors.jumlah_soal_listening">{{ errors.jumlah_soal_listening[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Jumlah opsi listening</label>
                            <div class="input-group">
                                <div class="input-group-prepend" v-show="data.jumlah_pilihan_listening > 0">
                                    <button class="btn btn-outline-secondary" type="button" @click="data.jumlah_pilihan_listening -= 1"><b>-</b></button>
                                </div>
                                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_pilihan_listening }" v-model.number="data.jumlah_pilihan_listening" placeholder="Jumlah opsi listening">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button" @click="data.jumlah_pilihan_listening += 1"><b>+</b></button>
                                </div>
                            </div>
                            <p class="text-danger" v-if="errors.jumlah_pilihan_listening">{{ errors.jumlah_pilihan_listening[0] }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Jumlah soal esay</label>
                <div class="input-group">
                    <div class="input-group-prepend" v-show="data.jumlah_soal_esay > 0">
                        <button class="btn btn-outline-secondary" type="button" @click="data.jumlah_soal_esay -= 1"><b>-</b></button>
                    </div>
                    <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_soal_esay }" v-model.number="data.jumlah_soal_esay" placeholder="Jumlah soal esay">
                    <div class="input-group-append">
                        <button class="btn btn-secondary" type="button" @click="data.jumlah_soal_esay += 1"><b>+</b></button>
                    </div>
                </div>
                <p class="text-danger" v-if="errors.jumlah_soal_esay">{{ errors.jumlah_soal_esay[0] }}</p>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>% Pilihan ganda</label>
                        <div class="input-group">
                            <input type="number" class="form-control" :class="{ 'is-invalid' : errors.persen }" v-model.number="data.persen.pilihan_ganda" placeholder="Jumlah soal listening" @input="checkTotal()">
                        </div>
                        <p class="text-danger" v-if="errors.persen">{{ errors.persen[0] }}</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>% Listening</label>
                        <div class="input-group">
                            <input type="number" class="form-control" :class="{ 'is-invalid' : errors.persen }" v-model.number="data.persen.listening" placeholder="Jumlah soal listening" @input="checkTotal()">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>% Esay</label>
                        <div class="input-group">
                            <input type="number" class="form-control" :class="{ 'is-invalid' : errors.persen }" v-model.number="data.persen.esay" placeholder="Jumlah soal listening" @input="checkTotal()">
                        </div>
                    </div>
                </div>
                <div class="col-md-12" v-show="error_total">
                    <span class="text-danger">Total harus 100 !!!</span>
                </div>
            </div>
            <template v-slot:modal-footer="{ ok, cancel}">

              <b-button variant="primary" size="sm" :disabled="isLoading" @click="!update ? postBanksoal() : updateData()" v-if="!error_total">
                    <b-spinner small type="grow" v-show="isLoading"></b-spinner> Simpan
                </b-button>
              <b-button variant="secondary" size="sm" @click="cancel()" :disabled="isLoading" >
                Cancel
              </b-button>
            </template>
        </b-modal>

    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import _ from 'lodash'
import { generateBanksoalCode } from '@/entities/generate'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'DataBanksoal',
    components: {
        'v-select': vSelect
    },
    created() {
        this.getBanksoals({ perPage: this.perPage })
        this.getAllMatpels()
    },
    data() {
        return {
            transProps: {
              name: 'flip-list'
            },
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'kode_banksoal', label: 'Kode banksoal', sortable: true},
                { key: 'matpel.nama', label: 'Mata pelajaran', sortable: true},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
            data: {
                kode_banksoal: '',
                matpel_id: '',
                jumlah_soal : 0,
                jumlah_pilihan: 5,
                jumlah_soal_esay: 0,
                jumlah_soal_listening: 0,
                jumlah_pilihan_listening: 4,
                persen: {
                    pilihan_ganda: 100,
                    listening: 0,
                    esay: 0
                }
            },
            selected: '',
            isBusy: true,
            update: 0,
            error_total: false
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState(['errors']),
        ...mapState('banksoal', {
            banksoals: state => state.banksoals
        }),
        ...mapState('matpel', {
            matpels: state => state.allMatpels
        }),
        page: {
            get() {
                return this.$store.state.banksoal.page
            },
            set(val) {
                this.$store.commit('banksoal/SET_PAGE', val)
            }
        }
    },
    methods: {
        ...mapActions('banksoal', ['getBanksoals','addBanksoal','removeBanksoal','getBanksoalById','updateBanksoal']),
        ...mapActions('matpel',['getAllMatpels']),
        showModalCreate() {
            this.data.kode_banksoal = generateBanksoalCode()
            this.$bvModal.show('modal-scoped')
        },
        async postBanksoal() {
            try {
                await this.addBanksoal({
                    kode_banksoal : this.data.kode_banksoal,
                    matpel_id : this.data.matpel_id.id,
                    jumlah_soal: this.data.jumlah_soal,
                    jumlah_pilihan: this.data.jumlah_pilihan,
                    jumlah_soal_esay: this.data.jumlah_soal_esay,
                    jumlah_soal_listening: this.data.jumlah_soal_listening,
                    jumlah_pilihan_listening: this.data.jumlah_pilihan_listening,
                    persen: this.data.persen
                })

                this.$bvToast.toast('Banksoal berhasil ditambah.', successToas())
                this.getBanksoals({ perPage: this.perPage })  
                this.clearForm()
                this.$bvModal.hide('modal-scoped')
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
        updateData() {
            this.updateBanksoal({
                id: this.update,
                data: this.data
            })
            .then((res) => {
                this.$bvToast.toast('Banksoal berhasil diubah.', successToas())
                this.getBanksoals({ perPage: this.perPage })  
                this.clearForm()
                this.$bvModal.hide('modal-scoped')
                this.update = 0
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        },
        deleteBanksoal(id) {
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus banksoal & directory secara permanent!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeBanksoal(id)
                    .then((res) => {
                        this.getBanksoals({ perPage: this.perPage })
                        this.$bvToast.toast('Banksoal berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
        },
        clearForm() {
            this.data = {
                kode_banksoal: '',
                matpel_id: '',
                jumlah_soal : 0,
                jumlah_pilihan: 5,
                jumlah_soal_esay: 0,
                persen: {
                    pilihan_ganda: 100,
                    listening: 0,
                    esay: 0
                }
            }
        },
        getDataId(id) {
            this.getBanksoalById(id)
            .then((response) => {
                this.data = {
                    kode_banksoal: response.kode_banksoal,
                    matpel_id: response.matpel.nama,
                    jumlah_soal : response.jumlah_soal,
                    jumlah_pilihan: response.jumlah_pilihan,
                    server_name: response.server_name,
                    jumlah_soal_esay: response.jumlah_soal_esay,
                    jumlah_soal_listening: response.jumlah_soal_listening,
                    jumlah_pilihan_listening: response.jumlah_pilihan_listening,
                    persen: response.persen
                }
                this.update = response.id
                this.$bvModal.show('modal-scoped')
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        },
        checkTotal() {
            let total = this.data.persen.pilihan_ganda+this.data.persen.listening+this.data.persen.esay
            if(total != 100) {
                this.error_total = true
            } else {
                this.error_total = false
            }
        }
    },
    watch: {
        page() {
            this.getBanksoals({ perPage: this.perPage })
        },
        search: _.debounce(function (value) {
            this.getBanksoals({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getBanksoals({ search: this.search, perPage: this.perPage })
        }
    },
}
</script>
<style type="text/css">
    table#table-transition-example .flip-list-move {
      transition: transform 1s;
    }
</style>