const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');
const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/apiFeatures');

/**
 *
 * This is a FACTORY DESIGN PATTERN 
 *  Why it's called “partial Factory”

        Because you only implemented ONE part of the factory idea:
        
        Factory Concept	Did you do it?
        Encapsulate creation logic	 partially
        Return different object types	 no
        Decide object at runtime	 no
        Abstract instantiation	 partial (wrappers only)
 * AND Repository Pattern via Mongoose Queries
 */
const deleteOne = (Model, options = {}) => {
  const { modelName = 'document' } = options;
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new AppError(`${modelName} not found`, 404));
    }
    res.status(204).send();
  });
};

const getOne = (Model, options = {}) => {
  const { modelName = 'document', populate = null } = options;
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);

    if (populate) {
      query = query.populate(populate);
    }

    const document = await query;
    if (!document) {
      return next(new AppError(`${modelName} not found`, 404));
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: document
    });
  });
};

const updateOne = (Model, options = {}) => {
  const { modelName = 'document', preProcess = null, populate = null } = options;
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (preProcess && typeof preProcess === 'function') {
      req.body = preProcess(req.body);
    }

    let query = Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (populate) {
      query = query.populate(populate);
    }

    const document = await query;
    if (!document) {
      return next(new AppError(`${modelName} not found`, 404));
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: document
    });
  });
};

const createOne = (Model, options = {}) => {
  const { preValidate = null, preProcess = null, populate = null } = options;
  return asyncHandler(async (req, res, next) => {
    if (preValidate && typeof preValidate === 'function') {
      // preValidate hooks in this factory are synchronous/asynchronous mutators
      // (e.g., injecting nested route IDs). They should not advance Express flow.
      await preValidate(req, res);
    }

    if (preProcess && typeof preProcess === 'function') {
      req.body = preProcess(req.body);
    }

    let newDoc = await Model.create(req.body);

    if (populate) {
      newDoc = await newDoc.populate(populate);
    }

    res.status(201).json({
      status: httpStatus.SUCCESS,
      data: newDoc
    });
  });
};

const getAll = (Model, options = {}) => {
  const { modelName = '', populate = null } = options;
  return asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .sort()
      .search(modelName);

    await apiFeatures.paginate();

    let { mongoQuery, paginationResult } = apiFeatures;

    if (populate) {
      mongoQuery = mongoQuery.populate(populate);
    }

    const documents = await mongoQuery;
    res.status(200).json({
      status: httpStatus.SUCCESS,
      paginationResult,
      data: documents
    });
  });
};

module.exports = {
  getOne,
  getAll,
  updateOne,
  deleteOne,
  createOne
};
