<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<b-button variant="primary" size="sm" @click="$bvModal.show('modal-scoped-event')">
						Tambah event ujian
					</b-button>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-5">
							<h4 class="card-title mb-0">Manage event ujian</h4>
							<div class="small text-muted">
								Buat Edit Hapus event ujian
							</div>
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
                                  placeholder="Cari nama event ujian"
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
					<div class="table-responsive-md" v-if="events && typeof events.data != 'undefined'">
						<b-table striped hover bordered small :fields="fields" :items="events.data" show-empty>
							<template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" /></b-button>
                            </template>
							<template v-slot:row-details="row">
								<b-card>
									<div class="table-responsive-md">
										<table class="table table-bordered">
											<tr>
												<th>No</th>
												<th>Nama ujian</th>
												<th>Tanggal</th>
												<th>Mulai</th>
												<th>Aksi</th>
											</tr>
											<tr v-for="(ujian,nomer) in row.item.ujians" :key="ujian.id">
												<td>{{ nomer + 1 }}</td>
												<td>{{ ujian.alias }}</td>
												<td>{{ ujian.tanggal }}</td>
												<td>{{ ujian.mulai }}</td>
												<td>
													<b-button variant="primary" size="sm" class="mr-1" @click="aturSesi(ujian.id,ujian.alias)"><i class="flaticon-clock-2"></i> Atur sesi</b-button>
													<b-button variant="success" size="sm" @click="importSesi(ujian.id,ujian.alias)"><i class="flaticon-upload-1"></i> Import sesi</b-button>
												</td>
											</tr>
										</table>
									</div>
								</b-card>
							</template>
							<template v-slot:cell(action)="row">
								<b-button variant="light" size="sm" class="mr-1" @click="downloadBeritaAcara(row.item.id)" :disabled="isLoading">
									<i class="flaticon-download"></i> Berita acara
								</b-button>
								<b-button variant="warning" size="sm" class="mr-1" @click="getData(row.item.id)" :disabled="isLoading">
									<i class="flaticon-edit"></i> Edit
								</b-button>
								<b-button variant="info" size="sm" class="mr-1" :to="{ name: 'ujian.event.peserta', params: { event_id: row.item.id} }" :disabled="isLoading">
									<i class="flaticon-profile-1"></i> Kartu Peserta
								</b-button>
								<b-button variant="danger" size="sm" @click="remove(row.item.id)" :disabled="isLoading">
									<i class="flaticon2-trash"></i> Hapus
								</b-button>
							</template>
						</b-table>
						<div class="row mt-2">
	                        <div class="col-md-6">
	                            <p><i class="fa fa-bars"></i> {{ events.data.length }} event dari {{ events.total }} total data event</p>
	                        </div>
	                        <div class="col-md-6">
	                            <div class="float-right">
	                                <b-pagination 
	                                    size="sm"
	                                    v-model="page"
	                                    :total-rows="events.total"
	                                    :per-page="events.per_page"
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
					
				</div>
			</div>
		</div>
		<b-modal id="modal-scoped-event" noCloseOnBackdrop>
		    <template v-slot:modal-header="{ close }">
		      <h5>Tambah event ujian</h5>
		    </template>
		    <div class="form-group">
                <label>Nama event</label>
                <input type="text" class="form-control" v-model="event.name" placeholder="Nama Event Ujian" required>
            </div>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="close" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-sesi" noCloseOnBackdrop :title="current.name" size="xl">
			<b-button size="sm" class="mb-2" variant="success" @click="copySesi" :disabled="isLoading">
				Copy sesi dari default
		    </b-button>
			<div>
				<b-tabs content-class="mt-3">
					<b-tab title="Sesi 1" active lazy>
						<EventSesi sesi="1" :jadwal="current.ujian_id"/>
					</b-tab>
					<b-tab title="Sesi 2" lazy><EventSesi sesi="2" :jadwal="current.ujian_id" /></b-tab>
					<b-tab title="Sesi 3" lazy><EventSesi sesi="3" :jadwal="current.ujian_id" /></b-tab>
					<b-tab title="Sesi 4" lazy><EventSesi sesi="4" :jadwal="current.ujian_id" /></b-tab>
				</b-tabs>
			</div>
			<template v-slot:modal-footer="{ cancel }">
				<b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        	Tutup
		      	</b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-import-sesi" :title="current.name" noCloseOnBackdrop>
			<div class="form-group">
				<div class="input-group">
					<div class="custom-file">
						<input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon04" @change="onFileChange">
						<label class="custom-file-label" for="inputGroupFile04">{{ label ? label : 'Pilih file excel...' }}</label>
					</div>
					<div class="input-group-append">
						<button class="btn btn-success" type="button" :disabled="isLoading" @click="submitImportSesi">{{ isLoading ? 'Processing...' : 'Upload' }}</button>
					</div>
				</div>
				<a :href="baseURL+`/download/format-sesi-import.xlsx`" download>Download format</a>
			</div>
			<template v-slot:modal-footer="{ cancel }">
				<b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        	Tutup
		      	</b-button>
		    </template>
		</b-modal>
	</div>
</template>
<script>
import EventSesi from '@/components/ujian/EventSesi'

import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import { BTabs, BTab } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'DataEventUjian',
	components: {
		BTabs, BTab,EventSesi
	},
	data() {
		return {
			fields: [
				{ key: 'show_details', label: 'Detail' },
				{ key: 'name', label: 'Nama event' },
				{ key: 'action', label: 'Aksi' }
			],
			perPage: 10,
            pageOptions: [10, 40, 80],
            search: '',
            update: 0,
            event: {
            	name: ''
            },
			current: {
				ujian_id: ''
			},
			file: '',
			label: ''
		}
	},
	computed: {
		...mapState(['isLoading','baseURL']),
		...mapState('event', {
			events: state => state.events
		}),
		page: {
			get() {
				return this.$store.state.event.page
			},
			set(val) {
				this.$store.commit('event/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('event', ['getEvents','addEvent', 'getEventById', 'updateEvent', 'removeEvent', 'importToSesi', 'copySesiFromDefault', 'getLinkPDFBeritaAcara']),
		close() {
			this.$bvModal.hide('modal-scoped-event')
			this.update = 0
			this.event.name = ''
		},
		async getData(id) {
			try {
				let provider = await this.getEventById(id)

				this.event = {
					name: provider.name
				}
				this.update = id
				this.$bvModal.show('modal-scoped-event')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submit() {
			try {
				if(this.update == 0) {
					await this.addEvent(this.event)
				} else {
					await this.updateEvent({
						id: this.update,
						data: this.event
					})
				}
				this.update = 0
				this.event.name = ''
				this.$bvModal.hide('modal-scoped-event')
				await this.getEvents({ perPage: this.perPage })
				this.$bvToast.toast('Data event berhasil disimpan', successToas())
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		remove(id) {
			this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus data event dan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeEvent(id)
                    .then((res) => {
                        this.getEvents({ perPage: this.perPage })
                        this.$bvToast.toast('Event ujian berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
		},
		copySesi() {
			this.$swal({
                title: 'Informasi',
                text: "Sesi yang telah di set akan digantikan oleh sesi default, anda masih bisa merubah sesi ini setelah penyalinan selesai.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
				if (result.value) {
					this.copySesiFromDefault(this.current.ujian_id)
					.then((res) => {
                        this.$bvModal.hide('modal-sesi');
                        this.$bvToast.toast('Sesi telah berhasil disalin dari default.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
				}
			})	
		},
		aturSesi(id,name){
			this.current.ujian_id = id
			this.current.name = name
			this.$bvModal.show('modal-sesi');
		},
		importSesi(id,name) {
			this.current.ujian_id = id
			this.current.name = name
			this.$bvModal.show('modal-import-sesi')
		},
		onFileChange(e) {
			this.label = e.target.files[0].name
			this.file = e.target.files[0]
		},
		submitImportSesi() {
			let formData = new FormData()
			formData.append('file',this.file)
			this.importToSesi({
				j: this.current.ujian_id,
				data: formData
			})
			.then((res) => {
				this.file = ''
				this.label = ''
				this.$bvModal.hide('modal-import-sesi')
				this.$bvToast.toast('Sesi ujian siswa berhasil diimport.', successToas())
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		async downloadBeritaAcara(id) {
			try {
				let provider = await this.getLinkPDFBeritaAcara(id)
                window.open(provider.data, '_self')
			} catch(e) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	async created() {
		try {
			let provider = await this.getEvents({ perPage: this.perPage })
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	watch: {
		page() {
            this.getEvents({ search: this.search, perPage: this.perPage })
        },
        search:  _.debounce(function (value) {
            this.getEvents({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getEvents({ search: this.search, perPage: this.perPage })
        }
	}
}
</script>