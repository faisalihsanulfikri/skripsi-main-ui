<template>
  <div>lshafoa
    <div>
      <ul class="uk-pagination" uk-margin>
        <li>
          <a href="#">
            <span uk-pagination-previous></span>
          </a>
        </li>
        <li v-for="(page, i) in totalPages" :key="i">
          <a href="#" @click.prevent="current_page(i)">{{i+1}}</a>
        </li>
        <li>
          <a href="#">
            <span uk-pagination-next></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.pagination {
  margin-top: 40px;
}
</style>

<script>
export default {
  props: {
    totalPages: {
      type: Array
    }
  },

  created() {
    this.paginateNumber();
  },
  methods: {
    async current_page(i) {
      console.log("test", i + 1);
      console.log(this.$route.query, this.$route);

      try {
        let res = await this.$service.order.get({}, i + 1);

        console.log(res.data.data);
      } catch (err) {}
    },
    paginateNumber() {
      for (i = 0; i < this.last_page; i++) {
        this.pageNumber[i] = i;
        console.log("pageNumber[i]", this.pageNumber[i]);
      }

      console.log("pageNumber", this.pageNumber);

      return this.pageNumber;
    },
    isCurrentPage(page) {
      return this.pagination.current_page === page;
    },
    changePage(page) {
      if (page > this.pagination.last_page) {
        page = this.pagination.last_page;
      }
      this.pagination.current_page = page;
      this.$emit("paginate");
    }
  },
  computed: {
    pages() {
      let pages = [];
      let from = this.pagination.current_page - Math.floor(this.offset / 2);
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset - 1;
      if (to > this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      while (from <= to) {
        pages.push(from);
        from++;
      }
      return pages;
    }
  }
};
</script>