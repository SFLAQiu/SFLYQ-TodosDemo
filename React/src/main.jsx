/***
 * 商品列表组件
 */
var GoodsItems = React.createClass({
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
                <li key={index} className="good-item" >
                    <a href="javascript:;" className="link-box">
                        <span className="left_box">
                            <img src={proInfo.ImageUrl + '!240.240'} alt="" className="ui-imglazyload"/>
                            <label className="tag" htmlFor="">
                                <em>今日</em>
                            </label>
                        </span>
                        <span className="right_box">
                            <span className="goods_title">
                                <i>{proInfo.Title}</i>
                            </span>
                            <span className="price-box">
                                <s className="old-price">{proInfo.OriginalPrice}</s>
                                <br/>
                                <strong className="now-price">
                                    <em>¥</em>
                                    {proInfo.PresentPrice.toFixed(2).replace(/0$/, '').replace(/\.0$/, '') }
                                </strong>
                            </span>
                        </span>
                        <div className="info">
                            <img src="http://image.fanhuan.com/chaogaofan_mall/taobao_2.png" alt=""/>
                            <br/>
                            <span className="buy-num">{proInfo.SellCount}人抢购</span>
                        </div>
                    </a>
                </li>);
        });
        return html;
    },
    componentDidMount: function () { },
    render: function () {
        return (
            <div className="good-main">
                <ul id="good_main">
                    {this.goodsHtml(this.props.GoodDatas) }
                </ul>
                <div id="loading" className="loading"></div>
            </div>
        );
    }
});

/**
 * 商品组件
 */
var Goods = React.createClass({
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
            <GoodsItems GoodDatas={this.state.goods}/>
        );
    }
});

ReactDOM.render(<Goods/>, document.getElementById("good_box"));