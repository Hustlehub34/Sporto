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

interface Payment {
  id: string;
  turfName: string;
  date: string;
  time: string;
  amount: string;
  status: 'completed' | 'refunded' | 'pending';
  paymentMethod: string;
  transactionId: string;
  bookingId: string;
}

const PAYMENTS: Payment[] = [
  {
    id: '1',
    turfName: 'Green Field Sports Complex',
    date: '28 Oct 2025',
    time: '6:00 PM',
    amount: '₹800',
    status: 'completed',
    paymentMethod: 'UPI',
    transactionId: 'TXN1234567890',
    bookingId: 'BKG001',
  },
  {
    id: '2',
    turfName: 'Champions Arena',
    date: '25 Oct 2025',
    time: '7:00 PM',
    amount: '₹1000',
    status: 'completed',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN0987654321',
    bookingId: 'BKG002',
  },
  {
    id: '3',
    turfName: 'Victory Grounds',
    date: '20 Oct 2025',
    time: '5:00 PM',
    amount: '₹700',
    status: 'completed',
    paymentMethod: 'Debit Card',
    transactionId: 'TXN1122334455',
    bookingId: 'BKG003',
  },
  {
    id: '4',
    turfName: 'Sports Hub Premium',
    date: '15 Oct 2025',
    time: '6:00 PM',
    amount: '₹1200',
    status: 'refunded',
    paymentMethod: 'UPI',
    transactionId: 'TXN5544332211',
    bookingId: 'BKG004',
  },
  {
    id: '5',
    turfName: 'Green Field Sports Complex',
    date: '10 Oct 2025',
    time: '7:00 PM',
    amount: '₹800',
    status: 'completed',
    paymentMethod: 'Net Banking',
    transactionId: 'TXN9988776655',
    bookingId: 'BKG005',
  },
];

export default function PaymentHistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'completed' | 'refunded'>('all');

  const filteredPayments = filter === 'all'
    ? PAYMENTS
    : PAYMENTS.filter(payment => payment.status === filter);

  const totalSpent = PAYMENTS
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('₹', '')), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'refunded':
        return '#FF9800';
      case 'pending':
        return '#2196F3';
      default:
        return '#999';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return 'payment';
      case 'credit card':
      case 'debit card':
        return 'credit-card';
      case 'net banking':
        return 'account-balance';
      default:
        return 'payment';
    }
  };

  const renderPaymentCard = (payment: Payment) => (
    <TouchableOpacity key={payment.id} style={styles.paymentCard} activeOpacity={0.8}>
      <View style={styles.paymentHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={getPaymentMethodIcon(payment.paymentMethod)}
            size={24}
            color="#4CAF50"
          />
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.turfName}>{payment.turfName}</Text>
          <Text style={styles.paymentDate}>
            {payment.date} at {payment.time}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amount,
              payment.status === 'refunded' && styles.refundedAmount,
            ]}
          >
            {payment.status === 'refunded' ? '-' : ''}{payment.amount}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(payment.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.paymentDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>{payment.paymentMethod}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Transaction ID</Text>
          <Text style={styles.detailValue}>{payment.transactionId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking ID</Text>
          <Text style={styles.detailValue}>{payment.bookingId}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.downloadButton}>
        <MaterialIcons name="file-download" size={18} color="#4CAF50" />
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryValue}>₹{totalSpent}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Transactions</Text>
          <Text style={styles.summaryValue}>{PAYMENTS.length}</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'refunded' && styles.filterButtonActive]}
          onPress={() => setFilter('refunded')}
        >
          <Text style={[styles.filterText, filter === 'refunded' && styles.filterTextActive]}>
            Refunded
          </Text>
        </TouchableOpacity>
      </View>

      {/* Payments List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.paymentsList}>
          {filteredPayments.length > 0 ? (
            filteredPayments.map(renderPaymentCard)
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="receipt-long" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No Payments Found</Text>
              <Text style={styles.emptySubtext}>
                Your payment history will appear here
              </Text>
            </View>
          )}
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
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  paymentsList: {
    padding: 20,
    paddingTop: 0,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  paymentInfo: {
    flex: 1,
  },
  turfName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 13,
    color: '#666',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  refundedAmount: {
    color: '#FF9800',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  paymentDetails: {
    marginBottom: 10,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 13,
    color: '#999',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 5,
    gap: 5,
  },
  downloadButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});