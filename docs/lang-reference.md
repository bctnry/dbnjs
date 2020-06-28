# dbn.js Reference

## Syntax

```
Program ::= Command*
Command ::= SimpleCommand ("{" Command* "}")?
SimpleCommand ::= Element+
Element ::= ArrayElement | PositionElement | Expr
AtomicElement ::= INTEGER
ArrayElement ::= "<" IDENTIFIER Expr ">"
PositionElement ::= "[" Expr Expr IDENTIFIER? "]"
Expr ::= AtomicExpr | "(" ComplexExpr ")"
ComplexExpr ::= Factor | ComplexExpr ("+" | "-") Factor
Factor ::= AtomicExpr | Factor ("*" | "/" | "%") AtomicExpr
AtomicExpr ::= INTEGER | IDENTIFIER | ArrayElement | PositionElement | "(" Expr ")"
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
Aliases: <span>?<sup>spanish</sup></span><br />
Parameters:
<detail><summary>`paper` *gray-scale*</summary>
Set the background's color.
</detail>

<detail><summary>`paper` *red* *green* *blue*</summary>
Set the background's color.
</detail>
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

