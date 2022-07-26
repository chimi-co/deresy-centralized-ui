<template>
  <div class="token-page-container">
    <div v-if="!loading" class="main-container">
      <div v-if="!grantNotFound">
        <el-row>
          <el-col
            :style="
              state.grantData.image_css.length > 1
                ? state.grantData.image_css
                : 'background-color:black; height:290px'
            "
          >
            <el-image
              :src="state.grantData.logo_url"
              class="image"
              fit="contain"
              style="width: 100%; height: 290px"
            >
              <template #error>
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    padding-top: 40%;
                    padding-bottom: 60%;
                    font-size: 20px;
                  "
                >
                  <el-icon :size="50" style="width: 3em; height: 3em">
                    <full-screen style="width: 5em; height: 5em" />
                  </el-icon>
                  <br />Loading...
                </div>
              </template>
            </el-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="title-col">
            <span class="title-text">
              {{ state.grantData.title }}
            </span>
            <hr />
            <el-row class="grant-stats-row">
              <el-col :span="12">
                <div class="grant-stat">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Pointer />
                  </el-icon>
                  <a
                    :href="`${state.grantData.reference_url}`"
                    target="_blank"
                    class="grant-link"
                  >
                    {{ state.grantData.reference_url }}
                  </a>
                </div>
                <div class="grant-stat">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Connection />
                  </el-icon>
                  <a
                    :href="`https://twitter.com/${state.grantData.twitter_handle_1}`"
                    target="_blank"
                    class="grant-link"
                  >
                    {{ state.grantData.twitter_handle_1 }}
                  </a>
                </div>
                <div class="grant-stat">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Watch />
                  </el-icon>
                  {{ `Updated ${state.grantData.last_update_natural} ago` }}
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grant-stat">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Promotion />
                  </el-icon>
                  <a
                    :href="`https://etherscan.io/address/${state.grantData.admin_address}`"
                    target="_blank"
                    class="grant-link"
                  >
                    {{ state.grantData.admin_address }}
                  </a>
                </div>
                <div class="grant-stat">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <LocationFilled />
                  </el-icon>
                  {{ state.grantData.region.label }}
                </div>
              </el-col>
            </el-row>
            <hr />
          </el-col>
        </el-row>
        <el-row>
          <el-col class="grant-about-col" :span="24">
            <el-row>
              <el-col class="grant-about-title">
                <span>About</span>
              </el-col>
              <el-col class="grant-about-text" :span="24">
                <div v-html="aboutContent"></div>
              </el-col>
            </el-row>
            <hr />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col class="review-title-col">
              <span>Reviews</span>
            </el-col>
            <el-col class="reviews-cards-col">
              <div v-if="state.reviews.length > 0">
                <el-card
                  v-for="(review, index) in state.reviews"
                  :key="index"
                  class="review-card"
                  shadow="hover"
                >
                  <template #header>
                    <div class="card-header">
                      <span class="review-title"
                        >Review #{{ index + 1 }} by ({{
                          review.reviewer
                        }})</span
                      >
                    </div>
                  </template>
                  <div class="review-body">
                    <span style="font-weight: bolder">Target</span><br />
                    <a
                      :href="state.reviewRequest.targets[review.targetIndex]"
                      target="_blank"
                      style="text-decoration: none"
                    >
                      {{ state.reviewRequest.targets[review.targetIndex] }} </a
                    ><br /><br />
                    <span style="font-weight: bolder">Target IPFS Hash</span
                    ><br />
                    <a
                      :href="`https://ipfs.io/ipfs/${
                        state.reviewRequest.targetsIPFSHashes[
                          review.targetIndex
                        ]
                      }`"
                      target="_blank"
                      style="text-decoration: none"
                    >
                      {{
                        state.reviewRequest.targetsIPFSHashes[
                          review.targetIndex
                        ]
                      }} </a
                    ><br /><br /><br />
                    <div
                      v-for="(question, index) in state.reviewForm.questions"
                      :key="index"
                    >
                      <span style="font-weight: bolder">{{ question }}</span
                      ><br />
                      {{ review.answers[index] }}
                      <br /><br />
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-else>
                <el-card>
                  There are no available reviews for this request yet.
                </el-card>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-result
          icon="warning"
          title="404"
          sub-title="We're sorry, we couldn't find that grant, please try again."
        >
          <template #extra>
            <el-link href="/" :underline="false">
              <el-button type="primary">Back</el-button>
            </el-link>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getGrant } from "@/services/GrantService";
import { getReviews } from "@/services/ReviewService";
import { getReviewRequest } from "@/services/ReviewRequestService";
import { getReviewForm } from "@/services/ReviewFormService";
import { onBeforeMount, reactive, ref } from "vue";
import {
  FullScreen,
  Pointer,
  Connection,
  Watch,
  Promotion,
  LocationFilled,
} from "@element-plus/icons";
export default {
  name: "Grant",
  components: {
    FullScreen,
    Pointer,
    Connection,
    Watch,
    Promotion,
    LocationFilled,
  },
  setup() {
    //const store = useStore()
    /*const {
        dispatch,
        state: { contractState, user, root },
      } = store */
    const route = useRoute();
    //const router = useRouter()
    const grantID = route.params.grant_id;
    const aboutContent = ref("");
    /*
      const walletAddress = computed(() => user.walletAddress)
      const contract = computed(() => contractState.contract)
      const web3 = computed(() => contractState.web3)
      */
    const loading = ref(true);
    const grantNotFound = ref(false);
    const state = reactive({
      grantData: {},
      reviewRequest: {},
      reviews: [],
      reviewForm: {},
    });
    onBeforeMount(async () => {
      const grantResponse = await getGrant(grantID);
      state.grantData = grantResponse.response;
      var QuillDeltaToHtmlConverter =
        require("quill-delta-to-html").QuillDeltaToHtmlConverter;
      const deltaOps = JSON.parse(state.grantData.description_rich).ops;
      var converter = new QuillDeltaToHtmlConverter(deltaOps, {});
      aboutContent.value = converter.convert();

      const reviewRequestResponse = await getReviewRequest(
        state.grantData.request_name
      );
      state.reviewRequest = reviewRequestResponse.response;

      const reviewsResponse = await getReviews(state.grantData.request_name);
      state.reviews = reviewsResponse.response.reviews;

      const reviewFormResponse = await getReviewForm(
        state.reviewRequest.reviewFormIndex
      );
      state.reviewForm = reviewFormResponse.response;

      loading.value = false;
    });

    return {
      loading,
      grantNotFound,
      state,
      aboutContent,
    };
  },
};
</script>
<style scoped>
.title-text {
  font-size: 25px;
  font-weight: bold;
}

.title-col {
  width: 100%;
  text-align: left;
  padding: 3% 10%;
}

.grant-stats-row {
  font-size: 18px;
  padding: 1%;
}
.grant-stat {
  margin: 3% 0%;
}
.grant-icon-sm {
  margin-right: 20px;
}
.grant-link {
  text-decoration: none;
  color: #6610f2;
}

.grant-about-col {
  width: 100%;
  text-align: left;
  padding: 3% 10%;
}

.grant-about-title {
  font-size: 25px;
  font-weight: bold;
  margin: 0 0 2% 0;
}

.grant-about-text {
  font-size: 16px;
}

hr {
  border-top: 1px solid rgb(197, 197, 197);
  margin: 25px 0px 10px 0px;
}
.review-card {
  margin-top: 30px;
  text-align: left;
}
.review-title {
  font-size: 20px;
  font-weight: bold;
}
.review-body {
  font-size: 15px;
}

.review-title-col {
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 25px;
  padding-left: 10%;
}

.reviews-cards-col {
  width: 100%;
  text-align: left;
  padding: 0% 10%;
}
</style>
<style>
.el-table .cell {
  white-space: pre !important;
}

.ql-image {
  max-width: 600px;
}
</style>
