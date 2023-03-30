<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card" style="border: 1.2px solid #2517a3">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-4">
                                <router-link :to="{ name: 'ujian.event.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                                <button class="btn float-right btn-primary btn-sm mx-1" @click="print"><i class="flaticon2-print"></i> Cetak Absensi</button>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label for="">Tanggal Pelaksanaan</label>
                                    <input type="text" v-model="date_exam" class="form-control form-control-sm">
                                </div>
                                <div class="form-group">
                                    <label for="">Ruang Pelaksanaan</label>
                                    <input type="text" v-model="room_exam" class="form-control form-control-sm">
                                </div>
                                <div class="form-group">
                                    <label for="">Mata pelajaran</label>
                                    <input type="text" v-model="matpel_exam" class="form-control form-control-sm">
                                </div>
                                <div class="form-group">
                                    <label for="">Waktu Pelaksanaan</label>
                                    <input type="text" v-model="time_exam" class="form-control form-control-sm">
                                </div>
                                <div class="form-group">
                                    <label for="">Waktu Pelaksanaan</label>
                                    <select v-model="sesi" class="form-control form-control-sm">
                                        <option :value="1">1</option>
                                        <option :value="2">2</option>
                                        <option :value="3">3</option>
                                        <option :value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive-md">
                <div class="paper" id="printAbsensi">
                    <div class="page">
                        <div class="d-flex">
                            <div style="width: 100px">
                                <img v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-width: 100px" alt="Logo">
                            </div>
                            <div class="flex-fill text-center">
                                <div v-for="line in lines" v-html="line"></div>
                            </div>
                            <div style="width: 100px"></div>
                        </div>
                        <hr style="height:2px;border:none;color:#333;background-color:#333;margin-bottom: 1px;">
                        <hr style="height:1px;border:none;color:#333;background-color:#333;margin-top: 0;">
                        <div class="d-flex mb-3">
                            <div class="flex-fill text-center">
                                <p class="text-uppercase"><strong>DAFTAR HADIR </strong><br /> <strong>{{ event.name }} </strong><br /><strong>TAHUN PELAJARAN {{ semester }}</strong></p>
                            </div>
                        </div>
                        <table class="table table-borderless table-sm" style="font-size: 8px !important;">
                            <tr>
                                <td style="width: 100px;">TANGGAL</td>
                                <td>: {{ date_exam }}</td>
                            </tr>
                            <tr>
                                <td>RUANG</td>
                                <td>: {{ room_exam }}</td>
                            </tr>
                            <tr>
                                <td>MATA PELAJARAN</td>
                                <td>: {{ matpel_exam }}</td>
                            </tr>
                            <tr>
                                <td>WAKTU</td>
                                <td>: {{ time_exam }}</td>
                            </tr>
                            <tr>
                                <td>SESI</td>
                                <td>: {{ sesi }}</td>
                            </tr>
                        </table>
                        <table class="table table-bordered table-sm small" style="font-size: 9px !important;">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>NO UJIAN</th>
                                    <th>NAMA</th>
                                    <th>TANDA TANGAN</th>
                                    <th>KETERANGAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="peserta, index in pesertas">
                                    <td style="width: 10px;">{{ index+1 }}</td>
                                    <td>{{ peserta.no_ujian }}</td>
                                    <td>{{ peserta.nama }}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions  } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    data() {
        return {
            lines: [],
            semester: '',
            event: '',
            pesertas: [],
            date_exam: '',
            room_exam: '',
            matpel_exam: '',
            time_exam: '',
            sesi: 1
        }
    },
    computed: {
        ...mapGetters(['baseURL']),
        ...mapState('setting',{
          sekolah: state => state.set_sekolah,
        }),
    },
    methods: {
        ...mapActions('event', ['getEventById', 'getPesertaInSesi']),
        ...mapActions('setting', ['getSettingHeaderKop']),
        print() {
            this.$htmlToPaper('printAbsensi');
        },
        getSemester() {
            var d = new Date();
            var n = d.getMonth();
            var year = d.getFullYear();
            if (n < 6) {
                this.semester = `${year-1}/${year}`
            } else {
                this.semester = `${year}/${year+1}`
            }
        },
        async getKopHeader() {
            try {
                let network = await this.getSettingHeaderKop()
                if(network.data) {
                let data = JSON.parse(network.data.value == null || network.data.value == '' ? '[]' : network.data.value)
                    if(data.length > 1) {
                        this.lines = data
                    }
                }
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
        async getData(id) {
            try {
                this.$store.commit('LOADING_PAGE', true)
                let provider = await this.getEventById(id)
                this.event = {
                    name: provider.name
                }
                this.$store.commit('LOADING_PAGE', false)
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            } finally {
                this.$store.commit('LOADING_PAGE', false)
            }
        },
        async gettPesertaSesi(sesi) {
            try {
                this.$store.commit('LOADING_PAGE', true)
                let network = await this.getPesertaInSesi({
                    jadwal: this.$route.params.id,
                    sesi: sesi
                })
                this.pesertas = network
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            } finally {
                this.$store.commit('LOADING_PAGE', false)
            }
        }
    },
    created() {
        this.getSemester()
        this.getKopHeader()
        this.gettPesertaSesi(this.sesi)
        this.getData(this.$route.params.event_id)
    },
    watch: {
        sesi(val) {
            this.gettPesertaSesi(val)
        }
    }
}
</script>

<style lang="css">
	.page {
	  position: relative;
	  width: 21cm;
	  min-height: 29cm;
	  margin: 0 auto;
	  background: #FFF;
	  padding: 0.5cm;
	  border: 1px solid #2517a3;
    border-radius: 3px;
	}
  .small {
    font-size: 14px !important;
  }
</style>