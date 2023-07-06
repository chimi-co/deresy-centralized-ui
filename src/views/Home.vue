<template>
  <el-row class="header-row">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <span class="home-title">GITCOIN REVIEWS</span><br />
      <span class="home-subtitle">Explore public goods projects for web3</span>
    </el-col>
  </el-row>
  <hr />
  <el-row
    style="
      padding: 5% 0;
      background-color: #8c66f7;
      color: white;
      margin-top: -1px;
    "
  >
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="12"
      :xl="12"
      style="padding: 0% 5% 0% 10%"
    >
      <h1>What is Gitcoinreviews.co?</h1>
      <p>
        Powered by Deresy, a <strong>DEcentralized REview SYstem</strong> on
        Arbitrum, gitcoinreviews aims to bring users full transparency on how
        gitcoin grants are performing and using their funds.
      </p>
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="12"
      :xl="12"
      style="padding: 0% 10% 0% 5%"
    >
      <img src="../assets/images/rocket-gitcoin.svg" />
    </el-col>
  </el-row>
  <hr />
  <el-row style="padding: 5% 0">
    <el-col :span="24" style="padding: 0% 10%">
      <h1>Available Grants</h1>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" sortable label="Grant">
          <template #default="scope">
            <a
              :href="`/grants/${scope.row.id}`"
              target="_blank"
              class="grant-link">
              <div class="grant-name-table-item">
                <div>
                  <el-avatar
                    :src="scope.row.image"
                    :size="40"
                    :round="true"
                  ></el-avatar>
                </div>
                <div class="table-grant-name">
                  {{ scope.row.name }}
                </div>
              </div>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="funds" sortable label="Funds raised" />
        <el-table-column prop="reviews" sortable label="Total reviews" />
        <el-table-column prop="region" sortable label="Region" />
        <el-table-column prop="lastUpdated" sortable label="Last updated">
          
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <hr />
</template>

<script>
import { getAllGrants } from "@/services/GrantService";
import { onBeforeMount, reactive, ref } from "vue";
import { getAllReviews } from "@/services/ReviewService";
import { getAllReviewRequests } from "@/services/ReviewRequestService";
export default {
  name: "Home",
  components: {},
  setup() {
    const loading = ref(true);
    const state = reactive({
      grantsData: {},
    });
    const tableData = ref([]);

    onBeforeMount(async () => {
      const grantsResponse = await getAllGrants();
      state.grantsData = grantsResponse.response;
      state.grantsData.sort((a, b) =>
        parseInt(a.amount_received) < parseInt(b.amount_received) ? 1 : -1
      );
      const reviews = await getAllReviews().then((res) => {
        return res.response;
      });
      const reviewRequests = await getAllReviewRequests().then((res) => {
        return res.response;
      });
      state.grantsData.forEach((grant) => {
        const reviewObj = reviews.find(
          (r) => r.requestName == grant.request_name
        );
        const reviewRequest = reviewRequests.filter(
          (rr) => rr.requestName == grant.request_name
        )[0];
        var formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        const formattedAmount = formatter.format(grant.amount_received);
        const grantObj = {
          id: grant.id,
          image: grant.logo_url,
          name: grant.title,
          lastUpdated: grant.last_update_natural,
          region: grant.region.label,
          funds: formattedAmount,
          reviews: reviewObj
            ? reviewObj.reviews?.filter(
                (r) =>
                  r.targetIndex ==
                  reviewRequest.targets.indexOf(grant.request_target)
              ).length
            : 0,
        };
        tableData.value.push(grantObj);
      });
      loading.value = false;
    });

    return {
      tableData,
      loading,
      state,
    };
  },
};
</script>

<style scoped>
.header-row {
  padding: 7%;
  background-color: #f4f1fa;
  margin: 0;
}
.header-row::before {
  content: "";
  background-image: url("../assets/images/gitcoin-bg.svg");
  background-position: 70% 30%;
  background-size: contain;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.15;
}
.grant-card {
  margin: 5%;
  width: 100% !important;
  height: 97% !important;
}
.grant-link {
  width: 100% !important;
  text-decoration: none;
  height: 97% !important;
}
.grant-img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
.home-title {
  font-weight: bolder;
  font-size: 40px;
  text-align: center;
  margin: 3% 0;
  color: #6610f2;
  position: relative;
  text-shadow: 1px 1px #6f6d6d60;
}
.home-subtitle {
  font-size: 24px;
  text-align: center;
  margin: 1% 0;
  color: #545454;
  position: relative;
  font-weight: bolder;
}
hr {
  border-top: 5px solid #6610f2;
  margin: 0px 0px 0px 0px !important;
}
.grant-img{
  width: 50px;
  height: 50px;
  background-size: cover;
}
.grant-name-table-item{
  display: flex;
  align-items: center;
}
.table-grant-name{
  margin-left: 10px;
  color:#545454;
}
</style>
