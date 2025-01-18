import { calculateAverage } from "../calculateAverage";
/**
 * Compare les entreprises sur le ratio de combien une entreprise génère de flux de trésorerie libre par rapport à sa valeur marchande.
 * @param {Array} competitorsData - Données des concurrents.
 * @returns {Object} Résultat de la sous-évaluation des entreprises sur l'EV/EBITDA.
 */
export function compareFCFYield(competitorsData: Array<any>): Record<string, number> {
    let sousEvaluationFCFYield: Record<string, number> = {};
    const avgFCFYield:number = calculateAverage(competitorsData, 'FCFYield');
    
    competitorsData.forEach(company => {
        const fcfYieldDiff = ((avgFCFYield - company.FCFYield) / avgFCFYield) * 100;
        sousEvaluationFCFYield[company.Symbol] = fcfYieldDiff;
    });

    return sousEvaluationFCFYield;
}