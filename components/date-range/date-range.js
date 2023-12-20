// components/wx-date-range/wx-date-range.js
var dayjs = require('dayjs')

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    startTime: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    endTime: dayjs().format('YYYY-MM-DD'),
    minStartDate: dayjs().subtract(10, 'year').format('YYYY-MM-DD'),
    maxStartDate: dayjs().format('YYYY-MM-DD'),
    minEndDate: dayjs().subtract(10, 'year').format('YYYY-MM-DD'),
    maxEndDate: dayjs().format('YYYY-MM-DD'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    timeClick(e){
      const type = e.currentTarget.dataset.type
      
    },
 
    startDateChange(e){
      if(dayjs(e.detail.value).valueOf() > dayjs(this.data.endTime).valueOf()){
        this.setData({
          endTime: e.detail.value,
        })
      }
        this.setData({
          startTime: e.detail.value,
        })
      
      
      this.confirm()
    },
    endDateChange(e){
      if(dayjs(e.detail.value).valueOf() < dayjs(this.data.startTime).valueOf()){
        this.setData({
          startTime:e.detail.value
        })
      }
        this.setData({
          endTime: e.detail.value,
        })
      
      
      this.confirm()
    },
    confirm(){
      if (this.data.startTime && this.data.endTime) {
        
        this.triggerEvent('Confirm', [this.data.startTime, this.data.endTime])
        
      }
    }
  }
})