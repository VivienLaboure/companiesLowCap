const compareDebtToEquity = require("./compare/compareDebtToEquity");
const compareEV_EBITDA = require("./compare/compareEV_EBITDA");
const compareFCFYield = require("./compare/compareFCYIELD");
const comparePE = require("./compare/comparePE");
const comparePEG = require("./compare/comparePEG");
const comparePS = require("./compare/comparePS");
const compareRevenueGrowth = require("./compare/compareRevenueGrowth");
const compareROI = require("./compare/compareROI");
const getFinancialData = require("./getFinancialData");
const { EmbedBuilder } = require('discord.js');

/**
 * Fonction pour comparer les ratios financiers des concurrents.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors(competitors, message) {
    let competitorsData = [];
    for (const competitor of competitors) {
        const competitorData = await getFinancialData(competitor);
        if (competitorData.DividendRate != 'N/A') {
            competitorsData.push(competitorData);
        } else {
            console.log("Dividendes inconnues pour ", competitor);
        }
    }

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
    const fcYieldComparaison = compareFCFYield(competitorsData);
    const psComparaison = comparePS(competitorsData);

    // Trouver l'entreprise la plus sous-évaluée
    const mostUndervaluedPe = Object.keys(peComparaison).reduce((a, b) => peComparaison[a] > peComparaison[b] ? a : b);
    const mostUndervaluedEvEbitda = Object.keys(evEbitdaComparaison).reduce((a, b) => evEbitdaComparaison[a] > evEbitdaComparaison[b] ? a : b);
    const mostUndervaluedPeg = Object.keys(pegComparaison).reduce((a, b) => pegComparaison[a] > pegComparaison[b] ? a : b);
    const mostUndervaluedRevenueGrowth = Object.keys(revenueGrowthComparaison).reduce((a, b) => revenueGrowthComparaison[a] > revenueGrowthComparaison[b] ? a : b);
    const mostUndervaluedDebtToEquity = Object.keys(debtToEquityComparaison).reduce((a, b) => debtToEquityComparaison[a] > debtToEquityComparaison[b] ? a : b);
    const mostUndervaluedRoi = Object.keys(roiComparaison).reduce((a, b) => roiComparaison[a] > roiComparaison[b] ? a : b);
    const mostUndervaluedFcYield = Object.keys(fcYieldComparaison).reduce((a, b) => fcYieldComparaison[a] > fcYieldComparaison[b] ? a : b);
    const mostUndervaluedPs = Object.keys(psComparaison).reduce((a, b) => psComparaison[a] > psComparaison[b] ? a : b);


    const embeds = [];
    let mostUndervaluedEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🔍 Comparaison demandée pour :')
        .setDescription(`${competitors.join(', ')}`)
        .setTimestamp()
        .setFooter({ text: 'Les plus sous-évalués' });

    mostUndervaluedEmbed.addFields(
        { name: 'Entreprise la plus sous-évaluée (PE)', value: `${mostUndervaluedPe} avec un score de ${peComparaison[mostUndervaluedPe].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (EV/EBITDA)', value: `${mostUndervaluedEvEbitda} avec un score de ${evEbitdaComparaison[mostUndervaluedEvEbitda].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (PEG)', value: `${mostUndervaluedPeg} avec un score de ${pegComparaison[mostUndervaluedPeg].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (Croissance des revenus)', value: `${mostUndervaluedRevenueGrowth} avec un score de ${revenueGrowthComparaison[mostUndervaluedRevenueGrowth].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (Dette/Equity)', value: `${mostUndervaluedDebtToEquity} avec un score de ${debtToEquityComparaison[mostUndervaluedDebtToEquity].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (ROI)', value: `${mostUndervaluedRoi} avec un score de ${roiComparaison[mostUndervaluedRoi].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (FC Yield)', value: `${mostUndervaluedFcYield} avec un score de ${fcYieldComparaison[mostUndervaluedFcYield].toFixed(2)}`, inline: true },
        { name: 'Entreprise la plus sous-évaluée (PS)', value: `${mostUndervaluedPs} avec un score de ${psComparaison[mostUndervaluedPs].toFixed(2)}`, inline: true }
    );

    embeds.push(mostUndervaluedEmbed);

    let currentEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🔍 Comparaison demandée pour :')
        .setDescription(`${competitors.join(', ')}`)
        .setTimestamp()
        .setFooter({ text: 'Comparaison des concurrents' });
    for (const competitor of competitorsData) {
        let actualSymbol = competitor.Symbol;

        let score =
            (peComparaison[actualSymbol] * 0.25) +
            (evEbitdaComparaison[actualSymbol] * 0.25) +
            (pegComparaison[actualSymbol] * 0.25) +
            (revenueGrowthComparaison[actualSymbol] * 0.25) +
            (debtToEquityComparaison[actualSymbol] * 0.25) +
            (roiComparaison[actualSymbol] * 0.25) +
            (fcYieldComparaison[actualSymbol] * 0.25) +
            (psComparaison[actualSymbol] * 0.25);

        currentEmbed.addFields({ name: `Score de ${actualSymbol}`, value: `${score.toFixed(2)}`, inline: true });

        const ratings = competitor.recommendationTrend.trend;
        ratings.forEach((rating) => {
            const trends =
                `Période: ${rating.period} | ` +
                `Strong Buy: ${rating.strongBuy} | ` +
                `Buy: ${rating.buy} | ` +
                `Hold: ${rating.hold} | ` +
                `Sell: ${rating.sell} | ` +
                `Strong Sell: ${rating.strongSell}`;

            // Ajouter l'information
            if (currentEmbed.length >= 6000) {
                embeds.push(currentEmbed);  // Sauvegarde l'embed actuel
                currentEmbed = new EmbedBuilder().setColor('#0099ff').setTimestamp().setFooter({ text: 'Comparaison des concurrents' });
            }
            currentEmbed.addFields({ name: `Avis des analystes ${actualSymbol}`, value: trends });
        });
    }

    // Ajouter l'embed final
    embeds.push(currentEmbed);

    // Envoyer tous les embeds
    for (const embed of embeds) {
        await message.channel.send({ embeds: [embed] });
    }
}

module.exports = compareWithCompetitors;