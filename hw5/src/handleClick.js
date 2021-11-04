import Big from "big.js";
const lenlimit = 18;
const preclimit = 12;
const declimit = 100;
const google = "1" + "0".repeat(100);
export default function handleClick(button, holding, setHol, operat, setOpe, waiting, setWai, memory, setMem, state, setSta, errmsg, setErr) {
    Big.DP = declimit;
    Big.PE = preclimit;
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
    const do_operation = (a, b, ope) => {
        let tmp = null;
        if(ope === '+') tmp = Big(a).plus(b);
        if(ope === '-') tmp = Big(a).minus(b);
        if(ope === '×') tmp = Big(a).times(b);
        if(ope === 'abs') tmp = Big(a).abs();
        if(ope === '÷'){
            if(Big(b).toString() === "0") {
                setErr("Divided by 0");
                return "0";
            }
            tmp = Big(a).div(b);
        }
        tmp = Big(tmp.round(declimit).toPrecision(preclimit))
        if(tmp.abs().gt(google)) {
            setErr("overflow");
            return "0";
        }
        return tmp.toString();
    }
    const [X, setX] = (operat ? [waiting, setWai] : [holding, setHol]);
    if(button === "MR") {
        setX(memory);
        setSta(0);
        return;
    }
    if(button === "M-") {
        if(X === null)  return;
        setMem(do_operation(memory, X, '-'));
        return;
    }
    if(button === "M+") {
        if(X === null)  return;
        setMem(do_operation(memory, X, '+'));
        return;
    }
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
        if(state === 0) setX("0.");
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
        setX(do_operation(X, "-1", "×"));
        setSta(0);
        return;
    }
    if(button === "%") {
        if(X === null)  return;
        setX(do_operation(X, "0.01", "×"));
        setSta(0);
        return;
    }
    if(button === "abs") {
        if(X === null)  return;
        setX(do_operation(X, null, "abs"));
        setSta(0);
        return;
    }

    if("+-×÷=".includes(button)) {
        if(waiting !== null) {
            console.assert(waiting !== "");
            console.assert(operat !== null);

            setHol(do_operation(holding, waiting, operat));
            setWai(null);
            operat = null;
        }
        else if(button === '=') setHol(Big(Big(holding).round(declimit).toPrecision(preclimit)).toString());
        if(button !== '=')  operat = button;
        setOpe(operat);
        setSta(0);
        return;
    }
}