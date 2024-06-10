function display(val) {
     document.getElementById('result').value += val

}
function del2() {
    var detl = document.getElementById('result').value;
    document.getElementById('result').value = detl.substring(0, detl.length - 1);
}

function clearScreen() {
    document.getElementById('result').value = ''
}

function solve() {
    var count = '';
    var mainArray = [];
    var abc = document.getElementById('result').value;
    var arr = abc.split("");
    
    for (let i = 0; i < arr.length; i++) {
        if(arr[0]=='-'){
            count=arr[0]+arr[1];
            arr.splice(0,2,count);
            count='';
        }
        if ((arr[i] === '(' || arr[i] === '{' || arr[i] === '[') && arr[i + 1] === '-') {
            count += arr[i + 1] + arr[i + 2];
            // console.log(count)
            arr.splice(i + 1, 2, count);
            // console.log(arr);
            count = '';
        }

        if (!isNaN(arr[i]) || arr[i] == '.') {
            count += arr[i];
        }
        else {
            if (count !== '') {
                mainArray.push(Number(count));
                // op
                // console.log(count);
                count = '';
            }
            mainArray.push(arr[i]);
        }
    }
    if (count !== '') {
        mainArray.push(Number(count));
    }
    // op
    console.log(mainArray)
    var exp = mainArray;
    clearScreen();
    bracket(exp);
    display(exp);
}

function div(exp) {
    let a = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == '/') {
            a = exp[i - 1] / exp[i + 1];
            exp[i - 1] = a;
            exp.splice(i, 2);
            // console.log(a)
            i--;
        }
    }
}

function mul(exp) {
    let a = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == '*') {
            a = exp[i - 1] * exp[i + 1];
            exp[i - 1] = a;
            exp.splice(i, 2);
            // console.log(a);
            i--;
        }
    }
}

function sub(exp) {
    let a = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == '-') {
            a = exp[i - 1] - exp[i + 1];
            exp[i - 1] = a;
            exp.splice(i, 2);
            //  console.log(a);
            i--;
        }
    }
}

function add(exp) {
    // console.log(exp);

    let a = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == '+') {
            a = exp[i - 1] + exp[i + 1];
            exp[i - 1] = a;
            exp.splice(i, 2);
            //  console.log(a);
            i--;
        }
    }
}

function bracket(exp) {

    smallBracket(exp);
    midBracket(exp);
    bigBracket(exp);

    for (let i = 0; i < exp.length; i++) {
        if (!isNaN(exp[i]) && !isNaN(exp[i + 1])) {
            exp.splice(i + 1, 0, '*');
            console.log(exp);
            mul(exp);
        }
    }
    problemsolve(exp);
    console.log(exp);
    return exp;
}

function smallBracket(exp) {
    var stack = [];
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(') {
            stack.push(i);

        } else if (exp[i] === ')') {
            const startIn = stack.pop();
            const elemInsideBracess = exp.slice(startIn + 1, i);
            console.log(elemInsideBracess);
            const coreElements = bracket(elemInsideBracess);
            exp.splice(startIn, i - startIn + 1, ...coreElements);
            console.log(exp);
            i = startIn; // Reset the index
        }
    }
}
function midBracket(exp) {
    var stack = [];
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '{') {
            stack.push(i);

        } else if (exp[i] === '}') {
            const startIn = stack.pop();
            const elemInsideBracess = exp.slice(startIn + 1, i);
            const coreElements = bracket(elemInsideBracess);
            exp.splice(startIn, i - startIn + 1, ...coreElements);
            console.log(exp);
            i = startIn; // Reset the index
        }
    }
}
function bigBracket(exp) {
    var stack = [];
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '[') {
            stack.push(i);

        } else if (exp[i] === ']') {
            const startIn = stack.pop();
            const elemInsideBracess = exp.slice(startIn + 1, i);
            const coreElements = bracket(elemInsideBracess);
            exp.splice(startIn, i - startIn + 1, ...coreElements);
            console.log(exp);
            i = startIn; // Reset the index
        }
    }
}

function problemsolve(exp) {
    div(exp);
    mul(exp);
    sub(exp);
    add(exp);
}


