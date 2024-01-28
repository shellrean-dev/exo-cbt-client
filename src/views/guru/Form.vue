<template>
    <div>
      <div class="form-group">
        <label>Akses</label>
        <select class="form-control" :class="{ 'is-invalid' : errors.role }" v-model="user.role">
          <option value="admin">Admin</option>
          <option value="guru">Guru</option>
          <option value="operator">Operator</option>
        </select>
        <p class="text-danger" v-if="errors.role">{{ errors.role[0] }}</p>
      </div>
        <div class="form-group">
            <label>Nama</label>
            <input type="text" class="form-control" :class="{ 'is-invalid' : errors.name }" placeholder="Nama" v-model="user.name" autofocus="">
            <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" :class="{ 'is-invalid' : errors.email }" placeholder="Email" v-model="user.email" autofocus="">
            <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" :class="{ 'is-invalid' : errors.password }" placeholder="Password" v-model="user.password" autofocus="">
            <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'FormMatpel',
    created() {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['errors']),
        ...mapState('user', { user: state => state.user })
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
