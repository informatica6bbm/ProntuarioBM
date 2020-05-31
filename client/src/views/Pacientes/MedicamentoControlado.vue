<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :search="busca"
        sort-by="calories"
        class="elevation-1 ma-2"
        :footer-props="{'items-per-page-options': [8,10,12,14]}"
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

                <nova-pessoa-historico-doencas 
                    v-bind:dialogAbrir="novaPessoa"
                    @close="closeNovo"
                />

                <editar-pessoa-historico-doencas 
                    v-bind:dialogEditar="dialogEditar"
                    v-bind:pessoa="pessoaHitoricoDoenca"
                    @close="closeEditar"
                />

                <doencas-historico 
                    v-bind:open="openDoencasHistorico"
                    v-bind:idHistorico="idHistorico"
                    @close="closeDoencasHistorico"
                />

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
                @click="openDialogAddDoencasHistorico(item)"
            >
                mdi-eye
            </v-icon>
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
    import NovaPessoaMedicamentroControlado from '@/components/material/NovaPessoaMedicamentoControlado';
    import EditarPessoaMedicamentoContolado from '@/components/material/EditarPessoaMedicamentoControlado';
    import MedicamentosControlados from '@/components/material/MedicamentosControlados';

    export default {
        components: {
            'nova-pessoa-historico-doencas': NovaPessoaMedicamentroControlado,
            'editar-pessoa-historico-doencas': EditarPessoaMedicamentoContolado,
            'doencas-historico': MedicamentosControlados
        },
        data: () => ({
            busca: "",
            desserts: [],
            dialog: false,
            dialogNovo: false,
            dialogEditar: false,
            novaPessoa: false,
            idHistorico: null,
            pessoaHitoricoDoenca: [],
            openDoencasHistorico: false,
            snackbar: {
                text: "",
                color: "",
                state: false,
            },
            headers: [
                { text: 'Paciente',align: 'left', sortable: true, value: 'paciente'},
                { text: 'Ações', value: 'action', sortable: false },
            ],
            pagination: {
                rowsPerPage: 20
            },
            rowsPerPageItems: [8, 12, 15],
        }),
        created () {
            this.initialize();
        },
        methods: {
            initialize () {
                this.axios.get(process.env.VUE_APP_URL_API + '/usuarioMedicamentoControlado').then(response => {
                    this.desserts = response.data;
                });
            },
            closeSnackbar() {

            },
            closeNovo() {
                this.novaPessoa = false;
                this.initialize();
            },
            closeEditar() {
                this.dialogEditar = false;
            },
            nova() {
                this.novaPessoa = true;
            },
            editarPessoa(item) {
                console.log(Object.assign({}, item));
                this.pessoaHitoricoDoenca = Object.assign({}, item);
                this.dialogEditar = true;
            },
            deleteItem(item){
                this.axios.delete(process.env.VUE_APP_URL_API + '/usuarioMedicamentoControlado/' + item.id + '/delete').then(response => {
                    if(response.data){
                        this.initialize();
                    }
                });
            },
            openDialogAddDoencasHistorico(item) {
                this.openDoencasHistorico = true;
                this.idHistorico = item.id;
            },
            closeDoencasHistorico() {
                this.openDoencasHistorico = false;
            }
        }
    }
</script>