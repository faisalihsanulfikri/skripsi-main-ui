<template>
  <div>
      <h1>Homepage</h1>
  </div>
</template>

<script>
export default {

    methods: {
        fetchUsers() {
            let endpoint = '/get/users';
            this.axios.get(endpoint).then(res => {
                console.log('masuk pak eko', res);
            }).catch(err => {
                console.log('gamasuk pak eko', err);
            })
        }
    },
    created() {
        // this.fetchUsers();
    }

}
</script>

<style>

</style>