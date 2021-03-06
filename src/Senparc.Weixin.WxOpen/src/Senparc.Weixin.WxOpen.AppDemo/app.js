//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          //换取openid & session_key
          wx.request({
            url: 'https://zs.sasu.edu.cn/WxOpen/OnLogin',
            method: 'POST',
            data: {
              code: res.code
            },
            success:function(json){
              var result = json.data;
              if(result.success)
              {
                wx.setStorageSync('sessionId', result.sessionId);

                //获取userInfo并校验
                wx.getUserInfo({
                  success: function (userInfoRes) {
                    console.log('get userinfo',userInfoRes);
                    that.globalData.userInfo = userInfoRes.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)

                    //校验
                    wx.request({
                      url: 'https://zs.sasu.edu.cn/WxOpen/CheckWxOpenSignature',
                      method: 'POST',
                      data: {
                        sessionId: wx.getStorageSync('sessionId'),
                        rawData:userInfoRes.rawData,
                        signature:userInfoRes.signature
                      },
                      success:function(json){
                        console.log(json.data);
                      }
                    });

                    //解密数据（建议放到校验success回调函数中，此处仅为演示）
                    wx.request({
                      url: 'https://zs.sasu.edu.cn/WxOpen/DecodeEncryptedData',
                      method: 'POST',
                      data: {
                        'type':"userInfo",
                        sessionId: wx.getStorageSync('sessionId'),
                        encryptedData:userInfoRes.encryptedData,
                        iv:userInfoRes.iv
                      },
                      success:function(json){
                        console.log(json.data);
                      }
                    });
                  }
                })
        }else{
          console.log('储存session失败！',json);
        }
      }
    })
  }
})
    }
  },
  globalData:{
    userInfo:null
  }
})