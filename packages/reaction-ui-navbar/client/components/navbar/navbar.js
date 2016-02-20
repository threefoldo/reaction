
Template.CoreNavigationBar.onCreated(function () {
  this.state = new ReactiveDict();
});

/**
 * layoutHeader events
 */
Template.CoreNavigationBar.events({
  "click .navbar-accounts .dropdown-toggle": function () {
    return setTimeout(function () {
      return $("#login-email").focus();
    }, 100);
  },
  "click .header-tag, click .navbar-brand": function () {
    return $(".dashboard-navbar-packages ul li").removeClass("active");
  }
});

Template.CoreNavigationBar.helpers({
  onMenuButtonClick() {
    const instance = Template.instance();
    return (event) => {
      if (instance.toggleMenuCallback) {
        instance.toggleMenuCallback();
      }
    };
  },

  tagNavProps() {
    const instance = Template.instance();
    let tags = [];

    tags = ReactionCore.Collections.Tags.find({
      isTopLevel: true
    }, {
      sort: {
        position: 1
      }
    }).fetch();

    return {
      name: "coreHeaderNavigation",
      editable: ReactionCore.hasAdminAccess(),
      isEditing: true,
      tags: tags,
      onToggleMenu(callback) {
        // Register the callback
        instance.toggleMenuCallback = callback;
      }
    };
  }
});


var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['title', 'description'];

ProductSearch = new SearchSource('products', fields, options);

Template.searchBox.events({
  "keyup #searchBox": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    console.log('keyup', text)
    ProductSearch.search(text);
  }, 500)
});

Template.searchBox.helpers({
  getProducts: function() {
    return ProductSearch.getData().length;
  },
  isLoading: function() {
    return ProductSearch.getStatus().loading;
  }
});
