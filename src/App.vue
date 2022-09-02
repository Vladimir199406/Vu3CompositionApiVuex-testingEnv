<template>
  <div class="container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold">
      testing setup env comp api ts vuex
    </h1>
    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading</h3>
    </div>
    <div v-else>
      <p class="has-text-centered mt-2">
        {{ completedCount }} of {{ totalCount }} completed.
      </p>
      <TaskList />
    </div>
  </div>
</template>
<script lang="ts">
/*
 imports
*/
import { computed, defineComponent, onMounted } from "vue";
import TaskList from "./components/TaskList.vue";
import { useStore } from "./store";
import { ActionTypes } from "./store/actions";

export default defineComponent({
  components: { TaskList },
  setup() {
    /*
      data
    */
    const store = useStore();

    /*
     computed
    */
    const loading = computed(() => store.state.loading);
    const completedCount = computed(() => store.getters.completedTaskCount);
    const totalCount = computed(() => store.getters.totalTaskCount);

    /*
     hooks
    */
    onMounted(() => store.dispatch(ActionTypes.GetTaskItems));

    return { loading, completedCount, totalCount };
  },
});
</script>
<style>
@import "~bulma/css/bulma.css";
</style>
