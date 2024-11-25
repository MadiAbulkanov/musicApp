import { AppBar, Box, Container, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import UserMenu from '../Menu/UserMenu/UserMenu';
import { IUser } from '../../../interfaces/user.interface';
import { useAppDispatch } from '../../../app/hook';
import { logOut } from '../../../features/user/user.slice';
import Anonymous from '../Menu/UserMenu/Anonymous';

export const StyledLink = styled(Link)(() => ({
  color: 'inherit',
  textDecoration: 'none',
  padding: '5px',
  ['&:hover']: {
    color: 'inherit',
  },
}));

const AppToolbar = ({ user }: { user: IUser | null }) => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#106b81", padding: "10px",  }}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between', alignContent: 'center', padding: "0", '@media (min-width: 600px)': {
        paddingLeft: 0,
        paddingRight: 0,
    }}} >
          <Typography variant='h6' component={StyledLink} to={'/'}>       
            Music app
          </Typography>
          { user ? (
            <UserMenu user={user} onClickLogout={logoutHandler}/> 
          ) : (
            <Grid item>
              <Anonymous />
            </Grid>
          )}
        </Toolbar> 
        </Container>
       
      </AppBar>
      <Box component={Toolbar} marginBottom={2} />
    </>
  );
};

export default AppToolbar;