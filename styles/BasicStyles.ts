import { StatusBar, StyleSheet } from 'react-native';
import { basicColors, routeLegColors } from './BasicColors';

export const basicStyles = StyleSheet.create({
  base: {
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
  container: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: basicColors.topBarBackground,
  },
  header: {
    fontSize: 24,
    color: routeLegColors.charCoalText,
    borderBottomWidth: 1,
    borderColor: routeLegColors.normal,
  },
  item: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  itemHeader: {
    fontSize: 18,
    color: routeLegColors.charCoalText,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: routeLegColors.normal,
    minHeight: 1,
  },
});
export const listForm = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  fieldName: {
    ...listStyles.itemHeader,
    flex: 1,
    fontWeight: 'bold',
  },
  fieldAnswer: {
    ...listStyles.itemHeader,
    flex: 2,
    marginLeft: 6,
    borderBottomWidth: 1,
  },
});

export const Instructions = StyleSheet.create({
  header: {
    flexShrink: 1,
    fontSize: 24,
    color: routeLegColors.charCoalText,
  },
  subHeader: {
    flexShrink: 1,
    fontSize: 20,
    color: 'black',
  },
  text: {
    marginBottom: 5,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    color: 'black',
  },
});
