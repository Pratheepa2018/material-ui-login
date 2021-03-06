import React from 'react';
import Box from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import './FullWidthBanner.css';


class FullWidthBanner extends React.Component {
    
    render() {
        const { image, imageText, title, description, linkText}= this.props;
        return (
        <Box className='banner_body' style={{ backgroundImage: `url(${image})` }} p={{ xs: 4, sm: 6, md: 8 }}>
     
      {<img style={{ display: 'none' }} src={image} alt={imageText} />}
      <div className='overlayer' />
      <Grid container>
        <Grid item md={6}>
          <div className='textbody'>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {description}
            </Typography>
            <Link variant="subtitle1" href="#">
              {linkText}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Box>
        );
    }
}

export default FullWidthBanner;
