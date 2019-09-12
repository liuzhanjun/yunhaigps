// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) =>new Promise((resoleve, reject)=>
{
    const key = event.key
    const user_id_=event.user_id

    console.log("请求成功=========================")
    console.log(event)
    switch (key) {
      case 'updateDevices': {
        //更新设备信息
          updateDevices(user_id_, event.devices,resoleve,reject)
      }
    }
  }
)

//更新设备列表
function updateDevices(user_id_, devices_, resolve, reject){
  console.log("更新设备列表=============开始")
  console.log(user_id_)
  console.log(devices_)
  db.collection('user').where({
    user_id: user_id_
  }).update({
    data: {
      equipment: { 'imei': devices_ }
    }
  }).then(res => {
    console.log("设备列表更新完毕1111111111111111111111")
    resolve({ msg: '设备列表更新完毕' })
  }).catch(err => {
    reject({ msg: '设备列表更新失败' })
  })
}
