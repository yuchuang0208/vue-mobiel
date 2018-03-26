<template>
  <div class="movielist-container">
      <div class="search">
        <mt-search
            v-model="value"
            cancel-text="取消"
            placeholder="搜索">
        </mt-search>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
            }
        },
        methods: {

        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .movielist-container {
        padding: 6px;
        .search {
            .mint-searchbar-core {
                height: 28px;
                text-align: left;
                margin-bottom: 0;
                padding: 0;
                background-color: #fff;
            }
        }
    }
</style>
