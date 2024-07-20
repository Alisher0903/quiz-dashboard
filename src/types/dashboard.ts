export interface Dashboard {
  statisticTable: null | DashboardListStatistic[]
  setStatisticTable(statisticTable: DashboardListStatistic[] | null): void
}

export interface DashboardListStatistic {
  firstName: string
  lastName: string
  categoryName: string
  correctAnswers: number
}