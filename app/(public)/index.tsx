import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';

const LoginScreen = () => {
  const { user, loading, signInWithGoogle, signInWithFacebook } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      console.log("User already logged in, navigating...");
      router.replace('/(auth)/(modal)/create');
    }
  }, [user, loading]);

  const handleFacebookLogin = async () => {
    if (loading) return;
    try {
      await signInWithFacebook();
    } catch (error) {
      console.error('Facebook login failed:', error);
      Alert.alert('Login Failed', 'Could not log in with Facebook.');
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
      Alert.alert('Login Failed', 'Could not log in with Google.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/login.png')} style={styles.loginImage} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>How would you like to use Threads?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.disabledButton]} 
            onPress={handleFacebookLogin}
            disabled={loading}
          >
            <View style={styles.loginButtonContent}>
              <Image
                source={require('@/assets/images/instagram_icon.webp')}
                style={styles.loginButtonImage}
              />
              <Text style={styles.loginButtonText}>
                {loading ? 'Loading...' : 'Continue with Facebook'}
              </Text>
              <Ionicons name="chevron-forward" size={24} color={Colors.border} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.disabledButton]} 
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>
                {loading ? 'Loading...' : 'Continue with Google'}
              </Text>
              <Ionicons name="chevron-forward" size={24} color={Colors.border} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Use without a profile</Text>
              <Ionicons name="chevron-forward" size={24} color={Colors.border} />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              You can browse Threads without a profile, but won't be able to post, interact or get
              personalised recommendations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.switchAccountButtonText}>Switch accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    backgroundColor: Colors.background,
  },
  centerContent: {
    justifyContent: 'center',
  },
  loginImage: {
    width: '100%',
    height: 380,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 17,
    fontFamily: 'DMSans_500Medium',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
    flex: 1,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonImage: {
    width: 50,
    height: 50,
  },
  loginButtonSubtitle: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    color: '#acacac',
    marginTop: 5,
  },
  switchAccountButtonText: {
    fontSize: 14,
    color: Colors.border,
    alignSelf: 'center',
  },
});

export default LoginScreen;
