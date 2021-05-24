module.exports = (() => {
    return {
        getFiboDiviBy1000thPlus() {
            let n = 1
            let numbers
            let aux = [0]
            while (aux[n - 1] <= 1000) {
                numbers = fibonacci_series(n)
                aux = [...aux, getDivisorsCnt(numbers[n])]
                n++
            }
            return numbers[n - 1]
        }
    }
})();

function getDivisorsCnt(n) {

    let numDivisors = 1;
    let factor = 2; // Candidate for prime factor of `n`

    // If `n` is not a prime number then it must have one factor
    // which is <= `sqrt(n)`, so we try these first:
    while (factor * factor <= n) {
        if (n % factor === 0) {
            // `factor` is a prime factor of `n`, determine the exponent:
            let exponent = 0;
            do {
                n /= factor;
                exponent++;
            } while (n % factor === 0)
            // `factor^exponent` is one term in the prime factorization of n,
            // this contributes as factor `exponent + 1`:
            numDivisors *= exponent + 1;
        }
        // Next possible prime factor:
        factor = factor == 2 ? 3 : factor + 2
    }

    // Now `n` is either 1 or a prime number. In the latter case,
    // it contributes a factor 2:
    if (n > 1) {
        numDivisors *= 2;
    }

    return numDivisors;
}

function fibonacci_series (n) {
    if (n === 1) {
        return [0, 1];
    }
    else {
        let s = fibonacci_series(n - 1);
        s.push(s[s.length - 1] + s[s.length - 2]);
        return s;
    }
};
