class UsersService {
  constructor($http) {
    this.$http = $http
  }

  getUsers() {
    return this.$http
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => res.data)
  }

  getUser(id) {
    return this.$http
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.data)
  }
}

UsersService.$inject = ['$http']

export default UsersService
