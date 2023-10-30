import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme
} from '@react-navigation/native'
import React from 'react'
import HomeScreen from './HomeScreen'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({
          focused,
          color,
          size
        }) => {
          let iconName =
            'person-circle-sharp'
          return (
            <Ionicons
              // @ts-ignore
              name={iconName}
              size={size}
              color={color}
            />
          )
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 10
        },
        headerStyle: {
          backgroundColor: '#e5e5e7'
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#e5e5e7',
          text: '#000000'
        }
      }}
    >
      <TabGroup />
    </NavigationContainer>
  )
}
