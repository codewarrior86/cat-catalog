import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import ItemCat from './components/ItemCat';
import Icon from "react-native-vector-icons/FontAwesome";


export default function App() {

  const [catLists, setCatLists] = useState([]);
  const [filteredCat, setFilteredCat] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef()

  const toTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  const fetchCatLists = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://api.thecatapi.com/v1/breeds?limit=10&page=${currentPage}`);
      console.log(res);
      const data = res.data;
      // setCatLists(data);
      // setFilteredCat(catLists);
      setCatLists([...catLists, ...data]);

      if (searchText) {
        setFilteredCat([...filteredCat]);
      } else {
        setFilteredCat([...filteredCat, ...data]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCatLists();
  }, [currentPage])

  const renderLoader = () => {
    return (
      isLoading ?
        <View>
          <ActivityIndicator size="large" color="#aaa" style={{ marginVertical: 16, alignItems: "center" }} />
        </View> : null
    )
  }

  const loadMoreItemCat = () => {
    if (searchText) return;
    setCurrentPage(currentPage + 1);
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = catLists.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredCat(newData);
      setSearchText(text);
    } else {
      setFilteredCat(catLists);
      setSearchText(text);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cat Catalog</Text>
      </View>
      <SafeAreaView style={styles.safeAreaView}>

        {/* <ScrollView style={styles.scrollView}>
          {
            catLists?.map((cat, index) =>
              <ItemCat
                key={index}
                item={cat}
              />
            )
          }          
        </ScrollView> */}
        <View style={styles.boxSearch}>
          <Icon name="search" size={30} color="#000" />
          <TextInput
            style={styles.inputSearch}
            value={searchText}
            placeholder="Search by name..."
            onChangeText={(text) => searchFilter(text)}
          >
          </TextInput>
        </View>
        <FlatList
          ref={flatListRef}
          // data={catLists}
          data={filteredCat}
          renderItem={({ item }) => <ItemCat item={item} />}
          keyExtractor={(item, i) => i.toString()}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItemCat}
          onEndReachedThreshold={0.5}
        />

      </SafeAreaView>
      {/* <StatusBar style="auto" /> */}

      {/* Button scroll to top */}
      <TouchableOpacity style={styles.btnToTopWrapper} onPress={toTop}>
        <View style={styles.btnToTop}>
          <Icon name="chevron-up" size={25} color="#fff" solid />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  safeAreaView: {
  },
  scrollView: {
    marginHorizontal: 5,
  },
  header: {
    backgroundColor: "#rgb(0, 153, 204)",
    width: "100%",
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    marginTop: 80,
    color: "white"
  },
  boxSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginVertical: 20
  },
  inputSearch: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#006698"
  },

  btnToTopWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  btnToTop: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgb(0, 153, 204)"
  },

});
