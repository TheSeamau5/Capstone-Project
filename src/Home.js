import React, { Component } from 'react';

import Typography from 'material-ui/Typography';
import ButtonBase from 'material-ui/ButtonBase';
import Paper from 'material-ui/Paper';

import {topics} from './lib/chinese';
import {Link} from 'react-router-dom';


import './Home.css';

class Home extends Component {


  renderTopic(topic) {
    return (
      <Paper>
        <Link to={`/${topic.name}`}>
          <ButtonBase className="selectTopic">
            <Typography type="headline" component="h2" className='title'>
              {topic.name}
            </Typography>
          </ButtonBase>
        </Link>
      </Paper>
    );
  }


  render() {
    return (
      <div className='Home'>
        <div className='topicWrapper'>
          {topics.map((topic) => this.renderTopic(topic))}
        </div>
      </div>
    );
  }
}

export default Home;
