<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card" style="border: 1.9px solid #2517a3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <router-link :to="{ name: 'ujian.event.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                <button class="btn float-right btn-primary btn-sm mx-1" @click="print"><i class="flaticon2-print"></i> Cetak Kartu Peserta</button>
              </div>
              <br>
              <input type="text" v-model="event" class="form-control" placeholder="Text tambahan">
            </div>
            <div class="card-footer">
              <div class="row justify-content-center">
                <div class="col-md-6" v-if="pesertas.data">
                  <b-pagination
                    class="mr-auto"
                    size="sm"
                    v-model="page"
                    :total-rows="pesertas.total"
                    :per-page="pesertas.per_page"
                    aria-controls="pesertas"
                    v-if="pesertas.data && pesertas.data.length > 0"
                    ></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive-md">
        <div class="paper" id="printKartu">
          <div class="page" >
          	<div class="row" 
			  v-for="(pesertas,index) in data_peserta" 
			  style="page-break-inside: avoid !important;"
			  :key="index"
			>
              <div class="col-md-6" 
			  v-for="peserta in pesertas"
			  :key="peserta.id"
			  >
                <table class="table table-borderless table-sm" style="border: 1px solid #000">
				  <tr>
				    <td colspan="3" style="border-bottom:1px solid #666; padding: 0;">
					  <table width="100%" class="kartu">
					    <tr>
						  <td style="width: 30px">
						    <img 
							v-if="typeof sekolah.value != 'undefined'" 
							:src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" 
							style="max-height: 46px" height="40">
						  </td>
						  <td align="center">
						    <span class="upper"><b>KARTU LOGIN PESERTA</b></span><br> 
						    <span class="upper" v-if="typeof event_jadwal.event != 'undefined'"><b>{{ event_jadwal.event.name }}</b></span>
						    <div v-if="event != ''"><b>{{ event }}</b></div>
						  </td>
						  <td style="width: 30px">&nbsp;</td>
						</tr>
					  </table>
					</td>
				  </tr>
				  <tr><td>No ujian</td><td width="5px">:</td><td v-text="peserta.no_ujian"></td></tr>
				  <tr><td width="125">Nama Peserta</td><td width="1">:</td><td v-text="peserta.nama_peserta"></td></tr>
				  <tr><td>Password</td><td>:</td><td v-text="peserta.password"></td></tr>
				  <tr>
				    <td colspan="3">
                      <table class="table table-bordered">
                        <tr>
                          <td>Tanggal</td>
                          <td>Waktu</td>
                          <td>Ujian</td>
                          <td>Sesi</td>
                        </tr>
                        <template v-for="(jadwal,index) in event_jadwal.jadwal">
                          <tr v-if="checkSesi(peserta, jadwal) != 0" :key="index">
                            <td>{{ jadwal.tanggal }}</td>
                            <td>{{ jadwal.mulai }}</td>
                            <td>{{ jadwal.name }}</td>
                            <td>
                              {{  checkSesi(peserta, jadwal) }}
                            </td>
                          </tr>
                        </template>
                      </table>
					</td>
				  </tr>
                </table>
              </div>
            </div>
		  </div>
        </div>
      </div>
      <div class="row justify-content-center">
		<div class="col-md-4">
		  <div class="card" style="border: 1.9px solid #2517a3">
			<div class="card-body">
			  <div class="d-flex justify-content-between">
			  	<router-link :to="{ name: 'ujian.event.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
			  	<button class="btn float-right btn-primary btn-sm mx-1" @click="print"><i class="flaticon2-print"></i> Cetak Kartu Peserta</button>
			  </div>
			  <br>
			  <input type="text" v-model="event" class="form-control" placeholder="Text tambahan">
			</div>
		    <div class="card-footer">
			  <div class="row justify-content-center">
				<div class="col-md-6" 
				v-if="pesertas.data">
				  <b-pagination
				   class="mr-auto"
				   size="sm"
				   v-model="page"
				   :total-rows="pesertas.total"
				   :per-page="pesertas.per_page"
				   aria-controls="pesertas"
				   v-if="pesertas.data && pesertas.data.length > 0"
				   ></b-pagination>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'KartuPeserat',
  created() {
  this.changeData()
  	this.getDataEventUjianSesi(this.$route.params.event_id)
  },
  data() {
  	return {
  	  event: '',
  	  data_peserta: []
  	}
  },
  computed: {
  	...mapState('setting',{
      sekolah: state => state.set_sekolah
      }),
  	...mapGetters(['isLoading','baseURL']),
  	...mapState('peserta', {
  	  pesertas: state => state.pesertas
  	}),
  	...mapState('sekolah', {
  	  sekolahs: state => state.sekolah
  	}),
  	...mapState('event', ['event_jadwal']),
  	page: {
  	  get() {
  	    return this.$store.state.peserta.page
  	  },
  	  set(val) {
  	    this.$store.commit('peserta/SET_PAGE', val)
  	  }
  	}
  },
  methods: {
  	...mapActions('peserta', ['getPesertas','removePeserta']),
  	...mapActions('sekolah', ['getAllSekolah', ]),
  	...mapActions('event', ['getDataEventUjianSesi']),
  	changeData() {
      this.$store.commit('LOADING_PAGE', true)
  	  this.getPesertas({})
  	  .then((res) => {
        this.$store.commit('LOADING_PAGE', false)
  	    this.data_peserta = this.chunk(this.pesertas.data, 2)
      })
      .catch((e) => {
        this.$store.commit('LOADING_PAGE', false)
      })
  	},
    print() {
      this.$htmlToPaper('printKartu');
    },
    checkSesi(peserta, jadwal) {
      let sesi_jadwal = jadwal.sesi.find((sesi) => { return sesi.peserta.includes(peserta.id) })
	    if(typeof sesi_jadwal != 'undefined') {
		    return sesi_jadwal.sesi;
	    }
	    return 0
    },
    chunk(arr, size) {
	    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => { return arr.slice(i * size, i * size + size) });
    }
  },
  watch: {
	  page() {
	    this.changeData()
	  }
  }
}
</script>
<style lang="css">
  @media print {
    footer {page-break-after: always; }
  	@page {
  	  size: A4;
  	  margin-bottom:60px;
  	  margin-top:40px;
  	  margin-left: 40px;
  	  margin-right: 40px;	  
  	}
  }
  .back {
  	background: #3c4b640d
  }
  .page {
    position: relative;
    width: 21cm;
    min-height: 29cm;
    margin: 0 auto;
    background: #FFF;
    padding: 0.5cm;
    border: 1px solid #2517a3;
  }
  .page * {
    font-family: arial;
    font-size: 11px
  }
</style>