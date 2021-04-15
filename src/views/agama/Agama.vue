<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          Agama
        </div>
        <div class="card-body">
          <table class="table table-sm table-hovered table-bordered table-strip">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Nama</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(agama, index) in agamas">
                <td width="50px">{{ index +1 }}</td>
                <td width="280px">{{ agama.id }}</td>
                <td>{{ agama.nama }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'AgamaData',
  computed: {
    ...mapGetters(['isLoading']),
    ...mapState(['errors']),
    ...mapState('agama', { agamas: state => state.agamas })
  },
  methods: {
    ...mapActions('agama',['getAgamas'])
  },
  created() {
    this.getAgamas();
  }
}
</script>
