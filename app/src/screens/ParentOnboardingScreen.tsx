
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onContinue: (email: string, birthYear: number) => void;
};

export default function ParentOnboardingScreen({ onContinue }: Props) {
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleContinue = () => {
    const cleanEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    const year = Number(birthYear);
    const currentYear = new Date().getFullYear();

    if (
      !/^\d{4}$/.test(birthYear) ||
      !Number.isInteger(year) ||
      year > currentYear ||
      currentYear - year < 18 ||
      currentYear - year > 120
    ) {
      Alert.alert(
        'Check your birth year',
        'Please enter a valid birth year. Parents must be at least 18 years old.'
      );
      return;
    }

    onContinue(cleanEmail, year);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.emoji}>🚀</Text>

        <Text style={styles.title}>Welcome, Grown-Up!</Text>

        <Text style={styles.subtitle}>
          Let's get your little explorer ready for an amazing learning adventure!
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Your email address</Text>
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Your birth year</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: 1990"
            keyboardType="number-pad"
            maxLength={4}
            value={birthYear}
            onChangeText={setBirthYear}
          />

          <Text style={styles.helper}>
            Parents must be 18 or older. We use your birth year to estimate
            your age.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Continue →</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Your information stays on this device.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5FF',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2463EB',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#374151',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 25,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 14,
    fontSize: 17,
    marginBottom: 20,
    color: '#111827',
  },
  helper: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2463EB',
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: 24,
    color: '#64748B',
    fontSize: 13,
  },
});
