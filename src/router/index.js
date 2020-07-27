import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Oauth = () => import('@/views/Oauth')

import SettingIndex from '@/views/setting/Index'
const SetSekolah = () => import(/* webpackChunkName: "A0" */ '@/views/setting/Sekolah')
const SetSystem = () => import(/* webpackChunkName: "A0" */ '@/views/setting/System')
const SetAirlock = () => import(/* webpackChunkName: "A0" */ '@/views/setting/Airlock')
const SetG2fk = () => import(/* webpackChunkName: "A0" */ '@/views/setting/G2fk')
const SetUjian = () => import(/* webpackChunkName: "A0" */ '@/views/setting/Ujian')

import JurusanIndex from '@/views/jurusan/Index'
const DataJurusan = () => import(/* webpackChunkName: "A1" */ '@/views/jurusan/Jurusan')
const EditJurusan = () => import(/* webpackChunkName: "A1" */ '@/views/jurusan/Edit')
const AddJurusan = () => import(/* webpackChunkName: "A1" */ '@/views/jurusan/Add')

import PesertaIndex from '@/views/peserta/Index'
const DataPeserta = () => import(/* webpackChunkName: "A2" */ '@/views/peserta/Peserta')
const AddPeserta = () => import(/* webpackChunkName: "A2" */ '@/views/peserta/Add')
const EditPeserta = () => import(/* webpackChunkName: "A2" */ '@/views/peserta/Edit')
const UploadPeserta = () => import(/* webpackChunkName: "A2" */ '@/views/peserta/Upload')
const KartuPeserta = () => import(/* webpackChunkName: "A2" */ '@/views/peserta/Kartu')

import MatpelIndex from '@/views/matpel/Index'
const DataMatpel = () => import(/* webpackChunkName: "A3" */ '@/views/matpel/Matpel')
const AddMatpel = () => import(/* webpackChunkName: "A3" */ '@/views/matpel/Add')
const UploadMatpel = () => import(/* webpackChunkName: "A3" */ '@/views/matpel/Upload')
const EditMatpel = () => import(/* webpackChunkName: "A3" */ '@/views/matpel/Edit')

import GuruIndex from '@/views/guru/Index'
const DataGuru = () => import(/* webpackChunkName: "A7" */'@/views/guru/Guru')
const AddGuru = () => import(/* webpackChunkName: "A7" */'@/views/guru/Add')
const UploadGuru = () => import(/* webpackChunkName: "A7" */'@/views/guru/Upload')
const EditGuru = () => import(/* webpackChunkName: "A7" */'@/views/guru/Edit')

import BanksoalIndex from '@/views/banksoal/Index'
const DataBanksoal = () => import(/* webpackChunkName: "A4" */ '@/views/banksoal/DataBanksoal')
const SoalBanksoal = () => import(/* webpackChunkName: "A4" */'@/views/banksoal/SoalBanksoal')
const SoalBanksoalTambah = () => import(/* webpackChunkName: "A4" */'@/views/banksoal/SoalBanksoalTambah')
const SoalBanksoalTemplate = () => import(/* webpackChunkName: "A4" */'@/views/banksoal/SoalBanksoalTemplate')
const SoalBanksoalEdit = () => import(/* webpackChunkName: "A4" */'@/views/banksoal/SoalBanksoalEdit')
const SoalBanksoalPrev = () => import(/* webpackChunkName: "A4" */'@/views/banksoal/SoalBanksoalPrev')
const SoalBanksoalUpload = () => import(/* webpackChunkName: "A4" */ '@/views/banksoal/SoalBanksoalUpload')

import FilemediaIndex from '@/views/filemedia/Index'
const DataFilemedia = () => import(/* webpackChunkName: "A8" */'@/views/filemedia/Filemedia')
const DataDirFilemedia = () => import(/* webpackChunkName: "A8" */'@/views/filemedia/DirFilemedia')

import UjianIndex from '@/views/ujian/Index'
const DataUjian = () => import(/* webpackChunkName: "A5" */'@/views/ujian/Ujian')
const StatusUjian = () => import(/* webpackChunkName: "A5" */'@/views/ujian/StatusUjian')
const PesertaUjian = () => import(/* webpackChunkName: "A5" */'@/views/ujian/PesertaUjian')
const ResetPesertaUjian = () => import(/* webpackChunkName: "A5" */'@/views/ujian/ResetPesertaUjian')
const DataEvent = () => import(/* webpackChunkName: "A5" */'@/views/ujian/Event')

import KelolaIndex from '@/views/kelola/Index'
const KoreksiEsay = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/KoreksiEsay')
const KoreksiNilaiEsay = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/KoreksiNilaiEsay')
const AnalysBanksoal = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/AnalysBanksoal')
const AnalysKesulitanBanksoal = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/AnalysKesulitanBanksoal')
const AnalysSiswa = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/AnalysSiswa')
const AnalysCapaianSiswa = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/AnalysCapaianSiswa');
const HasilUjian = () => import(/* webpackChunkName: "A6" */ '@/views/kelola/HasilUjian')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/oauth/:token',
    name: 'oauth',
    component: Oauth
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
      },
      {
        path: 'system',
        name: 'system.setting',
        component: SetSystem,
        meta: { title: 'Setting system' }
      },
      {
        path: 'airlock',
        name: 'system.airlock',
        component: SetAirlock,
        meta: { title: 'Setting airlock authentication' }
      },
      {
        path: 'g2fa',
        name: 'system.g2fa',
        component: SetG2fk,
        meta: { title: 'Setting google 2 factor authentication' }
      },
      {
        path: 'ujian',
        name: 'system.ujian',
        component: SetUjian,
        meta: { title: 'Setting ujian' }
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
      },
      {
        path: 'upload',
        name: 'matpel.upload',
        component: UploadMatpel,
        meta: { title: 'Upload mata pelajaran' }
      }
    ]
  },
  {
    path: '/pengguna',
    component: GuruIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'guru.data',
        component: DataGuru,
        meta: { title: 'Manage pengguna' }
      },
      {
        path: 'add',
        name: 'guru.add',
        component: AddGuru,
        meta: { title: 'Tambah pengguna' }
      },
      {
        path: 'edit/:id',
        name: 'guru.edit',
        component: EditGuru,
        meta: { title: 'Edit pengguna' }
      },
      {
        path: 'upload',
        name: 'guru.upload',
        component: UploadGuru,
        meta: { title: 'Upload pengguna' }
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
        path: ':banksoal_id/upload',
        name: 'banksoal.upload',
        component: SoalBanksoalUpload,
        meta: { title: 'Upload soal banksoal' }
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
    path: '/filemedia',
    component: FilemediaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'filemedia.data',
        component: DataFilemedia,
        meta: { title: 'Manage filemedia' }
      },
      {
        path: ':directory_id',
        name: 'filemedia.directory',
        component: DataDirFilemedia,
        meta: { title: 'Manage directory filemedia' }
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
        name: 'ujian.peserta-reset',
        component: ResetPesertaUjian,
        meta: { title: 'Reset peserta ujian' }
      },
      {
        path: 'event',
        name: 'ujian.event.data',
        component: DataEvent,
        meta: { title: 'Manage event ujian'}
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