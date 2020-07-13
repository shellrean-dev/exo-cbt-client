<template>
      <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
      <div class="c-sidebar-brand"><img class="c-sidebar-brand-full" v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.ico'" style="max-height: 46px" alt="Logo"><img class="c-sidebar-brand-minimized" v-if="typeof sekolah.value != 'undefined'" :src="sekolah.value.logo != '' ? baseURL+'/storage/'+sekolah.value.logo : '/img/logo.ico'" style="max-height: 46px" alt="Logo"></div>
      <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" to="/"
          :class="[currentPage.includes('home') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-speedometer"></i>
            Dashboard
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu utama</li>
        <li class="c-sidebar-nav-item" v-if="user.role != 'guru'">
          <router-link class="c-sidebar-nav-link" :to="{  name: 'sekolah.setting' }"
          :class="[currentPage.includes('sekolah.setting') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-info"></i> Informasi sekolah
          </router-link>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-if="user.role != 'guru'">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="c-sidebar-nav-icon cil-layers"></i> Data master
          </a>

          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'jurusan.data' }"
              :class="[currentPage.includes('jurusan.data') ? activeClass : '']"> 
                <span class="c-sidebar-nav-icon"></span> Jurusan
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'peserta.data' }"
              :class="[currentPage.includes('peserta.data') ? activeClass : '']">
                <span class="c-sidebar-nav-icon"></span> Peserta
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
                <span class="c-sidebar-nav-icon"></span> Guru
              </router-link>
            </li>
          </ul>
        </li>
        
         <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'banksoal.data' }"
          :class="[currentPage.includes('banksoal.data') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-briefcase"></i>Banksoal
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.data' }"
          :class="[currentPage.includes('ujian.data') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-notes"></i>Jadwal ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu ujian</li>
        <li class="c-sidebar-nav-item" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.status' }"
          :class="[currentPage.includes('ujian.status') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-clipboard"></i>
            Status ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.peserta' }"
          :class="[currentPage.includes('ujian.peserta') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-task"></i>
            Status peserta
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.peserta-reset' }"
          :class="[currentPage.includes('ujian.peserta-reset') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-sync"></i>
            Reset login peserta
          </router-link>
        </li>
        <li class="c-sidebar-nav-title" v-if="user.role != 'guru'">Menu pengolahan</li>
        <li class="c-sidebar-nav-item" v-if="user.role != 'guru'">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'kelola.koreksi.esay' }"
          :class="[currentPage.includes('kelola.koreksi.esay') ? activeClass : '']">
            <i class="c-sidebar-nav-icon cil-task"></i> Koreksi esay
          </router-link>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-if="user.role != 'guru'">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="c-sidebar-nav-icon cil-chart-line"></i>Reporting
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
            <i class="c-sidebar-nav-icon cil-chart"></i>Hasil ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="#" @click.prevent="logout">
            <i class="c-sidebar-nav-icon cil-account-logout"></i> 
            Logout
          </a>
        </li>
      </ul>
      <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      baseURL: process.env.VUE_APP_API_SERVER,
      activeClass: 'c-active'
    }
  },
  methods: {
    ...mapActions('auth', ['loggedOut']),
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
    ...mapState('user', {
      user: state => state.authenticated
    }),
    ...mapState('setting',{
      sekolah: state => state.set_sekolah
    }),
    currentPage() {
      return this.$route.name ? this.$route.name : [];
    }
  }
}
</script>
<style type="text/css">
  
</style>