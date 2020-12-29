import mysql = require('mysql');


export default class MySQL {

    private static _instance:MySQL;

    cnn: mysql.Connection;
    conectado:boolean = false;

    constructor(){
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host     : 'db4free.net',
            user     : 'root_cfn',
            password : 'root1234',
            database : 'db_nodecfn'
            // host     : 'localhost',
            // user     : 'root',
            // password : 'root',
            // database : 'db_node'
        });
        this.conectarDB();
    }

    public static get instance(){

        return this._instance || (this._instance = new this());
    }

    public static ejecutarQuery(query:string,callback:Function){
        this.instance.cnn.query(query,(err,results:Object[],fields)=>{

            if(err){
                console.log("Error en query");
                console.log(err);
                return callback(err);
            }
            if(results.length == 0){
                return callback('El registro solicitado no existe');
            }
            callback(null,results);
        });
    }

    private conectarDB(){
        this.cnn.connect((err: mysql.MysqlError)=>{

            if(err){
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('Base de datos online!');

        })
    }
}