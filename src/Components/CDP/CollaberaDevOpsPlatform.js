import React, { Component } from 'react';
import './CollaberaDevOpsPlatform.css';
import { Grid } from '@material-ui/core/';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner'
import GridComponent from '../Grid/GridComponent'

const cards = [
    { id: 1, title: 'Data Testing Framework', description: '', image: '../assets/images/data.jpg', learnMorelink: '#', letsGolink: './CDP/cdp-connector-profile' },
    { id: 2, title: 'API Testing Framework', description: '', image: '../assets/images/api.jpg', learnMorelink: '#', letsGolink: './CDP/api-pipeline' },
    { id: 3, title: 'UI Testing Framework', description: '', image: '../assets/images/ui.jpg', learnMorelink: '#', letsGolink: '' },
]

class CollaberaDevOpsPlatform extends Component {
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

export default CollaberaDevOpsPlatform;