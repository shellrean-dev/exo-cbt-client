<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Reset peserta
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Reset login peserta</h4>
                            <div class="small text-muted">Reset login peserta agar peserta dapat login kembali</div>
                        </div>
                    </div>
                    <br>
                    <div class="row mb-2">
                        <div class="col-sm-6 col-md-3">
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3"><i class="flaticon-search"></i></span>
                                </div>
                                <input class="form-control" v-model="search"/>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="pesertas.data"  show-empty>
                            <template v-slot:cell(no)="row">
                                {{ ((page-1)*pesertas.per_page) + row.index+1}}
                            </template>
                            <template v-slot:cell(reset)="row">
                                <b-button :disabled="isLoading" size="sm" variant="danger" @click="resetPeserta(row.item.id)"><i class="flaticon-refresh"></i> reset api token</b-button>
                            </template>
                        </b-table>
                        <div class="row mt-2" v-if="typeof pesertas.data != 'undefined' ">
                            <div class="col-md-6">
                                <p><i class="fa fa-bars"></i> {{ pesertas.data.length }} item dari {{ pesertas.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="pesertas.total"
                                        :per-page="pesertas.per_page"
                                    ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import _ from 'lodash'

export default {
    name: 'DataPesertaReset',
    data() {
        return {
            fields: [
                { key: 'no', label: '#'},
                { key: 'no_ujian', label: 'No ujian', sortable: true },
                { key: 'nama', label: 'Nama peserta', sortable: true },
                { key: 'reset', label: 'Reset'}
            ],
            search: '',
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('peserta', { pesertas: state => state.peserta_login }),
        page: {
            get() {
                return this.$store.state.peserta.login_page
            },
            set(val) {
                this.$store.commit('peserta/SET_LOGIN_PESERTA_PAGE', val)
            }
        }
    },
    methods: {
        ...mapActions('peserta', ['getPesertasLogin', 'resetLoginPeserta']),
        resetPeserta(id) {
            this.$swal({
                title: 'Reset peserta',
                text: 'Peserta akan logout otomatis saat berinteraksi dengan server',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c9c9ca',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await this.resetLoginPeserta(id)
                        this.getPesertasLogin()
                        this.$bvToast.toast('Login peserta berhasil direset', successToas())
                    } catch (error) {
                        this.$bvToast.toast(error.message, errorToas())
                    }
                }
            })
        },
        async changeData() {
            try {
                await this.getPesertasLogin(this.search)
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    watch: {
        search:  _.debounce(function (value) {
			this.changeData()
        }, 500),
        page() {
            this.changeData()
        }
    },
    async created() {
        try {
            await this.getPesertasLogin()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>