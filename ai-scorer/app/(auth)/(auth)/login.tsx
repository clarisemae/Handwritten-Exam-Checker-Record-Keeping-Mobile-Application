// app/(auth)/login.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0EA47A', '#017EBA']} style={styles.container}>
      <Text style={styles.title}>Welcome,</Text>
      <Text style={styles.subtitle}>Glad to see you!</Text>

      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#ccc" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TouchableOpacity onPress={() => router.push('/(auth)/forgotpass')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('../(tabs)/home')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Or login with</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" size={22} color="#000" />
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => router.push('/(auth)/signup')}>
          Sign Up
        </Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
  subtitle: { fontSize: 18, color: '#fff', marginBottom: 40 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  forgot: { color: '#fff', textAlign: 'right', marginBottom: 15 },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#0EA47A', fontWeight: 'bold' },
  or: { color: '#fff', textAlign: 'center', marginBottom: 15 },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  footer: { color: '#fff', textAlign: 'center' },
  link: { fontWeight: 'bold', textDecorationLine: 'underline' },
});