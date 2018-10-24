// pages/info/info.js
Page({
  data: {
    courses:{},
    teacher:{},
    chapters:[],
    relation_courses:[]
  },
  onLoad: function(options) {
    // console.log(options)
    let id = options.id
    wx.request({
      url: 'https://itfun.tv/api/v1/courses/' + id,
      method: 'GET',
      success: ((res)=>{        //不改成箭头函数会报错：setData of null；
        // console.log(res.data.chapters)
        this.setData({
          courses: res.data.course,
          teacher: res.data.teacher,
          chapters: res.data.chapters,
          relation_courses: res.data.relation_courses
        })
      }),
    })
  }
})