// jQuery plugin
(function( $ ) {
    
    var url_authorise = "api/ws.svc/export_api/v1/8689284273/28114/authorise";
    var url_properties = "api/ws.svc/export_api/v1/8689284273/28114/properties"; 
    var ids = [];

    $.fn.api = function(options) {
        getResource({url: options.url, retry: true})
        return this;
    }

    // Private function for debugging
    function debug( obj ) {
        if (window.console && window.console.log) {
            window.console.log("selection count: " + obj.length);
        }
    };

    function onBeforeSendSetToken(ajaxOptions) {
        var sessionToken = sessionStorage.getItem('token');
        ajaxOptions.setRequestHeader("token", sessionToken);
    }
     
    function refreshToken() {
        $.ajax({
            url: url_authorise,
            method: "POST",
            contentType: "application/json",
            dataType: "JSON",
            data: JSON.stringify({
                key: "ab2c901f579861d54a6232ee6c19c65e84e532d2" 
              }),
            success: function(response) {
                sessionStorage.setItem('token', response.token);
                console.log(response.token);
            },
            error: function(err){
                console.log(err);
                return false;
            }
        })
    }

    function getResource(options) {
        $.ajax({
            method: "GET",
            url: options.url,
            dataType: 'JSON',
            beforeSend: onBeforeSendSetToken,
            /*statusCode: {
                401: refreshToken(getResource(options),{})
            },*/
            success: function(data){
                console.log("success - save ids");
                saveIds(data);
            },
            error: function(err){
                console.log(err);
                if(err.status == "401" && options.retry) {
                    console.log("unauthorised:");
                    var tokenPromise = new Promise(refreshToken);
                    tokenPromise.then(getResource({url: options.url, retry: false}));
                }
            }
        })
    }

    function saveIds(data){
        console.log("save ids:" + data)
        $.each(data.Properties, function(i){
          ids.push(data.Properties[i].Id);
        })
        localStorage.setItem("Id", JSON.stringify(ids));
    
      }


// End of plugin
}( jQuery ));