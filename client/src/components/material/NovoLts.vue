<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Novo LTS</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-alert
                                dense
                                outlined
                                type="error"
                                v-if="avisoArquivoVaziu"
                            >
                                Deve ser selecionado um arquivo PDF
                            </v-alert>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-autocomplete
                                v-model="idPaciente"
                                :items="pacientes"
                                hide-no-data
                                hide-selected
                                item-text="nome"
                                item-value="id"
                                label="Paciente"
                                :rules="[v => !!v || 'Obrigatório prencher o paciente!']"
                                outlined
                            ></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-autocomplete
                                v-model="tipoDocumento"
                                :items="tiposDocumentos"
                                label="Tipo Documento"
                                :rules="[v => !!v || 'Obrigatório prencher o tipo documento!']"
                                outlined
                            ></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-file-input
                                color="deep-purple accent-4"
                                counter
                                label="Arquivo CSV"
                                prepend-icon="mdi-package-up"
                                multiple
                                outlined
                                :show-size="1000"
                                @change="setPdfBase64"
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
                <v-btn color="blue darken-1" text @click="salvar">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        arquivo: null,
        idPaciente: null,
        tipoDocumento: null,
        pacientes: [],
        tiposDocumentos: ['Atestado', 'Licença Tratamento Saúde'],
        avisoArquivoVaziu: ""
    }),
    created() {
        this.initialize();
  },
    computed: {
        dialog: {
            get() {
                return this.dialogImportar;
            },
            set() {
                this.$emit('close',false);
            }
        }
    },
    watch: {
        arquivo(val) {
            if(val != null){
                this.avisoArquivoVaziu = false;
            }
        }
    },
    props:{
        dialogImportar: {
            type: Boolean
        }
    },
    methods: {
        initialize() {
            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.pacientes = response.data;
            });
        },
        close() {
            this.$emit('close',false);
        },
        salvar() {
            // console.log(this.arquivo.length);
            var data = {
                paciente: this.paciente,
                tipoDocumento: this.tipoDocumento,
                documento: this.arquivo
            };
            this.axios.post(process.env.VUE_APP_URL_API + '/lts', data).then(response => {
                // console.log(response.data);
                response.data = null;
            });
        },
        setPdfBase64(event) {
            const file = event[0];
            const extensao = file.name.split('.').pop().toLowerCase();
            console.log(file.name.split('.').pop().toLowerCase());
            // if (!file.type.includes('pdf.*')) {
            //     alert('Por favor selecione a foto!');
            //     return;
            // }

            if(extensao == 'pdf') {

            }

            if(typeof FileReader === 'function') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    // this.imgSrc = event.target.result;
                    console.log(event.target.result);
                    // this.pessoa.foto = this.imgSrc;
                }
                reader.readAsDataURL(file);
            }
            if(!(typeof FileReader === 'function')) {
                alert('Sorry, FileReader API not supported');
            }
        }
    }
}
</script>
