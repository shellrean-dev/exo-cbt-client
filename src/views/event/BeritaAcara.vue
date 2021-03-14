<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row justify-content-center">
				<div class="col-md-4">
					<div class="card" style="border: 1.9px solid #2517a3">
						<div class="card-body">
							<div class="d-flex justify-content-between">
								<router-link :to="{ name: 'ujian.event.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
								<button class="btn float-right btn-primary btn-sm mx-1" @click="print"><i class="flaticon2-print"></i> Cetak Berita Acara</button>
							</div>
						</div>
					</div>
				</div>
			</div>
      <div class="table-responsive-md">
        <div class="paper" id="printBeritaAcara">
          <div class="page">
            <div class="d-flex mb-3">
              <div>
                <img v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-height: 46px" alt="Logo">
              </div>
              <div class="flex-fill text-center">
                <h4>BERITA ACARA PELAKSANAAN <br /> <span class="text-uppercase">{{ event.name }}</span> <br />TAHUN PELAJARAN {{ semester }}</h4>
              </div>
              <div>
                <img 
                :src="'/img/logo.jpg'" style="max-height: 46px" alt="Logo">
              </div>
            </div>
            <section style="line-height: 2;" v-if="typeof sekolah.value != 'undefined'" >
              <p style="line-height: 2; font-size: 20px" class="small">Pada hari ini __________ tanggal ___________ bulan ____________ tahun {{ new Date().getFullYear() }}, bertempat di {{ sekolah.value.nama_sekolah}}</p>
              <table class="table table-borderless table-sm small" style="line-height: 2; font-size: 20px">
                <tr>
                  <td width="20px" rowspan="2">
                    1. 
                  </td>
                  <td>
                    <p style="line-height: 2; font-size: 20px" class="small">Telah diselanggarakan {{ event.name }} untuk Mata Pelajaran _____________________ dari pukul ______________ sampai dengan pukul _________________, sesi _________________.</p>
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
              <table class="table table-borderless table-sm small" style="line-height: 2; font-size: 20px">
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
                    <p>_________________________________________________________________________________________________________</p>
                    <p>_________________________________________________________________________________________________________</p>
                    <p>_________________________________________________________________________________________________________</p>
                    <p>_________________________________________________________________________________________________________</p>
                    <p>_________________________________________________________________________________________________________</p>
                  </td>
                </tr>
              </table>
              <p style="line-height: 2; font-size: 20px" class="small">Yang membuat berita acara </p>
              <table class="table table-borderless table-sm small" style="line-height: 2; font-size: 20px">
                <tr>
                  <td width="20px" rowspan="2">
                    1. 
                  </td>
                  <td width="100px">
                    Pengawas I
                  </td>
                  <td>
                    _____________________________
                  </td>
                  <td rowspan="2">
                    1. _____________________________
                  </td>
                </tr>
                <tr>
                  <td>
                    NIP
                  </td>
                  <td>
                    _____________________________
                  </td>
                </tr>
                <tr>
                  <td width="20px" rowspan="2">
                    2. 
                  </td>
                  <td>
                    Pengawas II
                  </td>
                  <td>
                    _____________________________
                  </td>
                  <td rowspan="2">
                    2. _____________________________
                  </td>
                </tr>
                <tr>
                  <td>
                    NIP
                  </td>
                  <td>
                    _____________________________
                  </td>
                </tr>
              </table>
            </section>
            <footer style="line-height: 2;position: absolute; bottom: 0; width: 100%; left: 0">
              <div class="d-flex">
                <div class="border border-dark mr-1" style="width: 20px"></div>
                <div class="border border-dark flex-fill text-center">
                  SMK LETRIS INDONESIA
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
export default {
  data() {
    return {
      semester: '',
      event: ''
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
  },
  created() {
    this.getSemester()
    this.getData(this.$route.params.id)
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