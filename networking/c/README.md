# A record of the pros and cons of working in C

## OS Difficulties
I encountered my first issue when trying to figure out which socket library I needed to use.  The library names and functionalities differ between operating systems.  The first tutorial I found was written for Linux.  I wanted to practice using Windows libraries since all of my machines at home are Windows machines, so that led me to finding Microsoft's tutorials for socket programming.  I imagine that iOS libraries are also different.

I recall learning that it is possible to conditionally compile code depending upon what system is compiling it.  I believe this was done with *preprocessor directives* in C.  If I had to write a program entirely in C, I'd have to write different versions of it for each OS I'm targetting and conditionally compile it.

Other languages solve this problem by making their libraries figure out which system socket library is appropriate for you.