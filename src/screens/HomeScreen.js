import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { createStructuredSelector } from "reselect";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import ListTile from "../components/ListTile";
import list from "../assets/DataList";
import {
  taskDataCreate,
  taskDataDelete,
  taskDataUpdate
} from "../redux/actions/taskAction";
import { taskSelector } from "../redux/selectors/taskSelector";

const { height, width } = Dimensions.get("window");

class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: "To Do",
      headerStyle: { height: height / 8 },
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: "serif",
        fontWeight: "bold",
        justifyContent: "center",
        alignSelf: "center"
      },
      headerLeft: params.headerLeft,
      headerRight: params.headerRight
    };
  };
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    // this.updateState = this.updateState.bind(this);
    // this.pushNote = this.pushNote.bind(this);
    // this.updateNote = this.updateNote.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      data: list
    };
  }

  renderSeparator() {
    return <View style={styles.separatorStyle} />;
  }

  //   updateNote(item) {
  //     let data = [...this.state.data];
  //     data.forEach(i => {
  //       if (i.title == item.title) {
  //         i.note = item.note;
  //       }
  //     });
  //     this.setState({
  //       data: data
  //     });
  //     this.props.navigation.dispatch(NavigationActions.back());
  //     this.props.navigation.dispatch(NavigationActions.back());
  //   }

  //   pushNote(item) {
  //     let data = [...this.state.data];
  //     if (item.title != "" && item.note != "") {
  //       data.push(item);
  //       this.setState({
  //         data: data
  //       });
  //     }
  //     this.props.navigation.dispatch(NavigationActions.back());
  //   }

  componentDidMount() {
    let headerRight = (
      <TouchableOpacity
        style={{ alignSelf: "center", padding: 20 }}
        onPress={() =>
          this.props.navigation.navigate("add", {
            length: this.props.taskList.length
          })
        }
      >
        <Icon name="plus" size={25} color="black" />
      </TouchableOpacity>
    );
    let headerLeft = (
      <TouchableOpacity
        style={{ alignSelf: "center", padding: 20 }}
        onPress={() => this.props.navigation.toggleDrawer()}
      >
        <Icon name="bars" size={25} color="black" />
      </TouchableOpacity>
    );
    this.props.navigation.setParams({
      headerLeft,
      headerRight
    });
  }

  //   updateState(title, type) {
  //     if (type == "delete") {
  //       const data = this.state.data.filter(item => item.title != title);
  //       this.setState({
  //         data: data
  //       });
  //     } else {
  //       let data = [...this.state.data];
  //       data.forEach(item => {
  //         if (item.title == title) {
  //           type == "fav" ? (item.fav = !item.fav) : (item.heart = !item.heart);
  //         }
  //       });

  //       this.setState({
  //         data: data
  //       });
  //     }
  //   }

  setScrollEnabled(enable) {
    this.setState({
      enable
    });
  }

  renderItem(item) {
    return (
      <ListTile
        item={item}
        taskDataDelete={this.props.taskDataDelete}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={this.props.style}
          data={this.props.taskList}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => this.renderItem(item)}
          scrollEnabled={this.state.enable}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  taskList: taskSelector()
});

export default connect(
  mapStateToProps,
  { taskDataCreate, taskDataDelete, taskDataUpdate }
)(HomeScreen);

const styles = StyleSheet.create({
  separatorStyle: {
    height: 1,
    backgroundColor: "#d4d4d4"
  }
});
