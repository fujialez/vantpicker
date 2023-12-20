// index.js
import ajax from '../../utils/ajax'
const app = getApp()
Component({
  data: {
    show: false,
    listData: {
      "online": null,
      "offline": null,
      "alarmFlag": false,
      "lineList": []
    },
    msList:[
      {
        "id": "1",
        "name": "甬台温高速公路改扩建工程TJ05标拌合站"
      }
    ],
    project:{},
   
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
 
  methods: {
    onLoad(){
     
        this.getMsList()
        
    },
    getMsList(){
      ajax.post('/miniapp/databoard/listMs').then(res=>{
        this.setData({
          msList : res.data,
          
        })
        if(Array.isArray(res.data) && res.data.length){
          this.setData({
            project:res.data[0]
          })
          this.getLineDetail(res.data[0].id)
        }
      })
    },
    getLineDetail(id){
      ajax.post('/miniapp/databoard/listWarehouseByMsId',{id}).then(res=>{
          this.setData({
            listData: res.data
          })
      })
    },
    onClose() {
     
      this.setData({ show: false });
    },
    onshow(){
      this.setData({ show: true });
    },
    onSelect(event) {
      this.setData({
        project:event.detail
      })
      this.getLineDetail(event.detail.id)
    },
  },
})
