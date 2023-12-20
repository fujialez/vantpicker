// pages/indexDetail.js

var dayjs = require('dayjs')

Component({

  /**
   * 页面的初始数据
   */
  data: {
    goldForm: {
      searchTime: [],
      warehouseId: ''
    },
    name:'',
    show:false,
    detailData: [],
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    }
  },

  methods: {
    timeClick() {
     
      this.setData({
        "show": true,
      })
    },
    returnClick(){
      wx.switchTab({
        url:'/pages/index/index'
      })
    },
   
    
    confirm(e) {
     
    
      this.setData({
        show:false
      })
  
    },
  
    cancel(){
      this.setData({
        show:false
      })
    },
  
  }


})

