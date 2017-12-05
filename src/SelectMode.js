import React, { Component } from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ButtonBase from 'material-ui/ButtonBase';
import Paper from 'material-ui/Paper';

import './SelectMode.css';

// Component to render selection of either practice or exercise
class SelectMode extends Component {

  renderSelection(title, character) {
    return (
      <Paper>
        <ButtonBase className="selectCard">
          <Typography type="headline" component="h2" className='character'>{character}</Typography>
          <Typography type="headline" component="h2" className='title'>{title}</Typography>
        </ButtonBase>
      </Paper>
    );
  }

  render() {
    return (
      <div className="SelectMode">
        <div></div>
        <div></div>
        {this.renderSelection('Practice', '练习')}
        <div></div>
        {this.renderSelection('Exercise', '测试')}
        <div></div>
        <div></div>
      </div>
    );
  }

}


export default SelectMode;
