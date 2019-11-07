<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header>ÁCIDO ÚRICO</v-expansion-panel-header>
            <v-expansion-panel-content>

                <exibicao-parametros-exame></exibicao-parametros-exame>

            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header>ÁCIDO ÚRICO</v-expansion-panel-header>
            <v-expansion-panel-content>

                <exibicao-parametros-exame></exibicao-parametros-exame>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>

</template>

<script>
    export default {
         computed: {

        },
        created () {
            this.initialize();
        },
        data: () => ({
            usuario: {},
            circunferenciaAbdominal: {
                data: {
                    labels: ['10/05/2019', '10/10/2019', '05/11/2019', '10/11/2019', '15/11/2019', '15/11/2019'],
                    series: [
                        [80, 200, 90, 120, 10,80]
                    ]
                },
                options: {
                    axisX: {
                        showGrid: true
                    },
                    low: 0,
                    high: 200,
                    chartPadding: {
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                responsiveOptions: [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0]
                            }
                        }
                    }]
                ]
            },
            peso: {
                data: {
                    labels: ['10/05/2019', '10/10/2019', '05/11/2019', '10/11/2019', '15/11/2019', '15/11/2019'],
                    series: [
                        [80, 200, 90, 120, 10,80]
                    ]
                },
                options: {
                    axisX: {
                        showGrid: true
                    },
                    low: 0,
                    high: 200,
                    chartPadding: {
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                responsiveOptions: [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0]
                            }
                        }
                    }]
                ]
            },
            pressaoArterialSistolica: {
                data: {
                    labels: ['10/05/2019', '10/10/2019', '05/11/2019', '10/11/2019', '15/11/2019', '15/11/2019'],
                    series: [
                        [80, 200, 90, 120, 10,80]
                    ]
                },
                options: {
                    axisX: {
                        showGrid: true
                    },
                    low: 0,
                    high: 200,
                    chartPadding: {
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                responsiveOptions: [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0]
                            }
                        }
                    }]
                ]
            },
            pressaoArterialDiastolica: {
                data: {
                    labels: ['10/05/2019', '10/10/2019', '05/11/2019', '10/11/2019', '15/11/2019', '15/11/2019'],
                    series: [
                        [80, 200, 90, 120, 10,80]
                    ]
                },
                options: {
                    axisX: {
                        showGrid: true
                    },
                    low: 0,
                    high: 200,
                    chartPadding: {
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                responsiveOptions: [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0]
                            }
                        }
                    }]
                ]
            }
        }),
        methods: {
            initialize() {
                var data = {
                    usuario: localStorage.getItem("usuario")
                }

                this.axios.post(process.env.VUE_APP_URL_API + "/pessoa/getPorNomeUsuario", data).then(response => {
                    this.usuario = response.data;
                });
            }
        },
        watch: {

        },
    }
</script>