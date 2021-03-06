import React from 'react';
import { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/styles';
import Header from '../../common/header/Header';
import { Card, CardActionArea, CardContent, CardMedia, ImageList, Typography } from '@material-ui/core';
import { ImageListItem } from '@material-ui/core';

const styles = theme => ({
    restaurantsDetailsHolder: {
        margin: '0px',
        width: '100%',
        display: 'flex',
    },
    imageListHolder: {
        margin: '0px !important',
        padding: '0px 12px',
        justifyContent: 'flex-start',
        width: '100%',
    },
    imageListItemHolder: {
        padding: '0px 15px !important',
        margin: '15px 0px',
        width: 'auto',
        height: '380px !important',
        maxHeight: '380px !important',
    },
    restaurantCard: {
        cursor: 'pointer',
        border: '1px solid #e2e2e1',
        boxShadow: 'none',
        height: '98%',
    },
    noRestaurantsText: {
        textAlign: 'center',
        padding: '20px 25px',
    },
    cardContentHolder: {
        padding: '18px',
    },
    restaurantTitleHolder: {
        marginBottom: '35px',
    },
    restaurantAvgRatingHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    restaurantRatingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eacc5e',
        width: '35%',
        color: 'white',
        padding: '5px',
    },
    restaurantPriceHolder: {
        fontWeight: '500',
    }
});

class Home extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            restaurantsCopy: [],
            userSearch: false
        }
    }

    componentWillUnmount() {

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
                    restaurantsCopy: restaurants
                });
            }
        });
        xhr.open("GET", this.props.baseUrl + "restaurant");
        xhr.send(data)
    }

    //This is for Restaurants Filter on the UI side
    restaurantSearchHandler = (searchKey) => {
        let restaurantsList = this.state.restaurantsCopy;
        let that = this;
        let filteredRestaurants = null;
        let xhrFilteredRestaurants = new XMLHttpRequest();
        xhrFilteredRestaurants.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (!JSON.parse(this.responseText).restaurants) {
                    that.setState({
                        restaurants: null,
                        userSearch: true
                    });
                } else {
                    that.setState({
                        restaurants: JSON.parse(this.responseText).restaurants
                    });
                }
            }
        });
        if (searchKey === '') {
            that.setState({
                restaurants: restaurantsList
            });
        } else {
            let url = this.props.baseUrl + 'restaurant/name/' + searchKey;
            xhrFilteredRestaurants.open("GET", url);
            xhrFilteredRestaurants.send(filteredRestaurants);
        }

    };

    //To go to a restaurant
    restaurantViewDetailsHandler = (restaurantId) => {
        this.props.history.push('/restaurant/' + restaurantId);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header title="Food Ordering App" showSearchBox={true} history={this.props.history} restaurantSearchHandler={this.restaurantSearchHandler} />
                <div className={classes.restaurantsDetailsHolder}>
                    {this.state.restaurants !== null && this.state.restaurants.length > 0 ?
                        <ImageList rowHeight={'auto'} className={classes.imageListHolder} cols={4}>
                            {this.state.restaurants.map((restaurant, index) => (
                                <ImageListItem key={'restaurant' + restaurant.id} className={classes.imageListItemHolder}>
                                    <Card className={classes.restaurantCard} onClick={() => this.restaurantViewDetailsHandler(restaurant.id)}>
                                        <CardActionArea>
                                            <CardMedia component="img" height={160} image={restaurant.photo_URL} title={restaurant.restaurant_name} />
                                            <CardContent className={classes.cardContentHolder}>
                                                <div className={classes.restaurantTitleHolder}>
                                                    <Typography variant='h5' component='h2'>
                                                        {restaurant.restaurant_name}
                                                    </Typography>
                                                </div>
                                                <div className="restaurantCategoriesHolder">
                                                    <Typography variant='subtitle1' style={{ fontSize: '17px', lineHeight: '25px' }}>
                                                        {restaurant.categories}
                                                    </Typography>
                                                </div>
                                                <div className={classes.restaurantAvgRatingHolder}>
                                                    <div className={classes.restaurantRatingDiv}>
                                                        <Typography variant='body1' style={{ fontSize: '14px' }}>
                                                            <i className="fa fa-star" aria-hidden="true"></i> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.restaurantPriceHolder}>
                                                        <Typography variant='body1' style={{ fontSize: '15px' }}>
                                                            <i className="fa fa-inr"></i>{restaurant.average_price} for two
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </ImageListItem>
                            ))}
                        </ImageList>
                        : <div className={classes.noRestaurantsText}>{this.state.userSearch ? 'No Restaurants with the given name' : 'No Restaurants Found'}</div>}
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Home);