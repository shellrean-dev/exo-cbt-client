<template>
    <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
        <button class="c-header-toggler c-class-toggler d-lg-none mr-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
            <span class="c-header-toggler-icon"></span>
        </button>
        <button class="c-header-toggler c-class-toggler ml-3 d-md-down-none" type="button" data-target="#sidebar" data-class="c-sidebar-lg-show" responsive="true">
            <span class="c-header-toggler-icon"></span>
        </button>
        <ul class="c-header-nav d-md-down-none">
            <li class="c-header-nav-item px-3"><a class="c-header-nav-link">Aplikasi pengelola ujian berbasis komputer</a></li>    
        </ul>
        <ul class="c-header-nav ml-auto mr-4">
            <li class="c-header-nav-item dropdown">
                <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="c-avatar"><img class="c-avatar-img" src="/img/user.png" alt="user@email.com"></div>
                </a>
                <div class="dropdown-menu dropdown-menu-right pt-0">
                    <div class="dropdown-header bg-light py-2"><strong>Account</strong></div>
                    <a class="dropdown-item" href="#" @click.prevent="logout">
                        <i class="cil-user"></i> &nbsp; Profile
                    </a>
                    <a class="dropdown-item" href="#" @click.prevent="logout">
                        <i class="cil-account-logout"></i> &nbsp; Logout
                    </a>
                </div>
            </li>
        </ul>
        <div class="c-subheader px-3">
            <!-- <breadcrumb></breadcrumb> -->
        </div>
    </header>
</template>
<script>
import Breadcrumb from './AppBreadcrumb.vue'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        Breadcrumb
    },
}
