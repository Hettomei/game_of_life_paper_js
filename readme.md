Another Game Of Life,
using javascript, and lib "paper.js"

This project needs a lot of refactoring.

And we can add a lot of optimisation.

It was created to learn javascript, and a "canvas" lib, like -why not- paper.js http://paperjs.org/

this need to be run using a local server - like

```shell
python -m SimpleHTTPServer
```
or

```shell
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 3000, :DocumentRoot => Dir.pwd).start'
```

or
```shell
$ echo "do_what_you_want_with_lamp_mamp_xamp_wamp_IIS_node.js...."
```

How it work ?

initialisation var are all in "val" var.
A displayed cell looks like "cel" var;

All cells are saved in "list_cel"

every frame, we loop on list_cell and look for future changed state.
The changed state goes in "invert_state", and then we display all.

##Benchmark

Very quick benchmark:

for size = 10, FPS ~= 7.5;


MIT License

Copyright (c) 2013 Timothée Gauthier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

//copy paste from here : http://opensource.org/licenses/MIT
