<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'kelola.analys.capaian.siswa' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                    <button class="btn float-right btn-primary btn-sm mx-1" @click="print">Print</button>
                    <b-button :disabled="isLoading" variant="success" class="float-right" size="sm" @click="download">
                        Download
                    </b-button>
                </div>
                <div class="card-body" id="printSoal">
                    <div class="table-responsive-md">
                        <table class="table table-sm table-bordered" v-if="typeof capaians.pesertas != 'undefined'">
                            <thead>
                                <tr>
                                    <th width="200px">Nomor</th>
                                    <th v-for="index in capaians.soal" :key="index">{{ index }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in capaians.pesertas" :key="index">
                                    <td>
                                        {{ data.peserta.nama }} <br>
                                        {{ data.peserta.no_ujian }}
                                    </td>
                                    <td v-for="nilai in data.data" v-text="nilai.iscorrect" 
                                    :class="{ 'bg-danger': nilai.iscorrect == 0 }"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { createLinkDownload } from '@/entities/networkFile'
import { successToas, errorToas} from '@/entities/notif'

export default {
    name: 'CapaianSiswa',
    data() {
        return {
            fields: [
                'index',
                { key: 'pertanyaan', label: 'Pertanyaan'},
            ],
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('ujian', {
            capaians: state => state.capaians
        }),
    },
    methods: {
        ...mapActions('ujian',['getCapaianSiswa', 'downloadExcel']),
        print() {
            this.$htmlToPaper('printSoal');
        },
        async download() {
            try {
                let network = await this.downloadExcel({ 
                    ujian: this.$route.params.jadwal,
                    banksoal: this.$route.params.banksoal 
                })

                // createLinkDownload(network, 'Capaian_siswa.xlsx');
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    created() {
        this.getCapaianSiswa({
            ujian: this.$route.params.jadwal,
            banksoal: this.$route.params.banksoal 
        })
    }
}
</script>