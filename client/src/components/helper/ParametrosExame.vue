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





                                    <v-data-table
                                        :headers="headersValoresRerefencia"
                                        :items="dessertsValoresRerefencia"
                                        class="elevation-1 ma-2"
                                        :footer-props="{
                                            'items-per-page-options': [8,10,12,14]
                                        }"

                                        v-if="mostraTabelaValoresReferencia"
                                    >

                                        <template v-slot:top>
                                            <v-toolbar flat color="white">

                                                <snackbar
                                                    :textoSnackbar="textoSnackbarValoresReferencia"
                                                    :color="colorValoresReferencia"
                                                    :snackbar="snackbarValoresReferencia"
                                                    v-on:closeSnackbar="closeSnackbarValoresReferencia"
                                                ></snackbar>

                                                <div class="flex-grow-1"></div>

                                                <v-dialog v-model="dialogValoresReferencia" max-width="1000px">

                                                    <template v-slot:activator="{ on }">
                                                        <v-btn color="primary" class="mb-2" @click="dialogValoresReferencia = true" >Adicionar</v-btn>
                                                    </template>

                                                    <v-card>
                                                        <v-card-title>
                                                            <span class="headline">{{ formTitleValoresRefencia }}</span>
                                                        </v-card-title>

                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row>
                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-text-field
                                                                            v-model="editedItemValoresReferencia.valorMinimo"
                                                                            :rules="[v => !!v || 'Obrigatório prencher o valor mínimo!']"
                                                                            label="Valor mínimo"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-select
                                                                            :items="comparacoes"
                                                                            v-model="editedItemValoresReferencia.comparacao"
                                                                            :rules="[v => !!v || 'Obrigatório prencher a comparação!']"
                                                                            label="Comparação"
                                                                            outlined
                                                                        ></v-select>
                                                                    </v-col>

                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-text-field
                                                                            v-model="editedItemValoresReferencia.valorMaximo"
                                                                            :rules="[v => !!v || 'Obrigatório prencher o valor maximo!']"
                                                                            label="Valor maximo"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>

                                                                </v-row>

                                                                <v-row>
                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-text-field
                                                                            v-model="editedItemValoresReferencia.idadeMinima"
                                                                            :rules="[v => !!v || 'Obrigatório prencher a idade mínimo!']"
                                                                            label="Idade mínima"
                                                                            outlined
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-select
                                                                            :items="comparacoes"
                                                                            v-model="editedItemValoresReferencia.idade"
                                                                            :rules="[v => !!v || 'Obrigatório prencher a comparação idade!']"
                                                                            label="Comparação"
                                                                            outlined
                                                                        ></v-select>
                                                                    </v-col>

                                                                    <v-col cols="12" sm="12" md="4">
                                                                        <v-text-field
                                                                            v-model="editedItemValoresReferencia.idadeMaxima"
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
                                                                            v-model="editedItemValoresReferencia.sexo"
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
                                                            <v-btn color="blue darken-1" text @click="closeValoresReferencia">Cancelar</v-btn>
                                                            <v-btn color="blue darken-1" text @click="saveValoresReferencia()">Salvar</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-toolbar>
                                        </template>

                                        <template v-slot:item.action="{ item }">
                                            <v-icon
                                                small
                                                class="mr-2"
                                                @click="editItemValorReferencia(item)"
                                            >
                                                mdi-pencil
                                            </v-icon>
                                            <v-icon
                                                small
                                                @click="deleteItemValorReferencia(item)"
                                            >
                                                mdi-delete
                                            </v-icon>
                                            </template>

                                    </v-data-table>

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
            snackbar: false,
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
            dessertsValoresRerefencia: [],
            headersValoresRerefencia: [
                {
                    text: 'Valor',
                    align: 'left',
                    sortable: true,
                    value: 'valor',
                },
                { text: 'idade', value: 'idade' },
                { text: 'sexo', value: 'sexo' },
                { text: 'Ações', value: 'action', sortable: false },
            ],
            editedIndexValoresReferencia: -1,
            editedItemValoresReferencia: {
                comparacao: "",
                idade: "",
                idadeMinima: "",
                idadeMaxima: "",
                valorMinimo: "",
                valorMaximo: "",
                sexo: "",
                idParametro: null,
                createdAt: "",
                updatedAt: ""
            },
            defaultItemValoresReferencia: {
                comparacao: "",
                idade: "",
                idadeMinima: "",
                idadeMaxima: "",
                valorMinimo: "",
                valorMaximo: "",
                sexo: "",
                idParametro: null,
                createdAt: "",
                updatedAt: ""
            },
            textoSnackbarValoresReferencia: "",
            colorValoresReferencia: 'success',
            snackbarValoresReferencia: false,
            dialogValoresReferencia: false,
            mostraTabelaValoresReferencia: false
        }),
        created () {
            this.initialize()
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Novo Parâmetro' : 'Editar Parâmetro'
            },
            formTitleValoresRefencia () {
                return this.editedIndex === -1 ? 'Novo Valor Refêrencia' : 'Editar Valor Refêrencia'
            }
        },
        watch: {
            dialog() {
                this.axios.get(process.env.VUE_APP_URL_API + '/exame/' + this.idExame).then(response => {
                    this.exame = response.data;
                });

                this.atualizaParametros();
            },
            dialogAddParametro (val) {
                this.axios.get(process.env.VUE_APP_URL_API + '/referenciaParametroExame/getByIdParametro/' + this.editedItem.id).then(response => {
                    this.dessertsValoresReferencia = response.data;
                });
                val || this.close();
            },
        },
        methods: {
            initialize () {

            },
            closeSnackbar () {
                this.snackbar = false;
            },
            atualizaParametros() {
                this.axios.get(process.env.VUE_APP_URL_API + '/parametroExame/getByIdExame/' + this.idExame ).then(response => {
                    this.desserts = response.data;
                });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.atualizaValoresReferencia();
                this.mostraTabelaValoresReferencia = true;
                this.dialogAddParametro = true;
            },
            deleteItem (item) {
                this.axios.delete(process.env.VUE_APP_URL_API + '/parametroExame/' + item.id + "/delete").then(response => {
                    if(response.data){
                        this.snackbar = true;
                        this.color = 'success';
                        this.textoSnackbar = "Parâmetro apagado com sucesso!";
                        this.atualizaParametros();
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                    }
                });
            },
            close () {
                this.snackbarValoresReferencia = false;
                this.dialogAddParametro = false;
                this.mostraTabelaValoresReferencia = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300);
            },
            validaCampos() {
                return  this.editedItem.parametro != '' && this.editedItem.unidadeMedida != '';
            },
            save () {
                this.snackbarValoresReferencia = false;
                if (this.editedIndex > -1) {
                    this.editedItem.idExame = this.idExame;
                    this.axios.put(process.env.VUE_APP_URL_API + '/parametroExame', this.editedItem).then(response => {
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
                        this.axios.post(process.env.VUE_APP_URL_API + '/parametroExame', this.editedItem).then(response => {
                            if(response.data.id){
                                this.textoSnackbar = "Parâmetro inserida com sucesso!";
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
            closeSnackbarValoresReferencia () {
                this.snackbarValoresReferencia = false;
            },
            atualizaValoresReferencia() {
                this.axios.get(process.env.VUE_APP_URL_API + '/referenciaParametroExame/getByIdParametro/' + this.editedItem.id).then(response => {
                    this.dessertsValoresRerefencia = response.data;

                    for(var i = 0; i < response.data.length; i++){
                        this.dessertsValoresRerefencia[i].valor = (parseInt(response.data[i].valorMinimo) == 0 ? " " : response.data[i].valorMinimo) + " " + response.data[i].comparacao + " " + (parseInt(response.data[i].valorMaximo) == 0 ? " " : response.data[i].valorMaximo);
                        this.dessertsValoresRerefencia[i].idade = (parseInt(response.data[i].idadeMinima) == 0 ? " " : response.data[i].idadeMinima) + " " + response.data[i].idade + " " + (parseInt(response.data[i].idadeMaxima) == 0 ? " " : response.data[i].idadeMaxima);
                    }

                });
            },
            editItemValorReferencia (item) {
                this.editedIndexValoresReferencia = this.dessertsValoresRerefencia.indexOf(item);
                this.editedItemValoresReferencia = Object.assign({}, item);
                this.dialogValoresReferencia = true;
            },
            deleteItemValorReferencia (item) {
                this.axios.delete(process.env.VUE_APP_URL_API + '/referenciaParametroExame/' + item.id + "/delete").then(response => {
                    if(response.data){
                        this.textoSnackbarValoresReferencia = "Valor refência apagado com sucesso!";
                        this.snackbarValoresReferencia = true;
                        this.colorValoresReferencia = 'success';

                        this.atualizaValoresReferencia();
                    }else {
                        this.textoSnackbarValoresReferencia = "Ocorreu um erro ao tentar apagar o registro!";
                        this.snackbarValoresReferencia = true;
                        this.colorValoresReferenciar = 'error';
                    }
                });
            },
            closeValoresReferencia () {
                this.dialogValoresReferencia = false;
            },
            validaCamposValoresReferencia() {
                var valores = false;
                var idade = false;
                if((this.editedIndexValoresReferencia.valorMinimo != "" && this.editedIndexValoresReferencia.comparacao != "" && this.editedIndexValoresReferencia.valorMaximo != "")
                    || (this.editedIndexValoresReferencia.valorMinimo == "" && this.editedIndexValoresReferencia.comparacao != "" && this.editedIndexValoresReferencia.valorMaximo != "")
                    || (this.editedIndexValoresReferencia.valorMinimo != "" && this.editedIndexValoresReferencia.comparacao != "" && this.editedIndexValoresReferencia.valorMaximo == "")){
                        valores = true;
                }

                if((this.editedIndexValoresReferencia.idadeMinima != "" && this.editedIndexValoresReferencia.idade != "" && this.editedIndexValoresReferencia.idadeMaxima != "")
                    || (this.editedIndexValoresReferencia.idadeMinima == "" && this.editedIndexValoresReferencia.idade != "" && this.editedIndexValoresReferencia.idadeMaxima != "")
                    || (this.editedIndexValoresReferencia.idadeMinima != "" && this.editedIndexValoresReferencia.idade != "" && this.editedIndexValoresReferencia.idadeMaxima == "")){
                        idade = true;
                }

                return valores && idade && this.editedIndexValoresReferencia.sexo != "";
            },
            saveValoresReferencia () {
                if (this.editedIndexValoresReferencia > -1) {
                    this.editedItemValoresReferencia.idParametro = this.editedItem.id;
                    this.axios.put(process.env.VUE_APP_URL_API + '/referenciaParametroExame', this.editedItemValoresReferencia).then(response => {
                        if(response.data){
                            this.textoSnackbarValoresReferencia = "Registro atualizado com sucesso!";
                            this.snackbarValoresReferencia = true;
                            this.colorValoresReferencia = 'success';
                            this.atualizaValoresReferencia();
                            this.closeValoresReferencia();
                        }else {
                            this.textoSnackbarValoresReferencia = "Ocorreu um erro ao atualizar!";
                            this.snackbarValoresReferencia = true;
                            this.colorValoresReferencia = 'error';
                            this.closeValoresReferencia();
                        }
                    });
                } else {
                    if(this.validaCamposValoresReferencia()){
                        this.editedItemValoresReferencia.idParametro = this.editedItem.id;
                        this.axios.post(process.env.VUE_APP_URL_API + '/referenciaParametroExame', this.editedItemValoresReferencia).then(response => {
                            if(response.data.id){
                                this.textoSnackbarValoresReferencia = "Valor refêrencia inserido com sucesso!";
                                this.snackbarValoresReferencia = true;
                                this.colorValoresReferencia = 'success';
                                this.atualizaValoresReferencia();
                                this.closeValoresReferencia();
                            }else {
                                this.textoSnackbarValoresReferencia = "Ocorreu um erro ao cadastrar!";
                                this.snackbarValoresReferencia = true;
                                this.colorValoresReferencia = 'error';
                                this.closeValoresReferencia();
                            }
                        });
                    }else {
                        this.textoSnackbarValoresReferencia =  "Existe campos vazios ou incorretos!";
                        this.colorValoresReferencia = 'success',
                        this.snackbarValoresReferencia = true;
                        this.closeValoresReferencia();
                    }
                }
            },
        }
    }

</script>
