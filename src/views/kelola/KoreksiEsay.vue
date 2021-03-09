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
                            <template v-slot:cell(no)="row">
                                {{ row.index + 1 }}
                            </template>
                            <template v-slot:cell(kode_banksoal)="row">
                                {{ row.item.kode_banksoal }}
                            </template>
                            <template v-slot:cell(aksi)="row">
                                <router-link :to="{ name: 'kelola.koreksi.nilai.esay', params: { banksoal: row.item.id } }" class="btn btn-sm btn-primary"><i class="flaticon-list"></i> Koreksi banksoal ini</router-link>
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
                { key: 'no', label: 'No' },
                { key: 'kode_banksoal', label: 'Banksoal' },
                { key: 'nama_matpel', label: 'Matpel' },
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