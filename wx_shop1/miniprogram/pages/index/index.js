//index.js
Page({
  data: {
    token:0,
    category:[],
    cate_products:[],
    cate_product:[],
    idx:0,
    carts_class:false,
    cover_class:false,
    cart_nums:{},
    carts:[],
    count:{}
  },
  onLoad: function () {
    wx.login({
      success: ((res)=>{
        // console.log(res)
        wx.request({
          url: 'https://canteen.canon4ever.com/api/auth',
          method: 'POST',
          data:{
            code: res.code
            },
          success: ((res)=>{
            // console.log(res)
            this.setData({
              token: "Bearer" + res.data.token,
            })
            this.initcategry()
            this.initcart()
          })
        })
      })
    })
  },
  //获取物品分类和信息；
  initcategry:function(){
    wx.request({
      url: 'https://canteen.canon4ever.com/api',
      header: {
        "Authorization":this.data.token
      },
      method: 'GET',
      success: (res)=>{
        // console.log(res.data.data)
        let products = res.data.data.map(function(event){
          return event.products
        })
        let name = res.data.data.map(function (event) {
          return event.name
        })
        // console.log(products)
        this.setData({
          category: name,
          cate_products: products,
          cate_product: products[this.data.idx]
        })
      }
    })
  },
  //获取购物车信息；
  initcart:function(){
    wx.request({
      url: 'https://canteen.canon4ever.com/api/cart',
      header: {
        "Authorization": this.data.token
      },
      method: 'GET',
      success: (res)=>{
        // console.log(res.data.data)
        this.setData({
          carts: res.data.data.carts,
          cart_nums: res.data.data.cart_nums,
          count: res.data.data.count
        })
      }
    })
  },
  //选项卡点击事件；
  floor1:function(e){
    // console.log(e.target.dataset.index)
    this.setData({
      idx: e.target.dataset.index,
    })
    this.setData({
      cate_product: this.data.cate_products[this.data.idx]
    })
  },
  //显示购物车；
  cart_icon:function(){
    this.setData({
      carts_class: true,
      cover_class: true
    })
  },
  //遮盖层点击隐藏购物车；
  cover_click:function(){
    this.setData({
      carts_class: false,
      cover_class: false
    })
  },
  //点击向购物车增加商品；
  product_li:function(res){
    // console.log(res.currentTarget.dataset.id)
    wx.request({
      url: 'https://canteen.canon4ever.com/api/cart',
      data: {product_id:res.currentTarget.dataset.id},
      header: {
        "Authorization": this.data.token
      },
      method: 'POST',
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          carts: res.data.data.carts,
          cart_nums: res.data.data.cart_nums,
          count: res.data.data.count
        })
      }
    })
  },
  //删除购物车；
  cart_delete:function(){
    wx.request({
      url: 'https://canteen.canon4ever.com/api/cart/clear_cart',
      header: {
        "Authorization": this.data.token
      },
      method: 'DELETE',
      success: (res)=>{
        this.setData({
          carts: [],
          cart_nums:[],
          count: {
            num:0,
            total_price:0
          }
        })
      }
    })
  },
  //改变购物车数量；
  change_num:function(res){
    // console.log(res.currentTarget.dataset)
    let cart_id = res.currentTarget.dataset.id
    let type = res.currentTarget.dataset.type
    wx.request({
      url: 'https://canteen.canon4ever.com/api/cart',
      data: {
        cart_id:cart_id,
        type:type
      },
      header: {
        "Authorization": this.data.token
      },
      method: 'PUT',
      success: (res)=>{
        this.initcart()
      }
    })
  },
  //扫码；
  saoma:function(){
    wx.scanCode({
      onlyFromCamera: true,     //是否只能摄像头扫码不能从相册选；
      scanType: [],             //支持扫码类型（默认一维码二维码都行）
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
