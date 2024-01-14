#include <stdio.h>
#include "server.c"
#include "client.c"

void main() {
    const unsigned char BUFF_LEN = 255;
    const unsigned short PORT = 1200;

    printf("\n~~~ Starting C Progam ~~~%d\n", BUFF_LEN);
    makeServer();
    makeClient();
    printf("\n");
}