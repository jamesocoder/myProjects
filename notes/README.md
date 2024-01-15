# Table of Contents
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* Note that you can cause language-specific syntax highlighting by naming the language at the top of the code snippet.  See which "languages" are supported by visiting [highlight.js's documentation page](https://highlightjs.readthedocs.io/en/latest/supported-languages.html).

## VSCode
* [Configurations](0000.md)
    - An exploration of the files found in the .vscode directory

## C Language
* [make.exe for VSCode/Windows Powershell](0004.md)
    - This is traditionally a Linux program for organizing the compilation steps of a program written in C
    - There's a possiblity that VSCode is capable of doing what make.exe does by using its configuration json's, but in case it isn't capable, this goes over how to get make.exe working on a Windows machine.
* [Preprocessor Directives](0001.md)
    - A refresher on how to combine code written in different files in C using #import
    - Also provides a reference to other #keywords like #define for declaring global constants in a file
* [Data types](0003.md)
    - Notes about C data type peculiarities
* [main()](0002.md)
    - A refresher on how C takes in arguments from the command line

## Miscellaneous
* POSIX and UNIX
    - POSIX stands for Portable Operating System Interface.  It is a set of standard specifications that an OS can be "certified" against, meaning it meets those minimum standards of functionality.
    - UNIX stands for UNiplexed Information Computing System.  It is a historical OS that many modern OS's have improved upon.  Modern OS's are typically "capable of running UNIX programs".