import { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking
} from "react-native";
import Rating from "./Rating";
import Icon from "react-native-vector-icons/FontAwesome";

const ItemCat = ({
    item,
}) => {

    const [isExpand, setIsExpand] = useState(false);
    const handleExpand = () => {
        setIsExpand(!isExpand);
    }

    return (
        <View>
            <TouchableOpacity style={[styles.container]}
                onPress={handleExpand}
            >
                <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                        {
                            item.image.url &&
                            <Image style={styles.ava} source={{ uri: item.image.url }} />
                        }
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.desc}>
                                <Text numberOfLines={1}>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.iconAccordion}>
                        {
                            isExpand ?
                                <Icon name="caret-up" size={20} color="#000" />
                                :
                                <Icon name="caret-down" size={20} color="#000" />
                        }
                    </View>
                </View>
            </TouchableOpacity>

            {/* expand */}
            {
                isExpand &&
                <View style={styles.expandWrapper}>
                    <View style={styles.expandHeader}>
                        {
                            item.image.url &&
                            <Image style={styles.avaExpand} source={{ uri: item.image.url }} />
                        }
                        <Text style={styles.nameExpand}>{item.name}</Text>
                    </View>
                    <View style={styles.expandSection}>
                        <Text style={styles.nameExpand}>About</Text>
                        <View>
                            <Text>{item.description}</Text>
                        </View>
                        {
                            item.cfa_url &&
                            <Text style={{ color: 'blue' }}
                                onPress={() => Linking.openURL(item.cfa_url)}>
                                More
                            </Text>
                        }
                    </View>
                    <View style={styles.expandSection}>
                        <Text style={styles.nameExpand}>Life Span</Text>
                        <Text>{item.life_span} years</Text>
                    </View>
                    <View style={styles.expandSection}>
                        <Text style={styles.nameExpand}>Place Of Origin</Text>
                        <Text>{item.origin}</Text>
                    </View>
                    <View style={styles.expandSection}>
                        <Text style={styles.nameExpand}>Temprament</Text>
                        <Text>{item.temperament}</Text>
                    </View>
                    <View style={styles.expandSection}>
                        <Text style={styles.nameExpand}>Breed Characteristics</Text>
                        <Rating
                            label="Adaptability"
                            rateValue={item.adaptability}
                        />
                        <Rating
                            label="Child Friendly"
                            rateValue={item.child_friendly}
                        />
                        <Rating
                            label="Grooming"
                            rateValue={item.grooming}
                        />
                        <Rating
                            label="Intelligence"
                            rateValue={item.intelligence}
                        />
                        <Rating
                            label="Social Needs"
                            rateValue={item.social_needs}
                        />
                        <Rating
                            label="Stranger Friendly"
                            rateValue={item.stranger_friendly}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

export default ItemCat;


const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 3,
        // backgroundColor: "lightgrey"

        // box shadow
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.4,
        elevation: 2,

        // borderBottomWidth: 1,
        // borderBottomColor: "rgba(0,0,0,.25)",

    },
    name: {
        fontSize: 18,
        fontWeight: "bold"
    },
    nameExpand: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30
    },
    ava: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    desc: {
        width: '80%',
    },
    active: {
        backgroundColor: "lightblue",
    },
    iconAccordion: {
        color: "#000"
    },


    // ==============expand styles==================
    expandWrapper: {
        backgroundColor: "#eee",
        // flexDirection: "row",
        // alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 20,
    },
    nameExpand: {
        fontSize: 18,
        fontWeight: "bold"
    },
    avaExpand: {
        width: 200,
        height: 150,
        borderRadius: 10,
        marginRight: 10
    },
    expandHeader: {
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    expandSection: {
        marginBottom: 20
    }

});