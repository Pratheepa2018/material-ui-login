import React, { Component } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core/';
import './GridComponent.css';


class GridComponent extends Component {
  render() {
    const { card, gridSize, textAlign } = this.props;
    return (
      <Grid item key={card.id} xs={12} sm={6} md={gridSize ? gridSize : 4} alignItems="center" justify="center" className="dashboard-grid-container">
        <Card className={`grid_card ${textAlign}`}  >
          <figure className="box-figure">
            <img src={card.image} alt={card.imageText} className='grid_img' />
          </figure>
          <CardContent className='grid_content'>
            <Typography gutterBottom variant="h5" component="h2">
              {card.title}
            </Typography>
            <Typography>
              {card.description}
            </Typography>
          </CardContent>
          <CardActions className="dashboard-grid-action">
            {card.learnMorelink && (
              <Button
                variant="outlined"
                color="primary"
                href={card.learnMorelink}
                
              >
                Learn More
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              className='right_btn'
              href={card.letsGolink}
              disabled={!card.letsGolink}
            >
              Go
            </Button>
          </CardActions>
        </Card>
      </Grid>

    );
  }
}

export default GridComponent;