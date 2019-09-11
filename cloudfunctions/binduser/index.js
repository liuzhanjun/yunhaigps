// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()


function updateData(event){
  return new Promise(function(resolve,reject){
      console.log("更新数据")
      // db.collection('user').where({user_id:event.user_id}.update({
      //   data:event
      // })
  })
}

function addData(event) {
  return new Promise(function (resolve, reject) {
    console.log("添加数据")
   db.collection('user').add({data:event})
    .then(res => {
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
    
  })
}
// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  console.log("云函数=====================================")
  console.log(event)
 //先查询用户是否存在

  db.collection('user').where({
    user_id: "xxxxxx"//event.user_id // 填入当前用户 openid
  }).count().then(res => {
    console.log(res.total)
    if(res.total==1){
        //更新数据
      return updateData(event)
    } else if (res.total == 0){
        //插入数据
      return addData(event)
    }
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
  

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}