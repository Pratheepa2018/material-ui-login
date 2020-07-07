import React, { Component } from 'react';
import './DashboardComponent.css';
import { Grid } from '@material-ui/core/';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';
import GridComponent from '../Grid/GridComponent';
import '../../Styles/dashboard.scss';

const cards = [
  { id: 1, title: 'DevOps Automation', description: '', image: '../assets/images/dashboard1.jpg', learnMorelink: '', letsGolink: '/dashboard/CDP' },
  { id: 2, title: 'System Integration', description: '', image: '../assets/images/dashboard2.jpg', learnMorelink: '', letsGolink: '' },
  { id: 3, title: 'Information Management', description: '', image: '../assets/images/dashboard3.jpg', learnMorelink: '', letsGolink: '' },
  { id: 4, title: 'AI Automation', description: '', image: '../assets/images/dashboard4.jpg', learnMorelink: '', letsGolink: '' },
  { id: 1, title: 'Report Factory Enablement', description: '', image: '../assets/images/dashboard5.jpg', learnMorelink: '', letsGolink: '' },
  { id: 2, title: 'Healthcare Life Sciences', description: '', image: '../assets/images/dashboard7.jpg', learnMorelink: '', letsGolink: '' },
  { id: 3, title: 'Payments Processing', description: '', image: '../assets/images/dashboard6.jpg', learnMorelink: '', letsGolink: '' },
  { id: 1, title: 'Retail & SCM', description: '', image: '../assets/images/dashboard8.jpg', learnMorelink: '', letsGolink: '' },

]
class DashboardComponent extends Component {


  render() {
    return (
      <div>
        <FullWidthBanner
        title="Dashboard"
          image="../assets/images/globle.jpg"
          imageText="alt text"
          exceptimage="../assets/images/learnmore.gif" />
        <Grid className='dash_box'>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <GridComponent card={card} gridSize={3} textAlign='center' />
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default DashboardComponent;