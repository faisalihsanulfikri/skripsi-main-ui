<template>
    <div class="container">
        <div class="title">
            <span>Client Area</span>
        </div>
        <div class="menu-dashboard">
            <span></span>
            <a href="/u/dashboard">
                <i class="fa fa-dashboard"></i>
                <span>Dashboard</span>
            </a>
        </div>
        <div class="menu-website">
            <a href="/u/website">
                <i class="fa fa-dashboard"></i>
                <span>Website Saya</span>
            </a>
        </div>
        <div class="menu-akun">
            <a href="/u/akun">Akun Saya</a>
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
            background-color: #8ebd36;
            color: white;
            font-size: larger;
        }
        .menu-dashboard {
            padding: 15px;
            border-bottom: 2px solid #dbdbdb;
            text-align: left;

            a {
                text-decoration: none;
            }
        }
        .menu-website {
            padding: 15px;
            border-bottom: 2px solid #dbdbdb;
            text-align: left;

            a {
                text-decoration: none;
            }
        }
        .menu-akun {
            padding: 15px;
            border-bottom: 2px solid #dbdbdb;
            text-align: left;

            a {
                text-decoration: none;
            }
        }
    }

</style>