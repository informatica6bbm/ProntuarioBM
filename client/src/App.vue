<template>
    <v-app>
        <core-app-bar v-if="this.$route.name != 'Login'"/>

        <core-drawer v-if="this.$route.name != 'Login'" />

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
