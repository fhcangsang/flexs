// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    count: {},
    refresh:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
    wx.setNavigationBarTitle({
      title: "购物车"
    })
  },
  init() {
    wx.request({
      url: 'https://canteen.holyzq.com/api/carts',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          carts: res.data.carts,
          count: res.data.count
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  changNum(even) {
    // console.log(even.currentTarget.dataset)
    let id = even.currentTarget.dataset.id
    let type = even.currentTarget.dataset.type
    wx.request({
      url: 'https://canteen.holyzq.com/api/carts',
      data: {
        id: id,
        type: type
      },
      header: {},
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          carts: res.data.data.carts,
          count: res.data.data.count
        })
        this.cart_style()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  cart_style() {
    if (this.data.count.num === 0) {
      wx.removeTabBarBadge({
        index: 2,
      })
    } else {
      let num = this.data.count.num + ""
      // console.log(num)
      wx.setTabBarBadge({
        index: 2,
        text: num
      })
    }
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
    this.init()
    this.setData({
      refresh:true
    })
    setTimeout(()=>{
      wx.stopPullDownRefresh({
        success:()=>{
          this.setData({
            refresh: false
          })
        }
      })
    },500)
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