export function convertAndValidateProductData(req, res, next) {
  const { price, stock, subCategoryId } = req.body;
  const parsePrice = parseFloat(price);
  const parseStock = parseInt(stock);
  const parseSubCategoryId = parseInt(subCategoryId);
  if (isNaN(parsePrice) || isNaN(parseStock) || isNaN(parseSubCategoryId)) {
    return res.status(400).json({
      error: true,
      message: 'Los campos price, stock y subCategoryId deben ser numéricos'
    });
  }
  req.body.price = parsePrice;
  req.body.stock = parseStock;
  req.body.subCategoryId = parseSubCategoryId;
  next();
}
