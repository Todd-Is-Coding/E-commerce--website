const slugify = require('slugify');

const SLUG_OPTIONS = { lower: true, strict: true };

const addSlug = (data, field = 'name') => {
  if (data[field]) {
    data.slug = slugify(data[field], SLUG_OPTIONS);
  }
  return data;
};

module.exports = { addSlug };
