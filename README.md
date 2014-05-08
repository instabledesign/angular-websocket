# Angular websocket provider

A simple websocket provider for angular


# Authors

Team AOS :

* [Anthony Moutte](https://github.com/instabledesign)
* [Styvo](https://github.com/FullMoonIssue)

# Requirements

* Anglar
* [Browser using WebSockets](http://caniuse.com/websockets)

# Licence

This project is under the GNU GPL v2 licence.

Take a look at the associated file for more information.

# Use

[Demo (jsfiddle)](http://jsfiddle.net/XfUY3/)

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
        $rootScope.$on('websocket.connected', function () {
            $websocket.request({content: 'Hello from websocket'}).then(
                function (response) {
                    $scope.response = response;
                }
            );
        });
    });
```
