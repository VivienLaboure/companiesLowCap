const calculateAverage = require("../calculateAverage");

/**
 * Compare les entreprises sur la croissance de revenus
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur la croissance de revenus.
 */
function compareRevenueGrowth(competitorsData) {
    let sousEvaluationRevenueGrowth = {};

    const avgRevGrowth = calculateAverage(competitorsData, 'RevenueGrowth');

    competitorsData.forEach(company => {
        const revGrowthDiff = ((avgRevGrowth - company.RevenueGrowth) / avgRevGrowth) * 100;
        sousEvaluationRevenueGrowth[company.Symbol] = revGrowthDiff;
    });


    return sousEvaluationRevenueGrowth;
}

module.exports = compareRevenueGrowth;