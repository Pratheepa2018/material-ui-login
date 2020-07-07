import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Link, Box } from '@material-ui/core';
import './HeaderComponent.css';

const styles = theme => ({
    root: {
        
        backgroundColor: '#042380',
        color: 'white',
        marginTop: '20px',

    },
 
});

function Footer(props) {
    const { classes } = props;

    return (
        <footer className={props.isdrawopen} >
            <Paper className={classes.root + " footerbody " + props.innerClass} elevation={1}>
                 <Box padding={2}>
                    <Link  color={"inherit"}>
                        Collabera MarketPlace Platform(TM)
                    </Link>
                     <Link color={"inherit"}>
                        All right reserved
                    </Link>
                     <Link href="#" color={"inherit"}>Privacy & Legal </Link>
                    <Link href="#" color={"inherit"}>Onboarding. Sell. Service. Markets. Success </Link>
                 
                    </Box>
            </Paper>
        </footer>
    );
}

export default withStyles(styles)(Footer);