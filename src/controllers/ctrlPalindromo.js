module.exports = (() => {
    return {
        getPalindromo() {
            let res = generateAllPossibleSubstring('afoolishconsistencyisthehobgoblinoflittlemindsadoredbylittlestatesmenandphilosophersanddivineswithconsistencyagreatsoulhassimplynothingtodohemayaswellconcernhimselfwithhisshadowonthewallspeakwhatyouthinknowinhardwordsandtomorrowspeakwhattomorrowthinksinhardwordsagainthoughitcontradicteverythingyousaidtodayahsoyoushallbesuretobemisunderstoodisitsobadthentobemisunderstoodpythagoraswasmisunderstoodandsocratesandjesusandlutherandcopernicusandgalileoandnewtonandeverypureandwisespiritthatevertookfleshtobegreatistobemisunderstood');
            let palindromos = [...res]
            return {
                'Cantidad de palindromos encontrados': palindromos.length,
                'Palindromos encontrados': palindromos
            }
        }
    }
})();

function generateAllPossibleSubstring(str) {
    let result = new Set([]);
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let sub = str.substring(i, j);
            if (!result.has(sub) && isPalindrome(sub)) result.add(sub);
        }
    }
    return result;
}

function isPalindrome(str) {
    let isOk = true;
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - i - 1]) { isOk = false; break; }
    }
    return isOk;
}
