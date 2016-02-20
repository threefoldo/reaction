SearchSource.defineSource('products', function(searchText, params){
    var options = {sort: {isoScore: -1}, limit:20};
    const Products = ReactionCore.Collections.Products;

    if (searchText) {
        return Products.find({"$text": {"$search": searchText}}, options).fetch();
    } else {
        return Products.find({}, options).fetch();
    }
});
