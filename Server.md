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

You can use this code to check which version of SharePoint is used. But the major version of SharePoint Online and SharePoint On-Premises are different. For SharePoint 2013, the On-Premises version will return 15 and the online version will return 16.
