<template>
  <div class="c-body">
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row"
          v-if="enable_socket === 'oke'"
          >
            <div class="col-md-12">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="success">Topologi</b-button>
                </b-card-header>
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="success">From developer</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <img src="/img/topologi.png" style="max-width: 400px; width: 100%"/>
                  </b-card-body>
                </b-collapse>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <p><strong>Anda tidak boleh: </strong><br>
                      <ul>
                        <li>Menghapus setiap pemberitahuan hak cipta, merek dagang atau pemeberitahuan hak milik lainnya yang terkandung dalam Aplikasi;</li>
                        <li>Menyalin, memodifikasi, mengadaptasi, menerjemahkan, membuat karya turunan dari, mendistribusikan, memberikan lisensi, menjual, mengalihkan, menampilkan di muka umum sebagaian maupun seluruhnya, merekayasa balik (reverse engineer), mentransmisikan, memindahkan, menyiarkan, menguraikan, atau membongkar bagian manapun dari atau dengan cara lain mengeksploitasi Aplikasi.</li>
                        <li>Memberikan lisensi, mensublisensikan, menjual, menjual kembali, memindahkan, mengalihkan, mendistrubusikan atau mengeksploitasi secara komersial atau membuat tersedia kepada pihak lain Aplikasi.</li>
                        <li>Menggunakan dan/atau mengakses secara tidak resmi Aplikasi untuk (a) merusak, melemahkan atau membahayakan setiap aspek dari Aplikasi atau sisten dan jaringan.</li>
                      </ul>
                      <strong>Batasan Tanggung Jawab Kami</strong> <br>
                      Kami menyediakan Aplikasi sebagaimana adanya. Kami tidak berkewajiban untuk mengawasi akses atau penggunaan Anda atas Aplikasi. Namun, Kami tetap melakukan pengawasan untuk tujuan memastikan kelancaran penggunaan Aplikasi dan untuk memastikan kepatuhan terhadap Ketentuan Penggunaan ini.
                    </p>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  Guru/Admin terkoneksi
                </div>
                <div class="list-group">
                  <div class="list-group-item"
                  v-for="(user, index) in users"
                  :key="index"
                  >
                    <div class="d-flex">
                      <span>
                        <i class="flaticon-user"></i> {{ user.email }}
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> {{ user.ip }}
                      </span>
                      <span>{{ user.flatform }} | {{ user.browser }}</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer"></div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  Siswa terkoneksi
                </div>
                <div class="list-group" v-if="students.length > 0">
                  <div class="list-group-item"
                  v-for="(student, index) in students"
                  :key="index"
                  >
                    <div class="d-flex">
                      <span>
                        <i class="flaticon-user"></i> {{ student.no_ujian }} | {{ student.nama }}
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> {{ student.ip }}
                      </span>
                      <span>{{ student.flatform }} | {{ student.browser }}</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </div>
                </div>
                <div class="py-2 px-4"
                v-else
                >Tidak ada peserta terkoneksi</div>
                <div class="card-footer"></div>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-md-6">
              <div class="alert alert-info">
                <strong>Informasi</strong>
                Socket tidak diaktifkan
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex';
export default {
  name: 'Dashboard',
  data() {
    return {
      users: [],
      students: [],
      channel_1: '',
      channel_2: '',
      has_getting: false,
      has_getting_2: false,
      enable_socket: process.env.VUE_APP_ENABLE_SOCKET
    }
  },
  computed: {
    ...mapState('user', ['authenticated']),
    ...mapState('channel', ['socket', 'socket_2'])
  },
  created() {
    this.channel_1 = 'teacher_connect_chanel'
    this.channel_2 = 'student_connect_channel'
  },
  methods: {
    onSocketConnect() {
      if (this.enable_socket === "oke") {
        this.socket.emit('monitor', {channel: this.channel_1})
        this.socket.on('monit', (users) => {
          this.users = users
        })
        this.socket.on('is_online', (user) => {
          let index = this.users.map(item => item.id).indexOf(user.id)
          if (index == -1) {
            this.users.push(user)
          }
        })
        this.socket.on('is_offline', (user) => {
          let index = this.users.map(item => item.id).indexOf(user.id)
          if (index != -1) {
            this.users.splice(index, 1)
          }
        })
      }
    },
    onSocketConnect2() {
      if (this.enable_socket === "oke") {
        this.socket_2.emit('monitor_student', {channel: this.channel_2})
        this.socket_2.on('monit_student', (users) => {
          this.students = users.filter((item) => typeof item.no_ujian != 'undefined')
        })
        this.socket_2.on('is_online_student', (user) => {
          if (typeof user.no_ujian != 'undefined' && user.no_ujian != '' && user.no_ujian != null) {
            let index = this.students.map(item => item.id).indexOf(user.id)
            if (index == -1) {
              this.students.push(user)
            }
          }
        })
        this.socket_2.on('is_offline', (user) => {
          if (typeof user.no_ujian != 'undefined') {
            let index = this.students.map(item => item.id).indexOf(user.id)
            if (index != -1) {
              this.students.splice(index, 1)
            }
          }
        })
      }
    }
  },
  mounted() {
    if (this.enable_socket === "oke") {
      this.socket.on('connect', () => {
        if (!this.has_getting) {
          this.onSocketConnect()
          this.has_getting = true
        }
      });

      this.socket_2.on('connect', () => {
        if (!this.has_getting_2) {
          this.onSocketConnect2()
          this.has_getting_2 = true
        }
      })

      if (!this.has_getting && this.socket.connected) {
        this.onSocketConnect()
        this.has_getting = true
      }

      if (!this.has_getting_2 && this.socket_2.connected) {
        this.onSocketConnect2()
        this.has_getting_2 = true
      }
    }
  },
  watch: {}
}
</script>
