<template>
  <div class="c-body">
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
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
      has_getting_2: false
    }
  },
  computed: {
    ...mapState('user', ['authenticated']),
    ...mapState('channel',['socket','socket_2'])
  },
  created() {
    this.channel_1 = 'teacher_connect_chanel'
    this.channel_2 = 'student_connect_channel'
  },
  methods: {
    onSocketConnect() {
      this.socket.emit('monitor', { channel: this.channel_1 })
      this.socket.on('monit', (users) => {
        this.users = users
      })
      this.socket.on('is_online', (user) => {
        let index = this.users.map(item => item.id).indexOf(user.id)
        if(index == -1) {
          this.users.push(user)
        }
      })
      this.socket.on('is_offline', (user) => {
        let index = this.users.map(item => item.id).indexOf(user.id)
        if(index != -1) {
          this.users.splice(index,1)
        }
      })
    },
    onSocketConnect2() {
      this.socket_2.emit('monitor_student', { channel: this.channel_2 })
      this.socket_2.on('monit_student', (users) => {
        this.students = users.filter((item) => typeof item.no_ujian != 'undefined')
      })
      this.socket_2.on('is_online_student', (user) => {
        if(typeof user.no_ujian != 'undefined' && user.no_ujian != '' && user.no_ujian != null) {
          let index = this.students.map(item => item.id).indexOf(user.id)
          if(index == -1) {
            this.students.push(user)
          }
        }
      })
      this.socket_2.on('is_offline', (user) => {
        if(typeof user.no_ujian != 'undefined') {
          let index = this.students.map(item => item.id).indexOf(user.id)
          if(index != -1) {
            this.students.splice(index,1)
          }
        }
      })
    }
  },
  mounted() {
    this.socket.on('connect', () => {
      if(!this.has_getting) {
        this.onSocketConnect()
        this.has_getting = true
      }
    });

    this.socket_2.on('connect', () => {
      if(!this.has_getting_2) {
        this.onSocketConnect2()
        this.has_getting_2 = true
      }
    })

    if(!this.has_getting && this.socket.connected) {
      this.onSocketConnect()
      this.has_getting = true
    }

    if(!this.has_getting_2 && this.socket_2.connected) {
      this.onSocketConnect2()
      this.has_getting_2 = true
    }
  },
  watch: {
  }
}
</script>