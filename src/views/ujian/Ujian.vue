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
							<template v-slot:cell(lama)="row">
								{{ parseInt(row.item.lama)/60+ " Menit" }}
							</template>
							<template v-slot:cell(banksoals)="row">
								<b-badge variant="success" class="mr-1" v-for="(kode,index) in row.item.kode_banksoal" v-text="kode" :key="index"></b-badge>
							</template>
							<template v-slot:cell(status)="row">
								<b-form-checkbox v-model="row.item.status_ujian" @change="seterStatus(row.item.id,row.item.status_ujian)" value="1" switch>{{ row.item.status_ujian == 1 ? 'Diujikan' : 'Tidak aktif' }}</b-form-checkbox>
								<b-badge v-if="row.item.server_id != 0" v-for="(server, index) in row.item.server_id" v-text="server" :key="index"></b-badge>
							</template>
							<template v-slot:cell(action)="row">
								<b-button variant="danger" :disabled="isLoading" size="sm" @click="remove(row.item.id)">Hapus</b-button>
							</template>
	                    </b-table>
	                    <div class="row">
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
		 <b-modal id="modal-scoped">
		    <template v-slot:modal-header="{ close }">
		      <h5>Setting ujian</h5>
		    </template>
		    <div class="form-group">
				<label>Event</label>
				<v-select label="name" :options="events" v-model="data.event_id" :reduce="name => name.id"></v-select>
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
		    	<div class="invalid-feedback" v-if="errors.banksoal_id">{{ errors.banksoal_id[0] }}</div>
		    </div>
		    <div class="form-group">
                <label>Nama ujian</label>
                <input type="text" class="form-control" v-model="data.alias" required>
            </div>
		    <div class="form-group">
		    	<label>Tanggal ujian</label>
		    	<datetime inputId="ujian" v-model="data.tanggal" input-class="form-control" :class="{ 'is-invalid' : errors.tanggal }"></datetime>
		    	<div class="invalid-feedback" v-if="errors.tanggal">{{ errors.tanggal[0] }}</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-6">
		    		<div class="form-group">
				    	<label>Jam mulai</label>
				    	<datetime inputId="mulai" v-model="data.mulai" input-class="form-control" :class="{ 'is-invalid' : errors.mulai }" type="time"></datetime>
				    	<div class="invalid-feedback" v-if="errors.mulai">{{ errors.mulai[0] }}</div>
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
		    <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="postUjian" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
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
	    vSelect
	},
	created() {
		this.getUjians({ perPage: this.perPage })
		this.getAllBanksoals()
		this.getAllEvents()
	},
	data() {
		return {
			fields: [
				{ key: 'banksoals', label: 'Kode banksoal' },
				{ key: 'event.name', label: 'Event' },
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
				event_id: ''
			},
			event: {
				name: ''
			},
			spesifik_server: false,
			isActive: '',
			isBusy: true,
			timeout: 0
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
		...mapActions('ujian', ['getUjians','addUjian','setStatus','changeToken', 'removeUjian']),
		...mapActions('event',['addEvent','getAllEvents']),
		...mapActions('banksoal', ['getAllBanksoals']),
		postUjian() {
			this.addUjian({
				banksoal_id: this.data.banksoal_id,
				server_id: this.data.server_id,
				alias: this.data.alias,
				mulai: this.data.mulai,
				berakhir: this.data.berakhir,
				lama: this.data.lama,
				tanggal: this.data.tanggal,
				event_id: this.data.event_id
			})
			.then((response) => {
		        this.$bvToast.toast('Jadwal berhasil ditambahkan.', successToas())
				this.getUjians({ perPage: this.perPage })
				this.clearForm()
				this.$bvModal.hide('modal-scoped')
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>