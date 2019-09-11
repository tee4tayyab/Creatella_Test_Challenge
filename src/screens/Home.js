import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { addProducts, addSortedProducts } from '../actions/products'
import axios from 'axios';
import { BASE_URL, SORT_BY_ID, SORT_BY_PRICE, SORT_BY_SIZE } from '../constants/GlobalConstants'
import GridProduct from '../components/gridProduct';
import FadeInView from '../components/FadeInView';
class Home extends Component {
	// header navigation Options
	static navigationOptions = {
		title: 'Products Grid ',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontFamily: ""
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			seed: 1,
			isLoading: true,
			isFetchingData: false,
			isSorting: false,
			endOfCatalogue: false
		}
		this.getProducts(this.state.seed);
	}
	// get products to display in grid
	getProducts = (seed) => {
		axios.get(BASE_URL + "products?_page=" + seed + "&_limit=15")
			.then(response => {
				console.log("END REACH PRODUCTS", response.data);
				if (response.data.length == 0) {
					this.setState({
						endOfCatalogue: true,
						isLoading: false,
						isFetchingData: false
					})
				} else {
					this.props.add(response.data)
					this.setState({
						products: this.props.products,
						isLoading: false,
						isFetchingData: false
					})
				}
			})
			.catch(error => {
				console.log("error", error);
			})
	}
	// get all sorted products according to sorting type
	getSortedProducts = (type) => {
		this.setState({
			isLoading: true,
			isSorting: true
		})
		axios.get(BASE_URL + "products?_sort=" + type)
			.then(response => {
				console.log("SORTED PRODUCTS", response.data);
				this.props.addSorted(response.data);
				this.setState({
					products: this.props.productsSorted,
					isLoading: false,
					endOfCatalogue: true
				})

			})
			.catch(error => {
				console.log("error", error);
			})
	}

	_keyExtractor = (item, index) => item.id;
	// render single product that displayed in grid
	// render the GridProduct in Pure Component.
	_renderItem = ({ item, index }) => {
		return (
			<GridProduct item={item} index={index} />
		)
	}
	// handles load more items.
	_onEndReached = () => {
		if (!this.state.isSorting) {
			this.setState({
				seed: this.state.seed + 1,
				isFetchingData: true
			}, () => {
				this.getProducts(this.state.seed);
			})
		}
	}
	// renders the UI in this Component
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.sortButtons}>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => {
							this.getSortedProducts("id");
						}}
					>
						<Text style={styles.textButton}>
							{SORT_BY_ID}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => {
							this.getSortedProducts("size");
						}}
					>
						<Text style={styles.textButton}>
							{SORT_BY_SIZE}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => {
							this.getSortedProducts("price");
						}}
					>
						<Text style={styles.textButton}>
							{SORT_BY_PRICE}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.listStyle}>
					{
						this.state.isLoading ?
							<ActivityIndicator size="large" color="gray" />
							:
							<FlatList
								data={this.state.products}
								extraData={this.state}
								keyExtractor={this._keyExtractor}
								renderItem={this._renderItem}
								numColumns={2}
								onEndReached={this._onEndReached}
								onEndReachedThreshold={this.state.endOfCatalogue ? 0 : 0.1}
								// List footer for End of Catalogue
								ListFooterComponent={this.state.endOfCatalogue ?

									<View style={styles.footer}>
										<Text style={styles.footerText}>
											~ end of catalogue ~
										</Text>
									</View>
									: null}
							/>}
				</View>
				{/* Loading Animation "Loading ..." */}
				<View style={styles.transparentBackground}>
					{
						this.state.isFetchingData ?
							<FadeInView>
								<View style={styles.footer}>
									<Text style={styles.footerText}>
										Loading ...
									</Text>
								</View>
							</FadeInView> : null
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#606060",
	}, listStyle: {
		flex: 1,
		justifyContent: "center",
	}, footer: {
		alignSelf: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		marginBottom: 5
	}, footerText: {
		color: "white",
		fontFamily: ""
		, fontSize: 16
	}, transparentBackground: {
		backgroundColor: "transparent"
	}, sortButtons: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 10,
		alignContent: "space-between",
		justifyContent: 'space-between',
	},
	buttonStyle: {
		borderRadius: 5,
		overflow: "hidden",
		backgroundColor: "white",
		color: "gray",
		marginRight: 5,
	}, textButton: {
		marginHorizontal: 5,
		marginVertical: 5,
		textAlign: "center",
		fontSize: 15,
		fontWeight: "bold",
		fontFamily: ""
	}
})

// funtion to retrieve Data from store by Connecting to store.

const mapStateToProps = state => {
	return {
		products: state.products.products,
		productsSorted: state.productsSorted.products
	}
}

// funtion to dispatch Data to Store Via Reducer Function.

const mapDispatchToProps = dispatch => {
	return {
		add: (products) => {
			dispatch(addProducts(products))
		},
		addSorted: (products) => {
			dispatch(addSortedProducts(products))
		}
	}
}

// connect REDUX STORE to React Component.

export default connect(mapStateToProps, mapDispatchToProps)(Home)