<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Setting system
                </div>
                <div class="card-body">
                	<div class="row">
                		<div class="col-md-4">
		                	<div class="list-group mb-2">
	                			<div href="#" class="list-group-item list-group-item-action active">
								    Authentication
								</div>
		                      <router-link :to="{ name: 'system.airlock' }" class="list-group-item list-group-item-action d-flex justify-content-between">
		                        Login Dinasti Airlock
		                        <span class="badge badge-success badge-pill">Fitur aktif</span>
		                      </router-link>
		                      <router-link :to="{ name: 'system.g2fa' }" class="list-group-item list-group-item-action d-flex justify-content-between">
		                        Login Google 2FA
		                        <span class="badge badge-danger badge-pill">Fitur tidak aktif</span>
		                      </router-link>
		                    </div>
		                	<div class="list-group">
	                			<div href="#" class="list-group-item list-group-item-action active">
								    General Setting
								</div>
		                      <router-link :to="{ }" class="list-group-item list-group-item-action d-flex justify-content-between">
		                        Penginputan Soal
		                        <span class="badge badge-danger badge-pill">Fitur tidak aktif</span>
		                      </router-link>
		                      <router-link :to="{ name: 'system.ujian' }" class="list-group-item list-group-item-action d-flex justify-content-between">
		                        Ujian
		                        <span class="badge badge-success badge-pill">Fitur aktif</span>
		                      </router-link>
		                      <router-link :to="{ }" class="list-group-item list-group-item-action d-flex justify-content-between">
		                        Role & Permission
		                        <span class="badge badge-danger badge-pill">Fitur tidak aktif</span>
		                      </router-link>
		                    </div>
                		</div>
                		<div class="col-md-4">
                            
                		</div>
                	</div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'SystemSetting',
	data() {
		return {
			airlock: true
		}
	}
}
</script>