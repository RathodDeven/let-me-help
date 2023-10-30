import React from 'react'
import { useProfileStore } from '../store/profileStore'
import {
  View,
  Text,
  ScrollView,
  TextInput
} from 'react-native'
import { useCreateVolunteerTaskMutation } from '../../generated'
import {
  getItem,
  storageKeys
} from '../utils/storage'
import Toast from 'react-native-toast-message'

const CreateScreen = () => {
  const currentUser = useProfileStore(
    (state) => state.currentUser
  )
  const [name, setName] =
    React.useState('')
  const [description, setDescription] =
    React.useState('')
  const [location, setLocation] =
    React.useState('')
  const [dateTime, setDateTime] =
    React.useState('')
  const [duration, setDuration] =
    React.useState('')

  const [loading, setLoading] =
    React.useState(false)

  const [createCampaign] =
    useCreateVolunteerTaskMutation()

  const submit = async () => {
    setLoading(true)
    try {
      const username = await getItem(
        storageKeys.USERNAME
      )
      const password = await getItem(
        storageKeys.PASSWORD
      )

      const { data, errors } =
        await createCampaign({
          variables: {
            authPayLoad: {
              username,
              password
            },
            volunteerTaskPayLoad: {
              name,
              description,
              location,
              dateTime,
              duration,
              // to do : allow upload images
              images: []
            }
          }
        })

      if (data?.createVolunteerTask) {
        Toast.show({
          type: 'success',
          text1: 'Campaign created!'
        })

        console.log(
          data?.createVolunteerTask
        )

        // redirect to task page
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: String(error)
      })
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <View>
        <Text>
          You must be logged in to
          create a campaign!
        </Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View className="m-4 p-4 space-y-4 rounded-3xl bg-p-bg">
        <View className="">
          <Text className="text-sm font-bold">
            Campaign Name
          </Text>
          <TextInput
            className="p-1 rounded-md text-xl font-semibold outline-none"
            onChangeText={setName}
            value={name}
            placeholder="Let's clean up the beach!"
          />
        </View>

        <View className="">
          <Text className="text-sm font-bold">
            Description
          </Text>
          <TextInput
            className="p-1 rounded-md text-xl font-semibold outline-none"
            onChangeText={
              setDescription
            }
            multiline={true}
            value={description}
            placeholder="Need atleast 5 volunteers, will start from east coast!"
          />
        </View>

        <View className="">
          <Text className="text-sm font-bold">
            Location
          </Text>
          <TextInput
            className="p-1 rounded-md text-xl font-semibold outline-none"
            onChangeText={setLocation}
            value={location}
            placeholder="City Beach, Perth"
          />
        </View>

        <View className="">
          <Text className="text-sm font-bold">
            Date and Time
          </Text>
          <TextInput
            className="p-1 rounded-md text-xl font-semibold outline-none"
            onChangeText={setDateTime}
            value={dateTime}
            placeholder="This Saturday, 10am"
          />
        </View>

        <View className="">
          <Text className="text-sm font-bold">
            Duration
          </Text>
          <TextInput
            className="p-1 rounded-md text-xl font-semibold outline-none"
            onChangeText={setDuration}
            value={duration}
            placeholder="2 hours"
          />
        </View>
      </View>

      {/* create button */}
      <View className="m-4 flex flex-row items-center justify-between rounded-3xl shadow-xl bg-brand">
        <Text
          className="font-black m-2 text-white text-xl flex-1 p-4 rounded-full text-center"
          onPress={submit}
        >
          {loading
            ? 'Creating...'
            : 'Create'}
        </Text>
      </View>
    </ScrollView>
  )
}

export default CreateScreen
