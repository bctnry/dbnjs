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

<details><summary>`paper`</summary>
Aliases: <span>?<sup>spanish</sup></span><br />
Parameters:
<details><summary>`paper` *gray-scale*</summary>
Set the background's color.
</details>

<details><summary>`paper` *red* *green* *blue*</summary>
Set the background's color.
</details>
</details>

<details><summary>`pen`</summary>

</details>

<details><summary>`point`</summary>

</details>

<details><summary>`line`</summary>

</details>

### Conditions

<details><summary>`same?`</summary>

</details>

<details><summary>`notsame?`</summary>

</details>

<details><summary>`smaller?`</summary>

</details>

<details><summary>`notsmaller?`</summary>

</details>

### Repetition

<details><summary>`repeat`</summary>

</details>

<details><summary>`forever`</summary>

</details>



## "Hidden" features

### Colors

### Arrays

### Canvas sizing



## Extended Features

### Turtle graphics

<details><summary>`turtle` x-origin y-origin facing</summary>

</details>

### Conditions

<details><summary>`bigger?`</summary>

</details>

<details><summary>`notbigger?`</summary>

</details>

### Control flow

<details><summary>`if`</summary>

</details>

<details><summary>`while`</summary>

</details>

