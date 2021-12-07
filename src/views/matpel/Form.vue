<template>
	<div>
		<div class="form-group">
			<label>Kode matpel</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.kode_matpel }" placeholder="Kode matpel" v-model="matpel.kode_mapel" autofocus="">
			<p class="text-danger" v-if="errors.kode_mapel">{{ errors.kode_mapel[0] }}</p>
		</div>
		<div class="form-group">
			<label>Nama matpel</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.nama }" placeholder="Nama matpel" v-model="matpel.nama">
			<p class="text-danger" v-if="errors.nama">{{ errors.nama[0] }}</p>
		</div>
		<div class="form-group">
			<label>Tim pengoreksi</label>
			<multiselect 
			v-model="matpel.correctors" 
			tag-placeholder="Cari untuk menambah tim pengoreksi" 
			placeholder="Tambah anggota pengoreksi" 
			label="name" track-by="id" 
			:options="users" 
			:multiple="true" 
			:taggable="true"
			v-if="users"></multiselect>
		</div>
		<div class="form-group">
			<b-form-checkbox v-model="produktif" switch value="1">Matpel khusus</b-form-checkbox>
		</div>
		<div class="form-group" v-show="produktif">
			<label>Jurusan</label>
			<multiselect 
			v-model="matpel.jurusan_id" 
			tag-placeholder="Cari untuk menambah jurusan" 
			placeholder="Tambah jurusan terkait matpel" 
			label="nama" track-by="id" 
			:options="jurusans" 
			:multiple="true" 
			:taggable="true"
			v-if="jurusans"></multiselect>
		</div>
		<div class="form-group">
			<b-form-checkbox v-model="agama" switch value="1">Matpel agama</b-form-checkbox>
		</div>
		<div class="form-group" v-show="agama">
			<label>Agama</label>
			<v-select label="nama" :options="agamas" v-model="matpel.agama_id" :reduce="nama => nama.id"></v-select>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'
import 'vue-select/dist/vue-select.css';
import { generateMatpelCode } from '@/entities/generate'

export default {
	name: 'FormMatpel',
	created() {
		this.gatewayUserCorrectorList()
		this.allJurusan()
		this.getAgamas()
	},
	data() {
		return {
			produktif: false,
			agama: false
		}
	},
	components: {
    	'v-select': vSelect,
    	Multiselect
  	},
	computed: {
		...mapState(['errors']),
		...mapState('matpel', { matpel : state => state.matpel }),
		...mapState('agama',{ agamas: state => state.agamas }),
		...mapState('jurusan', { jurusans: state => state.all_jurusan }),
		...mapState('user', { users: state => state.users })
	},
	methods: {
		...mapActions('jurusan',['allJurusan']),
		...mapActions('agama', ['getAgamas']),
		...mapActions('user',['getUserLists', 'gatewayUserCorrectorList'])
	},
	watch: {
		matpel() {
			if(this.matpel.jurusan_id != 0) {
				this.produktif = 1
			}
			if(this.matpel.agama_id != 0) {
				this.agama = 1
			}
		}
	},
	mounted() {
		if(this.$route.name == 'matpel.add') {
			this.matpel.kode_mapel = generateMatpelCode()
		}
	}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>