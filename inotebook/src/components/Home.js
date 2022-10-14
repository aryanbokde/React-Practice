import React from 'react';
import Addnote from './Addnote';
import Notes from './Notes';

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <Addnote showAlert={showAlert}/>
      <Notes showAlert={showAlert}/>
    </>
  )
}

export default Home
