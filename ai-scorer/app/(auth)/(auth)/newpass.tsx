import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function NewPassword() {
  const router = useRouter();

  // Safe password rule text
  const ruleText = `Passwords must contain:
• at least 1 lowercase letter [a-z]
• at least 1 uppercase letter [A-Z]
• at least 1 number [0-9]
• at least 1 special character ~\`!@#$%^&*()-_+={}[]|\\;:"<>,./?`;

  return (
    <LinearGradient colors={['#0EA47A', '#017EBA']} style={styles.container}>
      <Text style={styles.back} onPress={() => router.back()}>Back</Text>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <Text style={styles.rules}>{ruleText}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(auth)/reset-success")}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30 },
  back: { color: "#fff", marginBottom: 20 },
  title: { fontSize: 28, color: "#fff", fontWeight: "bold", marginBottom: 30 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
  },
  rules: { color: "#fff", fontSize: 12, marginTop: 10, marginBottom: 25 },
  button: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#0EA47A", fontWeight: "bold" },
});
