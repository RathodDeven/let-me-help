import React from 'react'
import {
  Text,
  View
} from 'react-native'
import {
  Order,
  VolunteerTask,
  useVolunteerTasksQuery
} from '../../generated'
import { FlashList } from '@shopify/flash-list'
import VolunteerTaskCard from './VolunteerTaskCard'

const HomeScreen = () => {
  const { data } =
    useVolunteerTasksQuery({
      variables: {
        sort: {
          field: 'createdAt',
          order: Order.Desc
        }
      }
    })

  const renderItem = ({
    item
  }: {
    item: VolunteerTask
  }) => {
    return (
      <View>
        <VolunteerTaskCard
          task={item}
        />
      </View>
    )
  }
  return (
    <FlashList
      // @ts-ignore
      data={data?.volunteerTasks || []}
      renderItem={renderItem}
      // @ts-ignore
      keyExtractor={(item) => item?.id}
      estimatedItemSize={50}
    />
  )
}

export default HomeScreen
