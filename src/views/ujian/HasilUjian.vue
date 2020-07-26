<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					List jadwal
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-5">
							<div class="input-group mb-3">
								<select class="form-control" v-model="banksoal">
									<option v-for="banksoal in banksoals" :key="banksoal.id" :value="banksoal.id" v-text="banksoal.kode_banksoal+'-'+banksoal.matpel.nama"></option>
								</select>
							</div>
							<div class="input-group mb-3">
								<select class="form-control" v-model="sekolah">
									<option v-for="sekolah in sekolahs.data" :key="sekolah.id" :value="sekolah.id" v-text="sekolah.nama"></option>
								</select>
							</div>
							<div class="input-group mb-3">
								<button class="btn btn-primary btn-sm rounded-0 mr-1" type="button" @click="getDataJadwals">Tampilkan</button>
								<a :href="'/prev/ujian/hasil/'+sekolah+'/'+banksoal" class="btn btn-success btn-sm rounded-0 mr-1" target="_blank">Download excel</a>
								<a href="" class="btn btn-success btn-sm rounded-0">Analisis data</a>
							</div>
						</div>
					</div>
					<div class="table-responsive-md">
					<b-table v-if="ujians && ujians.data" striped hover bordered :busy="isBusy" small :fields="fields" :items="ujians.data" show-empty>
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
import { mapActions, mapState, mapMutations } from 'vuex'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
	name: 'DataUjian',
	components: {
	    datetime: Datetime
	},
	created() {
		this.getAllBanksoals()
		this.getSekolah()
	},
	data() {
		return {
			fields: [
				{ key: 'nama', label: 'Nama' },
				{ key: 'salah', label: 'Salah' },
				{ key: 'benar', label: 'Benar'},
				{ key: 'kosong', label: 'Kosong' },
				{ key: 'hasil', label: 'Hasil'}
			],
			search: '',
			isBusy: true,
			banksoal: '',
			sekolah: ''
		}
	},
	computed: {
		...mapState(['errors']),
		...mapState('ujian', {
			ujians: state => state.ujians
		}),
		...mapState('banksoal', {
			banksoals: state => state.allBanksoals.data
		}),
		...mapState('sekolah', {
			sekolahs: state => state.sekolah
		}),
		page: {
			get() {
				return this.$store.state.ujian.page
			},
			set(val) {
				this.$store.commit('ujian/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('ujian', ['getHasilUjianByFilter']),
		...mapActions('banksoal', ['getAllBanksoals']),
		...mapMutations(['CLEAR_ERROR', 'SET_LOADING']),
		...mapActions('sekolah', ['getSekolah', ]),
		getDataJadwals() {
			this.isBusy = true
			this.getHasilUjianByFilter({
				banksoal: this.banksoal,
				sekolah: this.sekolah
			})
		}
	},
	watch: {
		page() {
			this.getUjianByBanksoal(this.banksoal)
		}
	}
}
</script>