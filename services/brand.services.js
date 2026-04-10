const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const Brand = require('../models/brand.model');
const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');
const ApiFeatures = require('../utils/apiFeatures');


const getAllBrands = asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(Brand.find(), req.query)
        .filter()
        .search()
        .limitFields()
        .sort();

    await apiFeatures.paginate();

    const { mongoQuery, paginationResult } = apiFeatures;
    const brands = await mongoQuery;

    res.status(200).json({
        status: httpStatus.SUCCESS,
        paginationResult,
        data: brands,
    });
});


const getBrandById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }

    res.status(200).json({
        success: httpStatus.SUCCESS,
        data: brand,
    });
});


const createBrand = asyncHandler(async (req, res, next) => {
    const {name} = req.body;

    if (!name) {
        return next(new AppError('Please enter name', 400));
    }

    const brand = await Brand.create({
        name: name,
        slug: slugify(name, {lower: true, strict: true})
    });

    res.status(201).json({
        success: httpStatus.SUCCESS,
        data: brand,
    });
});


const updateBrand = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!name) {
        return next(new AppError('Please enter name', 400));
    }
    const brand = await Brand.findByIdAndUpdate(
        id,
        {
            name,
            slug: slugify(name, {lower: true})
        },
        {new: true, runValidators: true}
    );

    if (!brand) {
        return next(new AppError('Can not find Brand', 404));
    }
    res.status(200).json({
        success: httpStatus.SUCCESS,
        data: brand,
    });
});


const deleteBrand = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }
    res.status(204).json({
        status: httpStatus.SUCCESS,
        data: null
    });
});

module.exports = {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    getBrandById
};