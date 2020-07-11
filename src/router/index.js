import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')

import SekolahIndex from '@/views/sekolah/Index'
const DataSekolah = () => import(/* webpackChunkName: "sekolah" */ '@/views/sekolah/Sekolah')

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