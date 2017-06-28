/**
 * @file api 每天咨询
 */
import { dspAjax as ajax } from '@/utils/ajax'

/**
 * 1.1 转换用户咨询记录 集合
 * @param { Content: string } models
 */
const convertConsults = (models = []) => {
  let result = []
  models.forEach(function (item) {
    result.push({
      IsDoctorReply: item.IsDoctorReply,
      Content: item.Content,
      CommitOn: item.CommitOn,
      PhotoUrl: item.PhotoUrl
    })
  })
  return result
}

export default {
  /**
   * 1. 获取用户咨询记录
   * @param { customId: number, lastId: number }
   */
  getConsults({ customId, lastId = 0 }) {
    return ajax.get(`HealthConsult/Records/${customId}/${lastId}`).then(convertConsults)
  },
  /**
   * 2. 发送聊天记录
   * @param { ReplyContent: string }
   */
  sendMessage(params) {
    return ajax.post(`HealthConsult/AddDoctorReply`, params)
  }
}
