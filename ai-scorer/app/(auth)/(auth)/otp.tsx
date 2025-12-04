// app/(auth)/otp.tsx
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function OTP() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0EA47A', '#017EBA']} style={styles.container}>
      <Text style={styles.back} onPress={() => router.back()}>Back</Text>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput style={styles.input} placeholder="Enter One Time Password" placeholderTextColor="#ccc" />

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/newpass')}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30 },
  back: { color: "#fff", marginBottom: 20 },
  title: { fontSize: 28, color: "#fff", fontWeight: "bold", marginBottom: 40 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  buttonText: { color: "#0EA47A", fontWeight: "bold" },
});
