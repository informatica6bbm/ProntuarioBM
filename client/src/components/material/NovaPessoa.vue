<template>
    <v-card>
        <v-card-title>
            <span class="headline">Nova Pessoa</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field
                            v-model="pessoa.nome"
                            :rules="[v => !!v || 'Obrigatório prencher o nome!']"
                            label="Nome"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field
                            v-model="pessoa.email"
                            :rules="[v => !!v || 'Obrigatório prencher o email!']"
                            label="E-mail"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                            v-model="pessoa.matricula"
                            :rules="[v => !!v || 'Obrigatório prencher o matrícula!']"
                            v-mask="['######-#', '######-#-##']"
                            label="Matrícula"
                            outlined
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                            v-model="pessoa.dataNascimento"
                            :rules="[v => !!v || 'Obrigatório prencher a data nascimento!']"
                            v-mask="['##/##/####']"
                            label="Data Nascimento"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-select
                            :items="estadosCivils"
                            v-model="pessoa.estadoCivil"
                            :rules="[v => !!v || 'Obrigatório prencher o estado civil!']"
                            label="Estado Civil"
                            outlined
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                            v-model="pessoa.dataIngresso"
                            :rules="[v => !!v || 'Obrigatório prencher a data de ingresso!']"
                            v-mask="['##/##/####']"
                            label="Data Ingresso"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="pessoa.cartaoMunicipalSus"
                            :rules="[v => !!v || 'Obrigatório prencher o cartão municipal do SUS!']"
                            v-mask="['######']"
                            label="Cartão Municipal SUS"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="pessoa.cartaoNacionalSus"
                            :rules="[v => !!v || 'Obrigatório prencher o cartão nacional do SUS!']"
                            v-mask="['### #### #### ####']"
                            label="Cartão Nacional SUS"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            :items="sexos"
                            v-model="pessoa.sexo"
                            :rules="[v => !!v || 'Obrigatório prencher o sexo!']"
                            label="Sexo"
                            outlined
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            :items="tiposSanguineo"
                            v-model="pessoa.tipoSanguineo"
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
                            v-model="pessoa.lts"
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
                            v-model="pessoa.idHierarquia"
                            :rules="[v => !!v || 'Obrigatório informar Posto/Graduação!']"
                            label="Hierarquia"
                            outlined
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            :items="obms"
                            v-model="pessoa.idBatalhao"
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
                            v-model="pessoa.idSetor"
                            :rules="[v => !!v || 'Obrigatório prencher o setor!']"
                            label="Setor"
                            outlined
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            :items="escalas"
                            v-model="pessoa.idEscala"
                            item-text="escala"
                            item-value="id"
                            :rules="[v => !!v || 'Obrigatório prencher a escala!']"
                            label="Escala"
                            outlined
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            :items="tipoPessoas"
                            v-model="pessoa.tipoPessoa"
                            item-text="tipo"
                            item-value="value"
                            :rules="[v => !!v || 'Obrigatório prencher o tipo do cadastro!']"
                            label="Tipo usuário"
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
</template>

<script>

    export default {
        data: () => ({
            estadosCivils: [
                "SOLTEIRO",
                "CASADO",
                "DIVORCIADO",
                "UNIÃO ESTÁVEL"
            ],
            editedIndex: -1,
            foto: "",
            pessoa: {
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
                tipoPessoa: null
            },
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
            tipoPessoas: [
                {
                    tipo: "Administrador",
                    value: 'true'
                },
                {
                    tipo: "Normal",
                    value: 'false'
                }
            ],
            sexos: [
                "FEMININO",
                "MASCULINO"
            ],
        }),
        props: [
            'hierarquias',
            'obms',
            'setores',
            'escalas'
        ],
        methods: {
            close(){
                this.$emit('close', true);
            },
            isValidEmail() {
                var parse_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
                return  parse_email.test(this.pessoa.email);
            },
            isValidDateEntrance() {
                return this.isValidDate(this.pessoa.dataIngresso) && this.isValidDate(this.pessoa.dataNascimento) ? parseInt(this.pessoa.dataIngresso.split('/')[2]) > parseInt(this.pessoa.dataNascimento.split('/')[2]) : false;
            },
            isValidDate(date) {
                var aux = [];
                if(date != ''){
                    aux = date.split('/');
                    if(parseInt(aux[0]) > 0 && parseInt(aux[0]) < 31){
                        if(parseInt(aux[1]) > 0 && parseInt(aux[1]) < 12){
                            if(parseInt(aux[2]) > 1900 && parseInt(aux[2]) < 3000){
                                return true;
                            }
                        }
                    }
                }

                return false;
            },
            setImage: function (e) {
                const file = e[0];

                if (!file.type.includes('image/')) {
                    alert('Por favor selecione a foto!');
                    return;
                }

                if(typeof FileReader === 'function') {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        this.pessoa.foto = this.imgSrc;
                    }
                    reader.readAsDataURL(file);
                }
                if(!(typeof FileReader === 'function')) {
                    alert('Sorry, FileReader API not supported');
                }
            },
            save () {
                if(this.validaCampos()){

                    this.axios.post(process.env.VUE_APP_URL_API + '/pessoa', this.pessoa).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Pessoa inserida com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.close();
                        }
                        if(!response.data.id) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                            this.close();
                        }
                    });
                }
                if(!this.validaCampos()) {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Existe campos vazios ou incorretos!";
                    this.close();
                }
            },
            validaCampos() {
                return  this.pessoa.nome != '' &&
                        this.isValidEmail() &&
                        this.pessoa.matricula != '' &&
                        this.isValidDateEntrance() &&
                        this.pessoa.estadoCivil != null &&
                        this.pessoa.cartaoNacionalSus != '' &&
                        this.pessoa.cartaoMunicipalSus != '' &&
                        this.pessoa.sexo != '' &&
                        this.pessoa.tipoSanguineo != "" &&
                        this.pessoa.lts != '' &&
                        this.pessoa.idHierarquia != null &&
                        this.pessoa.idBatalhao != null &&
                        this.pessoa.idSetor != null &&
                        this.pessoa.idEscala != null &&
                        this.pessoa.foto != '';
            },
        }
    }

</script>
