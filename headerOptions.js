import {stackStyle} from './components/theme';

export const headerOption = (title) => {
    return {
      title: title,
      headerBackTitleVisible: false,
      headerBackButtonMenuEnabled: true,
      headerStyle: {
        backgroundColor: stackStyle.bg,
      },
      headerTintColor: stackStyle.color,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
    };
  };