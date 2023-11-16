import { ElNotification } from "element-plus";

export default {
  setLoading({ commit }, loading) {
    commit("SET_LOADING", loading);
  },
  showVersionNotification() {
    const baseUrl = "https://gitcoinreviews.co/";

    ElNotification({
      title: "Notification",
      message: `
      <div class="full-width-clickable" 
           style="width: 100%; height: 100%; cursor: pointer;"
           onClick="window.open('${baseUrl}', '_blank');">
        Click here to visit GitcoinReviews v2
      </div>`,
      type: "info",
      dangerouslyUseHTMLString: true,
      duration: 0,
    });
  },
};
