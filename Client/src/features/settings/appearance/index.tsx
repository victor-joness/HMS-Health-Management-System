import { t } from 'i18next'
import ContentSection from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export default function SettingsAppearance() {
  return (
    <ContentSection
      title={t('Settings.Appearance.Title')}
      desc={t('Settings.Appearance.AppearanceDescription')}
    >
      <AppearanceForm />
    </ContentSection>
  )
}
