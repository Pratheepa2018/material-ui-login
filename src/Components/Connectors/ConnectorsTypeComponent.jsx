import React, { Component } from 'react';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';
import { Box, Grid } from '@material-ui/core';
import GridComponent from '../Grid/GridComponent';

const data = [
  {id: 1, title: 'DevOps Automation', description: '', image: '../assets/images/dashboard1.jpg', learnMorelink: '', letsGolink: '/dashboard' }
]
export default class ConnectorType extends Component {

  render() {
    return (
      <div className="connector-type">
        <FullWidthBanner 
          title="Connector Type"
          image="../../assets/images/globle.jpg"
          imageText="Full Banner"
          exceptimage ="../../assets/images/learnmore.gif"
        />
        <Box className="connector-type-wrapper">
          <Grid container spacing={4}>
            {data.map((card) => (
              <GridComponent card={card} gridSize={3} textAlign='center' />
            ))}
          </Grid>
        </Box>
      </div>
    )
  }
}