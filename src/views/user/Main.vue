<template>
    <div>
        <table width="100%">
            <tr>
                <td width="20%" style="background-color: #f4f4f4; vertical-align: initial;"><MainSidebar /></td>
                <td width="80%" style="vertical-align: initial;"><router-view /></td>
            </tr>
        </table>
    </div>
</template>

<script>
import MainSidebar from "@/components/main/MainSidebar";
export default {
    components: {
        MainSidebar,
    }
};
</script>

<style lang="scss" scoped>

</style>