<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					Ujian yang dilaksanakan
				</div>
				<div class="card-body">
					<div class="mb-2">
						<span class="badge badge-light">{{ token.status == 0 ? 'Tidak aktif' :'Aktif' }}</span>
						<h1>{{ token.token }}</h1>
						<button class="btn btn-sm btn-primary" v-if="token.status == 0" @click="rilis" :disabled="isLoading">Relese token</button>
					</div>
					<div class="table-responsive">
						<table class="table table-sm table-bordered table-hover table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Nama ujian</th>
									<th>Tanggal</th>
									<th>Mulai</th>
									<th>Sesi</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(jadwal, index) in jadwals" :key="jadwal.id">
									<td>{{ index+1 }}</td>
									<td>{{ jadwal.alias }}</td>
									<td>{{ jadwal.tanggal }}</td>
									<td>{{ jadwal.mulai }}</td>
									<td>
										<div class="input-group input-group-sm">
											<select class="custom-select" v-model="jadwal.sesi">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
											</select>
											<div class="input-group-append">
												<button class="btn btn-info" type="button" @click="sesiChange(jadwal.id)" :disabled="isLoading">
													Simpan
												</button>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card-footer">
					Silakan ganti sesi untuk mengubah sesi tekan Simpan
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