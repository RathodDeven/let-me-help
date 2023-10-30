import React from 'react'
import {
  VolunteerTask,
  useAddVolunteerToTaskMutation
} from '../../generated'
import {
  View,
  Text,
  Linking
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useProfileStore } from '../store/profileStore'
import clsx from 'clsx'
import Toast from 'react-native-toast-message'
import {
  getItem,
  storageKeys
} from '../utils/storage'

const VolunteerTaskCard = ({
  task
}: {
  task: VolunteerTask
}) => {
  const currentUser = useProfileStore(
    (state) => state.currentUser
  )

  const [attending, setAttending] =
    React.useState(false)
  // Convert string epoch time to number and then to Date object
  const createdAt = new Date(
    Number(task?.createdAt) * 1000
  )

  React.useEffect(() => {
    // @ts-ignore
    if (task?.volunteers?.length > 0) {
      const found =
        task?.volunteers?.find(
          (volunteer) =>
            volunteer?.id ===
            currentUser?.id
        )
      if (found) {
        setAttending(true)
      }
    }
  }, [task])

  // Format date as a string
  const createdAtString =
    createdAt.toLocaleDateString()

  const [attentTask] =
    useAddVolunteerToTaskMutation()

  const handleAttend = async () => {
    if (attending) return

    const username = await getItem(
      storageKeys.USERNAME
    )
    const password = await getItem(
      storageKeys.PASSWORD
    )

    try {
      const { data } = await attentTask(
        {
          variables: {
            authPayLoad: {
              username,
              password
            },
            volunteerTaskId: task.id
          }
        }
      )

      if (data?.addVolunteerToTask) {
        Toast.show({
          type: 'success',
          text1: 'Attending'
        })
        setAttending(true)
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: String(error)
      })
    }
  }

  const handleContact = async () => {
    // open email app with organizer email
    const email = task?.owner?.email
    const url = `mailto:${email}`

    const supported =
      await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      Toast.show({
        type: 'error',
        text1: 'Cannot open email app'
      })
    }
  }

  return (
    <View className="mx-4 my-2 bg-p-bg p-5 rounded-xl space-y-4">
      <View className="flex flex-row gap-x-3 items-center">
        <AntDesign
          name="star"
          size={16}
          color="gray"
        />
        <Text className="text-base font-bold">
          {task.name}
        </Text>
      </View>

      <Text className="text-sm">
        {task.description}
      </Text>

      {/* // date time */}
      {task.dateTime && (
        <View className="flex flex-row gap-x-2 items-center">
          <AntDesign
            name="calendar"
            size={16}
            color="gray"
          />
          <Text className="text-sm">
            {task.dateTime}
          </Text>
        </View>
      )}

      <View className="flex flex-row items-center space-x-3">
        <View className="flex flex-row gap-x-2 items-center">
          <AntDesign
            name="clockcircleo"
            size={16}
            color="gray"
          />
          <Text className="text-sm">
            {task.duration}
          </Text>
        </View>

        <View className="flex flex-row gap-x-2 items-center">
          <AntDesign
            name="enviromento"
            size={16}
            color="gray"
          />
          <Text className="text-sm">
            {task.location}
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-x-2 items-center">
        {/* number of people */}
        <AntDesign
          name="user"
          size={16}
          color="gray"
        />

        <Text className="text-sm">
          {task?.volunteers?.length}{' '}
          people
        </Text>
      </View>

      {/* attend button  */}

      <View className="flex flex-row items-center gap-x-4">
        <Text
          onPress={handleAttend}
          disabled={attending}
          className={clsx(
            'text-white font-bold rounded-full px-6 py-2 text-base',
            attending
              ? 'bg-green-500'
              : 'bg-brand'
          )}
        >
          {attending
            ? 'Attending'
            : 'Attend'}
        </Text>

        {/* organizer contact button */}
        <Text
          onPress={handleContact}
          className="text-black font-bold bg-s-bg rounded-full px-6  py-2 text-base"
        >
          Contact Organizer
        </Text>
      </View>
    </View>
  )
}

export default VolunteerTaskCard
