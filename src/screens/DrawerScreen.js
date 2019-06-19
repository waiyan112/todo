import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { connect } from "react-redux";
import { USER_DEFAULT } from "../assets/index";

const { height, width } = Dimensions.get("window");

class DrawerScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            height: height * 0.2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey"
          }}
        >
          <Image
            style={{
              height: height * 0.1,
              width: height * 0.1,
              borderRadius: height * 0.05,
              borderColor: "#666666",
              marginLeft: width * 0.05
            }}
            source={USER_DEFAULT}
            resizeMode={"contain"}
          />
          <View style={{ flex: 1, marginLeft: width * 0.05 }}>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "bold"
              }}
              numberOfLines={1}
            >
              aayush agrawal
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  VIEW PROFILE
                </Text>
                <SimpleLineIcons
                  style={{ marginLeft: 5 }}
                  name="arrow-right"
                  size={10}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 20,
            borderTopColor: "grey",
            borderTopWidth: 2
          }}
        >
          <SimpleLineIcons
            style={{ marginLeft: width * 0.07 }}
            name="power"
            size={16}
            color="#222222"
          />
          <Text
            style={{
              marginLeft: width * 0.05,
              fontSize: 16,
              color: "#222222"
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  null
)(DrawerScreen);
