<template>
  <div>
    <div v-for="(name,value) in service" :key="value">
      <ServiceTemplate :type_name="name" :type_value="value"></ServiceTemplate>
    </div>
  </div>

</template>

<script>
import ServiceTemplate from "@/components/developer/ServiceTemplate";
export default {
  name: "ServiceTable",
  components:{
    ServiceTemplate
  },
  data(){
    return{
      //怪事，用（name，value）遍历这个字典时，name显示的是后面的字眼，value显示的是冒号前面的字眼
      service:{"test":"测试","validate":"验证","analyse":"分析"},
    }
  }
}
</script>

<style scoped>

</style>