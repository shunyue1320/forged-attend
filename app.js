const request = require('request')
const util = require('util')
const qs = require('querystring')
const requestPromise = util.promisify(request)

class ForgedAttend {
  constructor(options) {
    let { courseId, classId, token } = options

    this.params = { courseId, classId }
    this.reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
        'terminaltype': 4  //上课终端类型
      }
    }

    this.init()
  }

  init() {
    let time = 0
    this.attendRedress()
    this.attendCollect()
    setInterval(() => {
      this.attendRedress()
      if (time % 5 === 0) {
        this.attendCollect()
      }
      time++
    }, 1000 * 60)
  }

  attendRedress() {
    const options = Object.assign({}, this.reqOptions)
    options.url = 'https://open.shiguangkey.com/api/attend/attendRedress'
    this.request(options)
  }

  attendCollect() {
    const options = Object.assign({}, this.reqOptions)
    options.url = `https://attend.shiguangkey.com/api/attend/collect?${qs.stringify(this.params)}`
    this.request(options)
  }

  request(options) {
    requestPromise(options).then(res => {
      let result = JSON.parse(res.body)
      if (result.msg == 'success') {
        console.log("正在上课中....")
      } else {
        console.log("上课失败", result.msg)
      }
    }).catch(e => {
      console.log("上课失败", e);
    })
  }
}


new ForgedAttend({
  'courseId': 7277,                           //你的课程id
  'classId': 28249,                           //你的课类id
  'token': '700c1b500----2a21e59b2' //你的账号token
})
