<template>
  <b-modal id="modal-feature-info" size="lg">
    <template v-slot:modal-header="{ }">
      <h5>Informasi Fitur</h5>
    </template>
      <div v-html="feature_info.content"></div>
      <template v-slot:modal-footer="{ cancel }">
      <b-button size="sm" variant="secondary" 
      v-on:click="cancel()" :disabled="isLoading">
        Cancel
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'FeatureInfoModal',
  computed: {
    ...mapState('feature', [
      'feature_info'])
  }
}
</script>