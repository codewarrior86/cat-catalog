import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"

const Rating = ({ label, rateValue }) => {

    // const [defaultRating, setDefaultRating] = useState(rateValue);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);


    return (
        <View style={styles.ratingWrapper}>
            <Text>{label}</Text>
            <View style={styles.rateBar}>
                {
                    maxRating.map((item, index) =>
                        <View key={index} style={item <= rateValue ? styles.rateItemFilled : styles.rateItem} />
                    )
                }
            </View>
        </View>
    )
}

export default Rating;

const styles = StyleSheet.create({
    ratingWrapper: {
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rateBar: {
        flexDirection: "row",
        alignItems: "center",
    },
    rateItem: {
        backgroundColor: "lightgrey",
        width: 10,
        height: 10,
        borderRadius: 50,
        marginRight: 2
    },
    rateItemFilled: {
        backgroundColor: "green",
        width: 10,
        height: 10,
        borderRadius: 50,
        marginRight: 2
    }

});