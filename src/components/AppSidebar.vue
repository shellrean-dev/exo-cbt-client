<template>
      <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
      <div class="c-sidebar-brand"><img class="c-sidebar-brand-full" src="/img/logo.ico" height="46" alt="Logo"><img class="c-sidebar-brand-minimized" src="/img/logo.ico" height="46" alt="Logo"></div>
      <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" to="/">
            <i class="c-sidebar-nav-icon cil-speedometer"></i>
            Dashboard
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu utama</li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'sekolah.data' }">
            <i class="c-sidebar-nav-icon cil-building"></i> Sekolah
          </router-link>
        </li>
    
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="c-sidebar-nav-icon cil-layers"></i> Data master
          </a>

          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" to="/jurusan"> <span class="c-sidebar-nav-icon"></span> Jurusan</router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" to="/peserta">
                <span class="c-sidebar-nav-icon"></span> Peserta
              </router-link>
            </li>

            <li class="c-sidebar-nav-item" >
              <router-link class="c-sidebar-nav-link" to="/matpel"> <span class="c-sidebar-nav-icon"></span> Matpel</router-link>
            </li>
          </ul>
        </li>
        <!--
         <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" to="/banksoal">
            <i class="c-sidebar-nav-icon cil-briefcase"></i>Banksoal
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.data' }">
            <i class="c-sidebar-nav-icon cil-notes"></i>Jadwal ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.koreksi' }">
            <i class="c-sidebar-nav-icon cil-task"></i> Koreksi esay
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" to="/filemedia">
            <i class="c-sidebar-nav-icon cil-folder"></i>File media
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu heager</li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="c-sidebar-nav-icon cil-chart-line"></i>Reporting
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'analys.siswa' }">
                <span class="c-sidebar-nav-icon"></span> Capaian siswa
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'analys.banksoal' }">
                <span class="c-sidebar-nav-icon"></span> Kesulitan soal
              </router-link>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'hasil.ujian' }">
            <i class="c-sidebar-nav-icon cil-chart"></i>Hasil ujian
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'role.permissions' }">
            <i class="c-sidebar-nav-icon cil-cog"></i>Role & permission
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'heager.dashboard' }">
            <i class="c-sidebar-nav-icon cil-globe-alt"></i>Heager actions
          </router-link>
        </li>  --> 
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
  methods: {
    ...mapActions('auth', ['loggedOut']),
      logout() {

      }
    },
}
</script>
<style type="text/css">
  .router-link-exact-active.router-link-active {
    background-color: #46536d !important;
  }
</style>