import { Auth } from '@/types/Auth'

interface DashboardNurseProps {
  auth: Auth
}

const Dashboard: React.FC<DashboardNurseProps> = ({ auth }) => {
  return (
    <div>
      <h1>Bem-vindo, {auth.Role}</h1>
      {/* Renderize o restante do conteúdo aqui */}
    </div>
  )
}
export default Dashboard
