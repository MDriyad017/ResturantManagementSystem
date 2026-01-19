angular.module('myApp').factory('jwtHelper', [function () {
    return {
        getPayload: function (token) {
            if (!token) return null;
            try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            } catch (e) {
                console.error("JWT Decode Error", e);
                return null;
            }
        }
    };
}]);