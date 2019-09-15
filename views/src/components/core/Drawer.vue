<template>
    <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
    >
        <template v-slot:img="attrs">
            <v-img
                v-bind="attrs"
                gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
            />
        </template>

        <v-list-item two-line>
            <v-list-item-avatar color="white">
                <v-img
                src="https://cdn.vuetifyjs.com/images/logos/v.png"
                height="34"
                contain
                />
            </v-list-item-avatar>

            <v-list-item-title class="title">
                Prontuario BM
            </v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3 mb-3" />

        <v-list nav>
            <div />

            <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            active-class="error white--text"
            >
                <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-title v-text="link.text" />
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: 'Início'
        },
        {
          to: '/batalhoes',
          icon: 'mdi-clipboard-outline',
          text: 'Batalhões'
        },
        {
          to: '/escalas',
          icon: 'mdi-scale',
          text: 'Escalas'
        },
        {
          to: '/hierarquias',
          icon: 'mdi-chart-bubble',
          text: 'Hierarquia'
        },
        {
          to: '/pessoas',
          icon: 'mdi-account-multiple',
          text: 'Pessoas'
        },
        {
          to: '/setores',
          icon: 'mdi-map-marker',
          text: 'Setores'
        },
        {
          to: '/notifications',
          icon: 'mdi-settings',
          text: 'Configurações'
        }
      ]
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
    }
  }
</script>
