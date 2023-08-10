import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { ListItem, SearchBar } from "@rneui/themed";
// import filter from "lodash.filter";
import { useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";


const DATA = [
  {
    id: "1",
    title: "MCB",
  },
  {
    id: "2",
    title: "SLT",
  },
  {
    id: "3",
    title: "ZOO",
  },
  {
    id: "4",
    title: "BOT",
  },
  {
    id: "5",
    title: "ANA",
  },
  {
    id: "6",
    title: "PUB",
  },
  {
    id: "7",
    title: "SOC",
  },
  {
    id: "8",
    title: "MTH",
  },
  {
    id: "9",
    title: "PHY",
  },
  {
    id: "10",
    title: "CSC",
  },
  {
    id: "11",
    title: "BIO",
  },
  {
    id: "111",
    title: "GSP",
  },
  {
    id: "12",
    title: "POL",
  },
  {
    id: "13",
    title: "ENG",
  },
  {
    id: "14",
    title: "ARA",
  },
  {
    id: "15",
    title: "LIS",
  },
  {
    id: "16",
    title: "ECO",
  },
  {
    id: "17",
    title: "ISL",
  },
  {
    id: "18",
    title: "PHM",
  },
  {
    id: "19",
    title: "PBH",
  },
  {
    id: "20",
    title: "LIT",
  },
  {
    id: "21",
    title: "CHEM",
  },
  {
    id: "22",
    title: "STA",
  },
];

const Item = ({ title }) => {
  return (
    <Pressable onPress={() => Alert.alert("", "Course not available yet")}>
      <View style={styles.item}>
        <Text style={{color:'brown'}}>{title}</Text>
      </View>
    </Pressable>
  );
};

const renderItem = ({ item }) => <Item title={item.title} />;


class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  render() {
    return (
      <View style={styles.container}>
          
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={28} style={{ color: "brown" }} />
          <TextInput
            placeholder="Search Here..."
            lightTheme
            round
            value={this.state.searchValue}
            onChangeText={(text) => this.searchFunction(text)}
            autoCorrect={false}
            placeholderTextColor="brown"
            style={{
              marginLeft: 20,
              width: "89%",
              color: "grey",
            }}
          />
          
        </View>

        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default SearchScreen;


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  inputContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: "#ff7f50",
    borderRadius: 20,
  
  },
});
