import React from 'react';
import { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/styles';
import Header from '../../common/header/Header';
import { ImageList } from '@material-ui/core';
import { ImageListItem } from '@material-ui/core';
import { Restaurant } from '@material-ui/icons';

const styles = theme => ({

})
class Home extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            restaurantsCopy: []
        }
    }

    componentWillUnmount(){

    }

    componentDidMount() {
            let data = null;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    let restaurants = JSON.parse(this.responseText).restaurants;
                    that.setState({
                        restaurants: restaurants,
                        restaurantsCopy : restaurants
                    });
                }
            });
            xhr.open("GET", this.props.baseUrl + "restaurant");
            xhr.send(data)
    }

    //This is for Restaurants Filter on the UI side
    restaurantSearchHandler = (searchKey) => {
        console.log("Entered here for restaurant filter");
        let restaurantList = this.state.restaurantsCopy;
        if (searchKey === '') {
            restaurantList = this.state.restaurantsCopy;
        } else {
            let restaurants = this.state.restaurantsCopy;
            let searchedRestaurants = []
            //Filter By Name
            if (restaurants !== undefined && restaurants.length > 0) {
                restaurants = restaurants.filter((restaurant) => {
                    if (restaurant.name !== undefined) {
                        let name = restaurant.name.toLowerCase();
                        let enteredKey = searchKey.toLowerCase();
                        if (name.includes(enteredKey)) {
                            searchedRestaurants.push(restaurant);
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                })
            }
            this.setState({
                restaurants: searchedRestaurants
            })
        }
        this.setState({
            restaurants: restaurantList
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header title="Food Ordering App" showSearchBox={true} history={this.props.history} restaurantSearchHandler={this.restaurantSearchHandler} />
                <div>
                    {this.state.restaurants !== null && this.state.restaurants.length > 0 ?
                        <ImageList rowHeight={'auto'} cols={2} className={classes.gridListHolder}>
                            {this.state.restaurants.map((item, index) => (
                                <ImageListItem key={'restaurant' + item.id} cols={item.cols || 1}>
                                    <Restaurant restaurant={item} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        : <div className={classes.noRestaurantsText}>No Restaurants Found</div>}
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Home);