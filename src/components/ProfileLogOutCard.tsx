import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { useProfileStore } from '../store/profileStore'
import { clearStorage } from '../utils/storage'
import { Ionicons } from '@expo/vector-icons'
const ProfileLogOutCard = () => {
  const setCurrentUser =
    useProfileStore(
      (state) => state.setCurrentUser
    )
  const currentUser = useProfileStore(
    (state) => state.currentUser
  )

  const logout = async () => {
    // remove from localStorage
    await clearStorage()
    setCurrentUser(null)
  }
  return (
    <View>
      <View className="m-4 p-8 space-y-8 rounded-3xl bg-p-bg">
        <View className="flex flex-row gap-x-4">
          <Ionicons
            name="person"
            size={24}
            color="black"
          />
          <Text className="text-xl">
            {currentUser?.username}
          </Text>
        </View>

        <View className="flex flex-row gap-x-4 mt-4">
          <Ionicons
            name="mail"
            size={24}
            color="black"
          />
          <Text className="text-xl">
            {currentUser?.email}
          </Text>
        </View>
      </View>

      {/* // logout button */}

      <View className="m-4 p-2 flex flex-row items-center justify-between rounded-3xl shadow-xl bg-red-600">
        <Text
          className="font-black text-white text-xl flex-1 p-4 rounded-full text-center"
          onPress={logout}
        >
          Logout
        </Text>
      </View>
    </View>
  )
}

export default ProfileLogOutCard
