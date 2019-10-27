<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
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
                    v-bind:snackbar="snackbar"
                    v-bind:textoSnackbar="textoSnackbar"
                    v-bind:color="color"
                    @closeSnackbar="closeSnackbar"
                ></snackbar>

                <div class="flex-grow-1"></div>

                <v-dialog v-model="dialog" max-width="1000px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2"  v-on="on">Nova</v-btn>
                    </template>

                    <nova-pessoa
                        v-if="editedIndex === -1"
                        v-bind:hierarquias="hierarquias"
                        v-bind:obms="obms"
                        v-bind:setores="setores"
                        v-bind:escalas="escalas"
                        @close="close"
                    ></nova-pessoa>

                    <editar-pessoa
                        v-if="editedIndex !== -1"
                        v-bind:hierarquias="hierarquias"
                        v-bind:obms="obms"
                        v-bind:setores="setores"
                        v-bind:escalas="escalas"
                        v-bind:pessoa="pessoa"
                        @close="close"
                    ></editar-pessoa>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editPessoa(item)"
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
        search: "",
        hierarquias: [],
        obms: [],
        setores: [],
        escalas: [],
        imgSrc: null,
        editedIndex: -1,
        textoSnackbar: "",
        color: '',
        snackbar: false,
        rowsPerPageItems: [8, 12, 15],
        pagination: {
            rowsPerPage: 20
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
        desserts: [],
        pessoa: new Object()
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Pessoa' : 'Editar Pessoa'
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    created () {
        this.initialize()
    },
    methods: {
        initialize () {
            this.desserts = [];

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
        editPessoa(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.pessoa = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem (item) {
            this.axios.delete(process.env.VUE_APP_URL_API + '/pessoa/' + item.id + "/delete").then(response => {
                if(response.data){
                    this.color = 'success';
                    this.textoSnackbar = "Pessoa apagada com sucesso!";
                    this.initialize();
                }
                if(!response.data) {
                    this.color = 'error';
                    this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                }
                this.snackbar = true;
            });
        },
        close () {
            this.dialog = false;
            setTimeout(() => {
                this.pessoa = Object.assign({}, new Object())
                this.editedIndex = -1
            }, 300);
        },
        closeSnackbar() {
            this.snackbar = false;
        }

    }
}
</script>
