<template>
  <div>
    <TaskTable :task-type=1 :user-i-d="this.$route.params.id"></TaskTable>
    <TaskTable :task-type=2 :user-i-d="this.$route.params.id"></TaskTable>
    <TaskTable :task-type=3 :user-i-d="this.$route.params.id"></TaskTable>
    <TaskTable :task-type=4 :user-i-d="this.$route.params.id"></TaskTable>
  </div>

</template>

<script>
import TaskTable from "@/components/administrator/task/TaskTable";
export default {
  name: "TaskMenu",
  data(){
    return {
      //这里和我4.28的定义有出入，正确的应该是：
      //1：等待中
      //2：运行中
      //3：已完成
      //4：已终止
      //1表示等待运行
      //2表示运行完成
      //3表示运行结束
      taskType:1,
    }
  },
  components:{
    TaskTable,
  }
}
</script>

<style scoped>

</style>