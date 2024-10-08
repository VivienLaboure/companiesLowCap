const calculateAverage = require("../calculateAverage");

/**
 * Compare les entreprises sur le ratio de combien une entreprise génère de flux de trésorerie libre par rapport à sa valeur marchande.
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur l'EV/EBITDA.
 */
function compareFCFYield(competitorsData) {
    let sousEvaluationFCFYield = {};
    const avgFCFYield = calculateAverage(competitorsData, 'FCFYield');
    
    competitorsData.forEach(company => {
        const fcfYieldDiff = ((avgFCFYield - company.FCFYield) / avgFCFYield) * 100;
        sousEvaluationFCFYield[company.Symbol] = fcfYieldDiff;
    });

    return sousEvaluationFCFYield;
}

module.exports = compareFCFYield;