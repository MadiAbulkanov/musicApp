import { Button } from '@mui/material';
import { StyledLink } from '../../AppToolbar/AppToolbar';

function Anonymous () {
  return (
    <>
        <Button component={StyledLink} to={'/auth/sign-in'} color="inherit">
            Sign-in
        </Button>
        <Button component={StyledLink} to={'/auth/sign-up'} color="inherit">
            Sign-up
        </Button>
    </>
  );
};

export default Anonymous;