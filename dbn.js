var DBN = (function(){
    // util funcs.
    var withTag = function (tag) { return function (...args) { args._tag = tag; return args; }; };
    var checkTag = function (tag) { return function (x) { return x._tag === tag; }; };
    var nth = function (n) { return function (x) { return x[n]; }; }

    // lexer.
    var lex_isIdentifierStart = function (x) {
        // TODO: fix this after figuring out how to implement UAX #31
        return (
            '_'.includes(x)
            || ('a' <= x && x <= 'z') || ('A' <= x && x <= 'Z')
        );
    }
    var lex_isIdentifierContinue = function (x) {
        // TODO: fix this after figuring out how to implement UAX #31
        return (
            '_'.includes(x)
            || ('a' <= x && x <= 'z') || ('A' <= x && x <= 'Z')
            || ('0' <= x && x <= '9')
        );
    }
    var lex_skipWhite = function (s, i, oldLine, oldCol) {
        var line = oldLine, col = oldCol;
        while (s[i] && ' \t\r\n'.includes(s[i])) {
            if (s[i] === '\r') {
                if (s[i+1] && s[i+1] === '\n') {
                    i += 2;
                } else {
                    i += 1;
                }
                line += 1;
                col = 0;
            } else if (s[i] === '\n') {
                i += 1; line += 1; col = 0;
            } else {
                i += 1; col += 1;
            }
        }
        return [i, line, col];
    }
    var TOKEN = {
        INTEGER: 1,
        IDENTIFIER: 2,
        LPAREN: 3,
        RPAREN: 4,
        LBRACE: 5,
        RBRACE: 6,
        LANGLE: 7,
        RANGLE: 8,
        LSQB: 9,
        RSQB: 10,
        PLUS: 11,
        MINUS: 12,
        MULT: 13,
        DIV: 14,
        MOD: 15,
        COMMENT: 16
    }
    var Token = function (type, str, line, col) { return [type, str, line, col]; }
    var getTokenType = nth(0);
    var getTokenStr = nth(1);
    var getTokenLine = nth(2);
    var getTokenCol = nth(3);

    var lex = function (s) {
        var res = [];
        var i = 0;
        var line = 1, col = 1;
        var skipResult = lex_skipWhite(s, i, line, col);
        i = skipResult[0];
        line = skipResult[1];
        col = skipResult[2];
        while (s[i]) {
            switch (s[i]) {
                case '<': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '>': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '[': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case ']': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '(': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case ')': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '{': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '}': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '+': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '-': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '*': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++; break; }
                case '/': {
                    if (s[i+1] && s[i+1] === '/') {
                        var j = i+1;
                        while (s[j] && s[j] !== '\n') { j++; }
                        res.push(Token(TOKEN.COMMENT, s.substring(i, j), line, col));
                        col += j - i;
                        i = j;
                    } else {
                        res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); i++; col++;
                    }
                    break;
                }
                case '%': { res.push(Token(TOKEN.LANGLE, s.substring(i, i+1), line, col)); col++; break; }
                default: {
                    if ('0' <= s[i] && s[i] <= '9') {
                        var j = i+1;
                        while (s[j] && '0' <= s[j] && s[j] <= '9') { j++; }
                        res.push(Token(TOKEN.INTEGER, s.substring(i, j), line, col));
                        col += j - i;
                        i = j;
                    } else if (lex_isIdentifierStart(s[i])){
                        var j = i+1;
                        while (s[j] && lex_isIdentifierContinue(s[j])) { j++; }
                        res.push(Token(TOKEN.IDENTIFIER, s.substring(i, j), line, col));
                        col += j - i;
                        i = j;
                    } else {
                        throw new Error(['Line ', line+'', ' Col ', col+'', ': Lexical Error'].join(''));
                    }
                    break;
                }
            }
            var skipResult = lex_skipWhite(s, i, line, col);
            i = skipResult[0];
            line = skipResult[1];
            col = skipResult[2];
        }
        return res;
    }

    // localization.
    var TRANSLATION_DICT = {
        english: {},
        spanish: {},
        french: {},
        japanese: {},
        'chinese-simp': {},
        'chinese-trad': {}
    }
    // default as english.
    var CURRENT_LANGUAGE = 'english';
    var setLanguage = function (newLanguage) { CURRENT_LANGUAGE = newLanguage; }

    // parser.
    var TAG = {
        INTEGER: 1,
        IDENTIFIER: 2,
        ARRAYREF: 3,
        POSITION: 4,
        OP: 5,
        COMMAND: 6,
        COMMAND_BODY: 7
    };

    var Integer = withTag(TAG.INTEGER);
    var isInteger = checkTag(TAG.INTEGER);
    var getIntegerValue = nth(0);

    var Identifier = withTag(TAG.IDENTIFIER);
    var isIdentifier = checkTag(TAG.IDENTIFIER);
    var getIdentifierValue = nth(0);

    var ArrayRef = withTag(TAG.ARRAYREF);
    var isArrayRef = checkTag(TAG.ARRAYREF);
    var getArrayRefArray = nth(0);
    var getArrayRefIndex = nth(1);

    var Position = withTag(TAG.POSITION);
    var isPosition = checkTag(TAG.POSITION);
    var getPositionX = nth(0);
    var getPositionY = nth(1);
    var getPositionColor = nth(2);

    var Op = withTag(TAG.OP);
    var isOp = checkTag(TAG.OP);
    var getOpOp = nth(0);
    var getOpArg = function (x, n) { return x[n + 1]; };

    var Command = withTag(TAG.COMMAND);
    var isCommand = checkTag(TAG.COMMAND);
    var getCommandType = nth(0);
    var getCommandBody = function (x) {
        return isCommandBody(x[x.length - 1])? x[x.length - 1] : undefined;
    }
    var getCommandArgs = function (x) {
        return x.slice(1, isCommandBody(x[x.length - 1])? x.length - 1 : x.length);
    }
    
    var CommandBody = withTag(TAG.COMMAND_BODY);
    var isCommandBody = checkTag(TAG.COMMAND_BODY);

    var parseExpr = function (tl) {

    };
    var parseAtomicExpr = function (tl, i) {
        var i = 0;
        switch (getTokenType(tl[i])) {
            case TOKEN.INTEGER: { return [i+1, Integer(parseInt(getTokenStr(tl[i]), 10))]; }
            case TOKEN.IDENTIFIER: { return [i+1, Identifier(getTokenStr(tl[i]))]; }
            case TOKEN.LANGLE: { return parseArrayElementRest(tl, i+1); }
            case TOKEN.LSQB: { return parsePositionElementRest(tl, i+1); }
            case TOKEN.LPAREN: { return parseExprRest(tl, i+1); }
            default: {
                throw new Error();
            }
        }
    };
    var parseArrayElementRest = function (tl, i) {
        var i = 0;
    };
    var parsePositionElementRest = function (tl, i) {
        var i = 0;
    }
    var parsePositionElementRest = function (tl, i) {
        var i = 0;
    }
    var parseExprRest = function (tl, i) {
        var i = 0;
    }

    var parse = function (s) {

    }
    

    // canvas interface.


    // vm.


    // canvas discovering.
    
    return {
        lex: lex,
        run: function () {

        }
    };

})();
