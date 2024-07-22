export interface Dashboard {
  statisticTable: null | DashboardListStatistic[]
  setStatisticTable(statisticTable: DashboardListStatistic[] | null): void
  statisticsCard: DashboardListStatisticCards | null
  setStatisticsCard(val: DashboardListStatisticCards | null): void
}

export interface DashboardListStatistic {
  firstName: string
  lastName: string
  categoryName: string
  correctAnswers: number
}

export interface DashboardListStatisticCards {
  categoryCount: number
  questionCount: number
  userCount: number
  resultCount: number
}