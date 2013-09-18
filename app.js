/**
 * Created with JetBrains WebStorm.
 * User: raogangshan
 * Date: 13-9-18
 * Time: 上午10:40
 * To change this template use File | Settings | File Templates.
 */

var server = require('http');

function StartServer (config) {
    var url = require('url');
    var router = require('./Router');
    function onRequest (request, response) {
        var pathname, querystr;
        var urlData = url.parse(request.url);
        pathname = urlData.pathname;
        querystr = urlData.query;
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write(router.route(pathname, querystr));
        response.end();
    };
    server.createServer(onRequest).listen(config.port, config.ip);
    console.log("Server run on ", config.ip, ", port:" , config.port);
};

function LoadConfig(onOK){
    var fs = require('fs');
    fs.readFile('config.json', 'utf-8', function(error, data){
        if (error) throw error;
        var json = JSON.parse(data);
        if (onOK) {
            onOK(json);
        }
    });
}

LoadConfig(StartServer);