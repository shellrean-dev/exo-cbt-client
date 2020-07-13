import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')

import SettingIndex from '@/views/setting/Index'
const SetSekolah = () => import(/* webpackChunkName: "sekolah" */ '@/views/setting/Sekolah')

import JurusanIndex from '@/views/jurusan/Index'
const DataJurusan = () => import(/* webpackChunkName: "jurusan" */ '@/views/jurusan/Jurusan')
const EditJurusan = () => import(/* webpackChunkName: "jurusan" */ '@/views/jurusan/Edit')
const AddJurusan = () => import(/* webpackChunkName: "jurusan" */ '@/views/jurusan/Add')

import PesertaIndex from '@/views/peserta/Index'
const DataPeserta = () => import(/* webpackChunkName: "peserta" */ '@/views/peserta/Peserta')
const AddPeserta = () => import(/* webpackChunkName: "peserta" */ '@/views/peserta/Add')
const EditPeserta = () => import(/* webpackChunkName: "peserta" */ '@/views/peserta/Edit')
const UploadPeserta = () => import(/* webpackChunkName: "peserta" */ '@/views/peserta/Upload')
const KartuPeserta = () => import(/* webpackChunkName: "peserta" */ '@/views/peserta/Kartu')

import MatpelIndex from '@/views/matpel/Index'
const DataMatpel = () => import(/* webpackChunkName: "matpel" */ '@/views/matpel/Matpel')
const AddMatpel = () => import(/* webpackChunkName: "matpel" */ '@/views/matpel/Add')
const EditMatpel = () => import(/* webpackChunkName: "matpel" */ '@/views/matpel/Edit')

import BanksoalIndex from '@/views/banksoal/Index'
const DataBanksoal = () => import(/* webpackChunkName: "banksoal" */ '@/views/banksoal/DataBanksoal')
const SoalBanksoal = () => import(/* webpackChunkName: "banksoal" */'@/views/banksoal/SoalBanksoal')
const SoalBanksoalTambah = () => import(/* webpackChunkName: "banksoal" */'@/views/banksoal/SoalBanksoalTambah')
const SoalBanksoalTemplate = () => import(/* webpackChunkName: "banksoal" */'@/views/banksoal/SoalBanksoalTemplate')
const SoalBanksoalEdit = () => import(/* webpackChunkName: "banksoal" */'@/views/banksoal/SoalBanksoalEdit')
const SoalBanksoalPrev = () => import(/* webpackChunkName: "banksoal" */'@/views/banksoal/SoalBanksoalPrev')

import UjianIndex from '@/views/ujian/Index'
const DataUjian = () => import(/* webpackChunkName: "ujian" */'@/views/ujian/Ujian')
const StatusUjian = () => import(/* webpackChunkName: "ujian" */'@/views/ujian/StatusUjian')
const PesertaUjian = () => import(/* webpackChunkName: "ujian" */'@/views/ujian/PesertaUjian')
const ResetPesertaUjian = () => import(/* webpackChunkName: "ujian" */'@/views/ujian/ResetPesertaUjian')

import KelolaIndex from '@/views/kelola/Index'
const KoreksiEsay = () => import('@/views/kelola/KoreksiEsay')
const KoreksiNilaiEsay = () => import('@/views/kelola/KoreksiNilaiEsay')
const AnalysBanksoal = () => import('@/views/kelola/AnalysBanksoal')
const AnalysKesulitanBanksoal = () => import('@/views/kelola/AnalysKesulitanBanksoal')
const AnalysSiswa = () => import('@/views/kelola/AnalysSiswa')
const AnalysCapaianSiswa = () => import('@/views/kelola/AnalysCapaianSiswa');
const HasilUjian = () => import('@/views/kelola/HasilUjian')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/setting',
    component: SettingIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'sekolah',
        name: 'sekolah.setting',
        component: SetSekolah,
        meta: { title: 'Data sekolah' }
      }
    ]
  },
  {
    path: '/jurusan',
    component: JurusanIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'jurusan.data',
        component: DataJurusan,
        meta: { title: 'Manage jurusan' }
      },
      {
        path: 'add',
        name: 'jurusan.add',
        component: AddJurusan,
        meta: { title: 'Tambah jurusan' }
      },
      {
        path: 'edit/:id',
        name: 'jurusan.edit',
        component: EditJurusan,
        meta: { title: 'Edit nama jurusan' }
      }
    ]
  },
  {
    path: '/peserta',
    component: PesertaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'peserta.data',
        component: DataPeserta,
        meta: { title: 'Manage peserta' }
      },
      {
        path: 'add',
        name: 'peserta.add',
        component: AddPeserta,
        meta: { title: 'Tambah peserta' }
      },
      {
        path: 'edit/:id',
        name: 'peserta.edit',
        component: EditPeserta,
        meta: { title: 'Edit data peserta' }
      },
      {
        path: 'upload',
        name: 'peserta.upload',
        component: UploadPeserta,
        meta: { title: 'Upload datapeserta' }
      },
      {
        path: 'kartu',
        name: 'peserta.kartu',
        component: KartuPeserta,
        meta: { title: 'Kartu peserta' }
      }
    ]
  },
  {
    path: '/matpel',
    component: MatpelIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'matpel.data',
        component: DataMatpel,
        meta: { title: 'Manage mata pelajaran' }
      },
      {
        path: 'add',
        name: 'matpel.add',
        component: AddMatpel,
        meta: { title: 'Tambah mata pelajara' }
      },
      {
        path: 'edit/:id',
        name: 'matpel.edit',
        component: EditMatpel,
        meta: { title: 'Edit mata pelajaran' }
      }
    ]
  },
  {
    path: '/banksoal',
    component: BanksoalIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'banksoal.data',
        component: DataBanksoal,
        meta: { title: 'Manage banksoal' }
      },
      {
        path: ':banksoal_id/soal',
        name: 'banksoal.soal',
        component: SoalBanksoal,
        meta: { title: 'Manage soal' }
      },
      {
        path: ':banksoal_id/soal/tambah',
        name: 'banksoal.soal.tambah',
        component: SoalBanksoalTambah,
        meta: { title: 'Tambah soal' }
      },
      {
        path: ':banksoal_id/soal/paste',
        name: 'banksoal.soal.paste',
        component: SoalBanksoalTemplate,
        meta: { title: 'Tambah soal' }
      },
      {
        path: ':banksoal_id/soal/:soal_id',
        name: 'banksoal.soal.edit',
        component : SoalBanksoalEdit,
        meta: { title: 'Edit soal' }
      },
      {
        path: ':banksoal_id/prev',
        name: 'banksoal.prev',
        component: SoalBanksoalPrev,
        meta: { title: 'Preview soal banksoal' }
      }
    ]
  },
  {
    path: '/ujian',
    component: UjianIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'ujian.data',
        component: DataUjian,
        meta: { title: 'Manage ujian' }
      },
      {
        path: 'status',
        name: 'ujian.status',
        component: StatusUjian,
        meta: { title: 'Status ujian' }
      },
      {
        path: 'peserta',
        name: 'ujian.peserta',
        component: PesertaUjian,
        meta: { title: 'Peserta ujian' }
      },
      {
        path: 'reset/peserta',
        name: 'ujian.peserta.reset',
        component: ResetPesertaUjian,
        meta: { title: 'Reset peserta ujian' }
      }
    ]
  },
  {
    path: '/kelola',
    component: KelolaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'koreksi-esay',
        name: 'kelola.koreksi.esay',
        component: KoreksiEsay,
        meta: { title: 'Koreksi esay siswa'}
      },
      {
        path: 'koreksi-esay/:banksoal',
        name: 'kelola.koreksi.nilai.esay',
        component: KoreksiNilaiEsay,
        meta: { title: 'Koreksi nilai esay' }
      },
      {
        path: 'analys/banksoal',
        name: 'kelola.analys.banksoal',
        component: AnalysBanksoal,
        meta: { title: 'Analys banksoal' }
      },
      {
        path: 'analys/banksoal/:banksoal',
        name: 'kelola.analys.kesulitan.banksoal',
        component: AnalysKesulitanBanksoal,
        meta: { title: 'Analys kesulitan banksoal' }
      },
      {
        path: 'analys/capaian-siswa',
        name: 'kelola.analys.capaian.siswa',
        component: AnalysSiswa,
        meta: { title: 'Analys capaian siswa' }
      },
      {
        path: 'analys/capaian-siswa/:banksoal/:jadwal',
        name: 'kelola.analys.capaian.siswa.data',
        component: AnalysCapaianSiswa,
        meta: { title: 'Analys capaian siswa' }
      },
      {
        path: 'hasil-ujian',
        name: 'kelola.hasil.ujian',
        component: HasilUjian,
        meta: { title: 'Hasil ujian' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from , next) => {
  store.commit('CLEAR_ERRORS')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth
    if (!auth) {
      store.commit('LOADING_PAGE', true)
      next({ name: 'login' })
    }
    else {
      store.commit('LOADING_PAGE', true)
      next()
    }
  }
  else {
    store.commit('LOADING_PAGE', true)
    next()
  }
})


router.afterEach(() => {
  store.commit('LOADING_PAGE', false)
  store.commit('SET_LOADING', false)
})

export default router