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
                @click="snackbar = false"
            >
                <v-icon
                    class="mr-2"
                    @click="$emit('closeSnackbar')"
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
        watch: {
            snackbar(val) {
                val;
            }
        }
    }

</script>
