import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../../supabase/supabase'; 
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../globalFunc/asyStorage';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar se é login ou criar conta
  const navi = useNavigation();


  // //to set the data in async storage and pass to App.js to keep login and show the FAVORITE
  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('my-key', `${value}`);
  //   } catch (e) {
  //      // saving error
  //   }
  // };



  const handleAuthAction = async () => {
    if (isLogin) {
    
    
    
      // LOGIN   ////////////////////////////////////////////////
      try {
        const { data, error } = await supabase
          .from('User')
          .select('*')
          .eq('email', email)
          .eq('passw', password)
          .single();

        if (data) {
          Alert.alert('Successful login', 'User authenticated successfully!');       
          storeData(data.id)
          //colocar um loading
          // navegar para a próxima tela após o login 
          navi.navigate('Home')
          
        } else {
          Alert.alert('Error when logging in', error.message);
        }
      } catch (error) {
        console.error('Error when trying to log in:', error.message);
      }



    } else {


      // CRIAR CONTA ////////////////////////////////////////////////
      try {
       
        const { data, error } = await supabase
          .from('User')
          .insert([
            { email: `${email}` , passw: `${password}` },
          ])
          .select()

        if (error) {
          Alert.alert('Erro ao criar conta', error.message);
        } else {
          Alert.alert('Conta criada', 'Usuário registrado com sucesso!');
          setEmail('');
          setPassword('')
          // Aqui você pode navegar para a próxima tela após a criação de conta bem-sucedida
          // Exemplo de navegação:
          // navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Erro ao tentar criar conta:', error.message);
      }
    }
  };


  
  const toggleAuthMode = () => {
    // Alternar entre modo de login e modo de criar conta
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Create a new account' : 'I already have an account. Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  toggleText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default Login;
