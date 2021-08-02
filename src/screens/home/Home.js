import React from 'react';
import { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/styles';
import Header from '../../common/header/Header';

const styles = theme => ({

})
class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    restaurantSearchHandler = (searchKey) =>({

    });
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header title="Food Ordering App" showSearchBox = "true" history={this.props.history} restaurantSearchHandler={this.restaurantSearchHandler} />
                <div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Home);