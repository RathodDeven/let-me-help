import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme
} from '@react-navigation/native'
import React from 'react'
import HomeScreen from './HomeScreen'
import { Ionicons } from '@expo/vector-icons'
import { useUserLazyQuery } from '../../generated'
import { useProfileStore } from '../store/profileStore'
import {
  getItem,
  storageKeys
} from '../utils/storage'
import ProfileScreen from './ProfileScreen'
import CreateScreen from './CreateScreen'

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
          let iconName

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home-sharp'
              : 'ios-home-outline'
          } else if (
            route.name === 'Profile'
          ) {
            iconName = focused
              ? 'ios-person-sharp'
              : 'ios-person-outline'
          } else if (
            route.name === 'Create'
          ) {
            iconName = focused
              ? 'ios-add-circle-sharp'
              : 'ios-add-circle-outline'
          }

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
        },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold'
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  const [getUser] = useUserLazyQuery()
  const setCurrentUser =
    useProfileStore(
      (state) => state.setCurrentUser
    )
  const fetchAndSetCurrentUser =
    async () => {
      try {
        const username = await getItem(
          storageKeys.USERNAME
        )
        const password = await getItem(
          storageKeys.PASSWORD
        )

        if (!username || !password)
          return

        // fetch from api and set current user

        const user = await getUser({
          variables: {
            authPayLoad: {
              password,
              username
            }
          }
        })

        if (!user.data) return

        // @ts-ignore
        setCurrentUser(user.data.user)
      } catch (error) {
        console.log(error)
      }
    }

  React.useEffect(() => {
    fetchAndSetCurrentUser()
  }, [])
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
