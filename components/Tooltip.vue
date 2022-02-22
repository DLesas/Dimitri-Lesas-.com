<template>
    <div id="tooltip">
        <v-container fluid>
            <v-row>
                <v-col cols="12" style="text-align: center;">
                    my big tooltip xD
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-btn color="primary" small>
                        Next
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn color="primary" small>
                        Finish
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <div id="arrow" data-popper-arrow></div>
    </div>
</template>

<script>
export default {
    props: {
        target: {
            type: String,
            default: '',
        },
    },
    mounted() {
        /* eslint-disable no-undef */
        setTimeout(() => {
            const target = document.querySelector(`#${this.target}`)
            const tooltip = document.querySelector('#tooltip')
            // eslint-disable-next-line no-unused-vars
            const popperInstance = Popper.createPopper(target, tooltip)
        }, 0)
    },
}
</script>

<style lang="scss" scoped>
#tooltip {
    background: var(--v-secondary-base);
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    font-size: 13px;
    border-radius: 4px;
}
#arrow,
#arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
}

#arrow {
    visibility: hidden;
}

#arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
}
#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>
