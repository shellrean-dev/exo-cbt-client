<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Capaian siswa
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Capaian siswa</h4>
                            <div class="small text-muted">Filter dengan jadwal</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-5">
                            <b-form-group
                              label="Ujian"
                              label-cols-sm="6"
                              label-cols-md="4"
                              label-cols-lg="3"
                              label-align-sm="right"
                              label-size="sm"
                            >
                                <v-select label="alias" :options="ujians" v-model="jadwal" :reduce="nama => nama.id"></v-select>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="banksoals" show-empty>
                            <template v-slot:cell(actions)="row">
                                <b-button :disabled="isLoading" variant="success" size="sm" @click="banksoal_id = row.item.id; $bvModal.show('modal-scoped-download-capaian-ujian')">
                                    <i class="flaticon-download"></i> Download
                                </b-button>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="modal-scoped-download-capaian-ujian" hide-header>
		    <div class="form-group">
                <label>Jurusan</label>
                <v-select label="nama" :options="jurusans" multiple v-model="jurusan_download" :reduce="nama => nama.id"></v-select>
            </div>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="download" :disabled="isLoading || jurusan_download == 0 || jurusan_download == '' || jurusan_download == null">
		        {{ isLoading ? 'Processing...' : 'Download' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
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
import downloadExcel from 'vue-json-excel';
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'DataAnalysSiswa',
    components: {
        vSelect,
        downloadExcel
    },
    data() {
        return {
            fields: [
                { key: 'kode_banksoal', label: 'Kode banksoal' },
                { key: 'actions', label: 'Aksi' }
            ],
            jadwal: 0,
            jurusan_download: 0,
            jurusan_select: 0,
            banksoal_id: 0,
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('ujian', { 
            banksoals: state => state.banksoals,
            ujians: state => state.ujianAll
        }),
        ...mapState('jurusan', { jurusans: state => state.all_jurusan }),
        jurusands() {
            if (this.jurusans == '') {
                return []
            }
            const jurusan = this.jurusans.map((item) => item);
            jurusan.push({id: 0, nama: 'Semua'})
            return jurusan
        }
    },
    methods: {
        ...mapActions('ujian',['getAllUjians','getResultBanksoal', 'downloadExcel','getLinkExcelCapaianSiswa']),
        ...mapActions('jurusan',['allJurusan']),
        capaian(jadwal, banksoal) {
            if(!jadwal || !banksoal) {
                this.$swal({
                  title: 'Hei!!',
                  text: "Pilih ujian dan banksoal",
                  icon: 'error',
                })

                return;

            }
            this.$router.push({
                params: {
                    jadwal: jadwal,
                    banksoal: banksoal
                },
                name: 'kelola.analys.capaian.siswa.data' 
            })
        },
        async download() {
            if(!this.jadwal) {
                this.$swal({
                  title: 'Hei!!',
                  text: "Pilih ujian terlebih dahulu",
                  icon: 'error',
                })
                return;
            }
            try {
                let provider = await this.getLinkExcelCapaianSiswa({
                    ujian: this.jadwal,
                    banksoal: this.banksoal_id,
                    jurusan: this.jurusan_download.join(',')
                })

                window.open(provider.data, '_self')
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            await this.getAllUjians()
            await this.allJurusan()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    },
    watch: {
        async jadwal(val) {
            if(val) {
                try {
                    this.getResultBanksoal(val)
                } catch (error) {
                   this.$bvToast.toast(error.message, errorToas()) 
                }
            }
        }
    }
}
</script>