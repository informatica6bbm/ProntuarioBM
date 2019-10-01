<div id="app">
    <v-app id="inspire">
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date"
                            label="Picker in menu"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>

        </v-row>
    </v-app>
</div>
