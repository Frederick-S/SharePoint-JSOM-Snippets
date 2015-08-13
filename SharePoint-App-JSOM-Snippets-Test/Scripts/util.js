(function (window) {
    var getQueryStringParameter = function (param) {
        var params = document.URL.split("?")[1].split("&");
        var strParams = "";

        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");

            if (singleParam[0] == param) {
                return decodeURIComponent(singleParam[1]);
            }
        }
    };

    var Util = {
        getQueryStringParameter: getQueryStringParameter
    };

    window.Util = Util;
})(window);