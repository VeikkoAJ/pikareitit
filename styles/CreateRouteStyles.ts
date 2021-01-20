import { StyleSheet } from 'react-native';
import { basicColors } from './BasicColors';

export const createRouteStyles = StyleSheet.create({
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  smallModal: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    maxWidth: '80%',
    maxHeight: '15%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: basicColors.topBarLight,
    elevation: 5,
  },
  largeModal: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80%',
    minHeight: '40%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: basicColors.topBarLight,
    elevation: 5,
  },
});
