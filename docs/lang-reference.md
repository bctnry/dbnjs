# dbn.js Reference

## Syntax

```
Command ::= SimpleCommand ("{" Command* "}")?
SimpleCommand ::= Element+
Element ::= AtomicElement | ArrayElement | PositionElement | Expr
AtomicElement ::= INTEGER
ArrayElement ::= "<" IDENTIFIER ">"
PositionElement ::= "[" INTEGER INTEGER "]"
Expr ::=
```

## Keywords in other languages

The original DBN supports keywords in different languages; this is implemented in dbnjs.

Set the configuration above the `DBN.run()` line, like this:

``` html
<script>
    DBN.setLanguage("japanese");  // or other languages
    DBN.run();
</script>
```

Supported languages are listed below:

+ `"spanish"`: Spanish
+ `"french"`: French
+ `"japanese"`: Japanese
+ `"chinese-simp"`: Simplified Chinese
+ `"chinese-trad"`: Traditional Chinese

## Core features

### Canvas & Drawing

<detail><summary>`paper`</summary>

</detail>

<detail><summary>`pen`</summary>

</detail>

<detail><summary>`point`</summary>

</detail>

<detail><summary>`line`</summary>

</detail>

### Conditions

<detail><summary>`same?`</summary>

</detail>

<detail><summary>`notsame?`</summary>

</detail>

<detail><summary>`smaller?`</summary>

</detail>

<detail><summary>`notsmaller?`</summary>

</detail>

### Repetition

<detail><summary>`repeat`</summary>

</detail>

<detail><summary>`forever`</summary>

</detail>



## "Hidden" features

### Colors

### Arrays

### Canvas sizing



## Extended Features

### Turtle graphics

<detail><summary>`turtle` x-origin y-origin facing</summary>

</detail>

### Conditions

<detail><summary>`bigger?`</summary>

</detail>

<detail><summary>`notbigger?`</summary>

</detail>

### Control flow

<detail><summary>`if`</summary>

</detail>

<detail><summary>`while`</summary>

</detail>

