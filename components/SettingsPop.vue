<template>
    <sub-menu
      icon='mdi-settings'
      :menu-items='fileMenuItems'
      @sub-menu-click='onMenuItemClick'
    />
</template>

<script>
    export default {
        data: () => ({
            fileMenuItems: [
                {
                    name: "Appearance",
                    iconon: "mdi-palette",
                    menu: [
                        { lightmode : true },
                        { colorpicker : true }
                    ]
                },
                { isDivider : true },
                {
                    name: "Transitions",
                    icon: "mdi-movie-open-edit",
                    placeholder: true

                },
                { isDivider : true },
                {
                    name: "Restore Defaults",
                    btn: true
                }
            ]
        }),
        methods: {
        }

    }
</script>

<style lang="scss" scoped>

</style>