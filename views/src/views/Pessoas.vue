<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-1 ma-2"
        :footer-props="{
            'items-per-page-options': [8,10,12,14]
        }"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
            <div class="flex-grow-1"></div>

            <v-dialog v-model="dialog" max-width="500px">

            <template v-slot:activator="{ on }">
                <v-btn color="primary" class="mb-2" v-on="on">Nova</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
            </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>

            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>

</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search: "",
      rowsPerPageItems: [8, 12, 15],
        pagination: {
            rowsPerPage: 20
        },
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: true,
          value: 'nome',
        },
        { text: 'Matrícula', value: 'matricula' },
        { text: 'C.M.S', value: 'cartaoMunicipalSus' },
        { text: 'C.N.S', value: 'cartaoNacionalSus' },
        { text: 'Sexo', value: 'sexo' },
        { text: 'Tipo Sanguíneo',align: 'center', value: 'tipoSanguineo' },
        { text: 'Ações', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Pessoa' : 'Editar Pessoa'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
            {
                nome: "TESTE",
                matricula: "123456-7",
                cartaoMunicipalSus: "123456",
                cartaoNacionalSus: "123 4567 8912 345",
                sexo: "MASCULINO",
                tipoSanguineo: "+O"
            }
        ]

        this.axios.get('http://localhost:3000/pessoa').then(response => {
            this.desserts = response.data;
        });
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
