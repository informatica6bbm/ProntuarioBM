<template>
    <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :color="color"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"

            class="snackbar"
        >
            {{ textoSnackbar }}
            <v-btn
                dark
                text
                icon
                @click="close"
            >
                <v-icon
                    class="mr-2"
                >mdi-close</v-icon>
            </v-btn>
    </v-snackbar>
</template>

<script>

    export default {
        props: ['textoSnackbar', 'color', 'snackbar'],
        data: () => ({
            mode: '',
            timeout: 6000,
            x: null,
            y: 'top',
        }),
        methods: {
            close() {
                this.$emit('closeSnackbar');
            }
        }
    }

</script>

<style>
    @media only screen and (max-width: 640px) {
        .snackbar {
            margin-top: -10px;
        }
    }

    @media only screen and (min-width: 640px) {
        .snackbar {
            margin-top: -50px;
        }
    }
</style>
