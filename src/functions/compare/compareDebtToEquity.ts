/**
 * Compare les bénéfices avant intérêts, impôts, dépréciation et amortissement.
 * @param {Array} companiesData - Données des entreprises.
 * @returns {number} La moyenne des valeurs valides pour cette propriété.
 */
function compareDebtToEquity(competitorsData) {
    let sousEvaluationDebtToEquity = {};
    const avgDebtToEquity = calculateAverage(competitorsData, 'DebtToEquity');

    competitorsData.forEach(company => {
        const debtToEquityDiff = ((avgDebtToEquity - company.DebtToEquity) / avgDebtToEquity) * 100;
        sousEvaluationDebtToEquity[company.Symbol] = debtToEquityDiff;
    });

    return sousEvaluationDebtToEquity;
}

module.exports = compareDebtToEquity;