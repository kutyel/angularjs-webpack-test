import template from './users-list.html'
import controller from './users-list.controller'

export default {
  bindings: {
    usersList: '<',
  },
  controller,
  template,
}
