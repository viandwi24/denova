import { env } from "../mod.ts";

export default {
   /*
   |--------------------------------------------------------------------------
   | Default Database Connection Name
   |--------------------------------------------------------------------------
   |
   | Here you may specify which of the database connections below you wish
   | to use as your default connection for all database work. Of course
   | you may use many connections at once using the Database library.
   |
   */
   default: env('DB_CONNECTION', 'mysql'),   

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Denova is shown below to make development simple.
    |
    */

   connections: {
       
        mysql: {
            driver: 'mysql',
            host: env('DB_HOST', '127.0.0.1'),
            port: env('DB_PORT', '3306'),
            database: env('DB_DATABASE', 'denova'),
            username: env('DB_USERNAME', 'root'),
            password: env('DB_PASSWORD', null),
        }
   }
}