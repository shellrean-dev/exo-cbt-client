<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'kelola.hasil.ujian' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                </div>
                <div class="card-body back" id="printSoal">
                	<div class="paper">
                		<div class="table-responsive-md">
                		<table class="table table-sm">
							<tr v-for="(jawab, index) in jawaban">
								<td>
									<div class="table-responsive-md">
									<table class="table-sm table-mx table-borderless">
										<tr>
											<td width="20px">{{ index+1 }}.</td>
											<td v-html="jawab.soal.pertanyaan"></td>
										</tr>
										<tr>
											<td colspan="2">
												<div class="table-responsive-md">
												<table class="table-sm">
													<tr v-for="(opsi, index) in jawab.soal.jawabans">
														<td width="20px"></td>
														<td style="text-transform: uppercase;" :class="{ 'corect' : opsi.correct == '1' }"> {{ index | charIndex }} ) 
															<i v-show="opsi.correct == '1'"  class="flaticon-star text-warning"></i> 
															<i v-show="opsi.id == jawab.jawab || jawab.jawab_complex.includes(opsi.id)" class="flaticon-add-label-button text-info"></i>
														</td>
														<td v-html="opsi.text_jawaban"></td>
													</tr>
													<tr v-if="jawab.soal.tipe_soal == '2'">
														<td width="20px">
															<b-badge variant="primary" v-if="jawab.esay_result != '' && jawab.esay_result != null">{{ jawab.esay_result.point }}</b-badge>
														</td>
														<td v-html="jawab.esay"></td>
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
				<div class="card-footer">
					<span><i class="flaticon-star text-warning"></i> Kunci jawaban</span><br />
					<span><i class="flaticon-add-label-button text-info"></i> Jawaban siswa</span>
				</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
	name: 'DetailJawabanSiswa',
	computed: {
		...mapState('ujian', {
			jawaban: state => state.detailJawabanSiswa
		})
	},
	methods: {
		...mapActions('ujian',['getDetailJawabanSiswa'])
	},
	filters: {
        charIndex(i) {
            return String.fromCharCode(97 + i)
        }
    },
	async created() {
		try {
			await this.getDetailJawabanSiswa(this.$route.params.id)
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	}
}
</script>