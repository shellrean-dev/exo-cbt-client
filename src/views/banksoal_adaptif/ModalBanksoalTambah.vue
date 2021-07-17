<template>
  <b-modal id="modal-banksoal-tambah" size="lg">
    <template v-slot:modal-header="{}">
      <h5>Tambah banksoal</h5>
    </template>
    <div class="form-group">
      <label>Nama banksoal</label>
      <input type="text" class="form-control" placeholder="Nama banksoal"
      :class="{ 'is-invalid' : errors.name }" 
      v-model="banksoal.name">
      <p class="text-danger" 
      v-if="errors.name">{{ errors.name[0] }}</p>
    </div>
    <div class="form-group">
      <label>Mata pelajaran</label>
      <v-select label="nama"
      :reduce="nama => nama.id"
      :options="allMatpels"
      v-model="banksoal.matpel_id"></v-select>
    </div>
    <div class="form-group">
      <label>Kode banksoal</label>
      <input type="text" class="form-control" placeholder="Kode banksoal"
      :class="{ 'is-invalid' : errors.code }" 
      v-model="banksoal.code">
      <p class="text-danger" 
      v-if="errors.code">{{ errors.code[0] }}</p>
    </div>
    <div class="form-group">
      <label>Max pilihan ganda</label>
      <div class="input-group">
        <div class="input-group-prepend" v-show="max_pg > 0">
          <button class="btn btn-outline-secondary" type="button" 
          v-on:click="max_pg -= 1"><b>-</b></button>
        </div>
        <input type="number" class="form-control" placeholder="Jumlah pilihan ganda"
        :class="{ 'is-invalid' : errors.max_pg }" 
        v-model="max_pg">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" 
          v-on:click="max_pg += 1"><b>+</b></button>
        </div>
      </div>
      <p class="text-danger" 
      v-if="errors.max_pg">{{ errors.max_pg[0] }}</p>
    </div>
    <template v-slot:modal-footer="{ cancel }">
      <b-button variant="primary" size="sm"
      :disabled="isLoading"
      v-on:click="_createBanksoal"
      >
        <b-spinner small type="grow"
        v-show="isLoading"></b-spinner> Simpan
      </b-button>
      <b-button variant="secondary" size="sm"
      v-on:click="cancel"
      :disabled="isLoading">
        Cancel
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { generateBanksoalCode } from '@/entities/generate'
export default {
  components: {
    vSelect
  },
  data() {
    return {
      max_pg: 0
    }
  },
  computed: {
    ...mapGetters([
      'isLoading']),
    ...mapState([
      'errors']),
    ...mapState('banksoal_adaptif', [
      'banksoal']),
    ...mapState('matpel', [
      'allMatpels'])
  },
  methods: {
    ...mapActions('banksoal_adaptif', [
      'getDataBanksoalAdaptif',
      'createDataBanksoalAdaptif']),
    async _createBanksoal() {
      try {
        await this.createDataBanksoalAdaptif()
        this.$store.state.banksoal_adaptif.banksoal = {}
        this.getDataBanksoalAdaptif()
        this.$bvModal.hide('modal-banksoal-tambah')
      } catch (e) {

      } finally {

      }
    },
    _updateBanksoal() {

    }
  },
  created() {
    this.banksoal.code = generateBanksoalCode()
  },
  watch: {
    max_pg(v){
      this.banksoal.max_pg = v
    }
  }
}
</script>