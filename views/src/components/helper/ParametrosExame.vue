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
                            <v-snackbar
                                    v-model="snackbar"
                                    :bottom="y === 'bottom'"
                                    :color="color"
                                    :left="x === 'left'"
                                    :multi-line="mode === 'multi-line'"
                                    :right="x === 'right'"
                                    :timeout="timeout"
                                    :top="y === 'top'"
                                    :vertical="mode === 'vertical'"

                                    class="snackbar"
                                >
                                    {{ textoSnackbar }}
                                    <v-btn
                                        dark
                                        text
                                        icon
                                        @click="snackbar = false"
                                    >
                                        <v-icon
                                            class="mr-2"
                                            @click="snackbar = false"
                                        >mdi-close</v-icon>
                                    </v-btn>
                            </v-snackbar>
                            <div class="flex-grow-1"></div>

                            <v-dialog v-model="dialogAddParametro" max-width="1000px">

                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" class="mb-2" @click="dialogAddParametro = true" >Adicionar</v-btn>
                                </template>

                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="6">
                                                    <v-text-field
                                                        v-model="editedItem.parametro"
                                                        :rules="[v => !!v || 'Obrigatório prencher o parâmetro!']"
                                                        label="Parâmetro"
                                                        outlined
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="12" md="6">
                                                    <v-text-field
                                                        v-model="editedItem.unidadeMedida"
                                                        :rules="[v => !!v || 'Obrigatório prencher a unidade medida!']"
                                                        label="Unidade Medida"
                                                        outlined
                                                    ></v-text-field>
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
        props: ['dialog', 'idExame'],
        data: () => ({
            exame: "",
            dialogAddParametro: false,
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
                parametro: "",
                unidadeMedida: "",
                idExame: null,
                createdAt: "",
                updatedAt: ""
            },
            defaultItem: {
                parametro: "",
                unidadeMedida: "",
                idExame: null,
                createdAt: "",
                updatedAt: ""
            },
            textoSnackbar: "",
            color: 'success',
            mode: '',
            snackbar: false,
            timeout: 6000,
            x: null,
            y: 'top',
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
                this.axios.get('http://localhost:3000/exame/' + this.idExame).then(response => {
                    this.exame = response.data;
                });

                this.atualizaParametros();
            },
            dialogAddParametro (val) {
                val || this.close()
            },
        },
        methods: {
            initialize () {

            },
            atualizaParametros() {
                this.axios.get('http://localhost:3000/parametroExame/getByIdExame/' + this.idExame ).then(response => {
                    this.desserts = response.data;
                });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogAddParametro = true;
            },
            deleteItem (item) {
                this.axios.delete('http://localhost:3000/parametroExame/' + item.id + "/delete").then(response => {
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
            close () {
                //this.dialog = false;
                this.dialogAddParametro = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300);
            },
            validaCampos() {
                return  this.editedItem.escala != '';
            },
            save () {
                if (this.editedIndex > -1) {
                    this.editedItem.idExame = this.idExame;
                    this.axios.put('http://localhost:3000/parametroExame', this.editedItem).then(response => {
                        if(response.data){
                            this.textoSnackbar = "Registro atualizado com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.atualizaParametros();
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
                        this.axios.post('http://localhost:3000/parametroExame', this.editedItem).then(response => {
                            if(response.data.id){
                                this.textoSnackbar = "Escala inserida com sucesso!";
                                this.snackbar = true;
                                this.color = 'success';
                                this.atualizaParametros();
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
