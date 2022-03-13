<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<div class="d-flex justify-content-between">
						<span>Ujian yang dilaksanakan</span>
						<button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_status_ujian_table')"><i class="flaticon-info"></i></button>
                    </div>
				</div>
				<div class="card-body">
					<div class="mb-2">
						<table class="table table-sm table-borderless">
							<tr>
								<td width="150px">Token</td>
								<td><strong>{{ token.token }}</strong></td>
							</tr>
							<tr>
								<td>Status</td>
								<td>{{ token.status == 0 ? 'Tidak aktif' :'Aktif' }}</td>
							</tr>
							<tr>
								<td>Aksi</td>
								<td>
									<button class="btn btn-sm btn-primary" v-if="token.status == 0" @click="rilis" :disabled="isLoading">&#9745; Relese token</button>
								</td>
							</tr>
						</table>
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
		<b-modal id="modal-feature-info" size="lg">
		    <template v-slot:modal-header="{ close }">
		      <h5>Informasi Fitur</h5>
		    </template>
				<template v-if="_is_feature_info">

			<div v-html="feature_info.content"></div></template>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
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
		...mapState('feature',['feature_info']),
		...mapState('ujian', {
			jadwals: state => state.ujianActive,
			token: state => state.token
		}),
		_is_feature_info() {
            if(typeof this.feature_info != 'undefined') {
                return true
            }
            return false
        }
	},
	methods: {
		...mapActions('ujian' ,[
			'getUjianActive', 'changeSesi', 'getToken', 'rilisToken'
		]),
		...mapActions('feature', ['getFeatureInfo']),
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
		},
		featureInfo(name) {
			this.getFeatureInfo(name)
			.then(() => {
				this.$bvModal.show('modal-feature-info')
			})
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