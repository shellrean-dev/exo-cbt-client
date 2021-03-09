<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'kelola.koreksi.esay' }" class="btn btn-light btn-sm  ">Kembali</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Koreksi</h4>
                            <div class="small text-muted">Cocokan data akurasi</div>
                        </div>
                    </div>
                    <br>
                    <div class="table-responsive-md">
                        <b-table striped hover bordered small :fields="fields" :items="esies.data" show-empty>
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'flaticon-circle' : 'flaticon2-add'" /></b-button>
                            </template>
                            <template v-slot:cell(akurasi)="row">
                                <b-progress :max="100" height="2rem" show-progress variant="info">
                                    <b-progress-bar :value="row.item.similiar">
                                        Akurasi: <strong v-text="row.item.similiar"></strong>
                                    </b-progress-bar>
                                </b-progress>
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <div class="table-responsive-md">
                                        <table class="table table-lg table-bordered">
                                            <tr>
                                                <td width="150px">Pertanyaan</td>
                                                <td>
                                                    <div v-html="row.item.pertanyaan"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td >Jawaban rujukan</td>
                                                <td>
                                                    <div v-html="row.item.rujukan"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Jawaban peserta</td>
                                                <td>
                                                    <div v-html="row.item.esay"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Point</td>
                                                <td>
                                                    <div class="input-group" style="max-width: 240px">
                                                        <input type="number" v-model.number="row.item.val" class="form-control border-primary" :class="{'is-invalid': row.item.val > 1 || row.item.val < 0 }" placeholder="Point" step="0.1" max="1" min="0">
                                                        <div class="input-group-append">
                                                            <button class="btn btn-primary" type="button" @click="submitNilai(row.item.id)" :disabled="isLoading">Submit</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </b-card>
                            </template>
                        </b-table>
                        <div class="row"  v-if="typeof esies.data != 'undefined'">
                            <div class="col-md-6">
                                <p>
                                    {{ esies.data.length }} data dari {{ esies.total }} total jawaban peserta
                                </p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="esies.total"
                                        :per-page="esies.per_page"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
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
    name: 'KoreksiUjian',
    data() {
        return {
            fields: [
                { key: 'show_details', label: 'Detail' },
            ],
            val: 0
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('ujian', { esies: state => state.essies }),
        page: {
            get() {
                return this.$store.state.ujian.koreksi_page
            },
            set(val) {
                this.$store.commit('ujian/SET_PAGE_KOREKSI', val)
            }
        }
    },
    methods: {
        ...mapActions('ujian',['getExistsByBanksoal', 'submitNilaiEsay']),
        submitNilai(id) {
            const idx = this.esies.data.map((item) => item.id).indexOf(id)
            if (idx == -1) {
                return
            }
            const data = this.esies.data[idx]
            if (data) {
                if(data.val > 1 ) {
                    this.$swal({
                        title: 'Error',
                        text: 'Point tidak boleh lebih dari 1 (0, 0.1, 0.2, 0.3 .... 1)',
                        icon: 'error'
                    })
                    return;
                }

                this.submitNilaiEsay({
                    id: data.id,
                    val: data.val
                })
                .then((res) => {
                    this.val = 0;
                    this.getExistsByBanksoal(this.$route.params.banksoal)
                    this.$bvToast.toast('Nilai berhasil disubmit.', successToas())
                })
                .catch((error) => {
                    this.$bvToast.toast(error.message, errorToas())
                })
            }
        }
    },
    async created() {
        try {
            await this.getExistsByBanksoal(this.$route.params.banksoal)
        } catch (error) {
            this.$bvToast.toast(error.message, errorToas())
        }
    }
}
</script>