
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
  children: SavedChild[];
  activeChildId: number;
  parentLanguage: 'en' | 'es';
  onChangeParentLanguage: (language: 'en' | 'es') => void;
  onSelectChild: (childId: number) => void;
  onChangeLanguage: (
    childId: number,
    language: 'en' | 'es'
  ) => void;
  onBack: () => void;
  onAddChild: () => void;
};

export default function SwitchChildScreen({
  children,
  activeChildId,
  parentLanguage,
  onChangeParentLanguage,
  onSelectChild,
  onChangeLanguage,
  onBack,
  onAddChild,
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
      >
        
<Text style={styles.backText}>
  {parentLanguage === 'es' ? '← Volver' : '← Back'}
</Text>

      </TouchableOpacity>


<View
  style={{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  }}
>
  {(['en', 'es'] as const).map((language) => (
    <TouchableOpacity
      key={language}
      onPress={() => onChangeParentLanguage(language)}
      accessibilityRole="button"
      accessibilityLabel={
        language === 'en' ? 'Parent language: English' : 'Idioma del adulto: Español'
      }
      accessibilityState={{
        selected: parentLanguage === language,
      }}
      style={{
        minHeight: 48,
        minWidth: 110,
        paddingHorizontal: 12,
        borderRadius: 14,
        borderWidth: 2,
        borderColor:
          parentLanguage === language ? '#2463EB' : '#CBD5E1',
        backgroundColor:
          parentLanguage === language ? '#DBEAFE' : '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        {language === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      
<Text style={styles.title}>
  {parentLanguage === 'es' ? '¿Quién va a jugar?' : "Who's Playing?"}
</Text>


      
<Text style={styles.subtitle}>
  {parentLanguage === 'es'
    ? '¡Elige tu explorador para continuar la aventura!'
    : 'Choose your explorer to continue the adventure!'}
</Text>


      <View style={styles.profileList}>
        {children.map((child) => {
          const isActive = child.id === activeChildId;

          const avatarImage =
            AVATAR_IMAGES[
              child.avatar_id as keyof typeof AVATAR_IMAGES
            ] ?? AVATAR_IMAGES.nova;

          
return (
  <View
    key={child.id}
    style={[
      styles.profileCard,
      isActive && styles.activeCard,
    ]}
  >

<TouchableOpacity
  onPress={() => onSelectChild(child.id)}
  accessibilityRole="button"
  accessibilityLabel={`Play as ${child.name}`}
  style={{ alignItems: 'center', width: '100%', minHeight: 48 }}
>

              <Image
                source={avatarImage}
                style={styles.avatar}
                resizeMode="cover"
              />

              <Text style={styles.childName}>
                {child.name}
              </Text>

              {isActive && (
                
<Text style={styles.activeLabel}>
  {parentLanguage === 'es'
    ? '✓ Jugando ahora'
    : '✓ Currently Playing'}
</Text>

              )}

              <Text style={styles.rewards}>
                ⭐ {child.stars}   🪙 {child.coins}
              </Text>
              
</TouchableOpacity>

<View
  style={{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  }}
>
  {(['en', 'es'] as const).map((language) => (
    <TouchableOpacity
      key={language}
      onPress={() => onChangeLanguage(child.id, language)}
      accessibilityRole="button"
      accessibilityLabel={
        language === 'en' ? 'English' : 'Español'
      }
      accessibilityState={{
        selected: child.language === language,
      }}
      style={{
        minHeight: 48,
        minWidth: 110,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 2,
        borderColor:
          child.language === language ? '#2463EB' : '#CBD5E1',
        backgroundColor:
          child.language === language ? '#DBEAFE' : '#FFFFFF',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        {language === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}
      </Text>
    </TouchableOpacity>
  ))}
</View>

            </View>
          );
        
        })}

        {children.length < 2 && (
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 22,
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: '#2463EB',
              padding: 24,
              alignItems: 'center',
              marginTop: 8,
            }}
            onPress={onAddChild}
            accessibilityRole="button"
            accessibilityLabel="Add another child"
          >
            <Text
              style={{
                fontSize: 32,
                color: '#2463EB',
                fontWeight: 'bold',
              }}
            >
              +
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#2463EB',
              }}
            >
              Add Child
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: '#64748B',
                marginTop: 6,
                textAlign: 'center',
              }}
            >
              Create another explorer profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2463EB',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2463EB',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileList: {
    width: '100%',
    gap: 18,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 22,
    alignItems: 'center',
  },
  activeCard: {
    borderColor: '#2463EB',
    backgroundColor: '#DBEAFE',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  childName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  activeLabel: {
    fontSize: 14,
    color: '#2463EB',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewards: {
    fontSize: 16,
    color: '#475569',
  },
});
