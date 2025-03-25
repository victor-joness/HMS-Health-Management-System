import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Patient } from '@/entities/Patients';
import { useNavigate } from 'react-router-dom';

interface PacienteCardProps {
  paciente: Patient;
}

const PacienteCard = ({ paciente }: PacienteCardProps) => {
  const statusColor =
    paciente?.Report?.PatientStatus === 'Active'
      ? 'bg-green-500'
      : 'bg-red-500'

      const navigate = useNavigate();

  const handlePatietDetails = () => {
    navigate(`/patients/profile/${paciente.Id}`, {state: paciente});
  }

  return (
    <Card className='w-72 max-w-md shadow-lg'>
      <div className='relative'>
        <img
          className='object-cover h-48 w-full'
          alt={paciente?.UserInfo?.Name}
          src={paciente?.UserInfo?.Img}
        />
        <div
          className={`absolute top-0 right-0 m-2 w-4 h-4 rounded-full ${statusColor}`}
        />
      </div>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-xl font-bold'>
          {paciente?.UserInfo?.Name}
        </CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          {paciente?.Address}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-2 grid gap-1'>
        <p className='text-sm'>
          <strong>Idade:</strong> {paciente?.UserInfo?.Age} anos
        </p>
        <p className='text-sm'>
          <strong>Peso/Tamanho:</strong> {paciente?.Report.Weight}
          Kg / {paciente?.Report.Height}cm
        </p>
        <p className='text-sm'>
          <strong>Pressão:</strong> {paciente?.Report.BloodPressure}{' '}
          mmHg
        </p>
        <p className='text-sm'>
          <strong>BPM:</strong> {paciente?.Report.HeartRate} bpm
        </p>
        <p className='text-sm'>
          <strong>Glicose:</strong> {paciente?.Report.GlucoseLevel}{' '}
          mg/dl
        </p>
        <p className='text-sm'>
          <strong>Alergia:</strong> {paciente?.Report.ChronicDiseases}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handlePatietDetails()} className='w-full'>
          Ver Detalhes do Paciente
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PacienteCard
