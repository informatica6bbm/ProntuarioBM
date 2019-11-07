<template>
    <v-card
        class="mx-auto"
        max-width="95%"
        min-height="98vh"
        outlined

        :style="{'margin-left': '2.5%', 'margin-rigth': '2.5%', 'margin-top': '10px' }"
    >
        <v-container>
            <v-row>
                <v-col cols="4" sm="12" md="4">
                    <img :src="usuario.foto" :style="{ width: '300px', height: '300px', 'margin-left': '15%', 'margin-right': '15%' }"/>

                </v-col>
                <v-col cols="4" sm="12" md="4">
                    <p :style="{ 'margin-left': '-30px' }"><v-card-title>{{ usuario.nome }}</v-card-title></p>
                    <p class="text-md-left"><strong>Matrícula:</strong> {{ usuario.matricula }}</p>
                    <p class="text-md-left"><strong>Email:</strong> {{ usuario.email }}</p>
                    <p class="text-md-left"><strong>Estado cívil:</strong> {{ usuario.estadoCivil }}</p>
                    <p class="text-md-left"><strong>Data Nascimento:</strong> {{ usuario.dataNascimento.split('T')[0].split('-').reverse().join('/') }}</p>
                    <p class="text-md-left"><strong>Sexo:</strong> {{ usuario.sexo }}</p>
                    <p class="text-md-left"><strong>Data Ingresso:</strong> {{ usuario.dataIngresso.split('T')[0].split('-').reverse().join('/') }}</p>
                </v-col>

                <v-col cols="4" sm="12" md="4">
                    <p class="text-md-left"><strong>C.N.S:</strong> {{ usuario.cartaoNacionalSus  }}</p>
                    <p class="text-md-left"><strong>C.M.S:</strong> {{ usuario.cartaoMunicipalSus }}</p>
                    <p class="text-md-left"><strong>Tipo Sanguíneo:</strong> {{ usuario.tipoSanguineo }}</p>
                    <p class="text-md-left"><strong>LTS:</strong> {{ usuario.lts ? "SIM" : "NÃO" }}</p>
                    <p class="text-md-left"><strong>Batalhão:</strong> {{ usuario.batalhao }}</p>
                    <p class="text-md-left"><strong>Setor:</strong> {{ usuario.setor }}</p>
                    <p class="text-md-left"><strong>Escala:</strong> {{ usuario.escala }}</p>
                    <p class="text-md-left"><strong>Hierarquia:</strong> {{ usuario.hierarquia }}</p>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="4" sm="12" md="3">
                    <material-chart-card
                        :data="circunferenciaAbdominal.data"
                        :options="circunferenciaAbdominal.options"
                        :responsive-options="circunferenciaAbdominal.responsiveOptions"
                        color="green"
                        type="Line"
                    >
                        <h4 class="title font-weight-light">
                             Circunferência Abdominal
                        </h4>                        
                    </material-chart-card>
                </v-col>

                <v-col cols="4" sm="12" md="3">
                    <material-chart-card
                        :data="peso.data"
                        :options="peso.options"
                        :responsive-options="peso.responsiveOptions"
                        color="green"
                        type="Line"
                    >
                        <h4 class="title font-weight-light">
                             Peso
                        </h4>                        
                    </material-chart-card>
                </v-col>

                <v-col cols="4" sm="12" md="3">
                    <material-chart-card
                        :data="pressaoArterialSistolica.data"
                        :options="pressaoArterialSistolica.options"
                        :responsive-options="pressaoArterialSistolica.responsiveOptions"
                        color="green"
                        type="Line"
                    >
                        <h4 class="title font-weight-light">
                            Pressão Arterial Sistólica
                        </h4>                        
                    </material-chart-card>
                </v-col>

                <v-col cols="4" sm="12" md="3">
                    <material-chart-card
                        :data="pressaoArterialDiastolica.data"
                        :options="pressaoArterialDiastolica.options"
                        :responsive-options="pressaoArterialDiastolica.responsiveOptions"
                        color="green"
                        type="Line"
                    >
                        <h4 class="title font-weight-light">
                            Pressão Arterial Diastólica
                        </h4>                
                    </material-chart-card>
                </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-row>
                <v-col cols="4" sm="12" md="12">
                    <h2 class="title font-weight-light">
                        <strong>EXAMES</strong>
                    </h2>
                    <exibicao-resultados-exames></exibicao-resultados-exames>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
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

<style>
    svg.ct-chart-bar, svg.ct-chart-line{
        overflow: visible;
    }
    .ct-label.ct-label.ct-horizontal.ct-end {
        font-size: 10px;
        position: relative;
        justify-content: flex-end;
        text-align: right;
        transform-origin: 100% 0;
        transform: translate(-100%) rotate(-15deg);
        white-space:nowrap;
        margin-bottom: 10px;    
        margin-left: 10px;
    }
</style>