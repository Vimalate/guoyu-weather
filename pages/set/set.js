// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting:{},
    screenBrightness:0
  },
  //获取页面初始屏幕亮度
  getScreenBrightness() {
    wx.getScreenBrightness({
      success: (res) => {
        console.log('screenBrightness')
        this.setData({
          screenBrightness: Number(res.value * 100).toFixed(0),
        })
      },
      fail: (res) => {
        this.setData({
          screenBrightness: '获取失败',
        })
      },
    })
  },
  //设置屏幕亮度
  setScreenBrightness(val) {
    wx.setScreenBrightness({
      value: val / 100,
      success: (res) => {
        this.setData({
          screenBrightness: val,
        })
      },
    })
  },
  screenBrightnessChanging(e) {
    this.setScreenBrightness(e.detail.value)
  },
  //初始化设置
  initStorage(e){
    let that=this
    let dataType=e.currentTarget.dataset.type
    console.log(dataType)
    if(dataType==='setting'){
      wx.showModal({
        title: '切了货',
        content: '确定初始化设置',
        cancelText:'不了不了',
        confirmColor:'#87CEFA',
        success:(res=>{
          if(res.confirm){
            wx.removeStorage({
              key: 'setting',
              success:(res)=> {
                wx.showToast({
                  title: '设置初始化成功',
                })
                that.setData({
                  setting:{},
                })
              },
            })
          }
        })
      })
    } else if (dataType ==='cache'){
        wx.showModal({
          title: '切了货',
          content: '确定清除缓存',
          cancelText: '不了不了',
          confirmColor: '#87CEFA',
          success: (res)=> {
            wx.clearStorage({
              success:res=>{
                wx.showToast({
                  title: '清除成功',
                });
              }
            })
          },
          
        })
    }
  },

  switchChange(data){
    console.log(data)
    let dataset = data.currentTarget.dataset
    let switchparam = dataset.switchparam
    console.log(dataset)
    let setting=this.data.setting
    setting[switchparam]=!(data.detail||{}).value
    console.log(setting[switchparam])
    this.setData({
      setting,
    })
    wx.setStorage({
      key: 'setting',
      data: setting,
    })
  },

  //右上角转发
  onShareAppMessage(res){
    return{
      title:'过雨天气',
      path:'/pages/index/index',
      imageUrl:'../../img/yu.jpg'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
    this.getScreenBrightness()
    wx.getStorage({
      key: 'setting',
      success: (res) => {
        let setting = res.data
        console.log('succes')
        this.setData({
          setting,
        })
      },
      fail: (res) => {
        console.log('fail')
        this.setData({
          setting: {},
        })
      },
    })
  }
  

})