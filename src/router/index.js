import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')

import SekolahIndex from '@/views/sekolah/Index'
const DataSekolah = () => import('@/views/sekolah/Sekolah')

import JurusanIndex from '@/views/jurusan/Index'
const DataJurusan = () => import('@/views/jurusan/Jurusan')
const EditJurusan = () => import('@/views/jurusan/Edit')
const AddJurusan = () => import('@/views/jurusan/Add')

import PesertaIndex from '@/views/peserta/Index'
const DataPeserta = () => import('@/views/peserta/Peserta')
const AddPeserta = () => import('@/views/peserta/Add')
const EditPeserta = () => import('@/views/peserta/Edit')
const UploadPeserta = () => import('@/views/peserta/Upload')
const KartuPeserta = () => import('@/views/peserta/Kartu')

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
    path: '/sekolah',
    component: SekolahIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'sekolah.data',
        component: DataSekolah,
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