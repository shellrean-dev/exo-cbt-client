<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					Daftar direktori tersedia
				</div>
				<div class="card-body">
					<div class="table-responsive-md" v-if="typeof directories.data != 'undefined'">
						<b-list-group>
						  <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(directory,index) in directories.data" :key="index">
						    <router-link :to="{ name: 'filemedia.directory', params: { 'directory_id' : directory.id } }">{{ directory.name }}</router-link> 
						    <div>
								<b-badge class="mr-1">{{ directory.file_count }}</b-badge>
								<b-badge variant="primary">{{ bytesToSize(directory.size) }}</b-badge>
						    </div>
						  </b-list-group-item>
						</b-list-group>
						<div class="row mt-2">
                            <div class="col-md-6">

                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
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
			</div>
		</div>
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
		...mapState('filemedia', {
			directories: state => state.directories
		}),
		page: {
            get() {
                return this.$store.state.filemedia.page
            },
            set(val) {
                this.$store.commit('filemedia/SET_PAGE_DIR', val)
            }
        }
	},
	methods: {
		...mapActions('filemedia',['getDirectories','addDirectory']),
		bytesToSize(bytes) {
		   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		   if (bytes == 0) return '0 Byte';
		   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}
	}
}
</script>