<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Hasil ujian</h4>
                            <div class="small text-muted">Filter dengan jadwal</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <button :disabled="isLoading" v-if="jadwal != 0" class="btn float-right btn-success btn-sm mx-1" @click="$bvModal.show('modal-scoped-download-hasil-ujian')">
                                <i class="flaticon-download"></i>
                                Download hasil ujian
                            </button>
                        </div>
                    </div>
                    <div class="mb-2">
                        <b-form-checkbox switch v-model="isGroup">Gunakan grup</b-form-checkbox>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-3" v-if="ujians">
                            <label><small>Jadwal ujian</small></label>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="flaticon-browser"></i></span>
                                </div>
                                <select class="custom-select" v-model="jadwal">
                                    <option :value="uj.id" v-for="(uj, idx) in ujians" :key="idx">{{ uj.alias }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3" v-if="jurusands && !isGroup">
                            <label><small>Jurusan</small></label>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon2"><i class="flaticon-browser"></i></span>
                                </div>
                                <select class="custom-select" v-model="jurusan_select">
                                    <option :value="jur.id" v-for="(jur, idx) in jurusands" :key="idx">{{ jur.nama }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3" v-if="isGroup">
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
                        <div class="col-sm-6 col-md-3" v-if="isGroup">
                            <label><small>Sub-grup</small></label>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon2"><i class="flaticon-browser"></i></span>
                                </div>
                                <select class="custom-select" v-model="groupChild">
                                    <option :value="gr.id" v-for="(gr, idx) in childs" :key="idx">{{ gr.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <label><small>Per page</small></label>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3"><i class="flaticon-browser"></i></span>
                                </div>
                                <select class="custom-select" v-model="perPage">
                                    <option :value="10" selected>10 /halaman</option>
                                    <option :value="30">30 /halaman</option>
                                    <option :value="50">50 /halaman</option>
                                    <option :value="100">100 /halaman</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr style="border-top: 1.9px dashed #ccc">
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="hasils.data" show-empty>
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" /></b-button>
                            </template>
                            <template v-slot:cell(no)="row">
                                {{ ((page-1)*hasils.per_page) + row.index+1 }}
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <table class="table table-bordered">
                                        <tr>
                                            <td width="200px">Listening</td>
                                            <td>
                                                Salah {{ row.item.jumlah_salah_listening }} : Benar {{ row.item.jumlah_benar_listening }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Pilihan ganda</td>
                                            <td>
                                                Salah {{ row.item.jumlah_salah }} : Benar {{ row.item.jumlah_benar }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Pilihan ganda komplek</td>
                                            <td>
                                                Salah {{ row.item.jumlah_salah_complek }} : Benar {{ row.item.jumlah_benar_complek }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Isian singkat</td>
                                            <td>
                                                Salah {{ row.item.jumlah_salah_isian_singkat }} : Benar {{ row.item.jumlah_benar_isian_singkat }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Menjodohkan</td>
                                            <td>
                                                Salah {{ row.item.jumlah_salah_menjodohkan }} : Benar {{ row.item.jumlah_benar_menjodohkan }}
                                            </td>
                                        </tr>
                                        <tr>
                                          <td>Mengurutkan</td>
                                          <td>
                                            Salah {{ row.item.jumlah_salah_mengurutkan }} : Benar {{ row.item.jumlah_benar_mengurutkan }}
                                          </td>
                                        </tr>
                                        <tr>
                                        <td>Benar/Salah</td>
                                        <td>
                                          Salah {{ row.item.jumlah_salah_benar_salah }} : Benar {{ row.item.jumlah_benar_benar_salah }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Tidak diisi</td>
                                        <td v-text="row.item.tidak_diisi"></td>
                                      </tr>
                                        <tr>
                                            <td>Point esay</td>
                                            <td v-text="row.item.point_esay"></td>
                                        </tr>
                                        <tr>
                                            <td>Point setuju/tidak</td>
                                            <td v-text="row.item.point_setuju_tidak"></td>
                                        </tr>
                                        <tr>
                                            <td>Hasil akhir</td>
                                            <td>
                                              {{ (parseInt(row.item.hasil) + parseInt(row.item.point_setuju_tidak) + parseInt(row.item.point_esay)) }}
                                            </td>
                                        </tr>
                                    </table>
                                </b-card>
                            </template>
                            <template v-slot:cell(action)="row">
                                <b-button size="sm" variant="primary" :to="{ name: 'kelola.hasil.ujian.siswa', params: { id: row.item.id }}">
                                    Detail jawaban
                                </b-button>
                            </template>
                        </b-table>
                    </div>
                    <div class="row" v-if="typeof hasils.data != 'undefined'">
                        <div class="col-md-6">
                            <p>{{ hasils.data.length }} data dari {{ hasils.total }} total hasil ujian</p>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <b-pagination
                                   size="sm"
                                    v-model="page"
                                    :total-rows="hasils.total"
                                    :per-page="hasils.per_page"
                                    aria-controls="products"
                                    v-if="hasils.data && hasils.data.length > 0"
                                    ></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                </div>
            </div>
        </div>
        <b-modal id="modal-scoped-download-hasil-ujian" hide-header>
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
                            <span class="input-group-text" id="basic-addon2"><i class="flaticon-browser"></i></span>
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
import { successToas, errorToas} from '@/entities/notif'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import downloadExcel from 'vue-json-excel';
import { BIconChatLeftText } from 'bootstrap-vue';

export default {
    name: 'DataHasilUjian',
    components: {
        vSelect,
        downloadExcel
    },
    data() {
        return {
            jadwal: 0,
            perPage: 10,
            pageOptions: [40, 100, 200],
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'no', label: '#' },
                { key: 'peserta.no_ujian', label: 'No ujian' },
                { key: 'peserta.nama', label: 'Nama peserta' },
                { key: 'action', label: 'Aksi' },
            ],
            json_fields: {
                'No ujian' : 'peserta.no_ujian',
                'Nama peserta' : 'peserta.nama',
                'PG Salah' : 'jumlah_salah',
                'PG Benar' : 'jumlah_benar',
                'Listening Salah' : 'jumlah_salah_listening',
                'Listening Benar' : 'jumlah_benar_listening',
                'Kosong' : 'tidak_diisi',
                'Point esay' : 'point_esay',
                'Hasil akhir' : 'hasil'
            },
            jurusan_download: 0,
            jurusan_select: 0,
            isGroup: false,
            groupParent: 0,
            groupChild: 0
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('ujian', ['ujianAll','hasilUjian']),
        ...mapState('jurusan', { jurusans: state => state.all_jurusan }),
        ...mapState('grup', ['groups']),
        page: {
            get() {
                return this.$store.state.ujian.page_hasil
            },
            set(val) {
                this.$store.commit('ujian/SET_PAGE_HASIL', val)
            }
        },
        jurusands() {
            if (this.jurusans == '') {
                return []
            }
            const jurusan = this.jurusans.map((item) => item);
            jurusan.push({id: 0, nama: 'Semua Jurusan'})
            return jurusan
        },
        groupping() {
            if (!this.groups) {
                return []
            }
            return this.groups.filter((item) => item.parent_id == 0 || item.parent_id == null)
        },
        childs() {
            if (!this.groups || this.groupParent == 0) {
                return []
            }
            let data = this.groups.filter((item) => item.parent_id == this.groupParent)
            data.push({id: 0, name: 'Semua sub-grup'})
            return data
        },
        ujians() {
            if(!this.ujianAll) {
                return []
            }
            return this.ujianAll
        },
        hasils() {
            if(!this.hasilUjian) {
                return {data: []}
            }
            return this.hasilUjian
        }
    },
    methods: {
        ...mapActions('ujian',['getAllUjians', 'getHasilUjian','getLinkExcelHasilUjian']),
        ...mapActions('grup', ['getAllGroup']),
        ...mapActions('jurusan',['allJurusan']),
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
                let provider = await this.getLinkExcelHasilUjian({
                    ujian: this.jadwal,
                    jurusan: jurusan,
                    group: group,
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
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
        this.allJurusan()
        this.getAllGroup()
    },
    watch: {
        async jadwal(val) {
            if(val != 0) {
                try {
                    let group = 0;
                    if (this.isGroup) {
                        if (this.groupChild == 0) {
                            group = this.groupParent
                        } else {
                            group = this.groupChild
                        }
                    } else [
                        group = ""
                    ]
                    await this.getHasilUjian({
                        id: val,
                        jurusan: this.jurusan_select != '' ? this.jurusan_select : 0,
                        group: group,
                        perPage: this.perPage
                    })
                } catch (error) {
                    this.$bvToast.toast(error.message, errorToas())
                }
            }
        },
        async jurusan_select(v) {
            if(v !== '' && v != null) {
                try {
                    await this.getHasilUjian({
                        id: this.jadwal,
                        jurusan: v,
                        perPage: this.perPage
                    })
                } catch (error) {
                    this.$bvToast.toast(error.message, errorToas())
                }
            }
        },
        page() {
            let group = 0;
            if (this.isGroup) {
                if (this.groupChild == 0) {
                    group = this.groupParent
                } else {
                    group = this.groupChild
                }
            } else {
                group = ""
            }
            this.getHasilUjian({
                id: this.jadwal,
                jurusan: this.jurusan_select,
                group: group,
                perPage: this.perPage
            })
        },
        groupParent(v) {
            let group = 0;
            if (this.isGroup) {
                if (this.groupChild == 0) {
                    group = this.groupParent
                } else {
                    group = this.groupChild
                }
            } else {
                group = ""
            }
            this.getHasilUjian({
                id: this.jadwal,
                jurusan: "",
                group: group,
                perPage: this.perPage
            })
        },
        groupChild(v) {
            let group = 0;
            if (this.isGroup) {
                if (this.groupChild == 0) {
                    group = this.groupParent
                } else {
                    group = this.groupChild
                }
            } else {
                group = ""
            }
            this.getHasilUjian({
                id: this.jadwal,
                jurusan: "",
                group: group,
                perPage: this.perPage
            })
        }
    }
}
</script>
