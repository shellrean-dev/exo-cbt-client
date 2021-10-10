<template>
      <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
      <div class="c-sidebar-brand"><img class="c-sidebar-brand-full" v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-height: 46px" alt="Logo"><img class="c-sidebar-brand-minimized" v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.jpg'" style="max-height: 46px" alt="Logo"></div>
      <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" to="/"
          :class="[currentPage.includes('home') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i>
            Dashboard
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu utama</li>
        <li class="c-sidebar-nav-item" v-if="user.role != 'guru'">
          <router-link class="c-sidebar-nav-link" :to="{  name: 'sekolah.setting' }"
          :class="[currentPage.includes('sekolah.setting') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i> Informasi instansi
          </router-link>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-if="user.role != 'guru'">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="mr-3 flaticon2-drop"></i> Data master
          </a>

          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'peserta.data' }"
              :class="[currentPage.includes('peserta.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Peserta
              </router-link>
            </li>
            <li class="c-sidebar-nav-item" >
              <router-link class="c-sidebar-nav-link" :to="{ name: 'grup.data' }"
              :class="[currentPage.includes('grup.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Grup-peserta
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'jurusan.data' }"
              :class="[currentPage.includes('jurusan.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Jurusan
              </router-link>
            </li>
            <li class="c-sidebar-nav-item" >
              <router-link class="c-sidebar-nav-link" :to="{ name: 'matpel.data' }"
              :class="[currentPage.includes('matpel.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Matpel
              </router-link>
            </li>
            <li class="c-sidebar-nav-item" >
              <router-link class="c-sidebar-nav-link" :to="{ name: 'guru.data' }"
              :class="[currentPage.includes('guru.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> User
              </router-link>
            </li>
            <li class="c-sidebar-nav-item" >
              <router-link class="c-sidebar-nav-link" :to="{ name: 'agama.data' }"
              :class="[currentPage.includes('agama.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Agama
              </router-link>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="mr-3 flaticon2-drop"></i> Banksoal
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'banksoal.data' }"
              :class="[currentPage.includes('banksoal.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Standard
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <span class="c-sidebar-nav-link">
                <span class="c-sidebar-nav-icon"></span> Adaptif <span class="badge badge-info">Comming soon</span>
              </span>
            </li>
            <li class="c-sidebar-nav-item">
              <span class="c-sidebar-nav-link">
                <span class="c-sidebar-nav-icon"></span> Stream <span class="badge badge-info">Comming soon</span>
              </span>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-if="user.role != 'guru'">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="mr-3 flaticon2-drop"></i> Ujian
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.event.data' }"
              :class="[currentPage.includes('ujian.event.data') ? activeClass : '']">
                <i class="c-sidebar-nav-icon"></i>Event ujian
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.data' }"
              :class="[currentPage.includes('ujian.data') ? activeClass : '']">
                <i class="c-sidebar-nav-icon"></i>Jadwal ujian
              </router-link>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'filemedia.data' }"
          :class="[currentPage.includes('filemedia.data') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i>File media
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu ujian</li>
        <li class="c-sidebar-nav-item" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.status' }"
          :class="[currentPage.includes('ujian.status') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i>
            Status ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.peserta' }"
          :class="[currentPage.includes('ujian.peserta') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i>
            Status peserta
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" v-if="typeof ujian.value != 'undefined' && ujian.value.reset">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'peserta.reset' }"
          :class="[currentPage.includes('peserta.reset') ? activeClass : '']">
            <i class="mr-3 flaticon-folder"></i>
            Reset login peserta
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu pengolahan</li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'kelola.koreksi.esay' }"
          :class="[currentPage.includes('kelola.koreksi.esay') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i> Koreksi esay
          </router-link>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-if="user.role != 'guru'">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="mr-3 flaticon2-drop"></i>Reporting
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'kelola.analys.capaian.siswa' }"
              :class="[currentPage.includes('kelola.analys.capaian.siswa') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Capaian siswa
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'kelola.analys.banksoal' }"
              :class="[currentPage.includes('kelola.analys.banksoal') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Kesulitan soal
              </router-link>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item" v-if="user.role != 'guru'">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'kelola.hasil.ujian' }"
          :class="[currentPage.includes('kelola.hasil.ujian') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i>Hasil ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" v-if="user.role != 'guru'">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'system.setting' }"
          :class="[currentPage.includes('ksystem.setting') ? activeClass : '']">
            <i class="mr-3 flaticon2-drop"></i>Setting
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="#" @click.prevent="logout">
            <i class="mr-3 flaticon-logout"></i>
            Logout
          </a>
        </li>
      </ul>
      <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
  data() {
    return {
      activeClass: 'c-active'
    }
  },
  methods: {
    ...mapActions('auth', ['loggedOut']),
    ...mapActions('setting', ['getSettingSekolah']),
    async logout() {
      try {
        await this.loggedOut()
        localStorage.removeItem('token')
        this.$store.state.token = localStorage.getItem('token')
        this.$router.push('/login')
      } catch (error) {
        localStorage.removeItem('token')
        this.$store.state.token = localStorage.getItem('token')
        this.$router.push('/login')
      }
    }
  },
  computed: {
    ...mapGetters(['isAuth','baseURL']),
    ...mapState('user', {
      user: state => state.authenticated
    }),
    ...mapState('setting',{
      sekolah: state => state.set_sekolah,
      ujian: state => state.set_ujian
    }),
    currentPage() {
      return this.$route.name ? this.$route.name : [];
    }
  },
  async created() {
    if(this.isAuth) {
      try {
        await this.getSettingSekolah()
      } catch (error) {
        this.$bvToast.toast(error.message, errorToas())
      }
    }
  }
}
</script>
<style type="text/css">
</style>
