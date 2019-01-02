import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import * as treenilista from "./treenit.json";

import { Font, AppLoading } from "expo";
import {
  Button,
  Container,
  Header,
  Footer,
  FooterTab,
  Content,
  Form,
  Item,
  Picker,
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

var BUTTONS = [
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
  "Sunnuntai"
];

var infoData = "Palaute: matias.raisanen@gmail.com"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.weekdays = [
      "Maanantai",
      "Tiistai",
      "Keskiviikko",
      "Torstai",
      "Perjantai",
      "Lauantai",
      "Sunnuntai",
      "Koko viikko"
    ];
    var dt = new Date();

    var day = dt.getDay();

    if (day == 0) {
      day = 7;
    }

    this.state = { isModalVisible: false, loading: true, day: day - 1 };
  }

  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  onDayChange(value) {
    this.setState({
      day: value
    });
  }

  createList(day) {
    cardItems = day.lessons.map(lesson => (
      <CardItem bordered key={lesson.id}>
        <Left>
          <Text note>
            {lesson.start} - {lesson.end}
          </Text>
        </Left>
        <Body style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
          
        <Icon
            active
            type="FontAwesome"
            name="circle"
            style={{ color: lesson.color}}
          />
          </Body>
          <Body>
          <Text >{lesson.name}</Text>
          
        </Body>
        
      </CardItem>
    ));

    return <Card>{cardItems}</Card>;
  }

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

          <Header>
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
                    {this.weekdays[this.state.day]}
                  </Text>
                </Left>

                <Right>
                  <Button
                    info
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: BUTTONS,
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

            {this.createList(treenilista.days[this.state.day])}
          </Content>
          <Footer>
            <FooterTab>
              <Button vertical>
            <Icon
            type="FontAwesome" 
            name='info-circle' 
            style={{ color: "white"}}
            onPress={() => alert(infoData)}
            />
            <Text>Info</Text>
            </Button>
            </FooterTab>
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
  headingItem: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  headingText: {
    fontSize: 20,
    color: "blue",
    fontWeight: "bold"
  },
  cardMiddle: {
    flexDirection: "row",
  },
});
