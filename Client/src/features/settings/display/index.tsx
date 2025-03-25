import { useTranslation } from 'react-i18next'
import ContentSection from '../components/content-section'
import { DisplayForm } from './display-form'

export default function SettingsDisplay() {
  const { t } = useTranslation()

  return (
    <ContentSection
      title={t('Settings.Display.Title')}
      desc={t('Settings.Display.DisplayDescription')}
    >
      <DisplayForm />
    </ContentSection>
  )
}
