<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row justify-content-center">
				<div class="col-md-4">
					<div class="card" style="border: 1.2px solid #2517a3">
						<div class="card-body">
							<div class="d-flex justify-content-between mb-4">
								<router-link :to="{ name: 'ujian.event.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
								<button class="btn float-right btn-primary btn-sm mx-1" @click="print"><i class="flaticon2-print"></i> Cetak Berita Acara</button>
							</div>
              <hr>
              <div>
                <div class="form-group">
                  <label for="">Hari Pelaksanaan</label>
                  <input type="text" v-model="hari" class="form-control form-control-sm">
                </div>
                <div class="form-group">
                  <label for="">Tanggal Pelaksanaan</label>
                  <input type="text" v-model="date_exam" class="form-control form-control-sm">
                </div>
                <div class="form-group">
                  <label for="">Bulan Pelaksanaan</label>
                  <input type="text" v-model="month_exam" class="form-control form-control-sm">
                </div>
                <div class="form-group">
                  <label for="">Mata Pelajaran</label>
                  <input type="text" v-model="matpel" class="form-control form-control-sm">
                </div>
                <div class="form-group">
                  <label for="">Dari jam</label>
                  <input type="text" v-model="dari_pukul" class="form-control form-control-sm">
                </div>
                <div class="form-group">
                  <label for="">Sampai jam</label>
                  <input type="text" v-model="sampai_pukul" class="form-control form-control-sm">
                </div>
                <div class="form-group">
                  <label for="">Sesi</label>
                  <input type="text" v-model="sesi" class="form-control form-control-sm">
                </div>
              </div>
						</div>
					</div>
				</div>
			</div>
      <div class="table-responsive-md">
        <div class="paper" id="printBeritaAcara">
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
                <p class="text-uppercase"><strong>BERITA ACARA PELAKSANAAN </strong><br /> <strong>{{ event.name }} </strong><br /><strong>TAHUN PELAJARAN {{ semester }}</strong></p>
              </div>
            </div>
            <section style="line-height: 2;" v-if="typeof sekolah.value != 'undefined'" >
              <p style="line-height: 2; font-size: 20px" class="small">Pada hari ini <u>{{ hari }}</u> tanggal <u>{{ date_exam }}</u> bulan <u>{{ month_exam }}</u> tahun {{ new Date().getFullYear() }}, bertempat di {{ sekolah.value.nama_sekolah}}</p>
              <table class="table table-borderless table-sm small" style="line-height: 2; font-size: 20px">
                <tr>
                  <td width="20px" rowspan="2">
                    1. 
                  </td>
                  <td>
                    <p style="line-height: 2; font-size: 20px" class="small">Telah diselanggarakan {{ event.name }} untuk Mata Pelajaran <u>{{ matpel }}</u> dari pukul <u>{{ dari_pukul }}</u> sampai dengan pukul <u>{{ sampai_pukul }}</u>, sesi <u>{{ sesi }}</u>.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table class="table table-borderless table-sm small" style="line-height: 2; font-size: 20px">
                      <tr>
                        <td width="280px">Ruang</td>
                        <td>: __________________________________________</td>
                      </tr>
                      <tr>
                        <td>Jumlah peserta seharusnya</td>
                        <td>: __________________________________________</td>
                      </tr>
                      <tr>
                        <td>Jumlah Hadir(Ikut Ujian)</td>
                        <td>: __________________________________________</td>
                      </tr>
                      <tr>
                        <td>Jumlah Tidak Hadir</td>
                        <td>: __________________________________________</td>
                      </tr>
                      <tr>
                        <td>No.Peserta yang Tidak Hadir</td>
                        <td>: __________________________________________</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>              
              <table class="table table-borderless table-sm small" style="line-height: 1.6; font-size: 20px">
                <tr>
                  <td width="20px" rowspan="2">
                    2. 
                  </td>
                  <td>
                    <p>Catatan selama pelaksanaan ujian: </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>__________________________________________________________</p>
                    <p>__________________________________________________________</p>
                    <p>__________________________________________________________</p>
                    <p>__________________________________________________________</p>
                    <p>__________________________________________________________</p>
                  </td>
                </tr>
              </table>
              <p style="line-height: 2; font-size: 20px" class="small text-center">Yang membuat berita acara </p>
              <div>
                <table class="table">
                  <tr>
                    <td>
                      <div class="text-center">
                        Pengawas I
                      </div>
                      <table class="table table-sm table-borderless ">
                        <tr>
                          <td>1. Tanda Tangan</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>2. Nama</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>3. NIP</td>
                          <td>__________</td>
                        </tr>
                      </table>
                    </td>
                    <td>
                      <div class="text-center">
                        Pengawas II
                      </div>
                      <table class="table table-sm table-borderless ">
                        <tr>
                          <td>1. Tanda Tangan</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>2. Nama</td>
                          <td>__________</td>
                        </tr>
                        <tr>
                          <td>3. NIP</td>
                          <td>__________</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </section>
            <footer style="line-height: 2;position: absolute; bottom: 0; width: 100%; left: 0">
              <div class="d-flex">
                <div class="border border-dark mr-1" style="width: 20px"></div>
                <div class="border border-dark flex-fill text-center text-uppercase" 
                v-if="typeof sekolah.value != 'undefined'"
                >
                  {{ sekolah.value.nama_sekolah}}
                </div>
                <div class="border border-dark ml-1" style="width: 20px"></div>
              </div>
            </footer>
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
      semester: '',
      event: '',
      hari: 'Senin',
      date_exam: '17',
      month_exam: 'Desember',
      matpel: 'Matematika',
      dari_pukul: '7:00 AM',
      sampai_pukul: '18:00 AM',
      sesi: '1',
      lines: []
    }
  },
  computed: {
    ...mapGetters(['baseURL']),
    ...mapState('setting',{
      sekolah: state => state.set_sekolah,
    }),
  },
  methods: {
    ...mapActions('event', ['getEventById']),
    ...mapActions('setting', ['getSettingHeaderKop']),
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
    print() {
      this.$htmlToPaper('printBeritaAcara');
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
        this.$store.commit('LOADING_PAGE', false)
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
    }
  },
  created() {
    this.getSemester()
    this.getData(this.$route.params.id)
    this.getKopHeader()
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