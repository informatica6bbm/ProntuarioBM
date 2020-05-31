<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Nova Pessoa médicamento controlado</span>
            </v-card-title>

            <v-card-text>
                <v-container>
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
            idPaciente: null,
            pacientes: [],
        }),
        created() {
            this.initialize();
      },
        computed: {
            dialog: {
                get() {
                    return this.dialogAbrir;
                },
                set() {
                    this.$emit('close',false);
                }
            }
        },
        watch: {

        },
        props:{
            dialogAbrir: {
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
                var data = {
                    idPessoa: this.idPaciente,
                };
                this.axios.post(process.env.VUE_APP_URL_API + '/usuarioMedicamentoControlado', data).then(response => {
                    console.log(response.data);
                    if(response.data) {
                        this.close();
                    }
                });
            },
        }
    }
</script>
