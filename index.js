const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 48001;

/**
 * Convert circular object in JSON
 * @param object
 * @returns {string}
 */
function stringify(object) {
    let cache = [];
    let buff=JSON.stringify(object, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.includes(value)) {
                return typeof value;
            }
            cache.push(value);
        }
        return value;
    });
    cache = null;
    return buff;
}


/**
 * MathJax  begin
 */
const PACKAGES = ['base', 'autoload', 'require', 'ams', 'newcommand'];
MathJax = {
    loader: {
        paths: {mathjax: 'mathjax/es5'},
        // source: require('mathjax-full/components/src/source.js').source,
        require: require,
        load: [
            'input/tex-full'
            , 'adaptors/liteDOM'
        ]
    },
    tex: {
        packages: PACKAGES
    }
};
require('mathjax/es5/startup');
/** MathJax  end **/

/**
 * SRE begin
 */
const sreParams = ['delay', 'markup', 'style', 'domain', 'speech', 'walker', 'locale', 'modality', 'rate', 'rules', 'subiso', 'prune'];
sre = require('speech-rule-engine');

/** SRE  end **/


/**
 * App Handlers
 */

app.post('/', (req, res) => {
    let rv=[],
        sreConfig ={
            locale: "en",
            domain: "default",
            markup: "none",
            modality: "speech",
        }
    ;
    // populate the config from query string
    sreParams.forEach(param => {
        if(typeof req.query[param] == "undefined"){
            return;
        }
        sreConfig[param]=req.query[param];
    });

    MathJax.startup.promise.then(() => {
        let srePromise=sre.setupEngine(sreConfig);
        srePromise.then(() => {
            // console.log("Features: %o",srePromise);
            let promises=[];
            for(const elem of req.body){
                promises.push(MathJax.tex2mmlPromise(elem.latex, {}));
            }
            Promise.allSettled(promises)
                .then((results) => {
                    results.forEach((result,i) => {
                        rv.push({
                            'latex': req.body[i].latex,
                            'mml': result.value,
                            'speech': sre.toSpeech(result.value),
                        });
                        // console.log("LaTex[%o]:(%o) %o",i,result.value,sre.toSpeech(result.value));
                    });
                    // console.log("Rv: %o",rv);
                    res.send(stringify(rv));
                });
        }).catch(err => console.log("Err: %o",err));
    }).catch(err => console.log("Err: %o",err));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
