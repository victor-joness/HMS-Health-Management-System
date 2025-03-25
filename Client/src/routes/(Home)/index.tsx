import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import logo from '../../assets/LOGO.png';
import banner from '../../assets/banner.png';
import { t } from 'i18next';

export const Route = createFileRoute('/(Home)/')({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <div className={cn('flex min-h-screen bg-gradient-to-br from-[#d8d2fc] via-[#fde2e0] to-[#e0e9f4]')}>
      <div className="hidden lg:flex w-1/2">
        <img src={banner} alt="Banner" className="w-full object-contain" />
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <Card className="w-full max-w-xl bg-white/80 shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo" className="h-16 object-contain" />
            </div>
            <CardTitle className="text-3xl text-center font-semibold text-gray-800">
              {t("Home.Welcome")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button onClick={handleLogin} className="w-3/4 bg-primary">
              {t("Home.Login")}
            </Button>
            <Button onClick={handleRegister} className="w-3/4 bg-primary">
            {t("Home.Register")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
