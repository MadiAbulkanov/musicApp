import Button from '@mui/material/Button';
import { IUser } from '../../../../interfaces/user.interface';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: IUser;
  onClickLogout: () => void;
}

export default function UserMenu({ user, onClickLogout }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/track-history', { state: { user } });
  };

  const handleClose = () => {
    onClickLogout();
  }

  return (
    <div>
      {user.role === 'user' && (
        <Button
        id="user-menu-button"
        aria-haspopup="true"
        onClick={handleClick}
        color='inherit'
      >
        Track History
      </Button>
      )}
      <Button
        id="user-menu-button"
        aria-haspopup="true"
        onClick={handleClose}
        color='inherit'
      >
        Logout
      </Button>
    </div>
  );
}