export type RootTabParamList = {
  Browse: { screen: string };
  Home: undefined;
  'Current route': { routeKey: string | undefined };
};

export type StackParamList = {
  Browse: { tabNavigationNavigate: any };
  'Create route': { tabNavigationNavigate: any };
};
