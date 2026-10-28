
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import ParentOnboardingScreen from './src/screens/ParentOnboardingScreen';
import ChildCountScreen from './src/screens/ChildCountScreen';
import ChildProfileScreen, {
  type ChildProfileInput,
} from './src/screens/ChildProfileScreen';
import {
  initializeDatabase,
  loadFamily,
  saveFamily,
  type SavedFamily,
} from './src/database/database';

const introVideo = require('./assets/videos/StudyMate_HPlus_Development_Final_5_Seconds.mp4');

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  
useEffect(() => {
  let isMounted = true;

  async function setupDatabase() {
    try {
      // Step 1: Open the database and create tables if needed.
      await initializeDatabase();

      // Step 2: Look for a previously saved family.
      const family = await loadFamily();

      // Step 3: Update the app only if this screen is still mounted.
      if (isMounted) {
        setSavedFamily(family);
        setDatabaseError(false);
        setDatabaseReady(true);
      }

      console.log(
        family
          ? 'Saved family loaded successfully'
          : 'No saved family found - onboarding required'
      );
    } catch (error) {
      console.error('Database startup failed:', error);

      if (isMounted) {
        setDatabaseError(true);
        setDatabaseReady(true);
      }
    }
  }

  setupDatabase();

  return () => {
    isMounted = false;
  };
}, []);

 const [onboardingStep, setOnboardingStep] = useState<
  'parent' | 'children' | 'profile' | 'complete'
>('parent');

const [totalChildren, setTotalChildren] = useState(1);
const [childProfiles, setChildProfiles] = useState<ChildProfileInput[]>([]);
const [parentEmail, setParentEmail] = useState('');
const [parentBirthYear, setParentBirthYear] = useState<number | null>(null);
const [savedFamily, setSavedFamily] = useState<SavedFamily | null>(null);
const [databaseReady, setDatabaseReady] = useState(false);
const [databaseError, setDatabaseError] = useState(false);

  const player = useVideoPlayer(introVideo, (videoPlayer) => {
    videoPlayer.loop = false;
  });

  useEffect(() => {
    if (!showIntro) return;

    const subscription = player.addListener(
      'playToEnd',
      () => {
        setShowIntro(false);
      }
    );

    player.play();

    // Fallback: don't leave the child stuck on the intro.
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 7000);

    return () => {
      subscription.remove();
      clearTimeout(timeout);
      player.pause();
    };
  }, [player, showIntro]);

  if (showIntro) {
    return (
      <View style={styles.introContainer}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
        />
      </View>
    );
  }

  
if (onboardingStep === 'parent') {
  return (
    <ParentOnboardingScreen
  onContinue={(email, birthYear) => {
    setParentEmail(email);
    setParentBirthYear(birthYear);
    setOnboardingStep('children');
  }}
/>
  );
}


if (onboardingStep === 'children') {
  return (
    <ChildCountScreen
      onBack={() => setOnboardingStep('parent')}
      onContinue={(childCount) => {
        setTotalChildren(childCount);
        setChildProfiles([]);
        setOnboardingStep('profile');
      }}
    />
  );
}

if (onboardingStep === 'profile') {
  return (
    <ChildProfileScreen
      key={childProfiles.length}
      childNumber={childProfiles.length + 1}
      totalChildren={totalChildren}
      onBack={() => {
        if (childProfiles.length > 0) {
          setChildProfiles((previous) => previous.slice(0, -1));
        } else {
          setOnboardingStep('children');
        }
      }}
      
onContinue={async (child) => {
  const updatedProfiles = [...childProfiles, child];

  if (updatedProfiles.length < totalChildren) {
    setChildProfiles(updatedProfiles);
    return;
  }

  if (parentBirthYear === null || !parentEmail) {
    Alert.alert(
      'Missing information',
      'Please go back and complete the parent information.'
    );
    return;
  }

  try {
    await saveFamily(
      parentEmail,
      parentBirthYear,
      updatedProfiles
    );

    setChildProfiles(updatedProfiles);
    setOnboardingStep('complete');

    console.log('Family saved successfully to SQLite');
  } catch (error) {
    console.error('Failed to save family:', error);

    Alert.alert(
      'Unable to save',
      'Your family information could not be saved. Please try again.'
    );
  }
}}

    />
  );
}

return (
  <View style={styles.welcomeContainer}>
    <Text style={styles.title}>Setup Complete! 🎉</Text>
    <Text style={styles.subtitle}>
      {childProfiles.length} child profile(s) created.
    </Text>
    <Text style={styles.message}>
      Next, we'll save these profiles and build the learning home screen.
    </Text>
  </View>
);


}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#E8F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2463EB',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 24,
    textAlign: 'center',
  },
});
