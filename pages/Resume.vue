<template>
    <div style="width: 100%">
        <v-container style="width: 100%">
            <v-row style="width: 100%" justify="center">
                <v-col cols="8">
                    <client-only placeholder="Loading...">
                        <div style="border-style: inset">
                            <Pdf :src="pdf" :page="currentpage" @num-pages="pageCount = $event"> </Pdf>
                        </div>
                    </client-only>
                </v-col>
            </v-row>
        </v-container>
        <FloatingBtnResume :maxpages=pageCount @pagechange="currentpage = $event"></FloatingBtnResume>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentpage: 1,
            pageCount: 1,
            pdf: '/Person/Data CV Latest.pdf',
        }
    },
    head() {
        return {
            title: 'Resume/CV',
            meta: [
                {
                    hid: 'Resume/CV',
                    name: 'Resume/CV',
                    content:
                        "Resume/CV of the full stack developer & Data scientist Dimitri Lesas', who is avaliable for employment / Contract Work / freelance work. Here you will find my previous work / employment.",
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped></style>
