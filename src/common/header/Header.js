import React from 'react';
import { Component } from 'react';
import './Header.css';
import { withStyles } from '@material-ui/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const styles = theme =>({
    appheader : {
        height: '65px',
        backgroundColor: '#253238',
        display: 'inline-flex',
        width: '100%',
        alignItems: 'center',
    },
    appHeaderContent : {
        padding : '0px 15px'
    },
    appLogo : {
        color : '#fff',
        fontSize : '30px'
    }
    
})

class Header extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn : sessionStorage.getItem("access-token") === null ? false : true
        }
    }
    render(){
        const {classes} = this.props
        return(
            <div className={classes.appheader}>
            <div className ={classes.appHeaderContent}>
            <div className={classes.appLogoHolder}>
                    <FastfoodIcon className={classes.appLogo}/>
            </div>
            </div>
            </div>
        )
    }
}
export default withStyles(styles) (Header);