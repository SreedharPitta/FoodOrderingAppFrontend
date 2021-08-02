import React from 'react';
import { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    restaurantContainer: {
        width: '100%',
        backgroundColor: '#e7e7e7',
    },
    restaurantDetailsHolder: {
        padding: '25px',
    },
    restaurantInfoHolder: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    restaurantImageHolder: {

    },
    restaurantImage: {
        width: '300px',
        height: '200px',
    },
    restaurantAddlInfoHolder: {
        paddingLeft: '75px',
    },
    restaurantNameHolder: {
        fontSize: '30px',
        fontWeight: '500',
        marginBottom: '12px'
    },
    restaurantLocalityHolder: {
        fontSize: '18px',
        marginBottom: '12px',
    },
    restaurantCategoriesHolder: {
        fontSize: '16px',
        margin: '20px 0px',
    },
    ratingAndPriceHolder: {
        display: 'inline-flex',
        alignItems: 'center',
        marginTop: '0px'
    },
    avgRatingHolder: {
        maxWidth: '200px'
    },
    customerRatingDisplay: {
        marginBottom: '5px',
        paddingLeft: '5px'
    },
    customerCountHolder: {
        color: 'gray',
        fontSize: '12px',
    },
    avgPriceHolder : {
        marginLeft : '300px',
        maxWidth: '145px'
    },
    customerPriceDisplay : {
        marginBottom: '5px',
        paddingLeft: '5px'
    },
    customerPriceText : {
        color: 'gray',
        fontSize: '12px',
    },
    noRestaurantText: {
        textAlign: 'center',
        padding: '20px 0px',
    },
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
        const { classes } = this.props;
        let restaurant = this.state.restaurant;
        let restaurantCategories = '';
        return (
            <div>
                <Header title="Food Ordering App" showSearchBox={false} history={this.props.history} restaurantSearchHandler={this.restaurantSearchHandler} />
                <div className={classes.restaurantContainer}>
                    {this.state.restaurant !== null ?
                        <div className={classes.restaurantDetailsHolder}>
                            <div className={classes.restaurantInfoHolder}>
                                <div className={classes.restaurantImageHolder}>
                                    <img className={classes.restaurantImage} src={restaurant.photo_URL} alt={restaurant.restaurant_name} />
                                </div>
                                <div className={classes.restaurantAddlInfoHolder}>
                                    <div className={classes.restaurantNameHolder}>
                                        {restaurant.restaurant_name}
                                    </div>
                                    <div className={classes.restaurantLocalityHolder}>
                                        {restaurant.address.locality.toUpperCase()}
                                    </div>
                                    <div className={classes.restaurantCategoriesHolder}>
                                        {restaurant.categories.forEach(category => {
                                            restaurantCategories += category.category_name + ",";
                                        })}
                                        {restaurantCategories.substring(0, restaurantCategories.length - 1)}
                                    </div>
                                    <div className={classes.ratingAndPriceHolder}>
                                        <div className={classes.avgRatingHolder}>
                                            <div className={classes.customerRatingDisplay}>
                                                <i className="fa fa-star" aria-hidden="true"></i> {restaurant.customer_rating}
                                            </div>
                                            <div className={classes.customerCountHolder}>
                                                AVERAGE RATING BY <span>{restaurant.number_customers_rated}</span> CUSTOMERS
                                            </div>
                                        </div>
                                        <div className={classes.avgPriceHolder}>
                                            <div className={classes.customerPriceDisplay}>
                                                <i className="fa fa-inr"></i> {restaurant.average_price}
                                            </div>
                                            <div className={classes.customerPriceText}>
                                                AVERAGE COST FOR TWO PEOPLE
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className={classes.noRestaurantText}>No Restaurant Found for Id : {this.props.match.params.restaurantId}</div>}
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Details);