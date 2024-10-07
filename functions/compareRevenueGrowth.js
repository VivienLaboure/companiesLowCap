// Fonction pour calculer la croissance moyenne des revenus
function calculateAverageRevenueGrowth(companiesData) {
    // Filtrer les entreprises qui ont une croissance de revenus Ratio valide (non nul et numérique)
    const validRevenueGrowthCompanies = companiesData.filter(company => {
        console.log(`Entreprise : ${company.Symbol}, revenueGrowth Ratio : ${company.RevenueGrowth}, Type : ${typeof company.RevenueGrowth}`);
        return company.RevenueGrowth != null && !isNaN(company.RevenueGrowth);
    });

    // Si aucune entreprise n'a de croissance de revenus ratio valide, retourner NaN
    if (validRevenueGrowthCompanies.length === 0) {
        console.log("Aucune entreprise avec une croissance de revenus Ratio valide.");
        return NaN;
    }

    // Calculer la somme de croissance de revenus ratios valides
    const totalRevenueGrowth = validRevenueGrowthCompanies.reduce((sum, company) => sum + company.RevenueGrowth, 0);

    // Retourner la moyenne
    return totalRevenueGrowth / validRevenueGrowthCompanies.length;
}


/**
 * Compare les entreprises sur la croissance de revenus
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur la croissance de revenus.
 */
function compareRevenueGrowth(competitorsData) {
    let sousEvaluationRevenueGrowth = {};

    const avgRevGrowth = calculateAverageRevenueGrowth(competitorsData);

    competitorsData.forEach(company => {
        const revGrowthDiff = ((avgRevGrowth - company.RevenueGrowth) / avgRevGrowth) * 100;
        sousEvaluationRevenueGrowth[company.Symbol] = revGrowthDiff;
    });


    return sousEvaluationRevenueGrowth;
}

module.exports = compareRevenueGrowth;