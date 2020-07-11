<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'ujian.data' }" class="btn btn-warning btn-sm rounded-0">Kembali </router-link>
					<b-button variant="info" size="sm" squared @click="refreshTable">Refresh</b-button>
				</div>
				<div class="card-body">
					<div class="table-responsive-md">
					<b-table striped hover bordered :busy="isBusy" small :fields="fields" :items="pesertas.data" show-empty>
						<template v-slot:table-busy>
                            <div class="text-center text-warning my-2">
                              <b-spinner class="align-middle"></b-spinner>
                              <strong>Loading...</strong>
                            </div>
                        </template>
                        <template v-slot:cell(status)="row">
                            {{ ( row.item.status_ujian == '0' ? "Masih mengerjakan" : 'Selesai') }}
                        </template>
                        <template v-slot:cell(sisa)="row">
                        	{{ Math.floor(row.item.sisa_waktu/60)+' Menit' }}
                        </template>
					</b-table>
					</div>
				</div>
				<div class="card-footer">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'PesertaUjian',
	created() {
		this.getPesertas(this.$route.params.ujian_id)
	},
	data() {
		return {
			fields: [
				{ key: 'peserta.no_ujian', label: 'No ujian' },
				{ key: 'peserta.nama', label: 'Nama peserta' },
				{ key: 'status', label: 'Status' },
				{ key: 'sisa', label: 'Sisa waktu' }
			],
			isBusy: true
		}
	},
	computed: {
		...mapState('ujian', {
			pesertas: state => state.pesertas
		})
	},
	methods: {
		...mapActions('ujian', ['getPesertas']),
		refreshTable() {
			this.getPesertas(this.$route.params.ujian_id)
		}
	},
	watch: {
		pesertas() {
			this.isBusy = false
		}
	}
}
</script>