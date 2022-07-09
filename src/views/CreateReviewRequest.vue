<template>
  <div class="form-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form label-position="top">
          <h1>Create Review Request</h1>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Name">
                <el-input
                  v-model="requestObject.name"
                  label="Name"
                  type="text"
                  placeholder="Enter a name for the request"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Review Form Index">
                <el-select
                  v-model="requestObject.reviewFormIndex"
                  placeholder="Select a review form index"
                  size="large"
                  style="width: 100%"
                >
                  <el-option
                    v-for="(o, index) in parseInt(reviewFormsTotal)"
                    :key="index"
                    :label="`Index ${index}`"
                    :value="index"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Reviewers">
                <el-input
                  v-for="(reviewer, index) in requestObject.reviewers"
                  :key="index"
                  style="margin-top: 5px"
                  v-model="requestObject.reviewers[index]"
                  label="Reviewer"
                  type="text"
                  placeholder="Enter a reviewer address"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-button @click="addReviewer()" class="add-btn" type="primary">
                Add Reviewer
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Target">
                <el-input
                  v-for="(target, index) in requestObject.targets"
                  :key="index"
                  style="margin-top: 5px"
                  v-model="requestObject.targets[index]"
                  label="Target"
                  type="text"
                  placeholder="Enter a target address"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Target IPFS Hash">
                <el-input
                  v-for="(target, index) in requestObject.targetHashes"
                  :key="index"
                  style="margin-top: 5px"
                  v-model="requestObject.targetHashes[index]"
                  label="Target IPFS Hash"
                  type="text"
                  placeholder="Enter a target IPFS Hash"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-button @click="addTarget()" class="add-btn" type="primary">
                Add Target
              </el-button>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Request IPFS Hash">
                <el-input
                  v-model="requestObject.requestHash"
                  label="Request IPFS Hash"
                  type="text"
                  placeholder="Enter a request IPFS Hash"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Reward per review">
                <el-input
                  v-model="requestObject.rewardPerReview"
                  label="Reward per review"
                  type="number"
                  placeholder="Enter the reward per review"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-col :span="24">
      <el-button
        @click="sendBtn()"
        class="send-btn"
        type="success"
        size="large"
      >
        Send
      </el-button>
    </el-col>
  </div>
</template>

<script>
import { DERESY_CONTRACT_ADDRESS } from "@/constants/contractConstants";
import { getReviewFormsTotal, createRequest } from "@/services/ContractService";
import { useStore } from "vuex";
import { reactive, computed, ref, watch, onBeforeMount } from "vue";
import { ElNotification } from "element-plus";

export default {
  name: "CreateReviewRequest",
  setup() {
    const store = useStore();
    const {
      dispatch,
      state: { contractState, user },
    } = store;

    const web3 = computed(() => contractState.web3);
    const contract = computed(() => contractState.contract);
    const walletAddress = computed(() => user.walletAddress);
    const notificationTime = process.env.VUE_APP_NOTIFICATION_DURATION;

    const reviewFormsTotal = ref(0);
    const contractRef = ref(contract);

    const requestObject = reactive({
      name: "",
      reviewFormIndex: "",
      targets: [],
      targetHashes: [],
      reviewers: [],
      requestHash: "",
      rewardPerReview: "",
    });

    const addReviewer = () => {
      requestObject.reviewers.push("");
    };

    const addTarget = () => {
      requestObject.targets.push("");
      requestObject.targetHashes.push("");
    };

    const deleteReviewer = (index) => {
      console.log[index];
    };

    const deleteTarget = (index) => {
      console.log[index];
    };

    const sendBtn = async () => {
      dispatch("setLoading", true);
      const rewardPerReviewToWei = web3.value.utils.toWei(
        requestObject.rewardPerReview.toString(),
        "ether"
      );
      const totalReward =
        rewardPerReviewToWei *
        requestObject.reviewers.length *
        requestObject.targets.length;
      const payload = {
        name: requestObject.name,
        reviewFormIndex: requestObject.reviewFormIndex,
        targets: requestObject.targets,
        targetHashes: requestObject.targetHashes,
        reviewers: requestObject.reviewers,
        requestHash: requestObject.requestHash,
        rewardPerReview: rewardPerReviewToWei,
        totalReward: totalReward,
        contractAddress: DERESY_CONTRACT_ADDRESS,
        walletAddress: walletAddress.value,
      };

      try {
        await createRequest(web3.value, contract.value, payload);

        ElNotification({
          title: "Success",
          message: "Successful transaction.",
          type: "success",
          duration: notificationTime,
        });
      } catch (e) {
        if (e.code === 4001) {
          ElNotification({
            title: "Error",
            message: "Transaction cancelled.",
            type: "error",
            duration: notificationTime,
          });
        } else if (e.code === -32603) {
          ElNotification({
            title: "Error",
            message: "Error processing TX.",
            type: "error",
            duration: notificationTime,
          });
        } else {
          ElNotification({
            title: "Error",
            message: `Transaction failed: ${e.message}`,
            type: "error",
            duration: notificationTime,
          });
        }
      }
      dispatch("setLoading", false);
    };

    onBeforeMount(async () => {
      requestObject.reviewers.push("");
      requestObject.targets.push("");
      requestObject.targetHashes.push("");

      if (contractRef.value) {
        const payload = {
          contractMethods: contract.value.methods,
        };
        reviewFormsTotal.value = await getReviewFormsTotal(payload);
      }
    });

    watch([contractRef], async () => {
      if (contractRef.value) {
        const payload = {
          contractMethods: contract.value.methods,
        };
        reviewFormsTotal.value = await getReviewFormsTotal(payload);
      }
    });

    return {
      requestObject,
      reviewFormsTotal,
      addReviewer,
      addTarget,
      deleteReviewer,
      deleteTarget,
      sendBtn,
    };
  },
};
</script>

<style scoped>
.form-container {
  padding: 2% 5%;
}

.add-btn {
  margin: 0px 0px 15px 0px;
  float: left;
}
.send-btn {
  margin: 10px 0px;
  float: left;
}
</style>
