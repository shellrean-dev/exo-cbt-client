<template>
    <div>
        <div class="input-group mb-3 mt-2">
			<div class="input-group-prepend">
				<span class="input-group-text">
					<i class="flaticon-avatar"></i>
				</span>
			</div>
			<input type="text" class="form-control" placeholder="No ujian: gunakan coma sebagai pemisah" v-model="data.peserta_ids">
			<div class="input-group-append">
				<button class="btn btn-primary" type="button" :disabled="isLoading" @click="submit()"><i class="flaticon-app"></i> Tambahkan</button>
			</div>
		</div>
		<div class="table-responsive">
            <VuePerfectScrollbar
                style="max-height: 80vh; position: relative;"
            >
            <b-table 
                :fields="fields"
                :items="peserta_sesi"
                selectable
                @row-selected="onRowSelected"
                ref="selectableTable"
                striped hover bordered small
                :busy="isLoading"
                show-empty
                selected-variant="danger">
                <template v-slot:cell(no)="row">
                    {{ row.index + 1}}
                </template>
                <template v-slot:empty="scope">
                    <span>Tidak ada peserta pada sesi ini</span>
                </template>
                <template v-slot:table-busy>
                    <span>Loading....</span>
                </template>
            </b-table>
            </VuePerfectScrollbar>
            <div class="btn-group" role="group" aria-label="Basic example">
                <b-button variant="outline-dark" size="sm" @click="selectAllRows">
                    <i class="flaticon-list-3"></i> Select all
                </b-button>
                <b-button variant="outline-dark" size="sm" @click="clearSelected">
                    <i class="flaticon2-reload"></i> Clear selected
                </b-button>
                <b-button variant="outline-danger" size="sm" @click="bulkRemove">
                    <i class="flaticon2-trash"></i> Bulk remove
                </b-button>
            </div>
            <p><span>Total {{ peserta_sesi.length }} peserta pada sesi {{sesi}}</span></p>
		</div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas} from '@/entities/notif'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    name: 'EventSesi',
    components: {
        VuePerfectScrollbar
    },
    props: ['sesi','jadwal'],
    data() {
        return {
            data: {
                peserta_ids: ''
            },
            fields: [
               { key: 'no', label: 'No'},
               { key: 'no_ujian', label: 'No ujian', sortable: true },
               { key: 'nama', label: 'Nama peserta', sortable: true } 
            ],
            selected: []
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('event',['peserta_sesi'])
    },
    methods: {
        ...mapActions('event', ['studentBySesi','pushToSesi','removeFromSesi']),
        async submit() {
            try {
                if(this.data.peserta_ids != '') {
                    await this.pushToSesi({
                        sesi: this.sesi,
                        jadwal_id: this.jadwal,
                        peserta_ids: this.data.peserta_ids
                    })
                    this.data.peserta_ids = ''
                    this.studentBySesi({
                        s: this.sesi,
                        j: this.jadwal
                    })
                    .catch((error) => {
                        this.$bvToast.toast(error.message, errorToas())
                    })
                    this.$bvToast.toast(`Peserta berhasil ditambahkan ke sesi ${this.sesi}`, successToas())
                }
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
        onRowSelected(items) {
            this.selected = items
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        bulkRemove() {
            this.$swal({
                title: 'Informasi',
                text: "Peserta yang dipilih akan dihapus dari sesi",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await this.removeFromSesi({
                            s: this.sesi,
                            j: this.jadwal,
                            p: this.selected.map(item => item.id)
                        })
                        this.studentBySesi({
                            s: this.sesi,
                            j: this.jadwal
                        })
                        .catch((error) => {
                            this.$bvToast.toast(error.message, errorToas())
                        })
                        this.$bvToast.toast(`Peserta berhasil dihapus dari sesi ${this.sesi}`, successToas())
                    } catch (error) {
                        this.$bvToast.toast(error.message, errorToas())
                    }
                }
            })
        }
    },
    created() {
        this.studentBySesi({
            s: this.sesi,
            j: this.jadwal
        })
        .catch((error) => {
            this.$bvToast.toast(error.message, errorToas())
        })
    },
    destroyed() {
        this.$store.state.event.peserta_sesi = []
    }
}
</script>