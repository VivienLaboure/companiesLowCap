import { calculateAverage } from "../calculateAverage";
/**
 * Compare les entreprises sur la croissance de revenus
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur la croissance de revenus.
 */
export function compareRevenueGrowth(competitorsData: any[]) {
    let sousEvaluationRevenueGrowth:Array<any> = [];

    const avgRevGrowth = calculateAverage(competitorsData, 'RevenueGrowth');

    competitorsData.forEach(company => {
        const revGrowthDiff = ((avgRevGrowth - company.RevenueGrowth) / avgRevGrowth) * 100;
        sousEvaluationRevenueGrowth[company.Symbol] = revGrowthDiff;
    });


    return sousEvaluationRevenueGrowth;
}