import { Auth } from '@/types/Auth'

interface DashboardDoctorProps {
  auth: Auth
}

const Dashboard: React.FC<DashboardDoctorProps> = ({ auth }) => {
  return (
    <div>
      <h1>Bem-vindo, {auth.Role}</h1>
      {/* Renderize o restante do conteúdo aqui */}
    </div>
  )
}
export default Dashboard
