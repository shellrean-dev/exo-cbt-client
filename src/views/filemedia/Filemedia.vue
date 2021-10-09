<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<div class="d-flex justify-content-between">
						<span>Daftar direktori tersedia</span>
						<button class="btn-sm btn btn-white" title="Informasi" @click="featureInfo('page_filemedia_tabel')"><i class="flaticon-info"></i></button>
                    </div>
				</div>
				<div class="card-body">
					<div class="table-responsive-md" v-if="typeof directories.data != 'undefined'">
            <table class="table table-sm table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Direktori</th>
                  <th>Jumah file</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(directory,index) in directories.data"
                  :key="'directory_file_index_'+index"
                >
                  <td>
                    {{ index + 1}}
                  </td>
                  <td>
                    <router-link :to="{ name: 'filemedia.directory', params: { 'directory_id' : directory.id } }">{{ directory.name }}</router-link>
                  </td>
                  <td>
                    <b-badge class="mr-1">{{ directory.file_count }}</b-badge>
                  </td>
                </tr>
              </tbody>
            </table>
						<div class="row mt-2">
                            <div class="col-md-6">

                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                    	:disabled="isLoading"
                                        size="sm"
                                        v-model="page"
                                        :total-rows="directories.total"
                                        :per-page="directories.per_page"
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
				<div class="card-footer"></div>
			</div>
		</div>
		<b-modal id="modal-feature-info" size="lg">
		    <template v-slot:modal-header="{ close }">
		      <h5>Informasi Fitur</h5>
		    </template>
			<div v-html="feature_info.content"></div>
            <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { BListGroup, BListGroupItem } from 'bootstrap-vue'

export default {
	name: 'DataDirectory',
	components: {
		BListGroup,
		BListGroupItem
	},
	created() {
		this.getDirectories()
	},
	data() {
		return {
			data: {
				nama_directory: ''
			}
		}
	},
	computed: {
		...mapState(['isLoading']),
		...mapState('feature',['feature_info']),
		...mapState('filemedia', {
			directories: state => state.directories
		}),
		page: {
            get() {
                return this.$store.state.filemedia.dir_page
            },
            set(val) {
                this.$store.commit('filemedia/SET_PAGE_DIR', val)
            }
        }
	},
	methods: {
		...mapActions('filemedia',['getDirectories','addDirectory']),
		...mapActions('feature', ['getFeatureInfo']),
		bytesToSize(bytes) {
		   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		   if (bytes == 0) return '0 Byte';
		   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		},
		featureInfo(name) {
			this.getFeatureInfo(name)
			.then(() => {
				this.$bvModal.show('modal-feature-info')
			})
		}
	},
	watch: {
		page() {
			this.getDirectories()
		}
	}
}
</script>
