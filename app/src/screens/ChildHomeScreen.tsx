
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';

import type { SavedChild } from '../database/database';
import { getAvatarWorld, worldColors, worldBackgrounds } from '../themes/avatarThemes';
import { translations } from '../i18n/translations';



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
    const t = translations[child.language === 'es' ? 'es' : 'en'];
    const avatarImage =
    AVATAR_IMAGES[child.avatar_id as keyof typeof AVATAR_IMAGES] ??
    AVATAR_IMAGES.nova;       
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const activeWorld = getAvatarWorld(child.avatar_id);
    const theme = worldColors[activeWorld];   
    const backgroundImage = worldBackgrounds[activeWorld];


    
const themedLearningCard = [
  styles.learningCard,
  {
    borderWidth: 2,
    borderColor: theme.secondary,
    width: isLandscape ? '34%' : '47%',
    minHeight: isLandscape ? 85 : 145,
    padding: isLandscape ? 6 : 16,
  },
];



  return (
    <ImageBackground     
      source={backgroundImage ?? undefined}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
     
<ScrollView
 
style={[
  styles.container,
  {
    backgroundColor: backgroundImage
      ? 'transparent'
      : theme.background,
  },
]}

  contentContainerStyle={styles.content}
>

      
<View
  style={[
    styles.welcomeCard,
    {
      borderWidth: 3,
      borderColor: theme.secondary,
    },
  ]}
>

  <View
    style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    }}
  >
    
<Text style={[styles.brand, { color: theme.primary }]}>
  STUDYMATE KIDS
</Text>


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
  
    
<View
  style={[
    styles.profileContent,
    { flexDirection: isLandscape ? 'row' : 'column' },
  ]}
>

        <Image
          source={avatarImage}
          style={styles.avatar}
          resizeMode="cover"
        />
       <View style={{ alignItems: 'center' }}>
       
<Text style={styles.title}>
  {t.greeting}, {child.name}! 👋
</Text>

<Text style={styles.subtitle}>
  {t.ready}
</Text>


<View style={styles.rewards}>
  <Text style={styles.rewardText}>
    ⭐ {child.stars} {t.stars}
  </Text>

  <Text style={styles.rewardText}>
    🪙 {child.coins} {t.coins}
  </Text>
</View>

      </View>
    </View>
    </View>

     
   
<Text style={styles.sectionTitle}>
  {t.adventures}
</Text>


<View style={styles.grid}>


      
      <View  style={themedLearningCard}>
        <Text style={styles.cardIcon}>🔢</Text>
       
<Text style={styles.cardTitle}>
  {t.numbers}
</Text>

        </View>


        
        
<View
  style={[
    themedLearningCard,
    { backgroundColor: '#DBEAFE', 
      minHeight: isLandscape ? 105 : 145,
    },
  ]}
>

          <Text style={styles.cardIcon}>🔤</Text>
          
<Text style={styles.cardTitle}>
  {t.letters}
</Text>

        </View>

        
        
<View
  style={[
    themedLearningCard,
    { backgroundColor: '#F3E8FF' },
  ]}
>

          <Text style={styles.cardIcon}>🎨</Text>
          
<Text style={styles.cardTitle}>
  {t.colors}
</Text>

        </View>

       
        
<View
  style={[
    themedLearningCard,
    { backgroundColor: '#FFEDD5' },
  ]}
>

          <Text style={styles.cardIcon}>🦖</Text>
          
<Text style={styles.cardTitle}>
  {t.animals}
</Text>

        </View>
      </View>

      <Text style={styles.footer}>
        Your adventures are coming soon!
      </Text>
    </ScrollView>
    </ImageBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 650,
    marginTop: 10,
  },
  
profileContent: {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: 16,
},

  brand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2463EB',
    letterSpacing: 2,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
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
    marginTop: 8,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignSelf: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 50,
    rowGap: 16,
  },
  learningCard: {
    width: '47%',
    minHeight: 145,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 28,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  cardIcon: {
    fontSize: 52,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#243B53',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    color: '#334155',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 24,
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
