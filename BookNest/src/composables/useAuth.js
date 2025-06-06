// client/src/composables/useAuth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return !!token
  }
  
  export const getUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  
  export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')


      
      


  }
  