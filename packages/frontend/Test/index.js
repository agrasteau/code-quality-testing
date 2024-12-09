
const password = (ps) => {
  console.log("Mot de passe:", ps);  // Débogage pour afficher le mot de passe
  if (ps.length >= 8 && 
      /[A-Z]/.test(ps) && 
      /[a-z]/.test(ps) && 
      /[0-9]/.test(ps) && 
      /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\'\:\"\|\,\.\<\>\/\?]/.test(ps)) {
    return true;
  }
  return false;
};
module.exports = { password };
