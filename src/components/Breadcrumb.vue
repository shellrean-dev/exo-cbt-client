<template>
   <ol class="breadcrumb border-0 m-0">
     <li class="breadcrumb-item"><router-link :to="{ name: 'home' }">Home</router-link></li>
     <li class="breadcrumb-item active">{{ $route.meta.title }}</li>
   </ol>
</template>

<script>
export default {
    name: 'AppBreadcrumb'
}
</script>