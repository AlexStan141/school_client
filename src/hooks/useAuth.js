import { useSelector } from 'react-redux';
import {
  getCurrentUser,
  getIsLoggedIn,
  getIsRefreshing,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const user = useSelector(getCurrentUser);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};