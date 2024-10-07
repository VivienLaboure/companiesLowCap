/**
 * Compare les entreprises sur le ratio EV/EBITDA
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur l'EV/EBITDA.
 */
function compareEV_EBITDA(competitorsData) {
    let totalEvEbitda = 0;

    competitorsData.forEach(company => {
        totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;
    });

    const avgEvEbitda = totalEvEbitda / competitorsData.length;

    // Calcul de la sous-évaluation sur l'EV/EBITDA
    let sousEvaluationEvEbitda = {};

    competitorsData.forEach(company => {
        const evEbitdaDiff = ((avgEvEbitda - (company.EntrepriseValue / company.Ebitda)) / avgEvEbitda) * 100;
        sousEvaluationEvEbitda[company.Symbol] = evEbitdaDiff;
    });

    return sousEvaluationEvEbitda;
}

module.exports = compareEV_EBITDA;