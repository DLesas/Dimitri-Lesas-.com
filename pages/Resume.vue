<template>
    <div>
        <client-only placeholder="Loading...">
            <div>
                <Pdf :src="pdf" :page="1"> </Pdf>
            </div>
        </client-only>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pdf: 'Person/Data CV Latest.pdf',
        }
    },
    head() {
      return {
        title: "Resume/CV",
        meta: [
          {
            hid: 'Resume/CV',
            name: 'Resume/CV',
            content: "Resume/CV of the full stack developer & Data scientist Dimitri Lesas', who is avaliable for employment / Contract Work / freelance work. Here you will find my previous work / employment."
          }
        ]
      }
    },
}
</script>

<style lang="scss" scoped></style>
