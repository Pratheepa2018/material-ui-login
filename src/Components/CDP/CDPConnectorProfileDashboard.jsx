import React, { Component } from 'react';
import './CollaberaDevOpsPlatform.css';
import { Grid } from '@material-ui/core/';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner'
import GridComponent from '../Grid/GridComponent'

const cards = [
    { id: 1, title: 'Connectors', discription: 'discription not available', image: './assets/images/connect.jpg', learnMorelink: '#', letsGolink: './connectors' },
    { id: 2, title: 'Profiles', discription: 'discription not available', image: './assets/images/profile.jpg', learnMorelink: '#', letsGolink: './profile' },
   
]

class CDPConnectorProfileDashboard extends Component {
    render() {
        return (
            <div>
                <FullWidthBanner
                    title="Collabera DevOps Platform(CDP)"
                    description="description"
                    linkText="Learn more"
                    image="https://constructify.com/wp-content/uploads/2018/09/services-1200x300.jpg"
                    imageText="alt text" />
                <Grid className='cdp_box'>
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <GridComponent card={card} />
                        ))}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CDPConnectorProfileDashboard;