// pages/my/my.js
Page({
  data: {
    user:""
  },
  onLoad: function (options) {
    let access_token = wx.getStorageSync("access_token")
    let token_type = wx.getStorageSync("token_type")
    if(access_token){
      wx.request({
        url: 'https://itfun.tv/api/v1/users/me?access_token=' + access_token,
        method: 'GET',
        success: ((res)=>{
          // console.log(res.data.user)
          this.setData({
            user:res.data.user
          })
        }),
      })
    }else{
      wx.redirectTo({
        url: '../login/login',
        success: function(res) {}
      })
    }
  }
})