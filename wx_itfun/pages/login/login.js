// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:1,
    current:0
  },
  login:function(res){
    // console.log(res.detail.value)
    const data = {
      grant_type: "password",
      client_id: "c60de69e571fae852bea53e347a2be36503ebba84247a054cb7eb6549d161ac9",
      client_secret: "d8491d666ee8749bc348eb25035ed0195dbd6cff586327ba9304013eb0d92734",
      username: res.detail.value.username,
      password: res.detail.value.password
    }
    wx.request({
      url: 'https://itfun.tv/oauth/token',
      data: data,
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        // console.log(res.data)
        wx.setStorageSync("token_type",res.data.token_type)
        wx.setStorageSync("access_token", res.data.access_token)
        wx.switchTab({
          url: '../index/index',
          success: function(res) {
            // console.log(res)
          },
        })
      }
    })
  },
  click_registered:function(){
    this.setData({
      select:1,
      current:0
    })
  },
  click_login:function(){
    this.setData({
      select: 0,
      current:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})