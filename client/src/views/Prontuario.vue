<template>
    <v-card
        class="mx-auto"
        max-width="95%"
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
        }),
        methods: {
            initialize() {
                var data = {
                    usuario: localStorage.getItem("usuario")
                }

                this.axios.post(process.env.VUE_APP_URL_API + "/pessoa/getPorNomeUsuario", data).then(response => {
                    console.log(response.data);
                    this.usuario = response.data;

                });
            }
        },
        watch: {

        },
    }
</script>