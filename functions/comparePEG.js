// Fonction pour calculer le PEG moyen
function calculateAveragePeg(companiesData) {
    // Filtrer les entreprises qui ont un pegRatio valide (non nul et numérique)
    const validPegCompanies = companiesData.filter(company => {
        console.log(`Entreprise : ${company.Symbol}, PEG Ratio : ${company.PegRatio}, Type : ${typeof company.PegRatio}`);
        return company.PegRatio != null && !isNaN(company.PegRatio);
    });

    // Si aucune entreprise n'a de PEG ratio valide, retourner NaN
    if (validPegCompanies.length === 0) {
        console.log("Aucune entreprise avec un PEG Ratio valide.");
        return NaN;
    }

    // Calculer la somme des PEG ratios valides
    const totalPeg = validPegCompanies.reduce((sum, company) => sum + company.PegRatio, 0);

    // Retourner la moyenne
    return totalPeg / validPegCompanies.length;
}

/**
 * Compare les entreprises sur le ratio PEG
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur le PEG.
 */
function comparePEG(competitorsData) {
    let sousEvaluationPeg = {};

    // Calcul du PEG moyen des concurrents
    const avgPeg = calculateAveragePeg(competitorsData);
    
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
