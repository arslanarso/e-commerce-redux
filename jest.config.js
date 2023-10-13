module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    "^@react-native-async-storage/async-storage$":
      "<rootDir>/__mocks__/AsyncStorage.js",
  },
};
