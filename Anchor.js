import React from "react";
import Linking from "react-native";
import { Button, Icon, Text } from "native-base";

// Email Anchor for info dialog
class Anchor extends React.Component {
  constructor(props) {
    super(props);
  }
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Button danger iconleft onPress={this._handlePress}>
        <Icon active type="MaterialIcons" name="email" />
        <Text>{this.props.title}</Text>
      </Button>
    );
  }
}

export default Anchor;
