<template>
  <div class="commodity-pinglun">
      <comment :id="id"></comment>
  </div>
</template>

<script>
    import comment from '../someChildComponents/comment.vue';
    export default {
        data() {
            return {
                id: this.$route.params.id
            }
        },
        methods: {

        },
        created() {

        },
        components: {
            comment
        }
    }
</script>

<style lang="scss" scoped>
    .commodity-pinglun {
        padding: 6px;
    }
</style>
