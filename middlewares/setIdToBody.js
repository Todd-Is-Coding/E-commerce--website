const setIdsToBody = (config = {}, legacyBodyField) => {
  // Backward compatible support:
  // - setIdToBody({ paramName: 'productId', bodyField: 'product' })
  // - setIdToBody('categoryId', 'category')
  // so config is an object {params : productId, bodyField : product}
  // if it is sent as ('productId' , "product") → then it is fine too "LegacyBodyField"
  const normalizedConfig =
    typeof config === 'string'
      ? { paramName: config, bodyField: legacyBodyField || config }
      : config;

  // so normalizedConfig is an object {paramName : productId, bodyField : product}
  // if it is sent as ('productId' , "product") → then it is fine too "LegacyBodyField"
  // so bodyField = paramName
  // so userField = 'user'

  const { paramName, bodyField = paramName, userField = 'user' } = normalizedConfig;

  return (req, res, next) => {
    // 1) Inject parent ID from params (nested routes)
    if (paramName && req.params[paramName] && !req.body[bodyField]) {
      req.body[bodyField] = req.params[paramName];
    }

    // 2) Inject logged-in user (must come after auth middleware)
    if (req.user && req.user._id) {
      req.body[userField] = req.user._id; // override for security
    }

    if (typeof next === 'function') {
      next();
    }
  };
};

module.exports = setIdsToBody;
