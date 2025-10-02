import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { IconFlask, IconTrendingUp, IconTrendingDown, IconClock } from '@tabler/icons-react'
import { Laboratory } from '@/entities/Laboratory'
import { t } from 'i18next'

interface LaboratoryDashboardProps {
  laboratoryData: Laboratory[]
}

export function LaboratoryDashboard({ laboratoryData }: LaboratoryDashboardProps) {
  const totalExams = laboratoryData.length
  const activeExams = laboratoryData.filter(exam => exam.status === 'Active').length
  const totalRevenue = laboratoryData.reduce((sum, exam) => sum + exam.price, 0)
  const avgPrice = totalRevenue / totalExams
  const avgDuration = laboratoryData.reduce((sum, exam) => sum + exam.duration, 0) / totalExams
  const avgDeliveryTime = laboratoryData.reduce((sum, exam) => sum + exam.deliveryTime, 0) / totalExams

  // Agrupar por categoria
  const examsByCategory = laboratoryData.reduce((acc, exam) => {
    acc[exam.category] = (acc[exam.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Agrupar por tipo
  const examsByType = laboratoryData.reduce((acc, exam) => {
    acc[exam.type] = (acc[exam.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('Pages.Laboratory.TotalExams')}
            </CardTitle>
            <IconFlask className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
            <p className="text-xs text-muted-foreground">
              {activeExams} {t('Pages.Laboratory.Status.Active')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('Pages.Laboratory.AvgPricePerExam')}
            </CardTitle>
            <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {avgPrice.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total: R$ {totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tempo Médio
            </CardTitle>
            <IconClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDuration.toFixed(0)} min</div>
            <p className="text-xs text-muted-foreground">
              Duração média por exame
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('Pages.Laboratory.AvgDeliveryTime')}
            </CardTitle>
            <IconTrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDeliveryTime.toFixed(0)}h</div>
            <p className="text-xs text-muted-foreground">
              Tempo médio de entrega
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e distribuições */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Exames por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Pages.Laboratory.ExamsByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(examsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {t(`Pages.Laboratory.Categories.${category}`)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {count} exames
                    </span>
                  </div>
                  <div className="w-20">
                    <Progress value={(count / totalExams) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exames por Tipo */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Pages.Laboratory.ExamsByType')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(examsByType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {t(`Pages.Laboratory.Type.${type}`)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {count} exames
                    </span>
                  </div>
                  <div className="w-20">
                    <Progress value={(count / totalExams) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista dos exames mais caros */}
      <Card>
        <CardHeader>
          <CardTitle>Exames com Maior Valor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {laboratoryData
              .sort((a, b) => b.price - a.price)
              .slice(0, 5)
              .map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <p className="font-medium">{exam.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t(`Pages.Laboratory.Categories.${exam.category}`)} • {t(`Pages.Laboratory.Type.${exam.type}`)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {exam.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{exam.duration} min</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 