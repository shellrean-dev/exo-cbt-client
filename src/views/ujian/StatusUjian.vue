<template>
	<div class="row">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-6 col-lg-4">
					<div class="card  mb-3" v-if="jadwals.length > 0">
					  <div class="card-header">TOKEN UJIAN 
					  	<span class="badge badge-light">{{ token.status == 0 ? 'Tidak aktif' :'Aktif' }}</span></div>
					  <div class="card-body text-dark ">
					    <h5 class="card-title">{{ token.token }}</h5>
					    <p class="card-text">Token ini bersifat rahasia, berlaku untuk 15 menit.</p>
					  </div>
					  <div class="card-footer">
					  	<button class="btn btn-sm btn-primary" v-if="token.status == 0" @click="rilis" :disabled="isLoading">Relese token</button>
					  </div>
					</div>
					<div class="alert alert-warning" v-else>
						<strong>Informasi:</strong><br>
						 Tidak ada ujian yang diaktifkan, aktifkan ujian pada menu jadwal ujian
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-4" v-for="jadwal in jadwals">
			<div class="card mb-3">
			  <div class="card-header" v-text="jadwal.alias"></div>
			  <div class="card-body">
			  	<table class="table table-bordered">
			  		<tr>
			  			<td>Tanggal</td>
			  			<td>{{ jadwal.tanggal }}</td>
			  		</tr>
			  		<tr>
			  			<td>Mulai</td>
			  			<td>{{ jadwal.mulai }}</td>
			  		</tr>
			  	</table>
				<div class="input-group">
				  <select class="custom-select" v-model="jadwal.sesi">
				    <option value="1">1</option>
				    <option value="2">2</option>
				    <option value="3">3</option>
				  </select>
				  <div class="input-group-append">
				    <button class="btn btn-secondary" type="button" @click="sesiChange(jadwal.id)" :disabled="isLoading">
				    	Simpan
				    </button>
				  </div>
				</div>
			  </div>
			</div>
		</div>

	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
	name: 'StatusUjian',
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('ujian', {
			jadwals: state => state.ujianActive,
			token: state => state.token
		})
	},
	methods: {
		...mapActions('ujian' ,[
			'getUjianActive', 'changeSesi', 'getToken', 'rilisToken'
		]),
		async rilis() {
			try {
				await this.rilisToken()
				await this.getToken()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async sesiChange(id) {
			try {
				let index = this.jadwals.map(item => item.id).indexOf(id)
				await this.changeSesi({ id: id, data: { sesi: this.jadwals[index].sesi } })
				this.getUjianActive()
				this.$bvToast.toast('Sesi berhasil diubah', successToas())
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())	
			}
		}
	},
	async created() {
		try {
			await this.getUjianActive()
			await this.getToken()
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	}
}
</script>