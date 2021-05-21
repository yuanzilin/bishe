<template>
  <div>
    <UserTable></UserTable>
    <DeveloperTable :refresh="refresh"></DeveloperTable>
    <ReviewDeveloperTable @reviewSuccess="reviewSuccess"></ReviewDeveloperTable>
  </div>
</template>

<script>
import DeveloperTable from "@/components/administrator/user/DeveloperTable";
import ReviewDeveloperTable from "@/components/administrator/user/ReviewDeveloperTable";
import UserTable from "@/components/administrator/user/UserTable";
export default {
  name: "UserMenu",
  components:{
    DeveloperTable,
    ReviewDeveloperTable,
    UserTable
  },
  data(){
    return{
      refresh:false
    }
  },
  methods:{
    reviewSuccess(){
      this.refresh=!this.refresh
    },
  }
}
</script>

<style scoped>

</style>