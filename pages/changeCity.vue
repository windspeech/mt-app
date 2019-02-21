<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import iSelect from '@/components/changeCity/iSelect'
  import hot from '@/components/changeCity/hot'
  import categroy from '@/components/changeCity/categroy'
  export default {
    components: {
      iSelect,
      hot,
      categroy
    }
  }
</script>

<style scoped>

</style>