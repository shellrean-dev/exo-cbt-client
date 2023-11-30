<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'banksoal.soal', params: { banksoal_id: $route.params.banksoal_id } }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                    <button class="btn float-right btn-primary btn-sm mx-1" @click="print"><i class="flaticon2-print"></i> Print</button>
                </div>
                <div class="card-body back" id="printSoal">
                	<div class="paper">
						<div class="d-flex">
							<div style="width: 100px">
								<img v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? sekolah.value.logo : '/admin-system/img/logo.jpg'" style="max-width: 100px" alt="Logo">
							</div>
							<div class="flex-fill text-center">
								<div v-for="line in lines" v-html="line"></div>
							</div>
							<div style="width: 100px"></div>
							</div>
							<hr style="height:2px;border:none;color:#333;background-color:#333;margin-bottom: 1px;">
							<hr style="height:1px;border:none;color:#333;background-color:#333;margin-top: 0;">
                		<div class="table-responsive-md">
                		<table class="table table-sm">
							<tr v-for="(soal, index) in soals" :key="soal.id">
								<td>
									<div class="table-responsive-md">
									<table class="table-sm table-mx table-borderless">
										<tr>
											<td width="20px">{{ index+1 }}.</td>
											<td v-html="soal.pertanyaan"></td>
										</tr>
										<tr>
											<td colspan="2">
												<div class="table-responsive-md">
												<table class="table-sm">
													<tr v-for="(jawaban, index) in soal.jawabans" :key="jawaban.id">
														<td width="20px"></td>
														<td style="text-transform: uppercase;" :class="{ 'corect' : jawaban.correct == '1' }"> {{ index | charIndex }} )
															<StarFillineYellow style="height:15px;" v-show="jawaban.correct == '1'"></StarFillineYellow>
														</td>
														<td v-html="jawaban.text_jawaban"></td>
													</tr>
												</table>
												</div>
											</td>
										</tr>
									</table>
									</div>
								</td>
							</tr>
						</table>
						</div>
                	</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	import { successToas, errorToas} from '@/entities/notif'
	import StarFillineYellow from '@/components/icon/StarFillineYellow'

	export default {
		name: 'SoalBanksoal',
		data() {
			return {
				lines: []
			}
		},
		components: {
			StarFillineYellow
		},
		created() {
			this.getAllSoalPaper()
			this.getKopHeader()
		},
		computed: {
	        ...mapGetters(['isLoading']),
			...mapState('setting',{
				sekolah: state => state.set_sekolah,
				}),
			...mapState('soal', {
	            soals: state => state.allSoals
			}),
			page: {
				get() {
					return this.$store.state.soal.page
				},
				set(val) {
					this.$store.commit('soal/SET_PAGE',val)
				}
			}
		},
		filters: {
			charIndex(i) {
				return String.fromCharCode(97 + i)
			}
		},
		methods: {
			...mapActions('soal',['getSoals','getAllSoal','removeSoal']),
			...mapActions('setting', ['getSettingHeaderKop']),
			getAllSoalPaper() {
				this.getAllSoal({ banksoal_id: this.$route.params.banksoal_id })
	            .then(() => {
	                
	            })
	            .catch((error) => {
	            	this.$bvToast.toast(error.message, errorToas())
	            })
			},
			print() {
	            this.$htmlToPaper('printSoal');
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
		}
	}
</script>
<style>
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
	.paper {
		max-width: 1140px;
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
		background: #fff;
		border: 4px double #ccc;
	}
	.back {
		background: #3c4b640d
	}
</style>