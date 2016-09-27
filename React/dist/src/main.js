/***
 * 商品列表组件
 */
var GoodsItems = React.createClass({displayName: "GoodsItems",
    getInitialState: function () {
        return {};
    },
    /**
     * 获取商品HTML
     * @datas array[] 商品数据集合
     */
    goodsHtml: function (datas) {
        if (!datas) return;
        var html = datas.map(function (proInfo,index) {
            if (!proInfo) return;
            return (
                React.createElement("li", {key: index, className: "good-item"}, 
                    React.createElement("a", {href: "javascript:;", className: "link-box"}, 
                        React.createElement("span", {className: "left_box"}, 
                            React.createElement("img", {src: proInfo.ImageUrl + '!240.240', alt: "", className: "ui-imglazyload"}), 
                            React.createElement("label", {className: "tag", htmlFor: ""}, 
                                React.createElement("em", null, "今日")
                            )
                        ), 
                        React.createElement("span", {className: "right_box"}, 
                            React.createElement("span", {className: "goods_title"}, 
                                React.createElement("i", null, proInfo.Title)
                            ), 
                            React.createElement("span", {className: "price-box"}, 
                                React.createElement("s", {className: "old-price"}, proInfo.OriginalPrice), 
                                React.createElement("br", null), 
                                React.createElement("strong", {className: "now-price"}, 
                                    React.createElement("em", null, "¥"), 
                                    proInfo.PresentPrice.toFixed(2).replace(/0$/, '').replace(/\.0$/, '') 
                                )
                            )
                        ), 
                        React.createElement("div", {className: "info"}, 
                            React.createElement("img", {src: "http://image.fanhuan.com/chaogaofan_mall/taobao_2.png", alt: ""}), 
                            React.createElement("br", null), 
                            React.createElement("span", {className: "buy-num"}, proInfo.SellCount, "人抢购")
                        )
                    )
                ));
        });
        return html;
    },
    componentDidMount: function () { },
    render: function () {
        return (
            React.createElement("div", {className: "good-main"}, 
                React.createElement("ul", {id: "good_main"}, 
                    this.goodsHtml(this.props.GoodDatas) 
                ), 
                React.createElement("div", {id: "loading", className: "loading"})
            )
        );
    }
});

/**
 * 商品组件
 */
var Goods = React.createClass({displayName: "Goods",
    getInitialState: function () {
        return {
            goods: [],
            pageIdex: 1,
            loading: false
        };
    },
    /**
     * 加载数据
     * @pageIndex int 页码
     */
    loadData: function (pageIndex) {
        var _this = this;
        _this.showLoading(true);
        $.getJSON("http://gw.fanhuan.com/zhi/GetJiuJiuProducts?fps=10&ps=30&p=" + pageIndex + "&cid=-1&callback=?", function (result) {
            _this.showLoading(false);
            if (!result || result.code != "100" || !result.rt) return;
            _this.setState({
                goods: _this.state.goods.concat(result.rt),
                loading: false
            });
        });
    },
    /**
     * 是否需要展示loding
     * @show bool 是否
     */
    showLoading: function (show) {
        var loading = document.getElementById("loading");
        if (show) {
            loading.display = "block";
            return;
        }
        loading.display = "none";
        return;
    },
    /**
     * 滚动操作
     * @show bool 是否
     */
    handleScroll: function () {
        var sTop = window.scrollY;
        var loadHeight = window.innerHeight + sTop + 500;
        var height = document.getElementById("good_main").offsetHeight;
        if (loadHeight > height) {
            if (this.state.loading) return;
            this.setState({ pageIdex: this.state.pageIdex + 1, loading: true });
            this.loadData(this.state.pageIdex);
            console.log("翻页");
        }
    },
    componentDidMount: function () {
        this.loadData(1);
        document.addEventListener('scroll', this.handleScroll);
    },
    render: function () {
        return (
            React.createElement(GoodsItems, {GoodDatas: this.state.goods})
        );
    }
});

ReactDOM.render(React.createElement(Goods, null), document.getElementById("good_box"));