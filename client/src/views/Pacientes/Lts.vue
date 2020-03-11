<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :search="busca"
        sort-by="calories"
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
                                v-model="busca"
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
                    v-bind:snackbar="snackbar.state"
                    v-bind:textoSnackbar="snackbar.text"
                    v-bind:color="snackbar.color"
                    @closeSnackbar="closeSnackbar"
                ></snackbar>

                <div class="flex-grow-1"></div>
                <!-- editar pessoa -->
                <novo-lts
                    v-bind:dialogImportar="novoLts"
                    @close="closeNovo"
                ></novo-lts>
                <v-dialog v-model="dialog" max-width="1000px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2" @click="nova">Nova</v-btn>
                    </template>

                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editarPessoa(item)"
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

import NovoLts from '@/components/material/NovoLts';

export default {
    components: {
        'novo-lts': NovoLts
    },
    data: () => ({
        busca: "",
        desserts: [],
        dialog: false,
        dialogNovo: false,
        dialogEditar: false,
        snackbar: {
            text: "",
            color: "",
            state: false,
        },
        headers: [
            { text: 'Paciente',align: 'left', sortable: true, value: 'paciente'},
            { text: 'Tipo Documento', value: 'tipoDocumento' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        pagination: {
            rowsPerPage: 20
        },
        rowsPerPageItems: [8, 12, 15],
        novoLts: false,
    }),
    created () {
        this.initialize()
    },
    methods: {
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/lts').then(response => {
                this.desserts = response.data;
                this.desserts = response.data;
            });

        },
        editarPessoa(item) {
            this.pessoa = Object.assign({}, item);
            this.dialogEditar = true;
        },
        deleteItem (item) {
            this.axios.delete(process.env.VUE_APP_URL_API + '/lts/' + item.id + "/delete").then(response => {
                if(response.data){
                    this.snackbar.color = 'success';
                    this.snackbar.text = "Pessoa apagada com sucesso!";
                    this.initialize();
                }
                if(!response.data) {
                    this.snackbar.color = 'error';
                    this.snackbar.text = "Ocorreu um erro ao tentar apagar o registro!";
                }
                this.snackbar.state = true;
            });
        },
        nova() {
            this.novoLts = true;
        },
        closeEditar(snackbar) {
            this.dialogEditar = false;
            this.snackbar.text = snackbar.text;
            this.snackbar.color = snackbar.color;
            this.snackbar.state = snackbar.state;
            this.initialize();
        },
        closeNovo() {
            this.novoLts = false;
            this.initialize();
        },
        closeSnackbar() {
            this.snackbar = false;
        }

    }
}
</script>

<style>

</style>
