<template>
    <div>
            <client-only placeholder="Loading...">
                <div>
                    <Pdf :src="pdf" :page="1">
                    </Pdf>
                </div>
            </client-only>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pdf: "Person/Data CV Latest.pdf"
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>