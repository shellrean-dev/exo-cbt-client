<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'peserta.add' }" class="btn btn-primary btn-sm mr-1">Tambah peserta</router-link>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Peserta</h4>
                            <div class="small text-muted">Manage data peserta</div>
                        </div>
                        <div class="d-md-block col-sm-7">
                            <router-link :to="{ name: 'peserta.kartu', params: { 'id': sekolah } }" class="btn float-right btn-primary btn-sm mx-1">
                                <i class="cil-print"></i>
                                Cetak kartu peserta
                            </router-link>
                            <router-link :to="{ name: 'peserta.upload' }" class="btn float-right btn-success btn-sm">
                            	<i class="cil-cloud-upload"></i>
                            	Import peserta
                            </router-link>
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
                                  placeholder="Cari peserta"
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
					<div class="table-responsive-md" v-if="typeof pesertas.data != 'undefined'">
						<b-table 
						striped hover bordered small show-empty 
						:fields="fields" 
						:items="pesertas.data"
						>
							<template v-slot:cell(show_details)="row">
                            	<b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                	<div class="table-responsive-md">
                                	<table class="table table-striped">
                                		<tr>
                                			<td>Password</td>
                                			<td>{{ row.item.password }}</td>
                                		</tr>
                                		<tr>
                                			<td>Agama</td>
                                			<td>{{ row.item.agama.nama }}</td>
                                		</tr>
                                		<tr>
                                			<td>Jurusan</td>
                                			<td>{{ row.item.jurusan.nama }}</td>
                                		</tr>
                                	</table>
                                	</div>
                                </b-card>
                            </template>
							<template v-slot:cell(actions)="row">
                                <b-button variant="warning" class="mr-1" size="sm" :to="{ name: 'peserta.edit', params: { id: row.item.id } }">
                                	<i class="cil-pencil"></i> Edit
                                </b-button>
								<b-button variant="danger" size="sm" @click="deletePeserta(row.item.id)" :disabled="isLoading">
									<i class="cil-trash"></i> Hapus
								</b-button>
							</template>
						</b-table>
						<div class="row">
                            <div class="col-md-6">
                                <p><i class="fa fa-bars"></i> {{ pesertas.data.length }} data dari {{ pesertas.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="pesertas.total"
                                        :per-page="pesertas.per_page"
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
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import _ from 'lodash'

export default {
	name: 'DataPeserat',
	created() {
		this.changeData()
	},
	data() {
		return {
			fields: [
				{ key: 'show_details', label: 'Detail' },
				{ key: 'sesi', label: 'Sesi' },
				{ key: 'no_ujian', label: 'No ujian' },
				{ key: 'nama', label: 'Nama peserta' },
				{ key: 'actions', label: 'Aksi' }
			],
			search: '',
			isBusy: true,
			perPage: 30,
            pageOptions: [30, 80, 160],
			sekolah: 0
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('peserta', {
			pesertas: state => state.pesertas,
		}),
		page: {
			get() {
				return this.$store.state.peserta.page
			},
			set(val) {
				this.$store.commit('peserta/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('peserta', ['getPesertas','removePeserta']),
		changeData() {
			this.getPesertas({
				search: this.search, perPage: this.perPage
			})
		},
		deletePeserta(id) {
			this.$swal({
				title: 'Informasi',
				text: 'Tindakan ini akan menghapus secara permanent!',
				icon: 'warning',
				showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removePeserta(id)
                    .then((provider) => {
                        this.getPesertas({

                        });
                        this.$bvToast.toast('Data peserta berhasil dihapus.', successToas())
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
			this.changeData()
		},
		search:  _.debounce(function (value) {
			this.changeData()
		}, 500),
		perPage() {
            this.changeData()
        }
	}
}
</script>