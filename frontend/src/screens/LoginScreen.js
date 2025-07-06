import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../services/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (e) {
      setError("Email ou mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={loading ? "Connexion..." : "Se connecter"}
        onPress={handleLogin}
        disabled={loading}
      />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Inscription")}
      >
        Pas encore de compte ? S'inscrire
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  error: { color: "red", marginBottom: 10 },
  link: { color: "#007bff", marginTop: 15, textAlign: "center" },
});
