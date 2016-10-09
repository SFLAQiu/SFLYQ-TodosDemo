var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GoodsItem = (function (_super) {
    __extends(GoodsItem, _super);
    function GoodsItem(props) {
        _super.call(this, props);
        this.state = {};
        this.State = this.state;
    }
    /**
     *  获取商品HTML
     *
     * @param {*} datas
     * @returns {JSX.Element}
     */
    GoodsItem.prototype.goodsHtml = function (datas) {
        if (!datas)
            return;
        var html = datas.map(function (proInfo, index) {
            if (!proInfo)
                return;
            return (React.createElement("li", {key: index, className: "good-item"}, 
                React.createElement("a", {href: "javascript:;", className: "link-box"}, 
                    React.createElement("span", {className: "left_box"}, 
                        React.createElement("img", {src: proInfo.ImageUrl + '!240.240', alt: "", className: "ui-imglazyload"}), 
                        React.createElement("label", {className: "tag", htmlFor: ""}, 
                            React.createElement("em", null, "今日")
                        )), 
                    React.createElement("span", {className: "right_box"}, 
                        React.createElement("span", {className: "goods_title"}, 
                            React.createElement("i", null, proInfo.Title)
                        ), 
                        React.createElement("span", {className: "price-box"}, 
                            React.createElement("s", {className: "old-price"}, proInfo.OriginalPrice), 
                            React.createElement("br", null), 
                            React.createElement("strong", {className: "now-price"}, 
                                React.createElement("em", null, "¥"), 
                                proInfo.PresentPrice.toFixed(2).replace(/0$/, '').replace(/\.0$/, '')))), 
                    React.createElement("div", {className: "info"}, 
                        React.createElement("img", {src: "http://image.fanhuan.com/chaogaofan_mall/taobao_2.png", alt: ""}), 
                        React.createElement("br", null), 
                        React.createElement("span", {className: "buy-num"}, 
                            proInfo.SellCount, 
                            "人抢购")))
            ));
        });
        return html;
    };
    /**
     *
     * @returns {JSX.Element}
     */
    GoodsItem.prototype.render = function () {
        return (React.createElement("div", {className: "good-main"}, 
            React.createElement("ul", {id: "good_main"}, this.goodsHtml(this.props.GoodDatas)), 
            React.createElement("div", {id: "loading", className: "loading"})));
    };
    return GoodsItem;
}(React.Component));
var GoodMains = (function (_super) {
    __extends(GoodMains, _super);
    function GoodMains(props) {
        _super.call(this, props);
        this.state = {
            goods: [],
            pageIdex: 1,
            loading: false
        };
        this.State = this.state;
    }
    /**
     *是否需要展示loding
     *
     * @param {boolean} show
     * @returns {void}
     */
    GoodMains.prototype.showLoading = function (show) {
        var loading = document.getElementById("loading");
        if (show) {
            loading.style.display = "block";
            return;
        }
        loading.style.display = "none";
        return;
    };
    /**
     * 加载数据
     *
     * @param {number} pageIndex
     */
    GoodMains.prototype.loadData = function (pageIndex) {
        var _this = this;
        _this.showLoading(true);
        $.getJSON("http://gw.fanhuan.com/zhi/GetJiuJiuProducts?fps=10&ps=30&p=" + pageIndex + "&cid=-1&callback=?", function (result) {
            _this.showLoading(false);
            if (!result || result.code != "100" || !result.rt)
                return;
            _this.setState({
                goods: _this.state.goods.concat(result.rt),
                loading: false
            });
        });
    };
    /**
     * 滚动操作
     * @returns {void}
     */
    GoodMains.prototype.handleScroll = function () {
        var sTop = window.scrollY;
        var loadHeight = window.innerHeight + sTop + 500;
        var t = this;
        var height = document.getElementById("good_main").offsetHeight;
        if (loadHeight > height) {
            if (t.state.loading)
                return;
            t.setState({ pageIdex: t.state.pageIdex + 1, loading: true });
            t.loadData(t.state.pageIdex);
            console.log("翻页");
        }
    };
    /**
     * 组件渲染完成后触发
     */
    GoodMains.prototype.componentDidMount = function () {
        var _this = this;
        this.loadData(1);
        document.addEventListener('scroll', function () { return _this.handleScroll(); });
    };
    GoodMains.prototype.render = function () {
        return (React.createElement(GoodsItem, {dd: "", GoodDatas: this.state.goods}));
    };
    return GoodMains;
}(React.Component));
ReactDOM.render(React.createElement(GoodMains, null), document.getElementById("good_box"));
