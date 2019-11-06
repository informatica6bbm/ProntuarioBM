<template>
  <v-app-bar
    id="core-app-bar"
    absolute
    app
    color="transparent"
    flat
    height="50"
  >
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn
        icon
        @click.stop="onClick"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>

    <v-spacer />
    <v-toolbar-items>
        <v-row
            align="center"
            class="mx-0"
        >
        <v-menu
            bottom
            left
            offset-y
            transition="slide-y-transition"
        >

            <template v-slot:activator="{ attrs, on }">
                <v-btn
                class="toolbar-items"
                icon
                v-bind="attrs"
                v-on="on"
                >
                    <v-badge
                        color="error"
                        overlap
                    >
                        <template slot="badge">
                            {{ notifications.length }}
                        </template>
                        <v-icon color="tertiary">
                            mdi-bell
                        </v-icon>
                    </v-badge>
                </v-btn>
            </template>

            <v-card>
                <v-list dense>
                    <v-list-item
                        v-for="notification in notifications"
                        :key="notification"
                    >
                        <v-list-item-title v-text="notification" />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>

            <v-btn
                to="/user-profile"
                icon
            >
                <v-icon color="tertiary">
                    mdi-account
                </v-icon>
            </v-btn>

            <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                        color="primary"
                        dark
                        icon
                        v-on="{ ...tooltip }"
                        @click="sair"
                    >
                    <v-icon color="tertiary">
                        mdi-account-arrow-right
                    </v-icon>
                    </v-btn>
                </template>
                <span>Sair</span>
            </v-tooltip>

        </v-row>

    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  export default {
    data: () => ({
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      title: null,
      responsive: false
    }),

    watch: {
      '$route' (val) {
        this.title = val.name
      }
    },

    mounted () {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },

    methods: {
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
        onClick () {
            this.setDrawer(!this.$store.state.app.drawer)
        },
        onResponsiveInverted () {
            if (window.innerWidth < 991) {
                this.responsive = true
            } else {
                this.responsive = false
            }
        },
        sair() {
            var token = localStorage.getItem("tokenlogin");
            var data = {
                token: token
            }
            localStorage.removeItem("tokenlogin");
            this.axios.post(process.env.VUE_APP_URL_API + '/login/loginoff', data).then(function() {
                window.location.replace("http://localhost:8080/login");
            });

        }
    }
  }
</script>

<style>
  /* Fix coming in v2.0.8 */
  #core-app-bar {
    width: auto;
  }

  #core-app-bar a {
    text-decoration: none;
  }
</style>
