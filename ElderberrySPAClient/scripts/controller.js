define(['jquery', 'underscore', 'apiManager'], function ($, _, apiManager) {
    'use strict';

    var controller = (function () {
        var requestsURL;

        function setRequestsURL(url) {
            requestsURL = url;
        }

        function setDOMEvents() {
            $('#main-container').on('click', '#btn-login', function () {
                window.location = '#/login';
            });

            $('#main-container').on('click', '#btn-request-login', function () {
                var username, password;
                username = $('#tb-username').val();
                password = $('#tb-password').val();
                apiManager.login(requestsURL, username, password);
            });

            $('#main-container').on('click', '#btn-register', function () {
                window.location = '#/register';
            });

            $('#main-container').on('click', '#btn-request-register', function () {
                var username, password, confirmPassword;

                username = $('#tb-username').val();
                password = $('#tb-password').val();
                confirmPassword = $('#tb-confirmPassword').val();

                apiManager.register(requestsURL, username, password, confirmPassword);
            });

            $('#main-container').on('click', '#btn-check-code', function () {
                window.location = '#/check-code';
            });

            $('#main-container').on('click', '#btn-request-check-code', function () {
                var code, authToken;

                code = $('#tb-user-code').val();
                authToken = getAuthToken();

                apiManager.checkCode(requestsURL, authToken, code);
            });

            $('#main-container').on('click', '#btn-view-registered-codes', function () {
                var authToken, $tempContainer, source, template, html;

                authToken = getAuthToken();
                window.location = '#/view-registered-codes';
                apiManager.checkRegisteredCodes(requestsURL, authToken)
                    .then(function (data) {
                        $tempContainer = $('<ul>');
                        source = $('#codes-template').html();
                        template = Handlebars.compile(source);

                        _.each(data, function (code) {
                            html = template(code);
                            $($tempContainer).append(html);
                        });

                        if ($tempContainer.children().length === 0) {
                            $tempContainer.append('<li/>').html('No codes added!');
                        }

                        $('#codes-container').html($tempContainer.html());
                    });
            });

            $('#main-container').on('click', '#btn-logout', function () {
                var authToken;

                authToken = getAuthToken();
                //apiManager.logout(requestsURL, authToken);
                clearSessionStorage();
                resetPageElements();
            });
        }

        function getAuthToken() {
            var token = sessionStorage.getItem('authToken');

            return 'Bearer ' + token;
        }

        function isUserLogged() {
            if (sessionStorage.getItem('authToken') != undefined) {
                return true;
            }

            return false;
        }

        function clearSessionStorage() {
            sessionStorage.clear();
        }

        function resetPageElements() {
            $('#user-greeting').html('Hello, anonymous');
            $('#btn-login').show();
            $('#btn-register').show();
            $('#btn-logout').hide();
            $('#btn-check-code').hide();
            $('#btn-view-registered-codes').hide();
        }

        return {
            setRequestsURL: setRequestsURL,
            setDOMEvents: setDOMEvents,
            isUserLogged: isUserLogged
        };
    }());

    return controller;
});