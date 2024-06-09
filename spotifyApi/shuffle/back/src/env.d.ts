/* This type declaration module defines the variables we
expect to see in our environment by extending the
NodeJS.ProcessEnv global interface.

https://www.youtube.com/watch?v=FBZidnvNSUg

Note that limiting a member to certain literal values
only aids us when trying to change their values in
code; VS-Code's autofill will provide these as options.
This in no way prevents dotenv from loading bad values
in from an .env file or the user from assigning bad
values prior to launching the program in the terminal. */

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number

            // Spotify Developer's App ID
            CLIENT_ID: string

            /* For setting the app into production mode
            which disables Express's stack trace printing
            on error */
            NODE_ENV?: 'development' | 'production'

            /* For setting which debug messages to print.
            This must be set in the terminal before
            launching a Node app; it can't be set by an
            .env file.  Because of this, this declaration
            is unncessary.  It is only kept here to serve
            as a reminder of this functionality and for
            the app to be able to check its value. */
            DEBUG?: string
        }
    }
}

export {};