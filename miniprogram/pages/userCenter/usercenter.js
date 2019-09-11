// miniprogram/pages/userCenter/usercenter.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      avatarUrl: '../../images/user-unlogin.png',
      info: {},
      logged: false,
      login_message:"请点击头像登陆...",
      welcome_isShow:'none',
      
  },

  //绑定账号
  bindAccess:function(e){
    if (!getApp().globalData.islogin){
      $Toast({
        content: '请先登陆',
        type: 'warning'
      });
      return
    }

    wx.navigateTo({
      url: '../../pages/binduser/bindUser',
    })
  },
  onGetUserInfo: function (e) {
    if (this.data.logged) 
    { 
      return;
    }
    $Toast({
      content: '登陆中...',
      type: 'loading',
      duration: 0,
      mask: false
    });
    //登陆授权
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        login_message:"Hi"+e.detail.userInfo.nickName,
        welcome_isShow:'inline',
        avatarUrl: e.detail.userInfo.avatarUrl,
        info: e.detail.userInfo
      })
      var gdata = getApp().globalData
     
      
      gdata.userInfo.weName = e.detail.userInfo.nickName     
      //获得openid
      // openid: wxContext.OPENID,
        // appid: wxContext.APPID,
        //   unionid: wxContext.UNIONID,
      //获取openid
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          gdata.userInfo.user_id=res.result.openid
          gdata.userInfo._unionid = res.result.unionid
          gdata.islogin = true
          wx.setStorage({
            key: 'userInfo',
            data: gdata.userInfo,
          })
          $Toast.hide();
          
        },
        fail: err => {
          $Toast.hide();
          $Toast({
            content: '获取opeid失败',
            type: 'error'
          });
        }
      })
      
      

    }
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                logged: true,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                welcome_isShow: 'inline',
                login_message: "Hi" + res.userInfo.nickName,
              })
            }
          })
        }
      }
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