import {calculateAverage} from '../calculateAverage';

/**
 * Compare les entreprises sur la croissance de revenus
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur la croissance de revenus.
 */
export function compareRevenueGrowth(competitorsData) {
    let sousEvaluationRevenueGrowth = {};

    const avgRevGrowth = calculateAverage(competitorsData, 'RevenueGrowth');

    competitorsData.forEach((company: { RevenueGrowth: number; Symbol: string | number; }) => {
        const revGrowthDiff = ((avgRevGrowth - company.RevenueGrowth) / avgRevGrowth) * 100;
        sousEvaluationRevenueGrowth[company.Symbol] = revGrowthDiff;
    });


    return sousEvaluationRevenueGrowth;
}