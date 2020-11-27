import React, { useEffect } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './App.scss';
import history from './history';
import Authentication from './pages/authentication-page/Authentication.page';
import BudgetHome from './pages/budget-home-page/BudgetHome.page';
import CreateBudgetPage from './pages/create-budget/CreateBudget.page';
import NewHomePage from './pages/new-home-page/NewHome.page';
import ProtectedRoute from './components/protected-route/ProtectedRoute.component';
import { infoReset } from './redux/app/app.action';
import Loader from './components/loader/Loader.component';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const App = () => {
  const currentUser = useSelector((state) => state.user.user);
  const info = useSelector((state) => state.app.info);
  const loaderObj = useSelector((state) => state.loader);

  const [open, setOpen] = React.useState(false);

  if (Object.keys(currentUser).length === 0) {
    history.push('/auth');
  }

  const dispatch = useDispatch();

  //const nullObj = { message: null, infoType: null };

  useEffect(() => {
    if (info.message !== null && info.infoType !== null) {
      setOpen(true);
    }

    // return () =>
    //   setTimeout(() => {
    //     setOpen(false);
    //     dispatch(infoReset());
    //   }, 6000);
  }, [info, setOpen]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

    dispatch(infoReset());
  };

  return (
    <div className="App">
      {info.message !== null && info.infoType !== null ? (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity={info.infoType}>{info.message}</Alert>
        </Snackbar>
      ) : null}
      {loaderObj.status ? (
        <Loader
          loaderType={loaderObj.type}
          loadingText={loaderObj.loaderText}
        />
      ) : null}
      <Router history={history}>
        <Switch>
          <ProtectedRoute exact path="/" component={NewHomePage} />
          <ProtectedRoute
            exact
            path="/create-budget"
            component={CreateBudgetPage}
          />
          <ProtectedRoute exact path="/budgets" component={BudgetHome} />
          <Route
            exact
            path="/auth"
            render={() =>
              currentUser._id ? <Redirect to="/" /> : <Authentication />
            }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
