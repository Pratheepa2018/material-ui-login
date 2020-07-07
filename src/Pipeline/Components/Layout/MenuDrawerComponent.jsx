import React ,{useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import CodeIcon from '@material-ui/icons/Code';
import InfoIcon from '@material-ui/icons/Info';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import TopMenu from './TopMenu';
import Auth from './Authentication'; 
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#3f51b5',
        color: 'white'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
      },
      sidemenu:{
        fontWeight:"600",
        color: 'black'
      }
}));

function BootstrapTooltip(props) {
    const classes = useStyles();  
    return <Tooltip arrow classes={classes} {...props} />;
  }

export default function MiniDrawer(props) {
    
    const classes = useStyles();
    const theme = useTheme();
    const [drawOpen, setDrawOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = Auth.isAuthenticated();
        if(auth) {
            setIsAuthenticated(auth)
          }
      });
   
      
    const handleClick = () => {
        setOpen(!open);
    };
    const handleDrawerOpen = () => {
        setDrawOpen(true);
        props.open();
    };

    const handleDrawerClose = () => {
        setDrawOpen(false);
        props.close();
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: drawOpen,
                        })}
                    >
                        <MenuIcon color="inherit" />
                    </IconButton>
                    <TopMenu islogin={isAuthenticated}  />
                </Toolbar>
           
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawOpen,
                    [classes.drawerClose]: !drawOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawOpen,
                        [classes.drawerClose]: !drawOpen,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />

                <List className={classes.sidemenu}>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <AccountTreeIcon color="inherit"  />
                        </ListItemIcon>
                        <ListItemText className={classes.sidemenu} primary="Solutions" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                            <BootstrapTooltip title="Collabera Information Platform">
                                <ListItemText primary="CIP"/>
                            </BootstrapTooltip>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                            <BootstrapTooltip title="Collabera DevOps Platform">
                                <ListItemText primary="CDP"/>
                            </BootstrapTooltip>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                            <BootstrapTooltip title="Collabera Connectors MarketPlace">
                                <ListItemText primary="CCM"/>
                            </BootstrapTooltip>
                            </ListItem>
                            <ListItem button className={classes.nested}> 
                            <BootstrapTooltip title="Collabera Cloud Accelerators">
                                <ListItemText primary="CCA"/>
                            </BootstrapTooltip>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon><LinearScaleIcon color="inherit"  /> </ListItemIcon>
                        <ListItemText>{'Insights'}</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ContactSupportIcon color="inherit"  /> </ListItemIcon>
                        <ListItemText>{'Support'}</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><CodeIcon color="inherit"  /> </ListItemIcon>
                        <ListItemText>{'Developers'}</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><InfoIcon color="inherit"  /> </ListItemIcon>
                        <ListItemText>{'About'}</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PermPhoneMsgIcon color="white"  /> </ListItemIcon>
                        <ListItemText>{'ContactUs'}</ListItemText>
                    </ListItem>
                </List>               
            </Drawer>
        </div>

    );
}