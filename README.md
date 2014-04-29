one_piece
=========

App to view one piece commic, based on [node-webkit](https://github.com/rogerwang/node-webkit).

Depends
----------

* node.js
* npm
* node-webkit

Usage
---------

    cd src
    npm i
    zip -r ../app.nw *
    cd ..
    nw app.nw

Keyboard shortcut
^^^^^^^^^^^^^^^^^^^^^^

* H, previous image
* L, next image
* J, scroll down
* K, scroll up

Build for multiple platform
-------------------------------

Modify the ``Grunfile``:

    options: {
        build_dir: './webkitbuilds', 
        mac: false, // Change to true if want to build it for mac
        win: true, // Change to true if  want to build it for win
        linux32: false, // 
        linux64: true // 
    },

And then,

    grunt

Wait for a long time and the built binaries will be in ``/webkitbuilds``.




