// deno-lint-ignore-file

const CFG = require("./config");

function getButtonName(button) {
  return "flic_" + button.bdaddr.replace(new RegExp(":", "g"), "");
}

exports.getButtonName = getButtonName;

function getButtonFriendlyName(button, suffix) {
  var friendlyName = button.name == null ? getButtonName(button) : button.name;
  if (typeof suffix != "undefined") {
    friendlyName = friendlyName + " " + suffix;
  }
  return friendlyName;
}

exports.getButtonFriendlyName = getButtonFriendlyName;

exports.getBatteryIcon = function (batteryLevel) {
  if (batteryLevel >= 99) {
    return "mdi:battery";
  } else if (batteryLevel < 99 && batteryLevel > CFG.WARNING_BATTERY_LEVEL) {
    return "mdi:battery-" + batteryLevel / 10 + "0";
  } else if (batteryLevel <= CFG.WARNING_BATTERY_LEVEL) {
    return "mdi:battery-alert-variant-outline";
  }
};

exports.getConnectivityIcon = function (ready) {
  return ready ? "mdi:bluetooth" : "mdi:bluetooth-off";
};

var buttonEventTimestamps = {};

exports.initButtonEventTimestamp = function (button) {
  setButtonEventTimestamp(button, Date.now() - CFG.MIN_EVENTS_OFFSET);
};

function setButtonEventTimestamp(button, timestamp) {
  buttonEventTimestamps[getButtonName(button)] = timestamp;
}

exports.setButtonEventTimestamp = setButtonEventTimestamp;

exports.getButtonEventTimestamp = function (button) {
  const buttonName = getButtonName(button);
  if (buttonEventTimestamps.hasOwnProperty(buttonName)) {
    return buttonEventTimestamps[buttonName];
  }
  return 0;
};

exports.deleteButtonEventTimestamp = function (button) {
  const buttonName = getButtonName(button);
  if (buttonEventTimestamps.hasOwnProperty(buttonName)) {
    return delete buttonEventTimestamps[buttonName];
  }
  return false;
};
