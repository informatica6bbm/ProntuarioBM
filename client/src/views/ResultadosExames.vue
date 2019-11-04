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
                        <v-col>

                        </v-col>
                    </v-row>
                </v-container>

                <snackbar
                    v-bind:snackbar="snackbar"
                    v-bind:textoSnackbar="textoSnackbar"
                    v-bind:color="color"
                    @closeSnackbar="closeSnackbar"
                ></snackbar>

                <v-dialog max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2" @click="nova" >Nova</v-btn>
                        <v-btn color="primary" class="mb-2" @click="importar"  :style="{ 'margin-right': '20px', 'margin-left': '-30px' }">Importar</v-btn>
                    </template>
                </v-dialog>

                <div class="flex-grow-1"></div>

                <importar-resultados-exames
                    v-bind:dialogImportar="dialogImportar"
                    @close="closeImportar"
                ></importar-resultados-exames>

                <novo-resultado-exame
                    v-bind:dialogNovo="dialogNovo"
                    @close="closeNovo"
                ></novo-resultado-exame>

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
        dialogNovo: false,
        dialogImportar: false,
        search: "",
        textoSnackbar: "",
        color: 'success',
        snackbar: false,
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
    }),
    created () {
        this.initialize()
    },
    computed: {

    },
    methods: {
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/resultadoExame').then(response => {
                this.desserts = response.data;
                // console.log(this.desserts);
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.pessoas = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/exame').then(response => {
                this.exames = response.data;
            });
        },
        closeImportar() {
            this.dialogImportar = false;
        },
        closeSnackbar() {
            this.snackbar = false;
        },
        closeNovo(){
            this.dialogNovo = false;
        },
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.parametros = [];
            this.editedItem.resultadoParametros = [];
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
        importar(){
            this.dialogImportar = true;
        },
        nova() {
            this.dialogNovo = true;
        }
    }
}
</script>
