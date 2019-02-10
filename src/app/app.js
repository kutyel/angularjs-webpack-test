import angular from 'angular'
import uiRouter from 'angular-ui-router'

import components from './components/components'
import { AppComponent } from './app.component'

import '../style/app.css'
import 'materialize-css/dist/css/materialize.min.css'

const root = angular
  .module('angularApp', [uiRouter, components])
  .component('app', AppComponent).name

export default root
