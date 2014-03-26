'use strict';

var myApp = angular.module('myApp', ['websocket'])
    .config(['$websocketProvider',
        function ($websocketProvider) {
            $websocketProvider.path = 'ws://echo.websocket.org';
        }
    ]);

var injector;

module('WEBSOCKET', {
    setup: function () {
        injector = angular.injector(['ng', 'myApp']);
    },
    teardown: function () {
        injector = {};
    }
});

asyncTest('angular-websocket', function () {
    expect(3);

    var $websocket = injector.get('$websocket'),
        $rootScope = injector.get('$rootScope');

    $rootScope.$on('websocket.connected', function () {
        // Connection test
        equal($websocket.getConnection().readyState, 1, 'Connected to ' + $websocket.path);

        // Request test
        $websocket.request({method: 'JSONRPC.Ping'}).then(function (response) {
            equal(response.method, 'JSONRPC.Ping', 'Request {method: \'JSONRPC.Ping\'}');
            $websocket.close();
        });
    });

    // Close connection test
    $rootScope.$on('websocket.closed', function () {
        equal($websocket.getConnection().readyState, 3, 'Connection close ' + $websocket.path);

        start();
    });
});
