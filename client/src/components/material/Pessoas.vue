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

                <importa-pessoas
                    v-bind:dialogImportar="importarPessoas"
                ></importa-pessoas>

                <div class="flex-grow-1"></div>

                <nova-pessoa
                    v-bind:dialogNovo="dialogNovo"
                    v-bind:hierarquias="hierarquias"
                    v-bind:obms="obms"
                    v-bind:setores="setores"
                    v-bind:escalas="escalas"
                    @close="closeNovo"
                ></nova-pessoa>

                <editar-pessoa
                    v-bind:dialogEditar="dialogEditar"
                    v-bind:hierarquias="hierarquias"
                    v-bind:obms="obms"
                    v-bind:setores="setores"
                    v-bind:escalas="escalas"
                    v-bind:pessoa="pessoa"
                    @close="closeEditar"
                ></editar-pessoa>

                <v-dialog v-model="dialog" max-width="1000px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2" @click="nova">Nova</v-btn>
                        <v-btn color="primary" class="mb-2 btn-importar" @click="importar" >Importar</v-btn>
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
export default {
    data: () => ({
        busca: "",
        escalas: [],
        desserts: [],
        dialog: false,
        dialogNovo: false,
        dialogEditar: false,
        hierarquias: [],
        importarPessoas: false,
        obms: [],
        setores: [],
        snackbar: {
            text: "",
            color: "",
            state: false,
        },
        headers: [
            { text: 'Nome',align: 'left', sortable: true, value: 'nome'},
            { text: 'Matrícula', value: 'matricula' },
            { text: 'C.M.S', value: 'cartaoMunicipalSus' },
            { text: 'C.N.S', value: 'cartaoNacionalSus' },
            { text: 'Sexo', value: 'sexo' },
            { text: 'Tipo Sanguíneo',align: 'center', value: 'tipoSanguineo' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        pagination: {
            rowsPerPage: 20
        },
        pessoa: new Object(),
        rowsPerPageItems: [8, 12, 15],
    }),
    created () {
        this.initialize()
    },
    methods: {
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.desserts = response.data;
                for(var i = 0; i < response.data.length; i++){
                    response.data[i].dataNascimento = response.data[i].dataNascimento.split("T")[0].split('-').reverse().join('/');
                    response.data[i].dataIngresso = response.data[i].dataIngresso.split("T")[0].split('-').reverse().join('/');
                    response.data[i].lts == true ? response.data[i].lts = 'true' : response.data[i].lts = 'false';
                    response.data[i].tipoPessoa == true ? response.data[i].tipoPessoa = 'true' : response.data[i].tipoPessoa = 'false';
                }
                this.desserts = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/hierarquia').then(response => {
                this.hierarquias = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/batalhao').then(response => {
                this.obms = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/setor').then(response => {
                this.setores = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/escala').then(response => {
                this.escalas = response.data;
            });
        },
        editarPessoa(item) {
            this.pessoa = Object.assign({}, item);
            this.dialogEditar = true;
        },
        deleteItem (item) {
            this.axios.delete(process.env.VUE_APP_URL_API + '/pessoa/' + item.id + "/delete").then(response => {
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
            this.dialogNovo = true;
        },
        importar() {
            this.importarPessoas = true;
        },
        closeEditar(snackbar) {
            this.snackbar.text = snackbar.text;
            this.snackbar.color = snackbar.color;
            this.snackbar.state = snackbar.state;
            this.dialogEditar = false;
            this.initialize();
        },
        closeNovo() {
            this.dialogNovo = false;
            this.initialize();
        },
        closeSnackbar() {
            this.snackbar = false;
        }

    }
}
</script>

<style>
    .btn-importar {
        margin-right: 20px;
        margin-left: -30px;
    }
</style>
