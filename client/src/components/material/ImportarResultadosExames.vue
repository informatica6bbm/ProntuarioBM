<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Importar resultados</span>
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
                                Deve ser selecionado um arquivo CSV
                            </v-alert>
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
                                v-model="arquivo"
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
                <v-btn color="blue darken-1" text @click="importaResultadosExames">Importar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        arquivo: null,
        resultadosExames: null,
        avisoArquivoVaziu: false
    }),
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
        close() {
            this.$emit('close',false);
        },
        importaResultadosExames() {
            const arquivoCsv = this.arquivo != null ? this.arquivo[0] : false;
            const vm = this;

            if(!arquivoCsv) {
                this.avisoArquivoVaziu = true;
            }

            if(arquivoCsv){
                if (!arquivoCsv.type.includes('text/csv')) {
                    alert('Por favor selecione o arquivo CSV!');
                    return;
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = function() {
                        const linhas = reader.result.split("\n").map(function(linha) {
                            return linha.split(',');
                        });
                        var data = {
                            resultados: linhas
                        };

                        vm.axios.post(process.env.VUE_APP_URL_API + '/resultadoexame/importarResultado', data).then(response => {
                            if(response.data){
                                alert('Arquivo importado com sucesso!');
                                vm.close();
                            }

                            if(!response.data) {
                                alert('Ocorreu um erro ao importar!');
                            }
                        });
                    }
                    reader.readAsText(arquivoCsv);
                }

                if(!(typeof FileReader === 'function')) {
                    alert('Arquivo não suportado!');
                }
            }
        }
    }
}
</script>
