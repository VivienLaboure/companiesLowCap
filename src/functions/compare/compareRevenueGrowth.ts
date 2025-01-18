import { calculateAverage } from "../calculateAverage";
/**
 * Compare les entreprises sur la croissance de revenus
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur la croissance de revenus.
 */
export function compareRevenueGrowth(competitorsData: any[]): Record<string, number> {
    let sousEvaluationRevenueGrowth: Record<string, number> = {};

    const avgRevGrowth = calculateAverage(competitorsData, 'RevenueGrowth');

    competitorsData.forEach(company => {
        const revGrowthDiff = ((avgRevGrowth - company.RevenueGrowth) / avgRevGrowth) * 100;
        sousEvaluationRevenueGrowth[company.Symbol] = revGrowthDiff;
    });


    return sousEvaluationRevenueGrowth;
}