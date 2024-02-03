/* Following this tutorial:
https://learn.microsoft.com/en-us/windows/win32/winsock/getting-started-with-winsock
*/

#include <stdio.h>
#include <WinSock2.h>
#include <WS2tcpip.h>
#pragma comment(lib, "Ws2_32.lib")

#include "server.c"
#include "client.c"

void main() {
    const unsigned char BUFF_LEN = 255;
    const unsigned short PORT = 1200;

    printf("\n~~~ Starting C Progam ~~~\n");
    makeServer();
    makeClient(BUFF_LEN, PORT);
    printf("\n");
}