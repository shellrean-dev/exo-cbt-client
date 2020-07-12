<template>
	<div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Peserta ujian
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Status ujian peserta</h4>
                            <div class="small text-muted">Upload Reset dan force close ujian peserta</div>
                        </div>
                        <div class="d-md-block col-sm-7">
                            <b-button variant="primary" class="float-right" @click="getPesertas" :disabled="isLoading" >
                                <i class="cil-reload"></i> Refresh data
                            </b-button>
                        </div>
                    </div>
                    <br>
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="pesertas" show-empty>
                            <template v-slot:cell(status)="row">
                                {{ row.item.status }}
                                <b-button variant="danger" :disabled="isLoading" class="mr-1" size="sm" @click="forceClose(row.item.peserta_id)"squared 
                                v-if="row.item.status_ujian != 1 && row.item.status_ujian != 2">
                                    Force close
                                </b-button>
                                <b-button variant="outline-danger" :disabled="isLoading" size="sm" @click="resetPeserta(row.item.peserta_id)"squared 
                                v-if="row.item.status_ujian != 1 && row.item.status_ujian != 2">
                                    Reset peserta
                                </b-button>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
export default {
    name: 'PesertaUjian',
    data() {
        return {
            fields: [
                { key: 'peserta.no_ujian', label: 'No ujian' },
                { key: 'peserta.nama', label: 'Nama peserta' },
                { key: 'mulai_ujian', label: 'Mulai ujian' },
                { key: 'status', label: 'Status' }
            ],
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('ujian', {
            pesertas: state => state.pesertas
        })
    },
    methods: {
        ...mapActions('ujian', ['getPesertas', 'resetUjianPeserta', 'selesaiUjianPeserta']),
        async resetPeserta(id) {
            try {
                await this.resetUjianPeserta(id)
                this.getPesertas()
                this.$bvToast.toast('Ujian peserta berhasil direset', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
        async forceClose(id) {
            try {
                await this.selesaiUjianPeserta(id)
                this.getPesertas()
                this.$bvToast.toast('Ujian peserta berhasil ditutup paksa', successToas())
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        try {
            await this.getPesertas()
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>