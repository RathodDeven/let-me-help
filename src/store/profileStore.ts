import { User } from 'generated'
import { create } from 'zustand'

interface ProfileState {
  currentUser: User | null
  setCurrentUser: (
    user: User | null
  ) => void
}

export const useProfileStore =
  create<ProfileState>((set) => ({
    currentUser: null,
    setCurrentUser: (user) =>
      set(() => ({ currentUser: user }))
  }))
