# latex-to-speak-http-gateway
HTTP service that convert LaTeX to readable text using speech-rule-engine and MathJax


## Usage

### Yarn package
```BASH
mkdir ltshg
cd ltshg
yarn add latex-to-speak-http-gateway
nodejs node_modules/latex-to-speak-http-gateway/index.js
```

When the server starts show the listening port.
```TXT
Listening on port 48001

```

## HTTP client options


| Option | Value |
| ---- | ---- |
| *domain* | Domain or subject area of speech rules (e.g., mathspeak, clearspeak).|
| *style* | Style or preference setting of speech rules (e.g., brief).|
| | In case of clearspeak, multiple preferences can be chosen using `:` as separator.|
| *locale* | Language locale in 639-1. |
| *subiso* | More fine grained specification of locale. E.g., for French fr, be, or ch |
| *markup*| Set output markup for speech: ```none```, ```ssml```, ```sable```, ```voicexml```, ```acss```, ```ssml_step``` |
| *modality* | Set the modality SRE returns. E.g., ```speech```, ```braille```, ```prefix```, ```summary``` |

Detailed options for  _locale_, _modality_, _domain_ and _style_.

| locale | modality | domain     | style
|-------|----------|------------|---------------------------------------------------------
|base   | speech   | mathspeak  | brief, default, sbrief
|it     | speech   | clearspeak | AbsoluteValue_Auto, AbsoluteValue_AbsEnd, AbsoluteValue_Cardinality, AbsoluteValue_Determinant
|       |          |            | Bar_Auto, Bar_Conjugate
|       |          |            | Caps_Auto, Caps_SayCaps
|       |          |            | CombinationPermutation_Auto, CombinationPermutation_ChoosePermute
|       |          |            | Currency_Auto, Currency_Position, Currency_Prefix
|       |          |            | Ellipses_Auto, Ellipses_AndSoOn
|       |          |            | Enclosed_Auto
|       |          |            | Exponent_Auto, Exponent_AfterPower, Exponent_Ordinal, Exponent_OrdinalPower
|       |          |            | Fraction_Auto, Fraction_EndFrac, Fraction_FracOver, Fraction_General, Fraction_GeneralEndFrac, Fraction_Ordinal, Fraction_Over, Fraction_OverEndFrac, Fraction_Per
|       |          |            | Functions_Auto, Functions_None, Functions_Reciprocal
|       |          |            | ImpliedTimes_Auto, ImpliedTimes_MoreImpliedTimes, ImpliedTimes_None
|       |          |            | Log_Auto, Log_LnAsNaturalLog
|       |          |            | Matrix_Auto, Matrix_Combinatoric, Matrix_EndMatrix, Matrix_EndVector, Matrix_SilentColNum, Matrix_SpeakColNum, Matrix_Vector
|       |          |            | MultiLineLabel_Auto, MultiLineLabel_Case, MultiLineLabel_Constraint, MultiLineLabel_Equation, MultiLineLabel_None, MultiLineLabel_Row, MultiLineLabel_Step
|       |          |            | MultiLineOverview_Auto, MultiLineOverview_None
|       |          |            | MultiLinePausesBetweenColumns_Auto, MultiLinePausesBetweenColumns_Long, MultiLinePausesBetweenColumns_Short
|       |          |            | MultsymbolDot_Auto
|       |          |            | MultsymbolX_Auto
|       |          |            | Paren_Auto, Paren_CoordPoint, Paren_Interval, Paren_Silent, Paren_Speak, Paren_SpeakNestingLevel
|       |          |            | Prime_Auto, Prime_Angle, Prime_Length
|       |          |            | Roots_Auto, Roots_PosNegSqRoot, Roots_PosNegSqRootEnd, Roots_RootEnd
|       |          |            | SetMemberSymbol_Auto, SetMemberSymbol_Belongs, SetMemberSymbol_Element, SetMemberSymbol_Member
|       |          |            | Sets_Auto, Sets_SilentBracket, Sets_woAll
|       |          |            | TriangleSymbol_Auto, TriangleSymbol_Delta
|       |          |            | Trig_Auto, Trig_ArcTrig, Trig_TrigInverse, Trig_Reciprocal
|       |          |            | VerticalLine_Auto, VerticalLine_Divides, VerticalLine_Given, VerticalLine_SuchThat
|       |          | mathspeak  | brief, default, sbrief
|       |          | default    | alternative, default, plural
|       | prefix   | default    | default
|       | summary  | default    | default
|       |          | mathspeak  | brief, sbrief





## CURL examples

### simple call 
```SHELL
curl -s -X POST \
 -H "Accept:application/json"  \
 -H "Content-Type:application/json" \
 -d '[{"latex":"\\frac{2}{3}"}]' \
  'http://127.0.0.1:48001/'
```

### Simple answer
```JSON
[
  {
    "latex": "\\frac{2}{3}",
    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">\n  <mfrac>\n    <mn>2</mn>\n    <mn>3</mn>\n  </mfrac>\n</math>",
    "speech": "two thirds"
  }
]
```

### Advanced call

```SHELL
curl -s -X POST \
 -H "Accept:application/json"  \
 -H "Content-Type:application/json" \
 -d '[{"latex":"\\frac{5}{4}"},{"latex":"\\sqrt{\\pi}"},{"latex":"\\mathbf{V}_1 \\times \\mathbf{V}_2 = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial X}{\\partial u} & \\frac{\\partial Y}{\\partial u} & 0 \\\\ \\frac{\\partial X}{\\partial v} & \\frac{\\partial Y}{\\partial v} & 0 \\\\ \\end{vmatrix}"},{"latex":"\\frac{1}{3}"}]' \
 'http://127.0.0.1:48001/?locale=it&speech=deep&markup=ssml&modality=speech&style=Fraction_Auto:AbsoluteValue_Cardinality&domain=clearspeak'
```

### Advanced answer
```JSON
[
  {
    "latex": "\\frac{5}{4}",
    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">\n  <mfrac>\n    <mn>5</mn>\n    <mn>4</mn>\n  </mfrac>\n</math>",
    "speech": "<?xml version=\"1.0\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"><prosody rate=\"100%\"> cinque quarti </prosody></speak>"
  },
  {
    "latex": "\\sqrt{\\pi}",
    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">\n  <msqrt>\n    <mi>&#x3C0;</mi>\n  </msqrt>\n</math>",
    "speech": "<?xml version=\"1.0\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"><prosody rate=\"100%\"> radice quadrata di pi greco <break time=\"250ms\"/> </prosody></speak>"
  },
  {
    "latex": "\\mathbf{V}_1 \\times \\mathbf{V}_2 = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial X}{\\partial u} & \\frac{\\partial Y}{\\partial u} & 0 \\\\ \\frac{\\partial X}{\\partial v} & \\frac{\\partial Y}{\\partial v} & 0 \\\\ \\end{vmatrix}",
    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">\n  <msub>\n    <mrow data-mjx-texclass=\"ORD\">\n      <mi mathvariant=\"bold\">V</mi>\n    </mrow>\n    <mn>1</mn>\n  </msub>\n  <mo>&#xD7;</mo>\n  <msub>\n    <mrow data-mjx-texclass=\"ORD\">\n      <mi mathvariant=\"bold\">V</mi>\n    </mrow>\n    <mn>2</mn>\n  </msub>\n  <mo>=</mo>\n  <mrow data-mjx-texclass=\"INNER\">\n    <mo data-mjx-texclass=\"OPEN\">|</mo>\n    <mtable columnspacing=\"1em\" rowspacing=\"4pt\">\n      <mtr>\n        <mtd>\n          <mrow data-mjx-texclass=\"ORD\">\n            <mi mathvariant=\"bold\">i</mi>\n          </mrow>\n        </mtd>\n        <mtd>\n          <mrow data-mjx-texclass=\"ORD\">\n            <mi mathvariant=\"bold\">j</mi>\n          </mrow>\n        </mtd>\n        <mtd>\n          <mrow data-mjx-texclass=\"ORD\">\n            <mi mathvariant=\"bold\">k</mi>\n          </mrow>\n        </mtd>\n      </mtr>\n      <mtr>\n        <mtd>\n          <mfrac>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>X</mi>\n            </mrow>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>u</mi>\n            </mrow>\n          </mfrac>\n        </mtd>\n        <mtd>\n          <mfrac>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>Y</mi>\n            </mrow>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>u</mi>\n            </mrow>\n          </mfrac>\n        </mtd>\n        <mtd>\n          <mn>0</mn>\n        </mtd>\n      </mtr>\n      <mtr>\n        <mtd>\n          <mfrac>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>X</mi>\n            </mrow>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>v</mi>\n            </mrow>\n          </mfrac>\n        </mtd>\n        <mtd>\n          <mfrac>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>Y</mi>\n            </mrow>\n            <mrow>\n              <mi>&#x2202;</mi>\n              <mi>v</mi>\n            </mrow>\n          </mfrac>\n        </mtd>\n        <mtd>\n          <mn>0</mn>\n        </mtd>\n      </mtr>\n    </mtable>\n    <mo data-mjx-texclass=\"CLOSE\">|</mo>\n  </mrow>\n</math>",
    "speech": "<?xml version=\"1.0\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"><prosody rate=\"100%\"> <break time=\"250ms\"/> <prosody pitch=\"+30%\"> V </prosody> grassetto <break time=\"250ms\"/> pedice 1 <break time=\"250ms\"/> per <break time=\"250ms\"/> <prosody pitch=\"+30%\"> V </prosody> grassetto <break time=\"250ms\"/> pedice 2 <break time=\"250ms\"/> uguale a determinante della matrice 3 per 3 <break time=\"750ms\"/> Riga 1: Colonna 1, i grassetto <break time=\"500ms\"/> Colonna 2, j grassetto <break time=\"500ms\"/> Colonna 3, k grassetto <break time=\"750ms\"/> Riga 2: Colonna 1, <break time=\"250ms\"/> frazione con numeratore derivata parziale <prosody pitch=\"+30%\"> X </prosody> <break time=\"250ms\"/> e denominatore derivata parziale u <break time=\"500ms\"/> Colonna 2, <break time=\"250ms\"/> frazione con numeratore derivata parziale <prosody pitch=\"+30%\"> Y </prosody> <break time=\"250ms\"/> e denominatore derivata parziale u <break time=\"500ms\"/> Colonna 3, 0 <break time=\"750ms\"/> Riga 3: Colonna 1, <break time=\"250ms\"/> frazione con numeratore derivata parziale <prosody pitch=\"+30%\"> X </prosody> <break time=\"250ms\"/> e denominatore derivata parziale v <break time=\"500ms\"/> Colonna 2, <break time=\"250ms\"/> frazione con numeratore derivata parziale <prosody pitch=\"+30%\"> Y </prosody> <break time=\"250ms\"/> e denominatore derivata parziale v <break time=\"500ms\"/> Colonna 3, 0 <break time=\"750ms\"/> </prosody></speak>"
  },
  {
    "latex": "\\frac{1}{3}",
    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">\n  <mfrac>\n    <mn>1</mn>\n    <mn>3</mn>\n  </mfrac>\n</math>",
    "speech": "<?xml version=\"1.0\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"><prosody rate=\"100%\"> un terzo </prosody></speak>"
  }
]
```
