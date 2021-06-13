<template>
  <LoadingView :loading="loading">
    <v-md-preview :text="htmlDecode(htmlView)"></v-md-preview>
  </LoadingView>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { htmlDecode } from "@/hooks/useHTMLAnalysis";
import LoadingView from "@/components/loading.vue";
export default defineComponent({
  components: {
    LoadingView,
  },
  props: {
    htmlView: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: () => false,
    }
  },
  setup() {
    return {
      htmlDecode,
    };
  },
});
</script>

<style>
</style>