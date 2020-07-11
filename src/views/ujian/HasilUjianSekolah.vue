<template>
    <div class="c-body" v-if="$role('school')">
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                Hasil ujian
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="input-group mb-3">
                                            <select class="form-control" v-model="banksoal">
                                                <option v-for="banksoal in banksoals" :key="banksoal.id" :value="banksoal.id" v-text="banksoal.kode_banksoal+' ('+banksoal.matpel.nama+')'"></option>
                                            </select>
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-primary" type="button" @click="getDataJadwals">Tampilkan</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive-md">
                                <b-table v-if="ujians && ujians.data" striped hover bordered :busy="isBusy" small :fields="fields" :items="ujians.data" show-empty></b-table>
                            	</div>
								<a :href="'/prev/ujian/hasil/'+sekolah+'/'+banksoal" class="btn btn-success btn-sm mr-1" target="_blank" v-if="ujians && ujians.data && ujians.data != ''">Download excel</a>
                            </div>
							<div class="card-footer">

							</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </main>
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
        this.sekolah = this.$store.state.user.authenticated.sekolah_id
        this.getMyBanksoal()
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
		...mapActions('banksoal', ['getMyBanksoal']),
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