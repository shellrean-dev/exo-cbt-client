import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')

import SettingIndex from '@/views/setting/Index'
const SetSekolah = () => import( '@/views/setting/Sekolah')
const SetSystem = () => import( '@/views/setting/System')
const SetUjian = () => import( '@/views/setting/Ujian')
const SetToken = () => import( '@/views/setting/Token')

import JurusanIndex from '@/views/jurusan/Index'
const DataJurusan = () => import( '@/views/jurusan/Jurusan')
const EditJurusan = () => import( '@/views/jurusan/Edit')
const AddJurusan = () => import( '@/views/jurusan/Add')

import PesertaIndex from '@/views/peserta/Index'
const DataPeserta = () => import( '@/views/peserta/Peserta')
const AddPeserta = () => import( '@/views/peserta/Add')
const EditPeserta = () => import( '@/views/peserta/Edit')
const UploadPeserta = () => import( '@/views/peserta/Upload')
const KartuPeserta = () => import( '@/views/peserta/Kartu')
const BlockedPeserta = () => import( '@/views/peserta/BlockedPeserta')

import MatpelIndex from '@/views/matpel/Index'
const DataMatpel = () => import( '@/views/matpel/Matpel')
const AddMatpel = () => import( '@/views/matpel/Add')
const UploadMatpel = () => import( '@/views/matpel/Upload')
const EditMatpel = () => import( '@/views/matpel/Edit')

import GuruIndex from '@/views/guru/Index'
const DataGuru = () => import('@/views/guru/Guru')
const AddGuru = () => import('@/views/guru/Add')
const UploadGuru = () => import('@/views/guru/Upload')
const EditGuru = () => import('@/views/guru/Edit')

import BanksoalIndex from '@/views/banksoal/Index'
const DataBanksoal = () => import( '@/views/banksoal/DataBanksoal')
const SoalBanksoal = () => import('@/views/banksoal/soal/SoalList')
const SoalBanksoalTambah = () => import('@/views/banksoal/soal/SoalTambah')
const SoalBanksoalTemplate = () => import('@/views/banksoal/SoalBanksoalTemplate')
const SoalBanksoalEdit = () => import('@/views/banksoal/soal/SoalEdit')
const SoalBanksoalPrev = () => import('@/views/banksoal/SoalBanksoalPrev')
const SoalBanksoalUpload = () => import( '@/views/banksoal/SoalBanksoalUpload')
const SoalBanksoalTambahBulk = () => import('@/views/banksoal/soal_bulk/SoalTambah')

import BanksoalAdaptifIndex from '@/views/banksoal_adaptif/Index'
const DataBanksoalAdaptif = () => import('@/views/banksoal_adaptif/DataBanksoal')

import FilemediaIndex from '@/views/filemedia/Index'
const DataFilemedia = () => import('@/views/filemedia/Filemedia')
const DataDirFilemedia = () => import('@/views/filemedia/DirFilemedia')

import UjianIndex from '@/views/ujian/Index'
const DataUjian = () => import('@/views/ujian/Ujian')
const StatusUjian = () => import('@/views/pelaksanaan/StatusUjian')
const PesertaUjian = () => import('@/views/pelaksanaan/PesertaUjian')
const ResetPesertaUjian = () => import('@/views/pelaksanaan/ResetPesertaUjian')

import EventIndex from '@/views/event/Index'
const BeritaAcara = () => import('@/views/event/BeritaAcara')
const DataEvent = () => import('@/views/event/Event')
const EventPeserta = () => import('@/views/event/KartuPeserta');
const Absensi = () => import('@/views/event/Absensi')

import KelolaIndex from '@/views/kelola/Index'
const KoreksiEsay = () => import('@/views/kelola/koreksi/KoreksiEsayIndex')
const KoreksiNilaiEsay = () => import('@/views/kelola/koreksi/KoreksiNilaiEsay')
const KoreksiArgument = () => import('@/views/kelola/koreksi/ArgumentIndex')
const KoreksiNilaiArgument = () => import('@/views/kelola/koreksi/ArgumentNilai')

const AnalysBanksoal = () => import('@/views/kelola/AnalysBanksoal')
const AnalysKesulitanBanksoal = () => import('@/views/kelola/analys/Kesulitan')
const AnalysSiswa = () => import('@/views/kelola/AnalysSiswa')
const AnalysCapaianSiswa = () => import('@/views/kelola/AnalysCapaianSiswa')
const HasilUjian = () => import('@/views/kelola/HasilUjian')
const DetailJawabanSiswa = () => import('@/views/kelola/detail/JawabanSiswa')
const LedgerPeserta = () => import('@/views/kelola/ledger/LedgerPeserta')

import GroupIndex from '@/views/grup/Index'
const DataGrup = () => import('@/views/grup/Grup')

import AgamaIndex from '@/views/agama/Index'
const DataAgama = () => import('@/views/agama/Agama')

import BackupIndex from '@/views/backup/Index'
import UAWhitelist from "@/views/setting/UAWhitelist.vue";
const DataBackup = () => import('@/views/backup/Backup')

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
    path: '/msxDOoaCaCuZYDshDoSH',
    component: SettingIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'H5T5PiNMir0zXHOzAlPP',
        name: 'sekolah.setting',
        component: SetSekolah,
        meta: { title: 'Data sekolah' }
      },
      {
        path: 'OjsjffzkZ0o6NgpP7Mna',
        name: 'system.setting',
        component: SetSystem,
        meta: { title: 'Setting system' }
      },
      {
        path: 'l2OpZJGlymwIDTh3JSol',
        name: 'system.ujian',
        component: SetUjian,
        meta: { title: 'Setting ujian' }
      },
      {
        path: 'iplLe7X7ncKxkHiUNEcQ',
        name: 'system.token',
        component: SetToken,
        meta: { title: 'Setting token' }
      },
      {
        path: 'YbAcg2XTyPly240mrNgW',
        name: 'user.agent.whitelist',
        component: UAWhitelist
      }
    ]
  },
  {
    path: '/OVx1MkBcsKxvIQRlOiGb',
    component: JurusanIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'Fj58ufaUPyRF8bfhjMY3',
        name: 'jurusan.data',
        component: DataJurusan,
        meta: { title: 'Manage jurusan' }
      },
      {
        path: '6rI0BDWAHZiukPP0XklO',
        name: 'jurusan.add',
        component: AddJurusan,
        meta: { title: 'Tambah jurusan' }
      },
      {
        path: 'EHwJHVNounHTupzWdjcs/:id',
        name: 'jurusan.edit',
        component: EditJurusan,
        meta: { title: 'Edit nama jurusan' }
      }
    ]
  },
  {
    path: '/OczNnu8GWBveDLurtYGo',
    component: PesertaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'ebY4Yy6rXiVFpCsPdE1w',
        name: 'peserta.data',
        component: DataPeserta,
        meta: { title: 'Manage peserta' }
      },
      {
        path: 'l6fwO7wGuPVqoNUCtB1h',
        name: 'peserta.add',
        component: AddPeserta,
        meta: { title: 'Tambah peserta' }
      },
      {
        path: '0IwThp4uGhMPzl6k1rGO/:id',
        name: 'peserta.edit',
        component: EditPeserta,
        meta: { title: 'Edit data peserta' }
      },
      {
        path: 'ALu4sJN4QHVDwQaQqZD8',
        name: 'peserta.upload',
        component: UploadPeserta,
        meta: { title: 'Upload datapeserta' }
      },
      {
        path: 'aF9VdS8Z7TcjjntXQYav',
        name: 'peserta.kartu',
        component: KartuPeserta,
        meta: { title: 'Kartu peserta' }
      },
      {
        path: 'pJjcq4s79QWrQ26q8gRF',
        name: 'peserta.blocked',
        component: BlockedPeserta,
        meta: { title: 'Blocked peserta '}
      }
    ],
  },
  {
    path: '/W7zv50p9fDT2i1gn9zWy',
    component: MatpelIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'vkVu4RW8qEfxsXA7APxJ',
        name: 'matpel.data',
        component: DataMatpel,
        meta: { title: 'Manage mata pelajaran' }
      },
      {
        path: 'UxvXCgSBDdJsy89yMwfE',
        name: 'matpel.add',
        component: AddMatpel,
        meta: { title: 'Tambah mata pelajara' }
      },
      {
        path: 'vua1TsZLnODNTU7Yvk2E/:id',
        name: 'matpel.edit',
        component: EditMatpel,
        meta: { title: 'Edit mata pelajaran' }
      },
      {
        path: 'eweFdwWLt9G2pJOsqug5',
        name: 'matpel.upload',
        component: UploadMatpel,
        meta: { title: 'Upload mata pelajaran' }
      }
    ]
  },
  {
    path: '/mcgenibEq2FGn6mLX8TE',
    component: GuruIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'nOx6gK1nYq3wHNIEpkNt',
        name: 'guru.data',
        component: DataGuru,
        meta: { title: 'Manage pengguna' }
      },
      {
        path: 'iURrRWJiaQ2jL1a63nlL',
        name: 'guru.add',
        component: AddGuru,
        meta: { title: 'Tambah pengguna' }
      },
      {
        path: 'FbRD5UTOPPUSXJpFxlma/:id',
        name: 'guru.edit',
        component: EditGuru,
        meta: { title: 'Edit pengguna' }
      },
      {
        path: 'fc6tAAVRVPSurO5hN9FM',
        name: 'guru.upload',
        component: UploadGuru,
        meta: { title: 'Upload pengguna' }
      }
    ]
  },
  {
    path: '/djDX93svWCsFXOIv40Ly',
    component: BanksoalIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'iijezPzKHwVzITnCJHp1',
        name: 'banksoal.data',
        component: DataBanksoal,
        meta: { title: 'Manage banksoal' }
      },
      {
        path: ':banksoal_id/W0qWOQ1oXzcUpmgXN7y5',
        name: 'banksoal.soal',
        component: SoalBanksoal,
        meta: { title: 'Manage soal' }
      },
      {
        path: ':banksoal_id/408bktE669vhwAPgofe5/AVUOVGCfCiTPwtikKFgP',
        name: 'banksoal.soal.tambah',
        component: SoalBanksoalTambah,
        meta: { title: 'Tambah soal' }
      },
      {
        path: ':banksoal_id/oHQ2RworawVDj5hWLmPr/IvViuMHt0grdqts18DAt',
        name: 'banksoal.soal.paste',
        component: SoalBanksoalTemplate,
        meta: { title: 'Tambah soal' }
      },
      {
        path: ':banksoal_id/2AtLJVJCooCShX66ZsVa',
        name: 'banksoal.upload',
        component: SoalBanksoalUpload,
        meta: { title: 'Upload soal banksoal' }
      },
      {
        path: ':banksoal_id/IetL04hcdM7w4idMeahx/:soal_id',
        name: 'banksoal.soal.edit',
        component : SoalBanksoalEdit,
        meta: { title: 'Edit soal' }
      },
      {
        path: ':banksoal_id/ymiWG674yQnYjvOgngA6',
        name: 'banksoal.prev',
        component: SoalBanksoalPrev,
        meta: { title: 'Preview soal banksoal' }
      },
      {
        path: ':banksoal_id/xILFhkvQIaVGCqjJJyDW/0KBmRFCpdc8fDiOzRxkS',
        name: 'banksoal.soal.tambah.bulk',
        component: SoalBanksoalTambahBulk,
        meta: { title: 'Tambah soal' }
      }
    ]
  },
  {
    path: '/4xrRN8ze3oc6cvWID4p1',
    component: BanksoalAdaptifIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'xsBposmJzhCNt3qx3vJY',
        name: 'banksoal.adaptif.data',
        component: DataBanksoalAdaptif,
        meta: { title: 'Manage banksoal adaptif' }
      }
    ]
  },
  {
    path: '/eIrBZhDfjdcXzuGtww77',
    component: FilemediaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'Xj0hkfksfOH0OLeHQUQJ',
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
    path: '/1ykkPK6f0pCg3MJLeGEm',
    component: UjianIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'YgIfNj4hiYUUUroL7UCz',
        name: 'ujian.data',
        component: DataUjian,
        meta: { title: 'Manage ujian' }
      },
      {
        path: 'Bkyp4S6vW6kk7roYabHe',
        name: 'ujian.status',
        component: StatusUjian,
        meta: { title: 'Status ujian' }
      },
      {
        path: 'GUJyeSKBonjg76L6x0r1',
        name: 'ujian.peserta',
        component: PesertaUjian,
        meta: { title: 'Peserta ujian' }
      },
      {
        path: 'NpMiNODYnQHqcpBHgsTe/ZpbkPALzKKUXeaXBM0F0',
        name: 'peserta.reset',
        component: ResetPesertaUjian,
        meta: { title: 'Reset peserta ujian' }
      }
    ]
  },
  {
    path: '/FBJsuLERSFMNYYWyug86',
    component: EventIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'ni8dj3Ln3zrn6ZsfLlbL',
        name: 'ujian.event.data',
        component: DataEvent,
        meta: { title: 'Manage event ujian'}
      },
      {
        path: ':id/Cx74kEGiUJjnQh28E4GJ',
        name: 'event.berita.acara',
        component: BeritaAcara,
        meta: { title: 'Berita Acara' }
      },
      {
        path: ':event_id/hn5ofmUJhZ2ss7rmfCHA',
        name: 'ujian.event.peserta',
        component: EventPeserta,
        meta: { title: 'Kartu Event Peserta' }
      },
      {
        path: ':event_id/:id/A7NiIePDxx1AnGGzvAyi',
        name: 'event.absensi',
        component: Absensi,
        meta: { title: 'Absensi' }
      }
    ]
  },
  {
    path: '/RXKdUukypWfuvZ8dVf3Y',
    component: KelolaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'IeGxiUgKXPjAGBIr6i8f',
        name: 'kelola.koreksi.esay',
        component: KoreksiEsay,
        meta: { title: 'Koreksi esay siswa'}
      },
      {
        path: 'jmMmEX4s3K0kde4IB1aa/:banksoal',
        name: 'kelola.koreksi.nilai.esay',
        component: KoreksiNilaiEsay,
        meta: { title: 'Koreksi nilai esay' }
      },
      {
        path: 'Hj96q6TrqYth9fiGALcb',
        name: 'kelola.koreksi.argument',
        component: KoreksiArgument,
        meta: { title: 'Koreksi argument siswa' }
      },
      {
        path: 'qyV0s9WcGkNg7MT7dor0/:banksoal',
        name: 'kelola.koreksi.nilai.argument',
        component: KoreksiNilaiArgument,
        meta: { title: 'Koreksi nilai argument' }
      },
      {
        path: 'InlDHUb2hGSABLuOl6Gq/XtPbDIqtB0vhOQcSeE3l',
        name: 'kelola.analys.banksoal',
        component: AnalysBanksoal,
        meta: { title: 'Analys banksoal' }
      },
      {
        path: 'fTvjCJmfPz75o2YUqENK/dfyu4j6hfWGUD3Wgq00I/:banksoal',
        name: 'kelola.analys.kesulitan.banksoal',
        component: AnalysKesulitanBanksoal,
        meta: { title: 'Analys kesulitan banksoal' }
      },
      {
        path: 'GkAyjte50GQ83fU9IIFB/nmGXFjcju1K6mLvfrTP6',
        name: 'kelola.analys.capaian.siswa',
        component: AnalysSiswa,
        meta: { title: 'Analys capaian siswa' }
      },
      {
        path: '0VQZgbaaXIa32YXnv4Aw/Nhsv00vGsAMZBd9Hja81/:banksoal/:jadwal',
        name: 'kelola.analys.capaian.siswa.data',
        component: AnalysCapaianSiswa,
        meta: { title: 'Analys capaian siswa' }
      },
      {
        path: 'rP17Nz5CpHlztD4CRtpa',
        name: 'kelola.hasil.ujian',
        component: HasilUjian,
        meta: { title: 'Hasil ujian' }
      },
      {
        path: 'mK7RRkvmuoVv5qsd52ip/:id',
        name: 'kelola.hasil.ujian.siswa',
        component: DetailJawabanSiswa,
        meta: { title: 'Detail jawaban siswa'}
      },
      {
        path: 'pZGjRNmmkSbp2ULZCxCL',
        name: 'kelola.ledger.peserta',
        component: LedgerPeserta,
        meta: { title: 'Ledger peserta' }
      }
    ]
  },
  {
    path: '/jtJzszFnzknk9ZGKg5Xi',
    component: GroupIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'grup.data',
        component: DataGrup
      }
    ]
  },
  {
    path: '/aAqQwZPtzD7VmkwkjkbT',
    component: AgamaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'agama.data',
        component: DataAgama
      }
    ]
  },
  {
    path: '/0Ru9ZMrREkYFDnfLXU1s',
    component: BackupIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'backup.data',
        component: DataBackup
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
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
