import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { addProducts, addSortedProducts } from '../actions/products'
import axios from 'axios';
import { BASEURL, SORT_BY_ID, SORT_BY_PRICE, SORT_BY_SIZE, PRICE_IN_DOLLAR } from '../constants/GlobalConstants'
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
		}
		this.getProducts(this.state.seed);
	}
	// get products to display in grid
	getProducts = (seed) => {
		axios.get(BASEURL + "products?_page=" + seed + "&_limit=15")
			.then(response => {
				this.props.add(response.data)
				this.setState({
					products: this.props.products,
					isLoading: false,
					isFetchingData: false
				})
			})
			.catch(error => {
				console.log("error", error);
			})
	}
	// get all sorted products according to sorting type
	getSortedProducts = (type) => {
		this.setState({
			isLoading: true
		})
		axios.get(BASEURL + "products?_sort=" + type)
			.then(response => {
				this.props.addSorted(response.data);
				this.setState({
					products: this.props.productsSorted,
					isLoading: false
				})

			})
			.catch(error => {
				console.log("error", error);
			})
	}

	_keyExtractor = (item, index) => item.id;
	// render single product that displayed in grid
	_renderItem = ({ item, index }) => {
		return (
			<View style={styles.itemStyle}>
				{(index > 0 && index % 20 === 0) ?
					<Image
						source={{ uri: BASEURL + "ads/?r=" + Math.floor(Math.random() * 1000) }}
						style={{
							height: 100,
							width: 180,
							alignSelf: "center"
						}}
					/>
					: null}
				<View style={styles.textStyle}>
					<Text>{this.checkDateDifference(item) > 7 ?
						item.date.slice(4, 15)
						: this.checkDateDifference(item) + " days ago"}
					</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{ fontSize: item.size }}>
						{item.face}
					</Text>
				</View>
				<View style={styles.textStyle}>
					<Text>
						{PRICE_IN_DOLLAR}{item.price}
					</Text>
				</View>
			</View>
		)
	}
	// check date difference
	checkDateDifference = (item) => {
		var today = new Date();
		var createdOn = new Date(item.date);
		var msInDay = 24 * 60 * 60 * 1000;
		createdOn.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0)
		return diff = (+today - +createdOn) / msInDay
	}
	// handles load more items.
	_onEndReached = () => {
		this.setState({
			seed: this.state.seed + 1,
			isFetchingData: true
		}, () => {
			this.getProducts(this.state.seed);
		})
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
								onEndReachedThreshold={0.1}
							/>}
				</View>
				{
					this.state.isFetchingData ? <ActivityIndicator size="large" color="gray" /> : null
				}
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
	}, itemStyle: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		marginHorizontal: 10,
		marginVertical: 5,
		borderRadius: 10,
		overflow: "hidden"
	}, textStyle: {
		alignSelf: "center",
		textAlign: "center",
		flex: 1,
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

const mapStateToProps = state => {
	return {
		products: state.products.products,
		productsSorted: state.productsSorted.products
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home)