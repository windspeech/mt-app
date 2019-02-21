import Router from 'koa-router'
import axios from './utils/axios'
import sign from './utils/sign'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'

let router = new Router({
  prefix: '/geo'
})

const onlineBaseURL = 'http://cp-tools.cn/geo'

// 获取位置
router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`${onlineBaseURL}/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 省份
router.get('/getProvince', async (ctx) => {
  // 本地数据库查
  // let province = await Province.find()
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  // 线上
  let {
    status,
    data: {
      province
    }
  } = await axios.get(`${onlineBaseURL}/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})
// 根据省份id获取城市
router.get('/getProvince/:id', async (ctx) => {
  // local
  let city = await City.findOne({
    id: ctx.params.id
  })
  ctx.body = {
    code: 0,
    city: city ? city.value.map(item => {
      return {
        province: item.province,
        name: item.name,
        id: item.id
      }
    }) : []
  }
  // online
  // let {
  //   status,
  //   data: {
  //     city
  //   }
  // } = await axios.get(`${onlineBaseURL}/province/${ctx.params.id}?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     city: []
  //   }
  // }
})

// 获取所有市
router.get('/getCity', async (ctx) => {
  // 本地获取
  let city = []
  let result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        id: item.id,
        province: item.province,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
      }
    })
  }
  // 线上
  // let {
  //   status,
  //   data: {
  //     city
  //   }
  // } = await axios.get(`${onlineBaseURL}/city?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     city: []
  //   }
  // }
})

router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {
    status,
    data: {
      hots
    }
  } = await axios.get(`${onlineBaseURL}/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

// 菜单
router.get('/menu', async (ctx) => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  const {
    status,
    data: {
      menu
    }
  } = await axios.get(`${onlineBaseURL}/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

export default router
