import React from "react";
import { Platform, StyleSheet, Linking } from "react-native";
import * as treenilista from "./treenit.json";
import { Font, AppLoading } from "expo";
import {
  Button,
  Container,
  Header,
  Footer,
  FooterTab,
  Content,
  Left,
  Body,
  Right,
  Title,
  Card,
  CardItem,
  Text,
  Icon,
  Root,
  ActionSheet
} from "native-base";

import Dialog, {
  ScaleAnimation,
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";

var WEEKDAYS = [
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
  "Sunnuntai"
];

// Email Anchor for info dialog
class Anchor extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Button danger iconleft onPress={this._handlePress}>
        <Icon active type="FontAwesome" name="envelope" />
        <Text>{this.props.title}</Text>
      </Button>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var dt = new Date();
    var day = dt.getDay();

    if (day == 0) {
      day = 6;
    } else {
      day--;
    }

    this.state = {
      selectedTreeni: "",
      selectedDescription: "",
      dialogVisible: false,
      infoDialogVisible: false,
      loading: true,
      day
    };
  }

  // Font fix for Expo
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  // Change day on button press
  onDayChange(value) {
    this.setState({
      day: value
    });
  }

  // Create CardItems for each lesson on the treenit.json for a given day
  createList(day, details) {
    cardItems = day.lessons.map(lesson => (
      <CardItem
        bordered
        key={lesson.id}
        button
        onPress={() => {
          this.setState({
            selectedTreeni: details[lesson.type].longname,
            selectedDescription: details[lesson.type].description,
            dialogVisible: true
          });
        }}
      >
        <Left>
          <Text note>
            {lesson.start} - {lesson.end}
          </Text>
        </Left>
        <Body
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Icon
            active
            type="FontAwesome"
            name="circle"
            style={{ color: details[lesson.type].color }}
          />
        </Body>
        <Body>
          <Text>{lesson.name}</Text>
        </Body>
      </CardItem>
    ));

    return <Card>{cardItems}</Card>;
  }

  // Render the app
  render() {
    if (this.state.loading) {
      return (
        <Container>
          <AppLoading />
        </Container>
      );
    }

    return (
      <Root>
        <Container
          style={{
            paddingTop:
              Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
          }}
        >
          <Header style={styles.htbcRedBG}>
            <Left />
            <Body>
              <Title>HTBC Treenikalenteri</Title>
            </Body>
          </Header>

          <Content padder>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Text style={styles.headingText}>
                    {WEEKDAYS[this.state.day]}
                  </Text>
                </Left>

                <Right>
                  <Button
                    danger
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: WEEKDAYS,
                          cancelButtonIndex: this.state.day
                        },
                        buttonIndex => {
                          this.setState({ day: buttonIndex });
                        }
                      )
                    }
                  >
                    <Text>Vaihda päivää</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>

            {this.createList(
              treenilista.schedule[this.state.day],
              treenilista.lesson_details
            )}

            <Dialog
              width={0.9}
              visible={this.state.dialogVisible}
              dialogTitle={<DialogTitle title={this.state.selectedTreeni} />}
              onTouchOutside={() => {
                this.setState({
                  dialogVisible: false,
                  selectedTreeni: "",
                  selectedDescription: ""
                });
              }}
              dialogAnimation={
                new ScaleAnimation({
                  toValue: 0,
                  useNativeDriver: true
                })
              }
              actions={[
                <DialogButton
                  style={styles.htbcRed}
                  text="SULJE"
                  textStyle={styles.htbcRed}
                  onPress={() => {
                    this.setState({
                      dialogVisible: false,
                      selectedTreeni: "",
                      selectedDescription: ""
                    });
                  }}
                />
              ]}
            >
              <DialogContent>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>{this.state.selectedDescription}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </DialogContent>
            </Dialog>
          </Content>
          <Footer>
            <FooterTab style={styles.htbcRedBG}>
              <Button
                vertical
                onPress={() => {
                  this.setState({ infoDialogVisible: true });
                }}
              >
                <Icon
                  type="FontAwesome"
                  name="info-circle"
                  style={{ color: "white" }}
                />
                <Text style={{ color: "white" }}>Info</Text>
              </Button>
            </FooterTab>

            <Dialog
              width={0.9}
              visible={this.state.infoDialogVisible}
              dialogTitle={<DialogTitle title="HTBC Treenikalenteri" />}
              onTouchOutside={() => {
                this.setState({ infoDialogVisible: false });
              }}
              dialogAnimation={
                new SlideAnimation({
                  toValue: 0,
                  slideFrom: "bottom",
                  useNativeDriver: true
                })
              }
              actions={[
                <DialogButton
                  text="SULJE"
                  textStyle={styles.htbcRed}
                  onPress={() => {
                    this.setState({ infoDialogVisible: false });
                  }}
                />
              ]}
            >
              <DialogContent>
                <Card>
                  <CardItem header bordered>
                    <Text style={styles.htbcRed}>Info</Text>
                  </CardItem>

                  <CardItem>
                    <Text>Sovelluksen kehittänyt Matias Räisänen.</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Text>
                      Helsinki Thaiboxing Club ei vastaa
                      treenikalenterisovelluksen kehityksestä.
                    </Text>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem header bordered>
                    <Text style={styles.htbcRed}>Ota yhteyttä</Text>
                  </CardItem>

                  <CardItem bordered>
                    <Body>
                      <Anchor
                        href="mailto:info@htbc.fi"
                        title="ota yhteyttä seuraan"
                      />
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Body>
                      <Text>Palaute sovelluksen kehittäjälle{"\n"}</Text>

                      <Anchor
                        href="mailto:matias.raisanen@gmail.com?subject=PALAUTE: HTBC treenikalenteri"
                        title="Palaute kehittäjälle"
                      />
                    </Body>
                  </CardItem>
                </Card>
              </DialogContent>
            </Dialog>
          </Footer>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  htbcRedBG: {
    backgroundColor: "#c41b1e"
  },
  headingItem: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  headingText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold"
  },
  cardMiddle: {
    flexDirection: "row"
  },
  htbcRed: {
    color: "#c41b1e"
  }
});
