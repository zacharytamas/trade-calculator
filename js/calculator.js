// Generated by CoffeeScript 1.6.1
(function() {

  window.Calculator = function($scope) {
    $scope.earnings_dollar = 0.00;
    $scope.earnings_percent = 0.00;
    $scope.share_count = "1000";
    $scope.price_purchase = "3.39";
    $scope.price_sell = "3.48";
    $scope.commission = "4.95";
    $scope.normalize = function() {
      var control_group, num, out, prop, val, _i, _len, _ref;
      out = {};
      _ref = ['share_count', 'price_purchase', 'price_sell', 'commission'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        val = $scope[prop].replace("$", "");
        num = parseFloat(val);
        control_group = $("input[name='" + prop + "']").parent();
        if (isNaN(num)) {
          control_group.addClass("error");
          return null;
        } else {
          control_group.removeClass("error");
          out[prop] = num;
        }
      }
      return out;
    };
    $scope.recalculate = function() {
      var cost_basis, initial_share_value, proceeds, props, trade_return;
      props = $scope.normalize();
      if (!props) {
        return;
      }
      initial_share_value = props.share_count * props.price_purchase;
      cost_basis = initial_share_value + props.commission;
      proceeds = props.share_count * props.price_sell - props.commission;
      trade_return = proceeds - cost_basis;
      $scope.earnings_dollar = trade_return;
      $scope.earnings_percent = trade_return / cost_basis * 100;
      return $scope.return_type = $scope.earnings_dollar < 0 ? "loss" : "gain";
    };
    return $scope.recalculate();
  };

}).call(this);
