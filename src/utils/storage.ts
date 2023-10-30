// storage.js

import AsyncStorage from '@react-native-async-storage/async-storage'

export const storageKeys = {
  USERNAME: 'username',
  PASSWORD: 'password'
}

// Function to set data in storage
export const setItem = async (
  key,
  value
) => {
  try {
    await AsyncStorage.setItem(
      key,
      value
    )
  } catch (error) {
    console.log(
      'Error saving data:',
      error
    )
  }
}

export const setItemAsync = (
  key,
  value
) => {
  return new Promise(
    (resolve, reject) => {
      AsyncStorage.setItem(key, value)
        .then(() => {
          resolve(null)
        })
        .catch((error) => {
          console.log(
            'Error saving data:',
            error
          )
          reject(error)
        })
    }
  )
}

// Function to retrieve data from storage
export const getItem = async (key) => {
  try {
    const value =
      await AsyncStorage.getItem(key)
    return value
  } catch (error) {
    console.log(
      'Error retrieving data:',
      error
    )
    return null
  }
}

export const getItemAsync = (
  key: string
) => {
  return new Promise(
    (resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          resolve(value)
        })
        .catch((error) => {
          console.log(
            'Error retrieving data:',
            error
          )
          reject(error)
        })
    }
  )
}

// Function to remove data from storage
export const removeItem = async (
  key
) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log(
      'Error removing data:',
      error
    )
  }
}

// Function to clear all data from storage
export const clearStorage =
  async () => {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.log(
        'Error clearing data:',
        error
      )
    }
  }
