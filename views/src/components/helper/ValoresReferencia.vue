<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card>
                <v-toolbar dark color="error">
                    <v-btn icon dark @click="$emit('setFalseDialog')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ exame.exame }}</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                        <v-toolbar-items>
                        <v-btn dark text @click="$emit('setFalseDialog')">Salvar</v-btn>
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

                            <snackbar
                                :textoSnackbar="textoSnackbar"
                                :color="color"
                                :snackbar="snackbar"
                                v-on:closeSnackbar="closeSnackbar"
                            ></snackbar>

                            <div class="flex-grow-1"></div>

                            <v-dialog v-model="dialogAddValorReferencia" max-width="1000px">

                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" class="mb-2" @click="dialogAddValorReferencia = true" >Adicionar</v-btn>
                                </template>

                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="4">
                                                    <v-text-field
                                                        v-model="editedItem.valorMinimo"
                                                        :rules="[v => !!v || 'Obrigatório prencher o valor mínimo!']"
                                                        label="Valor mínimo"
                                                        outlined
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="4">
                                                    <v-select
                                                        :items="comparacoes"
                                                        v-model="editedItem.comparacao"
                                                        :rules="[v => !!v || 'Obrigatório prencher a comparação!']"
                                                        label="Comparação"
                                                        outlined
                                                    ></v-select>
                                                </v-col>

                                                <v-col cols="12" sm="12" md="4">
                                                    <v-text-field
                                                        v-model="editedItem.valorMaximo"
                                                        :rules="[v => !!v || 'Obrigatório prencher o valor maximo!']"
                                                        label="Valor maximo"
                                                        outlined
                                                    ></v-text-field>
                                                </v-col>

                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" sm="12" md="4">
                                                    <v-text-field
                                                        v-model="editedItem.idadeMinimo"
                                                        :rules="[v => !!v || 'Obrigatório prencher a idade mínimo!']"
                                                        label="Idade mínima"
                                                        outlined
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="4">
                                                    <v-select
                                                        :items="comparacoes"
                                                        v-model="editedItem.idade"
                                                        :rules="[v => !!v || 'Obrigatório prencher a comparação idade!']"
                                                        label="Comparação"
                                                        outlined
                                                    ></v-select>
                                                </v-col>

                                                <v-col cols="12" sm="12" md="4">
                                                    <v-text-field
                                                        v-model="editedItem.idadeMaximo"
                                                        :rules="[v => !!v || 'Obrigatório prencher a idade maxima!']"
                                                        label="Idade maxima"
                                                        outlined
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" sm="12" md="4">
                                                    <v-select
                                                        :items="sexos"
                                                        v-model="editedItem.sexo"
                                                        :rules="[v => !!v || 'Obrigatório selecionar o sexo!']"
                                                        label="Sexo"
                                                        outlined
                                                    ></v-select>
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
                        </v-toolbar>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
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
        props: ['dialog', 'idParametro'],
        data: () => ({
            parametro: "",
            dialogAddValorReferencia: false,
            comparacoes: [
                {
                    text: "< (Menor que minimo)",
                    value: "<"
                },
                {
                    text: "> (Maior que maximo)",
                    value: ">"
                },
                {
                    text: "<> (Entre o minimo e maximo)",
                    value: "<>"
                }
            ],
            sexos: [
                "FEMININO",
                "MASCULINO"
            ],
            headers: [
                {
                    text: 'Parâmetro',
                    align: 'left',
                    sortable: true,
                    value: 'parametro',
                },
                { text: 'Unidade medida', value: 'unidadeMedida' },
                { text: 'Ações', value: 'action', sortable: false },
            ],
            desserts: [],
            search: "",
            rowsPerPageItems: [8, 12, 15],
            pagination: {
                rowsPerPage: 20
            },
            editedIndex: -1,
            editedItem: {
                comparacao: "",
                idade: "",
                idadeMinima: "",
                idadeMaxima: "",
                valorMinimo: 0,
                valorMaximo: 0,
                sexo: "",
                idParametro: null,
                createdAt: "",
                updatedAt: ""
            },
            defaultItem: {
                comparacao: "",
                idade: "",
                idadeMinima: "",
                idadeMaxima: "",
                valorMinimo: 0,
                valorMaximo: 0,
                sexo: "",
                idParametro: null,
                createdAt: "",
                updatedAt: ""
            },
            textoSnackbar: "",
            color: 'success',
            snackbar: false
        }),
        created () {
            this.initialize()
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Novo Parâmetro' : 'Editar Parâmetro'
            }
        },
        watch: {
            dialog() {
                this.axios.get('http://localhost:3000/referenciaParametroExame/getByIdParametro/' + this.idParametro).then(response => {
                    this.parametro = response.data;
                });

                this.atualizaValoresReferencia();
            },
            dialogAddValorReferencia (val) {
                val || this.close()
            },
        },
        methods: {
            initialize () {
                this.dialog = false;
            },

            closeSnackbar () {
                this.snackbar = false;
            },
            atualizaValoresReferencia() {
                this.axios.get('http://localhost:3000/valoresReferenciaParametroExame/getByIdParametro/' + this.idExame ).then(response => {
                    this.desserts = response.data;
                });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogAddValorReferencia = true;
            },
            deleteItem (item) {
                this.axios.delete('http://localhost:3000/valoresReferenciaParametroExame/' + item.id + "/delete").then(response => {
                    if(response.data){
                        this.snackbar = true;
                        this.color = 'success';
                        this.textoSnackbar = "Parâmetro apagado com sucesso!";
                        this.atualizaValoresReferencia()
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                    }
                });
            },
            close () {
                this.dialogAddValorReferencia = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                }, 300);
            },
            validaCampos() {
                return  this.editedItem.escala != '';
            },
            save () {
                if (this.editedIndex > -1) {
                    this.editedItem.idParametro = this.idParametro;
                    this.axios.put('http://localhost:3000/valoresReferenciaParametroExame', this.editedItem).then(response => {
                        if(response.data){
                            this.textoSnackbar = "Registro atualizado com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.atualizaValoresReferencia();
                            this.dialogAddParametro = false;
                        }else {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Ocorreu um erro ao atualizar!";
                            this.dialogAddParametro = false;
                        }
                    });
                } else {
                    if(this.validaCampos()){
                        this.editedItem.idExame = this.idExame;
                        this.axios.post('http://localhost:3000/valoresReferenciaParametroExame', this.editedItem).then(response => {
                            if(response.data.id){
                                this.textoSnackbar = "Escala inserida com sucesso!";
                                this.snackbar = true;
                                this.color = 'success';
                                this.atualizaValoresReferencia();
                                this.dialogAddParametro = false;
                            }else {
                                this.snackbar = true;
                                this.color = 'error';
                                this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                                this.dialogAddParametro = false;
                            }
                        });
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Existe campos vazios ou incorretos!";
                        this.dialogAddParametro = false;
                    }
                }
            },
        }
    }

</script>
