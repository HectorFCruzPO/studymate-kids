
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AVATARS = [
  {
    id: 'nova',
    name: 'Nova',
    image: require('../../assets/avatars/nova.png'),
  },
  {
    id: 'luna',
    name: 'Luna',
    image: require('../../assets/avatars/luna.png'),
  },
  {
    id: 'zee',
    name: 'Zee',
    image: require('../../assets/avatars/zee.png'),
  },
  {
    id: 'orion',
    name: 'Orion',
    image: require('../../assets/avatars/orion.png'),
  },
  {
    id: 'stella',
    name: 'Stella',
    image: require('../../assets/avatars/stella.png'),
  },
  {
    id: 'finn',
    name: 'Finn',
    image: require('../../assets/avatars/finn.png'),
  },
  {
    id: 'rex',
    name: 'Rex',
    image: require('../../assets/avatars/rex.png'),
  },
  {
    id: 'trixie',
    name: 'Trixie',
    image: require('../../assets/avatars/trixie.png'),
  },
  {
    id: 'sunny',
    name: 'Sunny',
    image: require('../../assets/avatars/sunny.png'),
  },
];

export type ChildProfileInput = {
  name: string;
  age: number;
  avatarId: string;
};

type Props = {
  childNumber: number;
  totalChildren: number;
  onBack: () => void;
  onContinue: (child: ChildProfileInput) => void;
};

export default function ChildProfileScreen({
  childNumber,
  totalChildren,
  onBack,
  onContinue,
}: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatarId, setAvatarId] = useState<string | null>(null);

  const handleContinue = () => {
    const cleanName = name.trim();
    const numericAge = Number(age);

    if (cleanName.length < 1 || cleanName.length > 40) {
      Alert.alert(
        'Check the name',
        'Please enter a name between 1 and 40 characters.'
      );
      return;
    }

    if (
      !/^\d{1,2}$/.test(age) ||
      !Number.isInteger(numericAge) ||
      numericAge < 3 ||
      numericAge > 12
    ) {
      Alert.alert(
        'Check the age',
        'Please enter an age between 3 and 12.'
      );
      return;
    }

    if (!avatarId) {
      Alert.alert(
        'Choose an avatar',
        'Please select an adventure buddy.'
      );
      return;
    }

    onContinue({
      name: cleanName,
      age: numericAge,
      avatarId,
    });
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
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.step}>
          CHILD {childNumber} OF {totalChildren}
        </Text>

        <Text style={styles.title}>
          Create Your Explorer!
        </Text>

        <Text style={styles.subtitle}>
          Every great adventure starts with a hero.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Child's name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter child's name"
            value={name}
            onChangeText={setName}
            maxLength={40}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Child's age</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: 5"
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Choose your avatar
        </Text>

        <View style={styles.avatarGrid}>
          {AVATARS.map((avatar) => {
            const selected = avatarId === avatar.id;

            return (
              <TouchableOpacity
                key={avatar.id}
                style={[
                  styles.avatarCard,
                  selected && styles.selectedAvatar,
                ]}
                onPress={() => setAvatarId(avatar.id)}
                accessibilityRole="radio"
                accessibilityLabel={`Choose ${avatar.name}`}
                accessibilityState={{ selected }}
              >
                <Image
                  source={avatar.image}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />

                <Text style={styles.avatarName}>
                  {avatar.name}
                </Text>

                {selected && (
                  <Text style={styles.selectedMark}>✓</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          accessibilityRole="button"
        >
          <Text style={styles.continueText}>
            {childNumber < totalChildren
              ? 'Next Child →'
              : 'Finish Setup →'}
          </Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 50,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    color: '#2463EB',
    fontSize: 17,
    fontWeight: '600',
  },
  step: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2463EB',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
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
    color: '#111827',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
  },
  avatarCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  selectedAvatar: {
    borderColor: '#2463EB',
    backgroundColor: '#DBEAFE',
  },
  avatarImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  avatarName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 6,
  },
  selectedMark: {
    color: '#2463EB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#2463EB',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
