import clsx from 'clsx'
import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Platform
} from 'react-native'
import {
  useCreateUserMutation,
  useUserLazyQuery
} from '../../generated'
import { useProfileStore } from '../store/profileStore'
import Toast from 'react-native-toast-message'
import {
  setItem,
  storageKeys
} from '../utils/storage'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance:
          Notifications
            .AndroidImportance.MAX,
        vibrationPattern: [
          0, 250, 250, 250
        ],
        lightColor: '#FF231F7C'
      }
    )
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } =
        await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert(
        'Failed to get push token for push notification!'
      )
      return
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync(
        {
          projectId:
            '90598d3b-b5c0-4ffe-b8a1-2fac861a981c'
        }
      )
    ).data
  } else {
    alert(
      'Must use physical device for Push Notifications'
    )
  }

  return token
}

const RegisterAndLoginComponent =
  () => {
    const [
      loginSelected,
      setLoginSelected
    ] = React.useState(false)

    const [email, setEmail] =
      React.useState('')
    const [username, setUsername] =
      React.useState('')
    const [password, setPassword] =
      React.useState('')

    const [loading, setLoading] =
      React.useState(false)
    const [
      expoPushToken,
      setExpoPushToken
    ] = React.useState('')

    const setCurrentUser =
      useProfileStore(
        (state) => state.setCurrentUser
      )

    const [createUser] =
      useCreateUserMutation()
    const [getUser] = useUserLazyQuery()

    React.useEffect(() => {
      registerForPushNotificationsAsync().then(
        (token) =>
          setExpoPushToken(token)
      )
    }, [])

    const onRegister = async (
      username,
      password,
      email
    ) => {
      const user = await createUser({
        variables: {
          authPayLoad: {
            username,
            password
          },
          email,
          pushToken: expoPushToken
        }
      })

      if (!user.data) {
        throw new Error(
          'Unable to create User'
        )
      }

      await setItem(
        storageKeys.USERNAME,
        username
      )
      await setItem(
        storageKeys.PASSWORD,
        password
      )
      setCurrentUser(
        // @ts-ignore
        user?.data?.createUser
      )
    }

    const onLogin = async (
      username,
      password
    ) => {
      const { error, data } =
        await getUser({
          variables: {
            authPayLoad: {
              username,
              password
            }
          }
        })

      if (!data?.user) {
        throw new Error(error?.message)
      }

      await setItem(
        storageKeys.USERNAME,
        username
      )
      await setItem(
        storageKeys.PASSWORD,
        password
      )

      setCurrentUser(
        // @ts-ignore
        data?.user
      )
    }

    const handleSubmit = async () => {
      if (
        loading ||
        !username ||
        !password ||
        (!loginSelected && !email)
      )
        return

      setLoading(true)

      try {
        if (loginSelected) {
          await onLogin(
            username,
            password
          )
        } else {
          await onRegister(
            username,
            password,
            email
          )
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: String(error)
        })
      } finally {
        setLoading(false)
      }
    }

    return (
      <ScrollView className="flex-1">
        {/* register and login bar */}

        <View className="m-4 p-2 flex flex-row items-center justify-between rounded-full shadow-xl bg-p-bg">
          <Text
            className={clsx(
              'font-black text-base flex-1 p-5 rounded-full text-center',
              loginSelected
                ? 'text-black'
                : 'text-white bg-brand'
            )}
            onPress={() => {
              setLoginSelected(false)
            }}
          >
            Register
          </Text>

          <Text
            className={clsx(
              'font-black text-base flex-1 p-5 rounded-full text-center',
              loginSelected
                ? 'text-white bg-brand'
                : 'text-black'
            )}
            onPress={() => {
              setLoginSelected(true)
            }}
          >
            Login
          </Text>
        </View>

        <View className="flex-1 flex-col flex justify-between">
          <View className="bg-p-bg m-4 p-2 space-y-2 rounded-3xl">
            {/* usename input */}
            <TextInput
              placeholder="Username"
              className="p-8 font-black text-2xl"
              onChangeText={(text) =>
                setUsername(text)
              }
              value={username}
            />

            {/* password input */}
            <TextInput
              placeholder="Password"
              className="p-8 font-black text-2xl"
              onChangeText={(text) =>
                setPassword(text)
              }
              value={password}
            />

            {/* email input */}
            {!loginSelected && (
              <TextInput
                placeholder="Email"
                className="p-8 font-black text-2xl"
                onChangeText={(text) =>
                  setEmail(text)
                }
                value={email}
              />
            )}
          </View>

          {/* submit button */}

          <View className="mx-4 my-8 p-2 flex flex-row items-center justify-between rounded-full shadow-xl bg-brand">
            <Text
              className="font-black text-white text-xl flex-1 p-4 rounded-full text-center"
              onPress={handleSubmit}
            >
              {loginSelected
                ? loading
                  ? 'Logging..'
                  : 'Login'
                : loading
                ? 'Regstering...'
                : 'Register'}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }

export default RegisterAndLoginComponent
