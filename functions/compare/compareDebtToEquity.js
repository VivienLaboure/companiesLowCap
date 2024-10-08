const calculateAverage = require("../calculateAverage");

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