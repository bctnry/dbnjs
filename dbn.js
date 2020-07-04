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
        var res = [];
        var startI = i;
        var startLine = oldLine, startCol = oldCol;
        while (s[i] && ' \t\r\n'.includes(s[i])) {
            if (s[i] === '\r') {
                if (startI !== i) { res.push(Token(TOKEN.WHITESPC, s.substring(startI, i), startLine, startCol)); }
                if (s[i+1] && s[i+1] === '\n') {
                    i += 2;
                } else {
                    i += 1;
                }
                res.push(Token(TOKEN.NL, s.substring(startI, i), line, col));
                line += 1;
                col = 0;
                startI = i;
                startLine = line; startCol = col;
            } else if (s[i] === '\n') {
                if (startI !== i) { res.push(Token(TOKEN.WHITESPC, s.substring(startI, i), startLine, startCol)); }
                res.push(Token(TOKEN.NL, s.substring(i, i+1), line, col));
                i += 1; line += 1; col = 0; startI = i;
                startLine = line; startCol = col;
            } else {
                i += 1; col += 1;
            }
            
        }
        return [i, line, col, res];
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
        COMMENT: 16,
        WHITESPC: 17,
        NL: 18
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
        res = res.concat(skipResult[3]);
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
            res = res.concat(skipResult[3]);
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

    var withPos = function (line, col) { return function (ast) { ast._line = line; ast._col = col; return ast; } };
    var withPosFromToken = function (t) { return function (ast) { ast._line = getTokenLine(t); ast._col = getTokenCol(t); return ast; } };
    var withPosFromAST = function (x) { return function (ast) { ast._line = x._line; ast._col = x._col; return ast; } };
    var getLine = function (ast) { return ast._line; }
    var getCol = function (ast) { return ast._col; }

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


    // Parser : (tokenList: Token[], i: number) => [i, result]|undefined
    var parseExpr = function (tl, i) {
        var i = 0;
        if (!tl[i]) { throw new Error('INTEGER/IDENTIFIER/LANGLE/LSQB/LPAREN expected but nothing found'); }
        switch (getTokenType(tl[i])) {
            case TOKEN.INTEGER: {
                return [i+1, withPosFromToken(tl[i])(Integer(parseInt(getTokenStr(tl[i]), 10)))];
            }
            case TOKEN.IDENTIFIER: {
                return [i+1, withPosFromToken(tl[i])(Identifier(getTokenStr(tl[i])))];
            }
            case TOKEN.LANGLE: {
                var restRes = parseArrayElementRest(tl, i+1);
                if (!restRes) { throw new Error(); }
                return [restRes[0], withPosFromToken(tl[i])(restRes[1])];
            }
            case TOKEN.LSQB: {
                var restRes = parsePositionElementRest(tl, i+1);
                if (!restRes) { throw new Error(); }
                return [restRes[0], withPosFromToken(tl[i])(restRes[1])];
            }
            case TOKEN.LPAREN: {
                var restRes = parseComplexExpr(tl, i+1);
                if (!restRes) { throw new Error(); }
                i = restRes[0];
                if (!tl[i]) { throw new Error('RPAREN expected but nothing found'); }
                if (getTokenType(tl[i]) !== TOKEN.RPAREN) { throw new Error('RPAREN expected but other stuff found'); }
                i++;
                return [i, withPosFromToken(tl[i])(restRes[1])];
            }
            default: {
                throw new Error('INTEGER/IDENTIFIER/LANGLE/LSQB/LPAREN expected but other stuff found.');
            }
        }
    };
    // Caller should move `i` AFTER the starting LANGLE token.
    var parseArrayElementRest = function (tl, i) {
        if (!tl[i]) { throw new Error('IDENTIFIER expected but nothing found'); }
        if (getTokenType(tl[i]) !== TOKEN.IDENTIFIER) { throw new Error('IDENTIFIER expected but other stuff found'); }
        var id = withPosFromToken(tl[i])(Identifier(getTokenStr(tl[i])));
        i++;
        var exprParseRes = parseExpr(tl, i+1);
        if (!exprParseRes) { throw new Error('Expr expected but other stuff found'); }
        i = exprParseRes[0];
        if (!tl[i]) { throw new Error('RANGLE expected but nothing found'); }
        if (getTokenType(tl[i]) !== TOKEN.RANGLE) { throw new Error('LANGLE expected but nothing found'); }
        i++;
        return [i, ArrayRef(id, exprParseRes[1])];
    };
    // Caller should move `i` AFTER the starting LSQB token.
    var parsePositionElementRest = function (tl, i) {
        if (!tl[i]) { throw new Error(`Expr expected but nothing found`); }
        var expr1 = parseExpr(tl, i);
        if (!expr1) { throw new Error('Expr expected but other stuff found'); }
        i = expr1[0];
        var expr2 = parseExpr(tl, i);
        if (!expr2) { throw new Error('Expr expected but other stuff found'); }
        i = expr2[0];
        if (!tl[i]) { throw new Error('RSQB or IDENTIFIER expected but nothing found'); }
        var color = undefined;
        if (getTokenType(tl[i]) === TOKEN.IDENTIFIER) {
            color = withPosFromToken([tl[i]])(Identifier(getTokenStr(tl[i])));
        }
        i++;
        return [i, color? Position(expr1, expr2) : Position(expr1, expr2, color)];        
    }

    var _op = function (subExprName, direction, opList, subExprParser) {
        function res (tl, i) {
            var i = 0;
            var factorList = [];
            var opList = [];
            var isContinuing = false;
            while (tl[i]) {
                var x = subExprParser(tl, i);
                if (!x && isContinuing) { throw new Error(subExprName + ' expected but other stuff found'); }
                factorList.push(x[1]);
                i = x[0];
                if (!tl[i]) { break; }
                if ((getTokenType(tl[i]) !== TOKEN.IDENTIFIER) || (!opList.includes(getTokenString(tl[i])))) {
                    throw new Error('One of [' + opList + '] expected but other stuff found');
                }
                opList.push(withPosFromToken(tl[i])(Identifier(tl[i])));
                i++;
                isContinuing = true;
            }
            if (factorList.length <= 0) { return [i, undefined]; }
            else if (factorList.length === 1) { return [i, factorList[0]]; }
            else if (factorList.length === 2) { return [i, withPosFromAST(opList[0])(Op(opList[0], factorList[0], factorList[1]))]; }
            else {
                var opI = direction === 1? 0 : opList[opList.length - 1];
                var factorI = direction === 1? 2 : factorList[factorList.length - 3];
                var buffer = withPosFromAST(factorList[0])(Op(opList[opI], factorList[0], factorList[1]));
                while (factorList[factorI] && opList[opI]) {
                    buffer = withPosFromAST(buffer)(Op(opList[opI])(Op(opList[opI], buffer, factorList[factorI])));
                    direction === 1? factorI++ : factorI--;
                    direction === 1? opI++ : opI--;
                }
                return [i, buffer];
            }
        }
        return res;
    };
    var parseComplexExpr = _op('Factor', 1, ['+', '-'], parseFactor);
    var parseFactor = _op('AtomicExpr', 1, ['*', '/', '%'], parseAtomicExpr);

    var parseSimpleCommand = function (tl, i) {
        var res = [];
        if (!tl[i]) { throw new Error('Expr expected but nothing found'); }
        while (tl[i]) {
            var r = parseExpr(tl, i);
            if (!r) { break; }
            res.push(r[1]);
            i = r[0];
        }
        return [i, withPosFromAST(res[0])(Command.apply(undefined, res))];
    }
    var parseCommand = function (tl, i) {
        var simpleCommand = parseSimpleCommand(tl, i);
        if (!simpleCommand) { throw new Error('SimpleCommand expected but nothing or other stuff found'); }
        i = simpleCommand[0]
        var head = simpleCommand[1];
        if (!tl[i]) { return [i, head]; }
        if (getTokenType(tl[i]) !== TOKEN.LBRACE) { return [i, head]; }

        
    }
    var parseProgram = function (tl) {
        var res = [];
        var i = 0;
        if (!tl[i]) { throw new Error('Command expected but nothing found'); }
        while (tl[i]) {
            var r = parseCommand(tl, i);
            if (!r) { break; }
            res.push(r[1]);
            i = r[0];
        }
        return res;
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
