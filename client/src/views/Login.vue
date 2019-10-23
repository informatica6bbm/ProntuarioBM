<template>
    <v-card
        class="mx-auto card-login"
        max-width="1000"
    >

        <v-list-item :style="{ padding: '0px', 'padding-top': '0px' }">
            <v-list-item-content>
                <v-list-item-title class="headline" :style="{ 'color': 'red','border-left': '4px solid red', 'padding-left': '20px' }">LOGIN</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-card-text class="text--primary">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="12" md="5" class="coluna-logo">
                        <img
                            src="../assets/logocbmsc.png"
                            class="logo"
                        />
                    </v-col>

                    <v-col cols="12" sm="0" md="1">
                        <v-divider
                            class="mx-1"

                            vertical
                        ></v-divider>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" class="campos" >
                                    <v-alert
                                        dense
                                        outlined
                                        type="error"
                                        v-if="erroLogin"
                                    >
                                        {{ mensagem }}
                                    </v-alert>
                                    <v-text-field
                                        v-model="login.usuario"
                                        label="Nome de usuário!"
                                        prepend-icon="mdi-account"
                                        outlined
                                    ></v-text-field>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" class="campos">
                                    <v-text-field
                                        v-model="login.senha"
                                        label="Senha"
                                        :type="'password'"
                                        prepend-icon="mdi-lock-question"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row :style="{ padding: '0px', margin: '0px' }">
                                <v-col cols="12" sm="12" md="12" class="checkbox">
                                    <v-checkbox
                                        v-model="login.lembrar"
                                        label="Lembrar"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-btn
                                        color="primary"
                                        width="100%"
                                        @click="loginUsuario"
                                    >
                                        Entrar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>


                </v-row>
            </v-container>

        </v-card-text>
    </v-card>

</template>

<script>
export default {
    data: () => ({
        login: {
            usuario: null,
            senha: null,
            lembrar: false
        },
        erroLogin: false,
        mensagem: ""
    }),
    computed: {

    },
    watch: {
        'login.lembrar'(val){
            if (typeof(Storage) !== "undefined") {
                if(val) {
                    localStorage.setItem("login", true);
                }else {
                    localStorage.removeItem("login");
                }
            }
        }
    },
    created () {
        // console.log(this.$route.name);
        if (typeof(Storage) !== "undefined") {
            if(localStorage.getItem("login")) {
                this.login.lembrar = localStorage.getItem("login");

                if(this.login.lembrar){
                    if(localStorage.getItem("usuario")) {
                        this.login.usuario = localStorage.getItem("usuario");
                    }
                }
            }
        }
    },
    methods: {
        validFielsLogin(){
            if(this.login.usuario != null && this.login.senha != null){
                return true;
            }else {
                return false;
            }
        },
        loginUsuario() {
            if(this.validFielsLogin()) {
                this.axios.post('http://localhost:3000/login', this.login).then(response => {
                    if(response.data.response){
                        if (typeof(Storage) !== "undefined") {
                            if(localStorage.getItem("tokenlogin")){
                                localStorage.removeItem("tokenlogin");
                                localStorage.setItem("tokenlogin", response.data.token);
                            }else {
                                localStorage.setItem("tokenlogin", response.data.token);
                            }
                            localStorage.setItem("tokenlogin", response.data.token);
                            if(this.login.lembrar) {
                                localStorage.setItem("usuario", this.login.usuario);
                            }
                            window.location.replace("http://localhost:8080/");
                        }else {
                            this.mensagem = "Seu navegador não é compatível com o sitema!";
                            this.erroLogin = true;
                        }
                    }else {
                        this.mensagem = response.data.mensage;
                        this.erroLogin = true;
                    }

                });
            }else {
                this.mensagem = 'Obrigatório informar usuário e senha!';
                this.erroLogin = true;  
            }
            
        }
    }
}
</script>

<style>
    @media only screen and (max-width: 640px) {
        .logo {
            width: 65%;
            margin-left: 50px;
            margin-top: -10px;
        }

        .card-login {
            margin-top: 0px;
        }

        .coluna-logo {
            margin-bottom: -50px;
        }
    }

    @media only screen and (min-width: 640px) {
        .logo {
            width: 85%;
            margin-left: 30px;
            margin-top: -10px;
        }

        .card-login {
            margin-top: 75px;
        }
    }

    .campos {
        padding: 0px;
        margin: 0px;
    }

    .checkbox {
        padding: 0px;
        margin: 0px;
        margin-top: -20px;
    }

</style>
