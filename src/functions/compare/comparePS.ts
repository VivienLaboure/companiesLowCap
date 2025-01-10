/**
 * Compare la valorisation de l'entreprise à son chiffre d'affaires.
 * @param {Array} companiesData - Données des entreprises.
 * @returns {number} La moyenne des valeurs valides pour cette propriété.
 */
function comparePS(competitorsData: Array<any>) {
    let sousEvaluationPSRatio:object = {};
    const avgPSRatio = calculateAverage(competitorsData, 'PriceToSales');
    
    competitorsData.forEach(company => {
        const psRatioDiff = ((avgPSRatio - company.PriceToSales) / avgPSRatio) * 100;
        sousEvaluationPSRatio[company.Symbol] = psRatioDiff;
    });

    return sousEvaluationPSRatio;
}

module.exports = comparePS;