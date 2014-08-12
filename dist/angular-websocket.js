'use strict';

/**
 * Websocket's Angular module
 * Provider $websocket
 * Establish a connection to a websocket
 *
 * @event websocket.open When the connection is ready
 * @event websocket.close When the connection is closed
 * @event websocket.message When a message occurs
 * @event websocket.error When a error occurs
 * @event websocket.send When a data is send
 */
var websocketModule = angular
    .module('websocket', [])
    .provider('$websocket', [
        function () {
            var _this = this;

            // Websocket path connection
            _this.path = null;

            /**
             * angular's provider $get method
             *
             * @return $websocket The websocket provider
             */
            _this.$get = ['$rootScope',
                function ($rootScope) {

                    /**
                     * Connection to the websocket
                     */
                    var connection = new WebSocket(_this.path);

                    /**
                     * When the connection is ready
                     *
                     * @event websocket.connected
                     */
                    connection.onopen = function (event) {
                        $rootScope.$emit('websocket.open', event);
                    };

                    /**
                     * When the connection is closed
                     *
                     * @event websocket.closed
                     */
                    connection.onclose = function (event) {
                        $rootScope.$emit('websocket.close', event);
                    };

                    /**
                     * When a message occurs
                     *
                     * @event websocket.message When a message occurs
                     */
                    connection.onmessage = function (event) {
                        $rootScope.$emit('websocket.message', event);
                    };

                    /**
                     * When a error occurs
                     *
                     * @event websocket.error When a error occurs
                     */
                    connection.onerror = function (event) {
                        $rootScope.$emit('websocket.error', event);
                    };

                    /**
                     * Get the connection
                     *
                     * @returns {WebSocket}
                     */
                    _this.getConnection = function () {
                        return connection;
                    }

                    /**
                     * Do a request throught the connection
                     *
                     * @param data
                     */
                    _this.send = function (data) {
                        connection.send(data);
                        $rootScope.$emit('websocket.send', data);
                    };

                    /**
                     * Close the connection to the WebSocket
                     */
                    _this.close = function () {
                        connection.close();
                    };

                    return _this;
                }
            ];
        }
    ]);
