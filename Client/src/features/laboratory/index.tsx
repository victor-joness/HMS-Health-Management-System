import { useState } from 'react'
import { IconFlask, IconBuilding } from '@tabler/icons-react'
import { Laboratory, LaboratoryFacility } from '@/entities/Laboratory'
import { t } from 'i18next'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { laboratoryColumns } from './components/laboratory-columns'
import { laboratoryFacilityColumns } from './components/laboratory-facility-columns'
import { LaboratoryActionDialog } from './components/laboratory-action-dialog'
import { LaboratoryDeleteDialog } from './components/laboratory-delete-dialog'
import { LaboratoryFacilityActionDialog } from './components/laboratory-facility-action-dialog'
import { LaboratoryDashboard } from './components/laboratory-dashboard'
import { LaboratoryFilters } from './components/laboratory-filters'
import { LaboratoryContextProvider, LaboratoryDialogType } from './context/laboratory-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

            // Dados mockados para demonstração
            const mockLaboratoryData: Laboratory[] = [
              {
                id: '1',
                name: 'Hemograma Completo',
                description: 'Análise completa do sangue incluindo contagem de células vermelhas, brancas e plaquetas',
                category: 'Blood',
                type: 'Basic',
                price: 45.00,
                duration: 30,
                deliveryTime: 24,
                preparationInstructions: 'Jejum de 8 horas',
                normalValues: 'Hemoglobina: 12-16 g/dL, Leucócitos: 4.000-11.000/mm³',
                equipment: 'Contador automático de células',
                status: 'Active',
                facilityId: '1',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
              {
                id: '2',
                name: 'Glicemia em Jejum',
                description: 'Medição dos níveis de glicose no sangue em jejum',
                category: 'Blood',
                type: 'Basic',
                price: 25.00,
                duration: 15,
                deliveryTime: 4,
                preparationInstructions: 'Jejum de 12 horas',
                normalValues: '70-99 mg/dL',
                equipment: 'Analisador bioquímico',
                status: 'Active',
                facilityId: '1',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
              {
                id: '3',
                name: 'Exame de Urina Completo',
                description: 'Análise física, química e microscópica da urina',
                category: 'Urine',
                type: 'Basic',
                price: 35.00,
                duration: 45,
                deliveryTime: 12,
                preparationInstructions: 'Coleta da primeira urina da manhã',
                normalValues: 'Densidade: 1.005-1.030, pH: 4.5-8.0',
                equipment: 'Analisador de urina',
                status: 'Active',
                facilityId: '1',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
              {
                id: '4',
                name: 'Perfil Lipídico',
                description: 'Análise completa dos lipídios sanguíneos',
                category: 'Blood',
                type: 'Advanced',
                price: 65.00,
                duration: 60,
                deliveryTime: 48,
                preparationInstructions: 'Jejum de 12 horas, evitar exercícios 24h antes',
                normalValues: 'Colesterol total: <200 mg/dL, HDL: >40 mg/dL, LDL: <100 mg/dL',
                equipment: 'Analisador bioquímico especializado',
                status: 'Active',
                facilityId: '1',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
              {
                id: '5',
                name: 'Ressonância Magnética Cardíaca',
                description: 'Imagem detalhada do coração usando ressonância magnética',
                category: 'Cardiac',
                type: 'Specialized',
                price: 850.00,
                duration: 90,
                deliveryTime: 72,
                preparationInstructions: 'Jejum de 4 horas, não usar objetos metálicos',
                normalValues: 'Relatório detalhado do radiologista',
                equipment: 'Ressonância magnética 3T',
                status: 'Active',
                facilityId: '2',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
            ]

            // Dados mockados para laboratórios
            const mockFacilityData: LaboratoryFacility[] = [
              {
                id: '1',
                name: 'Laboratório Central',
                address: 'Rua das Flores, 123 - Centro',
                phone: '(11) 9999-8888',
                email: 'contato@labcentral.com.br',
                cnpj: '12.345.678/0001-90',
                specialties: ['Blood', 'Urine', 'Stool'],
                status: 'Active',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
              {
                id: '2',
                name: 'Laboratório Especializado',
                address: 'Av. Paulista, 1000 - Bela Vista',
                phone: '(11) 8888-7777',
                email: 'contato@labespecializado.com.br',
                cnpj: '98.765.432/0001-10',
                specialties: ['Cardiac', 'Neurological', 'Imaging'],
                status: 'Active',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15'),
              },
            ]

export default function LaboratoryPage() {
  const [currentRow, setCurrentRow] = useState<Laboratory | null>(null)
  const [currentFacility, setCurrentFacility] = useState<LaboratoryFacility | null>(null)
  const [open, setOpen] = useDialogState<LaboratoryDialogType>(null)
  const [facilityOpen, setFacilityOpen] = useState<'add' | 'edit' | null>(null)
  const [laboratoryData, setLaboratoryData] = useState<Laboratory[]>(mockLaboratoryData)
  const [facilityData, setFacilityData] = useState<LaboratoryFacility[]>(mockFacilityData)
  const [filters, setFilters] = useState<LaboratoryFilters>({})

  const handleSave = (laboratory: Laboratory) => {
    if (currentRow) {
      // Atualizar exame existente
      setLaboratoryData(prev => 
        prev.map(item => 
          item.id === laboratory.id ? { ...laboratory, updatedAt: new Date() } : item
        )
      )
    } else {
      // Adicionar novo exame
      const newLaboratory = {
        ...laboratory,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setLaboratoryData(prev => [...prev, newLaboratory])
    }
  }

  const handleDelete = (laboratory: Laboratory) => {
    setLaboratoryData(prev => prev.filter(item => item.id !== laboratory.id))
  }

  const handleSaveFacility = (facility: LaboratoryFacility) => {
    if (currentFacility) {
      // Atualizar laboratório existente
      setFacilityData(prev => 
        prev.map(item => 
          item.id === facility.id ? { ...facility, updatedAt: new Date() } : item
        )
      )
    } else {
      // Adicionar novo laboratório
      const newFacility = {
        ...facility,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setFacilityData(prev => [...prev, newFacility])
    }
  }

  const handleDeleteFacility = (facility: LaboratoryFacility) => {
    setFacilityData(prev => prev.filter(item => item.id !== facility.id))
  }

  const handleFiltersChange = (newFilters: LaboratoryFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
  }

                // Aplicar filtros aos dados
              const filteredData = laboratoryData.filter(exam => {
                if (filters.search && !exam.name.toLowerCase().includes(filters.search.toLowerCase())) {
                  return false
                }
                if (filters.category && exam.category !== filters.category) {
                  return false
                }
                if (filters.type && exam.type !== filters.type) {
                  return false
                }
                if (filters.status && exam.status !== filters.status) {
                  return false
                }
                if (filters.facilityId && exam.facilityId !== filters.facilityId) {
                  return false
                }
                if (filters.minPrice && exam.price < filters.minPrice) {
                  return false
                }
                if (filters.maxPrice && exam.price > filters.maxPrice) {
                  return false
                }
                if (filters.minDeliveryTime && exam.deliveryTime < filters.minDeliveryTime) {
                  return false
                }
                if (filters.maxDeliveryTime && exam.deliveryTime > filters.maxDeliveryTime) {
                  return false
                }
                return true
              })

  return (
    <LaboratoryContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.Laboratory.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.Laboratory.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.Laboratory.AddExam')}</span> <IconFlask size={18} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="facilities">Laboratórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <LaboratoryDashboard laboratoryData={laboratoryData} />
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <LaboratoryFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<Laboratory>
                data={filteredData}
                columns={laboratoryColumns}
                onRowClick={(laboratory) => setCurrentRow(laboratory)} 
              />
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
              <div>
                <h3 className='text-lg font-semibold tracking-tight'>
                  {t('Pages.LaboratoryFacility.Title')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('Pages.LaboratoryFacility.Overview')}
                </p>
              </div>
              <div className='flex gap-2'>
                <Button className='space-x-1' onClick={() => setFacilityOpen('add')}>
                  <span>{t('Pages.LaboratoryFacility.AddFacility')}</span> <IconBuilding size={18} />
                </Button>
              </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<LaboratoryFacility>
                data={facilityData}
                columns={laboratoryFacilityColumns({
                  onEdit: (facility) => {
                    setCurrentFacility(facility)
                    setFacilityOpen('edit')
                  },
                  onDelete: handleDeleteFacility
                })}
                onRowClick={(facility) => setCurrentFacility(facility)} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </Main>

      <LaboratoryActionDialog
        key='laboratory-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      {currentRow && (
        <>
          <LaboratoryActionDialog
            key={`laboratory-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />

          <LaboratoryDeleteDialog
            key={`laboratory-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null)
              if (!isOpen) setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}

      <LaboratoryFacilityActionDialog
        key='facility-add'
        open={facilityOpen === 'add'}
        onOpenChange={(isOpen) => setFacilityOpen(isOpen ? 'add' : null)}
        onSave={handleSaveFacility}
      />

      {currentFacility && (
        <LaboratoryFacilityActionDialog
          key={`facility-edit-${currentFacility.id}`}
          open={facilityOpen === 'edit'}
          onOpenChange={(isOpen) => {
            setFacilityOpen(isOpen ? 'edit' : null)
            if (!isOpen) setTimeout(() => setCurrentFacility(null), 500)
          }}
          currentRow={currentFacility}
          onSave={handleSaveFacility}
        />
      )}
    </LaboratoryContextProvider>
  )
} 