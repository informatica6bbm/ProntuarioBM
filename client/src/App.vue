<template>
    <v-app>
        <core-app-bar />

        <core-drawer />

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
