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



            <v-list-group
              :key="'Almoxarifado'"
              :prepend-icon="'mdi-city'"
              no-action
              class="menu-accordion"
            >

            <template v-slot:activator>
              <v-list-item
                :style="{'margin-left': '-15px'}"
              >
                <v-list-item-title v-text="'Cadastros'"></v-list-item-title>
              </v-list-item>
            </template>

              <v-list-item
                :key="'Batalhoes'"
                :to="'/batalhoes'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Batalhões'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Escalas'"
                :to="'/escalas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Escalas'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>               


              <v-list-item
                :key="'Exames'"
                :to="'/exames'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Exames'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Hierarquia'"
                :to="'/hierarquia'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Hierarquia'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Setores'"
                :to="'/setores'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Setores'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>   

            </v-list-group>


            <v-list-group
              :key="'Almoxarifado'"
              :prepend-icon="'mdi-city'"
              no-action
              class="menu-accordion"
            >

            <template v-slot:activator>
              <v-list-item
                :style="{'margin-left': '-15px'}"
              >
                <v-list-item-title v-text="'Pacientes'"></v-list-item-title>
              </v-list-item>
            </template>

              <v-list-item
                :key="'Pessoas'"
                :to="'/pessoas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Pacientes'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>   

              <v-list-item
                :key="'Pessoas'"
                :to="'/pessoas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'LTS'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Pessoas'"
                :to="'/pessoas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Histórico Doenças'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>   

              <v-list-item
                :key="'Pessoas'"
                :to="'/pessoas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Med. controlado'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>   

            </v-list-group>


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
          to: '/cadastros',
          icon: 'mdi-clipboard-outline',
          text: 'Cadastro'
        },
        {
          to: '/resultadosExames',
          icon: 'mdi-clipboard-outline',
          text: 'Resultados Exames'
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
