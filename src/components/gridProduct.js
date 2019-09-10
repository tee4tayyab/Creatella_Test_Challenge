import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Image, } from 'react-native'
import { BASE_URL, PRICE_IN_DOLLAR } from '../constants/GlobalConstants'

export default class gridProduct extends PureComponent {
    checkDateDifference = (item) => {
        var today = new Date();
        var createdOn = new Date(item.date);
        var msInDay = 24 * 60 * 60 * 1000;
        createdOn.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0)
        return diff = (+today - +createdOn) / msInDay
    }
    render() {
        return (
            <View style={styles.itemStyle}>
                {(this.props.index > 0 && this.props.index % 20 === 0) ?
                    <Image
                        source={{ uri: BASE_URL + "ads/?r=" + Math.floor(Math.random() * 1000) }}
                        style={{
                            height: 100,
                            width: 180,
                            alignSelf: "center"
                        }}
                    />
                    : null}
                <View style={styles.textStyle}>
                    <Text>{this.checkDateDifference(this.props.item) > 7 ?
                        this.props.item.date.slice(4, 15)
                        : this.checkDateDifference(this.props.item) + " days ago"}
                    </Text>
                </View>
                <View style={styles.textStyle}>
                    <Text style={{ fontSize: this.props.item.size }}>
                        {this.props.item.face}
                    </Text>
                </View>
                <View style={styles.textStyle}>
                    <Text>
                        {PRICE_IN_DOLLAR}{parseFloat(this.props.item.price).toFixed(2)}
                    </Text>
                </View>
            </View>
        );
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