//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categories:[],
    scrollTop: 0,
    selectIndex: 1,
    toView:"",
    num: 0,
    count:{}
  },
  //事件处理函数
  onLoad: function () {
    this.login()
    this.init()
    this.cart_num()
  },
  login(){
    wx.login({
      success(res) {
        console.log(res)
      }
    })
  },
  init(){
    wx.request({
      url: 'https://canteen.holyzq.com/api/admin/categories',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res)
        this.setData({
          categories: res.data.categories
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  cart_num(){
    wx.request({
      url: 'https://canteen.holyzq.com/api/carts',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          count: res.data.count
        })
        setTimeout(()=>{
          this.cart_style()
        },0)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  selectCategory(even){
    // console.log(even.currentTarget.dataset.id)
    this.setData({
      selectIndex: even.currentTarget.dataset.id,
      toView: "id" + even.currentTarget.dataset.id
    })
  },
  scrolltoupper(even){
    // console.log(even.detail.scrollTop)
    let products = this.data.categories.map(res=>{
        return res.products.length
    })
    let scroll = []
    for (let i = 0; i < products.length; i++) {
      let b = products[i] * 76 + 11
      scroll.push(b)
    }
    for (let i = 1; i < scroll.length; i++) {
      scroll[i] = scroll[i - 1] + scroll[i]
    }
    for (let i = 0; i < scroll.length - 1; i++) {
      if (even.detail.scrollTop >= scroll[i] && even.detail.scrollTop < scroll[i+1]){
          this.setData({
            selectIndex: i + 2
          })
      }
      if (even.detail.scrollTop < scroll[0]){
        this.setData({
          selectIndex: 1
        })
      }
    }
  },
  product_add(even){
    // console.log(even.currentTarget.dataset.id)
    wx.request({
      url: 'https://canteen.holyzq.com/api/carts',
      data: { product_id: even.currentTarget.dataset.id},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res)
        this.cart_num()
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  cart_style(){
    if(this.data.count.num == 0){
     return
    }
    let num = this.data.count.num + ""
    // console.log(num)
    wx.setTabBarBadge({
      index: 2,
      text: num
    })
  }
})