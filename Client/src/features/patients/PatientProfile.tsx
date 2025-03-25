import React from 'react'
import { IconArrowDown, IconArrowUp, IconArrowRight, IconLineScan} from '@tabler/icons-react'
import { Auth } from '@/entities/Auth'
import { Patient } from '@/entities/Patients'
import { Report } from '@/entities/Report'
import { t } from 'i18next'
import { Progress } from '@/components/ui/progress'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

type PatientProfileProps = {
  Patient: Patient
  Auth: Auth
}

const getArrowIcon = (value: Partial<Report>, IMC : number) => {
  console.log(IMC)
  if (value.HeartRate !== undefined) {
    if (value.HeartRate < 60) return <IconArrowDown color='red' />
    if (value.HeartRate < 100) return <IconArrowRight color='orange' />
    return <IconArrowUp color='green' />
  }
  if (value.BloodPressure) {
    const [sistolica, diastolica] = value.BloodPressure.split('/').map(Number)
    if (sistolica < 90 || diastolica < 60) return <IconArrowDown color='red' />
    if (sistolica < 120 && diastolica < 80)
      return <IconArrowRight color='orange' />
    return <IconArrowUp color='green' />
  }
  
  if (value.GlucoseLevel !== undefined) {
    if (value.GlucoseLevel < 70) return <IconArrowDown color='red' />
    if (value.GlucoseLevel <= 100) return <IconArrowRight color='orange' />
    return <IconArrowUp color='green' />
  }

  if(IMC !== undefined){
    if (IMC < 18.5) {
      return <IconArrowDown color="red" />;
    } else if (IMC >= 18.5 && IMC < 25.0) {
      return <IconLineScan color="red" />;
    } else if (IMC >= 25.0 && IMC < 30.0) {
      return <IconArrowUp color="red" />;
    } else {
      return <IconArrowUp color="red" />;
    }
  }
  return null
}

const PatientProfile: React.FC<PatientProfileProps> = ({ Patient, Auth }) => {
  const IMC = (Patient.Report.Weight / Patient.Report.Height ** 2) * 10000
  const PRESSAO =
    (Number(Patient.Report.BloodPressure.split('/')[0]) /
      Number(Patient.Report.BloodPressure.split('/')[1])) *
    100

  console.log(Patient)

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.Patient.Overview')}
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown auth={Auth} />
        </div>
      </Header>

      <Main>
        <div className='flex items-center justify-center p-6'>
          <div className='bg-white shadow-lg rounded-lg w-full max-w-10xl p-6 grid-cols-3'>
            <div className='flex items-center justify-center gap-2'>
              <div className='w-1/4 flex items-center justify-center'>
                <img
                  src={`${Patient.UserInfo?.Img}`}
                  alt='Imagem do Perfil'
                  className='w-full h-full object-cover rounded-lg shadow-lg'
                />
              </div>

              <div className='w-full bg-gray-50 p-7  rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Sobre o paciente</h2>
                <p className='text-sm text-gray-600 mb-4'>
                  {Patient.AdditionalNotes}
                </p>
                <div className='grid grid-cols-3 gap-4 text-sm text-gray-700'>
                  <p>
                    <strong>Email:</strong> {Patient.UserInfo?.Email}
                  </p>
                  <p>
                    <strong>Número:</strong> {Patient.UserInfo?.PhoneNumber}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {Patient.Address}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {Patient.Report.Gender}
                  </p>
                  <p>
                    <strong>Altura:</strong> {Patient.Report.Height} cm
                  </p>
                  <p>
                    <strong>Idade:</strong> {Patient.UserInfo?.Age}
                  </p>
                  <p>
                    <strong>Peso:</strong> {Patient.Report.Weight} kg
                  </p>
                  <p>
                    <strong>User ID:</strong> {Patient.UserInfo?.Id}
                  </p>
                  <p>
                    <strong>Paciente ID:</strong> {Patient.Id}
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full flex gap-6 mt-4'>
              <div className='w-3/4 bg-gray-50 p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Atachment</h2>
              </div>

              {/* Relatório */}
              <div className='w-1/4 bg-gray-50 p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Report</h2>
                {['HeartRate', 'BloodPressure', 'IMC', 'GlucoseLevel'].map(
                  (key) => (
                    <div key={key} className='mb-4'>
                      <h3 className='text-md font-semibold'>
                        {key === 'HeartRate' ? 'BPM' : key}
                      </h3>
                      <div className='flex items-center gap-4'>
                        
                        {
                          key === 'HeartRate'
                          ? Patient.Report.HeartRate
                          : key === 'BloodPressure'
                            ? PRESSAO
                            : key === 'IMC'
                              ? IMC.toFixed(0)
                              : Patient.Report.GlucoseLevel
                        }
                        <Progress
                          value={
                            key === 'HeartRate'
                              ? Patient.Report.HeartRate
                              : key === 'BloodPressure'
                                ? PRESSAO
                                : key === 'IMC'
                                  ? IMC
                                  : Patient.Report.GlucoseLevel
                          }
                          max={100}
                        />
                        {getArrowIcon({
                          [key]: Patient.Report[key as keyof Report],
                        }, IMC)}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className='w-full flex gap-6 mt-4'> 
            <div className='w-full bg-gray-50 p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Historico</h2>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}

export default PatientProfile
