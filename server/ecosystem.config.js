module.exports = {
    apps : [
        {
            name        : "prontuariobm",
            script      : "./bin/server.js",
            watch       : true,
            env: {
                "NODE_ENV": "development",
            },
            env_production : {
                "NODE_PORT": "3000",
                "NODE_ENV": "production"
            }
        }
    ]
}