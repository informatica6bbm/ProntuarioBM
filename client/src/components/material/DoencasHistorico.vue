<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card>
                <v-toolbar dark color="error">
                    <v-btn icon dark @click="$emit('close')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ 'Adicionar Doença ao Historico' }}</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                        <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>

                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    class="elevation-1 ma-2"
                    :footer-props="{
                        'items-per-page-options': [8,10,12,14]
                    }"
                >

                    <template v-slot:top>
                        <v-toolbar flat color="white">

                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="5">
                                        <v-text-field
                                            v-model="search"
                                            append-icon="mdi-magnify"
                                            label="Buscar"
                                            single-line
                                            hide-details
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>

                            <div class="flex-grow-1"></div>

                            <v-dialog v-model="dialogAddDoencaHistorico" max-width="1000px">

                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" class="mb-2" @click="openNovaDoenca" >Adicionar</v-btn>
                                </template>

                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ 'Adicionar doença ao histórico' }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="6">
                                                    <v-text-field
                                                        v-model="editedItem.doenca"
                                                        :rules="[v => !!v || 'Obrigatório prencher a doença!']"
                                                        label="Doença"
                                                        outlined
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="12" md="6">
                                                    <v-select
                                                        :items="tiposDoencas"
                                                        v-model="editedItem.tipo"
                                                        :rules="[v => !!v || 'Obrigatório prencher o tipo da doença!']"
                                                        label="Tipo doença"
                                                        outlined
                                                    ></v-select>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <template v-slot:item.action="{ item }">
                                        <v-icon
                                            small
                                            @click="deleteItemDoenca(item)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </template>

                                    <v-card-actions>
                                        <div class="flex-grow-1"></div>
                                        <v-btn color="blue darken-1" text @click="closeNovaDoenca">Cancelar</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                        </template>

                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">Reset</v-btn>
                        </template>

                </v-data-table>

            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            dialogAddDoencaHistorico: false,
            headers: [
                {
                    text: 'Doença',
                    align: 'left',
                    sortable: true,
                    value: 'doenca',
                },
                { text: 'tipo', value: 'tipo' },
                { text: 'Ações', value: 'action', sortable: false },
            ],
            desserts: [],
            search: "",
            editedIndex: -1,
            editedItem: {
                idHistoricoDoenca: null,
                doenca: "",
                tipo: "",
                createdAt: "",
                updatedAt: ""
            },
            defaultItem: {
                idHistoricoDoenca: null,
                doenca: "",
                tipo: "",
                createdAt: "",
                updatedAt: ""
            },
            textoSnackbar: "",
            color: 'success',
            snackbar: false,
            editedIndexValoresReferencia: -1,
            textoSnackbarDoencas: "",
            colorDoencas: 'success',
            dialogDoencas: false,
            mostraTabelaDoencas: false,
            tiposDoencas: [
                'Adiquirida',
                'Familiar',
                'Hereditaria',
                'Transmitida'
            ]
        }),
        props: {
            open: {
                type: Boolean
            },
            idHistorico: {
                type: Number,
            }
        },
        created () {
            this.initialize()
        },
        computed: {
            dialog: {
                get() {
                    return this.open;
                },
                set() {
                    this.$emit('close',false);
                }
            }
        },
        watch: {
            open: function (val) {
                if(val) {
                    this.initialize();
                }
            }
        },
        methods: {
            initialize () {
                this.axios.get(process.env.VUE_APP_URL_API + '/doencasHistorico/' + this.idHistorico).then(response => {
                    this.desserts = response.data;
                });

                this.editedItem = this.defaultItem;
            },
            closeSnackbar () {
                this.snackbar = false;
            },
            deleteItem (item) {
                this.axios.delete(process.env.VUE_APP_URL_API + '/doencasHistorico/' + item.id + "/delete").then(response => {
                    if(response.data){
                        this.snackbar = true;
                        this.color = 'success';
                        this.textoSnackbar = "Parâmetro apagado com sucesso!";
                        this.initialize();
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                    }
                });
            },
            openNovaDoenca(){
                this.dialogAddDoencaHistorico = true;
                this.editedItem.doenca = "";
                this.editedItem.tipo = "";
            },
            closeNovaDoenca(){
                this.dialogAddDoencaHistorico = false;
            },
            close () {
                this.desserts = [];
                this.snackbarValoresReferencia = false;
                this.$emit('close',false);
            },
            save() {
                this.editedItem.idHistoricoDoenca = this.idHistorico;
                console.log(this.editedItem);
                this.axios.post(process.env.VUE_APP_URL_API + '/doencasHistorico', this.editedItem).then(response => {
                    if(response.data) {
                        this.closeNovaDoenca();
                        this.initialize();
                    }
                });
            }
        }
    }

</script>
