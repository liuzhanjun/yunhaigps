// miniprogram/pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图片
    loop_img_url: ['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'cloud://yunhaiwulianwnag-db-buefj.7975-yunhaiwulianwnag-db-buefj/lufei.jpg'],
      // 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得用户的openId
    

  },
  toServicenter:function(e) {
    wx.navigateTo({
      url: '../../pages/servicenter/servicenter',
    })
  },
  //跳转到支付页面
  toPayPage:function(e){
    wx.navigateTo({
      url: '../../pages/paylist/paylist',
    })
  },
  //跳转到个人中心
  toUserCenter:function(e){
    wx.navigateTo({
      url: '../../pages/userCenter/usercenter',
    })

  },
  //跳转自主查询页面
  toQuery:function(e){
    wx.navigateTo({
      url: '../../pages/index/index',
    })
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