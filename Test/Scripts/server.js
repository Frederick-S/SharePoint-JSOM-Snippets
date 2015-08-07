(function ($, SP) {
    // Get the version of SharePoint
    function getVersionOfSharePoint() {
        var clientContext = SP.ClientContext.get_current();

        clientContext.executeQueryAsync(function (sender, args) {
            var serverVersion = clientContext.get_serverVersion();

            $('#version-of-sharepoint').text('The SharePoint version is: ' + serverVersion);
        }, function (sender, args) {
            $('#version-of-sharepoint').text(args.get_message());
        });
    };

    getVersionOfSharePoint();
})(jQuery, SP);