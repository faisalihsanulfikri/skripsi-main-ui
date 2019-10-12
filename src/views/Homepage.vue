<template>
    <div>
        <h1>Homepage</h1>
    </div>
</template>

<script>
export default {

    methods: {
        getUsers() {
            let endpoint = '/get/users';
            this.axios.get(endpoint).then(res => {
                console.log('masuk pak eko', res);
            }).catch(err => {
                console.log('gamasuk pak eko', err);
            })

            
        },
        getWebsite(id) {
            let endpoint = `/get/website/${id}`;
            this.axios.get(endpoint).then(res => {
                console.log('masuk website', res);
            }).catch(err => {
                console.log('gamasuk website', err);
            })
        }
    },
    created() {
        this.getUsers();
        this.getWebsite(2);
    }

}
</script>

<style>

</style>