import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  addScreenHeaderTitleStyle: {
    fontSize: 30,
    fontFamily: "serif",
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    marginBottom: 18
  },
  addScreenHeaderStyle: { height: height / 8 },
  separatorStyle: {
    height: 1,
    backgroundColor: "#d4d4d4"
  },
  headeRightStyle: { alignSelf: "center", padding: 20 },
  headeLeftStyle: { alignSelf: "center", padding: 20 },
  searchView: {
    backgroundColor: "black",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    textAlign: "justify",
    fontSize: 20,
    includeFontPadding: true
  },
  view: {
    padding: 20
  },
  noteScreenHeaderTitle:{
    fontSize: 30,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "black"
  },
  noteScreenHeaderStyle:{ height: height / 8 },
  noteScreenHeaderTitleLastUpdated: { fontSize: 10, color: "#d8d8d8" },
});
