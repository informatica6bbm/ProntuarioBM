<template>
    <v-simple-table dense>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Parâmetro</th>
                    <th class="text-left">Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in parametros" :key="item.idParametro">
                    <td :style="{ width: '40%' }">{{ item.parametro }}</td>
                    <td>
                        <v-text-field
                            v-model="item.valor"
                            :style="{'margin-bottom': '-22px', 'margin-top': '2px', 'margin-left': '0px','margin-right': '0px', heigth: '100%'}"
                            outlined
                            dense
                        ></v-text-field>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
    export default {
        data: () => ({
            itemresultado: {
                parametro: "",
                idResultadoExame: "",
                valor: "",
                idParametro: "",
                idExame: "",
                createdAt: "",
                updatedAt: ""
            },
            itemresultadoDefault: {
                parametro: "",
                idResultadoExame: "",
                valor: "",
                idParametro: "",
                idExame: "",
                createdAt: "",
                updatedAt: ""
            },
            parametrosExame: [],
            parametros: []
        }),
        props: [
            'idResultadoExame',
            'idExame'
        ],
        watch: {
            dialog (val) {
                val || this.close()
            },
            idExame(val) {
                var id = val;
                this.axios.get('http://localhost:3000/parametroExame/getByIdExame/' + id).then(response => {
                    this.parametrosExame = response.data;
                    var i = 0;
                    this.parametros = [];
                    for(i in this.parametrosExame){
                        this.itemresultado.idParametro = this.parametrosExame[i].id;
                        this.itemresultado.parametro = this.parametrosExame[i].parametro;
                        this.itemresultado.idExame = id;
                        this.parametros.push(this.itemresultado);
                        this.itemresultado = this.itemresultadoDefault;
                    }
                });
            },
            salvaParametros(val) {
                if(val){
                    this.save();
                }
            }
        },
        methods: {
            validaValoresExame() {
                var camposValidos = true;
                var i = 0;
                for(i in this.parametros){
                    if(this.parametros[i].valor == "") {
                        camposValidos = false;
                        break;
                    }
                }

                return camposValidos;
            },
            save() {
                if(this.validaValoresExame()){
                    var i = 0;
                    for(i in this.parametros) {
                        this.axios.post('http://localhost:3000/resultadoParametroExame/' + this.idResultadoExame, this.parametros[i]);
                    }
                    this.salvaParametros = false;
                }
            }
        }
    }
</script>
