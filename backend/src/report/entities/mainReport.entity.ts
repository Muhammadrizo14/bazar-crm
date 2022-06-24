import * as _ from "lodash";

export class MainReportEntity {
  from: Date
  to: Date

  static fromRequest(dto: MainReportEntity, organization_id: number) {
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
        }
        where.AND.push(item)
      }
    })
    where['organization_id'] = organization_id
    return where
  }
}
