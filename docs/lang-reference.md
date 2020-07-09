# dbn.js Reference

## Syntax

```
Program ::= Command*
Command ::= SimpleCommand ("{" Command* "}")?
SimpleCommand ::= IDENTIFIER Expr*
ArrayElement ::= "<" IDENTIFIER Expr ">"
PositionElement ::= "[" Expr Expr IDENTIFIER? "]"
Expr ::= INTEGER | IDENTIFIER | ArrayElement | PositionElement | "(" ComplexExpr ")"
ComplexExpr ::= Factor | ComplexExpr ("+" | "-") Factor
Factor ::= Expr | Factor ("*" | "/" | "%") Expr
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

## Command Reference

### Canvas & Drawing

<!-- paper  -->
<details><summary><code>paper</code> - Set the color of background.</summary>

Aliases: <code>papel</code><sup>spanish</sup> <code>papier</code><sup>french</sup> <code>かみ</code><sup>japanese</sup> <code>纸</code><sup>chinese-simp</sup> 

<!-- paper grayscale -->
<details><summary><code>paper</code> <i>gray-scale</i></summary>
Set the color of background.

*gray-scale* is an integer between 0 to 100, with 0 representing **white** and 100 representing **black**.
</details>

<!-- paper color -->
<details><summary><code>paper</code> <i>red</i> <i>green</i> <i>blue</i></summary>
Set the color of background.

*red*, *green*, *blue* are integers between 0 to 100, with 0 representing **0%** and 100 representing **100%**.

e.g. `paper 100` is equivalent to `paper 0 0 0`, and `paper 0` is equivalent to `paper 100 100 100`.
</details>
</details>

<details><summary><code>pen</code> - Set the color of foreground.</summary>
Aliases: <code>stilo</code><sup>spanish</sup> <code>plume</code><sup>french</sup> <code>ペン</code><sup>japanese</sup> <code>笔</code><sup>chinese-simp</sup> 

Set the color of foreground.

</details>


<!-- point  -->
<details><summary><code>point</code> - Draw a point at specific position.</summary>

</details>

<details><summary><code>line</code> - Draw a line at specific position.</summary>

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

### Aliases

