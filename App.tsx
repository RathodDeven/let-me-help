import { StatusBar } from 'expo-status-bar'
import {
  SafeAreaView,
  View,
  Platform
} from 'react-native'
import Toast from 'react-native-toast-message'

import Constants from 'expo-constants'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client'
import { GRAPHQL_API } from './src/utils/config'
import Navigation from './src/components/Navigation'

const client = new ApolloClient({
  uri: GRAPHQL_API,
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === 'android'
                ? Constants.statusBarHeight
                : 0
          }}
        >
          <StatusBar
            style="auto"
            backgroundColor="#e5e5e7"
          />
          <View className="flex-1">
            <Navigation />
          </View>
        </SafeAreaView>
      </ApolloProvider>
      <Toast
        visibilityTime={4000}
        position="top"
      />
    </View>
  )
}
