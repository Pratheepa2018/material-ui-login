import React, { Component } from 'react';
import './CollaberaDevOpsPlatform.css';
import { Grid } from '@material-ui/core/';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner'
import GridComponent from '../Grid/GridComponent'

const cards = [
    { id: 1, title: 'Connectors', description: '', image: '../../assets/images/connect.jpg', learnMorelink: '#', letsGolink: './cdp-connector-profile/connectors' },
    { id: 2, title: 'Profiles', description: '', image: '../../assets/images/profile.jpg', learnMorelink: '#', letsGolink: './cdp-connector-profile/profiles' },
   
]

class CDPConnectorProfileDashboard extends Component {
    render() {
        return (
            <div>
                <FullWidthBanner
                    title="Collabera DevOps Platform (CDP)"
                    description="description"
                    linkText="Learn more"
                    image="../../assets/images/globle.jpg"
                    imageText="alt text" 
                    exceptimage ="../../assets/images/learnmore.gif"/>
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