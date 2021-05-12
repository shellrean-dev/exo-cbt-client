<template>
  <div class="c-body">
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  Guru/Admin terkoneksi ke socket
                </div>
                <div class="list-group">
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-danger badge-pill">Offline</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </router-link>
                </div>
                <div class="card-footer"></div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  Siswa terkoneksi ke socket
                </div>
                <div class="list-group">
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-danger badge-pill">Offline</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> 192.168.0.1
                      </span>
                      <span>Windows | Chrome 1.1.1</span>
                      <span class="badge badge-success badge-pill">Online</span>
                    </div>
                  </router-link>
                </div>
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
export default {
  name: 'Dashboard',
}
</script>