// Fonction pour afficher le format compréhensible
function displayAnalystRatings(ratings) {
  ratings.forEach(rating => {
    console.log(
      `Période: ${rating.period} | ` +
      `Strong Buy: ${rating.strongBuy} | ` +
      `Buy: ${rating.buy} | ` +
      `Hold: ${rating.hold} | ` +
      `Sell: ${rating.sell} | ` +
      `Strong Sell: ${rating.strongSell}`
    );
  });
}

module.exports = displayAnalystRatings;