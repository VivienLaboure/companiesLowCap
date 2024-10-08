/**
 * Fonction pour comparer les ratios financiers des concurrents.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors(competitors) {
    let competitorsData = [];
    for (const competitor of competitors) {
        const competitorData = await getFinancialData(competitor);
        if (competitorData.DividendRate != 'N/A') {
            competitorsData.push(competitorData);
        } else {
            console.log("Dividendes inconnues pour ", competitor);
        }
    }

    console.log('\n--- Comparaison des entreprises ---\n');

    // Calcul des moyennes des concurrents
    let totalPe = 0, totalEvEbitda = 0;
    competitorsData.forEach(company => {
        totalPe += company.TrailingPe || 0;
        totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;
    });

    const peComparaison = comparePE(competitorsData);
    const evEbitdaComparaison = compareEV_EBITDA(competitorsData);
    const pegComparaison = comparePEG(competitorsData);
    const revenueGrowthComparaison = compareRevenueGrowth(competitorsData);
    const debtToEquityComparaison = compareDebtToEquity(competitorsData);
    const roiComparaison = compareROI(competitorsData);

    console.log(`\nPourcentage de sous-évaluation sur le P/E ratio :`, peComparaison);
    console.log(`Pourcentage de sous-évaluation sur le EV/EBITDA ratio :`, evEbitdaComparaison);
    console.log(`Pourcentage de sous-évaluation sur le PEG ratio :`, pegComparaison);
    console.log(`Pourcentage de sous-évaluation sur le ratio de la croissance de revenus  :`, revenueGrowthComparaison);
    console.log(`Pourcentage de sous-évaluation sur le ratio d'endettement :`, debtToEquityComparaison);
    console.log(`Pourcentage de sous-évaluation sur le ratio de retour sur investissement :`, roiComparaison);

    // Trouver l'entreprise la plus sous-évaluée
    const mostUndervaluedPe = Object.keys(peComparaison).reduce((a, b) => peComparaison[a] > peComparaison[b] ? a : b);
    const mostUndervaluedEvEbitda = Object.keys(evEbitdaComparaison).reduce((a, b) => evEbitdaComparaison[a] > evEbitdaComparaison[b] ? a : b);
    const mostUndervaluedPeg = Object.keys(pegComparaison).reduce((a, b) => pegComparaison[a] > pegComparaison[b] ? a : b);
    const mostUndervaluedRevenueGrowth = Object.keys(revenueGrowthComparaison).reduce((a, b) => revenueGrowthComparaison[a] > revenueGrowthComparaison[b] ? a : b);
    const mostUndervaluedDebtToEquity = Object.keys(debtToEquityComparaison).reduce((a, b) => debtToEquityComparaison[a] > debtToEquityComparaison[b] ? a : b);
    const mostUndervaluedRoi = Object.keys(roiComparaison).reduce((a, b) => roiComparaison[a] > roiComparaison[b] ? a : b);

    console.log(`\nL'entreprise la plus sous-évaluée sur le P/E ratio est : ${mostUndervaluedPe}`);
    console.log(`L'entreprise la plus sous-évaluée sur le EV/EBITDA ratio est : ${mostUndervaluedEvEbitda}`);
    console.log(`L'entreprise la plus sous-évaluée sur le PEG ratio est : ${mostUndervaluedPeg}`);
    console.log(`L'entreprise la plus sous-évaluée sur la croissance de revenus est : ${mostUndervaluedRevenueGrowth}`);
    console.log(`L'entreprise la plus sous-évaluée sur le ratio d'endettement est : ${mostUndervaluedDebtToEquity}`);
    console.log(`L'entreprise la plus sous-évaluée sur le ratio de retour sur investissement est : ${mostUndervaluedRoi}`);
}
