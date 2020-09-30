import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import dog1 from './dog1.png';
import dog2 from './dog2.png';
import dog3 from './dog3.png';
import cat1 from './cat1.jpg';
import cat2 from './cat2.jpg';
import cat3 from './cat3.jpg';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(5),
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flexGrow: 1,
        width: '100%',
        height: 'auto',
    },
    message: {
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        padding: theme.spacing(2),
        background: '#F5F5F5',
    },
}));

// ヘッダー
function Header(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const names = ['Top', 'Dogs', 'Cats', 'Link'];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (newValue) => {
        setAnchorEl(null);
        props.onClick(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleClose(0)}>{names[0]}</MenuItem>
                        <MenuItem onClick={() => handleClose(1)}>{names[1]}</MenuItem>
                        <MenuItem onClick={() => handleClose(2)}>{names[2]}</MenuItem>
                        <MenuItem onClick={() => handleClose(3)}>{names[3]}</MenuItem>
                    </Menu>

                    <Typography variant="h6" className={classes.title}>
                        {names[props.value]}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// コンテンツ
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function Photos(props) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.paper}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <img src={props.value === 1 ? dog1: cat1} className={classes.image} alt="logo" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <img src={props.value === 1 ? dog2: cat2} className={classes.image} alt="logo" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <img src={props.value === 1 ? dog3: cat3} className={classes.image} alt="logo" />
            </TabPanel>
        </Paper>

    );

}
function Messages(props) {
    const classes = useStyles();
    return (
        <div className={classes.message}>
            {props.value === 0 ?
                <Typography variant="h6" className={classes.title}>ごあいさつ</Typography> :
                <Typography variant="h6" className={classes.title}>リンク集</Typography>
            }
            {props.value === 0 ? 'はじめまして。かわいい写真をごらんください。' :
                <a href='#'>ねこのしゃしんしゅう</a>
            }
        </div>
    );
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(newValue) {
        this.setState({ value: newValue });
    }
    render() {
        return (
            <div className="App">
                <Header onClick={this.handleClick} value={this.state.value} />
                {this.state.value === 0 || this.state.value === 3 ? <Messages value={this.state.value} /> : <Photos value={this.state.value} />}
            </div>
        );
    }
}



export default App;
