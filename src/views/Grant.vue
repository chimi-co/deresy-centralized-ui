<template>
  <div v-loading="loading">
    <div v-if="!loading">
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
            <el-row>
              <span class="title-text">
                {{ state.grantData.title }}
              </span>
            </el-row>
            <el-row style="margin-top: 20px">
              <div v-if="state.reviews?.length > 0">
                <div
                  v-if="state.reviewRequest.isClosed"
                  class="warning custom-block"
                >
                  This request is closed and does no longer accept reviews.
                </div>
                <div v-else style="display: inline-flex">
                  <div
                    v-if="state.reviewRequest.reviewers.includes(walletAddress)"
                    style="display: inline-flex"
                  >
                    <el-button
                      type="primary"
                      class="d-round-btn"
                      @click="goToSubmitReview()"
                      round
                      >Submit Review</el-button
                    >
                  </div>
                  <div v-else class="warning custom-block">
                    {{
                      `Your address (${walletAddress}) is not authorized to submit a review for this request.`
                    }}
                  </div>
                </div>
                <el-button
                  type="primary"
                  class="d-round-btn"
                  @click="scrollToAbout()"
                  round
                  >See Project<el-icon class="el-icon--right"><ArrowDownBold /></el-icon
                ></el-button>
              </div>
              <div v-else>
                <div
                  v-if="state.reviewRequest.isClosed"
                  class="warning custom-block"
                >
                  This request is closed and does no longer accept reviews.
                </div>
                <div class="warning custom-block">
                  No reviews available for this grant.
                </div>
              </div>
              <a
                target="_blank"
                :href="`${process.env.VUE_APP_IPFS_BASE_URL}/get_request.html`"
              >
                <el-button type="primary" class="d-round-btn" round>
                  See Review Request (IPFS)
                </el-button>
              </a>
            </el-row>
            <hr />
            <el-row class="grant-stats-row">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="grant-stat" v-if="state.grantData.reference_url">
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
                <div class="grant-stat" v-if="state.grantData.twitter_handle_1">
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
                <div
                  class="grant-stat"
                  v-if="state.grantData.last_update_natural"
                >
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Watch />
                  </el-icon>
                  {{ `Updated ${state.grantData.last_update_natural} ago` }}
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="grant-stat" v-if="state.grantData.admin_address">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Promotion />
                  </el-icon>
                  <a
                    :href="`https://etherscan.io/address/${state.grantData.admin_address}`"
                    target="_blank"
                    class="grant-link"
                  >
                    {{ formatAddress(state.grantData.admin_address) }}
                  </a>
                  <el-button
                    class="copy-to-clipboard"
                    @click="copyToClipboard(state.grantData.admin_address)"
                    type="primary"
                    size="small"
                    round
                  >
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
                <div class="grant-stat" v-if="state.grantData.region.label">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <LocationFilled />
                  </el-icon>
                  {{ state.grantData.region.label }}
                </div>
                <div class="grant-stat" v-if="state.grantData.details_url">
                  <el-icon :size="small" color="#6610f2" class="grant-icon-sm">
                    <Platform />
                  </el-icon>
                  <a
                    :href="`https://gitcoin.co${state.grantData.details_url}`"
                    target="_blank"
                    class="grant-link"
                  >
                    Gitcoin page
                  </a>
                </div>
              </el-col>
            </el-row>
            <hr />
            <el-row>
              <el-col :span="24" class="reviews-col">
                <el-col class="review-title-col">
                  <span>Reviews</span>
                </el-col>
                <el-col class="reviews-cards-col">
                  <div v-if="state.reviews?.length > 0">
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
          </el-col>
        </el-row>
        <hr />
        <el-row>
          <el-col class="grant-about-col" :span="24" id="about-row">
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
      </div>
      <div v-else>
        <el-result
          icon="warning"
          title="404"
          sub-title="We're sorry, we couldn't find that grant, please try again."
        >
          <template #extra>
            <el-link href="/grants" :underline="false">
              <el-button type="primary" size="large">Explore Grants</el-button>
            </el-link>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getGrant } from "@/services/GrantService";
import { getReviews } from "@/services/ReviewService";
import { getReviewRequest } from "@/services/ReviewRequestService";
import { getReviewForm } from "@/services/ReviewFormService";
import { onBeforeMount, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import {
  FullScreen,
  Pointer,
  Connection,
  Watch,
  Promotion,
  LocationFilled,
  CopyDocument,
  Platform,
  ArrowDownBold,
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
    CopyDocument,
    Platform,
    ArrowDownBold,
  },
  setup() {
    const store = useStore();
    const {
      state: { user },
    } = store;
    const route = useRoute();
    const router = useRouter();
    const grantID = route.params.grant_id;
    const aboutContent = ref("");
    const walletAddress = computed(() => user.walletAddress);
    /*
      const contract = computed(() => contractState.contract)
      const web3 = computed(() => contractState.web3)
      */
    const loading = ref(true);
    const grantNotFound = ref(true);
    const state = reactive({
      grantData: {},
      reviewRequest: {},
      reviews: [],
      reviewForm: {},
    });
    const scrollToAbout = () => {
      document.querySelector("#about-row").scrollIntoView({
        behavior: "smooth",
      });
    };

    const goToSubmitReview = () => {
      router.push({
        path: `/grants/${grantID}/submit-review/`,
      });
    };

    const copyToClipboard = async (text) => {
      await navigator.clipboard.writeText(text);

      ElMessage({
        message: "Copied to Clipboard!",
        type: "success",
      });
    };

    const formatAddress = (address) => {
      const length = address.length;
      return `${address.substring(0, 6)}...${address.substring(
        length - 5,
        length - 1
      )}`;
    };

    onBeforeMount(async () => {
      const grantResponse = await getGrant(grantID);
      if (grantResponse.response) {
        grantNotFound.value = false;
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
        state.reviews = reviewsResponse.response?.reviews;

        const reviewFormResponse = await getReviewForm(
          state.reviewRequest.reviewFormIndex
        );
        state.reviewForm = reviewFormResponse.response;
      }
      loading.value = false;
    });

    return {
      loading,
      walletAddress,
      grantNotFound,
      state,
      aboutContent,
      goToSubmitReview,
      scrollToAbout,
      copyToClipboard,
      formatAddress,
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
  padding-left: 0%;
}

.reviews-cards-col {
  width: 100%;
  text-align: left;
  padding: 0% 0%;
}
.d-round-btn {
  margin: 10px 30px 10px 0px;
  display: inline-flex;
}
.custom-block.warning {
  padding: 8px 16px;
  background-color: rgba(var(--el-color-primary-rgb), 0.1);
  border-radius: 4px;
  border-left: 5px solid var(--el-color-primary);
  margin: 10px 30px 10px 0px;
  font-size: 14px;
  display: inline-flex;
}
</style>
<style>
.el-table .cell {
  white-space: pre !important;
}
.ql-image {
  width: 100%;
  height: auto;
  margin: 2% 0;
}
.copy-to-clipboard {
  cursor: pointer;
  margin-left: 15px;
}
.reviews-col {
  margin: 5% 0;
}
</style>
