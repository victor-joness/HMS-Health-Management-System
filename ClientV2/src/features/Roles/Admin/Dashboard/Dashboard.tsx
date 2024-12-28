import { Auth } from '@/types/Auth'

interface DashboardAdminProps {
  auth: Auth
}

const Dashboard: React.FC<DashboardAdminProps> = ({ auth }) => {
  return (
    <div>
      <h1>Bem-vindo, {auth.Role}</h1>
      {/* Renderize o restante do conteúdo aqui */}
    </div>
  )
}
export default Dashboard
