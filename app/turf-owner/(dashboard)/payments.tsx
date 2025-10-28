import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  bookingId: string;
  customerName: string;
  turfName: string;
  amount: number;
  date: string;
  time: string;
  paymentMethod: 'upi' | 'card' | 'cash' | 'wallet';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
}

const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    bookingId: 'BK-001',
    customerName: 'Rahul Sharma',
    turfName: 'Green Valley Cricket Turf',
    amount: 2400,
    date: '2025-10-24',
    time: '6:30 PM',
    paymentMethod: 'upi',
    status: 'completed',
  },
  {
    id: '2',
    bookingId: 'BK-002',
    customerName: 'Priya Patel',
    turfName: 'Champions Cricket Ground',
    amount: 3200,
    date: '2025-10-24',
    time: '5:15 PM',
    paymentMethod: 'card',
    status: 'pending',
  },
  {
    id: '3',
    bookingId: 'BK-003',
    customerName: 'Amit Kumar',
    turfName: 'Sports Arena',
    amount: 2000,
    date: '2025-10-23',
    time: '4:00 PM',
    paymentMethod: 'cash',
    status: 'completed',
  },
  {
    id: '4',
    bookingId: 'BK-004',
    customerName: 'Sneha Reddy',
    turfName: 'Pro Cricket Club',
    amount: 2800,
    date: '2025-10-23',
    time: '3:30 PM',
    paymentMethod: 'wallet',
    status: 'completed',
  },
  {
    id: '5',
    bookingId: 'BK-005',
    customerName: 'Vijay Singh',
    turfName: 'Green Valley Cricket Turf',
    amount: 2400,
    date: '2025-10-22',
    time: '2:45 PM',
    paymentMethod: 'upi',
    status: 'completed',
  },
  {
    id: '6',
    bookingId: 'BK-006',
    customerName: 'Ravi Patel',
    turfName: 'Champions Cricket Ground',
    amount: 3200,
    date: '2025-10-22',
    time: '11:00 AM',
    paymentMethod: 'card',
    status: 'failed',
  },
  {
    id: '7',
    bookingId: 'BK-007',
    customerName: 'Anjali Desai',
    turfName: 'Sports Arena',
    amount: 2000,
    date: '2025-10-21',
    time: '9:30 AM',
    paymentMethod: 'upi',
    status: 'refunded',
  },
];

export default function PaymentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>(
    'month'
  );

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'upi':
        return 'qr-code-scanner';
      case 'card':
        return 'credit-card';
      case 'cash':
        return 'money';
      case 'wallet':
        return 'account-balance-wallet';
      default:
        return 'payment';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'failed':
        return '#F44336';
      case 'refunded':
        return '#9C27B0';
      default:
        return '#999';
    }
  };

  const filteredTransactions = TRANSACTIONS.filter((transaction) => {
    if (selectedFilter === 'all') return true;
    return transaction.status === selectedFilter;
  });

  const totalRevenue = TRANSACTIONS.filter((t) => t.status === 'completed').reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const pendingAmount = TRANSACTIONS.filter((t) => t.status === 'pending').reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const completedCount = TRANSACTIONS.filter((t) => t.status === 'completed').length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments & Revenue</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <MaterialIcons name="download" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Revenue Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Revenue Overview</Text>
            {/* Period Selector */}
            <View style={styles.periodSelector}>
              <TouchableOpacity
                style={[
                  styles.periodButton,
                  selectedPeriod === 'today' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('today')}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === 'today' && styles.periodButtonTextActive,
                  ]}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.periodButton,
                  selectedPeriod === 'week' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === 'week' && styles.periodButtonTextActive,
                  ]}
                >
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.periodButton,
                  selectedPeriod === 'month' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === 'month' && styles.periodButtonTextActive,
                  ]}
                >
                  Month
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.revenueAmount}>
            <Text style={styles.revenueLabel}>Total Revenue</Text>
            <Text style={styles.revenueValue}>₹{totalRevenue.toLocaleString()}</Text>
            <Text style={styles.revenueChange}>+12.5% from last month</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>{completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <MaterialIcons name="pending" size={24} color="#FF9800" />
              <Text style={styles.statValue}>₹{pendingAmount}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <MaterialIcons name="trending-up" size={24} color="#2196F3" />
              <Text style={styles.statValue}>₹{Math.round(totalRevenue / completedCount)}</Text>
              <Text style={styles.statLabel}>Avg. Value</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.methodsGrid}>
            <View style={styles.methodCard}>
              <View style={[styles.methodIcon, { backgroundColor: '#E8F5E9' }]}>
                <MaterialIcons name="qr-code-scanner" size={28} color="#4CAF50" />
              </View>
              <Text style={styles.methodLabel}>UPI</Text>
              <Text style={styles.methodValue}>
                ₹
                {TRANSACTIONS.filter((t) => t.paymentMethod === 'upi' && t.status === 'completed')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </Text>
            </View>
            <View style={styles.methodCard}>
              <View style={[styles.methodIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="credit-card" size={28} color="#2196F3" />
              </View>
              <Text style={styles.methodLabel}>Card</Text>
              <Text style={styles.methodValue}>
                ₹
                {TRANSACTIONS.filter((t) => t.paymentMethod === 'card' && t.status === 'completed')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </Text>
            </View>
            <View style={styles.methodCard}>
              <View style={[styles.methodIcon, { backgroundColor: '#FFF3E0' }]}>
                <MaterialIcons name="money" size={28} color="#FF9800" />
              </View>
              <Text style={styles.methodLabel}>Cash</Text>
              <Text style={styles.methodValue}>
                ₹
                {TRANSACTIONS.filter((t) => t.paymentMethod === 'cash' && t.status === 'completed')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </Text>
            </View>
            <View style={styles.methodCard}>
              <View style={[styles.methodIcon, { backgroundColor: '#F3E5F5' }]}>
                <MaterialIcons name="account-balance-wallet" size={28} color="#9C27B0" />
              </View>
              <Text style={styles.methodLabel}>Wallet</Text>
              <Text style={styles.methodValue}>
                ₹
                {TRANSACTIONS.filter((t) => t.paymentMethod === 'wallet' && t.status === 'completed')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'all' && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter('all')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === 'all' && styles.filterChipTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'completed' && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter('completed')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === 'completed' && styles.filterChipTextActive,
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'pending' && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter('pending')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === 'pending' && styles.filterChipTextActive,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'failed' && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter('failed')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === 'failed' && styles.filterChipTextActive,
                ]}
              >
                Failed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'refunded' && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter('refunded')}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === 'refunded' && styles.filterChipTextActive,
                ]}
              >
                Refunded
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {filteredTransactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionCard}>
              <View
                style={[
                  styles.transactionIcon,
                  { backgroundColor: `${getStatusColor(transaction.status)}20` },
                ]}
              >
                <MaterialIcons
                  name={getPaymentMethodIcon(transaction.paymentMethod) as any}
                  size={24}
                  color={getStatusColor(transaction.status)}
                />
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionCustomer}>{transaction.customerName}</Text>
                <Text style={styles.transactionTurf}>{transaction.turfName}</Text>
                <View style={styles.transactionMeta}>
                  <Text style={styles.transactionMetaText}>{transaction.date}</Text>
                  <Text style={styles.transactionMetaDot}>•</Text>
                  <Text style={styles.transactionMetaText}>{transaction.time}</Text>
                  <Text style={styles.transactionMetaDot}>•</Text>
                  <Text style={styles.transactionMetaText}>{transaction.bookingId}</Text>
                </View>
              </View>

              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
                <View
                  style={[
                    styles.transactionStatus,
                    { backgroundColor: `${getStatusColor(transaction.status)}20` },
                  ]}
                >
                  <Text
                    style={[
                      styles.transactionStatusText,
                      { color: getStatusColor(transaction.status) },
                    ]}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  downloadButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 3,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#fff',
  },
  periodButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  revenueAmount: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  revenueLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  revenueValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 6,
  },
  revenueChange: {
    fontSize: 13,
    color: '#4CAF50',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  methodsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  methodCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  methodLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  methodValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  transactionsList: {
    paddingHorizontal: 20,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCustomer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  transactionTurf: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transactionMetaText: {
    fontSize: 11,
    color: '#999',
  },
  transactionMetaDot: {
    fontSize: 11,
    color: '#ccc',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  transactionStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  transactionStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
