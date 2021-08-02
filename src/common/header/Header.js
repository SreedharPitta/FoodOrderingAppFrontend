import React from 'react';
import { Component } from 'react';
import './Header.css';
import { withStyles } from '@material-ui/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Search from '@material-ui/icons/Search';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

const styles = theme => ({
    appHeader: {
        height: '60px',
        backgroundColor: '#253238',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
    },
    appHeaderContent: {
        padding: '0px 15px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    appLogo: {
        color: '#fff',
        fontSize: '30px',
    },
    appLogoContainer: {
        width : '33%',
    },
    searchContainer: {
        width : '33%',
        
    },
    loginContainer: {
        width : '33%',
        textAlign : 'right'
    },
})

class Header extends Component {
     //This is to Handle My Account Click
     myAccountClickHandler = () => {
        this.props.history.push("/profile");
    }
    //This is to Handle Logout
    logoutClickHandler = () => {
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('first-name');
        this.setState({
            isLoggedIn: false
        })
        this.onMenuClose();
    }
    //This is Handle Menu Open
    openMenuHandler = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
            isMenuOpen: true
        });
    }
    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") === null ? false : true
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.appHeader}>
                <div className={classes.appHeaderContent}>
                    <div className={classes.appLogoContainer}>
                        <FastfoodIcon className={classes.appLogo} />
                    </div>
                    {this.props.showSearchBox && (
                        <div className={classes.searchContainer}>
                        <div className={classes.searchHolder}>
                            <Search />
                            <Input placeholder="Search by Restaurant Name" onChange={(e) => { this.props.restaurantSearchHandler(e.target.value) }} />
                        </div>
                        </div>
                    )}
                    <div className={classes.loginContainer}>
                        {!this.state.loggedIn ?
                            <div className={classes.loginBtnHolder}>
                                <Button variant="contained" color="default" startIcon={<AccountCircle />}
                                    onClick={this.loginModalHolder}>
                                    Login
                                </Button>
                            </div>
                            :
                            <div className={classes.profileHolder}>
                                <IconButton className={classes.profileIconButton} onClick={this.openMenuHandler}>
                                    <AccountCircle /> {sessionStorage.getItem("first-name")} </IconButton>
                                <Menu className={classes.menuHolder} open={this.state.isMenuOpen} onClose={this.closeMenuHandler} anchorEl={this.state.anchorEl} anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}>
                                    <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Header);