<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'peserta.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
					<a :href="'/download/format-peserta-import.xlsx'" class="btn btn-primary btn-sm" download>
						<i class="flaticon-download"></i> Download format
					</a>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
							  <div class="custom-file">
							    <input type="file" class="custom-file-input" @change="onFileChange">
							    <label class="custom-file-label">{{ label ? label : 'Pilih file excel...' }}</label>
							  </div>
							  <div class="input-group-append">
							    <button class="btn btn-primary" type="button" :disabled="isLoading" @click="uploadFile">{{ isLoading ? 'Processing...' : 'Upload' }}</button>
							  </div>
							</div> <br>
							<b-progress :value="percent" show-progress animated></b-progress>
						</div>
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
			allow: ['xlsx','xls'],
			label: '',
			file: ''
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('peserta', {
			percent: state => state.uploadPercentage
		})
	},
	methods: {
		...mapActions('peserta', ['uploadPeserta']),
		onFileChange(e) {
			this.label = e.target.files[0].name
			this.file = e.target.files[0]
		},
		uploadFile() {
			let exten = this.label.substring(this.label.lastIndexOf('.') + 1); 
			if(!this.allow.includes(exten)) {
				this.$bvToast.toast('Hanya format excel yang diizinkan', errorToas())
				return
			}

			let formData = new FormData()
			formData.append('file',this.file)
			this.uploadPeserta(formData)
			.then((res) => {
				this.file = ''
				this.label = ''
		        this.$bvToast.toast('Peserta berhasil diimport.', successToas())
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		}
	}
}
</script>