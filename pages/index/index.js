var bmap = require('../../lib/bmap-wx.js');
let utils = require('../../utils/util');
let globalData = getApp().globalData;
let SYSTEMINFO = globalData.systeminfo;
const key = globalData.key
let message = require('../../message/messages.js');
Page({
  data: {
    cityWeather: {},
    message: '',
    lyrics:'',
    // 用来清空 input
    searchValue: '',
    setting:{},//设置选项
    icons: ['/img/clothing.png', '/img/carwashing.png', '/img/pill.png', '/img/running.png', '/img/sun.png'],
  },
  onLoad: function() {
    


  },
  
  onShow: function() {
    this.getCitytWeather()
    this.init({})
    this.initSet({})
    // console.log()
    this.setData({
      message: message.messages(),
      lyrics: message.lyrics()
    })
  },
  calcPM(value) {
    if (value > 0 && value <= 50) {
      return {
        val: value,
        desc: '优',
        detail: '',
      }
    } else if (value > 50 && value <= 100) {
      return {
        val: value,
        desc: '良',
        detail: '',
      }
    } else if (value > 100 && value <= 150) {
      return {
        val: value,
        desc: '轻度污染',
        detail: '对敏感人群不健康',
      }
    } else if (value > 150 && value <= 200) {
      return {
        val: value,
        desc: '中度污染',
        detail: '不健康',
      }
    } else if (value > 200 && value <= 300) {
      return {
        val: value,
        desc: '重度污染',
        detail: '非常不健康',
      }
    } else if (value > 300 && value <= 500) {
      return {
        val: value,
        desc: '严重污染',
        detail: '有毒物',
      }
    } else if (value > 500) {
      return {
        val: value,
        desc: '爆表',
        detail: '能出来的都是条汉子',
      }
    }
  },
  //初始化设置
  initSet(){
    wx.getStorage({
      key: 'setting',
      success: (res)=> {
        console.log(res)
        let setting=res.data||{}
        this.setData({
          setting,
        })
        
        // successFunc && successFunc(setting)
      },
      fail: () => {
        this.setData({
          setting: {},
        })
      },
    })
  },



  //搜索栏天气搜索完成
  commitSearch(res) {
    // console.log(res.detail.value)
    let val = ((res.detail || {}).value || '').trim()
    this.search(val)
  },
  search(val) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
    if (val) {
      // this.geocoder(val, (loc) => {
      //   this.init({
      //     location: `${loc.lng},${loc.lat}`
      //   })
      // })
      this.getWeather(val)
      this.getHourly(val)
    }
  },
  //清空搜索栏
  clearInput() {
    this.setData({
      searchValue: '',
    })
  },

  //经纬度解码
  geocoder(address, success) {
    wx.request({
      url: getApp().setGeocoderUrl(address),
      success(res) {
        let data = res.data || {}
        if (!data.status) {
          let location = (data.result || {}).location || {}
          // location = {lng, lat}
          success && success(location)
          console.log(location)
        } else {
          wx.showToast({
            title: data.msg || '网络不给力，请稍后再试',
            icon: 'none',
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg || '网络不给力，请稍后再试',
          icon: 'none',
        })
      },
      complete: () => {
        this.setData({
          searchValue: '',
        })
      },
    })
  },

  //初始加载天气数据
  init(params) {
    // let BMap = new bmap.BMapWX({
    //   ak: globalData.ak,
    // })
    // BMap.weather({
    //   location: params.location,
    //   fail: this.fail,
    //   success: this.success,
    // })
    wx.getLocation({
      success: (res) => {
        this.getWeather(`${res.latitude},${res.longitude}`)
        this.getHourly(`${res.latitude},${res.longitude}`)
        // callback && callback()
      },
      fail: (res) => {
        this.fail(res)
      }
    })
  },

  getWeather(location) {
    wx.request({
      url: `${globalData.requestUrl.weather}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)
          let data = res.data.HeWeather6[0]

          if (data.status === 'ok') {
            this.clearInput()
            this.success(data, location)
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  getHourly(location) {
    wx.request({
      url: `${globalData.requestUrl.hourly}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.setData({
              hourlyDatas: data.hourly || []
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },

  success(data,location) {
    this.setData({
      searchCity:location
    })
    // console.log(data)
    let now = new Date()
    console.log(now)
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm");
    // let weather = data.originalData.results[0] || {}
    // data.pm = this.calcPM(weather['pm25'])
    // // 实时天气
    // data.temperature = `${weather.weather_data[0].date.match(/\d+/g)[2]}`
    wx.setStorage({
      key: 'cityWeather',
      data,
    });
    this.setData({
      cityWeather: data,
    })
  },
  // //获取地址失败的回调
  fail(res) {
    wx.stopPullDownRefresh()
    console.log(res)
    let errMsg = res.errMsg || ''
    //拒绝开启位置授权
    if (errMsg.indexOf('deny') !== -1) {
      wx.showToast({
        title: '不开启位置怎么玩',
        icon: 'none',
        duration: 2500,
        success:(res)=> {
          console.log("ok")
          wx.navigateTo({
            url: '../openSet/openSet',
          })
         
        },
      })
    } else {
      wx.showToast({
        title: '没网啦，快交网费去',
      })
    }
  },

  //设置
  setting(){
    wx.navigateTo({
      url:'../set/set'
    })
  },

  about(){
    wx.navigateTo({
      url: '../about/about'
    })
  },

  //右上角分享
  //右上角转发
  onShareAppMessage(res) {
    return {
      title: '过雨天气',
      path: '/pages/index/index',
      imageUrl: '../../img/yu.jpg'
    }
  },

  //下拉刷新
  onPullDownRefresh(res) {
    this.init({})
    console.log("hah")
  },
  getCitytWeather() {
    let cityWeather = wx.getStorage({
      key: 'cityWeather',
      success: res => {
        console.log(res)
        this.setData({
          cityWeather: res.data
        })
      },
    });
  },






})