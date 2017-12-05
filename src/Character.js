import React, { Component } from 'react';

import './Character.css';

const Character = ({
  children,
  color='gray'
}) => (
  <div className='characterContainer'>
    <p style={{color:color}}>
      {children}
    </p>
  </div>
);

export default Character;
