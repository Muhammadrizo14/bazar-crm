import * as _ from "lodash";

export class MainReportEntity {
  from: Date
  to: Date
  roleId: number
  user_id: number

  static fromRequest(dto: MainReportEntity) {
    const where = {AND: []}
    _.forEach(dto, (value, key) => {
      if (value) {
        let item = new Object({})
        switch (key) {
          case 'from': {
            item['createdAt'] = {gt: new Date(value)}
            break
          }
          case 'to': {
            item['createdAt'] = {lt: new Date(value)}
            break
          }
          case 'user_id': {
            item['user_id'] = {equals: value}
            break
          }
        }
        where.AND.push(item)
      }
    })
    return where
  }
}
