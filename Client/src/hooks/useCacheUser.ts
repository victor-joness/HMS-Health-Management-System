import { useEffect } from 'react';
import { Auth } from '@/entities/Auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

type UseCacheUserOptions = {
  redirectIfAuthenticated?: string;
  redirectIfNotAuthenticated?: string;
};

export default function useCacheUser(options: UseCacheUserOptions = {}) {
  const { redirectIfAuthenticated, redirectIfNotAuthenticated } = options;
  const Auth: Auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectIfAuthenticated && Auth.Id) {
      navigate(redirectIfAuthenticated);
    } else if (redirectIfNotAuthenticated && !Auth.Id) {
      navigate(redirectIfNotAuthenticated);
    }
  }, [Auth.Id, navigate, redirectIfAuthenticated, redirectIfNotAuthenticated]);
}
