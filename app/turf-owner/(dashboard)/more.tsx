import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconFamily: 'MaterialIcons' | 'Ionicons';
  color: string;
  route?: string;
  action?: () => void;
}

export default function MoreScreen() {
  const router = useRouter();

  const handleAddTurf = () => {
    router.push('/turf-owner/add-turf');
  };

  const handleMyTurfs = () => {
    Alert.alert('My Turfs', 'List of all your turfs will be shown here');
  };

  const handleAccount = () => {
    Alert.alert('Account', 'Account settings will open here');
  };

  const handleAnalytics = () => {
    Alert.alert('Analytics', 'Detailed analytics and reports will be shown here');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Notification settings will open here');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support or view FAQs');
  };

  const handleAbout = () => {
    Alert.alert('About', 'App version 1.0.0\nDeveloped by Spoortx Team');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          router.replace('/');
        },
      },
    ]);
  };

  const mainMenuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Add New Turf',
      icon: 'add-business',
      iconFamily: 'MaterialIcons',
      color: '#4CAF50',
      action: handleAddTurf,
    },
    {
      id: '2',
      title: 'My Turfs',
      icon: 'business',
      iconFamily: 'MaterialIcons',
      color: '#2196F3',
      action: handleMyTurfs,
    },
    {
      id: '3',
      title: 'Analytics & Reports',
      icon: 'analytics',
      iconFamily: 'MaterialIcons',
      color: '#FF9800',
      action: handleAnalytics,
    },
  ];

  const settingsMenuItems: MenuItem[] = [
    {
      id: '4',
      title: 'Account Settings',
      icon: 'person',
      iconFamily: 'Ionicons',
      color: '#9C27B0',
      action: handleAccount,
    },
    {
      id: '5',
      title: 'Notifications',
      icon: 'notifications',
      iconFamily: 'Ionicons',
      color: '#F44336',
      action: handleNotifications,
    },
    {
      id: '6',
      title: 'Help & Support',
      icon: 'help-circle',
      iconFamily: 'Ionicons',
      color: '#00BCD4',
      action: handleSupport,
    },
    {
      id: '7',
      title: 'About',
      icon: 'information-circle',
      iconFamily: 'Ionicons',
      color: '#607D8B',
      action: handleAbout,
    },
  ];

  const renderMenuItem = (item: MenuItem, isLarge: boolean = false) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.menuItem, isLarge && styles.menuItemLarge]}
        onPress={item.action}
        activeOpacity={0.7}
      >
        <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
          {item.iconFamily === 'MaterialIcons' ? (
            <MaterialIcons name={item.icon as any} size={isLarge ? 32 : 24} color={item.color} />
          ) : (
            <Ionicons name={item.icon as any} size={isLarge ? 32 : 24} color={item.color} />
          )}
        </View>
        <Text style={[styles.menuTitle, isLarge && styles.menuTitleLarge]}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>More Options</Text>
          <Text style={styles.headerSubtitle}>Manage your business</Text>
        </View>
        <View style={styles.profileCircle}>
          <MaterialIcons name="business" size={30} color="#fff" />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Active Turfs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Main Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {mainMenuItems.map((item) => renderMenuItem(item, true))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings & Support</Text>
          {settingsMenuItems.map((item) => renderMenuItem(item))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={22} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLarge: {
    padding: 18,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  menuTitleLarge: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F44336',
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 20,
  },
});
