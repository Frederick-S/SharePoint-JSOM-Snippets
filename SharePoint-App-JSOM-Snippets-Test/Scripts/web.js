(function ($, SP, Util) {
    function WebNode(web) {
        this.title = web.get_title();
        this.subWebs = [];
    }

    function queryWebContent(web, clientContext, successHandler, errorHandler) {
        var webs = web.get_webs();
        var webNode = new WebNode(web);

        clientContext.load(webs);
        clientContext.executeQueryAsync(function (sender, args) {
            var subWebs = [];

            each(webs, function (web) {
                subWebs.push(web);
            });

            var count = subWebs.length;

            if (count > 0) {
                each(subWebs, function (subWeb) {
                    queryWebContent(subWeb, clientContext, function (subWebNode) {
                        count--;
                        webNode.subWebs.push(subWebNode);

                        if (count === 0) {
                            successHandler(webNode);
                        }
                    });
                });
            } else {
                successHandler(webNode);
            }
        }, errorHandler);
    }

    function query() {
        var clientContext = SP.ClientContext.get_current();
        var hostUrl = Util.getQueryStringParameter('SPHostUrl');
        var appContextSite = new SP.AppContextSite(clientContext, hostUrl);
        var web = appContextSite.get_web();

        clientContext.load(web);
        clientContext.executeQueryAsync(function (sender, args) {
            queryWebContent(web, clientContext, function (webNode) {
                $('#all-subwebs').text(JSON.stringify(webNode, null, 4));
            }, function (sender, args) {
                alert(args.get_message());
            });
        }, function (sender, args) {
            alert(args.get_message());
        });
    }

    var each = function (collection, iteratee) {
        if (typeof collection.getEnumerator === 'function') {
            var enumerator = collection.getEnumerator();

            while (enumerator.moveNext()) {
                iteratee(enumerator.get_current());
            }
        } else if (Object.prototype.toString.call(collection) === '[object Array]') {
            for (var i = 0, length = collection.length; i < length; i++) {
                iteratee(collection[i]);
            }
        }
    };

    query();
})(jQuery, SP, Util);