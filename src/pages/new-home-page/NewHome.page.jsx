import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const NewHomePage = () => {
  return (
    <div className="cm-home-page-container cm-main-container">
      <Button
        component={Link}
        to="/create-budget"
        variant="contained"
        color="primary"
      >
        Create New Budget
      </Button>
    </div>
  );
};

export default NewHomePage;
