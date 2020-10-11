<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<button @click="$bvModal.show('modal-scoped')" class="btn btn-sm btn-primary">Tambah jadwal</button>
					<button @click="$bvModal.show('modal-scoped-event')" class="btn btn-sm btn-outline-primary ml-1">Tambah event</button>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Jadwal ujian</h4>
                            <div class="small text-muted">Buat dan aktifkan jadwal ujian</div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-5">
                            <b-form-group
                              label="Filter"
                              label-cols-sm="3"
                              label-align-sm="right"
                              label-size="sm"
                              label-for="filterInput"
                            >
                              <b-input-group size="sm">
                                <b-form-input
                                  v-model="search"
                                  type="search"
                                  id="filterInput"
                                  placeholder="Cari nama ujian"
                                ></b-form-input>
                                <b-input-group-append>
                                  <b-button :disabled="!search" @click="search = ''">Clear</b-button>
                                </b-input-group-append>
                              </b-input-group>
                            </b-form-group>
                            <b-form-group
                              label="Per page"
                              label-cols-sm="6"
                              label-cols-md="4"
                              label-cols-lg="3"
                              label-align-sm="right"
                              label-size="sm"
                              label-for="perPageSelect"
                            >
                              <b-form-select
                                v-model="perPage"
                                id="perPageSelect"
                                size="sm"
                                :options="pageOptions"
                              ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="table-responsive-md" v-if="ujians && typeof ujians.data != 'undefined'">
						<b-table striped hover bordered small :fields="fields" :items="ujians.data" show-empty>
							<template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <div class="table-responsive-md">
                                        <table class="table table-bordered">
                                        	<tr>
                                        		<td width="150px">Event</td>
                                        		<td>{{ typeof row.item.event != 'undefined' ? row.item.event.name : '-' }}</td>
                                        	</tr>
                                        	<tr>
                                        		<td >Banksoal</td>
                                        		<td><b-badge variant="success" class="mr-1" v-for="(kode,index) in row.item.kode_banksoal" v-text="kode" :key="index"></b-badge></td>
                                        	</tr>
                                        	<tr>
                                        		<td>Setting</td>
                                        		<td>
                                        			<b-badge :variant="row.item.setting.acak_soal == '1' ? 'success' : 'dark' " class="mr-1">Acak soal</b-badge>
                                        			<b-badge :variant="row.item.setting.acak_opsi == '1' ? 'success' : 'dark'" class="mr-1">Acak opsi</b-badge>
                                        			<b-badge :variant="row.item.setting.token == '1' ? 'success' : 'dark'" class="mr-1">Token aktif</b-badge>
                                        		</td>
                                        	</tr>
                                        	<tr>
                                        		<td>Urutan</td>
                                        		<td>
                                        			<b-badge variant="primary" class="mr-1" v-for="list in row.item.setting.list" :key="'list_'+list.id">
                                        				{{ list.name }} 
                                        			</b-badge>
                                        		</td>
                                        	</tr>
                                        </table>
                                    </div>
                                </b-card>
                            </template>
							<template v-slot:cell(lama)="row">
								{{ parseInt(row.item.lama)/60+ " Menit" }}
							</template>
							<template v-slot:cell(status)="row">
								<b-form-checkbox v-model="row.item.status_ujian" @change="seterStatus(row.item.id,row.item.status_ujian)" value="1" switch>{{ row.item.status_ujian == 1 ? 'Diujikan' : 'Tidak aktif' }}</b-form-checkbox>
								<b-badge v-if="row.item.server_id != 0" v-for="(server, index) in row.item.server_id" v-text="server" :key="index"></b-badge>
							</template>
							<template v-slot:cell(action)="row">
								<b-button variant="warning" :disabled="isLoading" size="sm" @click="getData(row.item.id)" class="mr-1">
									<i class="cil-pencil"></i> Edit
								</b-button>
								<b-button variant="danger" :disabled="isLoading" size="sm" @click="remove(row.item.id)">
									<i class="cil-trash"></i> Hapus
								</b-button>
							</template>
	                    </b-table>
	                    <div class="row mt-2">
	                        <div class="col-md-6">
	                            <p><i class="fa fa-bars"></i> {{ ujians.data.length }} item dari {{ ujians.total }} total data</p>
	                        </div>
	                        <div class="col-md-6">
	                            <div class="float-right">
	                                <b-pagination 
	                                    size="sm"
	                                    v-model="page"
	                                    :total-rows="ujians.total"
	                                    :per-page="ujians.per_page"
	                                    :disabled="isLoading"
	                                    ></b-pagination>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                    <template v-else>
                        <div class="text-center my-2">
                        	Loading...
                        </div>
                    </template>
				</div>
				<div class="card-footer">
					<strong>Sematic Nama event : </strong> <u>namaEvent tahun</u> <strong>Contoh : </strong> USBN 2020 <br>
					<strong>Sematic Nama ujian : </strong> <u>beri nama sesuai ujian banksoal yang didaftarkan</u> <strong>Contoh : </strong> Matematika Teknik
				</div>
			</div>
		</div>
		 <b-modal id="modal-scoped" noCloseOnBackdrop>
		    <template v-slot:modal-header="{ close }">
		      <h5>Setting ujian</h5>
		    </template>
		    <div class="form-group">
				<label>Event</label>
				<v-select label="name" :options="events" v-model="data.event_id" :reduce="name => name.id"></v-select>
				<small class="text-danger" v-if="errors.event_id">{{ errors.event_id[0] }}</small>
			</div>
		    <div class="form-group">
		    	<label>Banksoal</label>
		    	<div class="text-center text-light my-2" v-show="!banksoals">
				  <b-spinner small type="grow"></b-spinner> Loading...
                </div>
		    	<multiselect 
				v-model="data.banksoal_id" 
				tag-placeholder="Cari untuk menambah banksoal" 
				placeholder="Tambah banksoal" 
				label="kode_banksoal" track-by="id" 
				:options="banksoals" 
				:multiple="true" 
				:taggable="true"
				v-if="banksoals"></multiselect>
		    	<small class="text-danger" v-if="errors.banksoal_id">{{ errors.banksoal_id[0] }}</small>
		    </div>
		    <div class="form-group">
                <label>Nama ujian</label>
                <input type="text" class="form-control" v-model="data.alias" required :class="{ 'is-invalid' : errors.alias }">
                <div class="invalid-feedback" v-if="errors.alias">{{ errors.alias[0] }}</div>
            </div>
		    <div class="form-group">
		    	<label>Tanggal ujian</label>
		    	<datetime inputId="ujian" v-model="data.tanggal" input-class="form-control"></datetime>
		    	<small class="text-danger" v-if="errors.tanggal">{{ errors.tanggal[0] }}</small>
		    </div>
		    <div class="row">
		    	<div class="col-md-6">
		    		<div class="form-group">
				    	<label>Jam mulai</label>
				    	<datetime inputId="mulai" v-model="data.mulai" input-class="form-control" type="time"></datetime>
				    	<small class="text-danger" v-if="errors.mulai">{{ errors.mulai[0] }}</small>
				    </div>
		    	</div>
		    	<div class="col-md-6">
					<div class="form-gorup">
				    	<label>Durasi (menit)</label>
				    	<div class="input-group">
		                    <div class="input-group-prepend" v-show="data.lama > 0">
		                        <button class="btn btn-outline-secondary" type="button" @click="data.lama -= 1"><b>-</b></button>
		                    </div>
				    		<input inputId="durasi" type="number" class="form-control" :class="{ 'is-invalid' : errors.lama }" name="" placeholder="Menit" v-model.number="data.lama">
				    		<div class="input-group-append">
		                        <button class="btn btn-secondary" type="button" @click="data.lama += 1"><b>+</b></button>
		                    </div>
				    	</div>
				    	<div class="invalid-feedback" v-if="errors.lama">{{ errors.lama[0] }}</div>
				    </div>
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<div class="form-group">
		    			<b-form-checkbox switch value="1" v-model="data.setting.acak_soal">Acak Soal</b-form-checkbox>
		    		</div>
		    	</div>
		    	<div class="col-md-4">
		    		<div class="form-group">
		    			<b-form-checkbox switch value="1" v-model="data.setting.acak_opsi">Acak Opsi</b-form-checkbox>
		    		</div>
		    	</div>
		    	<div class="col-md-4">
		    		<div class="form-group">
		    			<b-form-checkbox switch value="1" v-model="data.setting.token">Aktifkan Token</b-form-checkbox>
		    		</div>
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-12">
		    		<label>Urutan ujian tipe</label>
		    	</div>
		    	<div class="col-md-12">	
	               <draggable
	                :list="data.setting.list"
	                class="list-group"
	                ghost-class="ghost"
	                @start="dragging = true"
	                @end="dragging = false"
	              >
	                <div
	                  class="list-group-item"
	                  v-for="element in data.setting.list"
	                  :key="element.id"
	                >
	                  {{ element.name }}
	                </div>
	              </draggable>
		    	</div>
            </div>
		    <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="postUjian" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="close()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>

		<b-modal id="modal-scoped-event">
		    <template v-slot:modal-header="{ close }">
		      <h5>Tambah event ujian</h5>
		    </template>
		    <div class="form-group">
                <label>Nama event</label>
                <input type="text" class="form-control" v-model="event.name" placeholder="Nama & tahun" required>
            </div>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="postEvent" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
	</div>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import vSelect from 'vue-select'
import draggable from 'vuedraggable'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Multiselect from 'vue-multiselect'
import 'vue-select/dist/vue-select.css';
import _ from 'lodash'

export default {
	name: 'DataUjian',
	components: {
	    datetime: Datetime,
	    Multiselect,
	    vSelect,
	    draggable
	},
	created() {
		this.getUjians({ perPage: this.perPage })
		this.getAllBanksoals()
		this.getAllEvents()
	},
	data() {
		return {
			fields: [
				{ key: 'show_details', label: 'Detail' },
				{ key: 'alias', label: 'Nama ujian' },
				{ key: 'tanggal', label: 'Tanggal' },
				{ key: 'mulai', label: 'Waktu mulai' },
				{ key: 'lama', label: 'Durasi' },
				{ key: 'status', label: 'Status jadwal' },
				{ key: 'action', label: 'Aksi' }
			],
			perPage: 20,
            pageOptions: [20, 50, 100],
			search: '',
			data: {
				mulai: '',
				lama: 0,
				tanggal: '',
				banksoal_id: '',
				server_id: '',
				alias: '',
				event_id: '',
				setting: {
					acak_opsi: false,
					acak_soal: false,
					token: false,
					list: [
		                { name: "Listening", id: 3 },
		                { name: "Pilihan ganda", id: 1 },
		                { name: "Esay", id: 2 }
		            ],
				}
			},
			event: {
				name: ''
			},
			spesifik_server: false,
			isActive: '',
			isBusy: true,
			timeout: 0,
			update: 0,
            dragging: false,
            advance: false
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('ujian', {
			ujians: state => state.ujians
		}),
		...mapState('event', { events: state => state.events_all }),
		...mapState('banksoal', {
			banksoals: state => state.allBanksoals
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
		...mapActions('ujian', ['getUjians','addUjian','setStatus','changeToken', 'removeUjian', 'getUjianById', 'updateUjian']),
		...mapActions('event',['addEvent','getAllEvents']),
		...mapActions('banksoal', ['getAllBanksoals']),
		async postUjian() {
			if(this.update != 0) {
				try {
					await this.updateUjian({ id: this.update, data: this.data })
					this.getUjians({ perPage: this.perPage })
					this.$bvModal.hide('modal-scoped')
					this.update = 0
					this.clearForm()
				} catch (error) {
					this.$bvToast.toast(error.message, errorToas())
				}
			}else {
				try {
					await this.addUjian({
						banksoal_id: this.data.banksoal_id,
						alias: this.data.alias,
						mulai: this.data.mulai,
						berakhir: this.data.berakhir,
						lama: this.data.lama,
						tanggal: this.data.tanggal,
						event_id: this.data.event_id,
						setting: this.data.setting
					})

					this.$bvToast.toast('Jadwal berhasil ditambahkan.', successToas())
					this.getUjians({ perPage: this.perPage })
					this.clearForm()
					this.$bvModal.hide('modal-scoped')
				} catch (error) {
					this.$bvToast.toast(error.message, errorToas())
				}
			}
			this.$store.commit('CLEAR_ERRORS')
		},
		postEvent() {
			this.addEvent(this.event)
			.then((response) => {
		        this.$bvToast.toast('Event berhasil ditambahkan.', successToas())
		        this.getAllEvents()
		        this.event.name = ''
				this.$bvModal.hide('modal-scoped-event')
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		clearForm() {
			this.data.banksoal_id = '',
			this.data.mulai = '',
			this.data.berakhir = '',
			this.data.lama = '',
			this.data.tanggal = '',
			this.data.server_id = ''
			this.data.event_id = ''
			this.data.alias = '',
			this.data.setting = {
				acak_opsi: false,
				acak_soal: false,
				token: false,
			}
		},
		seterStatus(id,status) {
			this.setStatus({
				id: id,
				status: (status == 0 ? 1 : 0)
			})
			.then((resp) => {
		        this.$bvToast.toast('Status ujian diubah', successToas())
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		remove(id) {
			this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus seluruh data ujian termasuk nilai, analys capaian siswa yang berkaitan dengan jadwal ujian ini",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeUjian(id)
                    .then((res) => {
                        this.getUjians({ perPage: this.perPage })
                        this.$bvToast.toast('Jadwal ujian berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
		},
		close() {
			this.$bvModal.hide('modal-scoped')
			this.update = 0
			this.clearForm()
			this.$store.commit('CLEAR_ERRORS')
		},
		async getData(id) {
			try {
				let provider = await this.getUjianById(id)
				let dara = provider.banksoal_id.map((item) => {
					return this.banksoals.find(x => x.id == item.id)
				})
				this.data.banksoal_id = dara,
				this.data.mulai = provider.mulai,
				this.data.lama = provider.lama / 60,
				this.data.tanggal = provider.tanggal,
				this.data.event_id = provider.event_id,
				this.data.alias = provider.alias
				this.data.setting = provider.setting
				this.update = id,

				this.$bvModal.show('modal-scoped')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	watch: {
		page() {
			this.getUjians({ search: this.search, perPage: this.perPage })
		},
		search: _.debounce(function (value) {
			this.getUjians({ search: this.search, perPage: this.perPage })
		}, 500),
		ujians() {
			this.isBusy = false
		},
		perPage() {
			this.getUjians({ search: this.search, perPage: this.perPage })
		}
	}
}
</script>
<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>