import { StyleSheet } from 'react-native';
import { basicColors, routeLegColors } from './BasicColors';

export const currentRouteStyles = StyleSheet.create({
  background: {
    backgroundColor: basicColors.topBarLight,
    flex: 1,
  },
  topBar: {
    height: 50,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    zIndex: 1,
  },
  topBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: basicColors.topBarBackground,
    elevation: 1,
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
    flex: 1,
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
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: routeLegColors.light,
    elevation: 1,
  },
  legActiveModifier: {
    backgroundColor: routeLegColors.light,
    borderColor: 'red',
    elevation: 5,
  },
  legOldModifier: {
    backgroundColor: routeLegColors.lightVisited,
    borderColor: routeLegColors.lightVisited,
    elevation: 0,
  },
  legHeaderRow: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  legListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    paddingEnd: 5,
    textAlignVertical: 'bottom',
  },
  listText: {
    fontSize: 16,
    color: routeLegColors.charCoalText,
  },
});
