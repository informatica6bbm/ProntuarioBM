<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-autocomplete
                                v-model="exame.idPessoa"
                                :items="pessoas"
                                :filter="customFilterPessoa"
                                item-text="nome"
                                item-value="id"
                                label="Pessoa"
                                outlined
                            ></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="9" sm="12" md="9">
                            <v-autocomplete
                                v-model="exame.idExame"
                                :items="exames"
                                :filter="customFilterExame"
                                item-text="exame"
                                item-value="id"
                                label="Exame"
                                outlined
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="3" sm="12" md="3">
                            <v-text-field
                                v-model="exame.data"
                                :rules="[v => !!v || 'Obrigatório prencher a data do exame!']"
                                v-mask="['##/##/####']"
                                label="Data Realização exame"
                                outlined
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <tabela-resultado-exame-parametros
                                v-bind:idResultadoExame="idResultadoExame"
                                v-bind:idExame="idExame"
                                v-bind:salvaParametros="salvaParametros"
                            ></tabela-resultado-exame-parametros>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            pessoas: [],
            exames: [],
            parametros: [],
            idResultadoExame: null,
            idExame: null,
            salvaParametros: false,
            editedIndex: -1,
            exame: {
                idPessoa: "",
                idExame: "",
                data: "",
                resultadoParametros: [],
                createdAt: "",
                updatedAt: ""
            },
            defaultItem: {
                idPessoa: "",
                idExame: "",
                data: "",
                resultadoParametros: [],
                createdAt: "",
                updatedAt: ""
            }
        }),
        props: [
            'dialogNovo'
        ],
        created () {
            this.initialize()
        },
        watch: {
            dialog(val) {
                if(!val) {
                    this.$emit('close');
                }
            },
            dialogNovo(val) {
                if(val) {
                    this.dialog = true;
                }
            },
            'exame.idExame'(val) {
                this.idExame = val;
            },

        },
        methods: {
            initialize () {
                this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                    this.pessoas = response.data;
                });

                this.axios.get(process.env.VUE_APP_URL_API + '/exame').then(response => {
                    this.exames = response.data;
                });
            },
            close () {
                this.dialog = false;
                this.$emit('close');
            },
            customFilterPessoa (item, queryText) {
                const textOne = item.nome.toLowerCase();
                const searchText = queryText.toLowerCase();

                return textOne.indexOf(searchText) > -1;
            },
            customFilterExame (item, queryText) {
                const textOne = item.exame.toLowerCase();
                const searchText = queryText.toLowerCase();
                return textOne.indexOf(searchText) > -1;
            },
            save () {
                if(this.validaCampos()){
                    this.exame.resultadoParametros = this.parametros;
                    this.axios.post(process.env.VUE_APP_URL_API + '/resultadoexame', this.exame).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Registro inserido com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.idResultadoExame = response.data.id;
                            this.initialize();
                            this.close();

                            this.salvaParametros = true;
                            this.parametros = [];
                            this.itemresultado = this.itemresultadoDefault;
                        }

                        if(!response.data.id) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                        }
                    });
                }

                if(!this.validaCampos()) {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Existe campos vazios ou incorretos!";
                }
            },
            validaValoresExame() {
                var camposValidos = false;
                var i = 0;
                for(i in this.parametros){
                    if(this.parametros[i].valor != "") {
                        camposValidos = true;
                    }else {
                        camposValidos = false;
                        break;
                    }
                }

                return camposValidos;
            },
            validaCampos() {
                return  this.exame.idPessoa != "" &&
                        this.exame.idExame != "" &&
                        this.exame.data != "";
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nova Resultado' : 'Editar Resultado'
            }
        },
    }
</script>
