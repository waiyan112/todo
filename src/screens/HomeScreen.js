import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard
} from "react-native";
import { createStructuredSelector } from "reselect";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import ListTile from "../components/ListTile";
import {
  taskDataCreate,
  taskDataDelete,
  taskDataUpdate
} from "../redux/actions/taskAction";
import { filter } from "../redux/actions/filterAction";
import { taskSelector } from "../redux/selectors/taskSelector";
import { filteredTaskaskSelector } from "../redux/selectors/filterSelector";

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
    this.searchTask = this.searchTask.bind(this);

    this.state = {
      enable: true,
      search: "",
      clear: true
    };
  }
  searchTask() {
    if (this.state.search != "") {
      if (this.state.clear) {
        this.props.filter(this.state.search, this.props.taskList);
        this.setState(prevState => ({
          clear: !prevState.clear
        }));
      } else {
        this.props.filter("", this.props.taskList);
        this.setState(prevState => ({
          clear: !prevState.clear,
          search: ""
        }));
      }
    }
    Keyboard.dismiss();
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
    console.log(this.props.filteredTask, "lknfjnjnjnn11111111");
    return (
      <View>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View
          style={{
            backgroundColor: "black",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TextInput
            onChangeText={search => this.setState({ search })}
            value={this.state.search}
            multiline={false}
            placeholder={"Start typing to search"}
            placeholderTextColor="#8d8a7d"
            style={{ color: "#fff" }}
          />
          <Icon
            onPress={this.searchTask}
            name={this.state.clear ? "search" : "times"}
            size={25}
            color={"#fff"}
            style={{ marginRight: 5 }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={this.props.style}
          data={
            this.state.clear ? this.props.taskList : this.props.filteredTask
          }
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
  taskList: taskSelector(),
  filteredTask: filteredTaskaskSelector()
});

export default connect(
  mapStateToProps,
  { taskDataCreate, taskDataDelete, taskDataUpdate, filter }
)(HomeScreen);

const styles = StyleSheet.create({
  separatorStyle: {
    height: 1,
    backgroundColor: "#d4d4d4"
  }
});
