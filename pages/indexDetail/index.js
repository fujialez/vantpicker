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
   

    getDetail() {
      ajax.post('/miniapp/databoard/listHistoryByWarehouseId', this.data.goldForm).then(res => {
        this.setData({
          detailData: res.data
        })
        wx.nextTick(() => {
          this.updateEcharts()
        })

      })

    },
    
    init() {
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        this.chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        this.updateEcharts(this.chart);
        
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return this.chart;
      })
      
    },
    updateEcharts(){
      var xD = []
      var sD = []
      if (Array.isArray(this.data.detailData) && this.data.detailData.length) {
        
        this.data.detailData.forEach(item => {
          xD.push(item.dataTime)
          sD.push(item.weight)
        })
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            textShadowBlur: 10, // 重点
            textShadowColor: 'transparent', // 重点
    
        },
        },
        grid: {
          left:20,
          right: 20,
          bottom: 15,
          top: 60,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xD,
          axisLabel: {
              color: '#333',
              formatter: function(value) {
                  const result = value.replace(/(.{10})/g, '$1\n')
                  return result
              }
          },
          axisLine: {
              lineStyle: {
                  color: '#ccc'
              }
          }
      },
        yAxis: {
          type: 'value',
          name: '吨',
          nameTextStyle: {
            color: '#333'
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#333'
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#eee'],
              width: 1,
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'line',
            name: '重量(吨)',
            data: sD,
            symbol: 'circle',
            areaStyle: {
                color: 'rgba(80, 135, 236, 0.4)'
            },
           
            itemStyle: {
                lineStyle: {
                    color: '#188efc'
                },
                color: '#188efc'
            }
        }
        ]
      };
      this.chart && this.chart.setOption(option);
    },
    dataConfirm(e) {
      console.log(e)
      this.setData({
        "goldForm.searchTime":e.detail
      })
      // this.setData({
      //   show:false
      // })
      this.getDetail()
    },
    beforeEnter(){
      this.setData({
        show:true
      })
    },
    dataCancel(){
      this.setData({
        show:false
      })
    },
    dispose: function () {
      if (this.chart) {
        this.chart.dispose();
      }
    }



  }


})

