// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qq:'331549523',
    wechat:'Ann241',
    weibo:'Vimalakirti20'
  },

  //获取小程序码
  previewImages(e) {
   
    wx.previewImage({
      urls: ['https://raw.githubusercontent.com/Vimalate/guoyu-weather/master/img/guoyu.jpg'],
      success: function (res) { },
      fail: function (res) {
        console.error('previewImage fail: ', res)
      }
    })
  },

  onShareAppMessage(res){
    console.log(res)
    if(res.from==='button'){
      console.log('share')
    }
    return{
      title:'天气小程序',
      path:'pages/index/index',
      imageUrl: '../../img/heartbeat.png'
    }
   
  },

  //复制联系方式
  copy(e){
    console.log(e)
    let dataset = e.currentTarget.dataset||{}
    let name=dataset.name||''
    let content=dataset.content||''
    wx.setClipboardData({
      data: content,
      success(){
        wx.showToast({
          title: '复制成功',
          duration:2000,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})