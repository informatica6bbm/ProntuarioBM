<template>
    <v-dialog v-model="dialogImportar" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Importar resultados</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-file-input
                                color="deep-purple accent-4"
                                counter
                                label="Arquivo CSV"
                                multiple
                                placeholder=""
                                prepend-icon="mdi-package-up"
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
    }),
    props: [
        'dialogImportar',
    ],
    methods: {
        close() {
            this.$emit('closeImportar');
        },
        importaResultadosExames() {
            const file = this.arquivo[0];
            const vm = this;
            if(file){
                if (!file.type.includes('text/csv')) {
                    alert('Por favor selecione o arquivo CSV!');
                    return;
                }
                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = function() {
                        const linhas = reader.result.split("\n").map(function(line) {
                            return line.split(',');
                        });
                        var data = {
                            resultados: linhas
                        };

                        vm.axios.post(process.env.VUE_APP_URL_API + '/resultadoexame/importarResultado', data).then(response => {

                        });
                    }
                    reader.readAsText(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            }
        },
    }
}
</script>
