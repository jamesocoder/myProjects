#include <stdio.h>
#include "server.c"
#include "client.c"

void main() {
    printf("\n~~~ Starting C Progam ~~~\n");
    makeServer();
    makeClient();
    printf("\n");
}