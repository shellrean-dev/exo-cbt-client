<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'banksoal.data' }" class="btn btn-light btn-sm mr-1 mt-1">Kembali</router-link>
                    <router-link :to="{ name: 'banksoal.soal.tambah', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-primary mr-1 btn-sm mt-1">Tambah soal</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Soal</h4>
                            <div class="small text-muted">Tambah lihat edit dan hapus soal pada banksoal dipilih </div>
                        </div>
                        <div class="d-md-block col-sm-7">
                            <router-link :to="{ name: 'banksoal.prev', params: { 'banksoal_id' : $route.params.banksoal_id }}" class="btn float-right btn-primary btn-sm mx-1">
                                <i class="flaticon-suitcase"></i>
                                Preview banksoal
                            </router-link>
                            <router-link :to="{ name: 'banksoal.upload' }" class="btn float-right btn-outline-success btn-sm">
                                <i class="flaticon-upload-1"></i>
                                Import soal
                            </router-link>
                            <router-link :to="{ name: 'banksoal.soal.paste', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-outline-primary btn-sm  mx-1 float-right">
                                <i class="flaticon-file-2"></i> Paste soal
                            </router-link>
                        </div>
                    </div>
                    <br>
                    <div class="row ">
                        <div class="col-md-4">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="flaticon-search"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="search" placeholder="Cari pertanyaan">
                                    <div class="input-group-append">
                                    <button class="btn btn-secondary" :disabled="!search" @click="search = ''" type="button">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-md-4">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="flaticon-browser"></i></span>
                                </div>
                                <select class="custom-select" v-model="perPage">
                                    <option :value.int="10" selected>10 /halaman</option>
                                    <option :value.int="30">30 /halaman</option>
                                    <option :value.int="50">50 /halaman</option>
                                    <option :value.int="100">100 /halaman</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-md-4">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="flaticon-questions-circular-button"></i></span>
                                </div>
                                <select class="custom-select">
                                    <option :value.int="10" selected>Pilihan ganda</option>
                                    <option :value.int="30">Pilihan ganda kompleks</option>
                                    <option :value.int="50">Listening</option>
                                    <option :value.int="100">Menjodohkan</option>
                                    <option :value.int="100">Isian singkat</option>
                                    <option :value.int="100">Uraian</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr style="border-top: 1.9px dashed #ccc">
                    <template v-if="soals && typeof soals.data != 'undefined'">
                        <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="soals.data" show-empty>
                        	<template v-slot:cell(index)="data">
    				        	{{ from+data.index }}
    				      	</template>
                            <template v-slot:cell(tipe)="row">
                               <b-badge variant="light"> {{ tipeSoal(row.item.tipe_soal) }}</b-badge>
                            </template>
                        	<template v-slot:cell(dibuat)="row">
                                {{ row.item.created_at }}
                            </template>
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" /></b-button>
                            </template>
            				<template v-slot:row-details="row">
    					        <b-card style="border:1px dashed #00f;">
                                  <div v-if="row.item.direction != null" class="mb-3">
                                    <strong>Direction</strong><br>
                                    <audio-player :file="baseURL+'/storage/audio/'+row.item.direction"></audio-player>
                                  </div>
    					          <div v-html="row.item.pertanyaan"></div>
    					          <div v-if="row.item.audio != null" class="mb-2">
                                    <audio-player :file="baseURL+'/storage/audio/'+row.item.audio"></audio-player>
                                </div>
    					          <table class="table" v-if="row.item.jawabans != ''">
    					          	<tr v-for="(jawab, index) in row.item.jawabans" :key="index">
                                        <td width="20px">
                                            <i class="flaticon2-correct text-success" v-show="jawab.correct == '1'"></i>
                                            <i class="flaticon2-hexagonal text-danger" v-show="jawab.correct == '0'"></i>
                                        </td>
    					          		<td>
    					          			<div v-html="jawab.text_jawaban"></div>
    					          		</td> 
    					          	</tr>
    					          </table>
                                  <table v-show="row.item.tipe_soal == 2 && row.item.rujukan != '<p></p>'">
                                      <tr>
                                          <td v-html="row.item.rujukan"></td>
                                      </tr>
                                  </table>
    					        </b-card>
    					    </template>

                           <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'banksoal.soal.edit', params: {soal_id: row.item.id, banksoal_id: row.item.banksoal_id} }" class="btn btn-sm btn-warning mr-1" >
                                	<i class="flaticon-edit"></i> Edit
                                </router-link>
                                <button class="btn btn-danger btn-sm  " @click="deleteBanksoal(row.item.id)" :disabled="isLoading"><i class="flaticon2-trash"></i> Hapus</button>
                            </template>
                        </b-table>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p v-if="soals.data"><i class="fa fa-bars"></i> {{ soals.data.length }} item dari {{ soals.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="soals.total"
                                        :per-page="soals.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="text-center my-2">
                            Loading...
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
import { mapActions, mapState, mapGetters } from 'vuex'
import AudioPlayer from '../../components/AudioPlayer.vue'
import { successToas, errorToas} from '@/entities/notif'
import _ from 'lodash'

export default {
	name: 'SoalBanksoal',
    components: {
        AudioPlayer
    },
	created() {
		this.getAllSoal({ perPage: this.perPage })
	},
	data() {
		return {
			fields: [
				{ key: 'index', label: 'Nomor' },
                { key: 'show_details', label: 'Detail'},
                { key: 'tipe', label: 'Tipe soal'},
				{ key: 'dibuat', label: 'Dibuat pada'},
				{ key: 'actions', label: 'Aksi'}
			],
            perPage: 10,
            pageOptions: [10, 25, 50],
			search: '',
            isBusy: true
		}
	},
	computed: {
        ...mapGetters(['isLoading', 'baseURL']),
		...mapState('soal', {
            soals: state => state.soals,
            from: state => state.from
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
	methods: {
		...mapActions('soal',['getSoals','removeSoal']),
		getAllSoal(payload) {
			this.getSoals({ search: payload.search, perPage: payload.perPage, banksoal_id: this.$route.params.banksoal_id })
            .then(() => {
                this.isBusy = false
            })
		},
		deleteBanksoal(id) {
			this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus secara permanent!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c9c9ca',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeSoal(id)
                    .then((res) => {
                        this.getAllSoal({ search: this.search, perPage: this.perPage })
                        this.$bvToast.toast('Data soal berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
		},
        tipeSoal(i) {
            let index = ['Pilihan ganda','Esay','Listening', 'Pilihan ganda kompleks']
            return index[i-1]
        }
	},
	watch: {
        page() {
            this.getAllSoal({ search: this.search, perPage: this.perPage })
        },
        search: _.debounce(function (value) {
            this.getAllSoal({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getAllSoal({ search: this.search, perPage: this.perPage })
        }
    },
    destroyed() {
        this.$store.state.soal.soals = {}
    }
}
</script>