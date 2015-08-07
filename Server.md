# Server
## Get the version of SharePoint
```js
var clientContext = SP.ClientContext.get_current();

clientContext.executeQueryAsync(function (sender, args) {
    var serverVersion = clientContext.get_serverVersion();

    alert(serverVersion);
}, function (sender, args) {
    alert(args.get_message());
});
```
