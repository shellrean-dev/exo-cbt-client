<template>
	<div>
		Processing Autentication <b-spinner small type="grow" v-show="isLoading"></b-spinner>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
	name: 'Oauth',
	computed: {
		...mapGetters(['isAuth','isLoading']),
	},
	methods: {
		...mapActions('auth', ['oauth']),
		...mapActions('user',['getUserLogin']),
	},
	async created() {
	    if (this.isAuth) {
	     	this.$router.push({ name: 'home' })
	    }
	    try {
	    	let provider = await this.oauth(this.$route.params.token)
	    	if(this.isAuth) {
	    		this.$router.push({ name: 'home' })
	    	}
	    } catch (error) {
	    	this.$bvToast.toast(error.message, errorToas())
	    }
	},	
	destroyed() {
   		this.getUserLogin()
  	}
}
</script>