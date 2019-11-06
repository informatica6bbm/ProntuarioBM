<template>
    <v-app>
        <core-app-bar v-if="this.$route.name != 'Login' && this.$route.name != 'Prontuario'"/>

        <core-drawer v-if="this.$route.name != 'Login' && this.$route.name != 'Prontuario'" />

        <core-view />
    </v-app>
</template>

<script>
    export default {
        components: {
            CoreDrawer: () => import('@/components/core/Drawer'),
            CoreAppBar: () => import('@/components/core/AppBar'),
            CoreView: () => import('@/components/core/View')
        }
    }
</script>

<style>

</style>
