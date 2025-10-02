import { Auth } from '@/entities/Auth'
import { t } from 'i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface PrivacyPolicyProps {
  auth: Auth
}

export default function PrivacyPolicy({ auth }: PrivacyPolicyProps) {
  const [hasRead, setHasRead] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)

  const handleAccept = () => {
    if (!hasRead) {
      toast.error('Você deve ler a política de privacidade antes de aceitar')
      return
    }
    setHasAccepted(true)
    toast.success('Política de privacidade aceita com sucesso!')
  }

  const handleDecline = () => {
    setHasAccepted(false)
    toast.info('Política de privacidade recusada')
  }

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.PrivacyPolicy.Title')}
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown auth={auth} />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('Pages.PrivacyPolicy.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Badge variant="outline">
              {t('Pages.PrivacyPolicy.LastUpdated')}: 15/01/2024
            </Badge>
            <Badge variant="outline">
              {t('Pages.PrivacyPolicy.EffectiveDate')}: 15/01/2024
            </Badge>
          </div>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.Introduction')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Esta Política de Privacidade descreve como o Hospital Management System (HMS) coleta, 
                usa e protege suas informações pessoais. Ao usar nosso sistema, você concorda com a 
                coleta e uso de informações de acordo com esta política.
              </p>
              <p className='text-muted-foreground'>
                Estamos comprometidos em proteger sua privacidade e garantir que suas informações 
                pessoais sejam tratadas com segurança e confidencialidade.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.DataCollection')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Coletamos os seguintes tipos de informações:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li><strong>Informações Pessoais:</strong> Nome, email, telefone, endereço, data de nascimento</li>
                <li><strong>Informações Médicas:</strong> Histórico médico, diagnósticos, prescrições, resultados de exames</li>
                <li><strong>Informações de Uso:</strong> Logs de acesso, atividades no sistema, preferências</li>
                <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.DataUsage')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Utilizamos suas informações para:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Fornecer serviços médicos e de saúde</li>
                <li>Gerenciar agendamentos e consultas</li>
                <li>Processar pagamentos e faturas</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Comunicar informações importantes sobre sua saúde</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.DataSharing')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Suas informações podem ser compartilhadas com:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li><strong>Profissionais de Saúde:</strong> Médicos, enfermeiros e outros profissionais envolvidos no seu cuidado</li>
                <li><strong>Prestadores de Serviços:</strong> Laboratórios, farmácias e outros parceiros de saúde</li>
                <li><strong>Autoridades Legais:</strong> Quando exigido por lei ou ordem judicial</li>
                <li><strong>Seguros de Saúde:</strong> Para processamento de reembolsos e cobertura</li>
              </ul>
              <p className='text-muted-foreground'>
                <strong>Importante:</strong> Não vendemos, alugamos ou comercializamos suas informações pessoais com terceiros.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.DataSecurity')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Implementamos medidas de segurança rigorosas para proteger suas informações:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Criptografia de dados em repouso e em trânsito</li>
                <li>Controle de acesso baseado em funções</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e seguros</li>
                <li>Treinamento de funcionários em segurança da informação</li>
                <li>Auditorias regulares de segurança</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.UserRights')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Você tem os seguintes direitos em relação às suas informações:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li><strong>Acesso:</strong> Solicitar uma cópia de suas informações pessoais</li>
                <li><strong>Correção:</strong> Solicitar correção de informações imprecisas</li>
                <li><strong>Exclusão:</strong> Solicitar exclusão de suas informações (quando permitido por lei)</li>
                <li><strong>Portabilidade:</strong> Receber suas informações em formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento de suas informações</li>
                <li><strong>Restrição:</strong> Solicitar limitação do processamento de suas informações</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.ContactInfo')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <div className='space-y-2'>
                <p><strong>Email:</strong> privacidade@hospital.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Endereço:</strong> Rua das Flores, 123 - Centro, São Paulo - SP</p>
                <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, 8h às 18h</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.Changes')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre 
                mudanças significativas através de:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Notificação no sistema</li>
                <li>Email para usuários registrados</li>
                <li>Atualização da data de vigência</li>
              </ul>
              <p className='text-muted-foreground'>
                Recomendamos revisar esta política regularmente para se manter informado sobre como 
                protegemos suas informações.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.PrivacyPolicy.Acceptance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Ao usar o Hospital Management System, você concorda com esta Política de Privacidade. 
                Se você não concordar com qualquer parte desta política, não deve usar nossos serviços.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance Section */}
          <Card>
            <CardHeader>
              <CardTitle>Aceitação da Política de Privacidade</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox 
                  id="read-policy" 
                  checked={hasRead}
                  onCheckedChange={(checked) => setHasRead(checked as boolean)}
                />
                <label htmlFor="read-policy" className="text-sm font-medium">
                  Li e compreendi a Política de Privacidade
                </label>
              </div>
              
              <div className='flex items-center space-x-2'>
                <Checkbox 
                  id="accept-policy" 
                  checked={hasAccepted}
                  onCheckedChange={(checked) => setHasAccepted(checked as boolean)}
                  disabled={!hasRead}
                />
                <label htmlFor="accept-policy" className="text-sm font-medium">
                  Aceito a Política de Privacidade
                </label>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button 
                  onClick={handleAccept}
                  disabled={!hasRead}
                  className="flex-1"
                >
                  Aceitar Política
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleDecline}
                  className="flex-1"
                >
                  Recusar
                </Button>
              </div>

              {hasAccepted && (
                <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-md'>
                  <p className='text-sm text-green-800'>
                    ✅ Política de Privacidade aceita em {new Date().toLocaleString('pt-BR')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
} 