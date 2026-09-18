import { createContext, useContext, useEffect, useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { app } from '../firebase'

export const auth = getAuth(app)

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setCheckingAuth(false)
    })
    return unsubscribe
  }, [])

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: mapAuthError(err) }
    }
  }

  const logout = () => signOut(auth)

  // Sends a real password-reset link to the given email via Firebase.
  const sendResetEmail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: mapAuthError(err) }
    }
  }

  // Lets a logged-in admin change their own password.
  // Requires the current password again (re-authentication) — this is a
  // Firebase security requirement so a stolen/left-open session can't be
  // used to silently take over the account.
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!currentUser) throw new Error('not-logged-in')
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
      await reauthenticateWithCredential(currentUser, credential)
      await updatePassword(currentUser, newPassword)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: mapAuthError(err) }
    }
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin: !!currentUser,
        currentUser,
        checkingAuth,
        login,
        logout,
        sendResetEmail,
        changePassword,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

function mapAuthError(err) {
  const code = err?.code || ''
  if (code.includes('invalid-credential') || code.includes('wrong-password')) {
    return 'Incorrect email or password.'
  }
  if (code.includes('user-not-found')) return 'No account found with that email.'
  if (code.includes('invalid-email')) return 'Please enter a valid email address.'
  if (code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again.'
  if (code.includes('weak-password')) return 'New password should be at least 6 characters.'
  if (code.includes('requires-recent-login')) return 'Please log in again and retry.'
  return 'Something went wrong. Please try again.'
}
