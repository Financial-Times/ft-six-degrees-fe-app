const PORT = process.env.PORT || 3000;

require('pushstate-server').start({
    port: PORT,
    directory: './build'
});

console.info('[boot] Running server on port ' + PORT + '...');