
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import ParentOnboardingScreen from './src/screens/ParentOnboardingScreen';
import ChildCountScreen from './src/screens/ChildCountScreen';
import ChildProfileScreen, {
  type ChildProfileInput,
} from './src/screens/ChildProfileScreen';
import {
  addChild,
  initializeDatabase,
  loadFamily,
  saveFamily,
  type SavedFamily,
  updateChildLanguage,
  updateParentLanguage,
} from './src/database/database';
import ChildHomeScreen from './src/screens/ChildHomeScreen';
import SwitchChildScreen from './src/screens/SwitchChildScreen';
import { setActiveChild } from './src/database/database';


const introVideo = require('./assets/videos/StudyMate_HPlus_Development_Final_5_Seconds.mp4');

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSwitchChild, setShowSwitchChild] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);


  
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
if (databaseError) {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        We couldn't load your saved profiles. Please restart the app.
      </Text>
    </View>
  );
}

if (!databaseReady) {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.message}>Loading your adventures...</Text>
    </View>
  );
}

if (savedFamily) {
  const activeChild =
    savedFamily.children.find(
      (child) => child.id === savedFamily.activeChildId
    ) ?? savedFamily.children[0];

if (showAddChild) {
  return (
    <ChildProfileScreen
      childNumber={savedFamily.children.length + 1}
      totalChildren={2}
      onBack={() => {
        setShowAddChild(false);
        setShowSwitchChild(true);
      }}
      
onContinue={async (child) => {
  try {
    await addChild(child);

    const updatedFamily = await loadFamily();

    if (!updatedFamily) {
      throw new Error('Unable to load updated family');
    }

    setSavedFamily(updatedFamily);
    setShowAddChild(false);
    setShowSwitchChild(true);

    Alert.alert(
      'Child Added!',
      `${child.name} is ready for an adventure!`
    );
  } catch (error) {
    console.error('Failed to add child:', error);

    Alert.alert(
      'Unable to Add Child',
      error instanceof Error
        ? error.message
        : 'Please try again.'
    );
  }
}}

    />
  );
}

if (showSwitchChild) {
  return (
    <SwitchChildScreen
      children={savedFamily.children}
      activeChildId={savedFamily.activeChildId}   
      parentLanguage={savedFamily.parent.language}

      
onChangeParentLanguage={async (language) => {
  try {
    await updateParentLanguage(savedFamily.parent.id, language);

    const updatedFamily = await loadFamily();

    if (!updatedFamily) {
      throw new Error('Unable to reload family');
    }

    setSavedFamily(updatedFamily);
  } catch (error) {
    console.error('Failed to update parent language:', error);

    Alert.alert(
      'Unable to Change Language',
      'Please try again.'
    );
  }
}}

      
      
onSelectChild={async (childId) => {
  try {
    await setActiveChild(childId);

    const updatedFamily = await loadFamily();

    if (!updatedFamily) {
      throw new Error('Unable to load selected child');
    }

    setSavedFamily(updatedFamily);
    setShowSwitchChild(false);
  } catch (error) {
    console.error('Failed to switch child:', error);

    Alert.alert(
      'Unable to Switch Child',
      'Please try again.'
    );
  }
}}

      
onChangeLanguage={async (childId, language) => {
  try {
    await updateChildLanguage(childId, language);

    const updatedFamily = await loadFamily();

    if (!updatedFamily) {
      throw new Error('Unable to reload family');
    }

    setSavedFamily(updatedFamily);
  } catch (error) {
    console.error('Failed to update language:', error);

    Alert.alert(
      'Unable to Change Language',
      'Please try again.'
    );
  }
}}


      onBack={() => setShowSwitchChild(false)}
      onAddChild={() => {
        setShowAddChild(true);
        setShowSwitchChild(false);
   }}
    />
  );
}


return (
  <ChildHomeScreen
    child={activeChild}
    onSwitchChild={() => setShowSwitchChild(true)}
  />
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

const family = await loadFamily();

if (!family) {
  throw new Error('Family was saved but could not be loaded');
}

setChildProfiles(updatedProfiles);
setSavedFamily(family);

console.log('Family saved and loaded successfully');
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
