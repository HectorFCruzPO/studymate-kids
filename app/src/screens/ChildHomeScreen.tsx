
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { SavedChild } from '../database/database';

const AVATAR_IMAGES = {
  nova: require('../../assets/avatars/nova.png'),
  luna: require('../../assets/avatars/luna.png'),
  zee: require('../../assets/avatars/zee.png'),
  orion: require('../../assets/avatars/orion.png'),
  stella: require('../../assets/avatars/stella.png'),
  finn: require('../../assets/avatars/finn.png'),
  rex: require('../../assets/avatars/rex.png'),
  trixie: require('../../assets/avatars/trixie.png'),
  sunny: require('../../assets/avatars/sunny.png'),
};

type Props = {
  child: SavedChild;
  onSwitchChild: () => void;
};

export default function ChildHomeScreen({
  child,
  onSwitchChild,
}: Props) {
      const avatarImage =
    AVATAR_IMAGES[child.avatar_id as keyof typeof AVATAR_IMAGES] ??
    AVATAR_IMAGES.nova;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      
<View style={styles.welcomeCard}>
  <View
    style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    }}
  >
    <Text style={styles.brand}>STUDYMATE KIDS</Text>

    <TouchableOpacity
      onPress={onSwitchChild}
      accessibilityRole="button"
      accessibilityLabel="Switch child profile"
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#2463EB',
        overflow: 'hidden',
      }}
    >
      <Image
        source={avatarImage}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>


        <Image
          source={avatarImage}
          style={styles.avatar}
          resizeMode="cover"
        />

        <Text style={styles.title}>
          Hi, {child.name}! 👋
        </Text>

        <Text style={styles.subtitle}>
          Ready for an adventure?
        </Text>

        <View style={styles.rewards}>
          <Text style={styles.rewardText}>
            ⭐ {child.stars} Stars
          </Text>

          <Text style={styles.rewardText}>
            🪙 {child.coins} Coins
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Your Learning Adventures
      </Text>

      <View style={styles.grid}>
        <View style={styles.learningCard}>
          <Text style={styles.cardIcon}>🔢</Text>
          <Text style={styles.cardTitle}>
            Numbers & Counting
          </Text>
        </View>

        <View style={styles.learningCard}>
          <Text style={styles.cardIcon}>🔤</Text>
          <Text style={styles.cardTitle}>
            Letters & Sounds
          </Text>
        </View>

        <View style={styles.learningCard}>
          <Text style={styles.cardIcon}>🎨</Text>
          <Text style={styles.cardTitle}>
            Colors & Shapes
          </Text>
        </View>

        <View style={styles.learningCard}>
          <Text style={styles.cardIcon}>🦖</Text>
          <Text style={styles.cardTitle}>
            Animals & Discovery
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Your adventures are coming soon!
      </Text>
    </ScrollView>
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
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  brand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2463EB',
    letterSpacing: 2,
    marginBottom: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  rewards: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 22,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 30,
    marginBottom: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  learningCard: {
    width: '47%',
    minHeight: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 38,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 30,
    fontSize: 15,
  },
});
