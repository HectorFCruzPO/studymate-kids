
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Free-version limit. We can make this configurable
// when we introduce paid family plans.
const MAX_FREE_CHILDREN = 2;

type Props = {
  onContinue: (childCount: number) => void;
  onBack: () => void;
};

export default function ChildCountScreen({
  onContinue,
  onBack,
}: Props) {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  const handleContinue = () => {
    if (
      selectedCount === null ||
      selectedCount < 1 ||
      selectedCount > MAX_FREE_CHILDREN
    ) {
      return;
    }

    onContinue(selectedCount);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        accessibilityRole="button"
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.emoji}>🚀</Text>

        <Text style={styles.step}>STEP 2 OF 3</Text>

        <Text style={styles.title}>
          How many little explorers?
        </Text>

        <Text style={styles.subtitle}>
          How many children will use StudyMate Kids?
        </Text>

        <View style={styles.options}>
          {[1, 2].map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.option,
                selectedCount === count && styles.selectedOption,
              ]}
              onPress={() => setSelectedCount(count)}
              accessibilityRole="radio"
              accessibilityState={{
                selected: selectedCount === count,
              }}
            >
              <Text style={styles.optionEmoji}>
                {count === 1 ? '🧑‍🚀' : '🧑‍🚀👩‍🚀'}
              </Text>

              <Text style={styles.optionNumber}>{count}</Text>

              <Text style={styles.optionLabel}>
                {count === 1 ? 'Child' : 'Children'}
              </Text>

              <Text style={styles.checkmark}>
                {selectedCount === count ? '✓' : '○'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.helper}>
          You can create up to {MAX_FREE_CHILDREN} child profiles
          in the free version.
        </Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedCount === null && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={selectedCount === null}
          accessibilityRole="button"
        >
          <Text style={styles.continueText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5FF',
    padding: 24,
  },
  backButton: {
    marginTop: 30,
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  backText: {
    color: '#2463EB',
    fontSize: 17,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 12,
  },
  step: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2463EB',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 30,
  },
  options: {
    flexDirection: 'row',
    gap: 14,
  },
  option: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    paddingVertical: 25,
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#2463EB',
    backgroundColor: '#EFF6FF',
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  optionNumber: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  optionLabel: {
    fontSize: 16,
    color: '#475569',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 24,
    color: '#2463EB',
    marginTop: 12,
  },
  helper: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#2463EB',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
