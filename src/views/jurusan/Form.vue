<template>
	<div>
    <div class="form-group">
      <label>Kode jurusan</label>
      <input type="text" class="form-control" :class="{ 'is-invalid' : errors.nama }" placeholder="Kode jurusan" v-model="jurusan.kode">
      <p class="text-danger" v-if="errors.kode">{{ errors.kode[0] }}</p>
    </div>
		<div class="form-group">
			<label>Nama jurusan</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.nama }" placeholder="Nama jurusan" v-model="jurusan.nama">
			<p class="text-danger" v-if="errors.nama">{{ errors.nama[0] }}</p>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	name: 'FormJurusan',
	computed: {
		...mapState(['errors']),
		...mapState('jurusan', {
			jurusan : state => state.jurusan
		}),
	}
}
</script>
