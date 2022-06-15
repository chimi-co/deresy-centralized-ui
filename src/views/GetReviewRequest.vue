<template>
  <div class="home-container">
    <el-row class="s1-section-1">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
      >
        <h1 style="text-align:center">Deresy</h1>
        <h2></h2>
        <div class="description">
          <p style="text-align:center">
            <strong>Get Review Request</strong>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: 'GetReviewRequest',
    setup() {
      const openWindow = (href) => {
        window.open(href, '_blank')
      }
      return {
        openWindow,
      }
    },
  }
</script>

<style scoped>
  .description {
    margin: 1em 0;
    padding-bottom: 10px;
    line-height: 1.5em;
  }
</style>
