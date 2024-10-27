"use strict";
/**
 * `deepPopulate` middleware
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const pluralize_1 = __importDefault(require("pluralize"));
const { CREATED_BY_ATTRIBUTE, UPDATED_BY_ATTRIBUTE } = utils_1.contentTypes.constants;
const extractPathSegment = (url) => { var _a; return ((_a = url.match(/\/([^/?]+)(?:\?|$)/)) === null || _a === void 0 ? void 0 : _a[1]) || ''; };
const getDeepPopulate = (uid, opts = {}) => {
    const model = strapi.getModel(uid);
    const attributes = Object.entries(model.attributes);
    return attributes.reduce((acc, [attributeName, attribute]) => {
        switch (attribute.type) {
            case 'relation': {
                const isMorphRelation = attribute.relation.toLowerCase().startsWith('morph');
                if (isMorphRelation) {
                    break;
                }
                // Ignore not visible fields other than createdBy and updatedBy
                const isVisible = utils_1.contentTypes.isVisibleAttribute(model, attributeName);
                const isCreatorField = [CREATED_BY_ATTRIBUTE, UPDATED_BY_ATTRIBUTE].includes(attributeName);
                if (isVisible) {
                    if (attributeName === 'testimonials') {
                        acc[attributeName] = { populate: "user.image" };
                    }
                    else {
                        acc[attributeName] = { populate: "*" };
                    }
                }
                break;
            }
            case 'media': {
                acc[attributeName] = { populate: "*" };
                break;
            }
            case 'component': {
                const populate = getDeepPopulate(attribute.component, opts);
                acc[attributeName] = { populate };
                break;
            }
            case 'dynamiczone': {
                // Use fragments to populate the dynamic zone components
                const populatedComponents = (attribute.components || []).reduce((acc, componentUID) => {
                    acc[componentUID] = { populate: getDeepPopulate(componentUID, opts) };
                    return acc;
                }, {});
                acc[attributeName] = { on: populatedComponents };
                break;
            }
            default:
                break;
        }
        return acc;
    }, {});
};
exports.default = (config, { strapi }) => {
    return async (ctx, next) => {
        if (ctx.request.url.startsWith('/api/') && ctx.request.method === 'GET' && !ctx.query.populate) {
            strapi.log.info('Using custom Dynamic-Zone population Middleware...');
            const contentType = extractPathSegment(ctx.request.url);
            const singular = pluralize_1.default.singular(contentType);
            const uid = `api::${singular}.${singular}`;
            // @ts-ignores 
            ctx.query.populate = getDeepPopulate(uid);
        }
        await next();
    };
};
