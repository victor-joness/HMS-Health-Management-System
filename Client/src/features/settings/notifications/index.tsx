import { useTranslation } from 'react-i18next'
import ContentSection from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export default function SettingsNotifications() {
  const { t } = useTranslation();
  
  return (
    <ContentSection
      title={t("Settings.Notifications.Title")}
      desc={t("Settings.Notifications.NotificationsDescription")}
    >
      <NotificationsForm />
    </ContentSection>
  )
}
