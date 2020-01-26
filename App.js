import React from 'react';
import { StatusBar } from 'react-native';
import Router from './Router';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Router />
    </>
  );
}
