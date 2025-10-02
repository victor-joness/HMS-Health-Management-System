import { Auth } from '@/entities/Auth'
import { t } from 'i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface TermsAndConditionsProps {
  auth: Auth
}

export default function TermsAndConditions({ auth }: TermsAndConditionsProps) {
  const [hasRead, setHasRead] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)

  const handleAccept = () => {
    if (!hasRead) {
      toast.error('Você deve ler os termos e condições antes de aceitar')
      return
    }
    setHasAccepted(true)
    toast.success('Termos e condições aceitos com sucesso!')
  }

  const handleDecline = () => {
    setHasAccepted(false)
    toast.info('Termos e condições recusados')
  }

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.TermsAndConditions.Title')}
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
            {t('Pages.TermsAndConditions.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Badge variant="outline">
              {t('Pages.TermsAndConditions.LastUpdated')}: 15/01/2024
            </Badge>
            <Badge variant="outline">
              {t('Pages.TermsAndConditions.EffectiveDate')}: 15/01/2024
            </Badge>
          </div>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.Introduction')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Bem-vindo ao Hospital Management System (HMS). Estes Termos e Condições governam 
                o uso do nosso sistema de gerenciamento hospitalar e todos os serviços relacionados.
              </p>
              <p className='text-muted-foreground'>
                Ao acessar ou usar o HMS, você concorda em cumprir e estar vinculado a estes termos. 
                Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.Acceptance')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Ao usar o HMS, você confirma que:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Você tem pelo menos 18 anos de idade ou tem autorização legal</li>
                <li>Você tem capacidade legal para aceitar estes termos</li>
                <li>Você fornecerá informações precisas e atualizadas</li>
                <li>Você manterá a confidencialidade de suas credenciais de acesso</li>
                <li>Você usará o sistema apenas para fins legítimos e autorizados</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.UseOfService')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                O HMS é fornecido para uso em ambiente hospitalar e médico. Você pode usar o sistema para:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Gerenciar informações de pacientes e prontuários médicos</li>
                <li>Agendar consultas e procedimentos médicos</li>
                <li>Processar pagamentos e faturas</li>
                <li>Gerenciar estoque e recursos hospitalares</li>
                <li>Acessar relatórios e análises médicas</li>
                <li>Comunicar com outros profissionais de saúde</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.UserObligations')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Como usuário do HMS, você se compromete a:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Manter a confidencialidade das informações médicas</li>
                <li>Usar o sistema de acordo com as leis e regulamentos aplicáveis</li>
                <li>Não compartilhar suas credenciais de acesso</li>
                <li>Reportar qualquer uso não autorizado ou suspeito</li>
                <li>Respeitar os direitos de privacidade dos pacientes</li>
                <li>Manter as informações atualizadas e precisas</li>
                <li>Cumprir as políticas de segurança do hospital</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.ProhibitedUses')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                É estritamente proibido:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Acessar informações sem autorização</li>
                <li>Compartilhar credenciais de acesso</li>
                <li>Usar o sistema para atividades ilegais</li>
                <li>Tentar contornar medidas de segurança</li>
                <li>Introduzir vírus ou código malicioso</li>
                <li>Interferir no funcionamento do sistema</li>
                <li>Usar o sistema para fins comerciais não autorizados</li>
                <li>Violar direitos de propriedade intelectual</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.IntellectualProperty')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                O HMS e todo o seu conteúdo são protegidos por direitos autorais, marcas registradas 
                e outras leis de propriedade intelectual. Você reconhece que:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>O sistema é propriedade do hospital ou seus licenciadores</li>
                <li>Você não adquire direitos de propriedade sobre o sistema</li>
                <li>É proibido copiar, modificar ou distribuir o software</li>
                <li>As informações dos pacientes permanecem propriedade do hospital</li>
                <li>Você deve respeitar todos os direitos autorais e marcas registradas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.Privacy')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Sua privacidade é importante para nós. O uso de suas informações pessoais é regido 
                pela nossa Política de Privacidade, que faz parte integrante destes termos.
              </p>
              <p className='text-muted-foreground'>
                Ao usar o HMS, você concorda com a coleta, uso e divulgação de suas informações 
                conforme descrito na Política de Privacidade.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.LimitationOfLiability')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Em nenhuma circunstância o hospital será responsável por:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Danos indiretos, incidentais ou consequenciais</li>
                <li>Perda de dados ou informações</li>
                <li>Interrupções no serviço</li>
                <li>Decisões médicas baseadas nas informações do sistema</li>
                <li>Uso inadequado do sistema pelos usuários</li>
                <li>Violations de segurança causadas por terceiros</li>
              </ul>
              <p className='text-muted-foreground'>
                A responsabilidade total do hospital é limitada ao valor pago pelo uso do sistema.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.Termination')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Estes termos podem ser rescindidos:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Por você, a qualquer momento, descontinuando o uso do sistema</li>
                <li>Pelo hospital, imediatamente, em caso de violação dos termos</li>
                <li>Automaticamente, quando seu acesso for revogado</li>
                <li>Por acordo mútuo entre as partes</li>
              </ul>
              <p className='text-muted-foreground'>
                Após a rescisão, você deve cessar imediatamente o uso do sistema e destruir 
                quaisquer cópias de informações confidenciais.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.GoverningLaw')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Estes termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida 
                nos tribunais competentes da jurisdição onde o hospital está localizado.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.ContactInfo')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Para dúvidas sobre estes termos, entre em contato:
              </p>
              <div className='space-y-2'>
                <p><strong>Email:</strong> juridico@hospital.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Endereço:</strong> Rua das Flores, 123 - Centro, São Paulo - SP</p>
                <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, 8h às 18h</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Pages.TermsAndConditions.Changes')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão comunicadas através de:
              </p>
              <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                <li>Notificação no sistema</li>
                <li>Email para usuários registrados</li>
                <li>Atualização da data de vigência</li>
              </ul>
              <p className='text-muted-foreground'>
                O uso contínuo do sistema após as modificações constitui aceitação dos novos termos.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance Section */}
          <Card>
            <CardHeader>
              <CardTitle>Aceitação dos Termos e Condições</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox 
                  id="read-terms" 
                  checked={hasRead}
                  onCheckedChange={(checked) => setHasRead(checked as boolean)}
                />
                <label htmlFor="read-terms" className="text-sm font-medium">
                  Li e compreendi os Termos e Condições
                </label>
              </div>
              
              <div className='flex items-center space-x-2'>
                <Checkbox 
                  id="accept-terms" 
                  checked={hasAccepted}
                  onCheckedChange={(checked) => setHasAccepted(checked as boolean)}
                  disabled={!hasRead}
                />
                <label htmlFor="accept-terms" className="text-sm font-medium">
                  Aceito os Termos e Condições
                </label>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button 
                  onClick={handleAccept}
                  disabled={!hasRead}
                  className="flex-1"
                >
                  Aceitar Termos
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
                    ✅ Termos e Condições aceitos em {new Date().toLocaleString('pt-BR')}
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