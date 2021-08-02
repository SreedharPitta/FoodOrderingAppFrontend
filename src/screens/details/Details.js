import React from 'react';
import { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    noRestaurantText : {
        textAlign : 'center',
        padding : '20px 0px',
    }
})

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: null
        }
    }
    componentWillUnmount() {

    }

    //To fetch details of a restaurant
    componentDidMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let restaurant = JSON.parse(this.responseText);
                that.setState({
                    restaurant: restaurant
                });
            }
        });
        xhr.open("GET", this.props.baseUrl + "restaurant/" + this.props.match.params.restaurantId);
        xhr.send(data)
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header title="Food Ordering App" showSearchBox={true} history={this.props.history} restaurantSearchHandler={this.restaurantSearchHandler} />
                <div className={classes.restaurantDetailsHolder}>
                    {this.state.restaurant === null ?
                        <div></div>
                        : <div className={classes.noRestaurantText}>No Restaurant Found for Id : {this.props.match.params.restaurantId}</div>}
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Details);