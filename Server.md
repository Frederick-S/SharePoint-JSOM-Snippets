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

You can use this code to check the version of SharePoint. But the major version of SharePoint Online and SharePoint On-Premises are different. For SharePoint 2013 On-Premises, it returns 15.x.x.x and the SharePoint 2013 Online will return 16.x.x.x.
