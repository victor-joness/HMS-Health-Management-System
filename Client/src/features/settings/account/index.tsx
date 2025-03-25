import { useTranslation } from 'react-i18next';
import ContentSection from '../components/content-section'
import { AccountForm } from './account-form'

export default function SettingsAccount() {
  const { t } = useTranslation();

  return (
    <ContentSection
      title={t("Settings.Account.Title")}
      desc={t("Settings.Account.AccountDescription")}
    >
      <AccountForm />
    </ContentSection>
  )
}
