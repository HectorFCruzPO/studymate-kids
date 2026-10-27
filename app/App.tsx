
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const introVideo = require('./assets/videos/StudyMate_HPlus_Development_Final_5_Seconds.mp4');

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

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

  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.title}>StudyMate Kids</Text>
      <Text style={styles.subtitle}>
        Learning is an adventure!
      </Text>
      <Text style={styles.message}>
        Welcome to your learning journey!
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
