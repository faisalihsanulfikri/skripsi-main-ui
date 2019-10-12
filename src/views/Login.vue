<template>
    <div class="container">
        <form class="card">
            <div class="title">
                <span>Client Area Login</span>
            </div>
            <div class="input">
                <div class="input-email">
                    <input type="text" v-model="email" placeholder="Email">
                </div>
                <div class="input-password">
                    <input type="password" v-model="password" placeholder="password">
                </div>
            </div>
            <div class="input-btn">
                <button @click="login">Sign In</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseURL : "http://localhost:8000/api",
            email : "",
            password : ""
        };
    },
    methods: {
        login(){
            let endpoint = this.baseURL+"/auth/login";

        }
    },
    created(){
        this.login();
    }
};
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        text-align: -webkit-center;
        margin-top: 10%;
        
        .card {
            border: 1px solid;
            width: 40%;
            border: 0;

            .title {
                padding: 20px;
                border-bottom: 3px solid #72972b;
                background-color: #8ebd36;
                color: white;
                font-size: larger;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            .input {
                padding: 20px;
                background-color: #eaeaec;

                .input-email {
                    padding: 5px 5px 7px 5px;
                    
                    input {
                        width: 100%;
                        border: 0;
                        height: 15px;
                        padding: 5px 0px 5px 5px;
                    }
                }
                .input-password {
                    padding: 7px 5px 5px 5px;

                    input {
                        width: 100%;
                        border: 0;
                        height: 15px;
                        padding: 5px 0px 5px 5px;
                    }
                }
            }
            .input-btn {
                padding: 15px;
                background-color: #499fec;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;

                button {
                    background-color: #8ebd36;
                    border: 0;
                    color: white;
                    padding: 10px;
                    width: 20%;
                    border-radius: 3px;
                    border-bottom: 1px solid #72972b;
                }
            }
        }
    }
</style>