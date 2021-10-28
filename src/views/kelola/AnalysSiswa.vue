<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Capaian peserta ujian
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Capaian peserta ujian</h4>
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
            <div class="mb-2">
                <b-form-checkbox switch v-model="isGroup">Gunakan grup</b-form-checkbox>
            </div>
            <div class="row" v-if="isGroup">
                <div class="col-12 col-md-6" v-if="isGroup">
                    <label><small>Grup</small></label>
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2"><i class="flaticon-browser"></i></span>
                        </div>
                        <select class="custom-select" v-model="groupParent">
                            <option :value="gr.id" v-for="(gr, idx) in groupping" :key="idx">{{ gr.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12 col-md-6" v-if="isGroup">
                    <label><small>Sub-grup</small></label>
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3"><i class="flaticon-browser"></i></span>
                        </div>
                        <select class="custom-select" v-model="groupChild">
                            <option :value="gr.id" v-for="(gr, idx) in childs" :key="idx">{{ gr.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
		    <div class="form-group" v-if="!isGroup">
                <label>Jurusan</label>
                <v-select label="nama" :options="jurusans" multiple v-model="jurusan_download" :reduce="nama => nama.id"></v-select>
            </div>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary"
              @click="download"
              :disabled="isLoading || ((jurusan_download == 0 || jurusan_download == '' || jurusan_download == null) && !isGroup)">
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
            isGroup: false,
            groupParent: 0,
            groupChild: 0
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('ujian', {
            banksoals: state => state.banksoals,
            ujians: state => state.ujianAll
        }),
        ...mapState('grup', ['groups']),
        ...mapState('jurusan', { jurusans: state => state.all_jurusan }),
        jurusands() {
            if (this.jurusans == '') {
                return []
            }
            const jurusan = this.jurusans.map((item) => item);
            jurusan.push({id: 0, nama: 'Semua'})
            return jurusan
        },
        groupping() {
            if (!this.groups) {
                return []
            }
            return this.groups.filter((item) => item.parent_id === 0 || item.parent_id === null)
        },
        childs() {
            if (!this.groups || this.groupParent == 0) {
                return []
            }
            let data = this.groups.filter((item) => item.parent_id == this.groupParent)
            data.push({id: 0, name: 'Semua sub-grup'})
            return data
        },
    },
    methods: {
        ...mapActions('ujian',['getAllUjians','getResultBanksoal', 'downloadExcel','getLinkExcelCapaianSiswa']),
        ...mapActions('jurusan',['allJurusan']),
        ...mapActions('grup', ['getAllGroup']),
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
                let group = 0;
                let jurusan = 0;
                if (this.isGroup) {
                    if (this.groupChild == 0) {
                        group = this.groupParent
                    } else {
                        group = this.groupChild
                    }
                    jurusan = ""
                } else {
                    jurusan = this.jurusan_download.join(",")
                    group = ""
                }

                let provider = await this.getLinkExcelCapaianSiswa({
                    ujian: this.jadwal,
                    banksoal: this.banksoal_id,
                    jurusan: jurusan,
                    group: group
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
            this.getAllGroup()
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
