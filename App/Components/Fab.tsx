import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {PropsWithChildren} from 'react';

const Fab = ({children, onPress}: PropsWithChildren<{onPress: () => void}>) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#ff5470',
    width: 60,
    height: 60,
    bottom: 30,
    right: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
