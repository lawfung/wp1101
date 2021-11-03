import Big from "big.js";
const lenlimit = 18
export default function handleClick(button, holding, setHol, operat, setOpe, waiting, setWai, memory, setMem, state, setSta, errmsg, setErr) {
    if(button === "C") {
        setHol("0");
        setOpe(null);
        setWai(null);
        // setMem();
        setSta(0);
        setErr(null);
        return;
    }
    if(button === "MC") {
        setMem("0");
        return;
    }
    if(errmsg){
        return;
    }
    const [X, setX] = (operat ? [waiting, setWai] : [holding, setHol]);
    if(button === "0") {
        if(state === 0) setX(button);
        else if(X.length < lenlimit && X !== "0")   setX(X + button);
        setSta(1);
        return;
    }
    if("123456789".includes(button)) {
        if(state === 0 || X === "0") setX(button);
        else if(X.length < lenlimit) setX(X + button);
        setSta(1);
        return;
    }
    if(button === '.') {
        if(state === 0) setX(button);
        else if(!X.includes('.')) setX(X + button);
        setSta(1);
        return;
    }
    if(button === "←") {
        if(state === 0) return;
        console.assert(X && X.length > 0);
        let newX = X.slice(0, -1);
        if(newX === "") {
            newX = "0";
            setSta(0);
        }
        setX(newX);
        return;
    }
    if(button === "+/-") {
        if(X === null)  return;
        setX(Big(X).times(-1).toString());
        return;
    }
    if(button === "%") {
        if(X === null)  return;
        setX(Big(X).times(0.01).toString());
        return;
    }
    if(button === "abs") {
        if(X === null)  return;
        if(Big(X).lt(0)) setX(Big(X).times(-1).toString());
        return;
    }
    const do_operation = (a, b, ope) => {
        if(ope === '+') return (Big(a).plus(Big(b))).toString();
        if(ope === '-') return (Big(a).minus(Big(b))).toString();
        if(ope === '×') return (Big(a).times(Big(b))).toString();
        if(ope === '÷'){
            if(Big(b).toString() === "0") {
                setErr("Divided by 0");
                return "0";
            }
            return (Big(a).div(Big(b))).toString();
        }
        console.assert(false);
    }
    if("+-×÷=".includes(button)) {
        if(waiting !== null) {
            console.assert(waiting !== "");
            console.assert(operat !== null);

            setHol(do_operation(holding, waiting, operat));
            setWai(null);
            operat = null;
        }
        if(button !== '=')  operat = button;
        setOpe(operat);
        setSta(0);
        return;
    }
}