import React from 'react'
import { useProfileStore } from '../store/profileStore'
import { View } from 'react-native'
import ProfileLogOutCard from './ProfileLogOutCard'
import RegisterAndLoginComponent from './RegisterAndLoginComponent'
const ProfileScreen = () => {
  const currentUser = useProfileStore(
    (state) => state.currentUser
  )

  return (
    <View className="flex-1">
      {currentUser ? (
        <ProfileLogOutCard />
      ) : (
        <RegisterAndLoginComponent />
      )}
    </View>
  )
}

export default ProfileScreen
