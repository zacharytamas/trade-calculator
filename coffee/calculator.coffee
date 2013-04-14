
window.Calculator = ($scope) ->
    $scope.earnings_dollar  = 0.00
    $scope.earnings_percent = 0.00
    $scope.share_count = 0
    $scope.price_purchase = 0.00
    $scope.price_sell = 0.00
    $scope.commission = 0.00

    $scope.normalize = ->
        out = {}
        for prop in ['share_count', 'price_purchase', 'price_sell', 'commission']
            val = $scope[prop]
            num = if val[0] == '$' then parseFloat(val.substr(1)) else parseFloat(val)
            control_group = $("input[name='#{prop}']").parent()

            if isNaN(num)
                control_group.addClass("error")
                return null
            else
                control_group.removeClass("error")
                out[prop] = num
        return out

    $scope.recalculate = ->

        props = $scope.normalize()
        
        # If there were normalization problems, don't bother calculating.
        if not props
            return

        initial_share_value = props.share_count * props.price_purchase
        cost_basis          = initial_share_value + props.commission
        proceeds            = props.share_count * props.price_sell - props.commission
        trade_return        = proceeds - cost_basis
        
        $scope.earnings_dollar  = trade_return
        $scope.earnings_percent = trade_return / cost_basis * 100

        if $scope.earnings_dollar < 0
            $("#display").addClass "loss"
        else
            $("#display").removeClass "loss"
