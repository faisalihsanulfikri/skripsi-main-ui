<template>
    <div class="container">
        <div class="title">
            <span>Website Saya</span>
        </div>
        <div class="content">
            <table width="100%">
                <thead>
                    <tr>
                        <th>Alamat Website</th>
                        <th>Status</th>
                        <th>Expired Date</th>
                        <th>Activated Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>webhade.webhade.com</td>
                        <td>persyaratan</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <button>Atur</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .container {
        .title {
            padding: 20px;
            text-align: left;
            font-size: x-large;
            font-weight: 600;
            border-bottom: 2px solid #dbdbdb;
        }
        .content {
            padding: 30px 10px;
        }

        table {
            border-collapse: collapse;
            text-align: left;
        }

        table, th, td {
            border: 1px solid black;
            padding: 5px;
        }
    }
</style>