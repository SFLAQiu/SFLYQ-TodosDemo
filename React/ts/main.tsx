interface IGoodsItemProps {
    GoodDatas: any,
    dd: string
}
interface IGoodsItemState {

}
class GoodsItem extends React.Component<IGoodsItemProps, IGoodsItemState>{
    public State:IGoodsItemState;
    constructor(props: IGoodsItemProps) {
        super(props);
        this.state={};
        this.State=this.state;
    }
    /**
     * 获取商品HTML
     * @param {*} datas  商品数据集合
     * @returns {JSX.Element}
     */
    public goodsHtml(datas: any): JSX.Element {
        if (!datas) return;
        var html = datas.map(function (proInfo, index) {
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
    }
    /**
     * 
     * @returns {JSX.Element}
     */
    public render(): JSX.Element {
        return (
            <div className="good-main">
                <ul id="good_main">
                    {this.goodsHtml(this.props.GoodDatas) }
                </ul>
                <div id="loading" className="loading"></div>
            </div>
        );
    }
}



interface IGoodsProps { }
interface IGoodsState {
    goods?: any,
    loading?: boolean,
    pageIdex?: number
}
class GoodMains extends React.Component<IGoodsProps, IGoodsState>{
    public State:IGoodsState;
    constructor(props: IGoodsProps) {
        super(props);
        this.state= {
            goods: [],
            pageIdex: 1,
            loading: false
        };
        this.State=this.state;
    }
    /**
     *是否需要展示loding 
     * 
     * @param {boolean} show
     * @returns {void}
     */
    public showLoading(show: boolean): void {
        var loading = document.getElementById("loading");
        if (show) {
            loading.style.display = "block";
            return;
        }
        loading.style.display = "none";
        return;

    }
    /**
     * 加载数据
     * 
     * @param {number} pageIndex
     */
    public loadData(pageIndex: number): void {
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
    }
    /**
     * 滚动操作
     * @returns {void}
     */
    public handleScroll(): void {
        var sTop = window.scrollY;
        var loadHeight = window.innerHeight + sTop + 500;
        var t=this;
        var height = document.getElementById("good_main").offsetHeight;
        if (loadHeight > height) {
            if (t.state.loading) return;
            t.setState({ pageIdex: t.state.pageIdex + 1, loading: true });
            t.loadData(t.state.pageIdex);
            console.log("翻页");
        }
    }
    public componentDidMount(): void {
        this.loadData(1);
        document.addEventListener('scroll',()=> this.handleScroll());
    }

    render() {
        return (
            <GoodsItem dd="" GoodDatas={this.state.goods}/>
        );
    }

}

ReactDOM.render(<GoodMains/>, document.getElementById("good_box"));