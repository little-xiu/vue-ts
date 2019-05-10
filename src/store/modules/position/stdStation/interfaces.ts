export interface stdStationListPayLoad {
  buId?: string,
  page: number,
  effDate: string | Date,
  list: object,
}

export interface StateConfig {
  stdStationList: object,
}