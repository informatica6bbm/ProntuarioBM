<template>
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

                <v-dialog v-model="dialogImportar" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Importar resultados</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-file-input
                                            color="deep-purple accent-4"
                                            counter
                                            label="Arquivo CSV"
                                            multiple
                                            placeholder=""
                                            prepend-icon="mdi-package-up"
                                            outlined
                                            :show-size="1000"
                                            v-model="arquivo"
                                        >
                                            <template v-slot:selection="{ index, text }">
                                                <v-chip
                                                    v-if="index < 2"
                                                    color="deep-purple accent-4"
                                                    dark
                                                    label
                                                    small
                                                >
                                                    {{ text }}
                                                </v-chip>

                                                <span
                                                    v-else-if="index === 2"
                                                        class="overline grey--text text--darken-3 mx-2"
                                                    >
                                                    +{{ foto.length - 2 }} Arquivo
                                                </span>
                                            </template>
                                        </v-file-input>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="blue darken-1" text @click="dialogImportar = false">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="importaResultadosExames">Importar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog" max-width="1000px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2"  v-on="on">Nova</v-btn>
                        <v-btn color="primary" class="mb-2" @click="openDialogImportResults"  :style="{ 'margin-right': '20px', 'margin-left': '-30px' }">Importar</v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-autocomplete
                                            v-model="editedItem.idPessoa"
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
                                            v-model="editedItem.idExame"
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
                                            v-model="editedItem.data"
                                            :rules="[v => !!v || 'Obrigatório prencher a data do exame!']"
                                            v-mask="['##/##/####']"
                                            label="Data Realização exame"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-simple-table dense>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th class="text-left">Parâmetro</th>
                                                        <th class="text-left">Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in parametros" :key="item.idParametro">
                                                        <td :style="{ width: '40%' }">{{ item.parametro }}</td>
                                                        <td>
                                                            <v-text-field
                                                                v-model="item.valor"
                                                                :style="{'margin-bottom': '-22px', 'margin-top': '2px', 'margin-left': '0px','margin-right': '0px', heigth: '100%'}"
                                                                outlined
                                                                dense
                                                            ></v-text-field>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
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

</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogImportar: false,
        search: "",
        textoSnackbar: "",
        color: 'success',
        mode: '',
        snackbar: false,
        timeout: 6000,
        x: null,
        y: 'top',
        rowsPerPageItems: [8, 12, 15],
        pagination: {
            rowsPerPage: 20
        },
        desserts: [],
        headers: [
            {
                text: 'Nome',
                align: 'left',
                sortable: true,
                value: 'nome',
            },
            { text: 'Exame', value: 'exame', sortable: true },
            { text: 'Data', value: 'data', sortable: true },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
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
        },
        itemresultado: {
            parametro: "",
            idResultadoExame: "",
            valor: "",
            idParametro: "",
            idExame: "",
            createdAt: "",
            updatedAt: ""
        },
        itemresultadoDefault: {
            parametro: "",
            idResultadoExame: "",
            valor: "",
            idParametro: "",
            idExame: "",
            createdAt: "",
            updatedAt: ""
        },
        pessoas: [],
        exames: [],
        parametrosExame: [],
        parametros: [],
        resultadosExames: null,
        arquivo: null
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Resultado' : 'Editar Resultado'
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        'editedItem.idExame'(val) {
            var id = val;
            this.axios.get('http://localhost:3000/parametroExame/getByIdExame/' + id).then(response => {
                this.parametrosExame = response.data;
                var i = 0;
                this.parametros = [];
                for(i in this.parametrosExame){
                    this.itemresultado.idParametro = this.parametrosExame[i].id;
                    this.itemresultado.parametro = this.parametrosExame[i].parametro;
                    this.itemresultado.idExame = id;
                    this.parametros.push(this.itemresultado);
                    this.itemresultado = this.itemresultadoDefault;
                }
            });
        }
    },
    created () {
        this.initialize()
    },
    methods: {
        initialize () {
            this.axios.get('http://localhost:3000/resultadoExame').then(response => {
                this.desserts = response.data;
            });

            this.axios.get('http://localhost:3000/pessoa').then(response => {
                this.pessoas = response.data;
            });

            this.axios.get('http://localhost:3000/exame').then(response => {
                this.exames = response.data;
            });
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
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.parametros = [];
            this.editedItem.resultadoParametros = [];
            this.dialog = true;
        },
        deleteItem (item) {
            this.axios.delete('http://localhost:3000/escala/' + item.id + "/delete").then(response => {
                if(response.data){
                    this.snackbar = true;
                    this.color = 'success';
                    this.textoSnackbar = "Pessoa apagada com sucesso!";
                    this.initialize();
                }else {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                }
            });
        },

        close () {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300);
        },
        importaResultadosExames() {
            const file = this.arquivo[0];
            const vm = this;
            if(file){
                if (!file.type.includes('text/csv')) {
                    alert('Por favor selecione o arquivo CSV!');
                    return;
                }
                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = function() {
                        const linhas = reader.result.split("\n").map(function(line) {
                            return line.split(',');
                        });
                        var data = {
                            resultados: linhas
                        };

                        vm.axios.post('http://localhost:3000/resultadoexame/importarResultado', data).then(response => {
                            console.log(response);
                        });
                    }
                    reader.readAsText(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            }
        },
        openDialogImportResults(){
            this.dialogImportar = true;
        },
        validaCampos() {
            return  this.editedItem.idPessoa != "" &&
                    this.editedItem.idExame != "" &&
                    this.editedItem.data != "";
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
        save () {
            if (this.editedIndex > -1) {
                this.editedItem.resultadoParametros = this.parametros;
                this.axios.put('http://localhost:3000/resultadoexame', this.editedItem).then(response => {
                    if(response.data){
                        this.textoSnackbar = "Registro atualizado com sucesso!";
                        this.snackbar = true;
                        this.color = 'success';
                        this.initialize();
                        this.close();
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Ocorreu um erro ao atualizar!";
                        this.close();
                    }
                });
            } else {
                if(this.validaCampos() && this.validaValoresExame()){
                    this.editedItem.resultadoParametros = this.parametros;
                    this.axios.post('http://localhost:3000/resultadoexame', this.editedItem).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Registro inserido com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.initialize();
                            this.close();

                            this.saveResultadosParametros(response.data.id);
                            this.parametros = [];
                            this.itemresultado = this.itemresultadoDefault;
                        }else {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                        }
                    });
                }else {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Existe campos vazios ou incorretos!";
                }
            }
        },
        saveResultadosParametros(idResultadoExame) {
            var i = 0;
            for(i in this.parametros) {
                this.axios.post('http://localhost:3000/resultadoParametroExame/' + idResultadoExame, this.parametros[i]);
            }

        }
    }
}
</script>

<style>
    @media only screen and (max-width: 640px) {
        .snackbar {
            margin-top: -10px;
        }
    }

    @media only screen and (min-width: 640px) {
        .snackbar {
            margin-top: -50px;
        }
    }
</style>
