<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    Koreksi jawaban peserta
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Koreksi</h4>
                            <div class="small text-muted">List banksoal yang belum terkoreksi</div>
                        </div>
                    </div>
                    <br>
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="banksoals" show-empty >
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <div class="table-responsive-md">
                                        <table class="table table-borderless">
                                            <tr>
                                                <td  width="150px">Matpel</td>
                                                <td>{{ row.item.matpel.nama }}</td>
                                            </tr>
                                            <tr>
                                                <td>Pengoreksi</td>
                                                <td>
                                                    <b-badge variant="info" v-for="corrector in row.item.matpel.correctors_name" :key="corrector.id">{{ corrector.name }}</b-badge>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </b-card>
                            </template>
                            <template v-slot:cell(kode_banksoal)="row">
                                {{ row.item.kode_banksoal }}
                            </template>
                            <template v-slot:cell(aksi)="row">
                                <router-link :to="{ name: 'kelola.koreksi.nilai.esay', params: { banksoal: row.item.id } }" class="btn btn-sm btn-primary"><i class="cil-task"></i> Koreksi banksoal ini</router-link>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'UjianKoreksi',
    data() {
        return {
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'kode_banksoal', label: 'Banksoal' },
                { key: 'koreksi', label: 'Jawaban belum terkoreksi' },
                { key: 'aksi', label: 'Aksi' }
            ],
        }
    },
    computed: {
        ...mapState('ujian',{ banksoals: state => state.ujiansExists })
    },
    methods: {
        ...mapActions('ujian',['getExistsEsay'])
    },
    async created() {
        try {
            await this.getExistsEsay()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    },
    watch: {

    }
}
</script>