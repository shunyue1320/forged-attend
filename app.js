const request = require('request')
const util = require('util')
const qs = require('querystring')
const requestPromise = util.promisify(request)

let params = {
  'courseId': 7277, //课程id
  'classId': 28249  //课类id
}

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'token': '700c1b50062b65c323bc4d82a21e59b2',  //用户token
    'terminaltype': 4                             //上课终端类型
  }
}

let attendRedressUrl = 'https://open.shiguangkey.com/api/attend/attendRedress'
let attendCollectUrl = `https://attend.shiguangkey.com/api/attend/collect?${qs.stringify(params)}`

requestPromise(options).then(res => {
  let result = JSON.parse(res.body)
  if (result.msg == 'success') {
    console.log("正在上课中", result.msg)
  } else {
    console.log("上课失败", res.body)
  }
}).catch(e => {
  console.log("上课失败");
})