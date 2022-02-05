<template>
    <v-main class="px-8">
        <v-row>
            <v-row>
                <v-col id="Result" cols="12" class="text-h6">
                    The Result
                </v-col>
            </v-row>
            <v-row align="center">
                <v-col cols="12" class="text-subtitle-1"> bob </v-col>
                <v-col cols="12" md="6" class="text-body-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod repellat saepe eveniet minima sed maxime amet rem
                    perspiciatis quisquam. Consequatur, aut fugiat commodi fuga
                    iste quas repellat facere soluta iure!
                </v-col>
                <v-col cols="12" md="6">
                    <img-comparison
                        left-label="Input"
                        left-image="/Misc/EPA_Before.gif"
                        right-image="/Misc/EPA_After.gif"
                        right-label="Output"
                    ></img-comparison>
                </v-col>
            </v-row>
        </v-row>
        <v-row>
            <v-row>
                <v-col id="Why" cols="12" class="text-h6"> The Why </v-col>
            </v-row>
            <v-row align="center">
                <v-col cols="12" md="6" class="text-body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod repellat saepe eveniet minima sed maxime amet rem
                    perspiciatis quisquam. Consequatur, aut fugiat commodi fuga
                    iste quas repellat facere soluta iure!
                </v-col>
                <v-col cols="12" md="6"> </v-col>
            </v-row>
        </v-row>
        <v-row>
            <v-row>
                <v-col id="How" cols="12" class="text-h6"> The How </v-col>
            </v-row>
            <v-row align="center">
                <v-col cols="12" md="6" class="text-body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod repellat saepe eveniet minima sed maxime amet rem
                    perspiciatis quisquam. Consequatur, aut fugiat commodi fuga
                    iste quas repellat facere soluta iure!
                </v-col>
                <v-col cols="12" md="6"> </v-col>
            </v-row>
        </v-row>
    </v-main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

<style>
.left-label {
    color: white;
    font-size: 20px;
    font-weight: bold;
}
.right-label {
    color: black;
    font-size: 20px;
    font-weight: bold;
}
</style>
