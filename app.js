const request = require('request')
const util = require('util')
const qs = require('querystring')
const requestPromise = util.promisify(request)

class ForgedAttend {
  constructor(options) {
    const { courseId, classId, token } = options

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
    this.attendCollect()
    this.attendRedress()
    setInterval(() => {
      if (time % 5 === 0) {
        this.attendCollect()
      }
      this.attendRedress()
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

  async request(options) {
    try {
      const result = await requestPromise(options)
      const data = JSON.parse(result.body)
      if (data.msg == 'success') {
        console.log("正在上课中....")
      } else {
        console.log("上课失败", data.msg)
      }
    } catch(e) {
      console.log("错误提示", e)
    }
  }
}


new ForgedAttend({
  'courseId': 7277,                 //你的课程id
  'classId': 28249,                 //你的课类id
  'token': '700c1b500----2a21e59b2' //你的账号token
})
