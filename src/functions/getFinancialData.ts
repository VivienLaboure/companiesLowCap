import yahooFinance from 'yahoo-finance2';
require('dotenv').config();

/**
 * Fonction pour obtenir les données financières d'une entreprise.
 * @param {string} symbol - Le symbole boursier (par exemple, AAPL pour Apple).
 * @returns {Object} Données financières formatées de l'entreprise.
 */
export async function getFinancialData(symbol: string, mockData: boolean): Promise<any> {
    try {
        let data;
        if (mockData) {
            console.log('Récupération des données en direct depuis Yahoo Finance.');
            data = await yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail', 'financialData', 'defaultKeyStatistics', 'calendarEvents', 'assetProfile', 'cashflowStatementHistory', 'recommendationTrend', 'earnings'] });
        } else {
            console.log('Utilisation des données de simulation.');
            data = require(`./../../mockData/pharma/${symbol}.json`);
        }

        const initialInvestment = 1000; // Montant fixe de l'investissement initial
        const freeCashFlow = data.financialData.freeCashflow;
        const marketCap = data.summaryDetail.marketCap;
        const totalDebt = data.financialData.totalDebt;
        const cash = data.financialData.totalCash;
        const roi = ((marketCap - initialInvestment) / initialInvestment) * 100;
        const fcfYield = marketCap ? (freeCashFlow / marketCap) * 100 : null;

        let dataCompany: {
            Symbol: string;
            TrailingPe: any;
            PegRatio: any;
            DividendRate: any;
            DividendYield: any;
            PriceToSales: any;
            FCFYield: number | null;
            Ebitda: any;
            RevenueGrowth: any;
            TargetMeanPrice: any;
            DebtToEquity: any;
            Roi: number;
            earnings: any;
            recommendationTrend: any;
            AnalyseCashFlow?: any;
            CashFlow?: Array<Array<number>>;
            EntrepriseValue?: number;
        } = {
            Symbol: symbol,
            TrailingPe: data.summaryDetail.trailingPE,
            PegRatio: data.defaultKeyStatistics.pegRatio,
            DividendRate: data.summaryDetail.dividendRate || "N/A",
            DividendYield: data.summaryDetail.dividendYield || "N/A",
            PriceToSales: data.summaryDetail.priceToSalesTrailing12Months,
            FCFYield: fcfYield,
            Ebitda: data.financialData.ebitda,
            RevenueGrowth: data.financialData.revenueGrowth,
            TargetMeanPrice: data.financialData.targetMeanPrice,
            DebtToEquity: data.financialData.debtToEquity,
            Roi: roi,
            earnings: data.earnings,
            recommendationTrend: data.recommendationTrend
        }

        if (data && data.cashflowStatementHistory) {
            const cashFlows = data.cashflowStatementHistory.cashflowStatements;
            let perPeriod: Array<Array<number>> = [];
            cashFlows.forEach((statement: { maxAge: any; endDate: any; netIncome: any; }, index: number) => {
                if (!perPeriod[index]) {
                    perPeriod[index] = [];
                }

                perPeriod[index].push(statement.maxAge);
                perPeriod[index].push(statement.endDate);
                perPeriod[index].push(statement.netIncome);

                dataCompany['AnalyseCashFlow'] = data.cashflowStatementHistory.maxAge;
                dataCompany['CashFlow'] = perPeriod;
            });
        } else {
            console.log('Données sur les flux de trésorerie non disponibles.');
        }

        if (marketCap && totalDebt && cash) {
            const enterpriseValue = marketCap + totalDebt - cash;
            dataCompany['EntrepriseValue'] = enterpriseValue;
        } else {
            console.log('Impossible de calculer la valeur d\'entreprise : données manquantes.');
        }

        return dataCompany;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return null;
    }
}