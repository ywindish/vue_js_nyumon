var items = [
	{
		name: 'スプラローラー',
		price: 300,
		quantity: 0
	},
	{
		name: 'スパイガジェット',
		price: 400,
		quantity: 0
	},
	{
		name: 'バレルスピナーデコ',
		price: 500,
		quantity: 0
	}
]

var vm = new Vue({
	el: '#app',
	data: { // dataプロパティ
		items: items
	},
	filters: { // フィルタの定義
		numberWithDelimiter: function(value) {
			if (!value) {
				return 0;
			}
			return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
		}
	},
	methods: {
		doBuy: function() {
			// 本来はここで、サーバと通信を行う
			alert(this.totalPriceWithTax + '円のお買い上げでし！');
			this.items.forEach(function(item) {
				item.quantity = 0
			})
		}
	},
	computed: {
		totalPrice: function() {
			// this経由でインスタンス内のデータにアクセス
			return this.items.reduce(function (sum, item) {
				return sum + (item.price * item.quantity)
			}, 0)
		},
		totalPriceWithTax: function() {
			// 算出プロパティに依存した算出プロパティも定義できる
			return Math.floor(this.totalPrice * 1.08)
		},
		canBuy: function() {
			return this.totalPrice >= 1000; // 1000円以上から購入可能にする
		},
		errorMessageStyle: function() {
			// canBuy が偽のときに赤く表示する
			return {
				border: this.canBuy ? '' : '1px solid red',
				color: this.canBuy ? '' : 'red'
			}
		}
	}
})

// JSFiddle でコンソールから vm にアクセスするための対応（いらないけど一応書いとく）
window.vm = vm
