/**
 * Compare les entreprises sur le ratio P/E
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur le P/E.
 */
function comparePE(competitorsData) {
    let totalPe = 0;

    competitorsData.forEach(company => {
        totalPe += company.TrailingPe || 0;
    });

    const avgPe = totalPe / competitorsData.length;

    // Calcul de la sous-évaluation sur le P/E
    let sousEvaluationPe = {};

    competitorsData.forEach(company => {
        const peDiff = ((avgPe - company.TrailingPe) / avgPe) * 100;
        sousEvaluationPe[company.Symbol] = peDiff;
    });

    return sousEvaluationPe;
}

module.exports = comparePE;