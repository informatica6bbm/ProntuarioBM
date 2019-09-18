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

                <v-dialog v-model="dialog" max-width="1000px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2"  v-on="on">Nova</v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field
                                            v-model="editedItem.nome"
                                            :rules="[v => !!v || 'Obrigatório prencher o nome!']"
                                            label="Nome"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field
                                            v-model="editedItem.email"
                                            :rules="[v => !!v || 'Obrigatório prencher o email!']"
                                            label="E-mail"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field
                                            v-model="editedItem.matricula"
                                            :rules="[v => !!v || 'Obrigatório prencher o matrícula!']"
                                            v-mask="['######-#', '######-#-##']"
                                            label="Matrícula"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field
                                            v-model="editedItem.dataNascimento"
                                            :rules="[v => !!v || 'Obrigatório prencher a data nascimento!']"
                                            v-mask="['##/##/####']"
                                            label="Data Nascimento"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-select
                                            :items="estadosCivils"
                                            v-model="editedItem.estadoCivil"
                                            :rules="[v => !!v || 'Obrigatório prencher o estado civil!']"
                                            label="Estado Civil"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field
                                            v-model="editedItem.dataIngresso"
                                            :rules="[v => !!v || 'Obrigatório prencher a data de ingresso!']"
                                            v-mask="['##/##/####']"
                                            label="Data Ingresso"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.cartaoMunicipalSus"
                                            :rules="[v => !!v || 'Obrigatório prencher o cartão municipal do SUS!']"
                                            v-mask="['######']"
                                            label="Cartão Municipal SUS"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.cartaoNacionalSus"
                                            :rules="[v => !!v || 'Obrigatório prencher o cartão nacional do SUS!']"
                                            v-mask="['### #### #### ####']"
                                            label="Cartão Nacional SUS"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="sexos"
                                            v-model="editedItem.sexo"
                                            :rules="[v => !!v || 'Obrigatório prencher o sexo!']"
                                            label="Sexo"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="tiposSanguineo"
                                            v-model="editedItem.tipoSanguineo"
                                            :rules="[v => !!v || 'Obrigatório prencher o tipo sanguineo!']"
                                            label="Tipo Sanguineo"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="lts"
                                            item-text="text"
                                            item-value="value"
                                            v-model="editedItem.lts"
                                            :rules="[v => !!v || 'Obrigatório informar se possui LTS']"
                                            label="LTS"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="hierarquias"
                                            item-text="hierarquia"
                                            item-value="id"
                                            v-model="editedItem.idHierarquia"
                                            :rules="[v => !!v || 'Obrigatório informar Posto/Graduação!']"
                                            label="Hierarquia"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="obms"
                                            v-model="editedItem.idBatalhao"
                                            item-text="abreviacao"
                                            item-value="id"
                                            :rules="[v => !!v || 'Obrigatório prencher a OBM!']"
                                            label="OBM"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="setores"
                                            item-text="setor"
                                            item-value="id"
                                            v-model="editedItem.idSetor"
                                            :rules="[v => !!v || 'Obrigatório prencher o setor!']"
                                            label="Setor"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            :items="escalas"
                                            v-model="editedItem.idEscala"
                                            item-text="escala"
                                            item-value="id"
                                            :rules="[v => !!v || 'Obrigatório prencher a escala!']"
                                            label="Escala"
                                            outlined
                                        ></v-select>
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

    </v-data-table>

</template>

<script>
export default {
    data: () => ({
        dialog: false,
        search: "",
        estadosCivils: [
            "SOLTEIRO",
            "CASADO",
            "DIVORCIADO"
        ],
        lts: [
            {
                text: "SIM",
                value: 'true'
            },
            {
                text: "NÃO",
                value: 'false'
            }
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
            dataIngresso: "",
            cartaoMunicipalSus: "",
            cartaoNacionalSus: "",
            sexo: "",
            tipoSanguineo: "",
            lts: "",
            idHierarquia: 0,
            idBatalhao: 0,
            idSetor: 0,
            idEscala: 0,
            foto: "",
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        },
        defaultItem: {
            nome: "",
            email: "",
            matricula: "",
            dataNascimento: "",
            estadoCivil: null,
            dataIngresso: "",
            cartaoMunicipalSus: "",
            cartaoNacionalSus: "",
            sexo: "",
            tipoSanguineo: "",
            lts: "",
            idHierarquia: 0,
            idBatalhao: 0,
            idSetor: 0,
            idEscala: 0,
            foto: ""
        },
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
                for(var i = 0; i < response.data.length; i++){
                    response.data[i].dataNascimento = response.data[i].dataNascimento.split("T")[0].split('-').reverse().join('/');
                    response.data[i].dataIngresso = response.data[i].dataIngresso.split("T")[0].split('-').reverse().join('/');
                    response.data[i].lts == true ? response.data[i].lts = 'true' : response.data[i].lts = 'false';
                }
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

            this.axios.delete('http://localhost:3000/pessoa/' + item.id + "/delete").then(response => {
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
        isValidDate(date) {
            var aux = [];
            if(date != ''){
                aux = date.split('/');
                if(parseInt(aux[0]) > 0 && parseInt(aux[0]) < 31){
                    if(parseInt(aux[1]) > 0 && parseInt(aux[1]) < 12){
                        if(parseInt(aux[2]) > 1900 && parseInt(aux[2]) < 3000){
                            return true;
                        }else {
                            return false;
                        }
                    }else {
                        return false;
                    }
                }else {
                    return false;
                }
            }else {
                return false;
            }
        },
        isValidDateEntrance() {
            return this.isValidDate(this.editedItem.dataIngresso) && this.isValidDate(this.editedItem.dataNascimento) ? parseInt(this.editedItem.dataIngresso.split('/')[2]) > parseInt(this.editedItem.dataNascimento.split('/')[2]) : false;
        },
        isValidEmail() {
            var parse_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
            return  parse_email.test(this.editedItem.email);
        },
        validaCampos() {
            return  this.editedItem.nome != '' &&
                    this.isValidEmail() &&
                    this.editedItem.matricula != '' &&
                    this.isValidDateEntrance() &&
                    this.editedItem.estadoCivil != null &&
                    this.editedItem.cartaoNacionalSus != '' &&
                    this.editedItem.cartaoMunicipalSus != '' &&
                    this.editedItem.sexo != '' &&
                    this.editedItem.tipoSanguineo != "" &&
                    this.editedItem.lts != '' &&
                    this.editedItem.idHierarquia != null &&
                    this.editedItem.idBatalhao != null &&
                    this.editedItem.idSetor != null &&
                    this.editedItem.idEscala != null &&
                    this.editedItem.foto != '';
        },
        save () {

            if (this.editedIndex > -1) {
                this.editedItem.lts == 'true' ? this.editedItem.lts = true : this.editedItem.lts = false;
                this.axios.put('http://localhost:3000/pessoa', this.editedItem).then(response => {
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
                if(this.validaCampos()){
                    this.editedItem.lts == 'true' ? this.editedItem.lts = true : this.editedItem.lts = false;
                    this.axios.post('http://localhost:3000/pessoa', this.editedItem).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Pessoa inserida com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.initialize();
                            this.close();
                        }else {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                            this.close();
                        }
                    });
                }else {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Existe campos vazios ou incorretos!";
                    this.close();
                }
            }
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
