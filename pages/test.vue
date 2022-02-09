<template>
    <div></div>
</template>

<script>
export default {
    mounted() {

        const date = new Date()
        date.setHours(0, 0, 0, 0)
        let value = 100

        function generateData() {
            value = Math.round(Math.random() * 10 - 5 + value)
            return {
                date: date.getTime(),
                value,
            }
        }

        function generateDatas(count) {
            const data = []
            for (let i = 0; i < count; ++i) {
                data.push(generateData())
            }
            return data
        }
        console.log(generateDatas(1200))
    },
}
</script>

<style lang="scss" scoped></style>
