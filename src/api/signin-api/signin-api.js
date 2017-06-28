/**
 * @file api 商品推送
 */
import { MD5 } from 'crypto-js'
import { dspAjax as ajax } from '@/utils/ajax'

const convertModels = (model) => {
  return {
    account: model.Account,
    doctorId: model.Doctor_ID,
    userName: model.Name,
    userAvator: model.PhotoUrl,
    deptId: model.Dept,
    deptCode: model.DeptCode,
    deptName: model.deptName,
    position: model.Position,
    serviceType: model.ServiceType,
    serviceLimit: model.ServiceLimit
  }
}

export default {
  /**
   * 登录验证
   * @param { returnCount: 返回'1',需要数据的总条数 } params
   */
  loginValidate(account, password) {
    convertModels({ id: 1, name: 2 })
    return ajax.get(`Login/LoginValidate?strAccount=${account}&strPassword=${MD5(password)}`).then(convertModels)
  }

}
