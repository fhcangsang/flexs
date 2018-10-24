// pages/lesson/lesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'https://itfun.tv/api/v1/calendar',
      method: 'GET',
      success: ((res) => {
        // console.log(res.data.courses)
        this.setData({
          lesson: res.data.courses
        })
      })
    })
  }
})