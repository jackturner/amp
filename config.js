var conf = {}

conf.env = process.env["NODE_ENV"] || "development"
conf.db_password = (conf.env === "development") ? "root" : "DONT YET KNOW"
conf.db_port = (conf.env === "development") ? 8889 : 3306

module.exports = conf
