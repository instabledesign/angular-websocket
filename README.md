# Angular websocket provider

A simple websocket provider for angular


# Authors

* [Anthony Moutte](https://github.com/instabledesign)
* [Styvo](https://github.com/FullMoonIssue)

# Requirements

* Angular
* [Browser using WebSockets](http://caniuse.com/websockets)

# Licence

This project is under the GNU GPL v2 licence.

Take a look at the associated file for more information.

# Use

Include angular and the angular-websocket and optionnaly angular-websocket-log (for debug message)

```html
<script type="text/javascript" src="dist/angular-websocket.js"></script>
<script type="text/javascript" src="dist/angular-websocket-log.js"></script>
```

```javascript
var myApp = angular.module('myApp', ['websocket'])
        .config(['$websocketProvider',
            function ($websocketProvider) {
                // Configuration of the $websocketProvider
                $websocketProvider.path = 'ws://echo.websocket.org';
            }
        ])
        .controller('MyCtrl', function ($rootScope, $scope, $websocket) {
            $scope.response = 'Chargement en cours...';

            $rootScope.$on('websocket.open', function () {
                $websocket.send("Hello from websocket");
            });

            $rootScope.$on('websocket.message', function (event, origEvent) {
                $scope.response = origEvent.data;
                $scope.$apply();
            });
        });
```
