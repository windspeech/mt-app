<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect" />
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    data() {
      return {
        province: [],
        pvalue: '',
        city: [],
        cvalue: '',
        input: '',
        cities: []
      }
    },
    watch: {
      pvalue: async function(n) {
        let {
          status,
          data: {
            city
          }
        } = await this.$axios.get(`/geo/getProvince/${n}`)
        if (status === 200) {
          this.city = city.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.cvalue = ''
        }
      }
    },
    mounted: async function() {
      let {
        status,
        data: {
          province
        }
      } = await this.$axios.get(`/geo/getProvince`)
      if (status === 200) {
        this.province = province.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    methods: {
      querySearchAsync: _.debounce(async function(query, cb) {
        if (this.cities.length) {
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          let {
            status,
            data: {
              city
            }
          } = await this.$axios.get(`/geo/getCity`)
          if (status === 200) {
            this.cities = city.map(item => {
              return {
                value: item.name
              }
            })
            cb(this.cities.filter(item => item.value.indexOf(query) > -1))
          } else {
            cb([])
          }
        }
      }, 200),
      handleSelect(item) {
        console.log(item.value);
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
