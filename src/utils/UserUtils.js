import { privileges }  from './config';

var customerPrivileges = ["DOWNLOAD_OUTPUT"]

export default function getRole(UserPrivileges) {
  var role = ""
  if(UserPrivileges && UserPrivileges.length) {
    for(var data of UserPrivileges){
      if(privileges.includes(data.name)){
        role= "orgAdmin"
        localStorage.setItem('UserRole','orgAdmin')
        break
      }
      else if(customerPrivileges.includes(data.name)) {
        role = "customer"
        localStorage.setItem('UserRole','customer')
      }
      else {
        role = "user"
        localStorage.setItem('UserRole','user')
      }
    }
  }

  return role
}