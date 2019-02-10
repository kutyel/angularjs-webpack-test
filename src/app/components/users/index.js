import angular from 'angular'

import UsersService from './users.service'
import UsersListComponent from './users-list/users-list.component'
import UserAddressComponent from './user-address/user-address.component'
import UserDetailComponent from './user-detail/user-detail.component'

export default angular
  .module('users', [])
  .component('usersList', UsersListComponent)
  .component('userAddress', UserAddressComponent)
  .component('userDetail', UserDetailComponent)
  .service('UsersService', UsersService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('users', {
        url: '/',
        component: 'usersList',
        resolve: {
          usersList: UsersService => UsersService.getUsers(),
        },
      })
      .state('user-detail', {
        url: '/users/:id',
        component: 'userDetail',
        resolve: {
          user: (UsersService, $stateParams) =>
            UsersService.getUser($stateParams.id),
        },
      })
    $urlRouterProvider.otherwise('/')
  }).name
