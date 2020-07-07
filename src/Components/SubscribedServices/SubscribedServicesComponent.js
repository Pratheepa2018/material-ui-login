import React, { Component } from 'react';
import './SubscribedServicesComponent.css';
import { Grid } from '@material-ui/core/';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner'
import GridComponent from '../Grid/GridComponent'

const cards = [
    { id: 1, title: 'Collabera Information Platform(CIP)', description: '', image: 'https://www.m-files.com/blog/wp-content/uploads/2018/05/Img-IMMovingToTheCloudAndSaaS-600x300.jpg', learnMorelink: '#', letsGolink: '' },
    { id: 2, title: 'Collabera DevOps Platform(CDP)', description: '', image: 'https://quantummile.com/wp-content/uploads/2018/03/DevOps-FAQ-1280x720-600x300.jpg', learnMorelink: '#', letsGolink: './subscribedservices/CDP' },
    { id: 3, title: 'Collabera Connectors MarketPlace(CCM)', description: '', image: 'https://www.mediamath.com/blog/wp-content/uploads/2017/05/HitTheTarget-600x300.png', learnMorelink: '#', letsGolink: '' },
    { id: 4, title: 'Collabera Cloud Accelerators(CCA)', description: '', image: 'https://www.torontointernetcity.com/wp-content/uploads/2018/09/cloud_computing--600x300.jpg', learnMorelink: '#', letsGolink: '' },
]

class SubscribedServicesComponent extends Component {
    render() {
        return (
            <div>
                <FullWidthBanner
                    title=" Subscribed Services"
                    description="description"
                    linkText="Learn more"
                    image="../assets/images/globle.jpg"
                    imageText="alt text" 
                    exceptimage ="../assets/images/learnmore.gif"/>
                <Grid className='dash_box'>
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


export default SubscribedServicesComponent;