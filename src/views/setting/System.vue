<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
				<div class="card-header">
                    Setting system
                </div>
                <div class="list-group">
                  <router-link :to="{ name: 'system.ujian' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> Setting ujian
                      </span>
                    </div>
                  </router-link>
				  <router-link :to="{ name: 'system.token' }" class="list-group-item list-group-item-action">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="flaticon-computer"></i> Setting Token
                      </span>
                    </div>
                  </router-link>
				</div>
				<div class="card-footer">
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