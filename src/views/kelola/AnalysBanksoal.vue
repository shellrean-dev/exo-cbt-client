<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                   Analys banksoal
                </div>
                <div class="card-body">
                     <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Analys banksoal</h4>
                            <div class="small text-muted">Pilih soal yang akan dilihat analysanya</div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-6">
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
                    <div class="table-responsive-md" v-if="typeof banksoals.data != 'undefined'">
                        <b-table striped hover bordered small :fields="fields" :items="banksoals.data" show-empty>
                            <template v-slot:cell(actions)="row">
                                <b-button :to="{ name: 'kelola.analys.kesulitan.banksoal', params: {banksoal: row.item.id} }" variant="primary" size="sm">
                                    <i class="cil-chart-pie"></i> Hasil analisa
                                </b-button>
                            </template>
                        </b-table>
                    </div>
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
    name: 'DataBanksoal',
    data() {
        return {
            fields: [
                { key: 'kode_banksoal', label: 'Kode banksoal'},
                { key: 'matpel.nama', label: 'Mata pelajaran'},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('banksoal', {
            banksoals: state => state.banksoals
        })
    },
    methods: {
        ...mapActions('banksoal',['getBanksoals'])
    },
    async created() {
        try {
            await this.getBanksoals({ perPage: this.perPage })
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
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