<template>
  <div class="c-body">
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                  <div class="col-md-4">
                  <div class="card">
                    <div class="list-group">
                      <router-link :to="{ name: 'guru.upload' }" class="list-group-item list-group-item-action d-flex justify-content-between">
                        <span>
                          <i class="flaticon-upload-1"></i> Import guru
                        </span>
                        <span class="badge badge-success badge-pill">Excel</span>
                      </router-link>
                      <router-link :to="{ name: 'peserta.upload' }" class="list-group-item list-group-item-action d-flex justify-content-between">
                        <span>
                          <i class="flaticon-upload-1"></i> Import peserta
                        </span>
                        <span class="badge badge-success badge-pill">Excel</span>
                      </router-link>
                      <router-link :to="{ name: 'matpel.upload' }" class="list-group-item list-group-item-action d-flex justify-content-between">
                        <span>
                          <i class="flaticon-upload-1"></i> Import matpel
                        </span>
                        <span class="badge badge-success badge-pill">Excel</span>
                      </router-link>
                    </div>
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