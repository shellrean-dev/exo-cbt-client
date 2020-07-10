<template>
	<div>
		<div class="form-group">
			<label>Sesi</label>
			<div class="input-group">
				<div class="input-group-prepend" v-show="peserta.sesi > 1">
				    <button class="btn btn-outline-secondary" type="button" @click="peserta.sesi -= 1"><b>-</b></button>
				</div>
				<input type="number" min="1" class="form-control" :class="{'is-invalid' : errors.sesi }" placeholder="Sesi ujian" v-model="peserta.sesi">
				<div class="input-group-append">
			    	<button class="btn btn-secondary" type="button" @click="peserta.sesi += 1"><b>+</b></button>
			  	</div>
			</div>
			<p class="text-danger" v-if="errors.sesi">{{ errors.sesi[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>No ujian</label>
			<input type="text" class="form-control" :class="{'is-invalid' : errors.no_ujian }" placeholder="No ujian" v-model="peserta.no_ujian">
			<p class="text-danger" v-if="errors.no_ujian">{{ errors.no_ujian[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>Nama peserta</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.nama }" placeholder="Nama peserta" v-model="peserta.nama">
		</div>
		<div class="form-group">
			<label>Password</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.password }" placeholder="Password" v-model="peserta.password">
		</div>
		<div class="form-group">
			<label>Jurusan</label>
			<v-select label="nama" :options="jurusans" v-model="peserta.jurusan_id" :reduce="nama => nama.id"></v-select>
		</div>
		<div class="form-group">
			<label>Agama</label>
			<v-select label="nama" :options="agamas" v-model="peserta.agama_id" :reduce="nama => nama.id"></v-select>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
	name: 'FormPeserta',
	components: {
        'v-select': vSelect
    },
    created() {
    	this.allJurusan()
    	this.getAgamas()
    },
	computed: {
		...mapState(['errors']),
		...mapState('peserta', { peserta: state => state.peserta }),
		...mapState('jurusan', { jurusans: state => state.all_jurusan }),
		...mapState('agama', { agamas: state => state.agamas })
	},
	methods: {
		...mapActions('jurusan',['allJurusan']),
		...mapActions('agama',['getAgamas'])
	}
}
</script>