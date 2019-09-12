//app.js
App({

  globalData:{
    islogin: false,
    isbind:false,
    userInfo: {
      weName: "",
      user_id: "",
      password: "",
      equipment:
      {
        imei: ['12345612336', '2222222222', '2222585858222', '2222222222']
      },
      account: "",
      _unionid: ""
    }
  },
onShow:function(){
  //判断是否登陆
  var app=this
  wx.getStorage({

    key: 'userInfo',

    success: function (res) {

      // 异步接口在success回调才能拿到返回值

      var value1 = res.data
      app.globalData.islogin=true
      app.globalData.userInfo=value1
      console.log(value1)
    },

    fail: function () {
      app.globalData.islogin = false
      console.log('读取key1发生错误')
          //没有登陆
          console.log("\\\\\\\\\\\\\\\\\\\\=====================")
          wx.navigateTo({
            url: 'pages/userCenter/usercenter',
          })
    }

  })

  wx.getStorage({

    key: 'isbind',

    success: function (res) {

      // 异步接口在success回调才能拿到返回值

      var value1 = res.data
      app.globalData.isbind = value1
    
    },

    fail: function () {
      app.globalData.isbind=false
    }

  })
    

    

},
  
  onLaunch: function (option) {
    console.log(option)
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'liuzhanjun-yun-do44l',
        traceUser: true,
      })
    }

    

   

  }
})
