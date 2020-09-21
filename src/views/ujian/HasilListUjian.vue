<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'ujian.hasil' }" class="btn btn-warning btn-sm rounded-0">Kembali</router-link>
					<b-button class="float-right" size="sm" squared variant="success">Download hasil excel</b-button>
					<b-button class="float-right mx-1" size="sm" squared variant="danger">Download hasil pdf</b-button>
				</div>
				<div class="card-body">
					<div class="table-responsive-md">
					<b-table striped hover bordered small :fields="fields" :items="hasilUjian.data" :busy="isBusy" show-empty>
						<template v-slot:table-busy>
                            <div class="text-center text-warning my-2">
							  <img src="/img/loader.svg" width="50px" />
                            </div>
                        </template>
                        <template v-slot:cell(aksi)="row">
							<router-link :to="{ name: 'ujian.hasil' }" class="btn btn-sm btn-success rounded-0">
								Analisis peserta
							</router-link>
						</template>
					</b-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'DataListUjian',
	created() {
		this.getHasilPeserta(this.$route.params.jadwal_id)
	},
	data() {
		return {
			fields: [
				{ key: 'peserta.no_ujian', label: 'No ujian'},
				{ key: 'peserta.nama', label: 'Nama peserta'},
				{ key: 'benar', label: 'Jumlah benar'},
				{ key: 'hasil',label: 'Nilai akhir'},
				{ key: 'aksi', label: 'Aksi' }
			],
			isBusy: true
		}
	},
	computed: {
		...mapState('ujian', {
			hasilUjian : state => state.hasilUjian
		})
	},
	methods: {
		...mapActions('ujian',['getHasilPeserta'])
	},
	watch: {
		hasilUjian() {
			this.isBusy = false
		}
	}
}
</script>