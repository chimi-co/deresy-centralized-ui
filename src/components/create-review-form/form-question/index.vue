<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form-item label="Question">
          <el-input
            v-model="questionObject.question"
            label="Question"
            type="text"
            placeholder="Enter a question"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Type">
          <el-select
            v-model="questionObject.type"
            class="m-2"
            placeholder="Select a question type"
            @change="onTypeSelection()"
          >
            <el-option
              v-for="type in questionTypes"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col style="margin-top: 35px" :span="1">
        <el-button
          v-if="allowRemove()"
          type="danger"
          :icon="CloseBold"
          size="small"
          @click="removeQuestion()"
          circle
        ></el-button>
      </el-col>
      <FormQuestionChoice
        v-for="(choice, index) in questionObject.choicesInputs"
        v-model="questionObject.choicesInputs[index]"
        v-on:delete-choice="deleteChoice(index)"
        :key="index"
      />
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-button
          v-if="isSingleChoice"
          class="add-choice-btn"
          type="warning"
          @click="addChoice()"
        >
          Add Choice
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { CloseBold } from "@element-plus/icons";
import FormQuestionChoice from "@/components/create-review-form/form-question-choice";
import { ref, computed, getCurrentInstance } from "vue";

export default {
  name: "FormQuestion",
  components: {
    FormQuestionChoice,
  },
  emits: ["deleteQuestion", "update:modelValue"],
  props: {
    modelValue: {
      type: Object,
      default: () => ({ question: "", type: "", choicesInputs: [] }),
    },
  },
  setup(props, { emit }) {
    const questionObject = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const isSingleChoice = ref(false);
    const instance = getCurrentInstance();

    const questionTypes = [
      {
        value: "0",
        label: "Text",
      },
      {
        value: "1",
        label: "Checkbox",
      },
      {
        value: "2",
        label: "Single Choice",
      },
    ];

    const onTypeSelection = () => {
      if (questionObject.value.type == 2) {
        isSingleChoice.value = true;
        questionObject.value.choicesInputs.push("");
        questionObject.value.choicesInputs.push("");
      } else {
        isSingleChoice.value = false;
        questionObject.value.choicesInputs = [];
      }
    };

    const addChoice = () => {
      questionObject.value.choicesInputs.push("");
    };

    const deleteChoice = (index) => {
      questionObject.value.choicesInputs.splice(index, 1);
    };

    const allowRemove = () => {
      return instance.vnode.key > 0;
    };

    const removeQuestion = () => {
      emit("deleteQuestion");
    };

    return {
      CloseBold,
      questionObject,
      questionTypes,
      isSingleChoice,
      onTypeSelection,
      addChoice,
      deleteChoice,
      allowRemove,
      removeQuestion,
    };
  },
};
</script>
<style scoped>
.add-choice-btn {
  margin: 10px 0px;
  float: right;
}
</style>
