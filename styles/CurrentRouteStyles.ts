import { StatusBar, StyleSheet } from 'react-native';
import { basicColors, routeLegColors } from './BasicColors';

export const currentRouteStyles = StyleSheet.create({
  background: {
    backgroundColor: basicColors.topBarLight,
    marginTop: StatusBar.currentHeight,
  },
  topBar: {
    height: 50,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    zIndex: 1,
    elevation: 1,
    flexWrap: 'nowrap',
  },
  topBarMinuteItem: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    backgroundColor: basicColors.topBarBackground,
    flexShrink: 10,
    borderColor: 'white',
  },
  topBarMinuteText: {
    textAlign: 'center',
    flexShrink: 10,
    minWidth: 40,
    fontSize: 24,
    color: 'white',
    textAlignVertical: 'bottom',
  },
  errorLoadingRouteView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicText: {
    color: routeLegColors.charCoalText,
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingTop: 75,
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  legStatic: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: routeLegColors.light,
    borderRadius: 10,
    elevation: 1,
  },
  legPressable: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: routeLegColors.light,
    backgroundColor: routeLegColors.light,
    elevation: 1,
  },
  legActiveModifier: {
    backgroundColor: routeLegColors.light,
    borderColor: 'red',
    elevation: 5,
  },
  legDisabledModifier: {
    backgroundColor: routeLegColors.lightVisited,
    borderColor: routeLegColors.lightVisited,
    elevation: 0,
  },
  legHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  legListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 2,
    paddingHorizontal: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: routeLegColors.normal,
    borderRadius: 4,
    backgroundColor: routeLegColors.lightHighlight,
    elevation: 1,
  },
  headerText: {
    flexShrink: 1,
    fontSize: 22,
    color: 'white',
    paddingEnd: 5,
    textAlignVertical: 'bottom',
  },
  listTextCharcoal: {
    fontSize: 16,
    color: routeLegColors.charCoalText,
  },
  listTextPurple: {
    fontSize: 16,
    color: routeLegColors.charCoalText,
  },
  listTextGreen: {
    fontSize: 16,
    color: routeLegColors.greenText,
  },
});
