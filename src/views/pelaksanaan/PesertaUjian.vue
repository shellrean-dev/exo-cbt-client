<template>
	<div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <span>Peserta ujian</span>
                        <button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_jurusan_tabel')"><i class="flaticon-info"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Status ujian peserta</h4>
                            <div class="small text-muted">Reset dan force close ujian peserta</div>
                        </div>
                        <div class="d-md-block col-sm-7">
                            <b-button variant="primary" class="float-right" size="sm" @click="refresh" :disabled="isLoading" v-if="jadwal != 0 && jadwal != ''">
                                <i class="flaticon-refresh"></i> Refresh data
                            </b-button>
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
                                  placeholder="Cari no ujian"
                                ></b-form-input>
                                <b-input-group-append>
                                  <b-button :disabled="!search" @click="search = ''">Clear</b-button>
                                </b-input-group-append>
                              </b-input-group>
                            </b-form-group>
                            <b-form-group
                              label="Jadwal ujian"
                              label-cols-sm="6"
                              label-cols-md="4"
                              label-cols-lg="3"
                              label-align-sm="right"
                              label-size="sm"
                              label-for="perPageSelect"
                            >
                              <select class="form-control form-control-sm" v-model="jadwal">
                                  <option :value="jadwal.id" v-for="jadwal in jadwals" :key="jadwal.id">{{ jadwal.alias }}</option>
                              </select>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="table-responsive-md">
                        <b-table 
                        striped 
                        hover 
                        bordered 
                        small 
                        :fields="fields" 
                        :items="filteredList" 
                        show-empty
                        selectable
                        @row-selected="onRowSelected"
                        ref="selectableTable"
                        selected-variant="danger"
                        >
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm"
                                v-if="[0,3].includes(parseInt(row.item.status_ujian))"
                                @click="row.toggleDetails" 
                                :variant="row.detailsShowing ? 'danger' : 'info'"><i 
                                :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'"
                                /></b-button>
                            </template>
                            <template v-slot:cell(no)="row">
                                {{ row.index+1 }}
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <b-input-group size="sm" v-if="[0,3].includes(parseInt(row.item.status_ujian))">
                                                <b-form-input
                                                placeholder="Waktu dalam menit"
                                                v-model="row.item.addTime"
                                                ></b-form-input>
                                                <b-input-group-append>
                                                <b-button @click="addMoreTime(row.item.addTime, row.item.peserta_id); row.item.addTime = ''" :disabled="isLoading">Tambah</b-button>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </div>
                                    </div>
                                </b-card>
                            </template>
                            <template v-slot:cell(status)="row">
                                {{ getText(row.item.status_ujian) }}
                                <b-button variant="danger" :disabled="isLoading" class="mr-1" size="sm" @click="forceClose(row.item.peserta_id)" 
                                v-if="row.item.status_ujian == 3">
                                    Force close
                                </b-button>
                                <b-button variant="outline-danger" :disabled="isLoading" size="sm" @click="resetPeserta(row.item.peserta_id)">
                                    Reset ujian
                                </b-button>
                            </template>
                        </b-table>
                        <div class="row mt-2" v-if="typeof filteredList != 'undefined' ">
                            <div class="col-md-6">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <b-button variant="outline-dark" size="sm" @click="selectAllRows">
                                        <i class="flaticon-list-3"></i> Select all
                                    </b-button>
                                    <b-button variant="outline-dark" size="sm" @click="clearSelected">
                                        <i class="flaticon2-reload"></i> Clear selected
                                    </b-button>
                                    <b-button variant="outline-danger" size="sm" @click="bulkResetUjian">
                                        <i class="flaticon2-trash"></i> Bulk reset ujian
                                    </b-button>
                                    <b-button variant="outline-danger" size="sm" @click="bulkForceClose">
                                        <i class="flaticon2-trash"></i> Bulk force close
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
export default {
    name: 'PesertaUjian',
    data() {
        return {
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'no', label: '#'},
                { key: 'no_ujian', label: 'No ujian', sortable: true },
                { key: 'nama', label: 'Nama peserta', sortable: true },
                { key: 'mulai_ujian', label: 'Mulai ujian', sortable: true },
                { key: 'status', label: 'Status', sortable: true }
            ],
            jadwal: 0,
            search: '',
            textStatus: {
                '0': 'Belum mulai',
                '3': 'Sedang mengerjakan',
                '1': 'Test selesai'
            },
            selected: []
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('feature',['feature_info']),
        ...mapState('ujian', {
            jadwals: state => state.ujianActive,
            pesertas: state => state.pesertas
        }),
        filteredList() {
            if(this.pesertas) {
                return this.pesertas.filter(post => {
                    return post.no_ujian.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    },
    methods: {
        ...mapActions('ujian', ['getPesertas', 'resetUjianPeserta', 'selesaiUjianPeserta', 'getUjianActive','addMoreTimeUjianSiswa', 'multiResetUjianPeserta']),
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
        bulkResetUjian() {
            this.$swal({
                title: 'Reset ujian',
                text: 'Ujian akan direset pada peserta yang dipilih',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c9c9ca',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await this.multiResetUjianPeserta({
                            jadwal: this.jadwal,
                            ids: this.selected.map((item) => item.peserta_id).join(',')
                        })
                        this.selected = []
                        this.getPesertas(this.jadwal)
                        this.$bvToast.toast('Ujian berhasil direset', successToas())
                    } catch (error) {
                        this.$bvToast.toast(error.message, errorToas())
                    }
                }
            })
        },
        bulkForceClose() {

        },
        async resetPeserta(id) {
            if(this.jadwal == 0) {
                this.$swal({
                  title: 'Hei!!',
                  text: "Pilih jadwal dulu",
                  icon: 'error',
                })
                return
            }
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus seluruh data ujian siswa, termasuk nilai siswa jika telah di selesaikan sebelumnya.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await this.resetUjianPeserta({id: id, jadwal: this.jadwal})
                        this.getPesertas(this.jadwal)
                        this.$bvToast.toast('Ujian peserta berhasil direset', successToas())
                    } catch (error) {
                        this.$bvToast.toast(error.message, errorToas())
                    }
                }
            })
        },
        async forceClose(id) {
            if(this.jadwal == 0) {
                this.$swal({
                  title: 'Hei!!',
                  text: "Pilih jadwal dulu",
                  icon: 'error',
                })
                return
            }
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menyelesaikan ujian siswa pada jadwal ini, dan mengenerate nilai.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await this.selesaiUjianPeserta({id: id, jadwal: this.jadwal })
                        this.getPesertas(this.jadwal)
                        this.$bvToast.toast('Ujian peserta berhasil ditutup paksa', successToas())
                    } catch (error) {
                        this.$bvToast.toast(error.message, errorToas())
                    }
                }
            })
        },
        addMoreTime(minutes, peserta_id) {
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menambah waktu pengerjaan siswa, pastikan waktu yang ditambahkan tidak melebihi waktu ujian.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        const network = await this.addMoreTimeUjianSiswa({
                            minutes: parseInt(minutes),
                            peserta_id: peserta_id,
                            jadwal_id: this.jadwal
                        })
                        this.$bvToast.toast(network.message, successToas())
                    } catch (error) {
                        this.$bvToast.toast(error.message, errorToas())
                    }
                }
            })
        },
        refresh() {
            if(this.jadwal == 0) {
                return;
            }
            this.getPesertas(this.jadwal)
        },
        getText(i) {
            return this.textStatus[parseInt(i.trim())]
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
            await this.getUjianActive()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    },
    watch: {
        async jadwal() {
            if(this.jadwal != 0 || this.jadwal != '') {
                try {
                    await this.getPesertas(this.jadwal)
                } catch (error) {
                    this.$bvToast.toast(error.message, errorToas())
                }
            }
        },
        search() {

        }
    }
}
</script>