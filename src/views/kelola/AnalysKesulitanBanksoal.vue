<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'kelola.analys.banksoal' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                    <button class="btn float-right btn-primary btn-sm mx-1" @click="print" :disabled="isLoading"><i class="flaticon2-print"></i> Cetak analisis banksoal</button>
                </div>
                <div class="card-body back" id="printSoal">
                    <div v-if="banksoal" class="hide">
                        <h2 class="text-center mb-5">ANALISIS BANKSOAL</h2>
                        <hr>
                        <table class="table table-sm table-borderless h4">
                            <tr>
                                <td width="200px">Kode Banksoal</td>
                                <td>: {{ banksoal.kode_banksoal }}</td>
                            </tr>
                            <tr>
                                <td>Mata Pelajaran</td>
                                <td>: {{ banksoal.matpel.nama }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="paper">
                        <div class="table-responsive-md">
                            <table class="table table-sm table-bordered">
                                <tr v-for="(soal, index) in analys" :key="index">
                                    <td>
                                        <div class="table-responsive-md">
                                            <table class="table table-sm table-mx table-bordered">
                                                <tr>
                                                    <td width="20px">{{ index+1 }}.</td>
                                                    <td v-html="soal.soal"></td>
                                                </tr>
                                                <tr v-for="jawaban in soal.jawaban" :key="jawaban.id">
                                                    <td>
                                                        <!-- <i class="flaticon-star text-warning" v-show="jawaban.iscorrect == 1"></i> -->
                                                        <StarFillineYellow style="height:15px;" v-show="jawaban.iscorrect == 1"></StarFillineYellow>
                                                    </td>
                                                    <td>
                                                        <div v-html="jawaban.text"></div>
                                                        <b-badge variant="primary">{{jawaban.penjawab}} peserta</b-badge>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <div class="table-responsive-md">
                                                        <table class="table table-sm">
                                                            <tr>
                                                                <td style="text-transform: uppercase;">
                                                                    <GChart
                                                                        type="PieChart"
                                                                        :data="soal.diagram"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr >
                                                                <td>
                                                                    Benar: <b-badge variant="success">{{ soal.benar }} peserta</b-badge> <br>
                                                                    Salah: <b-badge variant="danger">{{ soal.salah }} peserta</b-badge> <br>
                                                                    Soal dijawab oleh <b-badge variant="info">{{ soal.penjawab }} peserta</b-badge>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts'
import { successToas, errorToas} from '@/entities/notif'
import StarFillineYellow from '@/components/icon/StarFillineYellow'

export default {
    name: 'SoalBanksoal',
    components: {
        GChart,
        StarFillineYellow
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('banksoal',{
            analys: state => state.analys,
            banksoal: state => state.banksoal,
        })
    },
    filters: {
        charIndex(i) {
            return String.fromCharCode(97 + i)
        }
    },
    methods: {
        ...mapActions('banksoal',['getAllSoalAnalys','getBanksoalById']),
        print() {
            this.$htmlToPaper('printSoal');
        }
    },
    async created() {
        try {
            this.$store.commit('LOADING_PAGE', true)
            await this.getAllSoalAnalys(this.$route.params.banksoal)
            await this.getBanksoalById(this.$route.params.banksoal)
            this.$store.commit('LOADING_PAGE', false)
        } catch (error) {
            this.$store.commit('LOADING_PAGE', false)
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>
<style>
.hide {
    display: none;
}
</style>