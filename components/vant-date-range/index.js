// components/date-range/date-range.js
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
    show: false,
    currentDate: null,
    minDate: dayjs().subtract(10, 'year').valueOf(),
    maxDate: dayjs().valueOf(),
    type: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    timeClick(event) {
      var type = event.currentTarget.dataset.params
      this.setData({
        "type": type,
        "show": true,
      })
      if (type === 'start') {
        this.setData({
          "currentDate": dayjs(this.data.startTime).valueOf(),
          "minDate": dayjs().subtract(10, 'year').valueOf()
        })
        if (this.data.endTime) {

          this.setData({
            "maxDate": dayjs(this.data.endTime).valueOf()
          })
        }
      } else {

        this.setData({
          "currentDate": dayjs(this.data.endTime).valueOf()
        })

        if (this.data.startTime) {
          this.setData({
            "minDate": dayjs(this.data.startTime).valueOf()
          })
        }
      }
      this.triggerEvent("beforeEnter")
    },
    confirm(event) {
      const val = event.detail
      
      if (this.data.type === 'start') {
        this.setData({
          startTime: dayjs(val).format('YYYY-MM-DD'),
        })
        console.log()

      } else if (this.data.type === 'end') {
        this.setData({
          endTime : dayjs(val).format('YYYY-MM-DD'),
        })

      }
      if (this.data.startTime && this.data.endTime) {
        // this.triggerEvent('Confirm', [this.data.startTime, this.data.endTime])
        this.triggerEvent('Confirm', {startTime:this.data.startTime, endTime:this.data.endTime})
      }
      this.cancel()
    },
    cancel() {
      this.triggerEvent('cancel')
      this.setData({
        show: false,
        currentDate: null,
        minDate:  dayjs().subtract(10, 'year').valueOf(),
        maxDate:  dayjs().valueOf(),
        type: ''
      })

    },
    crossClick() {
    
      // this.$emit('dateClear', [])
    },
    afterLeave(){
      this.triggerEvent("afterLeave")
    }
  }
})