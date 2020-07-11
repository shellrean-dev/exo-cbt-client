<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<h1 class="border-primary text-primary" style="max-width: 220px; text-align: center;">DG5GC</h1>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Status ujian</h4>
                            <div class="small text-muted">Atur sesi dan banksoal aktif dan rilis token agar token dapat digunakan</div>
                        </div>
                    </div>
                    <br>
                    <template>
                    	<div class="row">
                    		<div class="col-md-5">
		                    	<div class="form-group">
		                    		<label>Sesi</label>
		                    		<select class="form-control form-control" v-model="diujikan.sesi" required>
		                    			<option v-for="(sesi,index) in sesis" :value="sesi.sesi" :key="'ses_'+index">{{ sesi.sesi }}</option>
									</select>
		                    	</div>
		                    	<div class="form-group">
		                    		<label>Ujian</label>
		                    		<select class="form-control form-control" v-model="diujikan.jadwal">
		                    			<option v-for="ujian in ujians" :value="ujian.id">
											{{ ujian.alias }}
										</option>
									</select>
		                    	</div>
		                    	<div class="form-group">
		                    		<label>Token</label>
		                    		<div class="input-group">
		                    			<input type="text" readonly="" class="form-control" 
		                    			:value="((diujikan.status_token == 1) ? 
		                    			diujikan.token + ' | 15 Menit' : '-')">
		                    			<div class="input-group-append" v-show="diujikan.status_token == 0">
						                    <b-button variant="dark" type="button" @click="ubahToken">Rilis token</b-button>
						                </div>
								    </div>
		                    	</div>
		                    	<div class="form-group">
		                    		<b-button variant="primary" @click="postStatus"><i class="cil-save"></i> Simpan</b-button>
		                    	</div>
                    		</div>
                    	</div>
                    </template>
                </div>
                <div class="card-footer">
                	
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
	name: 'UjianSatus',
	data() {
		return {
			timeout: 0,
		}
	},
	async created() {
		try {
			await this.getUjianDiujian()
			this.getUjianActive()
			this.getSesi()

		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	computed: {
		...mapState('ujian', {
			diujikan: state => state.diujikan,
			ujians: state => state.ujianActive,
			sesis: state => state.sesis
		})
	},
	methods: {
		...mapActions('ujian', ['getUjianDiujian','getUjianActive', 'getSesi', 'saveStatus', 'rilisToken', 'changeToken']),
		postStatus() {
			this.saveStatus()
			.then((res) => {
		        this.$bvToast.toast('Ujian aktif disimpan.', successToas())
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		async ubahToken() {
			try {
				await this.rilisToken()
				this.$bvToast.toast('Token berhasil dirilis.', successToas())
				this.getUjianDiujian()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	watch: {
		async timeout() {
			try {
				await this.changeToken()

				this.getUjianDiujian()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	mounted() {
		// setInterval(() => { this.timeout ++ }, 15 * 60000);
		// setInterval(() => { this.timeout ++ }, 5000);
	}
}
</script>