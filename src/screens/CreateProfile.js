import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
  ScrollView
} from "react-native";
import { createStructuredSelector } from "reselect";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { USER_DEFAULT } from "../assets/index";
import TextInputView from "../components/TextInputView";
import { openCamera, resize, openGallery } from "../assets/utils";
import ModalForImageSelection from "../components/ModalForImageSelection";
import ModalForProofSelection from "../components/ModalForProofSelection";
import {
  userDataCreate,
  userDataDelete,
  userDataUpdate
} from "../redux/actions/userAction";
import { userSelector } from "../redux/selectors/userSelector";
import { isEmpty, isValidEmail, isValidPhone } from "../assets/utils";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      number: "",
      idProof: "",
      image: "",
      showImageModal: false,
      cropMessage: "Crop your profile pic",
      showProofOption: false
    };
    this.createProfile = this.createProfile.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.openGallery = this.openGallery.bind(this);
    this.onSetProof = this.onSetProof.bind(this);
  }
  onSetProof(proof) {
    if (proof === "") {
      this.setState(prevState => ({
        showProofOption: !prevState.showProofOption
      }));
    } else {
      this.setState(prevState => ({
        showProofOption: !prevState.showProofOption,
        idProof: proof
      }));
    }
    Keyboard.dismiss();
  }
  openCamera() {
    const { cropMessage } = this.state;
    const self = this;
    openCamera(cropMessage).then(img => {
      const mimeType = img.mime;
      resize(img.path).then(image => {
        image.mime = mimeType;
        self.setState(prevState => ({
          showImageModal: !prevState.showImageModal
        }));
      });
    });
  }
  openGallery() {
    const { cropMessage } = this.state;
    const self = this;
    openGallery(cropMessage).then(img => {
      const mimeType = img.mime;
      resize(img.path).then(image => {
        image.mime = mimeType;
        self.setState(prevState => ({
          showImageModal: !prevState.showImageModal
        }));
      });
    });
  }
  updateImage() {
    this.setState(prevState => ({
      showImageModal: !prevState.showImageModal
    }));
  }
  createProfile() {
    const { name, number, email, image, idProof } = this.state;
    Keyboard.dismiss();
    const user = {
      name,
      number,
      email,
      image,
      idProof
    };
    this.props.userDataCreate(user);
    this.props.navigation.navigate("todo");
  }
  render() {
    console.log(this.props.userInfo, "kjfbbfbfh");
    const { name, number, email, image, idProof } = this.props.userInfo;
    return (
      <KeyboardAwareScrollView
        scrollEnabled
        style={{ backgroundColor: "#fff", flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: 16,
          paddingBottom: 24
        }}
        keyboardShouldPersistTaps="always"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ModalForImageSelection
            visible={this.state.showImageModal}
            onCancel={this.updateImage}
            openCamera={this.openCamera}
            openGallery={this.openGallery}
          />
          <ModalForProofSelection
            visible={this.state.showProofOption}
            onCancel={this.onSetProof}
            onSetProof={this.onSetProof}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 100, // 180
                height: 100, // 180
                borderRadius: 50,
                marginBottom: 10,
                borderWidth: 1
              }}
              //   source={ image === "" ? USER_DEFAULT : require(image)}
              source={USER_DEFAULT}
              resizeMode={"contain"}
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                borderRadius: 25,
                // color: '#000',
                backgroundColor: "grey",
                marginTop: -40,
                marginLeft: 50,
                padding: 5
              }}
              onPress={this.updateImage}
            >
              <MaterialIcons name="edit" size={16} color={"#222222"} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: "600",
                  lineHeight: 25
                }}
                numberOfLines={2}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#999999",
                  marginTop: 5,
                  lineHeight: 16
                }}
              >
                {email}
              </Text>
            </View>
          </View>
          <View>
            <TextInputView
              updateField={name => this.setState({ name })}
              value={name}
              multiline={false}
              fieldName={"Name"}
              keyboardType={"default"}
              placeHolder={"Aayush agrawal"}
            />
            <TextInputView
              updateField={email => this.setState({ email })}
              value={email}
              multiline={false}
              fieldName={"Email"}
              keyboardType={"email-address"}
              placeHolder={"mirus.aayush@gmail.com"}
            />
            <TextInputView
              updateField={number => this.setState({ number })}
              value={number}
              multiline={false}
              fieldName={"Mobile Number"}
              keyboardType={"number-pad"}
              placeHolder={"7518632093"}
            />
            <TextInputView
              updateField={() => {}}
              value={this.state.idProof}
              multiline={false}
              fieldName={"Identity Proof"}
              onFocus={() => this.onSetProof("")}
              placeHolder={"aadhar"}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={ isValidEmail(this.state.email) && isValidPhone(this.state.number) && !isEmpty(this.state.name) && !isEmpty(this.state.email) && !isEmpty(this.state.number) && !isEmpty(this.state.idProof) ? this.createProfile : null}>
          <View
            style={{
              padding: 15,
              marginHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              backgroundColor: "grey"
            }}
          >
            <Text style={{ color: "#222", fontSize: 16, fontWeight: "bold" }}>
              CREATE PROFILE
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  userInfo: userSelector()
});
export default connect(
  mapStateToProps,
  { userDataCreate, userDataDelete, userDataUpdate }
)(CreateProfile);
