<template>
  <div class="container-fluid">
    <div class="row" style="height: 100vh">
      <div class="col-md-6">
        <img src="/img/bg.svg" style="width: 100%;">
      </div> 
      <div class="col-md-6 bg-white" style="height: 100vh;">
        <div style="position: absolute;top: 30%; transform: translateY(-30%)">
          <div >
            <h4>Extraordinary-CBT Login</h4>
          </div>
          <div>
            <div class="alert alert-danger" v-if="errors.invalid">{{ errors.invalid }}</div>
            <p class="text-muted">Selamat datang di aplikasi Extraordinary-CBT. Masukkan email dan password</p>
            <form @submit.prevent="postLogin">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="cil-mood-good"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.email }" type="email" placeholder="Email" v-model="data.email">
              <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend ">
                <span class="input-group-text ">
                  <i class="cil-lock-locked"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.password }" type="password" placeholder="Password" v-model="data.password">
              <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }} </div>
            </div>
            <b-button variant="dark" :disabled="isLoading" type="submit">
              <b-spinner small type="grow" v-show="isLoading"></b-spinner>
              Login
            </b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom text-center text-muted bg-secondary"><a>Extraordinary-CBT</a> {{ version ? version : '' }} &copy; 2020 shellrean.</div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
  data() {
    return {
      data: {
        email: '',
        password: ''
      },
      version: process.env.VUE_APP_VERSION
    }
  },
  created() {
    if (this.isAuth) {
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    ...mapGetters(['isAuth','isLoading']),
    ...mapState(['errors'])
  },
  methods: {
    ...mapActions('auth', ['submit']),
    ...mapActions('user',['getUserLogin']),
    async postLogin() {
      try {
        let provider = await this.submit(this.data)
        if (this.isAuth) {
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        this.$bvToast.toast(error.message, errorToas())
      }
    }
  },
  destroyed() {
    this.getUserLogin()
  }
}
</script>