
<template>
    <div></div>
</template>

<script>
export default {
    mounted() {
        /* eslint-disable camelcase */
        // eslint-disable-next-line no-unused-vars
        const { am5, am5hierarchy, am5themes_Animated, am5xy } = this.$am5()

        const date = new Date()
        date.setHours(0, 0, 0, 0)
        let value = 100

        function generateData() {
            value = Math.round(Math.random() * 10 - 4.2 + value)
            am5.time.add(date, 'day', 1)
            return {
                date: date.getTime(),
                // eslint-disable-next-line object-shorthand
                value: value,
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
