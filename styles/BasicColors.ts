import { StatusBar, StyleSheet } from 'react-native';

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=B9F6CA&secondary.color=E64A19
export const basicColors = {
  transparent: 'rgba(0, 0, 0, 0)',
  background: 'light-gray',
  topBarBackground: '#88c399',
  topBarLight: '#b9f6ca',
};

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=9E9E9E
export const routeLegColors = {
  light: '#ff7d47',
  normal: '#e64a19',
  lightVisited: '#cfcfcf',
  normalVisited: '#9e9e9e',
  charCoalText: '#333366',
};

export const basicStyles = StyleSheet.create({
  background: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: StatusBar.currentHeight,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 25,
    backgroundColor: basicColors.topBarLight,
  },
  charcoalHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: routeLegColors.charCoalText,
  },
  whiteHeader: {
    flexShrink: 1,
    fontSize: 24,
    color: 'white',
  },
  charcoalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: routeLegColors.charCoalText,
  },
});

export const listStyles = StyleSheet.create({
  listContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: basicColors.topBarBackground,
  },
  listHeader: {
    fontSize: 24,
    color: routeLegColors.charCoalText,
    borderBottomWidth: 1,
    borderColor: routeLegColors.normal,
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: routeLegColors.normal,
  },
  listItemHeader: {
    fontSize: 18,
    color: routeLegColors.charCoalText,
  },
  listSeparator: {
    borderBottomWidth: 1,
    borderColor: routeLegColors.normal,
    minHeight: 1,
  },
});

export const listForm = StyleSheet.create({
  listTextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  fieldName: {
    ...listStyles.listItemHeader,
    flex: 1,
    fontWeight: 'bold',
  },
  fieldAnswer: {
    ...listStyles.listItemHeader,
    flex: 2,
    marginLeft: 6,
    borderBottomWidth: 1,
  },
});
