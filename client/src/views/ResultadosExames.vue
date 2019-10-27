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

                <dialog-add-resultado-exame></dialog-add-resultado-exame>

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
        pessoas: [],
        exames: [],
        parametrosExame: [],
        parametros: [],
        resultadosExames: null,
        arquivo: null
    }),
    created () {
        this.initialize()
    },
    methods: {
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/resultadoExame').then(response => {
                this.desserts = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.pessoas = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/exame').then(response => {
                this.exames = response.data;
            });
        },
        customFilterPessoa (item, queryText) {
            const textOne = item.nome.toLowerCase();
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
            this.axios.delete(process.env.VUE_APP_URL_API + '/escala/' + item.id + "/delete").then(response => {
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

                        vm.axios.post(process.env.VUE_APP_URL_API + '/resultadoexame/importarResultado', data).then(response => {
                            
                        });
                    }
                    reader.readAsText(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
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
