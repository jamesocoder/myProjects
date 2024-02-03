/* Following this tutorial:
https://learn.microsoft.com/en-us/windows/win32/winsock/getting-started-with-winsock

WSA = Windows Sockets API
*/

#include <stdio.h>
#include <WinSock2.h>
#include <WS2tcpip.h>

#include "server.c"
#include "client.c"

int errWsa = 0;

void unhandledErrWsa(char newline) {
    printf("Unhandled error encountered: Windows Sockets Error #%d", errWsa);
    if (newline) {printf("\n");}
    /* Refer to:
    https://learn.microsoft.com/en-us/windows/win32/winsock/windows-sockets-error-codes-2 */
}

void handleErrWsaStartup() {
    printf("WSAStartup ERROR:\n\t");
    switch(errWsa) {
        case WSASYSNOTREADY:
            printf(
                "Encountered issues with accessing the Windows Sockets " \
                "DLL (Ws2_32.dll) and its related components.  Please " \
                "check your Windows system files.");
            break;
        case WSAVERNOTSUPPORTED:
            printf("The Windows Sockets DLL (Ws2_32.dll) is out of date.");
            break;
        case WSAEINPROGRESS:
            printf(
                "A blocking Socket operation is currently in progress " \
                "and preventing the startup of this application.  Please " \
                "wait a few minutes and then try starting it again.");
            break;
        case WSAEPROCLIM:
            printf(
                "Windows Sockets has reached its limit on the number of " \
                "programs that can use it simultaneously.  Please shut " \
                "down some programs or wait for them to finish executing " \
                "before trying again.");
            break;
        case WSAEFAULT:
            printf("Code error? wsaData may not be defined.");
            break;
        default:
            unhandledErrWsa(0);
    }
    printf("\n");
}

void handleErrWsaCleanup() {
    errWsa = WSAGetLastError();
    switch(errWsa) {
        case WSANOTINITIALISED:
            /* Winsock was never successfully started up and so does not need
            to be cleaned up. */
            break;
        case WSAENETDOWN:
            /* The network went down for whatever reason.  It may be safe to
            assume that there is nothing to cleanup in this case. */
            break;
        case WSAEINPROGRESS:
            /* Some socket operation is still in progress and blocking WSACleanup()
            from executing.
            TODO: wait x seconds, then try calling WSACleanup() again.*/
            printf(
                "WSACleanup ERROR:\n\t" \
                "A blocking call is preventing the program from cleaning up.\n");
            break;
        default:
            unhandledErrWsa(1);
    }
}

void main() {
    const unsigned char BUFF_LEN = 255;
    const unsigned short PORT = 1200;

    printf("\n~~~ Starting C Progam ~~~\n");

    /* WSADATA is a struct defined in WinSock2.h that stores the information
    retrieved by WSAStartup().  This represents details of the system's
    support for a Windows Socket. */
    WSADATA wsaData;

    /* WSAStartup()
    The first parameter calls for a WORD value (defined in minwindef.h) that
    specifies which Winsock version this application requires.  The latest
    version of Winsock has been 2.2._ for decades as of 2024.
    
    The int returned by WSAStartup is 0 on success.
    https://learn.microsoft.com/en-us/windows/win32/api/winsock/nf-winsock-wsastartup#return-value */
    errWsa = WSAStartup(MAKEWORD(2,2), &wsaData);
    if (errWsa != 0) {
        handleErrWsaStartup();
        return;
    }

    makeServer();
    makeClient(BUFF_LEN, PORT);
    printf("\n");

    /* Every WSAStartup() call must be accompanied by a WSACleanup() call.
    If we call startup 2 times, then cleanup must be called 2 times. Cleanup
    should be called after our program is done using Winsock to release its
    resources. 
    
    Returns 0 on success; otherwise returns SOCKET_ERROR (-1, defined in WinSock2.h)
    on a failure. WSAGetLastError() (defined in winsock.h) must be called to get a
    more specific error code. */
    errWsa = WSACleanup();
    if (errWsa != 0) {handleErrWsaCleanup();}
}