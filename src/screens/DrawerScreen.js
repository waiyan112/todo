import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { connect } from "react-redux";
import { USER_DEFAULT } from "../assets/index";
import styles from "./styles";


class DrawerScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.DrawerScreenParentView}>
        <View style={styles.DrawerScreenView}>
          <Image
            style={styles.ProfileImage}
            source={USER_DEFAULT}
            resizeMode={"contain"}
          />
          <View style={styles.DrawerScreenParentViewProfile}>
            <Text style={styles.DrawerScreenText} numberOfLines={1}>
              aayush agrawal
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <View style={styles.DrawerScreenViewProfile}>
                <Text style={styles.ViewProfileText}>VIEW PROFILE</Text>
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
        <TouchableOpacity style={styles.LogoutView}>
          <SimpleLineIcons
            style={styles.LogoutIcon}
            name="power"
            size={16}
            color="#222222"
          />
          <Text style={styles.LogoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  null
)(DrawerScreen);
