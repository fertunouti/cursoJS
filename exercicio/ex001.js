function fatorial (n) {
    var fat = 1;
    var c = n;
    while (c >=1 ) {
        fat = fat *c;
        c--
        }
    return fat;
}

console.log (fatorial(5));
