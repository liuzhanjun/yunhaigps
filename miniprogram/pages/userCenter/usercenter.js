// miniprogram/pages/userCenter/usercenter.js
const {
  $Toast
} = require('../../dist/base/index');
var appgloba = getApp().globalData
var delete_index=-1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    info: {},
    logged: false,
    login_message: "请点击头像登陆...",
    welcome_isShow: 'none',
    devices: [],
    addVisible1: false,
    inputValue: "",
    delete_visible: false,
    toggle:false,
    delete_actions: [
      {
        name: '删除',
        color: '#ed3f14'
      }
    ]

  },

  //绑定账号
  bindAccess: function(e) {
    if (!getApp().globalData.islogin) {
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
  //取消删除
  delete_cancel:function(e){
    delete_index=-1
    this.setData({
      delete_visible:false
    })
  },
  //删除
  delete_yes:function(e){
    console.log("开始删除=================")
    console.log(delete_index)
    var devs = this.data.devices
    devs.splice(delete_index,1)
    this.setData({
      delete_visible: false,
      devices: devs,
      toggle: this.data.toggle ? false : true
    })
   
   console.log(getApp().globalData.userInfo)
  },
  //调起删除imei菜单
  deleteTap: function(e) {
    delete_index = e.currentTarget.dataset['index'];
      this.setData({
        delete_visible:true
      })
  },
  //输入imei完毕
  handleOk: function(e) {
    console.log(this.data.inputValue)
    if (this.data.inputValue != "") {
      this.data.devices.push(this.data.inputValue)
    }

    console.log("添加元素")
    console.log(this.data.devices)
    var result = this.data.devices
    this.setData({
      addVisible1: false,
      inputValue: "",
      devices: result
    })

  },
  imeiChange: function(e) {
    this.setData({
      inputValue: e.detail.detail.value
    })
  },
  //取消输入imei
  handleClose: function(e) {
    this.setData({
      addVisible1: false,
      inputValue: ""
    })
  },
  //添加设备
  addImis: function(e) {
    if (!appgloba.isbind) {
      $Toast({
        content: '请先绑定账号',
        type: 'warning'
      });
      return
    }
    this.setData({
      addVisible1: true
    })
  },
  onGetUserInfo: function(e) {
    if (this.data.logged) {
      return;
    }

    //登陆授权
    if (!this.logged && e.detail.userInfo) {
      $Toast({
        content: '登陆中...',
        type: 'loading',
        duration: 0,
        mask: false
      });
      this.setData({
        logged: true,
        login_message: "Hi" + e.detail.userInfo.nickName,
        welcome_isShow: 'inline',
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
          gdata.userInfo.user_id = res.result.openid
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
  onLoad: function(options) {






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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var imei = getApp().globalData.userInfo.equipment.imei
    console.log("======================imei")
    console.log(imei)
    this.setData({
      devices: imei
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // if (!appgloba.isbind) {
    //   wx.stopPullDownRefresh() //停止下拉刷新
    //   return
    // }
    wx.showNavigationBarLoading() //在标题栏中显示加载
      console.log('=========================')
    var devices_=this.data.devices
    var user_id_ = appgloba.userInfo.user_id
    wx.cloud.callFunction({
      name:'useroute',
      data: { key: "updateDevices", user_id: user_id_, devices: devices_}
    ,
      success:res=>{
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        console.log(res)
        $Toast({
          content: res.result.msg,
          type: 'success'
        });
      },
      fail:err=>{
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        console.log("失败==============")
        console.log(res)
        $Toast({
          content: res.result.msg,
          type: 'warning'
        });
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})