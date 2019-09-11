// miniprogram/pages/binduser/bindUser.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      account_:"9999999",
      password_:"8888888",
      isLoading:false,
  },

  bindAcccent:function(e){
      this.setData({
        account_: e.detail.detail.value
      })
  },
  bindpassword:function(e){
    this.setData({
      password_: e.detail.detail.value
    })
  },

  //绑定
  handleClick:function(e){
    if (this.data.account_ == "" || this.data.password_ == "") {
      $Toast({
        content: '账号密码不能为空',
        type: 'warning'
      });
      return
    }
    this.setData({isLoading:true})
    console.log(this.data.account_ + "=======================" + this.data.password_)
    var gdata = getApp().globalData
    gdata.userInfo.account=this.data.account_
    gdata.userInfo.password=this.data.password_
    console.log(gdata.userInfo)
    var info=gdata.userInfo
    info.equipment={"imei":[]}
    console.log("info====================")
    console.log(info)
    //请求云函数绑定用户
    wx.cloud.callFunction({
      name: 'binduser',
      data: info,
      success: res => {
        console.log("成功==============")
        this.setData({
          isLoading:false
        })
        $Toast({
          content: res.result.msg,
          type: 'success'
        });

      }
      ,
      fail: err=>{
        this.setData({
          isLoading: false
        })
        $Toast({
          content: res.result.msg,
          type: 'fail'
        });
        console.log("失败==============")
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