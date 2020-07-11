<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'matpel.data' }" class="btn btn-light btn-sm">kembali</router-link>
				</div>
				<div class="card-body">
					<matpel-form></matpel-form>
					<div class="form-group">
						<b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
                        <b-spinner small type="grow" v-show="isLoading"></b-spinner>Simpan</b-button>
					</div>
				</div>
				<div class="card-footer"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import FormMatpel from './Form.vue'

export default {
	name: 'AddMatpel',
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['isLoading'])
	},
	methods: {
		...mapActions('matpel',['submitMatpel']),
		submit() {
			this.submitMatpel()
			.then((res) => {
				this.$bvToast.toast('Data mapel berhasil disimpan.', successToas())
				this.$router.push({ name: 'matpel.data' })
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		}
	},
	components: {
		'matpel-form' : FormMatpel
	}
}
</script>