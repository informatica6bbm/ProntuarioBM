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
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                    outlined
                ></v-text-field>
                <div class="flex-grow-1"></div>

                <v-dialog v-model="dialog" max-width="1000px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2" v-on="on">Nova</v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.nome" label="Nome" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.email" label="E-mail" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field v-model="editedItem.matricula" label="Matrícula" outlined></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field v-model="editedItem.dataNascimento" label="Data Nascimento" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-select :items="estadosCivils" v-model="editedItem.estadoCivil" label="Estado Civil" outlined></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field v-model="editedItem.dataIngresso" label="Data Ingresso" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.cartaoMunicipalSus" label="Cartão Municipal SUS" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.cartaoNacionalSus" label="Cartão Nacional SUS" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="sexos" v-model="editedItem.sexo" label="Sexo" outlined></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="tiposSanguineo" v-model="editedItem.tipoSanguineo" label="Tipo Sanguineo" outlined></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="lts" v-model="editedItem.lts" label="LTS" outlined></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="hierarquias" item-text="hierarquia" item-value="id" v-model="editedItem.idHierarquia" label="Hierarquia" outlined></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="obms" v-model="editedItem.idBatalhao" item-text="abreviacao" item-value="id" label="OBM" outlined></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="setores" item-text="setor" item-value="id" v-model="editedItem.idSetor" label="Setor" outlined></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="escalas" v-model="editedItem.idEscala" item-text="escala" item-value="id"  label="Escala" outlined></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-file-input

                                            color="deep-purple accent-4"
                                            counter
                                            label="Foto"
                                            multiple
                                            placeholder=""
                                            prepend-icon="mdi-camera"
                                            outlined
                                            :show-size="1000"
                                            @change="setImage"
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
            >

                {{ textoSnackbar }}
                <v-btn
                dark
                text
                @click="snackbar = false"
                >
                    Fechar
                </v-btn>
        </v-snackbar>
    </v-data-table>

</template>

<script>
export default {
    data: () => ({
        dialog: false,
        search: "",
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        estadosCivils: [
            "SOLTEIRO",
            "CASADO",
            "DIVORCIADO"
        ],
        lts: [
            "SIM",
            "NÃO"
        ],
        hierarquias: [],
        obms: [],
        setores: [],
        escalas: [],
        sexos: [
            "MASCULINO",
            "FEMININO"
        ],
        tiposSanguineo: [
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ],
        imgSrc: null,
        textoSnackbar: "",
        color: '',
        mode: '',
        snackbar: false,
        timeout: 6000,
        x: null,
        y: 'top',
        rowsPerPageItems: [8, 12, 15],
        pagination: {
            rowsPerPage: 20
        },
        headers: [
            {
                text: 'Nome',
                align: 'left',
                sortable: true,
                value: 'nome',
            },
            { text: 'Matrícula', value: 'matricula' },
            { text: 'C.M.S', value: 'cartaoMunicipalSus' },
            { text: 'C.N.S', value: 'cartaoNacionalSus' },
            { text: 'Sexo', value: 'sexo' },
            { text: 'Tipo Sanguíneo',align: 'center', value: 'tipoSanguineo' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            nome: "",
            email: "",
            matricula: "",
            dataNascimento: "",
            estadoCivil: null,
            cartaoMunicipalSus: "",
            cartaoNacionalSus: "",
            sexo: "",
            tipoSanguineo: "",
            lts: "",
            idHierarquia: null,
            idBatalhao: null,
            idSetor: null,
            idEscala: null,
            foto: ""
        },
        defaultItem: {
            nome: "",
            email: "",
            matricula: "",
            dataNascimento: "",
            estadoCivil: null,
            cartaoMunicipalSus: "",
            cartaoNacionalSus: "",
            sexo: "",
            tipoSanguineo: "",
            lts: "",
            idHierarquia: null,
            idBatalhao: null,
            idSetor: null,
            idEscala: null,
            foto: ""
        },
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Pessoa' : 'Editar Pessoa'
        },
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
            this.desserts = [
                {
                    nome: "TESTE",
                    matricula: "123456-7",
                    cartaoMunicipalSus: "123456",
                    cartaoNacionalSus: "123 4567 8912 345",
                    sexo: "MASCULINO",
                    tipoSanguineo: "+O"
                }
            ];

            this.axios.get('http://localhost:3000/pessoa').then(response => {
                this.desserts = response.data;
            });

            this.axios.get('http://localhost:3000/hierarquia').then(response => {
                this.hierarquias = response.data;
            });

            this.axios.get('http://localhost:3000/batalhao').then(response => {
                this.obms = response.data;
            });

            this.axios.get('http://localhost:3000/setor').then(response => {
                this.setores = response.data;
            });

            this.axios.get('http://localhost:3000/escala').then(response => {
                this.escalas = response.data;
            });
        },

        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item);
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
        },

        close () {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300);
        },
        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
                console.log(this.editedItem);
                this.axios.post('http://localhost:3000/pessoa', this.editedItem).then(response => {
                    if(response.data.id){
                        this.textoSnackbar = "Pessoa inserida com sucesso!";
                        this.snackbar = true;
                        this.color = 'success';
                        this.initialize();
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                    }
                });

            }
            this.close();
        },
        setImage: function (e) {
            const file = e[0];

            if (!file.type.includes('image/')) {
                alert('Por favor selecione a foto!');
                return;
            }

            if (typeof FileReader === 'function') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    this.editedItem.foto = this.imgSrc;
                }
                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        }
    }
}
</script>
