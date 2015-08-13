# Web
## Get all subwebs under web recursively
First let's define a simple data structure to represent the web object data.

```js
function WebNode(web) {
    this.title = web.get_title();
    this.subWebs = [];
}
```

Then we have the function to query subwebs recursively:

```js
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
```

And here is how to use it:

```js
var clientContext = SP.ClientContext.get_current();
var web = clientContext.get_web();

clientContext.load(web);
clientContext.executeQueryAsync(function (sender, args) {
    queryWebContent(web, clientContext, function (webNode) {
        // Done!
    }, function (sender, args) {
        alert(args.get_message());
    });
}, function (sender, args) {
    alert(args.get_message());
});
```
