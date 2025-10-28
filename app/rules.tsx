import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface RuleSection {
  id: string;
  title: string;
  icon: string;
  rules: string[];
}

const RULE_SECTIONS: RuleSection[] = [
  {
    id: '1',
    title: 'Booking Rules',
    icon: 'book-online',
    rules: [
      'Bookings must be made at least 2 hours in advance',
      'Cancellation is allowed up to 4 hours before the scheduled time',
      'Late cancellations will incur a 25% cancellation fee',
      'No-shows will result in a full charge',
      'Maximum booking duration is 3 hours per session',
      'Advance payment is required to confirm booking',
    ],
  },
  {
    id: '2',
    title: 'Payment & Refund Policy',
    icon: 'payment',
    rules: [
      'All bookings require upfront payment',
      'Refunds for cancellations made 4+ hours in advance: 100%',
      'Refunds for cancellations made 2-4 hours in advance: 75%',
      'Refunds for cancellations made less than 2 hours: 50%',
      'No refunds for no-shows',
      'Refunds will be processed within 5-7 business days',
      'Transaction fees are non-refundable',
    ],
  },
  {
    id: '3',
    title: 'Turf Usage Guidelines',
    icon: 'sports-soccer',
    rules: [
      'Only sports shoes with appropriate studs allowed on turf',
      'No metal studs or sharp objects permitted',
      'Players must arrive 10 minutes before scheduled time',
      'Smoking and alcohol consumption strictly prohibited',
      'Maximum player limit must be respected',
      'Turf must be vacated within the booked time slot',
      'Any damage to equipment or turf will be charged',
    ],
  },
  {
    id: '4',
    title: 'Safety & Conduct',
    icon: 'security',
    rules: [
      'Players participate at their own risk',
      'First aid facilities are available on-site',
      'Aggressive behavior or foul language is not tolerated',
      'Management reserves the right to remove disruptive players',
      'Follow all safety instructions provided by staff',
      'Children under 12 must be supervised by adults',
      'Report any injuries or incidents to staff immediately',
    ],
  },
  {
    id: '5',
    title: 'Weather & Cancellations',
    icon: 'wb-cloudy',
    rules: [
      'Bookings may be cancelled due to severe weather conditions',
      'Full refund provided for weather-related cancellations',
      'Management will notify users 2 hours before scheduled time',
      'Light rain does not qualify for automatic cancellation',
      'Rescheduling options available for weather cancellations',
    ],
  },
  {
    id: '6',
    title: 'General Terms',
    icon: 'description',
    rules: [
      'Management reserves the right to modify rules as needed',
      'Users must be 18 years or older to book independently',
      'Valid ID proof may be required at the venue',
      'Pets are not allowed in the turf area',
      'Outside food and beverages are not permitted',
      'Management is not liable for lost or stolen items',
      'CCTV surveillance is in operation for security',
    ],
  },
];

export default function RulesScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>('1');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rules & Guidelines</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <MaterialIcons name="info" size={24} color="#2196F3" />
        <Text style={styles.infoBannerText}>
          Please read and follow all rules for a safe and enjoyable experience
        </Text>
      </View>

      {/* Rules Sections */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.rulesList}>
          {RULE_SECTIONS.map((section) => (
            <View key={section.id} style={styles.ruleSection}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.7}
              >
                <View style={styles.sectionTitleContainer}>
                  <View style={styles.sectionIconContainer}>
                    <MaterialIcons
                      name={section.icon as any}
                      size={24}
                      color="#4CAF50"
                    />
                  </View>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <MaterialIcons
                  name={expandedSection === section.id ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>

              {expandedSection === section.id && (
                <View style={styles.sectionContent}>
                  {section.rules.map((rule, index) => (
                    <View key={index} style={styles.ruleItem}>
                      <View style={styles.bulletPoint}>
                        <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                      </View>
                      <Text style={styles.ruleText}>{rule}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialIcons name="gavel" size={40} color="#ccc" />
          <Text style={styles.footerText}>
            By using Sporto, you agree to comply with all the above rules and guidelines
          </Text>
          <Text style={styles.footerSubtext}>
            Last updated: October 24, 2025
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  rulesList: {
    padding: 20,
  },
  ruleSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  ruleItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10,
  },
  bulletPoint: {
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 20,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
  },
});