<template>
  <div class="home-container">
    <el-row class="s1-section-1">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1 class="home-title">Gitcoin Review</h1>
        <div>
          <el-row class="grants-row">
            <el-col
              v-for="(grant, index) in state.grantsData"
              :key="index"
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="8"
            >
              <router-link
                class="el-link el-link--default grant-link"
                :to="`/grants/${grant.id}`"
              >
                <el-card
                  class="grant-card"
                  :body-style="{ padding: '10px' }"
                >
                  <el-image
                    :src="grant.logo_url"
                    class="image grant-img"
                    fit="contain"
                  />
                  <div style="padding: 14px">
                    <span>{{ grant.title }}</span>
                  </div>
                </el-card>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllGrants } from "@/services/GrantService";
import { onBeforeMount, reactive, ref } from "vue";
export default {
  name: "Grant",
  components: {},
  setup() {
    const loading = ref(true);
    const state = reactive({
      grantsData: {},
    });

    onBeforeMount(async () => {
      const grantsResponse = await getAllGrants();
      state.grantsData = grantsResponse.response;
      loading.value = false;
    });

    return {
      loading,
      state,
    };
  },
};
</script>

<style scoped>
.grants-row{
  margin: 1em 0;
  padding-bottom: 10px;
  line-height: 1.5em;
  display:flex;
}
.grant-card{
  margin: 5%;
  width: 100% !important;
  min-height: 100%;
  max-height: 100%;
  flex:1;
}
.grant-link{
  width: 100% !important;
  height:95%;
  text-decoration:none;
}
.grant-img{
  width: 100%; 
  height: auto;
  aspect-ratio: 1;
}
.home-title{
  font-weight: bolder;
  font-size: 30px;
  text-align: center;
  margin: 3% 0;
}
</style>
