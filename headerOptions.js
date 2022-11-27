import {stackStyle} from './components/theme';

export const headerOption = (title) => {
    return {
      title: title,
      headerBackTitleVisible: false,
      headerBackButtonMenuEnabled: true,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: stackStyle.bg,    
      },
      headerTintColor: stackStyle.color,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    };
  };