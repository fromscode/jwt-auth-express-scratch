const header = {
  alg: "RS256",
  typ: "JWT",
};

const currTimeInSecs = Math.floor(Date.now() / 1000);

const payload = {
  iat: currTimeInSecs,
  exp: currTimeInSecs + 24 * 60 * 60,
};
