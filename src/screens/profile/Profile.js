import React from 'react';
import { Component } from 'react';
import './Profile.css';
import { withStyles } from '@material-ui/styles';
import Header from '../../common/header/Header';

const styles = theme => ({

})

class Profile extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        if (sessionStorage.getItem('access-token') === null) {
            this.props.history.push('/');
        }
        return (
            <div>
                <Header title="Food Ordering App" showSearchBox={false} history={this.props.history} restaurantSearchHandler={this.restaurantSearchHandler} />
                <div style={{textAlign : 'center', padding : '20px 0px'}}>User Profile</div>
            </div>
        )
    }
}
export default withStyles(styles)(Profile);