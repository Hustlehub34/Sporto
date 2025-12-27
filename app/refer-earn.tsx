import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Referral {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  reward: string;
  date: string;
}

const REFERRALS: Referral[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    status: 'completed',
    reward: '₹100',
    date: '20 Oct 2025',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    status: 'completed',
    reward: '₹100',
    date: '15 Oct 2025',
  },
  {
    id: '3',
    name: 'Mike Brown',
    status: 'pending',
    reward: '₹100',
    date: '10 Oct 2025',
  },
];

export default function ReferEarnScreen() {
  const router = useRouter();
  const referralCode = 'SPORTO2025JS';
  const totalEarned = 200;
  const pendingRewards = 100;

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hey! Join Spoortx and book amazing turfs near you. Use my referral code ${referralCode} to get ₹100 off on your first booking! Download now: https://Spoortx.app`,
      });
    } catch (error) {
      console.error(error);
    }
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
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Referral Card */}
        <View style={styles.referralCard}>
          <View style={styles.giftIcon}>
            <Ionicons name="gift" size={40} color="#4CAF50" />
          </View>
          <Text style={styles.cardTitle}>Invite Friends & Earn Rewards!</Text>
          <Text style={styles.cardSubtitle}>
            Share your referral code and get ₹100 for each friend who books
          </Text>

          {/* Referral Code */}
          <View style={styles.codeContainer}>
            <View style={styles.codeBox}>
              <Text style={styles.codeLabel}>Your Referral Code</Text>
              <Text style={styles.code}>{referralCode}</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <MaterialIcons name="content-copy" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-social" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>Share with Friends</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <MaterialIcons name="account-balance-wallet" size={30} color="#4CAF50" />
            <Text style={styles.summaryValue}>₹{totalEarned}</Text>
            <Text style={styles.summaryLabel}>Total Earned</Text>
          </View>
          <View style={styles.summaryCard}>
            <MaterialIcons name="pending" size={30} color="#FF9800" />
            <Text style={styles.summaryValue}>₹{pendingRewards}</Text>
            <Text style={styles.summaryLabel}>Pending Rewards</Text>
          </View>
          <View style={styles.summaryCard}>
            <MaterialIcons name="people" size={30} color="#2196F3" />
            <Text style={styles.summaryValue}>{REFERRALS.length}</Text>
            <Text style={styles.summaryLabel}>Total Referrals</Text>
          </View>
        </View>

        {/* How it Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it Works</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Share Your Code</Text>
                <Text style={styles.stepDescription}>
                  Share your unique referral code with friends
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Friend Books</Text>
                <Text style={styles.stepDescription}>
                  Your friend uses your code and makes their first booking
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>You Both Earn</Text>
                <Text style={styles.stepDescription}>
                  You get ₹100 and your friend gets ₹100 off
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Referral History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referral History</Text>
          {REFERRALS.length > 0 ? (
            REFERRALS.map((referral) => (
              <View key={referral.id} style={styles.referralItem}>
                <View style={styles.referralIcon}>
                  <MaterialIcons name="person" size={24} color="#4CAF50" />
                </View>
                <View style={styles.referralInfo}>
                  <Text style={styles.referralName}>{referral.name}</Text>
                  <Text style={styles.referralDate}>{referral.date}</Text>
                </View>
                <View style={styles.referralReward}>
                  <Text style={styles.rewardAmount}>{referral.reward}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          referral.status === 'completed' ? '#4CAF50' : '#FF9800',
                      },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {referral.status === 'completed' ? 'Earned' : 'Pending'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="people-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No Referrals Yet</Text>
              <Text style={styles.emptySubtext}>
                Start inviting friends to earn rewards
              </Text>
            </View>
          )}
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Referral reward is credited after friend's first successful booking{'\n'}
            • Minimum booking amount of ₹500 required to claim reward{'\n'}
            • Rewards are valid for 90 days from earning date{'\n'}
            • Cannot be combined with other offers{'\n'}
            • Spoortx reserves the right to modify the program
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
  scrollView: {
    flex: 1,
  },
  referralCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  giftIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  codeBox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
  },
  codeLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  code: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    letterSpacing: 2,
  },
  copyButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  stepsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  referralItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  referralIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  referralDate: {
    fontSize: 12,
    color: '#999',
  },
  referralReward: {
    alignItems: 'flex-end',
  },
  rewardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
    marginTop: 5,
  },
  termsContainer: {
    backgroundColor: '#FFF9C4',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    padding: 15,
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F57C00',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#F57C00',
    lineHeight: 18,
  },
});