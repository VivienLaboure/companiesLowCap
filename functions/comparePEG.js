const calculateAverage = require("./calculateAverage");

/**
 * Compare les entreprises sur le ratio PEG
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur le PEG.
 */
function comparePEG(competitorsData) {
    let sousEvaluationPeg = {};

    // Calcul du PEG moyen des concurrents
    const avgPeg = calculateAverage(competitorsData, 'PegRatio');
    
    // Si avgPeg est NaN, on ne peut pas continuer la comparaison
    if (isNaN(avgPeg)) {
        console.log("Impossible de calculer le PEG moyen : aucune donnée valide.");
        return {};
    }

    // Comparer les concurrents
    competitorsData.forEach(company => {
        if (company.PegRatio != null && !isNaN(company.PegRatio)) {
            const pegDiff = ((avgPeg - company.PegRatio) / avgPeg) * 100;
            sousEvaluationPeg[company.Symbol] = pegDiff;
        } else {
            console.log(`PEG ratio invalide pour l'entreprise ${company.Symbol}`);
        }
    });

    return sousEvaluationPeg;
}

module.exports = comparePEG;