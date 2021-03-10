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
		                	<div class="list-group">
		                      <router-link :to="{ name: 'system.ujian' }" class="list-group-item list-group-item-action d-flex justify-content-between">
		                        Ujian
		                        <span class="badge badge-success badge-pill">Fitur aktif</span>
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