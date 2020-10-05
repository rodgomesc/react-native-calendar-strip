import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";

import moment from "moment";

import styles from "./Calendar.style.js";

class WeekSelector extends Component {
  static propTypes = {
    controlDate: PropTypes.any,
    iconComponent: PropTypes.any,
    iconContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    iconInstanceStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    iconStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
    size: PropTypes.number,
    onPress: PropTypes.func,
    weekStartDate: PropTypes.object,
    weekEndDate: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    // Extract iconComponent since JSON.stringify fails on React component circular refs
    let _nextProps = Object.assign({}, nextProps);
    let _props = Object.assign({}, this.props);

    delete _nextProps.iconComponent;
    delete _props.iconComponent;

    return (
      JSON.stringify(_props) !== JSON.stringify(_nextProps) ||
      this.props.iconComponent !== nextProps.iconComponent
    );
  }

  isEnabled(controlDate, weekStartDate, weekEndDate) {
    if (controlDate) {
      return !moment(controlDate).isBetween(
        weekStartDate,
        weekEndDate,
        "day",
        "[]"
      );
    }
    return true;
  }

  render() {
    const {
      controlDate,
      iconContainerStyle,
      iconComponent,
      iconInstanceStyle,
      iconStyle,
      imageSource,
      onPress,
      weekEndDate,
      weekStartDate,
      size,
      position,
    } = this.props;

    const enabled = this.isEnabled(controlDate, weekStartDate, weekEndDate);
    const opacity = { opacity: enabled ? 1 : 0 };

    let component;
    if (React.isValidElement(iconComponent)) {
      component = React.cloneElement(iconComponent, {
        style: [iconComponent.props.style, { opacity: opacity.opacity }]
      });
    } else if (Array.isArray(iconComponent)) {
      component = iconComponent;
    } else {
      let imageSize = { width: size, height: size };
      component = (
        <Image
          style={[
            styles.icon,
            imageSize,
            iconStyle,
            iconInstanceStyle,
          ]}
          source={imageSource}
        />
      );
    }
    const styleByPosition =  position ==='left' ? {position: 'absolute', left:2 } : {position:'absolute', right:2}
    return (
      <TouchableOpacity
        style={[styles.iconContainer, iconContainerStyle,styleByPosition]}
        onPress={onPress}
        disabled={!enabled}
      >

      </TouchableOpacity>
    );
  }
}

export default WeekSelector;
