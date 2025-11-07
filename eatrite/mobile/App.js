import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Import app screens
import HomeScreen from './components/HomeScreen'
import QuestionnaireScreen from './components/QuestionnaireScreen'
import PlansScreen from './components/PlansScreen'

const Stack = createStackNavigator()

/**
 * Main Eatrite mobile application
 * Uses React Navigation for screen management
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#48bb78',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: '🍃 Eatrite',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="Questionnaire" 
            component={QuestionnaireScreen}
            options={{ 
              title: 'Health Profile',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="Plans" 
            component={PlansScreen}
            options={{ 
              title: 'Nutrition Plans',
              headerTitleAlign: 'center'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}