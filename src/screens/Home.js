import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import { addProducts, addSortedProducts } from '../actions/products'
import axios from 'axios';
class Home extends Component {
  static navigationOptions = {
    title: 'Products Grid',
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      seed: 1,
    }
    this.getProducts(this.state.seed);
  }
  componentDidMount() {

    console.log("props : ", this.props)
  }
  getProducts = (seed) => {
    axios.get("http://192.168.10.5:3000/api/products?_page=" + seed + "&_limit=15").then(response => {
      this.props.add(response.data)
      console.log("Products : ", this.props.products);
      this.setState({
        products: this.props.products
      })
    }).catch(error => {
      console.log("error", error);
    })
  }
  getSortedProducts = (type) => {
    axios.get("http://192.168.10.5:3000/api/products?_sort=" + type).then(response => {
      this.props.addSorted(response.data);
      this.setState({
        products: this.props.productsSorted
      })

    }).catch(error => {
      console.log("error", error);
    })
  }

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item, index }) => {
    var today = new Date();
    var createdOn = new Date(item.date);
    var msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0)

    var diff = (+today - +createdOn) / msInDay
    return (

      <View style={styles.itemStyle}>
        {(index > 0 && index % 20 === 0) ? <Image source={{ uri: "http://192.168.10.5:3000/api/ads/?r=" + Math.floor(Math.random() * 1000) }} style={{ height: 100, width: 180, alignSelf: "center" }} /> : null}
        <View style={styles.textStyle}>
          <Text>{diff > 7 ? item.date.slice(4, 15) : diff + " days ago"}</Text>
        </View>
        <View style={styles.textStyle}>
          <Text style={{ fontSize: item.size }}>{item.face}</Text>
        </View>
        <View style={styles.textStyle}>
          <Text>Price ${item.price}</Text>
        </View>
      </View>
    )
  }
  _onEndReached = () => {
    this.setState({
      seed: this.state.seed + 1
    }, () => {
      this.getProducts(this.state.seed);
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sortButtons}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            this.getSortedProducts("id");
          }}><Text style={styles.textButton}>Sort by id</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            this.getSortedProducts("size");
          }}><Text style={styles.textButton}>Sort by size</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            this.getSortedProducts("price");
          }}><Text style={styles.textButton}>Sort by price</Text></TouchableOpacity>
        </View>
        <FlatList
          data={this.state.products}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={2}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#606060"
  }, itemStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
  }, textStyle: {
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
  }, sortButtons: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    alignContent: "space-between", justifyContent: 'space-between',
  },
  buttonStyle: {
    borderRadius: 5,
    overflow: "hidden", backgroundColor: "white", color: "gray",
    marginRight: 5,
  }, textButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
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