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
  iconType: 'MaterialIcons' | 'Ionicons';
  route?: string;
  action?: () => void;
  color?: string;
}

export default function MoreScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Clear user data and navigate to role selection
            router.replace('/roleSelection');
          },
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        {
          id: '1',
          title: 'My Profile',
          icon: 'person',
          iconType: 'MaterialIcons' as const,
          route: '/profile',
          color: '#4CAF50',
        },
        {
          id: '2',
          title: 'Payment History',
          icon: 'payment',
          iconType: 'MaterialIcons' as const,
          route: '/payment-history',
          color: '#2196F3',
        },
      ],
    },
    {
      title: 'Information',
      items: [
        {
          id: '3',
          title: 'Rules',
          icon: 'description',
          iconType: 'MaterialIcons' as const,
          route: '/rules',
          color: '#FF9800',
        },
      ],
    },
    {
      title: 'Rewards',
      items: [
        {
          id: '4',
          title: 'Refer and Earn',
          icon: 'gift',
          iconType: 'Ionicons' as const,
          route: '/refer-earn',
          color: '#9C27B0',
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          id: '5',
          title: 'Logout',
          icon: 'logout',
          iconType: 'MaterialIcons' as const,
          action: handleLogout,
          color: '#F44336',
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = item.iconType === 'MaterialIcons' ? MaterialIcons : Ionicons;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={() => {
          if (item.action) {
            item.action();
          } else if (item.route) {
            router.push(item.route as any);
          }
        }}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
          <IconComponent name={item.icon as any} size={24} color={item.color} />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <Text style={styles.headerSubtitle}>Manage your account and settings</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>JS</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Smith</Text>
          <Text style={styles.profilePhone}>+91 9876543210</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/profile')}
        >
          <MaterialIcons name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Menu Sections */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {menuSections.map((section, index) => (
          <View key={index} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuItemsContainer}>
              {section.items.map(renderMenuItem)}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Sporto v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2025 Sporto. All rights reserved.</Text>
        </View>
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
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  menuSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 10,
    marginLeft: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItemsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
});