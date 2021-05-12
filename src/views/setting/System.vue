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
							<table class="table table-bordered">
								<tr>
									<td>
										<router-link :to="{ name: 'system.ujian' }" class="link">
		                       				Ujian
		                      			</router-link>
									</td>
								</tr>
								<tr>
									<td>
										<router-link :to="{ name: 'system.token' }" class="link">
		                       				Token
		                      			</router-link>
									</td>
								</tr>
							</table>
		                	<div class="list-group">
		                      
		                    </div>
                		</div>
                		<div class="col-md-4">
                            
                		</div>
                	</div>
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