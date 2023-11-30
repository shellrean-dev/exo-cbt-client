<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<router-link to="/filemedia" class="btn btn-light btn-sm">Kembali</router-link>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
							<div class="custom-file">
								<input type="file" class="custom-file-input" @change="onFileChange">
								<label class="custom-file-label">{{ label ? label : 'Pilih File...' }}</label>
							</div>
							<div class="input-group-append">
								<button class="btn btn-primary" type="button" @click="uploadFile" :disabled="isLoading">
									{{ isLoading ? 'Loading..' : 'Upload' }}
								</button>
							</div>
							</div>
						</div>
					</div>
					<div class="row mt-2">
						<template v-if="contentDirectory && typeof contentDirectory.data != 'undefined'">
							<div class="col-md-12">
								<div class="table-responsive-md">
									<b-table 
									striped hover bordered small show-empty
									:fields="fields" 
									:items="contentDirectory.data"
									selectable
									@row-selected="onRowSelected"
									ref="selectableTable"
									selected-variant="danger"
									>
										<template v-slot:cell(no)="row">
											{{ ((page-1)*contentDirectory.per_page) + row.index+1}}
										</template>
										<template v-slot:cell(view)="row">
											<img :src="row.item.path" class="img-thumbnail" style="max-width: 50px">
										</template>
										<template v-slot:cell(link)="row">
											<code>{{ row.item.filename }}</code>
										</template>
										<template v-slot:cell(actions)="row">
											<b-button @click="removeFilemediaa(row.item.id)" variant="danger" size="sm" :disabled="isLoading" ><i class="flaticon2-trash"></i> Hapus</b-button>
										</template>
									</b-table>
								</div>
							</div>
	  						<div class="col-md-12">
								<div class="row">
									<div class="col-md-6">
										<div class="btn-group" role="group" aria-label="Basic example">
											<b-button variant="outline-dark" size="sm" @click="selectAllRows">
												<i class="flaticon-list-3"></i> Select all
											</b-button>
											<b-button variant="outline-dark" size="sm" @click="clearSelected">
												<i class="flaticon2-reload"></i> Clear selected
											</b-button>
											<b-button variant="outline-danger" size="sm" @click="bulkRemove">
												<i class="flaticon2-trash"></i> Bulk remove
											</b-button>
										</div>
										<p><i class="fa fa-bars"></i> <b>{{ contentDirectory.data.length }}</b> data dari <b>{{ contentDirectory.total }}</b> total data</p>
									</div>
									<div class="col-md-6">
										<div class="float-right">
											<b-pagination
												v-model="page"
												size="sm"
												:total-rows="contentDirectory.total"
												:per-page="contentDirectory.per_page"
												></b-pagination>
										</div>
									</div>
								</div>
	  						</div>
	  					</template>
  					</div>
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

export default {
	data() {
		return {
			label: '',
			image: '',
			isBusy: true,
			fields: [
               { key: 'no', label: '#'},
			   { key: 'view', label: 'Gambar'},
			   { key: 'link', label: 'Filename' },
               { key: 'actions', label: 'Aksi' } 
			],
			selected: []
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('filemedia', {
			contentDirectory: state => state.contentFilemedia
		}),
		page: {
            get() {
                return this.$store.state.filemedia.page
            },
            set(val) {
                this.$store.commit('filemedia/SET_PAGE', val)
            }
        }
	},
	methods: {
		...mapActions('filemedia',['getContentFilemedia','addFilemedia','removeFilemedia','removeMultipleFilemedia']),
		async changeData() {
			try {
				this.$store.commit('LOADING_PAGE', true)
				await this.getContentFilemedia(this.$route.params.directory_id)
				this.$store.commit('LOADING_PAGE', false)
			} catch (error) {
				this.$store.commit('LOADING_PAGE', false)
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		onRowSelected(items) {
            this.selected = items
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        bulkRemove() {
			this.$swal({
                title: 'Informasi',
                text: "Pastikan tidak ada soal yang menggunakan file media yang dipilih!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
					this.removeMultipleFilemedia(this.selected.map((item) => item.id).join(','))
                    .then((res) => {
						this.changeData()
						this.selected = []
                        this.$bvToast.toast('Filemedia berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
				}
			})
		},
		removeFilemediaa(id) {
			this.$swal({
                title: 'Informasi',
                text: "Pastikan tidak ada soal yang menggunakan file media ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeFilemedia(id)
                    .then((res) => {
                        this.changeData()
                        this.$bvToast.toast('Filemedia berhasil dihapus.', successToas())
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                }
            })
		},
		onFileChange(e) {
			this.label = e.target.files[0].name
            this.image = e.target.files[0]
		},
		uploadFile() {
			let formData = new FormData()
			formData.append('directory_id', this.$route.params.directory_id)
            formData.append('image',this.image)
            this.addFilemedia(formData)
            .then(() => {
            	this.changeData()
            	this.label = ''
            	this.image = ''
		        this.$bvToast.toast('Filemedia berhasil ditambahkan.', successToas())
           	})
           	.catch((error) => {
           		this.$bvToast.toast(error.message, errorToas())	
           	})
		}
	},
	created() {
		this.changeData();
	},
	watch: {
        page() {
            this.changeData()
        },
        matpels() {
            this.isBusy = false
        }
    },
}
</script>