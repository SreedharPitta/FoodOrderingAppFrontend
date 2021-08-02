import React from 'react';
import { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/styles';
import { Badge, Button, Card, CardContent, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import SnackBarNotification from '../../common/snackbar/SnackBarNotification';
import { Add, Remove, ShoppingCart } from '@material-ui/icons';

const styles = theme => ({
    restaurantContainer: {
        width: '100%',
        backgroundColor: '#e7e7e7',
    },
    restaurantDetailsHolder: {
        padding: '0px',
    },
    restaurantInfoHolder: {
        padding: '25px',
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
    avgPriceHolder: {
        marginLeft: '300px',
        maxWidth: '145px'
    },
    customerPriceDisplay: {
        marginBottom: '5px',
        paddingLeft: '5px'
    },
    customerPriceText: {
        color: 'gray',
        fontSize: '12px',
    },
    restaurantItemsHolder: {
        backgroundColor: '#fff',
        padding: '35px 75px',
        display: 'inline-flex',
    },
    restaurantMenuItemsHolder: {
        width: '50%',
        lineHeight: '32px',
        fontSize: '14px',
    },
    categoryDivider: {
        marginBottom: '15px',
        marginTop: '5px',
        width: '90%',
    },
    noRestaurantText: {
        textAlign: 'center',
        padding: '20px 0px',
    },
    itemInfoContainer: {
        marginBottom: '8px',
        display: 'inline-flex',
        alignItems: 'center',
    },
    itemName: {
        fontSize: '15px',
    },
    itemPrice: {
        fontSize: '15px',
        fontWeight: '500',
    },
    restaurantCartHolder: {
        width: '42%',
        paddingLeft: '8%',
    },
    badge: {
        zIndex: '0',
        textAlign: 'center',
        fontStyle: 'normal'
    },
    cartItemListContainer: {
        paddingTop: '20px'
    },
    checkOutBtnHolder: {
        textAlign: 'center',
    },
    checkOutBtn: {
        width: '100%',
        marginTop: '8px',
    },
    cartAddRemoveHolder: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartItemHolder: {
        display: 'inline-flex',
        alignItems: 'center',
    }
})

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: null,
            categories: [],
            orderItems: { id: null, items: [], total: 0 },
            cartItems: [],
            cartItem: {},
            totalAmount: 0,
            totalItems: 0,
            cartEmpty: false,
            cartItemAdded: false,
            notloggedIn: false,
            itemQuantityDecreased: false,
            itemRemovedFromCart: false,
            itemQuantityIncreased: false
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
                    restaurant: restaurant,
                    categories: restaurant.categories,
                });
            }
        });
        xhr.open("GET", this.props.baseUrl + "restaurant/" + this.props.match.params.restaurantId);
        xhr.send(data)
    }

    //To Capitalize and show Menu Items
    capitalize(str) {
        var arr = str.split(" ");
        var camelCasedString = "";
        arr.map(a => (
            camelCasedString += a.charAt(0).toUpperCase() + a.slice(1) + " "
        ))
        return camelCasedString;
    }

    //To add items to Cart from Menu
    addItemToCartHandler(e, itemId, itemName, itemType, itemPrice) {
        var totalAmount = this.state.totalAmount;
        var totalItems = this.state.totalItems;
        totalItems += 1;

        const newItem = this.state.cartItem;
        newItem.id = itemId;
        newItem.type = itemType;
        newItem.name = itemName;
        newItem.pricePerItem = itemPrice;
        newItem.quantity = 1;
        newItem.totalItemPrice = itemPrice;

        this.setState({ cartItem: newItem });
        totalAmount += itemPrice;

        if (this.state.orderItems.items !== undefined && this.state.orderItems.items.some(item => (item.name === itemName))) {
            var index = this.getItemIndex(itemName, this.state.orderItems.items, "name");
            var quantity = this.state.orderItems.items[index].quantity + 1;
            var totalItemPrice = this.state.orderItems.items[index].totalItemPrice + this.state.orderItems.items[index].pricePerItem;
            var item = this.state.orderItems.items[index];
            item.quantity = quantity;
            item.totalItemPrice = totalItemPrice;
            this.setState(item);

        } else {
            this.state.cartItems.push(this.state.cartItem);
            this.setState({ cartItem: {} });
            const orderItems = this.state.orderItems;
            orderItems.items = this.state.cartItems;
            this.setState({ orderItems: orderItems });
        }
        this.setState({ cartItemAdded: true });
        this.setState({ totalItems: totalItems });
        this.setState({ totalAmount: totalAmount });
    }

    //This is to increase quantity of a Item from Cart
    addItemFromCartHandler = (item, index) => {
        const itemIndex = this.getItemIndex(item.name, this.state.orderItems.items, "name");
        var quantity = this.state.orderItems.items[itemIndex].quantity + 1;
        var totalItemPrice = this.state.orderItems.items[itemIndex].totalItemPrice + this.state.orderItems.items[itemIndex].pricePerItem;
        var itemAdded = this.state.orderItems.items[itemIndex];
        itemAdded.quantity = quantity;
        itemAdded.totalItemPrice = totalItemPrice;
        this.setState(item);
        this.setState({ itemQuantityIncreased: true });
        var totalAmount = this.state.totalAmount;
        totalAmount += item.pricePerItem;
        var totalItems = this.state.totalItems;
        totalItems += 1;

        this.setState({ totalItems: totalItems });
        this.setState({ totalAmount: totalAmount });
    }

    //To remove an Item from Cart
    removeItemFromCartHandler = (e, itemName, itemPrice) => {

        var index = this.getItemIndex(itemName, this.state.orderItems.items, "name");

        if (this.state.orderItems.items[index].quantity > 1) {
            var quantity = this.state.orderItems.items[index].quantity - 1;
            var totalItemPrice = this.state.orderItems.items[index].totalItemPrice - this.state.orderItems.items[index].pricePerItem;
            var item = this.state.orderItems.items[index];
            item.quantity = quantity;
            item.totalItemPrice = totalItemPrice;
            this.setState(item);
            this.setState({ itemQuantityDecreased: true });

        } else {
            this.state.orderItems.items.splice(index, 1);
            this.setState({ itemRemovedFromCart: true });
        }
        var totalAmount = this.state.totalAmount;
        totalAmount -= itemPrice;
        var totalItems = this.state.totalItems;
        totalItems -= 1;
        this.setState({ totalItems: totalItems });
        this.setState({ totalAmount: totalAmount });
    }

    //Function to get the index of the item
    getItemIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    //Restaurant Checkout Handler
    restaurantCheckoutHandler = () => {
        if (this.state.totalItems === 0) {
            this.setState({ cartEmpty: true });
        } else if (this.state.totalItems > 0 && sessionStorage.getItem('access-token') === null) {
            this.setState({ notloggedIn: true });
        } else {
            this.props.history.push({
                pathname: '/checkout/',
                state: {
                    orderItems: this.state.orderItems,
                    total: this.state.totalAmount, restaurantName: this.state.restaurant_name
                }
            })
        }
    }
    //This is to handle notification Snackbar
    notificationCloseHandler = () => {
        this.setState({ cartItemAdded: false })
        this.setState({ cartEmpty: false })
        this.setState({ notloggedIn: false })
        this.setState({ itemQuantityDecreased: false })
        this.setState({ itemRemovedFromCart: false })
        this.setState({ itemQuantityIncreased: false })
    }

    render() {
        const { classes } = this.props;
        let restaurant = this.state.restaurant;
        let categories = this.state.categories;
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
                                        {categories.forEach(category => {
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
                            <div className={classes.restaurantItemsHolder}>
                                <div className={classes.restaurantMenuItemsHolder}>
                                    {this.state.categories.map(category => (
                                        <div className={classes.categoryHolder} key={"category" + category.id}>
                                            <span>{category.category_name.toUpperCase()}</span>
                                            <Divider className={classes.categoryDivider} />
                                            {category.item_list.map(item => (
                                                <Grid container key={item.id} className={classes.itemInfoContainer}>
                                                    <Grid item xs={1} lg={1}>
                                                        {
                                                            item.item_type === "VEG" ?
                                                                <span className="fa fa-circle" aria-hidden="true"
                                                                    style={{ fontSize: "13px", color: "#5a9a5a" }} />
                                                                :
                                                                <span className="fa fa-circle" aria-hidden="true"
                                                                    style={{ fontSize: "13px", color: "#be4a47" }} />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={5} lg={6}>
                                                        <Typography>
                                                            <span
                                                                className={classes.itemName}>  {this.capitalize(item.item_name)} </span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} lg={2}>
                                                        <div className={classes.itemPrice}>
                                                            <span>
                                                                <i className="fa fa-inr"></i>
                                                                <span> {item.price.toFixed(2)}</span>
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={1} lg={1}>
                                                    </Grid>
                                                    <Grid item xs={2} lg={2}>
                                                        <IconButton style={{ padding: 0, float: 'left' }}
                                                            onClick={(e) => this.addItemToCartHandler(e, item.id, item.item_name, item.item_type, item.price)}>
                                                            <Add style={{ padding: 0 }} fontSize='medium' />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            )
                                            )}
                                        </div>
                                    )
                                    )}
                                </div>
                                <div className={classes.restaurantCartHolder}>
                                    <Card>
                                        <CardContent>
                                            <div style={{ fontWeight: "bold" }}>
                                                <i style={{ paddingRight: "20px" }}>
                                                    <Badge className={classes.badge} badgeContent={this.state.totalItems}
                                                        color="primary" showZero>
                                                        <ShoppingCart />
                                                    </Badge>
                                                </i>My Cart
                                            </div>
                                            <div className={classes.cartItemListContainer}>
                                                <Grid container>
                                                    {
                                                        this.state.orderItems.items !== undefined ?
                                                            this.state.orderItems.items.map((item, index) => (
                                                                <Grid container className={classes.cartItemHolder} key={item.id}>
                                                                    <Grid item xs={2} lg={2}>
                                                                        {item.type === "VEG" ?
                                                                            <span className="fa fa-stop-circle-o"
                                                                                aria-hidden="true"
                                                                                style={{
                                                                                    fontSize: "13px",
                                                                                    color: "#5a9a5a",
                                                                                    paddingRight: "10px"
                                                                                }} /> :
                                                                            <span className="fa fa-stop-circle-o"
                                                                                aria-hidden="true"
                                                                                style={{
                                                                                    fontSize: "13px",
                                                                                    color: "#be4a47",
                                                                                    paddingRight: "10px"
                                                                                }} />}
                                                                    </Grid>
                                                                    <Grid item xs={3} lg={4}>
                                                                        <Typography>
                                                                            {this.capitalize(item.name)}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={3} lg={3} style={{ flexWrap: "wrap" }}>
                                                                        <div className={classes.cartAddRemoveHolder}>
                                                                            <IconButton className={classes.cardAddRemoveItemBtn}
                                                                                onClick={(e) => this.removeItemFromCartHandler(e, item.name, item.pricePerItem)}><Remove
                                                                                    fontSize='medium'
                                                                                    style={{ color: 'black', fontWeight: "bold" }} /></IconButton>
                                                                            <Typography
                                                                                style={{ fontWeight: 'bold', fontSize: '17px' }}>{item.quantity}</Typography>
                                                                            <IconButton className={classes.cardAddRemoveItemBtn}

                                                                                onClick={this.addItemFromCartHandler.bind(this, item, index)}>
                                                                                <Add fontSize='medium' style={{
                                                                                    color: 'black',
                                                                                    fontWeight: "bold"
                                                                                }} /></IconButton>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4} lg={3}>
                                                                        <span style={{ float: 'right' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span> {item.totalItemPrice.toFixed(2)}</span>
                                                                        </span>
                                                                    </Grid>
                                                                </Grid>
                                                            )) : null}
                                                    <Grid item xs={8} lg={9}>
                                                        <div style={{ marginTop: 15, marginBottom: 15 }}>
                                                            <span style={{ fontWeight: 'bold' }}>TOTAL AMOUNT</span>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={4} lg={3}>
                                                        <div style={{ marginTop: 15, marginBottom: 15 }}>
                                                            <span style={{ fontWeight: 'bold', float: 'right' }}>
                                                                <i className="fa fa-inr icon-01"></i> {this.state.totalAmount.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} className={classes.checkOutBtnHolder}>
                                                        <Button className={classes.checkOutBtn} variant="contained" color="primary" onClick={this.restaurantCheckoutHandler}>
                                                            <Typography>CHECKOUT</Typography>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        : <div className={classes.noRestaurantText}>No Restaurant Found for Id : {this.props.match.params.restaurantId}</div>}
                    <SnackBarNotification open={this.state.cartItemAdded} notificationCloseHandler={this.notificationCloseHandler}
                        message="Item added to cart!" />
                    <SnackBarNotification open={this.state.cartEmpty} notificationCloseHandler={this.notificationCloseHandler}
                        message="Please add an item to your cart!" />
                    <SnackBarNotification open={this.state.itemQuantityDecreased} notificationCloseHandler={this.notificationCloseHandler}
                        message="Item quantity decreased by 1!" />
                    <SnackBarNotification open={this.state.notloggedIn} notificationCloseHandler={this.notificationCloseHandler}
                        message="Please login first!" />
                    <SnackBarNotification open={this.state.itemRemovedFromCart} notificationCloseHandler={this.notificationCloseHandler}
                        message="Item removed from cart!" />
                    <SnackBarNotification open={this.state.itemQuantityIncreased} notificationCloseHandler={this.notificationCloseHandler}
                        message="Item quantity increased by 1!" />
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Details);