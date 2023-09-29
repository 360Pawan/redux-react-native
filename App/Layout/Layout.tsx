import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const Layout = ({children}: PropsWithChildren) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffffe',
    flex: 1,
  },
});
