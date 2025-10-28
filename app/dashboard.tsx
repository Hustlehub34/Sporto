import React from 'react';
import { Redirect } from 'expo-router';

// Redirect to the new tabbed dashboard
export default function DashboardScreen() {
  return <Redirect href="/(dashboard)/home" />;
}